import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { InventoryItem } from '../App';

interface InventoryProps {
  items: InventoryItem[];
}

export function Inventory({ items }: InventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const filteredItems = searchQuery
    ? items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = filteredItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300">
        <h1 className="text-xl mb-3">Inventory</h1>
        
        {/* Search Bar */}
        <div className="border border-gray-300 bg-white flex items-center px-3 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearch(e.target.value.length > 0);
            }}
            className="flex-1 outline-none text-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {showSearch && searchQuery ? (
          /* Search Results */
          <div className="p-4">
            <h2 className="text-sm text-gray-600 mb-3">Search Results</h2>
            {filteredItems.length > 0 ? (
              <div className="space-y-2">
                {filteredItems.map(item => (
                  <div key={item.id} className="border border-gray-300 p-4 bg-white">
                    <h3 className="mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.quantity} remaining</p>
                    <p className="text-sm text-gray-500 mt-1">Exp: {new Date(item.expiryDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-300 p-8 text-center text-gray-500">
                No items found
              </div>
            )}
          </div>
        ) : (
          /* Category List */
          <div className="p-4">
            <h2 className="text-sm text-gray-600 mb-3">Categories</h2>
            <div className="space-y-4">
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category}>
                  <div className="border border-gray-300 p-4 bg-gray-50 mb-2">
                    <div className="flex items-center justify-between">
                      <h3>{category}</h3>
                      <span className="text-sm text-gray-500">{categoryItems.length} items</span>
                    </div>
                  </div>
                  <div className="space-y-2 ml-4">
                    {categoryItems.map(item => (
                      <div key={item.id} className="border border-gray-300 p-3 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.quantity}</p>
                          </div>
                          <p className="text-xs text-gray-400">Exp: {new Date(item.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-20 right-6">
        <button className="w-14 h-14 bg-black text-white flex items-center justify-center border-2 border-black shadow-lg">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
