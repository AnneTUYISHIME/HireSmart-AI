import { Link } from 'react-router-dom';
import { Briefcase, Users, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

function Dashboard() {
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4">
        <div
          className="rounded-2xl p-8 mb-8 text-white"
          style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-dark))` }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, {name.split(' ')[0]}! 👋</h1>
          <p className="text-white/80">
            {role === 'RECRUITER'
              ? 'Manage your job postings and review applicants.'
              : 'Browse open positions and track your applications.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            to="/jobs"
            className="group bg-white rounded-2xl shadow p-6 hover:shadow-lg transition border border-transparent hover:border-[var(--accent)]"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, white)' }}
            >
              <Briefcase size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
              {role === 'RECRUITER' ? 'Manage Jobs' : 'Browse Jobs'}
              <ArrowRight
                size={16}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition"
              />
            </h2>
            <p className="text-sm text-gray-500">
              {role === 'RECRUITER'
                ? 'Post new jobs or view your current listings.'
                : 'View open positions and apply.'}
            </p>
          </Link>

          <Link
            to="/applications"
            className="group bg-white rounded-2xl shadow p-6 hover:shadow-lg transition border border-transparent hover:border-[var(--accent)]"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, white)' }}
            >
              <Users size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
              {role === 'RECRUITER' ? 'View Applicants' : 'My Applications'}
              <ArrowRight
                size={16}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition"
              />
            </h2>
            <p className="text-sm text-gray-500">
              {role === 'RECRUITER'
                ? 'See who applied to your job postings.'
                : 'Track the status of jobs you applied to.'}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;