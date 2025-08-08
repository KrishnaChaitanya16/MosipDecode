import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, QrCode, Package, User } from 'lucide-react';
import BuyerAccount from './BuyerAccount';
import './BuyerNavbar.css';

const BuyerNavbar = ({ activeView, setActiveView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="buyer-navbar">
      <div className="buyer-navbar-container">
        <motion.div 
          className="buyer-navbar-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ShoppingCart className="buyer-navbar-logo" />
          <span className="buyer-navbar-title">AgriQCert - Buyer Portal</span>
        </motion.div>

        <div className="buyer-navbar-links">
          <motion.button 
            onClick={() => setActiveView('products')}
            className={`buyer-navbar-link ${activeView === 'products' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Package size={18} />
            <span>Browse Products</span>
          </motion.button>
          
          <motion.button 
            onClick={() => setActiveView('scanner')}
            className={`buyer-navbar-link ${activeView === 'scanner' ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <QrCode size={18} />
            <span>QR Scanner</span>
          </motion.button>
          
          <motion.a 
            href="#cart" 
            className="buyer-navbar-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            <span>My Cart</span>
          </motion.a>
        </div>

        <motion.button 
          className="buyer-navbar-profile"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAccount(true)}
        >
          <User size={18} />
          <span>Buyer Account</span>
        </motion.button>

        <button 
          className="buyer-navbar-mobile-toggle"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          className="buyer-navbar-mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <button 
            onClick={() => setActiveView('products')}
            className={`buyer-navbar-mobile-link ${activeView === 'products' ? 'active' : ''}`}
          >
            <Package size={18} />
            <span>Browse Products</span>
          </button>
          <button 
            onClick={() => setActiveView('scanner')}
            className={`buyer-navbar-mobile-link ${activeView === 'scanner' ? 'active' : ''}`}
          >
            <QrCode size={18} />
            <span>QR Scanner</span>
          </button>
          <a href="#cart" className="buyer-navbar-mobile-link">
            <ShoppingCart size={18} />
            <span>My Cart</span>
          </a>
        </motion.div>
      )}

      {/* Account Modal */}
      <AnimatePresence>
        {showAccount && (
          <BuyerAccount onClose={() => setShowAccount(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default BuyerNavbar; 