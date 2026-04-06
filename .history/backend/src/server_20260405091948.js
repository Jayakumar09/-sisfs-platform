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