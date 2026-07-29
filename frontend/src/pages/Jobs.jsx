import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import api from '../api/axios';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');

  const role = localStorage.getItem('role');

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch (err) {
      setMessage('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    setMessage('');
    try {
      await api.post('/applications', { jobId });
      setMessage('Applied successfully! 🎉');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to apply');
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/jobs', { title, description, requirements, location });
      setMessage('Job posted successfully!');
      setTitle('');
      setDescription('');
      setRequirements('');
      setLocation('');
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>

          {role === 'RECRUITER' && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {showForm ? 'Cancel' : '+ Post a Job'}
            </button>
          )}
        </div>

        {message && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleCreateJob}
            className="bg-white p-6 rounded-lg shadow mb-6"
          >
            <h2 className="text-lg font-semibold mb-4">Post a New Job</h2>

            <input
              type="text"
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="text"
              placeholder="Requirements (e.g. Java, React)"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Post Job
            </button>
          </form>
        )}

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              showApplyButton={role === 'APPLICANT'}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;