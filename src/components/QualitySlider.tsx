
import React from 'react';


type QualitySelectorProps = {
  selectedQuality: number;
  setSelectedQuality: React.Dispatch<React.SetStateAction<number>>;
};


export default function QualitySlider({
  selectedQuality,
  setSelectedQuality,
}: QualitySelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Quality
        </p>

        
        <span className="mono text-sm font-medium text-gray-700">
          {selectedQuality}
        </span>

      </div>

      
      <input
        type="range"
        min={1}
        max={100}
        value={selectedQuality}
        onChange={(e) => setSelectedQuality(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{ ["--val" as any]: `${selectedQuality}%` }}
      />


      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-gray-300">1 — Smallest</span>
        <span className="text-xs text-gray-300">100 — Best quality</span>
      </div>

      
      <div className="flex gap-1.5 mt-2">
        {[40, 60, 80, 90, 100].map((q) => (
          <button
            key={q}
            onClick={() => setSelectedQuality(q)}
            className={`text-xs px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
              selectedQuality === q
                ? 'bg-blue-100 border-blue-400 text-blue-700'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {q}
          </button>
        ))}
      </div>

    </div>
  );
}