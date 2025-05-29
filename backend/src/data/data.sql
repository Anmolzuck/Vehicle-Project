CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,          
  type VARCHAR(50) NOT NULL,            
  wheels INTEGER NOT NULL CHECK (wheels IN (2, 4)), 
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_first_name VARCHAR(50) NOT NULL,
  user_last_name VARCHAR(50) NOT NULL,
  wheels INTEGER NOT NULL CHECK (wheels IN (2, 4)),
  vehicle_type VARCHAR(50) NOT NULL,    
  vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
