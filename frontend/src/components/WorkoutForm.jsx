import React, { useState } from "react";
import { useWorkoutContext } from "../context/WorkoutContext";
import toast from "react-hot-toast";
import "./WorkoutForm.css";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext();

  const [formData, setFormData] = useState({
    title: "",
    load: "",
    reps: "",
    sets: "",
    category: "Strength",
    duration: "",
    intensity: "Medium",
    datePerformed: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Strength", "Cardio", "Core", "Flexibility"];
  const intensities = ["Low", "Medium", "High"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Exercise title is required";
    }
    if (!formData.reps || formData.reps <= 0) {
      newErrors.reps = "Reps must be greater than 0";
    }
    if (!formData.sets || formData.sets <= 0) {
      newErrors.sets = "Sets must be greater than 0";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.datePerformed) {
      newErrors.datePerformed = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Prepare data - only include optional fields if they have values
    const workoutData = {
      title: formData.title.trim(),
      reps: Number(formData.reps),
      sets: Number(formData.sets),
      category: formData.category,
      datePerformed: formData.datePerformed,
      intensity: formData.intensity,
    };

    if (formData.load) workoutData.load = Number(formData.load);
    if (formData.duration) workoutData.duration = Number(formData.duration);
    if (formData.notes.trim()) workoutData.notes = formData.notes.trim();

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(workoutData),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (!response.ok) {
        toast.error(json.error || "Failed to create workout");
        if (json.emptyFields) {
          const fieldErrors = {};
          json.emptyFields.forEach((field) => {
            fieldErrors[field] = "This field is required";
          });
          setErrors(fieldErrors);
        }
      } else {
        toast.success("✅ Workout added successfully!");

        // Reset form
        setFormData({
          title: "",
          load: "",
          reps: "",
          sets: "",
          category: "Strength",
          duration: "",
          intensity: "Medium",
          datePerformed: new Date().toISOString().split("T")[0],
          notes: "",
        });

        dispatch({ type: "CREATE_WORKOUT", payload: json.workout });
      }
    } catch (err) {
      toast.error("Could not connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="workout-form-container">
      <h2>Add New Workout</h2>
      <p className="form-subtitle">
        Track your fitness journey with detailed workout logging
      </p>

      <form onSubmit={handleSubmit} className="workout-form-enhanced">
        {/* Exercise Title */}
        <div className="form-group">
          <label htmlFor="title">
            Exercise Title <span className="required">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Bench Press, Running, Plank..."
            className={errors.title ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? "error" : ""}
            disabled={isSubmitting}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-text">{errors.category}</span>
          )}
        </div>

        {/* Sets and Reps Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sets">
              Sets <span className="required">*</span>
            </label>
            <input
              id="sets"
              name="sets"
              type="number"
              value={formData.sets}
              onChange={handleChange}
              placeholder="3"
              min="1"
              className={errors.sets ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.sets && <span className="error-text">{errors.sets}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reps">
              Reps <span className="required">*</span>
            </label>
            <input
              id="reps"
              name="reps"
              type="number"
              value={formData.reps}
              onChange={handleChange}
              placeholder="10"
              min="1"
              className={errors.reps ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.reps && <span className="error-text">{errors.reps}</span>}
          </div>
        </div>

        {/* Load (Optional) */}
        <div className="form-group">
          <label htmlFor="load">
            Load (kg) <span className="optional">Optional</span>
          </label>
          <input
            id="load"
            name="load"
            type="number"
            value={formData.load}
            onChange={handleChange}
            placeholder="Leave blank for bodyweight exercises"
            min="0"
            step="0.5"
            disabled={isSubmitting}
          />
          <span className="hint">
            💡 Leave empty for bodyweight exercises like push-ups
          </span>
        </div>

        {/* Duration (Optional) */}
        <div className="form-group">
          <label htmlFor="duration">
            Duration (minutes) <span className="optional">Optional</span>
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Useful for cardio workouts"
            min="1"
            disabled={isSubmitting}
          />
          <span className="hint">⏱️ Great for tracking cardio sessions</span>
        </div>

        {/* Intensity */}
        <div className="form-group">
          <label htmlFor="intensity">Intensity</label>
          <div className="intensity-selector">
            {intensities.map((level) => (
              <label key={level} className="intensity-option">
                <input
                  type="radio"
                  name="intensity"
                  value={level}
                  checked={formData.intensity === level}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className={`intensity-badge ${level.toLowerCase()}`}>
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Performed */}
        <div className="form-group">
          <label htmlFor="datePerformed">
            Date Performed <span className="required">*</span>
          </label>
          <input
            id="datePerformed"
            name="datePerformed"
            type="date"
            value={formData.datePerformed}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className={errors.datePerformed ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors.datePerformed && (
            <span className="error-text">{errors.datePerformed}</span>
          )}
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes">
            Notes <span className="optional">Optional</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g., Felt strong today, increased weight from last week..."
            rows="3"
            maxLength="500"
            disabled={isSubmitting}
          />
          <span className="hint">
            📝 {formData.notes.length}/500 characters
          </span>
        </div>

        {/* Required Fields Notice */}
        <div className="form-notice">
          <span className="required">*</span> Required fields
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-submit-enhanced"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Adding Workout...
            </>
          ) : (
            <>
              <span className="btn-icon">➕</span> Add Workout
            </>
          )}
        </button>
      </form>
    </div>
  );
}
