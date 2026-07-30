import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

function JobCard({ job }) {
  const role = localStorage.getItem('role');

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-4 hover:shadow-lg transition border border-transparent hover:border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Link to={`/jobs/${job.id}`}>
            <h3 className="text-lg font-semibold text-gray-800 hover:text-[var(--accent)] transition">
              {job.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {job.location}
            </span>
            <span>·</span>
            <span>{job.recruiterName}</span>
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
        <Calendar size={12} />
        Apply by {job.applicationDeadline}
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{job.description}</p>

      {job.requirements && (
        <p className="text-xs text-gray-500 mb-4">
          <span className="font-medium text-gray-600">Requirements:</span> {job.requirements}
        </p>
      )}

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <Link
          to={`/jobs/${job.id}`}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[var(--accent)] transition"
        >
          View Details
          <ArrowRight size={14} />
        </Link>

        {role === 'APPLICANT' && (
          <Link
            to={`/jobs/${job.id}/apply`}
            className="ml-auto text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
}

export default JobCard;