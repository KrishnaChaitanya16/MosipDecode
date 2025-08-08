import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Package, History, User } from 'lucide-react';
import FarmerAccount from './FarmerAccount';
import './FarmerNavbar.css';

const FarmerNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="farmer-navbar">
      <div className="farmer-navbar-container">
        <motion.div 
          className="farmer-navbar-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Package className="farmer-navbar-logo" />
          <span className="farmer-navbar-title">AgriQCert - Farmer Portal</span>
        </motion.div>

        <div className="farmer-navbar-links">
          <motion.a 
            href="#upload" 
            className="farmer-navbar-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload size={18} />
            <span>Upload Product</span>
          </motion.a>
          
          <motion.a 
            href="#products" 
            className="farmer-navbar-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Package size={18} />
            <span>My Products</span>
          </motion.a>
          
          <motion.a 
            href="#history" 
            className="farmer-navbar-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <History size={18} />
            <span>History</span>
          </motion.a>
        </div>

        <motion.button 
          className="farmer-navbar-profile"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAccount(true)}
        >
          <User size={18} />
          <span>Farmer Account</span>
        </motion.button>

        <button 
          className="farmer-navbar-mobile-toggle"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          className="farmer-navbar-mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <a href="#upload" className="farmer-navbar-mobile-link">
            <Upload size={18} />
            <span>Upload Product</span>
          </a>
          <a href="#products" className="farmer-navbar-mobile-link">
            <Package size={18} />
            <span>My Products</span>
          </a>
          <a href="#history" className="farmer-navbar-mobile-link">
            <History size={18} />
            <span>History</span>
          </a>
        </motion.div>
      )}

      {/* Account Modal */}
      <AnimatePresence>
        {showAccount && (
          <FarmerAccount onClose={() => setShowAccount(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default FarmerNavbar; 