import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setMessage('Job not found');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApplyClick = () => {
    navigate(`/jobs/${id}/apply`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center mt-10">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center mt-10 text-gray-500">{message}</p>
      </div>
    );
  }

  const isExpired = new Date(job.applicationDeadline) < new Date().setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{job.title}</h1>
          <p className="text-gray-500 mb-4">
            {job.location} · Posted by {job.recruiterName}
          </p>

          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-6 ${
              isExpired
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {isExpired
              ? 'Applications closed'
              : `Apply by ${job.applicationDeadline}`}
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Job Description
          </h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {job.description}
          </p>

          {job.requirements && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                What You Should Have
              </h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {job.requirements}
              </p>
            </>
          )}

          {role === 'APPLICANT' && !isExpired && (
            <button
              onClick={handleApplyClick}
              className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition"
            >
              Apply for this Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetail;