import express from "express";
import {
  createVehicle,
  vehicleByType,
  vehicleByWheels,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/createVehicle", createVehicle);
router.get("/vehicleByType/:type", vehicleByType);
router.get("/vehicleByWheels/:wheel", vehicleByWheels);

export default router;
