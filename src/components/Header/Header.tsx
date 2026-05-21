export default function Header() {
  return (
    <div className="max-w-5xl mx-auto mb-6">
      
      {/* Top row */}
      <div className="flex items-center gap-2 mb-1">
        
        {/* Icon */}
        <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center shadow-[0_0_16px_rgba(200,240,96,0.35)]">
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-[1.15rem] font-bold tracking-tight text-[var(--text)]">
          Image Compressor
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-xs text-[var(--text-muted)] font-mono ml-9 tracking-wide">
        Compress JPG, PNG, WebP — client-side, no uploads
      </p>
    </div>
  );
}