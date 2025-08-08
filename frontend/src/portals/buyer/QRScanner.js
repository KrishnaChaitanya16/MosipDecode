import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  AlertTriangle,
  Package,
  MapPin,
  Calendar,
  Scale,
  Star,
  Download,
  Share2,
  Copy
} from 'lucide-react';
import './QRScanner.css';

const QRScanner = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);

  // Mock product database
  const productDatabase = {
    'AGRIQCERT-001-EXCELLENT-2024': {
      id: 'AGRIQCERT-001-EXCELLENT-2024',
      name: 'Premium Basmati Rice',
      farmer: 'Rajesh Kumar',
      type: 'Rice',
      quantity: '1000 kg',
      location: 'Punjab, India',
      verifiedDate: '2024-01-15',
      quality: 'Excellent',
      price: '$2.50/kg',
      description: 'High-quality basmati rice with excellent aroma and texture.',
      qaAgency: 'Indian Agricultural Quality Authority',
      certificateNumber: 'IAQA-2024-001',
      expiryDate: '2025-01-15'
    },
    'AGRIQCERT-002-EXCELLENT-2024': {
      id: 'AGRIQCERT-002-EXCELLENT-2024',
      name: 'Black Pepper',
      farmer: 'Suresh Menon',
      type: 'Spices',
      quantity: '200 kg',
      location: 'Kerala, India',
      verifiedDate: '2024-01-08',
      quality: 'Excellent',
      price: '$8.50/kg',
      description: 'Premium black pepper with high piperine content.',
      qaAgency: 'Indian Agricultural Quality Authority',
      certificateNumber: 'IAQA-2024-002',
      expiryDate: '2025-01-08'
    },
    'AGRIQCERT-003-GOOD-2024': {
      id: 'AGRIQCERT-003-GOOD-2024',
      name: 'Organic Wheat',
      farmer: 'Priya Sharma',
      type: 'Wheat',
      quantity: '500 kg',
      location: 'Haryana, India',
      verifiedDate: '2024-01-10',
      quality: 'Good',
      price: '$1.80/kg',
      description: 'Certified organic wheat suitable for premium bread making.',
      qaAgency: 'Indian Agricultural Quality Authority',
      certificateNumber: 'IAQA-2024-003',
      expiryDate: '2025-01-10'
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const mockScannedCode = 'AGRIQCERT-001-EXCELLENT-2024';
      setScannedCode(mockScannedCode);
      
      const product = productDatabase[mockScannedCode];
      if (product) {
        setScanResult(product);
        setScanHistory(prev => [product, ...prev.slice(0, 4)]);
      } else {
        setScanResult({ error: 'Product not found in database' });
      }
      setIsScanning(false);
    }, 2000);
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

  const getQualityIcon = (quality) => {
    switch (quality) {
      case 'Excellent':
        return <Star className="quality-icon" />;
      case 'Good':
        return <CheckCircle className="quality-icon" />;
      case 'Medium':
        return <AlertTriangle className="quality-icon" />;
      case 'Poor':
        return <AlertTriangle className="quality-icon" />;
      default:
        return <Package className="quality-icon" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="qr-scanner">
      <div className="container">
        <motion.div
          className="scanner-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="scanner-title">QR Code Scanner</h1>
          <p className="scanner-description">
            Scan QR codes to verify agricultural product quality and certification
          </p>
        </motion.div>

        <div className="scanner-content">
          {/* Scanner Section */}
          <motion.div
            className="scanner-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="scanner-container">
              <div className="scanner-preview">
                <div className="camera-frame">
                  <Camera className="camera-icon" />
                  <div className="scan-overlay">
                    <div className="scan-line"></div>
                  </div>
                </div>
                <div className="scanner-controls">
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={handleScan}
                    disabled={isScanning}
                  >
                    <QrCode className="btn-icon" />
                    {isScanning ? 'Scanning...' : 'Start Scan'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scan Result */}
          <motion.div
            className="result-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {scanResult && (
              <div className="result-card">
                {scanResult.error ? (
                  <div className="error-result">
                    <AlertTriangle className="error-icon" />
                    <h3>Product Not Found</h3>
                    <p>The scanned QR code does not match any product in our database.</p>
                    <p className="scanned-code">Scanned Code: {scannedCode}</p>
                  </div>
                ) : (
                  <div className="product-result">
                    <div className="result-header">
                      <div className="quality-info">
                        {getQualityIcon(scanResult.quality)}
                        <span 
                          className="quality-badge"
                          style={{ color: getQualityColor(scanResult.quality) }}
                        >
                          {scanResult.quality} Quality
                        </span>
                      </div>
                      <div className="result-actions">
                        <button className="action-btn" title="Download Certificate">
                          <Download />
                        </button>
                        <button className="action-btn" title="Share">
                          <Share2 />
                        </button>
                        <button 
                          className="action-btn" 
                          title="Copy Certificate Number"
                          onClick={() => copyToClipboard(scanResult.certificateNumber)}
                        >
                          <Copy />
                        </button>
                      </div>
                    </div>

                    <div className="product-details">
                      <h3 className="product-name">{scanResult.name}</h3>
                      <p className="product-farmer">by {scanResult.farmer}</p>
                      <p className="product-description">{scanResult.description}</p>
                      
                      <div className="product-stats">
                        <div className="stat-item">
                          <Package className="stat-icon" />
                          <div className="stat-content">
                            <span className="stat-label">Type</span>
                            <span className="stat-value">{scanResult.type}</span>
                          </div>
                        </div>
                        <div className="stat-item">
                          <Scale className="stat-icon" />
                          <div className="stat-content">
                            <span className="stat-label">Quantity</span>
                            <span className="stat-value">{scanResult.quantity}</span>
                          </div>
                        </div>
                        <div className="stat-item">
                          <MapPin className="stat-icon" />
                          <div className="stat-content">
                            <span className="stat-label">Location</span>
                            <span className="stat-value">{scanResult.location}</span>
                          </div>
                        </div>
                        <div className="stat-item">
                          <Calendar className="stat-icon" />
                          <div className="stat-content">
                            <span className="stat-label">Verified Date</span>
                            <span className="stat-value">{scanResult.verifiedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="certification-info">
                        <h4>Certification Details</h4>
                        <div className="cert-details">
                          <div className="cert-item">
                            <strong>QA Agency:</strong> {scanResult.qaAgency}
                          </div>
                          <div className="cert-item">
                            <strong>Certificate Number:</strong> {scanResult.certificateNumber}
                          </div>
                          <div className="cert-item">
                            <strong>Expiry Date:</strong> {scanResult.expiryDate}
                          </div>
                          <div className="cert-item">
                            <strong>Price:</strong> {scanResult.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Scan History */}
          <motion.div
            className="history-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Recent Scans</h2>
            <div className="history-grid">
              {scanHistory.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="history-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="history-header">
                    <span 
                      className="quality-badge small"
                      style={{ color: getQualityColor(product.quality) }}
                    >
                      {product.quality}
                    </span>
                    <span className="scan-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="history-product-name">{product.name}</h4>
                  <p className="history-farmer">by {product.farmer}</p>
                  <div className="history-details">
                    <span>{product.type}</span>
                    <span>{product.quantity}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {scanHistory.length === 0 && (
              <div className="empty-history">
                <QrCode className="empty-icon" />
                <p>No recent scans. Start scanning to see your history here.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner; 