
import { useEffect,  useState } from 'react';

type Format = 'webp' | 'jpeg' | 'png' | 'original';

type StatsTabProps = {
  files: File[];
  selectedFormat: Format;
  selectedQuality: number;
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
): Promise<{ blob: Blob; width: number; height: number }> {
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
          
        resolve({
          blob,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });

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

export default function StatsTab({ files, selectedFormat, selectedQuality } : StatsTabProps) {

  const hasFiles = files.length > 0;

  const originalSize = hasFiles ? files[0].size : 0;

  const [compressedSize, setCompressedSize] = useState(0);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);


    useEffect(() => {
    if (!hasFiles) {
      setCompressedSize(0);
      setDimensions(null);
      return;
    }

    const file = files[files.length - 1];

    let active = true;

    
    compressImage(file, selectedFormat, selectedQuality)
      .then((result) => {
        if (!active) return;

        setCompressedSize(result.blob.size);
        setDimensions({
          width: result.width,
          height: result.height,
        });
      }).catch((err) => {
        console.error(err);

        if (!active) return;
        setCompressedSize(0);
        setDimensions(null);
      })
      .finally(() => {
        if (!active) return;
      });

    return () => {
      active = false;
    };
  }, [files, hasFiles, selectedFormat, selectedQuality]);


  const savings =
    originalSize > 0 && compressedSize > 0
      ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
      : '0.0';

  
  const ratio =
    originalSize > 0 && compressedSize > 0
      ? (compressedSize / originalSize).toFixed(2) + 'x'
      : '—';

  const ratioPercent =
  originalSize > 0 && compressedSize > 0
    ? Math.min(100, (compressedSize / originalSize) * 100)
    : 0;

  const isSaved = Number(savings) > 0;

  


  return (
    <div className="flex-1 p-5 space-y-4">

      {!hasFiles && (
      <div className="flex items-center justify-center h-full text-sm text-[var(--text-dim)] font-mono">
        Upload an image to see stats
      </div>

      )}
    
      {hasFiles && (

         <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-3.5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono mb-1">Original Size</p>
           <p className="font-mono text-lg font-semibold text-[var(--text)]">{formatBytes(originalSize)}</p>
          </div>

          <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-3.5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono mb-1">Compressed Size</p>
           <p className="font-mono text-lg font-semibold text-[var(--text)]">{compressedSize > 0 ? formatBytes(compressedSize) : '—'}</p>
          </div>

                  <div className="col-span-2 bg-[rgba(200,240,96,0.06)] border border-[rgba(200,240,96,0.2)] rounded-xl p-3.5">
          <p className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-mono mb-1">
           Space Saved</p>
             <p className="font-mono text-2xl font-bold text-[var(--accent)]">
              
    {compressedSize > 0
        ? Number(savings) > 0
          ? `${savings}% saved`
          : "Enlarged"
        : '—'}

            </p>
          </div>
        </div>

        <div>
           <div className="flex justify-between mb-1.5 text-[10px] text-[var(--text-muted)] font-mono">
          <span>Original</span>
          <span>Compressed</span>
        </div>

           <div className="h-3 rounded-full bg-[var(--surface3)] overflow-hidden">
            
            <div
              className={`h-full transition-all duration-300 ${
              isSaved
                ? "bg-[var(--accent)] shadow-[0_0_12px_rgba(200,240,96,0.35)]"
                : "bg-[var(--red)]"
            }`}
              style={{ width: `${ratioPercent}%` }}
            ></div>

          </div>

           <p className="text-xs text-[var(--text-dim)] font-mono mt-2">
           
        {dimensions
            ? `${dimensions.width} × ${dimensions.height} px`
            : '—'}

          </p>
        </div>

           <div className="grid grid-cols-3 gap-2 text-center">
        {/* Format */}
        <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-mono">
            Format
          </p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-[var(--accent)]">
            {hasFiles
              ? getMimeType(selectedFormat, files[0].type)
                  .split("/")[1]
                  .toUpperCase()
              : "—"}
          </p>
        </div>

               {/* Quality */}
        <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-mono">
            Quality
          </p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-[var(--accent)]">
            {selectedFormat === "png" ? "LOSSLESS" : selectedQuality}
          </p>
        </div>

              {/* Ratio */}
        <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-mono">
           
           Ratio</p>
                 <p className="mt-0.5 font-mono text-sm font-semibold text-[var(--accent)]">
              {ratio}
            </p>
          </div>
        </div>
      </div>
      )}

     
    </div>
  );
}