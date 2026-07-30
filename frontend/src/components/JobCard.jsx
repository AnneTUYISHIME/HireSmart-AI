import { Link } from 'react-router-dom';

function JobCard({ job }) {
  const role = localStorage.getItem('role');

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-md transition">
      <Link to={`/jobs/${job.id}`}>
        <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
          {job.title}
        </h3>
      </Link>
      <p className="text-sm text-gray-500 mb-2">
        {job.location} · Posted by {job.recruiterName}
      </p>
      <p className="text-xs text-red-500 font-medium mb-3">
        Apply by: {job.applicationDeadline}
      </p>

      <p className="text-gray-700">{job.description}</p>

      {job.requirements && (
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-medium">Requirements:</span> {job.requirements}
        </p>
      )}

      <div className="flex gap-3 mt-4">
        <Link
          to={`/jobs/${job.id}`}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View Details
        </Link>

        {role === 'APPLICANT' && (
          <Link
            to={`/jobs/${job.id}/apply`}
            className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
}

export default JobCard;