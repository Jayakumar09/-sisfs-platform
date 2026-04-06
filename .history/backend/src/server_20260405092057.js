const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SISFS API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SISFS API running on port ${PORT}`);
});

process.on("exit", (code) => {
  console.log("Process exit event with code:", code);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});