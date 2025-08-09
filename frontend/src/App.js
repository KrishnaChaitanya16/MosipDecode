import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import FarmerPortal from './portals/farmer/FarmerPortal';
import QAPortal from './portals/qa/QAPortal';
import BuyerPortal from './portals/buyer/BuyerPortal';
import QRScanner from './portals/buyer/QRScanner';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import './App.css';

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to={roleToPath(user?.role)} replace />;
  return children;
}

function roleToPath(role) {
  if (role === 'exporter' || role === 'farmer') return '/farmer';
  if (role === 'qa_agency' || role === 'qa') return '/qa';
  if (role === 'importer' || role === 'buyer') return '/buyer';
  return '/login';
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/scanner" element={<QRScanner />} />
            <Route
              path="/farmer"
              element={
                <ProtectedRoute allowedRoles={['exporter', 'farmer']}>
                  <FarmerPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/qa"
              element={
                <ProtectedRoute allowedRoles={['qa_agency', 'qa']}>
                  <QAPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buyer"
              element={
                <ProtectedRoute allowedRoles={['importer', 'buyer']}>
                  <BuyerPortal />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;