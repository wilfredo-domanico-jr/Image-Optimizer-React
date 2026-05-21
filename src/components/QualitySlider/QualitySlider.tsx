import React from "react";

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
      {/* header */}
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          Quality
        </p>

        <span className="font-mono text-sm font-medium text-[var(--accent)]">
          {selectedQuality}
        </span>
      </div>

      {/* slider */}
      <input
        type="range"
        min={1}
        max={100}
        value={selectedQuality}
        onChange={(e) => setSelectedQuality(Number(e.target.value))}
        className="
          w-full cursor-pointer appearance-none h-1 rounded-full
          bg-gradient-to-r from-[var(--accent)] to-[var(--surface3)]
          
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-[18px]
          [&::-webkit-slider-thumb]:h-[18px]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[var(--accent)]
          [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(200,240,96,0.2),0_2px_8px_rgba(0,0,0,0.4)]
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:hover:scale-125
          [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_6px_rgba(200,240,96,0.15),0_2px_8px_rgba(0,0,0,0.4)]
        "
      />

      {/* labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-xs font-mono text-[var(--text-dim)]">
          1 — Smallest
        </span>
        <span className="text-xs font-mono text-[var(--text-dim)]">
          100 — Best quality
        </span>
      </div>

      {/* presets */}
      <div className="flex gap-1.5 mt-2">
        {[40, 60, 80, 90, 100].map((q) => {
          const active = selectedQuality === q;

          return (
            <button
              key={q}
              onClick={() => setSelectedQuality(q)}
              className={`
                text-xs px-2.5 py-1 rounded-md border cursor-pointer
                font-mono transition-all duration-150

                ${
                  active
                    ? "bg-[var(--accent)] border-[var(--accent)] text-black"
                    : "bg-[var(--surface2)] border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface3)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5"
                }
              `}
            >
              {q}
            </button>
          );
        })}
      </div>
    </div>
  );
}