import React, { useState } from "react";
import { useWorkoutContext } from "../context/WorkoutContext";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import toast from "react-hot-toast";
import "./WorkoutCard.css";

export default function WorkoutCard({ workout }) {
  const { dispatch } = useWorkoutContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this workout?"))
      return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: "DELETE",
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: workout });
        toast.success("🗑️ Workout deleted successfully!");
      } else {
        toast.error(json.error || "Failed to delete workout");
      }
    } catch (error) {
      toast.error("Could not connect to server");
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Strength: "💪",
      Cardio: "🏃",
      Core: "🧘",
      Flexibility: "🤸",
    };
    return icons[category] || "💪";
  };

  const getIntensityColor = (intensity) => {
    const colors = {
      Low: "#44ff88",
      Medium: "#ff8844",
      High: "#ff4444",
    };
    return colors[intensity] || "#ff8844";
  };

  return (
    <div className="workout-card-enhanced">
      <div className="card-header">
        <div className="card-title-section">
          <span className="category-icon">
            {getCategoryIcon(workout.category)}
          </span>
          <div>
            <h3>{workout.title}</h3>
            <span className="category-badge">{workout.category}</span>
          </div>
        </div>
        <div className="card-actions">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-edit"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="btn-delete"
            disabled={isDeleting}
            title="Delete"
          >
            {isDeleting ? "⏳" : "🗑️"}
          </button>
        </div>
      </div>

      <div className="card-details-grid">
        <div className="detail-box">
          <span className="detail-label">Sets</span>
          <span className="detail-value">{workout.sets}</span>
        </div>
        <div className="detail-box">
          <span className="detail-label">Reps</span>
          <span className="detail-value">{workout.reps}</span>
        </div>
        {workout.load && (
          <div className="detail-box">
            <span className="detail-label">Load</span>
            <span className="detail-value">{workout.load} kg</span>
          </div>
        )}
        {workout.duration && (
          <div className="detail-box">
            <span className="detail-label">Duration</span>
            <span className="detail-value">{workout.duration} min</span>
          </div>
        )}
      </div>

      {workout.intensity && (
        <div className="intensity-display">
          <span className="intensity-label">Intensity:</span>
          <span
            className="intensity-chip"
            style={{
              background: `${getIntensityColor(workout.intensity)}22`,
              border: `2px solid ${getIntensityColor(workout.intensity)}`,
              color: getIntensityColor(workout.intensity),
            }}
          >
            {workout.intensity}
          </span>
        </div>
      )}

      {workout.notes && (
        <div className="notes-section">
          <span className="notes-label">📝 Notes:</span>
          <p className="notes-text">{workout.notes}</p>
        </div>
      )}

      <div className="card-footer">
        <span className="date-badge">
          📅{" "}
          {format(
            parseISO(workout.datePerformed || workout.createdAt),
            "MMM dd, yyyy"
          )}
        </span>
        <span className="timestamp">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}
