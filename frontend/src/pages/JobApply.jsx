import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const CLOUDINARY_CLOUD_NAME = 'di2jkpsdb';
const CLOUDINARY_UPLOAD_PRESET = 'hiresmart_cvs';

function JobApply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [degree, setDegree] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const uploadCvToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', cvFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: 'POST',
        body: formData,
      }
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

    if (!cvFile) {
      setError('Please upload your CV');
      return;
    }

    try {
      setUploading(true);
      const cvUrl = await uploadCvToCloudinary();
      setUploading(false);

      setSubmitting(true);
      await api.post('/applications', {
        jobId: Number(id),
        degree,
        yearsOfExperience: Number(yearsOfExperience),
        coverLetter,
        cvUrl,
      });

      navigate('/applications');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Apply for this Job
          </h1>

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
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter (optional)
            </label>
            <textarea
              placeholder="Tell the recruiter why you're a great fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload CV (PDF or Word document)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files[0])}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
            />

            <button
              type="submit"
              disabled={uploading || submitting}
              className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {uploading
                ? 'Uploading CV...'
                : submitting
                ? 'Submitting Application...'
                : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobApply;