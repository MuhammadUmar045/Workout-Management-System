const Workout = require("../models/workoutmodels");
const mongoose = require("mongoose");

// Get all workouts
const getworkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({
    datePerformed: -1,
    createdAt: -1,
  });
  res.status(200).json(workouts);
};

// Get single workout
const getworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout found" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }
  res.status(200).json(workout);
};

// Create a workout
const createWorkout = async (req, res) => {
  const {
    title,
    load,
    reps,
    sets,
    category,
    duration,
    intensity,
    datePerformed,
    notes,
  } = req.body;

  // Validation
  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!sets) emptyFields.push("sets");
  if (!category) emptyFields.push("category");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all required fields",
      emptyFields,
    });
  }

  // Validate category
  const validCategories = ["Strength", "Cardio", "Core", "Flexibility"];
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: "Invalid category. Must be Strength, Cardio, Core, or Flexibility",
    });
  }

  // Validate intensity if provided
  if (intensity) {
    const validIntensities = ["Low", "Medium", "High"];
    if (!validIntensities.includes(intensity)) {
      return res.status(400).json({
        error: "Invalid intensity. Must be Low, Medium, or High",
      });
    }
  }

  try {
    const workoutData = {
      title,
      reps: Number(reps),
      sets: Number(sets),
      category,
      datePerformed: datePerformed || new Date(),
    };

    // Add optional fields only if provided
    if (load) workoutData.load = Number(load);
    if (duration) workoutData.duration = Number(duration);
    if (intensity) workoutData.intensity = intensity;
    if (notes) workoutData.notes = notes;

    const workout = await Workout.create(workoutData);
    res.status(201).json({
      success: true,
      message: "Workout created successfully!",
      workout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout found" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }

  res.status(200).json({
    success: true,
    message: "Workout deleted successfully!",
    workout,
  });
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout found" });
  }

  // Validate category if provided
  if (req.body.category) {
    const validCategories = ["Strength", "Cardio", "Core", "Flexibility"];
    if (!validCategories.includes(req.body.category)) {
      return res.status(400).json({
        error:
          "Invalid category. Must be Strength, Cardio, Core, or Flexibility",
      });
    }
  }

  // Validate intensity if provided
  if (req.body.intensity) {
    const validIntensities = ["Low", "Medium", "High"];
    if (!validIntensities.includes(req.body.intensity)) {
      return res.status(400).json({
        error: "Invalid intensity. Must be Low, Medium, or High",
      });
    }
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }

  res.status(200).json({
    success: true,
    message: "Workout updated successfully!",
    workout,
  });
};

module.exports = {
  getworkouts,
  getworkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
