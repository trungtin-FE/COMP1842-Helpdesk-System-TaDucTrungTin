const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const responseRoutes = require("./api/routes/Response");

app.use("/api/responses", responseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Helpdesk Response Library");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
