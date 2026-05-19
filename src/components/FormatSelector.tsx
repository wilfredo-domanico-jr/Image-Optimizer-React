

import React from 'react';


type Format = 'webp' | 'jpeg' | 'png' | 'original';

type FormatSelectorProps = {
  selectedFormat: Format;
  setSelectedFormat: React.Dispatch<React.SetStateAction<Format>>;
};


export default function FormatSelector({
  selectedFormat,
  setSelectedFormat,
}: FormatSelectorProps) {


const formats: { value: Format; label: string; desc: string }[] = [
  { value: 'webp', label: 'WebP', desc: 'Best size' },
  { value: 'jpeg', label: 'JPEG', desc: 'Compatible' },
  { value: 'png', label: 'PNG', desc: 'Lossless' },
  { value: 'original', label: 'Original', desc: 'Keep format' },
];


  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2.5">
        Output Format
      </p>

      <div className="grid grid-cols-2 gap-2">
        {formats.map((fmt) => (
          <button
            key={fmt.value}
            onClick={() => setSelectedFormat(fmt.value)}
            className={`fmt-btn border border-gray-200 rounded-lg px-3 py-2.5 cursor-pointer text-left ${
              selectedFormat === fmt.value
                ? 'active'
                : ''
            }`}
          >
            <p className="text-sm font-semibold">{fmt.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{fmt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}