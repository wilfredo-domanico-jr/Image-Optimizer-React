
import { useState } from 'react';
import Header from "./components/Header/Header";
import DropZone from "./components/DropZone/DropZone";
import FormatSelector from "./components/FormatSelector/FormatSelector";
import QualitySlider from "./components/QualitySlider/QualitySlider";
import Actions from "./components/Actions/Actions";
import Tabs from "./components/Tabs/Tabs";

import PreviewTab from "./components/PreviewTab/PreviewTab";
import StatsTab from './components/StatsTab/StatsTab';

import BatchTab from "./components/BatchTab/BatchTab";
export default function App() {

type Format = 'webp' | 'jpeg' | 'png' | 'original';
type Tab = 'preview' | 'stats' | 'batch';

const [selectedFormat, setSelectedFormat] = useState<Format>('webp');
const [selectedQuality, setSelectedQuality] = useState<number>(80);
const [activeTab, setActiveTab] = useState<Tab>('preview');
const [compressedFile, setCompressedFile] = useState<Blob | null>(null);

const [files, setFiles] = useState<File[]>([]);

const handleFiles = (newFiles: File[]) => {
  setFiles(prev => [...prev, ...newFiles]);
};


const handleReset = () => {
    setFiles([]);
    setCompressedFile(null);
    setSelectedFormat('webp');
    setSelectedQuality(80);
    setActiveTab('preview');
  };


  
  return (
    <div className="p-4 sm:p-6 md:p-10">
      <Header />

      <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl shadow-sm border border-gray-600 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
          
          {/* LEFT PANEL */}
          <div className="p-5 border-b lg:border-b-0 lg:border-r border-gray-600 flex flex-col gap-5">
           <DropZone onFiles={handleFiles} />
            
            <FormatSelector
              selectedFormat={selectedFormat}
              setSelectedFormat={setSelectedFormat}
            />

            <QualitySlider selectedQuality={selectedQuality} 
              setSelectedQuality={setSelectedQuality}/>
           
           
          <Actions
              files={files}
              compressedFile={compressedFile}
              selectedFormat={selectedFormat}
              onReset={handleReset}
            />

          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col">
            <Tabs files={files} activeTab={activeTab}  setActiveTab={setActiveTab} />

            {activeTab === 'preview' && (
                <PreviewTab
                  files={files}
                  selectedFormat={selectedFormat}
                  selectedQuality={selectedQuality}
                  setCompressedFile={setCompressedFile}
                />
              )}

              
            {activeTab === 'stats' && (
               <StatsTab 
               
               files={files}
               selectedFormat={selectedFormat}
               selectedQuality={selectedQuality}
               
               />
            )}

                    
            {activeTab === 'batch' && (
              <BatchTab
                files={files}
                selectedFormat={selectedFormat}
                selectedQuality={selectedQuality}
                setFiles={setFiles}
              />
            )}

          </div>

        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-5">
        All processing happens in your browser — no data is sent to any server.
      </p>
    </div>
  );
}