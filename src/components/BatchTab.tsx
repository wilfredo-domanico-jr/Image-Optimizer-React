export default function BatchTab() {
  return (
    <div id="tab-batch" className="hidden flex-1 flex flex-col">
      <div
        id="batchEmpty"
        className="flex-1 flex items-center justify-center text-sm text-gray-300 p-10"
      >
        Add multiple images to batch compress
      </div>

      <div
        id="batchList"
        className="hidden flex-1 overflow-y-auto divide-y divide-gray-50 max-h-96"
      ></div>

      <div
        id="batchActions"
        className="hidden flex gap-2 p-3 border-t border-gray-100"
      >
        <button
          id="batchDownloadAll"
          className="dl-btn flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download All
        </button>

        <button
          id="batchClear"
          className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-400"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}