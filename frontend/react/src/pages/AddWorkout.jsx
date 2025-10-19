import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddWorkout.css';

const AddWorkout = () => {
  const [formData, setFormData] = useState({
    title: '',
    load: '',
    reps: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:4000/api/workouts';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create workout');
      }

      const newWorkout = await response.json();
      setSuccess(true);
      setFormData({ title: '', load: '', reps: '' });
      
      // Redirect to view page after 2 seconds
      setTimeout(() => {
        navigate('/view');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-workout-page">
      <div className="add-workout-container">
        <div className="page-header">
          <h1>Add New Workout</h1>
          <p>Track your fitness progress by adding a new workout session</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            ✅ Workout added successfully! Redirecting to view page...
          </div>
        )}

        <div className="workout-form-card">
          <form onSubmit={handleSubmit} className="add-workout-form">
            <div className="form-group">
              <label htmlFor="title">Exercise Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Bench Press, Squats, Deadlift"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="load">Load (kg)</label>
              <input
                type="number"
                id="load"
                name="load"
                value={formData.load}
                onChange={handleInputChange}
                placeholder="Enter weight in kg"
                min="0"
                step="0.5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reps">Repetitions</label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={formData.reps}
                onChange={handleInputChange}
                placeholder="Number of reps"
                min="1"
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Adding Workout...' : 'Add Workout'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="tips-section">
          <h3>💡 Tips for Better Tracking</h3>
          <ul>
            <li>Be specific with exercise names for better organization</li>
            <li>Record the actual weight you lifted, not your target</li>
            <li>Include the number of completed reps, not planned reps</li>
            <li>Add workouts immediately after completing them</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddWorkout; 