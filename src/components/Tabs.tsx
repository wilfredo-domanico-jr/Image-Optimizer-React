export default function Tabs() {
  return (
    <div className="flex items-center gap-1 p-3 border-b border-gray-100">
            <button
              className="tab-btn active text-xs font-medium px-3 py-1.5 rounded-lg"
              data-tab="preview"
            >
              Preview
            </button>
            <button
              className="tab-btn text-xs font-medium px-3 py-1.5 rounded-lg text-gray-400"
              data-tab="stats"
            >
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Stats
              </span>
            </button>
            <button
              className="tab-btn text-xs font-medium px-3 py-1.5 rounded-lg text-gray-400"
              data-tab="batch"
            >
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Batch
              </span>
            </button>
            <div
              id="batchBadge"
              className="hidden ml-auto mono text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
            ></div>
          </div>
  );
}