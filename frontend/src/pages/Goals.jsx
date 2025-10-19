import React, { useState } from "react";
import "./Goals.css";

export default function Goals() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Bench Press 100kg",
      current: 80,
      target: 100,
      unit: "kg",
      completed: false,
    },
    {
      id: 2,
      title: "Complete 50 Workouts",
      current: 32,
      target: 50,
      unit: "workouts",
      completed: false,
    },
    {
      id: 3,
      title: "Squat 150kg",
      current: 120,
      target: 150,
      unit: "kg",
      completed: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    current: "",
    target: "",
    unit: "kg",
  });

  const addGoal = (e) => {
    e.preventDefault();
    const goal = {
      id: Date.now(),
      ...newGoal,
      current: Number(newGoal.current),
      target: Number(newGoal.target),
      completed: false,
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: "", current: "", target: "", unit: "kg" });
    setShowAddForm(false);
  };

  const updateProgress = (id, value) => {
    setGoals(
      goals.map((g) =>
        g.id === id
          ? {
              ...g,
              current: Number(value),
              completed: Number(value) >= g.target,
            }
          : g
      )
    );
  };

  const deleteGoal = (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter((g) => g.id !== id));
    }
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h1>🎯 My Goals</h1>
        <p>Set targets and track your progress</p>
      </div>

      <div className="goals-container">
        <div className="goals-actions">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-add-goal"
          >
            {showAddForm ? "❌ Cancel" : "➕ Add New Goal"}
          </button>
        </div>

        {showAddForm && (
          <div className="add-goal-form">
            <h3>Create New Goal</h3>
            <form onSubmit={addGoal}>
              <input
                type="text"
                placeholder="Goal title (e.g., Bench Press 100kg)"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
                required
              />
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Current"
                  value={newGoal.current}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, current: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Target"
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target: e.target.value })
                  }
                  required
                />
                <select
                  value={newGoal.unit}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, unit: e.target.value })
                  }
                >
                  <option value="kg">kg</option>
                  <option value="reps">reps</option>
                  <option value="workouts">workouts</option>
                  <option value="days">days</option>
                </select>
              </div>
              <button type="submit" className="btn-submit-goal">
                Create Goal
              </button>
            </form>
          </div>
        )}

        <div className="goals-grid">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            return (
              <div
                key={goal.id}
                className={`goal-card ${goal.completed ? "completed" : ""}`}
              >
                <div className="goal-header">
                  <h3>{goal.title}</h3>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="btn-delete-goal"
                  >
                    🗑️
                  </button>
                </div>

                <div className="goal-progress-bar">
                  <div
                    className="goal-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="goal-stats">
                  <div className="goal-stat">
                    <span className="goal-label">Current:</span>
                    <input
                      type="number"
                      value={goal.current}
                      onChange={(e) => updateProgress(goal.id, e.target.value)}
                      className="goal-input"
                    />
                    <span className="goal-unit">{goal.unit}</span>
                  </div>
                  <div className="goal-stat">
                    <span className="goal-label">Target:</span>
                    <span className="goal-value">
                      {goal.target} {goal.unit}
                    </span>
                  </div>
                </div>

                <div className="goal-percentage">
                  {progress.toFixed(0)}% Complete
                </div>

                {goal.completed && (
                  <div className="goal-completed-badge">🏆 Goal Achieved!</div>
                )}
              </div>
            );
          })}
        </div>

        {goals.length === 0 && (
          <div className="empty-goals">
            <div className="empty-icon">🎯</div>
            <h3>No goals yet</h3>
            <p>Create your first goal to start tracking your progress!</p>
          </div>
        )}
      </div>
    </div>
  );
}
