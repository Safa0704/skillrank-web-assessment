
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  category: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  ingredients: RecipeIngredient[];
}

export interface GroceryItem extends RecipeIngredient {
  checked: boolean;
  recipes: string[];  // IDs of recipes that include this item
}

interface GroceryContextType {
  recipes: Recipe[];
  selectedRecipes: string[];
  groceryList: GroceryItem[];
  selectRecipe: (recipeId: string) => void;
  unselectRecipe: (recipeId: string) => void;
  toggleGroceryItem: (itemId: string) => void;
  clearGroceryList: () => void;
  filterRecipesByCategory: (category: string | null) => Recipe[];
}

const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

// Sample recipe data
const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Bolognese',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&q=80&w=500',
    category: 'Italian',
    description: 'A rich and hearty Italian pasta dish with a meaty tomato sauce.',
    ingredients: [
      { id: '101', name: 'Spaghetti', quantity: '500g', category: 'Pasta & Grains' },
      { id: '102', name: 'Ground Beef', quantity: '500g', category: 'Meat & Seafood' },
      { id: '103', name: 'Onion', quantity: '1 large', category: 'Vegetables' },
      { id: '104', name: 'Garlic', quantity: '3 cloves', category: 'Vegetables' },
      { id: '105', name: 'Canned Tomatoes', quantity: '800g', category: 'Canned Goods' },
      { id: '106', name: 'Tomato Paste', quantity: '2 tbsp', category: 'Canned Goods' },
      { id: '107', name: 'Red Wine', quantity: '100ml', category: 'Beverages' },
      { id: '108', name: 'Parmesan Cheese', quantity: '50g', category: 'Dairy' }
    ]
  },
  {
    id: '2',
    title: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
    category: 'Asian',
    description: 'A quick and healthy stir fry loaded with colorful vegetables.',
    ingredients: [
      { id: '201', name: 'Rice', quantity: '200g', category: 'Pasta & Grains' },
      { id: '202', name: 'Bell Peppers', quantity: '2', category: 'Vegetables' },
      { id: '203', name: 'Broccoli', quantity: '1 head', category: 'Vegetables' },
      { id: '204', name: 'Carrots', quantity: '2', category: 'Vegetables' },
      { id: '205', name: 'Soy Sauce', quantity: '3 tbsp', category: 'Condiments' },
      { id: '206', name: 'Sesame Oil', quantity: '1 tbsp', category: 'Oils & Vinegars' },
      { id: '207', name: 'Garlic', quantity: '2 cloves', category: 'Vegetables' }
    ]
  },
  {
    id: '3',
    title: 'Greek Salad',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=500',
    category: 'Mediterranean',
    description: 'A fresh and tangy salad with cucumbers, tomatoes, olives, and feta cheese.',
    ingredients: [
      { id: '301', name: 'Cucumber', quantity: '1', category: 'Vegetables' },
      { id: '302', name: 'Tomatoes', quantity: '2', category: 'Vegetables' },
      { id: '303', name: 'Red Onion', quantity: '1/2', category: 'Vegetables' },
      { id: '304', name: 'Feta Cheese', quantity: '100g', category: 'Dairy' },
      { id: '305', name: 'Kalamata Olives', quantity: '100g', category: 'Canned Goods' },
      { id: '306', name: 'Olive Oil', quantity: '3 tbsp', category: 'Oils & Vinegars' },
      { id: '307', name: 'Lemon Juice', quantity: '1 tbsp', category: 'Produce' }
    ]
  },
  {
    id: '4',
    title: 'Chicken Curry',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=500',
    category: 'Indian',
    description: 'A flavorful and aromatic curry dish with tender chicken pieces.',
    ingredients: [
      { id: '401', name: 'Chicken Thighs', quantity: '500g', category: 'Meat & Seafood' },
      { id: '402', name: 'Onion', quantity: '1 large', category: 'Vegetables' },
      { id: '403', name: 'Garlic', quantity: '3 cloves', category: 'Vegetables' },
      { id: '404', name: 'Ginger', quantity: '1 inch', category: 'Vegetables' },
      { id: '405', name: 'Curry Powder', quantity: '2 tbsp', category: 'Spices & Herbs' },
      { id: '406', name: 'Coconut Milk', quantity: '400ml', category: 'Canned Goods' },
      { id: '407', name: 'Rice', quantity: '200g', category: 'Pasta & Grains' },
    ]
  },
  {
    id: '5',
    title: 'Avocado Toast',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1e562441a?auto=format&fit=crop&q=80&w=500',
    category: 'Breakfast',
    description: 'A simple and nutritious breakfast with creamy avocado on toast.',
    ingredients: [
      { id: '501', name: 'Bread', quantity: '2 slices', category: 'Bakery' },
      { id: '502', name: 'Avocado', quantity: '1', category: 'Produce' },
      { id: '503', name: 'Lemon Juice', quantity: '1 tsp', category: 'Produce' },
      { id: '504', name: 'Salt', quantity: 'To taste', category: 'Spices & Herbs' },
      { id: '505', name: 'Pepper', quantity: 'To taste', category: 'Spices & Herbs' },
      { id: '506', name: 'Red Pepper Flakes', quantity: 'Optional', category: 'Spices & Herbs' }
    ]
  },
  {
    id: '6',
    title: 'Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=500',
    category: 'Dessert',
    description: 'Classic homemade cookies with chocolate chips and a soft, chewy center.',
    ingredients: [
      { id: '601', name: 'Flour', quantity: '250g', category: 'Baking' },
      { id: '602', name: 'Butter', quantity: '150g', category: 'Dairy' },
      { id: '603', name: 'Sugar', quantity: '100g', category: 'Baking' },
      { id: '604', name: 'Brown Sugar', quantity: '100g', category: 'Baking' },
      { id: '605', name: 'Eggs', quantity: '2', category: 'Dairy' },
      { id: '606', name: 'Chocolate Chips', quantity: '200g', category: 'Baking' },
      { id: '607', name: 'Vanilla Extract', quantity: '1 tsp', category: 'Baking' },
      { id: '608', name: 'Baking Soda', quantity: '1 tsp', category: 'Baking' }
    ]
  }
];

