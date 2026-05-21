import React from "react";

type Format = "webp" | "jpeg" | "png" | "original";

type FormatSelectorProps = {
  selectedFormat: Format;
  setSelectedFormat: React.Dispatch<React.SetStateAction<Format>>;
};

export default function FormatSelector({
  selectedFormat,
  setSelectedFormat,
}: FormatSelectorProps) {
  const formats: { value: Format; label: string; desc: string }[] = [
    { value: "webp", label: "WebP", desc: "Best size" },
    { value: "jpeg", label: "JPEG", desc: "Compatible" },
    { value: "png", label: "PNG", desc: "Lossless" },
    { value: "original", label: "Original", desc: "Keep format" },
  ];

  return (
    <div>
      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2.5">
        Output Format
      </p>

      <div className="grid grid-cols-2 gap-2">
        {formats.map((fmt) => {
          const active = selectedFormat === fmt.value;

          return (
            <button
              key={fmt.value}
              onClick={() => setSelectedFormat(fmt.value)}
              className={`
                relative overflow-hidden text-left
                border rounded-lg px-3 py-2.5
                cursor-pointer
                transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                  active
                    ? "bg-[var(--accent)] border-[var(--accent)] text-black shadow-[0_0_20px_rgba(200,240,96,0.25),0_4px_12px_rgba(0,0,0,0.3)]"
                    : "bg-[var(--surface2)] border-[var(--border)] hover:bg-[var(--surface3)] hover:border-[var(--border2)] hover:-translate-y-0.5"
                }
              `}
            >
              {/* subtle gradient overlay */}
              <span className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_60%)]" />

              <p
                className={`
                  relative text-sm font-semibold
                  ${active ? "text-black" : "text-[var(--text)]"}
                `}
              >
                {fmt.label}
              </p>

              <p
                className={`
                  relative text-xs mt-0.5 font-mono
                  ${active ? "text-[#3a4a10]" : "text-[var(--text-muted)]"}
                `}
              >
                {fmt.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}