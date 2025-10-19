const express = require("express");
const Workout = require("../models/workoutmodels");
const {
  deleteWorkout,
  updateWorkout,
  getworkouts,
  getworkout,
  createWorkout,
} = require("../controllers/workoutControllers");
const {} = require("../controllers/workoutControllers");

const router = express.Router();

//get all workouts
router.get("/", getworkouts);
//get single workout
router.get("/:id", getworkout);
//create new workout
router.post("/", createWorkout);
//Delete a workout
router.delete("/:id",deleteWorkout);

//Update a workout
router.patch("/:id", updateWorkout);
module.exports = router;
