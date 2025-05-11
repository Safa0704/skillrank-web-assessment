
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, ListCheck, Calendar } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-cream to-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Create <span className="text-green">Smart Grocery Lists</span> From Your Favorite Recipes
              </h1>
              <p className="text-lg text-muted-foreground">
                FreshList helps you organize your shopping by automatically generating grocery lists based on the meals you want to cook. Save time and never forget an ingredient again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/recipes">
                  <Button size="lg" className="bg-green hover:bg-green-light text-white">
                    Browse Recipes
                  </Button>
                </Link>
                <Link to="/grocery-list">
                  <Button size="lg" variant="outline">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    View Grocery List
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl transform transition-all animate-scale-in">
                <img 
                  src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800" 
                  alt="Fresh ingredients and grocery list" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              FreshList makes meal planning and grocery shopping simple with just three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green/10 flex items-center justify-center mb-4">
                <ListCheck className="h-6 w-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Recipes</h3>
              <p className="text-muted-foreground">Browse our collection of delicious recipes and select the ones you want to cook.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green/10 flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate List</h3>
              <p className="text-muted-foreground">FreshList automatically creates a grocery list with all ingredients needed.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green/10 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shop & Cook</h3>
              <p className="text-muted-foreground">Use your organized grocery list while shopping, then enjoy cooking your meals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Features You'll Love</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed to make meal planning and grocery shopping as easy as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=500" 
                  alt="Organized grocery list" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/5">
                <h3 className="text-xl font-semibold mb-3">Categorized Lists</h3>
                <p className="text-muted-foreground mb-4">
                  Ingredients are automatically organized by category, making your shopping trip faster and more efficient.
                </p>
                <Link to="/recipes">
                  <Button variant="ghost" className="text-green hover:text-green-light hover:bg-green/5">
                    Try it now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=500" 
                  alt="Multiple recipes selection" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/5">
                <h3 className="text-xl font-semibold mb-3">Multiple Recipes</h3>
                <p className="text-muted-foreground mb-4">
                  Plan an entire week of meals at once. Select multiple recipes and FreshList will combine all ingredients.
                </p>
                <Link to="/recipes">
                  <Button variant="ghost" className="text-green hover:text-green-light hover:bg-green/5">
                    Try it now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to simplify your grocery shopping?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Start creating smart grocery lists today and never forget an ingredient again.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/recipes">
              <Button size="lg" variant="default" className="bg-white text-green hover:bg-cream">
                Browse Recipes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
