import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./DBConfig/dbConnect.js";


import mainRouter from "./Routes/index.js";
import eventRoutes from "./Routes/events.route.js";

import ApiError from "./API/ApiError.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to GDSC Web Server!");
});



app.use("/api/v1", mainRouter);
app.use("/api/v1/events", eventRoutes);


// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // If the error is an instance of ApiError, use its status and message
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      errors: err.errors || [],
    });
  }

  // For other errors, return a generic 500 Internal Server Error
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});