// Provider component
export const GroceryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes] = useState<Recipe[]>(sampleRecipes);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);

  // Add a recipe to the selected list and update grocery list
  const selectRecipe = (recipeId: string) => {
    if (!selectedRecipes.includes(recipeId)) {
      const newSelectedRecipes = [...selectedRecipes, recipeId];
      setSelectedRecipes(newSelectedRecipes);
      
      // Update grocery list
      const recipe = recipes.find(r => r.id === recipeId);
      if (recipe) {
        const newGroceryList = [...groceryList];
        
        recipe.ingredients.forEach(ingredient => {
          const existingItemIndex = newGroceryList.findIndex(
            item => item.name.toLowerCase() === ingredient.name.toLowerCase()
          );
          
          if (existingItemIndex >= 0) {
            // Ingredient already exists, add recipe to its recipe list
            newGroceryList[existingItemIndex].recipes.push(recipe.id);
          } else {
            // Add new ingredient
            newGroceryList.push({
              ...ingredient,
              checked: false,
              recipes: [recipe.id]
            });
          }
        });
        
        setGroceryList(newGroceryList);
      }
    }
  };

  // Remove a recipe from the selected list and update grocery list
  const unselectRecipe = (recipeId: string) => {
    const newSelectedRecipes = selectedRecipes.filter(id => id !== recipeId);
    setSelectedRecipes(newSelectedRecipes);
    
    // Update grocery list
    if (newSelectedRecipes.length === 0) {
      setGroceryList([]);
    } else {
      const newGroceryList = groceryList
        .map(item => {
          const newRecipes = item.recipes.filter(id => id !== recipeId);
          return {
            ...item,
            recipes: newRecipes
          };
        })
        .filter(item => item.recipes.length > 0);
      
      setGroceryList(newGroceryList);
    }
  };

  // Toggle grocery item checked status
  const toggleGroceryItem = (itemId: string) => {
    setGroceryList(groceryList.map(item => 
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  // Clear grocery list
  const clearGroceryList = () => {
    setSelectedRecipes([]);
    setGroceryList([]);
  };

  // Filter recipes by category
  const filterRecipesByCategory = (category: string | null) => {
    if (!category) return recipes;
    return recipes.filter(recipe => recipe.category === category);
  };

  return (
    <GroceryContext.Provider
      value={{
        recipes,
        selectedRecipes,
        groceryList,
        selectRecipe,
        unselectRecipe,
        toggleGroceryItem,
        clearGroceryList,
        filterRecipesByCategory,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

// Custom hook to use the grocery context
export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (context === undefined) {
    throw new Error('useGrocery must be used within a GroceryProvider');
  }
  return context;
};
