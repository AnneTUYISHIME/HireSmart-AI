import { useState, useEffect } from 'react';
import { Users, Briefcase, ClipboardList, Trash2, Shield, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import api from '../api/axios';

const ROLE_STYLES = {
  ADMIN: 'bg-purple-100 text-purple-700',
  RECRUITER: 'bg-blue-100 text-blue-700',
  APPLICANT: 'bg-green-100 text-green-700',
};

const STATUS_STYLES = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

function AdminDashboard() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (err) {
      setMessage('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/jobs');
      setJobs(response.data);
    } catch (err) {
      setMessage('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/applications');
      setApplications(response.data);
    } catch (err) {
      setMessage('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearch('');
    if (tab === 'users') fetchUsers();
    else if (tab === 'jobs') fetchJobs();
    else fetchApplications();
  }, [tab]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This also removes their jobs/applications/profile.`)) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setMessage('Failed to delete user');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    } catch (err) {
      setMessage('Failed to update role');
    }
  };

  const handleDeleteJob = async (id, title) => {
    if (!window.confirm(`Delete job "${title}"? This also removes its applications.`)) return;
    try {
      await api.delete(`/admin/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      setMessage('Failed to delete job');
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await api.delete(`/admin/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setMessage('Failed to delete application');
    }
  };

  const handleStatClick = (role) => {
    setTab('users');
    setRoleFilter(role);
    setSearch('');
  };

  const initials = (name) =>
    name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  const recruiterCount = users.filter((u) => u.role === 'RECRUITER').length;
  const applicantCount = users.filter((u) => u.role === 'APPLICANT').length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;

  const filteredUsers = users
    .filter((u) => !roleFilter || u.role === roleFilter)
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.recruiterName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredApplications = applications.filter(
    (a) =>
      a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div
          className="rounded-2xl p-8 mb-6 text-white flex items-center gap-4"
          style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-dark))` }}
        >
          <div className="bg-white/20 p-3 rounded-xl">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-white/80 text-sm">Manage users, jobs, and applications platform-wide</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => handleStatClick(null)}
            className={`bg-white rounded-2xl shadow p-4 text-left hover:shadow-md transition border-2 ${
              tab === 'users' && !roleFilter ? 'border-[var(--accent)]' : 'border-transparent'
            }`}
          >
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            <p className="text-xs text-gray-500">Total Users</p>
          </button>
          <button
            onClick={() => handleStatClick('RECRUITER')}
            className={`bg-white rounded-2xl shadow p-4 text-left hover:shadow-md transition border-2 ${
              tab === 'users' && roleFilter === 'RECRUITER' ? 'border-[var(--accent)]' : 'border-transparent'
            }`}
          >
            <p className="text-2xl font-bold text-blue-600">{recruiterCount}</p>
            <p className="text-xs text-gray-500">Recruiters</p>
          </button>
          <button
            onClick={() => handleStatClick('APPLICANT')}
            className={`bg-white rounded-2xl shadow p-4 text-left hover:shadow-md transition border-2 ${
              tab === 'users' && roleFilter === 'APPLICANT' ? 'border-[var(--accent)]' : 'border-transparent'
            }`}
          >
            <p className="text-2xl font-bold text-green-600">{applicantCount}</p>
            <p className="text-xs text-gray-500">Applicants</p>
          </button>
          <button
            onClick={() => handleStatClick('ADMIN')}
            className={`bg-white rounded-2xl shadow p-4 text-left hover:shadow-md transition border-2 ${
              tab === 'users' && roleFilter === 'ADMIN' ? 'border-[var(--accent)]' : 'border-transparent'
            }`}
          >
            <p className="text-2xl font-bold text-purple-600">{adminCount}</p>
            <p className="text-xs text-gray-500">Admins</p>
          </button>
        </div>

        {message && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setTab('users');
              setRoleFilter(null);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
            style={tab === 'users' ? { backgroundColor: 'var(--accent)', color: 'white' } : { backgroundColor: 'white', color: '#374151' }}
          >
            <Users size={16} />
            Users
          </button>
          <button
            onClick={() => setTab('jobs')}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
            style={tab === 'jobs' ? { backgroundColor: 'var(--accent)', color: 'white' } : { backgroundColor: 'white', color: '#374151' }}
          >
            <Briefcase size={16} />
            Jobs
          </button>
          <button
            onClick={() => setTab('applications')}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
            style={tab === 'applications' ? { backgroundColor: 'var(--accent)', color: 'white' } : { backgroundColor: 'white', color: '#374151' }}
          >
            <ClipboardList size={16} />
            Applications
          </button>
        </div>

        {tab === 'users' && roleFilter && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            Filtering by:
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_STYLES[roleFilter]}`}>
              {roleFilter}
            </span>
            <button onClick={() => setRoleFilter(null)} className="text-blue-600 hover:underline">
              Clear
            </button>
          </div>
        )}

        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder={`Search ${tab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {loading && <Loader label="Loading..." />}

        {!loading && tab === 'users' && (
          filteredUsers.length === 0 ? (
            <EmptyState icon={Users} title="No users found" />
          ) : (
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              {filteredUsers.map((u) => (
                <div key={u.id} className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>
                      {initials(u.name)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer ${ROLE_STYLES[u.role]}`}
                    >
                      <option value="APPLICANT">APPLICANT</option>
                      <option value="RECRUITER">RECRUITER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <button onClick={() => handleDeleteUser(u.id, u.name)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {!loading && tab === 'jobs' && (
          filteredJobs.length === 0 ? (
            <EmptyState icon={Briefcase} title="No jobs found" />
          ) : (
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              {filteredJobs.map((j) => (
                <div key={j.id} className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                  <div>
                    <p className="font-medium text-gray-800">{j.title}</p>
                    <p className="text-sm text-gray-500">{j.location} · Posted by {j.recruiterName}</p>
                  </div>
                  <button onClick={() => handleDeleteJob(j.id, j.title)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )
        )}

        {!loading && tab === 'applications' && (
          filteredApplications.length === 0 ? (
            <EmptyState icon={ClipboardList} title="No applications found" />
          ) : (
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              {filteredApplications.map((a) => (
                <div key={a.id} className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                  <div>
                    <p className="font-medium text-gray-800">{a.applicantName} → {a.jobTitle}</p>
                    <p className="text-sm text-gray-500">{a.applicantEmail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[a.status]}`}>
                      {a.status}
                    </span>
                    <button onClick={() => handleDeleteApplication(a.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;