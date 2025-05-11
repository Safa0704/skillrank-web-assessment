
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GroceryProvider } from './context/GroceryContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
// Import Firebase configuration
import './lib/firebase';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <GroceryProvider>
        <App />
      </GroceryProvider>
    </AuthProvider>
  </React.StrictMode>
);
