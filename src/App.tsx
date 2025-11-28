import React, { useState, useEffect } from 'react';
import TutorialScreen from './components/TutorialScreen';
import CameraScreen from './components/CameraScreen';
import LabelReportScreen from './components/LabelReportScreen';
import HistoryScreen from './components/HistoryScreen';
import IngredientsWikiScreen from './components/IngredientsWikiScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SettingsScreen from './components/SettingsScreen';
import IngredientDetailView from './components/IngredientDetailView';

export type Screen = 
  | 'tutorial' 
  | 'camera' 
  | 'label-report' 
  | 'history' 
  | 'wiki' 
  | 'favorites' 
  | 'settings'
  | 'ingredient-detail';

export type RiskLevel = 'low' | 'medium' | 'high';

export type Ingredient = {
  id: string;
  name: string;
  eNumber: string;
  category: string;
  riskLevel: RiskLevel;
  riskSummary: string;
  isFavorite: boolean;
  commonNames?: string[];
  casNumber?: string;
  classification?: string;
  fullRiskSummary?: string;
  groupsAtRisk?: string[];
  regulatoryStatus?: string;
  sources?: { title: string; url: string }[];
};

export type ScanReport = {
  id: string;
  productName: string;
  brand?: string;
  scanDate: Date;
  thumbnail?: string;
  riskScore: RiskLevel;
  riskSummary: string;
  ingredients: Ingredient[];
  hasFavoriteIngredients?: boolean;
  isPending?: boolean;
};

