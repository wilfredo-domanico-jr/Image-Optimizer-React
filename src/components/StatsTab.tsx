export default function StatsTab() {
  return (
    <div id="tab-stats" className="hidden flex-1 p-5">
      <div
        id="statsEmpty"
        className="flex items-center justify-center h-full text-sm text-gray-300"
      >
        Upload an image to see stats
      </div>

      <div id="statsContent" className="hidden space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3.5">
            <p className="text-xs text-gray-400 mb-1">Original Size</p>
            <p className="mono text-lg font-semibold text-gray-800">—</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3.5">
            <p className="text-xs text-gray-400 mb-1">Compressed Size</p>
            <p className="mono text-lg font-semibold text-gray-800">—</p>
          </div>

          <div className="bg-green-50 rounded-xl p-3.5 col-span-2">
            <p className="text-xs text-green-600 mb-1">Space Saved</p>
            <p className="mono text-2xl font-bold text-green-700">—</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-gray-400">Original</span>
            <span className="text-xs text-gray-400">Compressed</span>
          </div>

          <div className="h-3 rounded-full bg-gray-100 overflow-hidden relative">
            <div
              id="compBar"
              className="stat-fill h-full bg-green-400 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>

          <p id="statDimensions" className="text-xs text-gray-300 mt-2 mono">
            —
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Format</p>
            <p className="mono text-sm font-semibold text-gray-700 mt-0.5">
              —
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Quality</p>
            <p className="mono text-sm font-semibold text-gray-700 mt-0.5">
              —
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Ratio</p>
            <p className="mono text-sm font-semibold text-gray-700 mt-0.5">
              —
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}