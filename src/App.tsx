import './App.css'
import Header from "./components/Header";
import DropZone from "./components/DropZone";
import FormatSelector from "./components/FormatSelector";
import QualitySlider from "./components/QualitySlider";
import Actions from "./components/Actions";
import Tabs from "./components/Tabs";

import PreviewTab from "./components/PreviewTab";
import StatsTab from './components/StatsTab';

import BatchTab from "./components/BatchTab";
export default function App() {
  return (
    <div className="p-4 sm:p-6 md:p-10">
      <Header />

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
          
          {/* LEFT PANEL */}
          <div className="p-5 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col gap-5">
            <DropZone />
            <FormatSelector />
            <QualitySlider />
            <Actions />
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col">
            <Tabs />

            <PreviewTab />
            <StatsTab />
            <BatchTab />
          </div>

        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-5">
        All processing happens in your browser — no data is sent to any server.
      </p>
    </div>
  );
}