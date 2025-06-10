
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./DBConfig/dbConnect.js";
import cookieParser from "cookie-parser"
import mainRouter from "./Routes/index.js";
import ApiError from "./API/ApiError.js";
import userRoutes from "./Routes/index.js"

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost","https://gdgdtu.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("Welcome to GDSC Web Server!");
});


app.use("/api/v1", userRoutes);
// app.use("/api/v1/resources", resourceRoutes);

app.use("/api/v1", mainRouter);


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