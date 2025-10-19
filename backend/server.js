require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workout");
const mongoose = require("mongoose");

//it create a express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//route
app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.Mongo_uri)
  .then(() => {
    console.log(" Connected to MongoDB");

    // Now start the server
    app.listen(process.env.PORT, () => {
      console.log(" Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(" MongoDB connection error:", error.message);
  });
