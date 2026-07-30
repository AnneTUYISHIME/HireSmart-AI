import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
          {job.title}
        </h3>
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
      </div>
    </Link>
  );
}

export default JobCard;