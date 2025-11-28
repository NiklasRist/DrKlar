import React, { useContext, useMemo } from 'react';
import { ArrowLeft, Share2, Info } from 'lucide-react';
import IngredientList from './IngredientList';
import { AppContext } from '../App';
import BottomNavigation from './BottomNavigation';

export default function FavoritesScreen() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { ingredients, setScreen, setSelectedIngredient, setReturnScreen } = context;

  const favoriteIngredients = useMemo(() => {
    return ingredients.filter(ing => ing.isFavorite);
  }, [ingredients]);

  const handleShareAll = () => {
    const text = favoriteIngredients
      .map(ing => `${ing.name} (${ing.eNumber})\n${ing.riskSummary}`)
      .join('\n\n');
    
    if (navigator.share) {
      navigator.share({ text: `My Favorite Ingredients:\n\n${text}` });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const handleIngredientClick = (ingredient: any) => {
    setSelectedIngredient(ingredient);
    setReturnScreen('favorites');
    setScreen('ingredient-detail');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setScreen('history')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Favorites</h1>
          <div className="flex gap-1">
            {favoriteIngredients.length > 0 && (
              <button
                onClick={handleShareAll}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>
            )}
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
      <div className="max-w-md mx-auto px-4 py-6">
        {favoriteIngredients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No favorite ingredients yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Star ingredients to track or avoid them
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {favoriteIngredients.length} favorite ingredient{favoriteIngredients.length !== 1 ? 's' : ''}
            </p>
            <IngredientList 
              ingredients={favoriteIngredients}
              expandable={true}
              showShare={true}
              onIngredientClick={handleIngredientClick}
            />
          </>
        )}
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="camera" />
    </div>
  );
}