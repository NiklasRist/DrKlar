import React, { useContext } from 'react';
import { ArrowLeft, Star, Share2, ExternalLink, Info } from 'lucide-react';
import { AppContext } from '../App';
import BottomNavigation from './BottomNavigation';

export default function IngredientDetailView() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { selectedIngredient, setScreen, toggleFavorite, returnScreen } = context;

  if (!selectedIngredient) {
    setScreen('wiki');
    return null;
  }

  const ingredient = selectedIngredient;

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

  const handleShare = () => {
    const text = `${ingredient.name} (${ingredient.eNumber})\n\n${ingredient.fullRiskSummary || ingredient.riskSummary}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const handleBack = () => {
    // Go back to the screen we came from (wiki, favorites, or label-report)
    if (returnScreen === 'favorites') {
      setScreen('favorites');
    } else if (returnScreen === 'label-report') {
      setScreen('label-report');
    } else {
      setScreen('wiki');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center truncate px-4">{ingredient.eNumber}</h1>
          <div className="flex gap-1">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleFavorite(ingredient.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Star
                className={`w-5 h-5 ${
                  ingredient.isFavorite
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            </button>
            <button
              onClick={() => setScreen('settings')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <h2 className="mb-2">{ingredient.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{ingredient.eNumber}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{ingredient.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Risk Level:</span>
            <span className={`px-3 py-1 rounded-full text-sm border ${getRiskColor(ingredient.riskLevel)}`}>
              {ingredient.riskLevel.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Common Names */}
        {ingredient.commonNames && ingredient.commonNames.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm mb-3">Common Names</h3>
            <p>{ingredient.commonNames.join(', ')}</p>
          </div>
        )}

        {/* Technical Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-sm">Technical Information</h3>
          
          {ingredient.casNumber && (
            <div>
              <p className="text-xs text-gray-500 mb-1">CAS Number</p>
              <p className="text-sm">{ingredient.casNumber}</p>
            </div>
          )}

          {ingredient.classification && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Classification</p>
              <p className="text-sm">{ingredient.classification}</p>
            </div>
          )}
        </div>

        {/* Risk Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm mb-3">Long-Term Risk Summary</h3>
          <p className="text-sm leading-relaxed">
            {ingredient.fullRiskSummary || ingredient.riskSummary}
          </p>
        </div>

        {/* Groups at Risk */}
        {ingredient.groupsAtRisk && ingredient.groupsAtRisk.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm mb-3">Groups at Risk</h3>
            <ul className="space-y-2">
              {ingredient.groupsAtRisk.map((group, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-sm">{group}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Regulatory Status */}
        {ingredient.regulatoryStatus && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm mb-3">Regulatory Status</h3>
            <p className="text-sm">{ingredient.regulatoryStatus}</p>
          </div>
        )}

        {/* Sources */}
        {ingredient.sources && ingredient.sources.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm mb-3">Sources</h3>
            <div className="space-y-2">
              {ingredient.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-700 py-2"
                >
                  <span>{source.title}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Bottom Navigation */}
      <div>
        <BottomNavigation activeTab="camera" />
      </div>
    </div>
  );
}