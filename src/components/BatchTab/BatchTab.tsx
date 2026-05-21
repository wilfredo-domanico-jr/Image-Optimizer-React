
import { useEffect, useState } from 'react';

type Format = 'webp' | 'jpeg' | 'png' | 'original';

type BatchTabProps = {
  files: File[];
  selectedFormat: Format;
  selectedQuality: number;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

type BatchItem = {
  file: File;
  blob: Blob;
  preview: string;
  compressedSize: number;
  savings: string;
};

function getMimeType(format: Format, fallback: string) {
  if (format === 'original') return fallback;
  if (format === 'jpeg') return 'image/jpeg';
  if (format === 'png') return 'image/png';
  return 'image/webp';
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + " KB";
  return (kb / 1024).toFixed(2) + " MB";
}

function compressImage(
  file: File,
  format: Format,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject();

      ctx.drawImage(img, 0, 0);

      const mime = getMimeType(format, file.type);
      const q = format === 'png' ? undefined : quality / 100;

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (!blob) return reject();
        resolve(blob);
      }, mime, q);
    };

    img.src = url;
  });
}

export default function BatchTab({
  files,
  selectedFormat,
  selectedQuality,
  setFiles,
}: BatchTabProps) {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<BatchItem[]>([]);

  // Process all files
  useEffect(() => {
    let active = true;

    if (files.length === 0) {
      setItems([]);
      return;
    }

    setLoading(true);

    async function process() {
      const results: BatchItem[] = [];

      for (const file of files) {
        const blob = await compressImage(file, selectedFormat, selectedQuality);

        if (!active) return;

        const preview = URL.createObjectURL(file);

        const savings = (
          (1 - blob.size / file.size) * 100
        ).toFixed(1);

        results.push({
          file,
          blob,
          preview,
          compressedSize: blob.size,
          savings,
        });
      }

      setItems(results);
      setTimeout(() => {
          setLoading(false);
      }, 1000);
    }

    process();

    return () => {
      active = false;
      items.forEach(i => URL.revokeObjectURL(i.preview));
    };

  }, [files, selectedFormat, selectedQuality]);

  // Download single
  const download = (item: BatchItem) => {
    const ext =
      selectedFormat === 'original'
        ? item.file.name.split('.').pop()
        : selectedFormat === 'jpeg'
        ? 'jpg'
        : selectedFormat;

    const filename =
      item.file.name.replace(/\.[^/.]+$/, '') +
      '-compressed.' +
      ext;

    const url = URL.createObjectURL(item.blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Download all
  const downloadAll = async () => {
    for (const item of items) {
      download(item);

      await new Promise(r => setTimeout(r, 200)); // delay
    }
  };

  // Clear batch
  const clear = () => {
    setFiles([]);
    setItems([]);
  };

  const hasFiles = items.length > 0;

  return (
       <div className="flex-1 flex flex-col relative">

      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-[var(--surface3)] border-t-[var(--accent)] rounded-full animate-spin" />
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Compressing {files.length} images...
            </p>
          </div>
        </div>
      )}

      {!hasFiles && (
             <div className="flex-1 flex items-center justify-center text-sm text-[var(--text-dim)] font-mono p-10">
        Add multiple images to batch compress
      </div>
      )}

      {hasFiles && (
        <>
          {/* LIST */}
            <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)] max-h-96">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3
                transition-all duration-200
                animate-[fadeIn_0.25s_ease-out]
                ">

                <img
                  src={item.preview}
                  className="w-10 h-10 rounded-lg object-cover
                bg-[var(--surface2)]
                border border-[var(--border)]"
                />

                <div className="flex-1 min-w-0">
                 <p className="text-xs font-medium truncate text-[var(--text)]">
                    {item.file.name}
                  </p>

                     <p className="text-xs mono text-[var(--text-muted)] mt-1">
                    {formatBytes(item.file.size)} → {formatBytes(item.compressedSize)}
                    {Number(item.savings) > 0 && (
                        <span className="text-xs text-[var(--accent)] ml-1">
                        -{item.savings}%
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={() => download(item)}
                  className=" w-8 h-8 rounded-lg
                  cursor-pointer
                border border-[var(--border)]
                bg-[var(--surface2)]
                text-[var(--text-muted)]
                hover:bg-[var(--accent)]
                hover:text-black
                hover:border-[var(--accent)]
                hover:scale-105
                transition-all duration-150
                flex items-center justify-center"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
                </button>

              </div>
            ))}
          </div>

          {/* ACTIONS */}
           <div className="flex gap-2 p-3 border-t border-[var(--border)] bg-[var(--surface2)]">
            <button
              onClick={downloadAll}
              className="flex-1 flex items-center justify-center gap-2
          py-2.5 rounded-lg text-sm font-bold
          bg-[var(--accent)] text-black
          shadow-[0_0_20px_rgba(200,240,96,0.2)]
          transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:bg-[#d9ff6e] hover:-translate-y-0.5
          hover:shadow-[0_0_30px_rgba(200,240,96,0.35),0_8px_24px_rgba(0,0,0,0.3)]
          active:translate-y-0
          cursor-pointer"
            >
              <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>

              Download All
            </button>

            <button
              onClick={clear}
              className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface2)] text-[var(--text-muted)] hover:bg-[rgba(255,95,95,0.1)] hover:border-[var(--red)] hover:text-[var(--red)] transition-colors text-gray-400 cursor-pointer"
            >
              <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
            </button>
          </div>
        </>
      )}

    </div>
  );
}
