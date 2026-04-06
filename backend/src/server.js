require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
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

// keep reference visible for debugging
module.exports = { app, server };