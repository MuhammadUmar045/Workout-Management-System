import { useState, useEffect } from 'react';
import './Statistics.css';

const Statistics = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('all');

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

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Calculate statistics
  const calculateStats = () => {
    if (workouts.length === 0) return null;

    const totalWorkouts = workouts.length;
    const totalLoad = workouts.reduce((sum, w) => sum + w.load, 0);
    const totalReps = workouts.reduce((sum, w) => sum + w.reps, 0);
    const avgLoad = totalLoad / totalWorkouts;
    const avgReps = totalReps / totalWorkouts;
    const maxLoad = Math.max(...workouts.map(w => w.load));
    const maxReps = Math.max(...workouts.map(w => w.reps));
    const minLoad = Math.min(...workouts.map(w => w.load));
    const minReps = Math.min(...workouts.map(w => w.reps));

    // Get unique exercises
    const exercises = [...new Set(workouts.map(w => w.title))];
    
    // Calculate exercise-specific stats
    const exerciseStats = exercises.map(exercise => {
      const exerciseWorkouts = workouts.filter(w => w.title === exercise);
      const exerciseLoad = exerciseWorkouts.reduce((sum, w) => sum + w.load, 0);
      const exerciseReps = exerciseWorkouts.reduce((sum, w) => sum + w.reps, 0);
      
      return {
        name: exercise,
        count: exerciseWorkouts.length,
        totalLoad: exerciseLoad,
        totalReps: exerciseReps,
        avgLoad: exerciseLoad / exerciseWorkouts.length,
        avgReps: exerciseReps / exerciseWorkouts.length,
        maxLoad: Math.max(...exerciseWorkouts.map(w => w.load)),
        maxReps: Math.max(...exerciseWorkouts.map(w => w.reps))
      };
    });

    // Sort exercises by frequency
    exerciseStats.sort((a, b) => b.count - a.count);

    return {
      totalWorkouts,
      totalLoad,
      totalReps,
      avgLoad: Math.round(avgLoad * 10) / 10,
      avgReps: Math.round(avgReps * 10) / 10,
      maxLoad,
      maxReps,
      minLoad,
      minReps,
      exerciseStats
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="statistics-page">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="statistics-page">
      <div className="statistics-container">
        <div className="page-header">
          <h1>Workout Statistics</h1>
          <p>Track your progress and analyze your fitness journey</p>
        </div>

        {!stats ? (
          <div className="no-data">
            <div className="no-data-icon">📊</div>
            <h3>No Data Available</h3>
            <p>Start adding workouts to see your statistics!</p>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="overview-stats">
              <div className="stat-card primary">
                <div className="stat-icon">🏋️</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalWorkouts}</span>
                  <span className="stat-label">Total Workouts</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⚖️</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalLoad} kg</span>
                  <span className="stat-label">Total Weight Lifted</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🔄</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalReps}</span>
                  <span className="stat-label">Total Repetitions</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.avgLoad} kg</span>
                  <span className="stat-label">Average Load</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="performance-section">
              <h2>Performance Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <h3>Load Performance</h3>
                  <div className="metric-item">
                    <span className="metric-label">Maximum Load:</span>
                    <span className="metric-value">{stats.maxLoad} kg</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Minimum Load:</span>
                    <span className="metric-value">{stats.minLoad} kg</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Average Load:</span>
                    <span className="metric-value">{stats.avgLoad} kg</span>
                  </div>
                </div>

                <div className="metric-card">
                  <h3>Repetition Performance</h3>
                  <div className="metric-item">
                    <span className="metric-label">Maximum Reps:</span>
                    <span className="metric-value">{stats.maxReps}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Minimum Reps:</span>
                    <span className="metric-value">{stats.minReps}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Average Reps:</span>
                    <span className="metric-value">{stats.avgReps}</span>
                  </div>
                </div>

                <div className="metric-card">
                  <h3>Progress Indicators</h3>
                  <div className="metric-item">
                    <span className="metric-label">Load Range:</span>
                    <span className="metric-value">{stats.maxLoad - stats.minLoad} kg</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Reps Range:</span>
                    <span className="metric-value">{stats.maxReps - stats.minReps}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Workout Frequency:</span>
                    <span className="metric-value">{stats.totalWorkouts} sessions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercise Breakdown */}
            <div className="exercise-breakdown">
              <h2>Exercise Breakdown</h2>
              <div className="exercise-stats">
                {stats.exerciseStats.map((exercise, index) => (
                  <div key={exercise.name} className="exercise-card">
                    <div className="exercise-header">
                      <h3>{exercise.name}</h3>
                      <span className="exercise-count">{exercise.count} workouts</span>
                    </div>
                    
                    <div className="exercise-metrics">
                      <div className="exercise-metric">
                        <span className="metric-label">Total Load:</span>
                        <span className="metric-value">{exercise.totalLoad} kg</span>
                      </div>
                      <div className="exercise-metric">
                        <span className="metric-label">Total Reps:</span>
                        <span className="metric-value">{exercise.totalReps}</span>
                      </div>
                      <div className="exercise-metric">
                        <span className="metric-label">Avg Load:</span>
                        <span className="metric-value">{Math.round(exercise.avgLoad * 10) / 10} kg</span>
                      </div>
                      <div className="exercise-metric">
                        <span className="metric-label">Avg Reps:</span>
                        <span className="metric-value">{Math.round(exercise.avgReps * 10) / 10}</span>
                      </div>
                      <div className="exercise-metric">
                        <span className="metric-label">Max Load:</span>
                        <span className="metric-value">{exercise.maxLoad} kg</span>
                      </div>
                      <div className="exercise-metric">
                        <span className="metric-label">Max Reps:</span>
                        <span className="metric-value">{exercise.maxReps}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-section">
                      <div className="progress-item">
                        <span className="progress-label">Load Progress</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill load-progress"
                            style={{ width: `${(exercise.avgLoad / stats.maxLoad) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-value">{Math.round((exercise.avgLoad / stats.maxLoad) * 100)}%</span>
                      </div>
                      
                      <div className="progress-item">
                        <span className="progress-label">Reps Progress</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill reps-progress"
                            style={{ width: `${(exercise.avgReps / stats.maxReps) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-value">{Math.round((exercise.avgReps / stats.maxReps) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="insights-section">
              <h2>💡 Insights & Recommendations</h2>
              <div className="insights-grid">
                <div className="insight-card">
                  <h3>Most Frequent Exercise</h3>
                  <p>{stats.exerciseStats[0]?.name || 'N/A'} - {stats.exerciseStats[0]?.count || 0} workouts</p>
                </div>
                
                <div className="insight-card">
                  <h3>Strongest Exercise</h3>
                  <p>{stats.exerciseStats.reduce((max, ex) => ex.avgLoad > max.avgLoad ? ex : max, stats.exerciseStats[0])?.name || 'N/A'}</p>
                </div>
                
                <div className="insight-card">
                  <h3>Endurance Champion</h3>
                  <p>{stats.exerciseStats.reduce((max, ex) => ex.avgReps > max.avgReps ? ex : max, stats.exerciseStats[0])?.name || 'N/A'}</p>
                </div>
                
                <div className="insight-card">
                  <h3>Progress Potential</h3>
                  <p>You have {stats.exerciseStats.length} different exercises in your routine</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Statistics; 