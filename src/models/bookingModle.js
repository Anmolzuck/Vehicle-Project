import pool from "../config/db.js";

export const createBookingService = async (
  userFirstName,
  userLastName,
  wheels,
  vehicleType,
  vehicleId,
  startDate,
  endDate
) => {
  //Checking for overlapping bookings
  const overlapCheck = await pool.query(
    `
    SELECT 1 FROM bookings
    WHERE vehicle_id = $1
      AND NOT (end_date < $2 OR start_date > $3)
    `,
    [vehicleId, startDate, endDate]
  );

  if (overlapCheck.rows.length > 0) {
    // Vehicle already booked in this date range
    throw new Error("This vehicle is already booked for the selected dates.");
  }

  // Insert booking
  const result = await pool.query(
    `
    INSERT INTO bookings (
      user_first_name,
      user_last_name,
      wheels,
      vehicle_type,
      vehicle_id,
      start_date,
      end_date
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
    [
      userFirstName,
      userLastName,
      wheels,
      vehicleType,
      vehicleId,
      startDate,
      endDate,
    ]
  );

  return result.rows[0];
};
