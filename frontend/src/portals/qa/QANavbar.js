import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, User } from 'lucide-react';
import QAAccount from './QAAccount';
import './QANavbar.css';

const QANavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="qa-navbar">
      <div className="qa-navbar-container">
        <motion.div 
          className="qa-navbar-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Shield className="qa-navbar-logo" />
          <span className="qa-navbar-title">AgriQCert - QA Portal</span>
        </motion.div>

        <div className="qa-navbar-links">
          <motion.a 
            href="#pending" 
            className="qa-navbar-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AlertTriangle size={18} />
            <span>Pending Reviews</span>
          </motion.a>
          
          <motion.a 
            href="#approved" 
            className="qa-navbar-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle size={18} />
            <span>Approved Products</span>
          </motion.a>
          
          <motion.a 
            href="#reports" 
            className="qa-navbar-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield size={18} />
            <span>Quality Reports</span>
          </motion.a>
        </div>

        <motion.button 
          className="qa-navbar-profile"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAccount(true)}
        >
          <User size={18} />
          <span>QA Inspector</span>
        </motion.button>

        <button 
          className="qa-navbar-mobile-toggle"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          className="qa-navbar-mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <a href="#pending" className="qa-navbar-mobile-link">
            <AlertTriangle size={18} />
            <span>Pending Reviews</span>
          </a>
          <a href="#approved" className="qa-navbar-mobile-link">
            <CheckCircle size={18} />
            <span>Approved Products</span>
          </a>
          <a href="#reports" className="qa-navbar-mobile-link">
            <Shield size={18} />
            <span>Quality Reports</span>
          </a>
        </motion.div>
      )}

      {/* Account Modal */}
      <AnimatePresence>
        {showAccount && (
          <QAAccount onClose={() => setShowAccount(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default QANavbar; 