-- 01_users.sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email VARCHAR(100),
  full_name VARCHAR(100),
  role VARCHAR(20) CHECK (role IN ('exporter', 'qa_agency', 'importer', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_batches (
  id SERIAL PRIMARY KEY,
  exporter_id INTEGER NOT NULL,
  product_type VARCHAR(100),
  quantity VARCHAR(50),
  origin_location VARCHAR(150),
  destination VARCHAR(150),
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(30) DEFAULT 'Submitted'
);

CREATE TABLE IF NOT EXISTS attachments (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inspections (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER NOT NULL,
  qa_agency_id INTEGER NOT NULL,
  inspection_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  moisture_level DECIMAL(5,2),
  pesticide_content DECIMAL(5,2),
  is_organic BOOLEAN,
  iso_code VARCHAR(50),
  remarks TEXT
);

CREATE TABLE IF NOT EXISTS verifiable_credentials (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER NOT NULL,
  vc_id UUID NOT NULL,
  issuer_id INTEGER NOT NULL,
  issuance_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  credential_json JSONB NOT NULL,
  qr_code_url TEXT,
  revoked BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS verifications (
  id SERIAL PRIMARY KEY,
  vc_id UUID NOT NULL,
  verified_by INTEGER,
  verification_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verification_status BOOLEAN,
  location TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  action VARCHAR(100),
  description TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
