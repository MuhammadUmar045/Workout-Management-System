import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <Typewriter
                options={{
                  strings: [
                    "WORKOUT MANAGEMENT SYSTEM",
                    "TRACK YOUR FITNESS JOURNEY",
                    "ACHIEVE YOUR GOALS",
                    "TRANSFORM YOUR LIFE",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </h1>
            <p className="hero-subtitle">
              Your ultimate fitness companion for tracking workouts, monitoring
              progress, and crushing your fitness goals every single day.
            </p>
            <div className="hero-buttons">
              <Link to="/workouts" className="btn-primary">
                <span className="btn-icon">💪</span>
                Start Tracking
              </Link>
              <a href="#features" className="btn-secondary">
                <span className="btn-icon">🎯</span>
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Workouts Logged</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Workout MS?</h2>
            <p className="section-subtitle">
              Everything you need to track, monitor, and optimize your fitness
              journey
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>
                Monitor your workouts, reps, and weights with detailed tracking
                and analytics.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Set Goals</h3>
              <p>
                Define your fitness targets and watch as you crush them one
                workout at a time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Ready</h3>
              <p>
                Access your workouts anywhere, anytime from any device with our
                responsive design.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔥</div>
              <h3>Stay Motivated</h3>
              <p>
                Get insights and visualize your progress to stay motivated on
                your fitness journey.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick & Easy</h3>
              <p>
                Log your workouts in seconds with our intuitive and
                user-friendly interface.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Achieve More</h3>
              <p>
                Join thousands of users who transformed their bodies and
                exceeded their goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Fitness?</h2>
          <p className="cta-text">
            Start tracking your workouts today and see real results tomorrow
          </p>
          <Link to="/workouts" className="btn-cta">
            Get Started Now 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}
