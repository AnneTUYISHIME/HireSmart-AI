import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {name}! 👋
        </h1>
        <p className="text-gray-600 mb-8">
          {role === 'RECRUITER'
            ? 'Manage your job postings and review applicants.'
            : 'Browse open positions and track your applications.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/jobs"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-600 mb-1">
              {role === 'RECRUITER' ? 'Manage Jobs' : 'Browse Jobs'}
            </h2>
            <p className="text-sm text-gray-500">
              {role === 'RECRUITER'
                ? 'Post new jobs or view your current listings.'
                : 'View open positions and apply.'}
            </p>
          </Link>

          <Link
            to="/applications"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-600 mb-1">
              {role === 'RECRUITER' ? 'View Applicants' : 'My Applications'}
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