import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import bookingRouter from "./routes/bookingRoutes.js";
import vehicleRouter from "./routes/vehicleRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createTables from "./data/createTables.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//-----------------ROUTES--------------------
app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("end");
  res.send(`The database name is ${result.rows[0].current_database}`);
});

app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/vehicle", vehicleRouter);

app.use(errorHandling);

// Create tables if not there
createTables();

app.listen(port, () => {
  console.log(`app running on ${port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(" Uncaught Exception:", err.message);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error(" Unhandled Rejection:", reason);
});
