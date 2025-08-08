import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Scale,
  MapPin,
  DollarSign,
  Star,
  TrendingUp,
  Filter,
  Search,
  Download,
  AlertCircle,
  Loader
} from 'lucide-react';
import FarmerNavbar from './FarmerNavbar';
import './FarmerPortal.css';

const FarmerPortal = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Basmati Rice',
      type: 'Rice',
      quantity: '1000 kg',
      location: 'Punjab, India',
      uploadDate: '2024-01-15',
      status: 'verified',
      quality: 'Excellent',
      price: 2.50,
      currency: 'USD',
      unit: 'kg',
      description: 'High-quality basmati rice with excellent aroma and texture.',
      rating: 4.8,
      views: 245,
      revenue: 2500
    },
    {
      id: 2,
      name: 'Organic Wheat',
      type: 'Wheat',
      quantity: '500 kg',
      location: 'Haryana, India',
      uploadDate: '2024-01-10',
      status: 'uploaded',
      quality: null,
      price: 1.80,
      currency: 'USD',
      unit: 'kg',
      description: 'Certified organic wheat suitable for premium bread making.',
      rating: 4.5,
      views: 156,
      revenue: 0
    },
    {
      id: 3,
      name: 'Black Pepper',
      type: 'Spices',
      quantity: '200 kg',
      location: 'Kerala, India',
      uploadDate: '2024-01-08',
      status: 'purchased',
      quality: 'Good',
      price: 8.50,
      currency: 'USD',
      unit: 'kg',
      description: 'Premium black pepper with high piperine content.',
      rating: 4.9,
      views: 312,
      revenue: 1700
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    quantity: '',
    location: '',
    price: '',
    currency: 'USD',
    unit: 'kg',
    description: ''
  });

  const [stats, setStats] = useState({
    totalProducts: products.length,
    totalRevenue: products.reduce((sum, p) => sum + (p.revenue || 0), 0),
    averageRating: products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length,
    totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0)
  });

  useEffect(() => {
    setStats({
      totalProducts: products.length,
      totalRevenue: products.reduce((sum, p) => sum + (p.revenue || 0), 0),
      averageRating: products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length,
      totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0)
    });
  }, [products]);

  const getStatusIcon = (status) => {
    const iconProps = { className: "status-icon", size: 18 };
    switch (status) {
      case 'uploaded':
        return <Clock {...iconProps} style={{ color: 'var(--warning-500)' }} />;
      case 'verified':
        return <CheckCircle {...iconProps} style={{ color: 'var(--success-500)' }} />;
      case 'purchased':
        return <Package {...iconProps} style={{ color: 'var(--primary-500)' }} />;
      case 'rejected':
        return <XCircle {...iconProps} style={{ color: 'var(--error-500)' }} />;
      default:
        return <Clock {...iconProps} style={{ color: 'var(--gray-500)' }} />;
    }
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge status-${status}`}>
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'uploaded',
      quality: null,
      rating: 0,
      views: 0,
      revenue: 0
    };
    
    setProducts([product, ...products]);
    setNewProduct({
      name: '',
      type: '',
      quantity: '',
      location: '',
      price: '',
      currency: 'USD',
      unit: 'kg',
      description: ''
    });
    setShowUploadForm(false);
    setIsLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      type: product.type,
      quantity: product.quantity,
      location: product.location,
      price: product.price.toString(),
      currency: product.currency,
      unit: product.unit,
      description: product.description
    });
    setShowUploadForm(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesTab = activeTab === 'all' || product.status === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterType || product.type === filterType;
    
    return matchesTab && matchesSearch && matchesFilter;
  });

  const productTypes = [...new Set(products.map(p => p.type))];

  return (
    <div className="farmer-portal">
      <FarmerNavbar />
      <div className="container">
        {/* Header */}
        <motion.div
          className="portal-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-content">
            <div className="header-text">
              <h1 className="portal-title">Farmer Portal</h1>
              <p className="portal-description">
                Manage your agricultural products and track their performance
              </p>
            </div>
            <button
              className="btn btn-primary btn-large"
              onClick={() => setShowUploadForm(!showUploadForm)}
            >
              <Plus className="btn-icon" />
              {showUploadForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          className="stats-dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="stat-card">
            <div className="stat-icon">
              <Package />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign />
            </div>
            <div className="stat-content">
              <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Star />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.averageRating.toFixed(1)}</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Eye />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalViews.toLocaleString()}</div>
              <div className="stat-label">Total Views</div>
            </div>
          </div>
        </motion.div>

        {/* Upload Form */}
        <AnimatePresence>
          {showUploadForm && (
            <motion.div
              className="upload-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h2>{editingProduct ? 'Edit Product' : 'Upload New Product'}</h2>
              </div>
              <form className="upload-form" onSubmit={handleUpload}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      required
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Product Type</label>
                    <select
                      id="type"
                      value={newProduct.type}
                      onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Rice">Rice</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Spices">Spices</option>
                      <option value="Pulses">Pulses</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Oils">Oils</option>
                      <option value="Nuts">Nuts</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="text"
                      id="quantity"
                      placeholder="e.g., 1000 kg"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="e.g., Punjab, India"
                      value={newProduct.location}
                      onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <div className="price-input-group">
                      <select
                        value={newProduct.currency}
                        onChange={(e) => setNewProduct({...newProduct, currency: e.target.value})}
                        className="currency-select"
                      >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                      </select>
                      <input
                        type="number"
                        id="price"
                        placeholder="0.00"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        required
                        className="price-input"
                      />
                      <select
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                        className="unit-select"
                      >
                        <option value="kg">per kg</option>
                        <option value="lb">per lb</option>
                        <option value="ton">per ton</option>
                        <option value="piece">per piece</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      rows="4"
                      placeholder="Describe your product quality, features, certifications, etc."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowUploadForm(false);
                      setEditingProduct(null);
                      setNewProduct({
                        name: '',
                        type: '',
                        quantity: '',
                        location: '',
                        price: '',
                        currency: 'USD',
                        unit: 'kg',
                        description: ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <Loader className="btn-icon animate-spin" /> : <Upload className="btn-icon" />}
                    {isLoading ? 'Processing...' : (editingProduct ? 'Update Product' : 'Upload Product')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters and Search */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="tab-navigation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Products ({products.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'uploaded' ? 'active' : ''}`}
            onClick={() => setActiveTab('uploaded')}
          >
            <Clock size={16} />
            Pending ({products.filter(p => p.status === 'uploaded').length})
          </button>
          <button
            className={`tab-button ${activeTab === 'verified' ? 'active' : ''}`}
            onClick={() => setActiveTab('verified')}
          >
            <CheckCircle size={16} />
            Verified ({products.filter(p => p.status === 'verified').length})
          </button>
          <button
            className={`tab-button ${activeTab === 'purchased' ? 'active' : ''}`}
            onClick={() => setActiveTab('purchased')}
          >
            <Package size={16} />
            Sold ({products.filter(p => p.status === 'purchased').length})
          </button>
        </motion.div>

        {/* Products List */}
        <motion.div
          className="products-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="section-header">
            <h2>Your Products ({filteredProducts.length})</h2>
            <div className="section-actions">
              <button className="btn btn-outline">
                <Download className="btn-icon" />
                Export
              </button>
            </div>
          </div>
          
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
                    {getStatusBadge(product.status)}
                    <div className="product-actions">
                      <button className="action-btn" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button 
                        className="action-btn" 
                        title="Edit"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Delete"
                        onClick={() => setShowDeleteConfirm(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-meta">
                      <div className="meta-item">
                        <Package size={14} />
                        <span>{product.type}</span>
                      </div>
                      <div className="meta-item">
                        <Scale size={14} />
                        <span>{product.quantity}</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={14} />
                        <span>{product.location}</span>
                      </div>
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{new Date(product.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="product-stats">
                      <div className="stat-item">
                        <DollarSign size={14} />
                        <span className="price">
                          {product.currency} {product.price.toFixed(2)}/{product.unit}
                        </span>
                      </div>
                      {product.rating > 0 && (
                        <div className="stat-item">
                          <Star size={14} />
                          <span>{product.rating}</span>
                        </div>
                      )}
                      <div className="stat-item">
                        <Eye size={14} />
                        <span>{product.views} views</span>
                      </div>
                    </div>
                    
                    {product.quality && (
                      <div className="product-quality">
                        <span className={`quality-badge quality-${product.quality.toLowerCase()}`}>
                          {product.quality} Quality
                        </span>
                      </div>
                    )}
                    
                    {product.revenue > 0 && (
                      <div className="product-revenue">
                        <TrendingUp size={14} />
                        <span className="revenue">Revenue: ${product.revenue.toLocaleString()}</span>
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
              <Package className="empty-icon" />
              <h3>No products found</h3>
              <p>
                {searchTerm || filterType 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Upload your first product to get started'
                }
              </p>
              {!searchTerm && !filterType && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowUploadForm(true)}
                >
                  <Plus className="btn-icon" />
                  Add Product
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <AlertCircle className="modal-icon" />
                <h3>Delete Product</h3>
              </div>
              <p>Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(showDeleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmerPortal;
