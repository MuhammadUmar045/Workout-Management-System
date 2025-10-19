import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <div className="footer-icon">💪</div>
            <h3>Workout Buddy</h3>
            <p>Your ultimate fitness companion for tracking workouts and achieving your fitness goals.</p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Workout</Link></li>
            <li><Link to="/view">View All</Link></li>
            <li><Link to="/stats">Statistics</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About Us</h4>
          <p>Workout Buddy is a comprehensive fitness tracking application designed to help you monitor your progress, set goals, and stay motivated on your fitness journey. Our mission is to make fitness tracking simple and effective.</p>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>support@workoutbuddy.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>123 Fitness Street, Gym City, GC 12345</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Workout Buddy. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <span>📘</span>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <span>🐦</span>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <span>📷</span>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <span>📺</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 