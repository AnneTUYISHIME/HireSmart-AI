import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, ChevronDown, Settings, LogOut } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      isActive(path)
        ? 'bg-white text-[var(--accent)]'
        : 'text-white/90 hover:bg-white/15'
    }`;

  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <nav
      className="px-6 py-3 shadow-lg relative"
      style={{ background: `linear-gradient(to right, var(--accent), var(--accent-dark))` }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2 text-white">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Briefcase size={18} />
          </div>
          <span className="text-lg font-bold">HireSmart AI</span>
        </Link>

        <div className="flex items-center gap-1 bg-black/10 rounded-full p-1">
          <Link to="/jobs" className={linkClass('/jobs')}>
            Jobs
          </Link>
          <Link to="/applications" className={linkClass('/applications')}>
            {role === 'RECRUITER' ? 'Applicants' : 'My Applications'}
          </Link>
          {role !== 'RECRUITER' && (
            <Link to="/profile" className={linkClass('/profile')}>
              My Profile
            </Link>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 transition rounded-full pl-1.5 pr-3 py-1.5"
          >
            <div className="w-7 h-7 rounded-full bg-white text-[var(--accent)] flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <span className="text-white text-sm font-medium hidden sm:inline">
              {name}
            </span>
            <ChevronDown size={14} className="text-white/80" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;