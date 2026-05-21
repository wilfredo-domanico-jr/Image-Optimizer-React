

import { useRef, type ChangeEvent, type DragEvent } from "react";

type DropZoneProps = {
  onFiles: (files: File[]) => void;
};

export default function DropZone({ onFiles }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onFiles(files);
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFiles(files);
  };

  return (
     <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="
        border-2 border-dashed border-[var(--border)]
        rounded-xl p-8 min-h-[160px]
        flex flex-col items-center justify-center gap-3
        cursor-pointer group
        bg-[var(--surface)]
        transition-all duration-200
        hover:border-[var(--border2)]
        hover:bg-[var(--surface2)]
      "
    >
      {/* Icon */}
      <div
        className="
          w-11 h-11 rounded-xl
          bg-[var(--surface2)]
          border border-[var(--border)]
          flex items-center justify-center
          transition-colors duration-200
          group-hover:bg-[var(--surface3)]
        "
      >
        <svg
          className="w-5 h-5 text-[var(--text-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-sm font-medium text-[var(--text)]">
          Drop images here
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          or click to browse · JPG, PNG, WebP
        </p>
      </div>

      {/* Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}