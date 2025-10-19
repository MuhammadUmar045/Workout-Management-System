import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <div className="brand-icon">💪</div>
            <h1 className="brand-title">Workout Buddy</h1>
          </Link>
        </div>
        
        <nav className="navbar-nav">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                <span className="nav-icon">➕</span>
                <span className="nav-text">Add Workout</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/view" className="nav-link">
                <span className="nav-icon">👁️</span>
                <span className="nav-text">View All</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="nav-link">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Statistics</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Hero Section with Background Image */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">Transform Your Fitness Journey</h2>
            <p className="hero-subtitle">
              Track your workouts, monitor your progress, and achieve your fitness goals with our comprehensive workout management system.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Workouts Tracked</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="workout-illustration">
              <div className="floating-elements">
                <div className="floating-dumbbell">🏋️</div>
                <div className="floating-heart">❤️</div>
                <div className="floating-star">⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
