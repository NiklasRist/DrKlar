import React, { useContext, useState } from 'react';
import { Info } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import { AppContext, ScanReport, Ingredient } from '../App';

export default function CameraScreen() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { setScreen, addScanToHistory, setSelectedReport, ingredients, offlineMode } = context;
  const [isScanning, setIsScanning] = useState(false);

  const handleCapture = () => {
    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      // Create a mock scan report
      const mockScan: ScanReport = {
        id: `scan-${Date.now()}`,
        productName: 'Energy Drink',
        brand: 'PowerBoost',
        scanDate: new Date(),
        riskScore: 'high',
        riskSummary: 'Contains multiple synthetic colorants and preservatives associated with hyperactivity in children. High caffeine content may pose risks for sensitive individuals.',
        ingredients: [
          ingredients.find(i => i.id === 'e102')!,
          ingredients.find(i => i.id === 'e110')!,
          ingredients.find(i => i.id === 'e211')!,
          ingredients.find(i => i.id === 'e330')!
        ].filter(Boolean),
        isPending: offlineMode
      };

      addScanToHistory(mockScan);
      setSelectedReport(mockScan);
      setIsScanning(false);
      setScreen('label-report');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Info Button */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-end p-4 safe-area-top">
        <button
          onClick={() => setScreen('settings')}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Simulated Camera Preview */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Camera grid overlay */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/30" />
            ))}
          </div>
        </div>

        {/* Frame Rectangle */}
        <div className="relative z-10 w-[80%] max-w-sm aspect-[3/2] border-2 border-white rounded-lg flex items-center justify-center">
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg" />
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg" />
        </div>
      </div>

      {/* Status Message */}
      <div className="px-6 py-4 text-center">
        <p className="text-white text-sm">
          {isScanning 
            ? offlineMode 
              ? 'Offline Scan will be analyzed when you\'re online again.'
              : 'Analyzing label...'
            : 'Point the camera at an ingredients list and tap the button to get risk reports.'
          }
        </p>
      </div>

      {/* Capture Button */}
      <div className="pb-24 px-6 flex justify-center">
        <button
          onClick={handleCapture}
          disabled={isScanning}
          className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isScanning ? (
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white" />
          )}
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="camera" />
    </div>
  );
}