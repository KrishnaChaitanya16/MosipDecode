import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Star,
  Eye,
  Check,
  X,
  Filter,
  Search,
  Calendar,
  MapPin,
  Scale,
  Package
} from 'lucide-react';
import QANavbar from './QANavbar';
import './QAPortal.css';

const QAPortal = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [qualityRating, setQualityRating] = useState('');

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Basmati Rice',
      farmer: 'Rajesh Kumar',
      type: 'Rice',
      quantity: '1000 kg',
      location: 'Punjab, India',
      uploadDate: '2024-01-15',
      status: 'pending',
      description: 'High-quality basmati rice with excellent aroma and texture.',
      price: '$2.50/kg'
    },
    {
      id: 2,
      name: 'Organic Wheat',
      farmer: 'Priya Sharma',
      type: 'Wheat',
      quantity: '500 kg',
      location: 'Haryana, India',
      uploadDate: '2024-01-10',
      status: 'pending',
      description: 'Certified organic wheat suitable for premium bread making.',
      price: '$1.80/kg'
    },
    {
      id: 3,
      name: 'Black Pepper',
      farmer: 'Suresh Menon',
      type: 'Spices',
      quantity: '200 kg',
      location: 'Kerala, India',
      uploadDate: '2024-01-08',
      status: 'verified',
      quality: 'Excellent',
      description: 'Premium black pepper with high piperine content.',
      price: '$8.50/kg'
    },
    {
      id: 4,
      name: 'Red Lentils',
      farmer: 'Amit Patel',
      type: 'Pulses',
      quantity: '300 kg',
      location: 'Madhya Pradesh, India',
      uploadDate: '2024-01-12',
      status: 'pending',
      description: 'High-quality red lentils with good protein content.',
      price: '$3.20/kg'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="status-icon pending" />;
      case 'verified':
        return <CheckCircle className="status-icon verified" />;
      case 'rejected':
        return <AlertTriangle className="status-icon rejected" />;
      default:
        return <Clock className="status-icon pending" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'var(--warning-500)';
      case 'verified':
        return 'var(--success-500)';
      case 'rejected':
        return 'var(--error-500)';
      default:
        return 'var(--gray-500)';
    }
  };

  const handleQualityAssessment = () => {
    if (selectedProduct && qualityRating) {
      const updatedProducts = products.map(product => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            status: 'verified',
            quality: qualityRating,
            verifiedDate: new Date().toISOString().split('T')[0]
          };
        }
        return product;
      });
      setProducts(updatedProducts);
      setShowQualityModal(false);
      setSelectedProduct(null);
      setQualityRating('');
    }
  };

  const handleReject = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          status: 'rejected'
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = activeFilter === 'all' || product.status === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = products.filter(p => p.status === 'pending').length;
  const verifiedCount = products.filter(p => p.status === 'verified').length;
  const rejectedCount = products.filter(p => p.status === 'rejected').length;

  return (
    <div className="qa-portal">
      <QANavbar />
      <div className="container">
        <motion.div
          className="portal-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="portal-title">QA Portal</h1>
          <p className="portal-description">
            Review and certify agricultural products for quality assurance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="stats-cards"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock />
            </div>
            <div className="stat-content">
              <div className="stat-number">{pendingCount}</div>
              <div className="stat-label">Pending Review</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon verified">
              <CheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-number">{verifiedCount}</div>
              <div className="stat-label">Verified</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon rejected">
              <AlertTriangle />
            </div>
            <div className="stat-content">
              <div className="stat-number">{rejectedCount}</div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="filters">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({products.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pending ({pendingCount})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'verified' ? 'active' : ''}`}
              onClick={() => setActiveFilter('verified')}
            >
              Verified ({verifiedCount})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'rejected' ? 'active' : ''}`}
              onClick={() => setActiveFilter('rejected')}
            >
              Rejected ({rejectedCount})
            </button>
          </div>
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search products, farmers, or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Products List */}
        <motion.div
          className="products-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="products-grid">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="product-header">
                    <div className="product-status">
                      {getStatusIcon(product.status)}
                      <span 
                        className="status-text"
                        style={{ color: getStatusColor(product.status) }}
                      >
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="action-btn" 
                        title="View Details"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye />
                      </button>
                      {product.status === 'pending' && (
                        <>
                          <button 
                            className="action-btn approve" 
                            title="Approve"
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowQualityModal(true);
                            }}
                          >
                            <Check />
                          </button>
                          <button 
                            className="action-btn reject" 
                            title="Reject"
                            onClick={() => handleReject(product.id)}
                          >
                            <X />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-farmer">by {product.farmer}</p>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-details">
                      <div className="detail-item">
                        <Package className="detail-icon" />
                        <span>{product.type}</span>
                      </div>
                      <div className="detail-item">
                        <Scale className="detail-icon" />
                        <span>{product.quantity}</span>
                      </div>
                      <div className="detail-item">
                        <MapPin className="detail-icon" />
                        <span>{product.location}</span>
                      </div>
                      <div className="detail-item">
                        <Calendar className="detail-icon" />
                        <span>{product.uploadDate}</span>
                      </div>
                    </div>
                    
                    <div className="product-price">
                      <strong>Price:</strong> {product.price}
                    </div>
                    
                    {product.quality && (
                      <div className="product-quality">
                        <strong>Quality Rating:</strong> 
                        <span className={`quality-badge ${product.quality.toLowerCase()}`}>
                          {product.quality}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredProducts.length === 0 && (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="empty-icon" />
              <h3>No products found</h3>
              <p>No products match your current filters</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Quality Assessment Modal */}
      <AnimatePresence>
        {showQualityModal && selectedProduct && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQualityModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Quality Assessment</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowQualityModal(false)}
                >
                  <X />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="product-summary">
                  <h3>{selectedProduct.name}</h3>
                  <p>by {selectedProduct.farmer}</p>
                  <p>{selectedProduct.description}</p>
                </div>
                
                <div className="quality-rating">
                  <label>Quality Rating:</label>
                  <div className="rating-options">
                    <button
                      className={`rating-btn ${qualityRating === 'Excellent' ? 'active' : ''}`}
                      onClick={() => setQualityRating('Excellent')}
                    >
                      <Star />
                      Excellent
                    </button>
                    <button
                      className={`rating-btn ${qualityRating === 'Good' ? 'active' : ''}`}
                      onClick={() => setQualityRating('Good')}
                    >
                      <Star />
                      Good
                    </button>
                    <button
                      className={`rating-btn ${qualityRating === 'Medium' ? 'active' : ''}`}
                      onClick={() => setQualityRating('Medium')}
                    >
                      <Star />
                      Medium
                    </button>
                    <button
                      className={`rating-btn ${qualityRating === 'Poor' ? 'active' : ''}`}
                      onClick={() => setQualityRating('Poor')}
                    >
                      <Star />
                      Poor
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowQualityModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleQualityAssessment}
                  disabled={!qualityRating}
                >
                  <CheckCircle className="btn-icon" />
                  Approve & Certify
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QAPortal; 