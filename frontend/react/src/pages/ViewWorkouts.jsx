import { useState, useEffect } from 'react';
import './ViewWorkouts.css';

const ViewWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    load: '',
    reps: ''
  });

  const API_BASE_URL = 'http://localhost:4000/api/workouts';

  // Fetch all workouts
  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }
      const data = await response.json();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete workout
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete workout');
        }

        setWorkouts(workouts.filter(workout => workout._id !== id));
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Start editing
  const handleEdit = (workout) => {
    setEditingId(workout._id);
    setEditFormData({
      title: workout.title,
      load: workout.load,
      reps: workout.reps
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ title: '', load: '', reps: '' });
  };

  // Update workout
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to update workout');
      }

      const updatedWorkout = await response.json();
      setWorkouts(workouts.map(workout => 
        workout._id === editingId ? updatedWorkout : workout
      ));
      setEditingId(null);
      setEditFormData({ title: '', load: '', reps: '' });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Filter and sort workouts
  const filteredAndSortedWorkouts = workouts
    .filter(workout => 
      workout.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'load':
          return b.load - a.load;
        case 'reps':
          return b.reps - a.reps;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="view-workouts-page">
        <div className="loading">Loading workouts...</div>
      </div>
    );
  }

  return (
    <div className="view-workouts-page">
      <div className="view-workouts-container">
        <div className="page-header">
          <h1>View All Workouts</h1>
          <p>Track and manage your fitness journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="controls-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Date (Newest)</option>
              <option value="title">Title (A-Z)</option>
              <option value="load">Load (Highest)</option>
              <option value="reps">Reps (Highest)</option>
            </select>
          </div>
        </div>

        <div className="stats-summary">
          <div className="stat-card">
            <span className="stat-number">{workouts.length}</span>
            <span className="stat-label">Total Workouts</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {workouts.length > 0 
                ? Math.max(...workouts.map(w => w.load))
                : 0
              } kg
            </span>
            <span className="stat-label">Max Load</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {workouts.length > 0 
                ? Math.max(...workouts.map(w => w.reps))
                : 0
              }
            </span>
            <span className="stat-label">Max Reps</span>
          </div>
        </div>

        <div className="workouts-grid">
          {filteredAndSortedWorkouts.length === 0 ? (
            <div className="no-workouts">
              <div className="no-workouts-icon">🏋️</div>
              <h3>No workouts found</h3>
              <p>
                {searchTerm 
                  ? `No workouts match "${searchTerm}"`
                  : "Start your fitness journey by adding your first workout!"
                }
              </p>
            </div>
          ) : (
            filteredAndSortedWorkouts.map((workout) => (
              <div key={workout._id} className="workout-card">
                {editingId === workout._id ? (
                  <form onSubmit={handleUpdate} className="edit-form">
                    <div className="form-group">
                      <label>Exercise Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Load (kg):</label>
                      <input
                        type="number"
                        name="load"
                        value={editFormData.load}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Reps:</label>
                      <input
                        type="number"
                        name="reps"
                        value={editFormData.reps}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="edit-actions">
                      <button type="submit" className="update-btn">Update</button>
                      <button type="button" onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="workout-header">
                      <h3>{workout.title}</h3>
                      <span className="workout-date">
                        {new Date(workout.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="workout-details">
                      <div className="detail-item">
                        <span className="detail-label">Load:</span>
                        <span className="detail-value">{workout.load} kg</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Reps:</span>
                        <span className="detail-value">{workout.reps}</span>
                      </div>
                    </div>
                    <div className="workout-actions">
                      <button 
                        onClick={() => handleEdit(workout)}
                        className="edit-btn"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(workout._id)}
                        className="delete-btn"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewWorkouts; 