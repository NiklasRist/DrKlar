import React, { useContext, useState } from 'react';
import { Trash2, Filter, Star, Cloud, Info } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import { AppContext } from '../App';

export default function HistoryScreen() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { scanHistory, clearHistory, setScreen, setSelectedReport, setReturnScreen } = context;
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleClearHistory = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  const handleReportClick = (report: any) => {
    setSelectedReport(report);
    setReturnScreen('history');
    setScreen('label-report');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1>History</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen('favorites')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Star className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setScreen('settings')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Info className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {scanHistory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No scans yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Scan a product label to see it here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                onClick={() => handleReportClick(scan)}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate mb-1">{scan.productName}</h3>
                    {scan.brand && (
                      <p className="text-sm text-gray-600 mb-1">{scan.brand}</p>
                    )}
                    <p className="text-xs text-gray-500">{formatDate(scan.scanDate)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getRiskColor(scan.riskScore)}`}>
                      {scan.riskScore}
                    </span>
                    <div className="flex gap-1">
                      {scan.hasFavoriteIngredients && (
                        <div className="p-1.5 bg-yellow-50 rounded-full" title="Contains favorite ingredients">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                      {scan.isPending && (
                        <div className="p-1.5 bg-blue-50 rounded-full" title="Pending analysis">
                          <Cloud className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {scan.riskSummary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <h3 className="mb-2">Clear History?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete all your scan history. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="history" />
    </div>
  );
}