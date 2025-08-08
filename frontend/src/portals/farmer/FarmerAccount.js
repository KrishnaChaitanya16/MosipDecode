import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Upload,
  LogOut,
  Moon,
  Sun,
  Edit,
  Save,
  X,
  Package,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './FarmerAccount.css';

const FarmerAccount = ({ onClose }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  
  const [userInfo, setUserInfo] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@farmer.com',
    phone: '+91 98765 43210',
    location: 'Punjab, India',
    joinDate: '2023-06-15',
    farmSize: '25 acres',
    specialization: 'Rice & Wheat',
    totalProducts: 47,
    verifiedProducts: 35,
    soldProducts: 28
  });

  const [editForm, setEditForm] = useState(userInfo);

  const recentProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice',
      uploadDate: '2024-01-15',
      status: 'verified',
      quantity: '1000 kg',
      price: '$2.50/kg'
    },
    {
      id: 2,
      name: 'Organic Wheat',
      uploadDate: '2024-01-10',
      status: 'uploaded',
      quantity: '500 kg',
      price: '$1.80/kg'
    },
    {
      id: 3,
      name: 'Black Pepper',
      uploadDate: '2024-01-08',
      status: 'purchased',
      quantity: '200 kg',
      price: '$8.50/kg'
    },
    {
      id: 4,
      name: 'Red Lentils',
      uploadDate: '2024-01-05',
      status: 'verified',
      quantity: '300 kg',
      price: '$3.20/kg'
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded':
        return <Clock className="status-icon uploaded" />;
      case 'verified':
        return <CheckCircle className="status-icon verified" />;
      case 'purchased':
        return <Package className="status-icon purchased" />;
      default:
        return <Clock className="status-icon uploaded" />;
    }
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    alert('Logout functionality would be implemented here');
  };

  return (
    <motion.div
      className="account-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="account-modal farmer-account"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="account-header">
          <h2>Farmer Account</h2>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="close-btn" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <div className="account-content">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-image-container">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="profile-image"
              />
              <label className="image-upload-btn">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            
            <div className="profile-info">
              {isEditing ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={editForm.farmSize}
                    onChange={(e) => setEditForm({...editForm, farmSize: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={editForm.specialization}
                    onChange={(e) => setEditForm({...editForm, specialization: e.target.value})}
                    className="form-input"
                  />
                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={handleCancel}>
                      <X size={16} />
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                      <Save size={16} />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <h3>{userInfo.name}</h3>
                  <div className="detail-item">
                    <Mail size={16} />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={16} />
                    <span>{userInfo.phone}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{userInfo.location}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Joined {new Date(userInfo.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <Package size={16} />
                    <span>Farm Size: {userInfo.farmSize}</span>
                  </div>
                  <div className="detail-item">
                    <Upload size={16} />
                    <span>Specialization: {userInfo.specialization}</span>
                  </div>
                  <button 
                    className="btn btn-outline edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-number">{userInfo.totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{userInfo.verifiedProducts}</div>
              <div className="stat-label">Verified</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{userInfo.soldProducts}</div>
              <div className="stat-label">Sold</div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="history-section">
            <h3>Recent Products</h3>
            <div className="products-list">
              {recentProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-details">
                      <span>{product.quantity}</span>
                      <span>{product.price}</span>
                      <span>{new Date(product.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="product-status">
                    {getStatusIcon(product.status)}
                    <span className={`status-text ${product.status}`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="account-footer">
          <button className="btn btn-outline logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FarmerAccount;