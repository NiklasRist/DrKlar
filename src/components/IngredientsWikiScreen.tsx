import React, { useContext, useState, useMemo } from 'react';
import { Search, Info } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import IngredientList from './IngredientList';
import { AppContext } from '../App';

export default function IngredientsWikiScreen() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { ingredients, setScreen, setSelectedIngredient, setReturnScreen } = context;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(ingredients.map(i => i.category));
    return ['all', ...Array.from(cats)];
  }, [ingredients]);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter(ingredient => {
      const matchesSearch = 
        searchQuery === '' ||
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ingredient.eNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ingredient.commonNames?.some(name => 
          name.toLowerCase().includes(searchQuery.toLowerCase())
        ));

      const matchesCategory = 
        selectedCategory === 'all' ||
        ingredient.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [ingredients, searchQuery, selectedCategory]);

  const handleIngredientClick = (ingredient: any) => {
    setSelectedIngredient(ingredient);
    setReturnScreen('wiki');
    setScreen('ingredient-detail');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1>Ingredients Wiki</h1>
            <button
              onClick={() => setScreen('settings')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Info className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or E-number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {filteredIngredients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No ingredients found</p>
            <p className="text-sm text-gray-400 mt-2">
              Try a different search term or category
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {filteredIngredients.length} ingredient{filteredIngredients.length !== 1 ? 's' : ''} found
            </p>
            <IngredientList 
              ingredients={filteredIngredients}
              expandable={false}
              onIngredientClick={handleIngredientClick}
            />
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="wiki" />
    </div>
  );
}