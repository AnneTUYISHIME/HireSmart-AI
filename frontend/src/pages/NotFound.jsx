import { Link } from 'react-router-dom';
import { SearchX, Home } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, white)' }}
        >
          <SearchX size={36} style={{ color: 'var(--accent)' }} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg font-medium transition"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Home size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;