import { useState, useEffect } from 'react';
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

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      { method: 'POST', body: formData }
    );

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
        <p className="text-center mt-10">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-sm text-gray-500 mb-6">
            Fill this out once - it'll be used to speed up future job applications.
          </p>

          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highest Degree
            </label>
            <input
              type="text"
              placeholder="e.g. Bachelor's in Computer Science"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 2"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio / Summary
            </label>
            <textarea
              placeholder="A short summary about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <input
              type="text"
              placeholder="e.g. Java, React, PostgreSQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achievements
            </label>
            <textarea
              placeholder="Certifications, awards, notable projects..."
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              CV (PDF or Word document)
            </label>
            {cvUrl && !cvFile && (
              <p className="text-sm mb-2">
                Current CV: <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View uploaded CV</a>
              </p>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
            />

            <button
              type="submit"
              disabled={uploading || saving}
              className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {uploading ? 'Uploading CV...' : saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;