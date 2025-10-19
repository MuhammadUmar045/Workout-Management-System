import React from "react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-icon">🏋️</span>
              Workout MS
            </h3>
            <p className="footer-description">
              Your ultimate fitness companion for tracking workouts and
              achieving your goals. Transform your body, transform your life.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                📺
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/workouts">My Workouts</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#programs">Programs</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>123 Fitness Street, Gym City, GY 12345</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>support@workoutms.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕒</span>
                <span>Mon - Sat: 6:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Newsletter</h4>
            <p className="newsletter-text">
              Subscribe to get fitness tips and exclusive workout plans!
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Workout Management System. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
