const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/leads", require("./routes/lead.routes"));

app.get("/", (req, res) => {
  res.send("SISFS API Running");
});

module.exports = app;