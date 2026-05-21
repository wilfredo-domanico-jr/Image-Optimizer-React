
type Format = 'webp' | 'jpeg' | 'png' | 'original';

type ActionsProps = {
  files: File[];
  compressedFile: Blob | null;
  selectedFormat: Format;
  onReset: () => void;
};

export default function Actions({
  files,
  compressedFile,
  selectedFormat,
  onReset,
}: ActionsProps) {
  const handleDownload = () => {
    if (!compressedFile || files.length === 0) return;

    const currentFile = files[files.length - 1];

    const ext =
      selectedFormat === 'original'
        ? currentFile.name.split('.').pop() || 'jpg'
        : selectedFormat === 'jpeg'
        ? 'jpg'
        : selectedFormat;

    const filename =
      currentFile.name.replace(/\.[^/.]+$/, '') + '-compressed.' + ext;

    const url = URL.createObjectURL(compressedFile);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
       <div className="flex gap-2 mt-auto pt-2">
      
      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={!compressedFile || files.length === 0}
        className="
          flex-1 flex items-center justify-center gap-2
          py-2.5 rounded-lg text-sm font-bold
          bg-[var(--accent)] text-black
          shadow-[0_0_20px_rgba(200,240,96,0.2)]
          transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:bg-[#d9ff6e] hover:-translate-y-0.5
          hover:shadow-[0_0_30px_rgba(200,240,96,0.35),0_8px_24px_rgba(0,0,0,0.3)]
          active:translate-y-0
          cursor-pointer
          disabled:bg-[var(--surface3)]
          disabled:text-[var(--text-dim)]
          disabled:shadow-none
          disabled:cursor-not-allowed
        "
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
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download
      </button>

      {/* Reset button */}
      <button
        onClick={onReset}
        title="Reset"
        className="
          p-2.5 rounded-lg
          bg-[var(--surface2)]
          border border-[var(--border)]
          text-[var(--text-muted)]
          cursor-pointer
          transition-all duration-150
          hover:bg-[var(--surface3)]
          hover:border-[var(--border2)]
          hover:text-[var(--red)]
          hover:rotate-12
        "
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
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  );
}