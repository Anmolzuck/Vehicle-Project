import pool from "../config/db.js";
import seedVehicles from "./seedVehicleData.js";

const createTables = async () => {
  const vehicleTableQuery = `
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      wheels INTEGER NOT NULL CHECK (wheels IN (2, 4)),
      quantity INTEGER NOT NULL CHECK (quantity >= 1),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const bookingTableQuery = `
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
  `;

  try {
    await pool.query(vehicleTableQuery);
    //Upload vehicle data if not there
    seedVehicles();
    console.log(" Vehicle table created (if not exists).");

    await pool.query(bookingTableQuery);
    console.log("Booking table created (if not exists).");
  } catch (error) {
    console.error(" Error creating tables:", error);
  }
};

export default createTables;
