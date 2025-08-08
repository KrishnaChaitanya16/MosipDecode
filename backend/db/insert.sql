-- 03_insert_sample_data.sql

-- Users
INSERT INTO users (username, password_hash, email, full_name, role)
VALUES 
  ('exporter1', 'hashed_pw1', 'exporter1@example.com', 'Exporter One', 'exporter'),
  ('qaagency1', 'hashed_pw2', 'qa1@example.com', 'QA Agency One', 'qa_agency'),
  ('importer1', 'hashed_pw3', 'importer1@example.com', 'Importer One', 'importer'),
  ('admin1', 'hashed_pw4', 'admin@example.com', 'Admin User', 'admin');

