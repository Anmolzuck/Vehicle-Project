import { createBookingService } from "../models/bookingModle.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createBooking = async (req, res, next) => {
  const {
    userFirstName,
    userLastName,
    wheels,
    vehicleType,
    vehicleId,
    vehicleName,
    startDate,
    endDate,
  } = req.body;

  try {
    const newBooking = await createBookingService(
      userFirstName,
      userLastName,
      wheels,
      vehicleType,
      vehicleId,
      vehicleName,
      startDate,
      endDate
    );

    handleResponse(res, 201, "Booking Created", newBooking);
  } catch (err) {
    next(err);
  }
};
