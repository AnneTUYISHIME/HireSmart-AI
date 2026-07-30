import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, LogOut, Check } from 'lucide-react';
import Navbar from '../components/Navbar';

const THEMES = [
  { name: 'Blue', accent: '#2563eb', accentDark: '#1d4ed8' },
  { name: 'Purple', accent: '#7c3aed', accentDark: '#6d28d9' },
  { name: 'Green', accent: '#059669', accentDark: '#047857' },
  { name: 'Rose', accent: '#e11d48', accentDark: '#be123c' },
  { name: 'Amber', accent: '#d97706', accentDark: '#b45309' },
  { name: 'Slate', accent: '#475569', accentDark: '#334155' },
];

function Settings() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const [selectedTheme, setSelectedTheme] = useState('Blue');

  useEffect(() => {
    const saved = localStorage.getItem('themeName');
    if (saved) setSelectedTheme(saved);
  }, []);

  const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent-dark', theme.accentDark);
    localStorage.setItem('themeName', theme.name);
    localStorage.setItem('themeAccent', theme.accent);
    localStorage.setItem('themeAccentDark', theme.accentDark);
    setSelectedTheme(theme.name);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold">
              {name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{name}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={20} className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">Theme Color</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Pick an accent color that's easiest for you to see.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.name}
                onClick={() => applyTheme(theme)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition"
                  style={{
                    backgroundColor: theme.accent,
                    borderColor:
                      selectedTheme === theme.name ? theme.accentDark : 'transparent',
                  }}
                >
                  {selectedTheme === theme.name && (
                    <Check size={20} className="text-white" />
                  )}
                </div>
                <span className="text-xs text-gray-600">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg transition text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;