function JobCard({ job, onApply, showApplyButton }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {job.location} · Posted by {job.recruiterName}
          </p>
        </div>
        {showApplyButton && (
          <button
            onClick={() => onApply(job.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            Apply
          </button>
        )}
      </div>

      <p className="text-gray-700 mt-3">{job.description}</p>

      {job.requirements && (
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-medium">Requirements:</span> {job.requirements}
        </p>
      )}
    </div>
  );
}

export default JobCard;