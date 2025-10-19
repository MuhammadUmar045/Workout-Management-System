import React, { useEffect, useState } from 'react';
import { useWorkoutContext } from '../context/WorkoutContext';
import WorkoutCard from './WorkoutCard';
import './WorkoutList.css';

export default function WorkoutList() {
  const { workouts, dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/workouts');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
          setError(null);
        } else {
          setError('Failed to fetch workouts');
        }
      } catch (err) {
        setError('Could not connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">⚠️ {error}</p>
        <button onClick={() => window.location.reload()} className="btn-retry">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="workout-list">
      <h2>My Workouts ({workouts?.length || 0})</h2>
      {workouts && workouts.length > 0 ? (
        <div className="workouts-container">
          {workouts.map((workout) => (
            <WorkoutCard key={workout._id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🏋️‍♂️</div>
          <h3>No workouts yet</h3>
          <p>Add your first workout to get started!</p>
        </div>
      )}
    </div>
  );
}
