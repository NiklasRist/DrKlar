import React, { useContext } from 'react';
import { BookOpen, Camera, History } from 'lucide-react';
import { AppContext } from '../App';

type BottomNavigationProps = {
  activeTab: 'wiki' | 'camera' | 'history';
};

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const context = useContext(AppContext);
  if (!context) return null;

  const { setScreen } = context;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        <button
          onClick={() => setScreen('wiki')}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
            activeTab === 'wiki' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs">Wiki</span>
        </button>

        <button
          onClick={() => setScreen('camera')}
          className={`flex flex-col items-center justify-center gap-1 px-6 py-2 transition-colors ${
            activeTab === 'camera' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div className={`rounded-full p-3 ${
            activeTab === 'camera' ? 'bg-blue-600' : 'bg-gray-200'
          }`}>
            <Camera className={`w-6 h-6 ${
              activeTab === 'camera' ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <span className="text-xs">Scan</span>
        </button>

        <button
          onClick={() => setScreen('history')}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
            activeTab === 'history' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <History className="w-6 h-6" />
          <span className="text-xs">History</span>
        </button>
      </div>
    </nav>
  );
}