export type AppContextType = {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  selectedReport: ScanReport | null;
  setSelectedReport: (report: ScanReport | null) => void;
  selectedIngredient: Ingredient | null;
  setSelectedIngredient: (ingredient: Ingredient | null) => void;
  scanHistory: ScanReport[];
  addScanToHistory: (scan: ScanReport) => void;
  clearHistory: () => void;
  ingredients: Ingredient[];
  toggleFavorite: (ingredientId: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  offlineMode: boolean;
  setOfflineMode: (mode: boolean) => void;
  returnScreen: Screen;
  setReturnScreen: (screen: Screen) => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

export default function App() {
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(false);
  const [screen, setScreen] = useState<Screen>('tutorial');
  const [selectedReport, setSelectedReport] = useState<ScanReport | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanReport[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [language, setLanguage] = useState('English');
  const [offlineMode, setOfflineMode] = useState(false);
  const [returnScreen, setReturnScreen] = useState<Screen>('camera');

  // Initialize mock ingredient database
  useEffect(() => {
    const mockIngredients: Ingredient[] = [
      {
        id: 'e102',
        name: 'Tartrazine',
        eNumber: 'E102',
        category: 'Colours',
        riskLevel: 'high',
        riskSummary: 'Linked to hyperactivity in children',
        isFavorite: false,
        commonNames: ['Tartrazine', 'Yellow 5'],
        casNumber: '1934-21-0',
        classification: 'Synthetic',
        fullRiskSummary: 'Tartrazine is a synthetic azo dye that has been linked to hyperactivity and attention problems in children. Some studies suggest it may cause allergic reactions in sensitive individuals, particularly those with aspirin intolerance.',
        groupsAtRisk: ['Children', 'People with aspirin sensitivity', 'Asthma patients'],
        regulatoryStatus: 'Approved in EU and US with warning labels required in some countries',
        sources: [
          { title: 'EFSA Opinion on Food Colours', url: 'https://efsa.europa.eu' },
          { title: 'FDA Color Additives', url: 'https://fda.gov' }
        ]
      },
      {
        id: 'e211',
        name: 'Sodium Benzoate',
        eNumber: 'E211',
        category: 'Preservatives',
        riskLevel: 'medium',
        riskSummary: 'May form benzene when combined with vitamin C',
        isFavorite: false,
        commonNames: ['Sodium Benzoate', 'Benzoate of Soda'],
        casNumber: '532-32-1',
        classification: 'Synthetic',
        fullRiskSummary: 'Sodium benzoate is a widely used preservative. When combined with ascorbic acid (vitamin C), it can form benzene, a known carcinogen. Regular consumption has been associated with hyperactivity in some children.',
        groupsAtRisk: ['Children', 'Pregnant women'],
        regulatoryStatus: 'Approved in EU and US with concentration limits',
        sources: [
          { title: 'WHO Food Additives Series', url: 'https://who.int' }
        ]
      },
      {
        id: 'e100',
        name: 'Curcumin',
        eNumber: 'E100',
        category: 'Colours',
        riskLevel: 'low',
        riskSummary: 'Natural colorant, generally safe',
        isFavorite: false,
        commonNames: ['Curcumin', 'Turmeric'],
        casNumber: '458-37-7',
        classification: 'Natural',
        fullRiskSummary: 'Curcumin is a natural yellow pigment derived from turmeric. It is generally recognized as safe and may even have health benefits including anti-inflammatory properties.',
        groupsAtRisk: [],
        regulatoryStatus: 'Approved globally',
        sources: [
          { title: 'Natural Food Colorants', url: 'https://example.com' }
        ]
      },
      {
        id: 'e330',
        name: 'Citric Acid',
        eNumber: 'E330',
        category: 'Acidity Regulators',
        riskLevel: 'low',
        riskSummary: 'Natural acid, generally safe',
        isFavorite: false,
        commonNames: ['Citric Acid'],
        casNumber: '77-92-9',
        classification: 'Natural/Synthetic',
        fullRiskSummary: 'Citric acid is naturally found in citrus fruits and is widely used as a preservative and flavor enhancer. It is considered safe for consumption.',
        groupsAtRisk: [],
        regulatoryStatus: 'Approved globally',
        sources: []
      },
      {
        id: 'e621',
        name: 'Monosodium Glutamate',
        eNumber: 'E621',
        category: 'Flavor Enhancers',
        riskLevel: 'medium',
        riskSummary: 'May cause sensitivity reactions in some people',
        isFavorite: false,
        commonNames: ['MSG', 'Monosodium Glutamate'],
        casNumber: '142-47-2',
        classification: 'Synthetic',
        fullRiskSummary: 'MSG is a flavor enhancer that some people report sensitivity to, experiencing symptoms like headaches or flushing. Scientific evidence on long-term risks is mixed.',
        groupsAtRisk: ['MSG-sensitive individuals'],
        regulatoryStatus: 'Approved in most countries',
        sources: []
      },
      {
        id: 'e110',
        name: 'Sunset Yellow',
        eNumber: 'E110',
        category: 'Colours',
        riskLevel: 'high',
        riskSummary: 'Linked to hyperactivity and allergic reactions',
        isFavorite: false,
        commonNames: ['Sunset Yellow', 'Orange Yellow S'],
        casNumber: '2783-94-0',
        classification: 'Synthetic',
        fullRiskSummary: 'Sunset Yellow is an azo dye that has been associated with hyperactivity in children and allergic reactions in sensitive individuals.',
        groupsAtRisk: ['Children', 'People with allergies'],
        regulatoryStatus: 'Approved with warnings in EU',
        sources: []
      }
    ];
    setIngredients(mockIngredients);

    // Add mock scan history
    const mockHistory: ScanReport[] = [
      {
        id: 'scan-1',
        productName: 'Orange Soft Drink',
        brand: 'FizzyCo',
        scanDate: new Date('2025-03-21T18:24:00'),
        riskScore: 'high',
        riskSummary: 'Contains several artificial dyes linked to hyperactivity in children and preservatives associated with increased cancer risk when eaten often.',
        ingredients: [mockIngredients[0], mockIngredients[1], mockIngredients[3]],
        hasFavoriteIngredients: false,
        isPending: false
      },
      {
        id: 'scan-2',
        productName: 'Natural Juice',
        brand: 'HealthyBrand',
        scanDate: new Date('2025-03-20T14:15:00'),
        riskScore: 'low',
        riskSummary: 'Uses natural colorants and preservatives. Generally safe for regular consumption.',
        ingredients: [mockIngredients[2], mockIngredients[3]],
        hasFavoriteIngredients: false,
        isPending: false
      }
    ];
    setScanHistory(mockHistory);
  }, []);

  const addScanToHistory = (scan: ScanReport) => {
    setScanHistory(prev => [scan, ...prev]);
  };

  const clearHistory = () => {
    setScanHistory([]);
  };

  const toggleFavorite = (ingredientId: string) => {
    setIngredients(prev => 
      prev.map(ing => 
        ing.id === ingredientId 
          ? { ...ing, isFavorite: !ing.isFavorite }
          : ing
      )
    );
  };

  const contextValue: AppContextType = {
    screen,
    setScreen,
    selectedReport,
    setSelectedReport,
    selectedIngredient,
    setSelectedIngredient,
    scanHistory,
    addScanToHistory,
    clearHistory,
    ingredients,
    toggleFavorite,
    language,
    setLanguage,
    offlineMode,
    setOfflineMode,
    returnScreen,
    setReturnScreen
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        {screen === 'tutorial' && (
          <TutorialScreen onComplete={() => {
            setHasCompletedTutorial(true);
            setScreen('camera');
          }} />
        )}
        {screen === 'camera' && <CameraScreen />}
        {screen === 'label-report' && <LabelReportScreen />}
        {screen === 'history' && <HistoryScreen />}
        {screen === 'wiki' && <IngredientsWikiScreen />}
        {screen === 'favorites' && <FavoritesScreen />}
        {screen === 'settings' && <SettingsScreen />}
        {screen === 'ingredient-detail' && <IngredientDetailView />}
      </div>
    </AppContext.Provider>
  );
}