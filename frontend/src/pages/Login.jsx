import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, Mail, Lock, Sparkles, Users, TrendingUp } from 'lucide-react';
import api from '../api/axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[30rem] h-[30rem] bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="hidden lg:flex flex-col justify-center px-12 py-16 text-white">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Briefcase size={24} />
            </div>
            <span className="text-2xl font-bold">HireSmart AI</span>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Where great teams<br />meet great talent.
          </h1>
          <p className="text-slate-400 mb-10">
            AI-powered hiring platform connecting recruiters with the right candidates, faster.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg mt-0.5">
                <Sparkles size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">AI-powered matching</p>
                <p className="text-sm text-slate-400">
                  Applicants get matched to jobs that fit their profile
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-500/20 p-2 rounded-lg mt-0.5">
                <Users size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="font-semibold">Built for recruiters & applicants</p>
                <p className="text-sm text-slate-400">
                  One platform, tailored dashboards for every role
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-cyan-500/20 p-2 rounded-lg mt-0.5">
                <TrendingUp size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="font-semibold">Track every application</p>
                <p className="text-sm text-slate-400">
                  Real-time status updates from applied to hired
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-8 py-12 sm:px-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Briefcase size={20} />
            </div>
            <span className="text-xl font-bold text-gray-800">HireSmart AI</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-500 mb-8">Log in to your account to continue</p>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="text-right mb-6">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-600/25 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-8 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;