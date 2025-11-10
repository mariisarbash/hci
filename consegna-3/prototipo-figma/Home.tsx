interface HomeProps {
  onNavigate: (tab: 'home' | 'inventory' | 'recipes' | 'shopping') => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-2">Sorteat</h1>
      <p className="text-gray-600 mb-8">Your smart kitchen inventory</p>

      <div className="space-y-4">
        <div className="border-2 border-black p-6 bg-white cursor-pointer hover:bg-gray-50" onClick={() => onNavigate('shopping')}>
          <h2 className="text-lg mb-2">Done shopping?</h2>
          <p className="text-gray-600 mb-4">Update your inventory</p>
          <div className="text-right">
            <span className="text-2xl">→</span>
          </div>
        </div>

        <div className="border border-gray-300 p-4 bg-gray-50">
          <h3 className="mb-2">Quick Stats</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items in inventory</span>
              <span>4</span>
            </div>
            <div className="flex justify-between">
              <span>Shopping list items</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>Available recipes</span>
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
