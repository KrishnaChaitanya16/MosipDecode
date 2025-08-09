import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Leaf, Shield, Users, QrCode } from 'lucide-react';
import './Navbar.css';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Leaf },
    { path: '/farmer', label: 'Farmer Portal', icon: Users },
    { path: '/qa', label: 'QA Portal', icon: Shield },
    { path: '/buyer', label: 'Buyer Portal', icon: Users },
    { path: '/scanner', label: 'QR Scanner', icon: QrCode },
  ];

  const roleToPortalPath = (role) => {
    if (role === 'exporter') return '/farmer';
    if (role === 'qa_agency') return '/qa';
    if (role === 'importer') return '/buyer';
    return '/';
  };

  const displayedNavItems = (() => {
    if (!isAuthenticated) return navItems;
    const portalPath = roleToPortalPath(user?.role);
    return navItems.filter(item => item.path === '/' || item.path === '/scanner' || item.path === portalPath);
  })();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <motion.div
            className="brand-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Leaf className="logo-icon" />
            <span className="brand-text">AgriQCert</span>
          </motion.div>
        </Link>

        <div className="navbar-menu">
          <ul className="nav-list">
            {displayedNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.li key={item.path} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup">Signup</Link>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <motion.div
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="mobile-nav-list">
          {displayedNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="mobile-nav-item">
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="mobile-nav-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          {!isAuthenticated && (
            <li className="mobile-nav-item">
              <Link to="/login" className={`mobile-nav-link ${location.pathname === '/login' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Login</Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="mobile-nav-item">
              <Link to="/signup" className={`mobile-nav-link ${location.pathname === '/signup' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Signup</Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="mobile-nav-item">
              <button className="mobile-nav-link" onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
            </li>
          )}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar; 