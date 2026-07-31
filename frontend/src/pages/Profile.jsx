import { useState, useEffect } from 'react';
import { Upload, FileText, Phone, Mail, Link, Code, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const CLOUDINARY_CLOUD_NAME = 'di2jkpsdb';
const CLOUDINARY_UPLOAD_PRESET = 'hiresmart_cvs';

function Profile() {
  const [degree, setDegree] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [achievements, setAchievements] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [phone, setPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile/me');
        const data = response.data;
        setDegree(data.degree || '');
        setYearsOfExperience(data.yearsOfExperience ?? '');
        setBio(data.bio || '');
        setSkills(data.skills || '');
        setAchievements(data.achievements || '');
        setCvUrl(data.cvUrl || '');
        setPhone(data.phone || '');
        setContactEmail(data.contactEmail || '');
        setLinkedinUrl(data.linkedinUrl || '');
        setGithubUrl(data.githubUrl || '');
        setPortfolioUrl(data.portfolioUrl || '');
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const uploadCvToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', cvFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, { method: 'POST', body: formData });

    if (!response.ok) {
      throw new Error('CV upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      let finalCvUrl = cvUrl;

      if (cvFile) {
        setUploading(true);
        finalCvUrl = await uploadCvToCloudinary();
        setUploading(false);
      }

      setSaving(true);
      await api.put('/profile', {
        degree,
        yearsOfExperience: yearsOfExperience === '' ? null : Number(yearsOfExperience),
        bio,
        skills,
        achievements,
        cvUrl: finalCvUrl,
        phone,
        contactEmail,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
      });

      setCvUrl(finalCvUrl);
      setMessage('Profile saved successfully!');
    } catch (err) {
      setError('Failed to save profile');
    } finally {
      setUploading(false);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center mt-10 text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">My Profile</h1>
          <p className="text-sm text-gray-500 mb-6">Fill this out once - it'll be used to speed up future job applications.</p>

          {message && <div className="bg-green-50 text-green-700 border border-green-200 p-3 rounded-lg mb-4 text-sm">{message}</div>}
          {error && <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Highest Degree</label>
            <input type="text" placeholder="e.g. Bachelor's in Computer Science" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm font-medium text-gray-700 mb-1.5">Years of Experience</label>
            <input type="number" min="0" placeholder="e.g. 2" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio / Summary</label>
            <textarea placeholder="A short summary about yourself" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills</label>
            <input type="text" placeholder="e.g. Java, React, PostgreSQL" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <label className="block text-sm font-medium text-gray-700 mb-1.5">Achievements</label>
            <textarea placeholder="Certifications, awards, notable projects... (one per line)" value={achievements} onChange={(e) => setAchievements(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

            <h2 className="text-sm font-semibold text-gray-800 mt-6 mb-3 border-t pt-4">Contact Information</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
            <div className="relative mb-4">
              <Phone className="absolute left-3.5 top-3 text-gray-400" size={16} />
              <input type="tel" placeholder="+250 7XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email</label>
            <div className="relative mb-4">
              <Mail className="absolute left-3.5 top-3 text-gray-400" size={16} />
              <input type="email" placeholder="you@example.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>

            <h2 className="text-sm font-semibold text-gray-800 mt-6 mb-3 border-t pt-4">Social Media &amp; Links</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
            <div className="relative mb-4">
              <Link className="absolute left-3.5 top-3 text-gray-400" size={16} />
              <input type="url" placeholder="https://linkedin.com/in/yourname" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">GitHub</label>
            <div className="relative mb-4">
              <Code className="absolute left-3.5 top-3 text-gray-400" size={16} />
              <input type="url" placeholder="https://github.com/yourname" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">Portfolio / Website</label>
            <div className="relative mb-4">
              <Globe className="absolute left-3.5 top-3 text-gray-400" size={16} />
              <input type="url" placeholder="https://yourportfolio.com" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>

            <h2 className="text-sm font-semibold text-gray-800 mt-6 mb-3 border-t pt-4">Resume</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">CV (PDF or Word document)</label>
            {cvUrl && !cvFile && <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm mb-2 font-medium hover:underline" style={{ color: 'var(--accent)' }}><FileText size={15} />View current CV</a>}
            <label className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-4 mb-6 cursor-pointer hover:border-[var(--accent)] transition text-sm text-gray-500">
              <Upload size={18} />
              {cvFile ? cvFile.name : 'Click to select a new file (optional)'}
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files[0])} className="hidden" />
            </label>

            <button type="submit" disabled={uploading || saving} className="w-full text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50" style={{ backgroundColor: 'var(--accent)' }}>
              {uploading ? 'Uploading CV...' : saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;