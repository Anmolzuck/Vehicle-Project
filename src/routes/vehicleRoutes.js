import express from "express";
import { createVehicle } from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/createVehicle", createVehicle);

export default router;
