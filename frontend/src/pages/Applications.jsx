import { useState, useEffect } from 'react';
import { FileText, Mail, Users, ClipboardList, Briefcase, Check, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import api from '../api/axios';

const STATUS_STYLES = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

function Applications() {
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  const [applications, setApplications] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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

  const updateStatus = async (applicationId, newStatus) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to update status');
    }
  };

  useEffect(() => {
    if (role === 'RECRUITER') {
      fetchMyJobs();
    } else {
      fetchMyApplications();
    }
  }, []);

  const initials = (fullName) =>
    fullName ? fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {role === 'RECRUITER' ? 'Your Job Postings' : 'My Applications'}
        </h1>

        {message && (
          <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        {loading && <Loader label="Loading..." />}

        {role === 'RECRUITER' && !loading && (
          <>
            {myJobs.length === 0 ? (
              <EmptyState icon={Briefcase} title="You haven't posted any jobs yet" subtitle="Post a job to start receiving applicants" />
            ) : (
              <div className="flex gap-2 flex-wrap mb-6">
                {myJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => viewApplicantsFor(job.id)}
                    className="px-4 py-2 rounded-full text-sm transition"
                    style={
                      selectedJobId === job.id
                        ? { backgroundColor: 'var(--accent)', color: 'white' }
                        : { backgroundColor: 'white', color: '#374151' }
                    }
                  >
                    {job.title}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {!loading &&
          (applications.length === 0 ? (
            role === 'RECRUITER' && selectedJobId ? (
              <EmptyState icon={Users} title="No applicants yet" subtitle="Check back once candidates start applying" />
            ) : role === 'APPLICANT' ? (
              <EmptyState icon={ClipboardList} title="You haven't applied to any jobs yet" subtitle="Browse job listings to get started" />
            ) : null
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white rounded-2xl shadow p-5 mb-3">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {role === 'RECRUITER' && (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: 'var(--accent)' }}
                      >
                        {initials(app.applicantName)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {role === 'RECRUITER' ? app.applicantName : app.jobTitle}
                      </p>
                      {role === 'RECRUITER' && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail size={13} />
                          {app.applicantEmail}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[app.status]}`}>
                    {app.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1.5 pt-3 border-t border-gray-100">
                  <p><span className="font-medium text-gray-700">Degree:</span> {app.degree}</p>
                  <p><span className="font-medium text-gray-700">Experience:</span> {app.yearsOfExperience} year(s)</p>
                  {app.coverLetter && (
                    <p><span className="font-medium text-gray-700">Cover Letter:</span> {app.coverLetter}</p>
                  )}
                  <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 font-medium hover:underline" style={{ color: 'var(--accent)' }}>
                    <FileText size={15} />
                    View CV
                  </a>
                </div>

                {app.aiScore != null && (
                  <p className="text-sm text-gray-600 mt-2">AI Match Score: {app.aiScore}%</p>
                )}

                {role === 'RECRUITER' && app.status === 'PENDING' && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => updateStatus(app.id, 'ACCEPTED')}
                      className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'REJECTED')}
                      className="flex items-center gap-1.5 bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                    >
                      <X size={14} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ))}
      </div>
    </div>
  );
}

export default Applications;