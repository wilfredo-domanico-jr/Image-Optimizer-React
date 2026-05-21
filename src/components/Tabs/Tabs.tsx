type Tab = 'preview' | 'stats' | 'batch';

type TabProps = {
  files: File[];
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
};



export default function Tabs({ files, activeTab, setActiveTab }: TabProps) {

  const fileCount = files.length;

  return (
    <div className="flex items-center gap-1 p-3 border-b border-gray-600">

      {/* PREVIEW */}
      <button
        onClick={() => setActiveTab('preview')}
        className={`tab-btn text-xs font-medium px-3 py-1.5 cursor-pointer rounded-lg ${
          activeTab === 'preview'
            ? 'active'
            : ''
        }`}
      >
        Preview
      </button>

      {/* STATS */}
      <button
        onClick={() => setActiveTab('stats')}
        className={`tab-btn text-xs font-medium px-3 py-1.5 cursor-pointer rounded-lg ${
          activeTab === 'stats'
            ? 'active'
            : ''
        }`}
      >
        <span className="flex items-center gap-1.5">
            <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
          Stats
        </span>
      </button>

      {/* BATCH */}
      <button
        onClick={() => setActiveTab('batch')}
        className={`tab-btn text-xs font-medium px-3 py-1.5 cursor-pointer rounded-lg ${
          activeTab === 'batch'
            ? 'active'
            : ''
        }`}
      >
        <span className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          Batch
        </span>
      </button>



      {fileCount > 0 && (
        <div className="bg-lime-200 font-semibold ml-auto mono text-xs text-neutral-950 px-2 py-0.5 rounded-full">
          {fileCount}
        </div>
      )}

    </div>
  );
}
