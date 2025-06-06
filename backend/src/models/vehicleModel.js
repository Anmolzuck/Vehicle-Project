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

export const getVehiclesByTypeService = async (type) => {
  const result = await pool.query(
    `
    SELECT * FROM vehicles
    WHERE type = $1;
    `,
    [type]
  );

  return result.rows;
};

export const getVehiclesByWheelsService = async (wheels) => {
  const result = await pool.query(
    `
   SELECT DISTINCT type
    FROM vehicles
    WHERE wheels = $1;
    `,
    [wheels]
  );

  return result.rows;
};
