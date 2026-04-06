const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.send("SISFS API Running");
});

module.exports = app;