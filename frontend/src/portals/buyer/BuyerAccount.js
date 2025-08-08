import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  ShoppingCart,
  LogOut,
  Moon,
  Sun,
  Edit,
  Save,
  X,
  Package,
  CreditCard,
  Star,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './BuyerAccount.css';

const BuyerAccount = ({ onClose }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  
  const [userInfo, setUserInfo] = useState({
    name: 'Amit Gupta',
    email: 'amit.gupta@buyer.com',
    phone: '+91 98765 67890',
    location: 'Delhi, India',
    joinDate: '2023-08-10',
    company: 'Fresh Foods Pvt Ltd',
    businessType: 'Wholesale Trading',
    totalPurchases: 156,
    totalSpent: 125000,
    favoriteProducts: 23
  });

  const [editForm, setEditForm] = useState(userInfo);

  const recentPurchases = [
    {
      id: 1,
      productName: 'Premium Basmati Rice',
      farmer: 'Rajesh Kumar',
      purchaseDate: '2024-01-15',
      quantity: '500 kg',
      price: '$1,250',
      quality: 'Excellent'
    },
    {
      id: 2,
      productName: 'Black Pepper',
      farmer: 'Suresh Menon',
      purchaseDate: '2024-01-12',
      quantity: '100 kg',
      price: '$850',
      quality: 'Excellent'
    },
    {
      id: 3,
      productName: 'Organic Wheat',
      farmer: 'Priya Sharma',
      purchaseDate: '2024-01-10',
      quantity: '300 kg',
      price: '$540',
      quality: 'Good'
    },
    {
      id: 4,
      productName: 'Red Lentils',
      farmer: 'Amit Patel',
      purchaseDate: '2024-01-08',
      quantity: '200 kg',
      price: '$640',
      quality: 'Good'
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

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent':
        return 'var(--success-500)';
      case 'Good':
        return 'var(--primary-500)';
      case 'Medium':
        return 'var(--warning-500)';
      case 'Poor':
        return 'var(--error-500)';
      default:
        return 'var(--gray-500)';
    }
  };

  const handleLogout = () => {
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
        className="account-modal buyer-account"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="account-header">
          <h2>Buyer Account</h2>
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
                    value={editForm.company}
                    onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={editForm.businessType}
                    onChange={(e) => setEditForm({...editForm, businessType: e.target.value})}
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
                    <span>Company: {userInfo.company}</span>
                  </div>
                  <div className="detail-item">
                    <TrendingUp size={16} />
                    <span>Business: {userInfo.businessType}</span>
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
              <div className="stat-number">{userInfo.totalPurchases}</div>
              <div className="stat-label">Total Purchases</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">${userInfo.totalSpent.toLocaleString()}</div>
              <div className="stat-label">Total Spent</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{userInfo.favoriteProducts}</div>
              <div className="stat-label">Favorites</div>
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="history-section">
            <h3>Recent Purchases</h3>
            <div className="purchases-list">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="purchase-item">
                  <div className="purchase-info">
                    <div className="product-name">{purchase.productName}</div>
                    <div className="purchase-details">
                      <span>from {purchase.farmer}</span>
                      <span>{purchase.quantity}</span>
                      <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="purchase-status">
                    <div className="price">{purchase.price}</div>
                    <div 
                      className="quality-badge"
                      style={{ color: getQualityColor(purchase.quality) }}
                    >
                      {purchase.quality}
                    </div>
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

export default BuyerAccount;