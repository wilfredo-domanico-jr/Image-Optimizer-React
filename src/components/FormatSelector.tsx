export default function FormatSelector() {
  return (
       <div>
            <p
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2.5"
            >
              Output Format
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="fmt-btn active border border-gray-200 rounded-lg px-3 py-2.5 text-left"
                data-fmt="webp"
              >
                <p className="text-sm font-semibold">WebP</p>
                <p className="text-xs text-gray-400 mt-0.5">Best size</p>
              </button>
              <button
                className="fmt-btn border border-gray-200 rounded-lg px-3 py-2.5 text-left"
                data-fmt="jpeg"
              >
                <p className="text-sm font-semibold">JPEG</p>
                <p className="text-xs text-gray-400 mt-0.5">Compatible</p>
              </button>
              <button
                className="fmt-btn border border-gray-200 rounded-lg px-3 py-2.5 text-left"
                data-fmt="png"
              >
                <p className="text-sm font-semibold">PNG</p>
                <p className="text-xs text-gray-400 mt-0.5">Lossless</p>
              </button>
              <button
                className="fmt-btn border border-gray-200 rounded-lg px-3 py-2.5 text-left"
                data-fmt="original"
              >
                <p className="text-sm font-semibold">Original</p>
                <p className="text-xs text-gray-400 mt-0.5">Keep format</p>
              </button>
            </div>
          </div>
  );
}