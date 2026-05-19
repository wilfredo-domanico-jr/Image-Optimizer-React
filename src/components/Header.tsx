export default function Header() {
  return (
     <div className="max-w-5xl mx-auto mb-6">
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-7 h-7 rounded-lg bg-black flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 text-white"
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
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Image Compressor
        </h1>
      </div>
      <p className="text-sm text-gray-400 ml-9">
        Compress JPG, PNG, WebP — client-side, no uploads
      </p>
    </div>
  );
}