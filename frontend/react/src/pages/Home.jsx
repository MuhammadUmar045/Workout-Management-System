import './Home.css';
import { useState } from 'react';

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=900&q=80';

const Home = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="home-landing">
      <div className="hero-landing">
        <div className="hero-text-block">
          <h1>Welcome to Workout Buddy</h1>
          <p className="hero-motivation">
            Your journey to a stronger, healthier you starts here. Track your workouts, monitor your progress, and achieve your fitness goals with ease!
          </p>
          <div className="hero-cta">
            <span>Get started by using the menu above!</span>
          </div>
        </div>
        <div className="hero-images-block single-image">
          <div className="hero-image-card">
            {!imgError ? (
              <img 
                src={HERO_IMAGE_URL} 
                alt="Gym Workout" 
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="img-fallback">Image unavailable</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;