import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Shield, 
  Users, 
  QrCode, 
  CheckCircle, 
  TrendingUp, 
  Globe,
  ArrowRight,
  Star
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Product Upload',
      description: 'Farmers can easily upload their agricultural products with detailed information for quality certification.',
      color: 'var(--success-500)'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'QA agencies conduct thorough inspections and issue digitally signed verifiable credentials.',
      color: 'var(--primary-500)'
    },
    {
      icon: QrCode,
      title: 'QR Verification',
      description: 'Importers and customs can instantly verify product quality using QR code scanning.',
      color: 'var(--warning-500)'
    },
    {
      icon: CheckCircle,
      title: 'Digital Certificates',
      description: 'Generate and manage digitally verifiable quality certificates for international trade.',
      color: 'var(--success-600)'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Products Certified', icon: CheckCircle },
    { number: '500+', label: 'Active Farmers', icon: Users },
    { number: '50+', label: 'QA Agencies', icon: Shield },
    { number: '100+', label: 'Countries Served', icon: Globe }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className="hero-title" variants={itemVariants}>
              Agricultural Quality
              <span className="gradient-text"> Certification Portal</span>
            </motion.h1>
            <motion.p className="hero-description" variants={itemVariants}>
              Digitize and secure your agricultural export/import certification process. 
              Enable quality checks, generate verifiable credentials, and verify products instantly.
            </motion.p>
            <motion.div className="hero-buttons" variants={itemVariants}>
              <Link to="/farmer" className="btn btn-primary">
                Get Started
                <ArrowRight className="btn-icon" />
              </Link>
              <Link to="/scanner" className="btn btn-outline">
                Scan QR Code
                <QrCode className="btn-icon" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-background">
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Our comprehensive platform connects farmers, QA agencies, and buyers in a seamless workflow
            </p>
          </motion.div>

          <motion.div
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="feature-card"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="feature-icon" style={{ color: feature.color }}>
                    <Icon />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="stat-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">
                    <Icon />
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of farmers and buyers who trust AgriQCert for their quality certification needs.
            </p>
            <div className="cta-buttons">
              <Link to="/farmer" className="btn btn-primary btn-large">
                Start Uploading Products
                <ArrowRight className="btn-icon" />
              </Link>
              <Link to="/qa" className="btn btn-outline btn-large">
                Join as QA Agency
                <Shield className="btn-icon" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 