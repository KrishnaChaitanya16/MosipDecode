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
import { useAuth } from '../../contexts/AuthContext';
import './FarmerPortal.css';

const FarmerPortal = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    product_type: '',
    quantity: '',
    origin_location: '',
    destination: ''
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
      totalRevenue: 0,
      averageRating: 0,
      totalViews: 0
    });
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:3001/api'}/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load products');
        const mapped = data.map((row) => ({
          id: row.id,
          name: row.product_type,
          type: row.product_type,
          quantity: row.quantity,
          location: row.origin_location,
          uploadDate: row.submission_date,
          status: (row.status || 'Submitted').toLowerCase(),
          description: row.destination ? `Destination: ${row.destination}` : ''
        }));
        setProducts(mapped);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    if (token) fetchProducts();
  }, [token]);

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
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:3001/api'}/batches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          product_type: newProduct.product_type,
          quantity: newProduct.quantity,
          origin_location: newProduct.origin_location,
          destination: newProduct.destination
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      const b = data.batch;
      const mapped = {
        id: b.id,
        name: b.product_type,
        type: b.product_type,
        quantity: b.quantity,
        location: b.origin_location,
        uploadDate: b.submission_date,
        status: (b.status || 'Submitted').toLowerCase(),
        description: b.destination ? `Destination: ${b.destination}` : ''
      };
      setProducts(prev => [mapped, ...prev]);
      setNewProduct({ product_type: '', quantity: '', origin_location: '', destination: '' });
      setShowUploadForm(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      product_type: product.type,
      quantity: product.quantity,
      origin_location: product.location,
      destination: ''
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
                <h2>{editingProduct ? 'Edit Product' : 'Submit New Product Batch'}</h2>
              </div>
              <form className="upload-form" onSubmit={handleUpload}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="type">Product Type</label>
                    <select
                      id="type"
                      value={newProduct.product_type}
                      onChange={(e) => setNewProduct({...newProduct, product_type: e.target.value})}
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
                    <label htmlFor="origin">Origin Location</label>
                    <input
                      type="text"
                      id="origin"
                      placeholder="e.g., Punjab, India"
                      value={newProduct.origin_location}
                      onChange={(e) => setNewProduct({...newProduct, origin_location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="destination">Destination</label>
                    <input
                      type="text"
                      id="destination"
                      placeholder="e.g., Dubai, UAE"
                      value={newProduct.destination}
                      onChange={(e) => setNewProduct({...newProduct, destination: e.target.value})}
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
                      setNewProduct({ product_type: '', quantity: '', origin_location: '', destination: '' });
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <Loader className="btn-icon animate-spin" /> : <Upload className="btn-icon" />}
                    {isLoading ? 'Processing...' : (editingProduct ? 'Update Batch' : 'Submit Batch')}
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
                          {product.currency} {Number(product.price || 0).toFixed(2)}/{product.unit}
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
