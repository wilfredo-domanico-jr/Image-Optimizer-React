
import { useEffect, useRef, useState } from 'react';

type Format = 'webp' | 'jpeg' | 'png' | 'original';

type PreviewTabProps = {
  files: File[];
  selectedFormat: Format;
  selectedQuality: number; // 1 to 100
  setCompressedFile: React.Dispatch<React.SetStateAction<Blob | null>>;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function getMimeType(format: Format, fallback: string) {
  if (format === 'original') return fallback;
  if (format === 'jpeg') return 'image/jpeg';
  if (format === 'png') return 'image/png';
  return 'image/webp';
}

function compressImage(
  file: File,
  format: Format,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Could not get canvas context.'));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);

      const mimeType = getMimeType(format, file.type);

      const normalizedQuality =
        format === 'png' ? undefined : quality / 100;

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);

          if (!blob) {
            reject(new Error('Compression failed.'));
            return;
          }

          resolve(blob);
        },
        mimeType,
        normalizedQuality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image.'));
    };

    img.src = objectUrl;
  });
}

export default function PreviewTab({
  files,
  selectedFormat,
  selectedQuality,
  setCompressedFile,
}: PreviewTabProps) {
  const currentFile = files.length > 0 ? files[files.length - 1] : null;

  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [compressedSize, setCompressedSize] = useState(0);
  const [loadingCompressed, setLoadingCompressed] = useState(false);
  const [error, setError] = useState('');
  const [dividerPos, setDividerPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!currentFile) {
      setOriginalUrl('');
      setCompressedUrl('');
      setCompressedSize(0);
      setError('');
      setCompressedFile(null);
      return;
    }

    let active = true;
    setLoadingCompressed(true);
    setError('');
    setCompressedUrl('');
    setCompressedSize(0);

    const originalObjectUrl = URL.createObjectURL(currentFile);
    setOriginalUrl(originalObjectUrl);

    let compressedObjectUrl = '';

    compressImage(currentFile, selectedFormat, selectedQuality)
      .then((blob) => {
        if (!active) return;

        setCompressedFile(blob);

        compressedObjectUrl = URL.createObjectURL(blob);
        setCompressedUrl(compressedObjectUrl);
        setCompressedSize(blob.size);
      })
      .catch((err) => {
        if (!active) return;

        setCompressedFile(null);
        setCompressedUrl('');
        setCompressedSize(0);
        setError(err instanceof Error ? err.message : 'Compression failed.');
      })
      .finally(() => {
        if (!active) return;
        setLoadingCompressed(false);
      });

    return () => {
      active = false;
      URL.revokeObjectURL(originalObjectUrl);
      if (compressedObjectUrl) {
        URL.revokeObjectURL(compressedObjectUrl);
      }
    };
  }, [currentFile, selectedFormat, selectedQuality, setCompressedFile]);

  useEffect(() => {
    const updatePosition = (clientX: number) => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;

      setDividerPos(percent);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging || e.touches.length === 0) return;
      updatePosition(e.touches[0].clientX);
    };

    const stopDragging = () => setDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', stopDragging);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [dragging]);

  const originalSize = currentFile?.size ?? 0;
  const savings =
    originalSize > 0 && compressedSize > 0
      ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
      : '0.0';

  const hasFiles = !!currentFile;

  return (
    <div  className="flex-1 flex flex-col">
      {!hasFiles && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[var(--text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <p className="text-sm text-[var(--text-muted)]">No image loaded</p>
          <p className="text-xs text-[var(--text-dim)]">
            Upload an image to see the preview
          </p>
        </div>
      )}

      {hasFiles && (
        <div className="flex-1 flex flex-col">
          <div
            ref={wrapperRef}
            className=" relative flex-1 min-h-[260px] select-none overflow-hidden
          bg-[var(--bg)]
          bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:20px_20px]"
          >
            {originalUrl && (
              <img
                src={originalUrl}
                className="absolute inset-0 w-full h-full object-contain"
                alt="Original"
                draggable={false}
              />
            )}

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${dividerPos}%` }}
            >
              {compressedUrl && (
                <img
                  src={compressedUrl}
                  id="compressedImg"
                  className="absolute inset-0 w-full h-full object-contain"
                  alt="Compressed"
                  style={{ width: '100%', maxWidth: 'none' }}
                  draggable={false}
                />
              )}
            </div>

            <div
              className="   absolute top-0 bottom-0 w-[2px] z-20 cursor-ew-resize
            bg-[var(--accent)]
            shadow-[0_0_12px_rgba(200,240,96,0.5)]"
              style={{
                left: `${dividerPos}%`,
                transform: 'translateX(-50%)',
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onTouchStart={() => setDragging(true)}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-7 h-7 rounded-full
              bg-[var(--accent)]
              text-black font-bold text-xs
              flex items-center justify-center
              shadow-[0_0_16px_rgba(200,240,96,0.4),0_2px_8px_rgba(0,0,0,0.5)]">
                ⇔
              </div>
            </div>

              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded border border-white/10 backdrop-blur">
          Original
        </div>


             <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded border border-white/10 backdrop-blur">
          Compressed
        </div>

            {loadingCompressed && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 text-sm text-gray-600">
            Compressing preview...
          </div>
            )}

            {error && (
                <div className="absolute bottom-2 left-2 right-2 text-xs text-red-500 bg-zinc-900/80 border border-red-200 rounded px-2 py-1">
            {error}
          </div>
            )}
          </div>

           <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface2)] text-xs">
            <span className="text-[var(--text-muted)]">
            {formatBytes(originalSize)}
            </span>

            <div className="flex items-center gap-1.5 text-[var(--accent)]">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

               <span>
                {compressedSize > 0 ? `${savings}% smaller` : '—'}
              </span>
            </div>

               <span className="text-[var(--text-muted)]">
                {compressedSize > 0 ? formatBytes(compressedSize) : '—'}
                </span>
          </div>
        </div>
      )}
    </div>
  );
}