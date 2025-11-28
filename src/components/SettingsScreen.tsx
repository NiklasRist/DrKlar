import React, { useContext } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import { AppContext } from '../App';

export default function SettingsScreen() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { setScreen, language, setLanguage, offlineMode, setOfflineMode } = context;

  const languages = ['English', 'Deutsch', 'Español', 'Français'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setScreen('camera')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Settings</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Language Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm">Language</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span>{lang}</span>
                {language === lang && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Offline Mode Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm">Offline Mode</h3>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  offlineMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    offlineMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Save scans locally and analyze them when you're online.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm">About</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">App Version</span>
              <span className="text-sm">1.0.0</span>
            </div>
            <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm">Terms & Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            Dr. Klar helps you make informed decisions about food ingredients. Information is for educational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="camera" />
    </div>
  );
}
