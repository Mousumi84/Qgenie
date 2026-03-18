const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

//constants
const app = express();
let PORT = process.env.PORT || 5001;

//file-import

// JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Qgenie API is up." });
});

// Error handler middleware (see below)
// const errorHandler = require('./middleware/errorHandler');
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running at:`);
  console.log(`http://localhost:${PORT}`);
});
