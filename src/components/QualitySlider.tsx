export default function QualitySlider() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Quality
        </p>

        <span className="mono text-sm font-medium text-gray-700">
          80
        </span>
      </div>

      <input
        type="range"
        id="qualitySlider"
        min={1}
        max={100}
        value={80}
        className="w-full"
        style={{ ["--val" as any]: "80%" }}
      />

      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-gray-300">1 — Smallest</span>
        <span className="text-xs text-gray-300">100 — Best quality</span>
      </div>

      <div className="flex gap-1.5 mt-2">
        <button className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500">
          40
        </button>
        <button className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500">
          60
        </button>
        <button className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500">
          80
        </button>
        <button className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500">
          90
        </button>
        <button className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500">
          100
        </button>
      </div>
    </div>
  );
}