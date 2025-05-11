
import React, { useState } from 'react';
import { useGrocery, Recipe } from '@/context/GroceryContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Recipes: React.FC = () => {
  const { recipes, selectedRecipes, selectRecipe, unselectRecipe } = useGrocery();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get unique categories from recipes
  const categories = ['All', ...Array.from(new Set(recipes.map(recipe => recipe.category)))];
  
  // Filter recipes by search term
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle recipe selection
  const handleToggleRecipe = (recipe: Recipe) => {
    if (selectedRecipes.includes(recipe.id)) {
      unselectRecipe(recipe.id);
      toast({ 
        title: 'Recipe removed', 
        description: `${recipe.title} has been removed from your grocery list.` 
      });
    } else {
      selectRecipe(recipe.id);
      toast({ 
        title: 'Recipe added', 
        description: `${recipe.title} has been added to your grocery list.` 
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Recipes</h1>
          <p className="text-muted-foreground">
            Select recipes to add their ingredients to your grocery list.
          </p>
        </div>
        
        {selectedRecipes.length > 0 && (
          <Link to="/grocery-list">
            <Button>
              View Grocery List ({selectedRecipes.length} {selectedRecipes.length === 1 ? 'recipe' : 'recipes'})
            </Button>
          </Link>
        )}
      </div>
      
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search recipes..."
            className="flex h-10 w-full md:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="All">
          <TabsList className="mb-6 flex flex-wrap">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes
                  .filter(recipe => category === 'All' || recipe.category === category)
                  .map((recipe) => {
                    const isSelected = selectedRecipes.includes(recipe.id);
                    
                    return (
                      <div 
                        key={recipe.id} 
                        className="border border-border rounded-lg overflow-hidden bg-card recipe-card"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-full object-cover transition-transform duration-300" 
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-xl">{recipe.title}</h3>
                            <Badge variant="outline" className="category-badge">{recipe.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{recipe.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              {recipe.ingredients.length} ingredients
                            </div>
                            <Button 
                              onClick={() => handleToggleRecipe(recipe)}
                              variant={isSelected ? "secondary" : "default"}
                              className={isSelected ? "bg-green/10 text-green hover:bg-green/20" : "bg-green hover:bg-green-light"}
                            >
                              {isSelected ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Added
                                </>
                              ) : (
                                <>
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add to List
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Recipes;
