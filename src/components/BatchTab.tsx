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

  const [items, setItems] = useState<BatchItem[]>([]);

  // Process all files
  useEffect(() => {
    let active = true;

    if (files.length === 0) {
      setItems([]);
      return;
    }

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
    <div className="flex-1 flex flex-col">

      {!hasFiles && (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-300 p-10">
          Add multiple images to batch compress
        </div>
      )}

      {hasFiles && (
        <>
          {/* LIST */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 max-h-96">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">

                <img
                  src={item.preview}
                  className="w-10 h-10 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.file.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {formatBytes(item.file.size)} → {formatBytes(item.compressedSize)}
                    {Number(item.savings) > 0 && (
                      <span className="text-green-500 ml-1">
                        -{item.savings}%
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={() => download(item)}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center"
                >
                  ↓
                </button>

              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 p-3 border-t border-gray-100">
            <button
              onClick={downloadAll}
              className="flex-1 py-2.5 rounded-xl bg-black text-white"
            >
              Download All
            </button>

            <button
              onClick={clear}
              className="p-2.5 border rounded-xl text-gray-400"
            >
              ✕
            </button>
          </div>
        </>
      )}

    </div>
  );
}
