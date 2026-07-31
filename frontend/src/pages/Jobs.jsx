import { useState, useEffect } from 'react';
import { Plus, X, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
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
  const [applicationDeadline, setApplicationDeadline] = useState('');

  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      const allJobs = response.data;
      const visibleJobs =
        role === 'RECRUITER'
          ? allJobs.filter((job) => job.recruiterName === name)
          : allJobs;
      setJobs(visibleJobs);
    } catch (err) {
      setMessage('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/jobs', { title, description, requirements, location, applicationDeadline });
      setMessage('Job posted successfully!');
      setTitle('');
      setDescription('');
      setRequirements('');
      setLocation('');
      setApplicationDeadline('');
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
          <h1 className="text-2xl font-bold text-gray-800">
            {role === 'RECRUITER' ? 'Your Job Postings' : 'Job Listings'}
          </h1>

          {role === 'RECRUITER' && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1.5 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              style={{ backgroundColor: showForm ? '#dc2626' : 'var(--accent)' }}
            >
              {showForm ? <X size={16} /> : <Plus size={16} />}
              {showForm ? 'Cancel' : 'Post a Job'}
            </button>
          )}
        </div>

        {message && (
          <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleCreateJob} className="bg-white p-6 rounded-2xl shadow mb-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Post a New Job</h2>

            <label className="block text-sm text-gray-600 mb-1">Job Title</label>
            <input type="text" placeholder="e.g. Backend Developer Intern" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea placeholder="Describe the role and responsibilities" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm text-gray-600 mb-1">Requirements</label>
            <input type="text" placeholder="e.g. Java, React, PostgreSQL" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input type="text" placeholder="e.g. Kigali, Rwanda" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm text-gray-600 mb-1">Application Deadline</label>
            <input type="date" value={applicationDeadline} onChange={(e) => setApplicationDeadline(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <button type="submit" className="text-white px-5 py-2 rounded-lg font-medium transition" style={{ backgroundColor: 'var(--accent)' }}>
              Post Job
            </button>
          </form>
        )}

        {loading ? (
          <Loader label="Loading jobs..." />
        ) : jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title={role === 'RECRUITER' ? "You haven't posted any jobs yet" : 'No jobs posted yet'}
            subtitle={role === 'RECRUITER' ? 'Click "Post a Job" to create your first listing' : 'Check back soon for new opportunities'}
          />
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default Jobs;