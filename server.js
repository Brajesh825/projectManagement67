const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Connect to the database
mongoose
  .connect("mongodb://localhost/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only when the database is connected
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Error handling for route mismatch
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Import routers
const projectRouter = require("./routers/projectRouter");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const milestoneRouter = require("./routers/milestoneRouter");
const permissionRouter = require("./routers/permissionRouter");

// Use routers
app.use(projectRouter);
app.use(userRouter);
app.use(taskRouter);
app.use(milestoneRouter);
app.use(permissionRouter);

module.exports = app;