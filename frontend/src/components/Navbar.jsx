import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/dashboard" className="text-xl font-bold">
        HireSmart AI
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/jobs" className="hover:underline">
          Jobs
        </Link>
        <Link to="/applications" className="hover:underline">
          {role === 'RECRUITER' ? 'Applicants' : 'My Applications'}
        </Link>
       {role !== 'RECRUITER' && (
  <Link to="/profile" className="hover:underline">
    My Profile
  </Link>
)}

        <span className="text-sm opacity-90">
          {name} ({role})
        </span>

        <button
          onClick={handleLogout}
          className="bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;