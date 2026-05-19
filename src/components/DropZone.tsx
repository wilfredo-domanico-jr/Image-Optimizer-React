export default function DropZone() {
  return (
      <div
            id="dropZone"
            className="drop-zone border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer min-h-[160px] group"
          >
            <div
              className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Drop images here</p>
              <p className="text-xs text-gray-400 mt-0.5">
                or click to browse · JPG, PNG, WebP
              </p>
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
            />
          </div>
 

  );
}