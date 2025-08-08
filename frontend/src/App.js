import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import FarmerPortal from './portals/farmer/FarmerPortal';
import QAPortal from './portals/qa/QAPortal';
import BuyerPortal from './portals/buyer/BuyerPortal';
import './App.css';

function App() {
  // For now, we'll show only the Farmer Portal
  // In the future, this will be determined by authentication
  const currentPortal = 'farmer'; // 'farmer', 'qa', or 'buyer'
  
  // You can change this to test different portals:
  // const currentPortal = 'farmer'; // Farmer Portal (default)
  // const currentPortal = 'qa'; // QA Portal

  const renderPortal = () => {
    switch (currentPortal) {
      case 'farmer':
        return <FarmerPortal />;
      case 'qa':
        return <QAPortal />;
      case 'buyer':
        return <BuyerPortal />;
      default:
        return <FarmerPortal />;
    }
  };

  return (
    <ThemeProvider>
      <div className="App">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPortal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPortal()}
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App; 