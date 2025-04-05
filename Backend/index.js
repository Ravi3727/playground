import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB  from './DBConfig/dbConnection.js';
import mainRouter from './Routes/index.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to GDSC Web Server!");
});

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
