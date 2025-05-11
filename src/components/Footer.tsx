
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-green" />
            <span className="text-lg font-bold font-poppins text-green">FreshList</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FreshList. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
