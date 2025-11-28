import React, { useContext } from 'react';
import { ArrowLeft, Share2, Info } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import IngredientList from './IngredientList';
import { AppContext } from '../App';

export default function LabelReportScreen() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { selectedReport, setScreen, returnScreen, setSelectedIngredient, setReturnScreen } = context;

  if (!selectedReport) {
    setScreen('camera');
    return null;
  }

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

  const handleShare = () => {
    const text = `${selectedReport.productName}\n${selectedReport.brand ? `Brand: ${selectedReport.brand}\n` : ''}Risk: ${selectedReport.riskScore}\n${selectedReport.riskSummary}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const handleIngredientClick = (ingredient: any) => {
    setSelectedIngredient(ingredient);
    setReturnScreen('label-report');
    setScreen('ingredient-detail');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setScreen(returnScreen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Label Report</h1>
          <div className="flex gap-1">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => setScreen('settings')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Info className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Product Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-4">
            {/* Product Name & Brand */}
            <div>
              <h2 className="mb-1">{selectedReport.productName}</h2>
              {selectedReport.brand && (
                <p className="text-gray-600">{selectedReport.brand}</p>
              )}
            </div>

            {/* Scan Date */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Scanned</span>
              <span className="text-gray-700">{formatDate(selectedReport.scanDate)}</span>
            </div>

            {/* Risk Score */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Risk Level</span>
              <span className={`px-3 py-1.5 rounded-full text-sm border ${getRiskColor(selectedReport.riskScore)}`}>
                {selectedReport.riskScore.toUpperCase()}
              </span>
            </div>

            {/* Thumbnail (simulated) */}
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">Product Image</span>
            </div>

            {/* Risk Summary */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm mb-2">Health Risk Summary</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedReport.riskSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div>
          <h2 className="mb-4">Ingredients</h2>
          <IngredientList 
            ingredients={selectedReport.ingredients} 
            expandable={false}
            onIngredientClick={handleIngredientClick}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="camera" />
    </div>
  );
}