CREATE TABLE IF NOT EXISTS farmers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(15),
  date_of_birth DATE,
  gender VARCHAR(10),
  state VARCHAR(100),
  district VARCHAR(100),
  farmer_id VARCHAR(50) UNIQUE NOT NULL
);
