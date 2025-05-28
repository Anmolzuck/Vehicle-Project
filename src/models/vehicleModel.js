import pool from "../config/db.js";

export const createVehicleService = async (name, type, wheels, quantity) => {
  const result = await pool.query(
    `
    INSERT INTO vehicles (name, type, wheels, quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [name, type, wheels, quantity]
  );

  return result.rows[0];
};
