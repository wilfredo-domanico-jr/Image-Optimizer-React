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
      <button
        onClick={handleDownload}
        disabled={!compressedFile || files.length === 0}
        className="dl-btn flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

      <button
        id="resetBtn"
        onClick={onReset}
        className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-400 cursor-pointer"
        title="Reset"
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