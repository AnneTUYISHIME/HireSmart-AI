import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function Applications() {
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  const [applications, setApplications] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Applicant: fetch their own applications
  const fetchMyApplications = async () => {
    try {
      const response = await api.get('/applications/me');
      setApplications(response.data);
    } catch (err) {
      setMessage('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  // Recruiter: fetch only the jobs they posted
  const fetchMyJobs = async () => {
    try {
      const response = await api.get('/jobs');
      const mine = response.data.filter((job) => job.recruiterName === name);
      setMyJobs(mine);
    } catch (err) {
      setMessage('Failed to load your jobs');
    } finally {
      setLoading(false);
    }
  };

  // Recruiter: fetch applicants for a specific job they selected
  const viewApplicantsFor = async (jobId) => {
    setSelectedJobId(jobId);
    setMessage('');
    try {
      const response = await api.get(`/applications/job/${jobId}`);
      setApplications(response.data);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to load applicants');
    }
  };

  useEffect(() => {
    if (role === 'RECRUITER') {
      fetchMyJobs();
    } else {
      fetchMyApplications();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {role === 'RECRUITER' ? 'Your Job Postings' : 'My Applications'}
        </h1>

        {message && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {loading && <p>Loading...</p>}

        {/* Recruiter view: pick a job, then see its applicants */}
        {role === 'RECRUITER' && !loading && (
          <>
            {myJobs.length === 0 ? (
              <p className="text-gray-500">You haven't posted any jobs yet.</p>
            ) : (
              <div className="flex gap-2 flex-wrap mb-6">
                {myJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => viewApplicantsFor(job.id)}
                    className={`px-4 py-2 rounded text-sm transition ${
                      selectedJobId === job.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {job.title}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Applications list - works for both roles once data is loaded */}
        {!loading &&
          (applications.length === 0 ? (
            role === 'RECRUITER' && selectedJobId ? (
              <p className="text-gray-500">No applicants yet for this job.</p>
            ) : role === 'APPLICANT' ? (
              <p className="text-gray-500">
                You haven't applied to any jobs yet.
              </p>
            ) : null
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow p-4 mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {role === 'RECRUITER' ? app.applicantName : app.jobTitle}
                    </p>
                    {role === 'RECRUITER' && (
                      <p className="text-sm text-gray-500">
                        {app.applicantEmail}
                      </p>
                    )}
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {app.status}
                  </span>
                </div>
                {app.aiScore != null && (
                  <p className="text-sm text-gray-600 mt-2">
                    AI Match Score: {app.aiScore}%
                  </p>
                )}
              </div>
            ))
          ))}
      </div>
    </div>
  );
}

export default Applications;