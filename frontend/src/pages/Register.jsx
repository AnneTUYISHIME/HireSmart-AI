import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, Mail, Lock, User, Sparkles, Users, TrendingUp } from 'lucide-react';
import api from '../api/axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('APPLICANT');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/auth/register', { name, email, password, role });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4 py-10">
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
            Join thousands finding<br />their next opportunity.
          </h1>
          <p className="text-slate-400 mb-10">
            Create your free account and get started in under a minute.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg mt-0.5">
                <Sparkles size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">AI-powered matching</p>
                <p className="text-sm text-slate-400">Get matched to jobs that fit you</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-500/20 p-2 rounded-lg mt-0.5">
                <Users size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="font-semibold">For recruiters & applicants</p>
                <p className="text-sm text-slate-400">Tailored dashboards for every role</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-cyan-500/20 p-2 rounded-lg mt-0.5">
                <TrendingUp size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="font-semibold">Track every application</p>
                <p className="text-sm text-slate-400">Real-time status updates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-8 py-10 sm:px-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Briefcase size={20} />
            </div>
            <span className="text-xl font-bold text-gray-800">HireSmart AI</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">Create your account</h2>
          <p className="text-gray-500 mb-6">Start your journey with us today</p>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-700 border border-green-200 p-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Anne Tuyishime"
                />
              </div>
            </div>

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

            <div className="mb-4">
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
                  minLength={6}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('APPLICANT')}
                  className={`py-2.5 rounded-xl text-sm font-medium border-2 transition ${
                    role === 'APPLICANT'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Applicant
                </button>
                <button
                  type="button"
                  onClick={() => setRole('RECRUITER')}
                  className={`py-2.5 rounded-xl text-sm font-medium border-2 transition ${
                    role === 'RECRUITER'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Recruiter
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-600/25 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;