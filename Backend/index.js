import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./DBConfig/dbConnect.js";
import apiRoutes from "./Routes/index.js";

dotenv.config();

console.log("Environment Variables Loaded:");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("CLERK_API_KEY:", process.env.CLERK_API_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to GDSC Web Server!");
});

app.use("/api/v1", apiRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
