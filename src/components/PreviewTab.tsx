export default function PreviewTab() {
  return (
    <div id="tab-preview" className="flex-1 flex flex-col">
      {/* EMPTY STATE */}
      <div
        id="emptyState"
        className="flex-1 flex flex-col items-center justify-center gap-3 p-10 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <p className="text-sm text-gray-400">No image loaded</p>
        <p className="text-xs text-gray-300 mt-1">
          Upload an image to see the preview
        </p>
      </div>

      {/* PREVIEW CONTENT */}
      <div id="previewContent" className="hidden flex-1 flex flex-col">
        <div
          id="compareWrapper"
          className="relative bg-gray-50 flex-1 min-h-[260px] select-none overflow-hidden"
        >
          <img
            id="originalImg"
            className="absolute inset-0 w-full h-full object-contain"
            alt="Original"
          />

          <div
            id="compressedClip"
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <img
              id="compressedImg"
              className="absolute inset-0 w-full h-full object-contain"
              alt="Compressed"
              style={{ width: "100%", maxWidth: "none" }}
            />
          </div>

          <div id="divider" className="preview-slider" style={{ left: "50%" }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-200 select-none">
              ⇔
            </div>
          </div>

          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded pointer-events-none">
            Original
          </div>

          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded pointer-events-none">
            Compressed
          </div>
        </div>

        {/* INFO BAR */}
        <div
          id="infoBar"
          className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-white text-xs text-gray-500"
        >
          <span id="infoOrigSize">—</span>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-3 h-3 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span id="infoSavings" className="font-semibold text-green-600">
              —
            </span>
          </div>

          <span id="infoCompSize">—</span>
        </div>
      </div>
    </div>
  );
}