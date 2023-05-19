const express = require("express");
const cors = require("cors");

const clientsRouter = require("./routes/api/clients");

const projectsRouter = require("./routes/api/projects");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientsRouter);
app.use("/api/projects", projectsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;