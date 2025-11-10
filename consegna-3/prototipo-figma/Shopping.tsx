import { useState } from 'react';
import { Camera, Plus } from 'lucide-react';
import { ShoppingItem } from '../App';

interface ShoppingProps {
  items: ShoppingItem[];
  onAddToInventory: (items: Array<{ name: string; quantity: string; price: string }>) => void;
  onNavigate: (tab: 'home' | 'inventory' | 'recipes' | 'shopping') => void;
}

type ShoppingFlow = 'list' | 'add-method' | 'scan' | 'review';

export function Shopping({ items, onAddToInventory, onNavigate }: ShoppingProps) {
  const [flow, setFlow] = useState<ShoppingFlow>('list');
  const [scannedItems] = useState([
    { name: 'Whole Milk', quantity: '2L', price: '3.50€' },
    { name: 'Barilla Pasta', quantity: '500g', price: '1.20€' },
    { name: 'Tomatoes', quantity: '1kg', price: '2.80€' },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmAndAdd = () => {
    onAddToInventory(scannedItems);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setFlow('list');
    onNavigate('inventory');
  };

  // Success Modal
  if (showSuccess) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="border-2 border-black bg-white p-8 max-w-sm w-full text-center">
          <div className="mb-4 text-4xl">✓</div>
          <h2 className="text-xl mb-4">Inventory updated successfully!</h2>
          <button
            onClick={handleSuccessOk}
            className="w-full border-2 border-black bg-black text-white py-3 hover:bg-gray-800"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // Review Receipt Screen
  if (flow === 'review') {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-xl mb-1">Review and confirm</h1>
          <p className="text-sm text-gray-600">Check your purchase details</p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {scannedItems.map((item, index) => (
              <div key={index} className="border border-gray-300 p-3 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm">{item.price}</span>
                </div>
                <p className="text-xs text-gray-500">{item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-300">
          <button
            onClick={handleConfirmAndAdd}
            className="w-full border-2 border-black bg-black text-white py-3 hover:bg-gray-800"
          >
            Confirm & Add to Inventory
          </button>
        </div>
      </div>
    );
  }

  // Simulated Scan Screen
  if (flow === 'scan') {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-xl">Scan Receipt</h1>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="border-4 border-dashed border-gray-400 w-64 h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Position receipt in frame</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-300">
          <button
            onClick={() => setFlow('review')}
            className="w-full border-2 border-black bg-black text-white py-3 hover:bg-gray-800"
          >
            Scan
          </button>
        </div>
      </div>
    );
  }

  // Add Method Screen
  if (flow === 'add-method') {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-xl mb-1">Add to Inventory</h1>
          <p className="text-sm text-gray-600">Choose how to add items</p>
        </div>

        <div className="flex-1 p-6">
          <div className="space-y-4">
            <button
              onClick={() => setFlow('scan')}
              className="w-full border-2 border-black p-6 bg-white hover:bg-gray-50 text-left"
            >
              <div className="flex items-center gap-4">
                <Camera className="w-8 h-8" />
                <div>
                  <h2 className="text-lg mb-1">Add from Receipt</h2>
                  <p className="text-sm text-gray-600">Scan your shopping receipt</p>
                </div>
              </div>
            </button>

            <button className="w-full border-2 border-gray-300 p-6 bg-white hover:bg-gray-50 text-left">
              <div className="flex items-center gap-4">
                <Plus className="w-8 h-8" />
                <div>
                  <h2 className="text-lg mb-1">Add Manually</h2>
                  <p className="text-sm text-gray-600">Enter items one by one</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Shopping List Screen (default)
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-300">
        <h1 className="text-xl mb-3">Shopping List</h1>
        
        <button
          onClick={() => setFlow('add-method')}
          className="w-full border-2 border-black bg-black text-white py-3 hover:bg-gray-800"
        >
          Update Inventory from Shopping
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <div className="border-2 border-gray-300 p-8 bg-gray-50">
              <p className="text-gray-500">Your shopping list is empty</p>
              <p className="text-sm text-gray-400 mt-2">Add items from recipes or manually</p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-sm text-gray-600 mb-3">For your recipes</h2>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="border border-gray-300 p-3 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.quantity}</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-20 right-6">
        <button className="w-14 h-14 bg-black text-white flex items-center justify-center border-2 border-black shadow-lg">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
