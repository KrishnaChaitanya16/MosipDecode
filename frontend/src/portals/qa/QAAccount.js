import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Shield,
  LogOut,
  Moon,
  Sun,
  Edit,
  Save,
  X,
  CheckCircle,
  Star,
  Award,
  FileCheck
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './QAAccount.css';

const QAAccount = ({ onClose }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  
  const [userInfo, setUserInfo] = useState({
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@qa.com',
    phone: '+91 98765 12345',
    location: 'Mumbai, India',
    joinDate: '2023-03-20',
    license: 'QA-IND-2023-1247',
    specialization: 'Grain Quality Assessment',
    experience: '12 years',
    totalReviews: 342,
    approvedProducts: 298,
    rejectedProducts: 44
  });

  const [editForm, setEditForm] = useState(userInfo);

  const recentReviews = [
    {
      id: 1,
      productName: 'Premium Basmati Rice',
      farmer: 'Rajesh Kumar',
      reviewDate: '2024-01-15',
      quality: 'Excellent',
      status: 'approved'
    },
    {
      id: 2,
      productName: 'Black Pepper',
      farmer: 'Suresh Menon',
      reviewDate: '2024-01-12',
      quality: 'Excellent',
      status: 'approved'
    },
    {
      id: 3,
      productName: 'Organic Wheat',
      farmer: 'Amit Patel',
      reviewDate: '2024-01-10',
      quality: 'Good',
      status: 'approved'
    },
    {
      id: 4,
      productName: 'Red Lentils',
      farmer: 'Priya Sharma',
      reviewDate: '2024-01-08',
      quality: 'Poor',
      status: 'rejected'
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

  const getStatusIcon = (status) => {
    return status === 'approved' ? 
      <CheckCircle className="status-icon approved" /> : 
      <X className="status-icon rejected" />;
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
        className="account-modal qa-account"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="account-header">
          <h2>QA Inspector Account</h2>
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
                    value={editForm.license}
                    onChange={(e) => setEditForm({...editForm, license: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={editForm.specialization}
                    onChange={(e) => setEditForm({...editForm, specialization: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={editForm.experience}
                    onChange={(e) => setEditForm({...editForm, experience: e.target.value})}
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
                    <Shield size={16} />
                    <span>License: {userInfo.license}</span>
                  </div>
                  <div className="detail-item">
                    <Award size={16} />
                    <span>Specialization: {userInfo.specialization}</span>
                  </div>
                  <div className="detail-item">
                    <Star size={16} />
                    <span>Experience: {userInfo.experience}</span>
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
              <div className="stat-number">{userInfo.totalReviews}</div>
              <div className="stat-label">Total Reviews</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{userInfo.approvedProducts}</div>
              <div className="stat-label">Approved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{userInfo.rejectedProducts}</div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="history-section">
            <h3>Recent Reviews</h3>
            <div className="reviews-list">
              {recentReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-info">
                    <div className="product-name">{review.productName}</div>
                    <div className="review-details">
                      <span>by {review.farmer}</span>
                      <span>{new Date(review.reviewDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="review-status">
                    <div 
                      className="quality-badge"
                      style={{ color: getQualityColor(review.quality) }}
                    >
                      {review.quality}
                    </div>
                    <div className="status-container">
                      {getStatusIcon(review.status)}
                      <span className={`status-text ${review.status}`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
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

export default QAAccount;