function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 12%, white)' }}
      >
        <Icon size={26} style={{ color: 'var(--accent)' }} />
      </div>
      <p className="font-medium text-gray-700">{title}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export default EmptyState;