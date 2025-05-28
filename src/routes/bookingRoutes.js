import express from "express";
import { createBooking } from "../controllers/bookingController.js";
// import validateUser from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/createBooking", createBooking);

export default router;
