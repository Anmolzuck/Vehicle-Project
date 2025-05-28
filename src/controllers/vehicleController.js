import { createVehicleService } from "../models/vehicleModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createVehicle = async (req, res, next) => {
  const { name, type, wheels, quantity } = req.body;

  try {
    const newVehicle = await createVehicleService(name, type, wheels, quantity);

    handleResponse(res, 201, "Vehicle Created", newVehicle);
  } catch (err) {
    next(err);
  }
};
