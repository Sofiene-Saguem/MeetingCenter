const express = require("express");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/authRouter");
const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);

//3 set up the env variables
require("dotenv").config({ path: "./config/.env" });
//2 connecr the DB
connectDB();

//1 start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`the server is running on port ${PORT}`)
);
