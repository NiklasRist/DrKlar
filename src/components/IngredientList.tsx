import React, { useContext, useState } from 'react';
import { Star, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { Ingredient } from '../App';
import { AppContext } from '../App';


type IngredientListProps = {
  ingredients: Ingredient[];
  expandable?: boolean;
  showShare?: boolean;
  onIngredientClick?: (ingredient: Ingredient) => void;
};

export default function IngredientList({ 
  ingredients, 
  expandable = false, 
  showShare = false,
  onIngredientClick 
}: IngredientListProps) {
  const context = useContext(AppContext);
  if (!context) return null;

  const { toggleFavorite } = context;
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShare = (ingredient: Ingredient, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${ingredient.name} (${ingredient.eNumber})\n${ingredient.riskSummary}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="space-y-2">
      {ingredients.map((ingredient) => {
        const isExpanded = expandedIds.has(ingredient.id);
        
        return (
          <div
            key={ingredient.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div
              className={`p-4 ${expandable || onIngredientClick ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (expandable) {
                  toggleExpand(ingredient.id);
                } else if (onIngredientClick) {
                  onIngredientClick(ingredient);
                }
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="truncate">{ingredient.name}</h3>
                    <span className="text-gray-500 text-sm shrink-0">{ingredient.eNumber}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{ingredient.category}</p>
                  <p className="text-sm text-gray-700">{ingredient.riskSummary}</p>
                  
                  {isExpanded && ingredient.fullRiskSummary && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                      <div>
                        <p className="text-sm">{ingredient.fullRiskSummary}</p>
                      </div>
                      
                      {ingredient.commonNames && ingredient.commonNames.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Common names:</p>
                          <p className="text-sm">{ingredient.commonNames.join(', ')}</p>
                        </div>
                      )}
                      
                      {ingredient.groupsAtRisk && ingredient.groupsAtRisk.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Groups at risk:</p>
                          <p className="text-sm">{ingredient.groupsAtRisk.join(', ')}</p>
                        </div>
                      )}
                      
                      {ingredient.classification && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Classification:</p>
                          <p className="text-sm">{ingredient.classification}</p>
                        </div>
                      )}
                      
                      {ingredient.regulatoryStatus && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Regulatory status:</p>
                          <p className="text-sm">{ingredient.regulatoryStatus}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(ingredient.riskLevel)}`}>
                    {ingredient.riskLevel}
                  </span>
                  
                  {showShare && (
                    <button
                      onClick={(e) => handleShare(ingredient, e)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(ingredient.id);
                    }}
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
                  
                  {expandable && (
                    <button className="p-2">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
