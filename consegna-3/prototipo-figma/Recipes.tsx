import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Recipe } from '../App';

interface RecipesProps {
  recipes: Recipe[];
  onAddToShopping: (name: string, quantity: string) => void;
}

export function Recipes({ recipes, onAddToShopping }: RecipesProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddToList = (ingredientName: string, amount: string) => {
    onAddToShopping(ingredientName, amount);
    setAddedItems(new Set([...addedItems, ingredientName]));
  };

  if (selectedRecipe) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <h1 className="text-xl">{selectedRecipe.name}</h1>
          <button onClick={() => setSelectedRecipe(null)} className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Image Placeholder */}
          <div className="border-b border-gray-300 bg-gray-100 h-48 flex items-center justify-center">
            <div className="text-gray-400">
              <div className="w-32 h-32 border-2 border-gray-300 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-300 rotate-45"></div>
                  <div className="w-full h-0.5 bg-gray-300 -rotate-45 absolute"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="p-4">
            <h2 className="text-lg mb-3">Ingredients</h2>
            <div className="space-y-2">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className={`border p-3 ${
                    ingredient.inInventory ? 'border-gray-300 bg-white' : 'border-gray-400 bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{ingredient.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{ingredient.amount}</p>
                    </div>
                    {!ingredient.inInventory && (
                      <button
                        onClick={() => handleAddToList(ingredient.name, ingredient.amount)}
                        disabled={addedItems.has(ingredient.name)}
                        className={`border px-3 py-1 text-sm flex items-center gap-1 ${
                          addedItems.has(ingredient.name)
                            ? 'border-gray-300 bg-gray-50 text-gray-500'
                            : 'border-black bg-white hover:bg-gray-50'
                        }`}
                      >
                        {addedItems.has(ingredient.name) ? (
                          <>
                            <Check className="w-3 h-3" />
                            Added
                          </>
                        ) : (
                          '+ Add to List'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300">
        <h1 className="text-xl">Recipes</h1>
      </div>

      {/* Recipe Cards */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {recipes.map(recipe => {
            const availableCount = recipe.ingredients.filter(i => i.inInventory).length;
            const totalCount = recipe.ingredients.length;
            
            return (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="border border-gray-300 bg-white cursor-pointer hover:bg-gray-50"
              >
                {/* Image Placeholder */}
                <div className="border-b border-gray-300 bg-gray-100 h-32 flex items-center justify-center">
                  <div className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gray-300 rotate-45"></div>
                      <div className="w-full h-0.5 bg-gray-300 -rotate-45 absolute"></div>
                    </div>
                  </div>
                </div>
                
                {/* Recipe Info */}
                <div className="p-4">
                  <h3 className="mb-2">{recipe.name}</h3>
                  <p className="text-sm text-gray-600">
                    You have {availableCount} of {totalCount} ingredients
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
