import pool from "../config/db.js";

const seedVehicles = async () => {
  try {
    // Check if vehicles table is empty
    const { rows } = await pool.query("SELECT COUNT(*) FROM vehicles");
    const count = parseInt(rows[0].count, 10);

    if (count > 0) {
      console.log("Vehicles table is not empty. Skipping seeding.");
      return;
    }

    const vehicles = [
      { name: "Maruti Swift", type: "Hatchback", wheels: 4, quantity: 2 },
      { name: "Hyundai i20", type: "Hatchback", wheels: 4, quantity: 2 },
      { name: "Toyota Fortuner", type: "SUV", wheels: 4, quantity: 2 },
      { name: "Tata Harrier", type: "SUV", wheels: 4, quantity: 2 },
      { name: "Honda City", type: "Sedan", wheels: 4, quantity: 2 },
      { name: "Hyundai Verna", type: "Sedan", wheels: 4, quantity: 2 },
      {
        name: "Royal Enfield Classic 350",
        type: "Cruiser",
        wheels: 2,
        quantity: 2,
      },
      { name: "Jawa 42", type: "Cruiser", wheels: 2, quantity: 2 },
    ];

    for (const vehicle of vehicles) {
      await pool.query(
        "INSERT INTO vehicles (name, type, wheels,quantity) VALUES ($1, $2, $3, $4)",
        [vehicle.name, vehicle.type, vehicle.wheels, vehicle.quantity]
      );
    }

    console.log(" Vehicle seed data inserted successfully.");
  } catch (err) {
    console.error("Error seeding vehicles:", err);
  }
  // } finally {
  //   pool.end();
  // }
};

export default seedVehicles;
