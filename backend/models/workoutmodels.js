const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    load: { type: Number, required: false, default: null }, // Optional for bodyweight exercises
    reps: { type: Number, required: true },
    sets: { type: Number, required: true, default: 1 },
    category: {
      type: String,
      required: true,
      enum: ["Strength", "Cardio", "Core", "Flexibility"],
      default: "Strength",
    },
    duration: { type: Number, required: false, default: null }, // In minutes, for cardio
    intensity: {
      type: String,
      required: false,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    datePerformed: { type: Date, required: true, default: Date.now },
    notes: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
