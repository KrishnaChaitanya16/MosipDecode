import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  CheckCircle, 
  Star,
  Search,
  Filter,
  Package,
  MapPin,
  Calendar,
  Scale,
  Eye,
  Heart,
  Share2,
  QrCode,
  X
} from 'lucide-react';
import BuyerNavbar from './BuyerNavbar';
import QRScanner from './QRScanner';
import './BuyerPortal.css';

const BuyerPortal = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [activeView, setActiveView] = useState('products'); // 'products' or 'scanner'

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Basmati Rice',
      farmer: 'Rajesh Kumar',
      type: 'Rice',
      quantity: '1000 kg',
      location: 'Punjab, India',
      verifiedDate: '2024-01-15',
      quality: 'Excellent',
      price: '$2.50/kg',
      description: 'High-quality basmati rice with excellent aroma and texture.',
      qrCode: 'AGRIQCERT-001-EXCELLENT-2024',
      available: true
    },
    {
      id: 2,
      name: 'Black Pepper',
      farmer: 'Suresh Menon',
      type: 'Spices',
      quantity: '200 kg',
      location: 'Kerala, India',
      verifiedDate: '2024-01-08',
      quality: 'Excellent',
      price: '$8.50/kg',
      description: 'Premium black pepper with high piperine content.',
      qrCode: 'AGRIQCERT-002-EXCELLENT-2024',
      available: true
    },
    {
      id: 3,
      name: 'Organic Wheat',
      farmer: 'Priya Sharma',
      type: 'Wheat',
      quantity: '500 kg',
      location: 'Haryana, India',
      verifiedDate: '2024-01-10',
      quality: 'Good',
      price: '$1.80/kg',
      description: 'Certified organic wheat suitable for premium bread making.',
      qrCode: 'AGRIQCERT-003-GOOD-2024',
      available: true
    },
    {
      id: 4,
      name: 'Red Lentils',
      farmer: 'Amit Patel',
      type: 'Pulses',
      quantity: '300 kg',
      location: 'Madhya Pradesh, India',
      verifiedDate: '2024-01-12',
      quality: 'Good',
      price: '$3.20/kg',
      description: 'High-quality red lentils with good protein content.',
      qrCode: 'AGRIQCERT-004-GOOD-2024',
      available: false
    }
  ]);

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

  const filteredProducts = products.filter(product => {
    const matchesFilter = activeFilter === 'all' || product.quality === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const excellentCount = products.filter(p => p.quality === 'Excellent').length;
  const goodCount = products.filter(p => p.quality === 'Good').length;
  const mediumCount = products.filter(p => p.quality === 'Medium').length;

  return (
    <div className="buyer-portal">
      <BuyerNavbar activeView={activeView} setActiveView={setActiveView} />
      <div className="container">
        <AnimatePresence mode="wait">
          {activeView === 'products' ? (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="portal-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
          <h1 className="portal-title">Buyer Portal</h1>
          <p className="portal-description">
            Browse and purchase quality-certified agricultural products
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
            <div className="stat-icon excellent">
              <Star />
            </div>
            <div className="stat-content">
              <div className="stat-number">{excellentCount}</div>
              <div className="stat-label">Excellent Quality</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon good">
              <CheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-number">{goodCount}</div>
              <div className="stat-label">Good Quality</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon medium">
              <Package />
            </div>
            <div className="stat-content">
              <div className="stat-number">{mediumCount}</div>
              <div className="stat-label">Medium Quality</div>
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
              All Products ({products.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'Excellent' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Excellent')}
            >
              Excellent ({excellentCount})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'Good' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Good')}
            >
              Good ({goodCount})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'Medium' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Medium')}
            >
              Medium ({mediumCount})
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

        {/* Products Grid */}
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
                    <div className="product-quality">
                      <span 
                        className="quality-badge"
                        style={{ color: getQualityColor(product.quality) }}
                      >
                        {product.quality}
                      </span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="action-btn" 
                        title="View Details"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductModal(true);
                        }}
                      >
                        <Eye />
                      </button>
                      <button className="action-btn" title="Add to Wishlist">
                        <Heart />
                      </button>
                      <button className="action-btn" title="Share">
                        <Share2 />
                      </button>
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
                        <span>Verified: {product.verifiedDate}</span>
                      </div>
                    </div>
                    
                    <div className="product-price">
                      <strong>Price:</strong> {product.price}
                    </div>
                    
                    <div className="product-availability">
                      <span className={`availability-badge ${product.available ? 'available' : 'unavailable'}`}>
                        {product.available ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="product-actions-bottom">
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductModal(true);
                      }}
                    >
                      <QrCode className="btn-icon" />
                      View QR Code
                    </button>
                    <button 
                      className="btn btn-primary"
                      disabled={!product.available}
                    >
                      <ShoppingCart className="btn-icon" />
                      Add to Cart
                    </button>
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
              <ShoppingCart className="empty-icon" />
              <h3>No products found</h3>
              <p>No products match your current filters</p>
            </motion.div>
          )}
        </motion.div>

        {/* Product Details Modal */}
        <AnimatePresence>
          {showProductModal && selectedProduct && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProductModal(false)}
            >
              <motion.div
                className="modal-content"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>Product Details</h2>
                  <button 
                    className="close-btn"
                    onClick={() => setShowProductModal(false)}
                  >
                    <X />
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="product-summary">
                    <h3>{selectedProduct.name}</h3>
                    <p className="farmer-info">by {selectedProduct.farmer}</p>
                    <p>{selectedProduct.description}</p>
                    
                    <div className="product-stats">
                      <div className="stat-item">
                        <strong>Quality:</strong>
                        <span 
                          className="quality-badge"
                          style={{ color: getQualityColor(selectedProduct.quality) }}
                        >
                          {selectedProduct.quality}
                        </span>
                      </div>
                      <div className="stat-item">
                        <strong>Price:</strong> {selectedProduct.price}
                      </div>
                      <div className="stat-item">
                        <strong>Quantity:</strong> {selectedProduct.quantity}
                      </div>
                      <div className="stat-item">
                        <strong>Location:</strong> {selectedProduct.location}
                      </div>
                      <div className="stat-item">
                        <strong>Verified:</strong> {selectedProduct.verifiedDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="qr-section">
                    <h4>QR Code for Verification</h4>
                    <div className="qr-code">
                      <QrCode className="qr-icon" />
                      <div className="qr-text">{selectedProduct.qrCode}</div>
                    </div>
                    <p className="qr-description">
                      Scan this QR code to verify the product's quality certification
                    </p>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setShowProductModal(false)}
                  >
                    Close
                  </button>
                  <button 
                    className="btn btn-primary"
                    disabled={!selectedProduct.available}
                  >
                    <ShoppingCart className="btn-icon" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QRScanner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuyerPortal; 