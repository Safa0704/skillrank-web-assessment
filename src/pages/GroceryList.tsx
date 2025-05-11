
import React, { useState, useRef } from 'react';
import { useGrocery } from '@/context/GroceryContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { CheckSquare, Square, Trash2, Printer, ArrowLeft } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { toast } from '@/hooks/use-toast';

const GroceryList: React.FC = () => {
  const { groceryList, selectedRecipes, recipes, toggleGroceryItem, clearGroceryList } = useGrocery();
  const [showChecked, setShowChecked] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);
  
  // Group items by category
  const itemsByCategory = groceryList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof groceryList>);
  
  // Sort categories and items
  const sortedCategories = Object.keys(itemsByCategory).sort();
  for (const category of sortedCategories) {
    itemsByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
  }

  // Count checked items
  const checkedCount = groceryList.filter(item => item.checked).length;
  const totalCount = groceryList.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  // Selected recipe details
  const selectedRecipeDetails = recipes.filter(recipe => selectedRecipes.includes(recipe.id));

  // Handle print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'FreshList Grocery List',
    onAfterPrint: () => toast({ title: 'Success', description: 'Grocery list printed successfully!' }),
  });

  // Handle clear list with confirmation
  const handleClearList = () => {
    if (groceryList.length === 0) {
      toast({ title: 'No items', description: 'Your grocery list is already empty.' });
      return;
    }
    
    if (confirm('Are you sure you want to clear your grocery list?')) {
      clearGroceryList();
      toast({ title: 'List cleared', description: 'Your grocery list has been cleared.' });
    }
  };

  if (groceryList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Grocery List</h1>
          <div className="bg-card p-8 rounded-lg border border-border">
            <p className="text-muted-foreground mb-6">
              Your grocery list is empty. Add some recipes to get started.
            </p>
            <Link to="/recipes">
              <Button>Browse Recipes</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main grocery list */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Your Grocery List</h1>
              <p className="text-muted-foreground">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} from {selectedRecipes.length} {selectedRecipes.length === 1 ? 'recipe' : 'recipes'}
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/recipes">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Recipes
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print List
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={handleClearList}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear List
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-green" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {checkedCount} of {totalCount} items checked ({Math.round(progress)}%)
            </div>
          </div>

          {/* Show/hide checked items toggle */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="text-sm p-0 h-auto font-normal hover:bg-transparent hover:underline"
              onClick={() => setShowChecked(!showChecked)}
            >
              {showChecked ? 'Hide checked items' : 'Show checked items'}
            </Button>
          </div>
          
          {/* Printable grocery list */}
          <div className="bg-card rounded-lg border border-border p-6" ref={printRef}>
            <div className="print:block print:mb-4 hidden">
              <h2 className="text-2xl font-bold mb-1">FreshList Grocery List</h2>
              <p className="text-sm text-muted-foreground">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
            
            {sortedCategories.map((category, index) => {
              // Filter out checked items if showChecked is false
              const itemsToShow = showChecked 
                ? itemsByCategory[category] 
                : itemsByCategory[category].filter(item => !item.checked);
                
              if (itemsToShow.length === 0) return null;
              
              return (
                <div key={category} className={index > 0 ? 'mt-8' : ''}>
                  <h3 className="font-semibold text-lg mb-3">{category}</h3>
                  <div className="space-y-2">
                    {itemsToShow.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center p-2 rounded-md transition-colors hover:bg-accent/10 ${
                          item.checked ? 'checkbox-item checked' : 'checkbox-item'
                        }`}
                        onClick={() => toggleGroceryItem(item.id)}
                      >
                        <button className="mr-3 text-muted-foreground hover:text-foreground focus:outline-none">
                          {item.checked ? (
                            <CheckSquare className="h-5 w-5" />
                          ) : (
                            <Square className="h-5 w-5" />
                          )}
                        </button>
                        <div className="flex-grow">
                          <span className="text-foreground">{item.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Sidebar with recipe info */}
        <div className="w-full md:w-80 lg:w-96 mt-8 md:mt-0">
          <div className="bg-card rounded-lg border border-border p-6 sticky top-20">
            <h3 className="text-lg font-semibold mb-4">Selected Recipes</h3>
            <div className="space-y-4">
              {selectedRecipeDetails.map((recipe) => (
                <div key={recipe.id} className="flex items-start">
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{recipe.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {recipe.ingredients.length} ingredients
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="mt-4 flex justify-between">
              <Link to="/recipes">
                <Button variant="outline" size="sm">Add More Recipes</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
