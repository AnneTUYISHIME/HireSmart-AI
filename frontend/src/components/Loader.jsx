function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div
        className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"
        style={{ borderTopColor: 'var(--accent)' }}
      ></div>
      <p className="text-sm text-gray-500 mt-3">{label}</p>
    </div>
  );
}

export default Loader;