import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './DBConfig/demo.js';
import authRoutes from './Routes/demo.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to GDSC Web Server!");
});

app.use('/', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});