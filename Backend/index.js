require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to GDSC Web Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const dbConnect = require("./DBConfig/DBConfig");

dbConnect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongoDB successfully");
  })
  .catch((err) => {
    console.log("connection failed : ", err);
  });
 
  const EventRouter = require('./Routes/events');

  app.use('/api/v1/events',EventRouter);