import React from "react";

export default function About() {
  return (
    <div>
      <div className="card">
        <h1>About This Project</h1>
        <p>
          This MERN Stack application demonstrates modern web development
          practices and provides a foundation for building scalable,
          production-ready applications.
        </p>
      </div>

      <div className="card">
        <h2>Technology Stack</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>⚛️ React 18</h3>
            <p>
              Modern UI library with hooks, concurrent features, and improved
              performance.
            </p>
          </div>
          <div className="feature-item">
            <h3>⚡ Vite</h3>
            <p>
              Next-generation frontend tooling with lightning-fast HMR and
              optimized builds.
            </p>
          </div>
          <div className="feature-item">
            <h3>🛣️ React Router v6</h3>
            <p>
              Declarative routing for React with improved APIs and bundle size.
            </p>
          </div>
          <div className="feature-item">
            <h3>🎨 Modern CSS</h3>
            <p>
              CSS Grid, Flexbox, and custom properties for beautiful, responsive
              layouts.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Project Structure</h2>
        <ul>
          <li>
            <strong>/src/components</strong> - Reusable UI components
          </li>
          <li>
            <strong>/src/pages</strong> - Application pages and routes
          </li>
          <li>
            <strong>/src/main.jsx</strong> - Application entry point
          </li>
          <li>
            <strong>/src/App.jsx</strong> - Root component with routing
          </li>
          <li>
            <strong>/src/index.css</strong> - Global styles and CSS variables
          </li>
        </ul>
      </div>

      <div className="card">
        <h2>Next Steps</h2>
        <p>Ready to build something amazing? Here are some suggestions:</p>
        <ul>
          <li>Connect to a MongoDB database for data persistence</li>
          <li>Add user authentication and authorization</li>
          <li>Implement CRUD operations with a REST API</li>
          <li>Add form validation and error handling</li>
          <li>
            Deploy to production with Vercel, Netlify, or your preferred host
          </li>
        </ul>
      </div>
    </div>
  );
}
