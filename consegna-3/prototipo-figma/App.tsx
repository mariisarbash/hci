import { useState } from 'react';
import { Home } from './components/Home';
import { Inventory } from './components/Inventory';
import { Recipes } from './components/Recipes';
import { Shopping } from './components/Shopping';
import { Home as HomeIcon, Package, BookOpen, ShoppingCart } from 'lucide-react';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  expiryDate: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Array<{
    name: string;
    amount: string;
    inInventory: boolean;
  }>;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'inventory' | 'recipes' | 'shopping'>('home');
  
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Whole Milk', category: 'Dairy', quantity: '1.5L', expiryDate: '2025-11-15' },
    { id: '2', name: 'Spaghetti', category: 'Pantry', quantity: '500g', expiryDate: '2026-01-20' },
    { id: '3', name: 'Olive Oil', category: 'Pantry', quantity: '750ml', expiryDate: '2025-12-30' },
    { id: '4', name: 'Eggs', category: 'Dairy', quantity: '12 count', expiryDate: '2025-11-18' },
  ]);

  const [recipes] = useState<Recipe[]>([
    {
      id: '1',
      name: 'Spaghetti al Pomodoro',
      ingredients: [
        { name: 'Spaghetti', amount: '400g', inInventory: true },
        { name: 'Tomato Passata', amount: '500g', inInventory: false },
        { name: 'Olive Oil', amount: '2 tbsp', inInventory: true },
        { name: 'Garlic', amount: '2 cloves', inInventory: true },
        { name: 'Basil', amount: '1 bunch', inInventory: true },
      ],
    },
    {
      id: '2',
      name: 'Scrambled Eggs',
      ingredients: [
        { name: 'Eggs', amount: '4', inInventory: true },
        { name: 'Milk', amount: '50ml', inInventory: true },
        { name: 'Butter', amount: '20g', inInventory: false },
      ],
    },
    {
      id: '3',
      name: 'Caesar Salad',
      ingredients: [
        { name: 'Romaine Lettuce', amount: '1 head', inInventory: false },
        { name: 'Parmesan', amount: '50g', inInventory: false },
        { name: 'Croutons', amount: '1 cup', inInventory: false },
        { name: 'Caesar Dressing', amount: '100ml', inInventory: false },
      ],
    },
  ]);

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  const addToShoppingList = (name: string, quantity: string) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      quantity,
      category: 'For your recipes',
    };
    setShoppingList([...shoppingList, newItem]);
  };

  const addToInventory = (items: Array<{ name: string; quantity: string; price: string }>) => {
    const newItems = items.map((item, index) => ({
      id: Date.now().toString() + index,
      name: item.name,
      category: 'Pantry',
      quantity: item.quantity,
      expiryDate: '2025-12-31',
    }));
    setInventory([...newItems, ...inventory]);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} />;
      case 'inventory':
        return <Inventory items={inventory} />;
      case 'recipes':
        return <Recipes recipes={recipes} onAddToShopping={addToShoppingList} />;
      case 'shopping':
        return <Shopping items={shoppingList} onAddToInventory={addToInventory} onNavigate={setActiveTab} />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto border-x border-gray-200">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderScreen()}
      </div>

      {/* Bottom Tab Bar */}
      <div className="border-t border-gray-300 bg-white">
        <div className="flex">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'home' ? 'text-black' : 'text-gray-400'
            }`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'inventory' ? 'text-black' : 'text-gray-400'
            }`}
          >
            <Package className="w-6 h-6" />
            <span className="text-xs mt-1">Inventory</span>
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'recipes' ? 'text-black' : 'text-gray-400'
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs mt-1">Recipes</span>
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'shopping' ? 'text-black' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
