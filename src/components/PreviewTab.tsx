import { useEffect, useRef, useState } from 'react';

type Format = 'webp' | 'jpeg' | 'png' | 'original';

type PreviewTabProps = {
  files: File[];
  selectedFormat: Format;
  selectedQuality: number; // 1 to 100
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

      // PNG usually ignores quality because it is lossless.
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
}: PreviewTabProps) {
  const hasFiles = files.length > 0;

  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [compressedSize, setCompressedSize] = useState(0);
  const [loadingCompressed, setLoadingCompressed] = useState(false);
  const [error, setError] = useState('');
  const [dividerPos, setDividerPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Generate original and compressed preview
  useEffect(() => {
    if (!hasFiles) {
      setOriginalUrl('');
      setCompressedUrl('');
      setCompressedSize(0);
      setError('');
      return;
    }

    const file = files[files.length - 1];

    let active = true;
    let localOriginalUrl = '';
    let localCompressedUrl = '';

    setLoadingCompressed(true);
    setError('');

    localOriginalUrl = URL.createObjectURL(file);
    setOriginalUrl(localOriginalUrl);

    compressImage(file, selectedFormat, selectedQuality)
      .then((blob) => {
        if (!active) return;

        localCompressedUrl = URL.createObjectURL(blob);
        setCompressedUrl(localCompressedUrl);
        setCompressedSize(blob.size);
      })
      .catch((err) => {
        if (!active) return;

        setError(err instanceof Error ? err.message : 'Compression failed.');
        setCompressedUrl('');
        setCompressedSize(0);
      })
      .finally(() => {
        if (!active) return;
        setLoadingCompressed(false);
      });

    return () => {
      active = false;

      if (localOriginalUrl) {
        URL.revokeObjectURL(localOriginalUrl);
      }

      if (localCompressedUrl) {
        URL.revokeObjectURL(localCompressedUrl);
      }
    };
  }, [files, hasFiles, selectedFormat, selectedQuality]);

  // Mouse + touch dragging
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
      if (!dragging) return;
      if (e.touches.length === 0) return;
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

  const originalSize = hasFiles ? files[0].size : 0;
  const savings =
    originalSize > 0 && compressedSize > 0
      ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
      : '0.0';

  return (
    <div id="tab-preview" className="flex-1 flex flex-col">
      {/* EMPTY STATE */}
      {!hasFiles && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-300"
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

          <p className="text-sm text-gray-400">No image loaded</p>
          <p className="text-xs text-gray-300 mt-1">
            Upload an image to see the preview
          </p>
        </div>
      )}

      {/* PREVIEW CONTENT */}
      {hasFiles && (
        <div className="flex-1 flex flex-col">
          <div
            ref={wrapperRef}
            className="relative bg-gray-50 flex-1 min-h-[260px] select-none overflow-hidden"
          >
            {/* ORIGINAL */}
            {originalUrl && (
              <img
                src={originalUrl}
                className="absolute inset-0 w-full h-full object-contain"
                alt="Original"
                draggable={false}
              />
            )}

            {/* COMPRESSED CLIP */}
            <div
              id="compressedClip"
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

            {/* DIVIDER */}
            <div
              id="divider"
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow cursor-ew-resize z-20"
              style={{ left: `${dividerPos}%`, transform: 'translateX(-50%)' }}
              onMouseDown={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onTouchStart={() => setDragging(true)}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-200 select-none">
                ⇔
              </div>
            </div>

            {/* LABELS */}
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded pointer-events-none">
              Original
            </div>

            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded pointer-events-none">
              Compressed
            </div>

            {/* LOADING */}
            {loadingCompressed && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-gray-600 z-10">
                Compressing preview...
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="absolute bottom-2 left-2 right-2 text-xs text-red-600 bg-white/80 border border-red-200 rounded px-2 py-1 z-10">
                {error}
              </div>
            )}
          </div>

          {/* INFO BAR */}
          <div
            id="infoBar"
            className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-white text-xs text-gray-500"
          >
            <span>{formatBytes(originalSize)}</span>

            <div className="flex items-center gap-1.5">
              <svg
                className="w-3 h-3 text-green-500"
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

              <span className="font-semibold text-green-600">
                {compressedSize > 0 ? `${savings}% smaller` : '—'}
              </span>
            </div>

            <span>{compressedSize > 0 ? formatBytes(compressedSize) : '—'}</span>
          </div>
        </div>
      )}
    </div>
  );
}