import React from "react";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";
import "./Workouts.css";

export default function Workouts() {
  return (
    <div className="workouts-page">
      <div className="workouts-header">
        <h1>My Workouts</h1>
        <p>Track, manage, and crush your fitness goals</p>
      </div>

      <div className="workouts-container">
        <div className="workouts-grid">
          <div className="workout-list-section">
            <WorkoutList />
          </div>
          <div className="workout-form-section">
            <WorkoutForm />
          </div>
        </div>
      </div>
    </div>
  );
}
