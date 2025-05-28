import {
  createVehicleService,
  getVehiclesByTypeService,
  getVehiclesByWheelsService,
} from "../models/vehicleModel.js";

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

export const vehicleByType = async (req, res, next) => {
  try {
    const vehicle = await getVehiclesByTypeService(req.params.type);

    handleResponse(res, 200, "Vehicle fetched by type", vehicle);
  } catch (err) {
    next(err);
  }
};

export const vehicleByWheels = async (req, res, next) => {
  try {
    const vehicle = await getVehiclesByWheelsService(req.params.wheel);

    handleResponse(res, 200, "Vehicle fetched by wheels", vehicle);
  } catch (err) {
    next(err);
  }
};
