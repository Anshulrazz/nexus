import React from 'react';
import './animations.css';
import ErrorMessage from '../components/ErrorMessage';
import SpaceBackground from '../components/SpaceBackground';
import Astronaut from '../components/Astronaut';

function PageNotFound() {
  return (
    <SpaceBackground>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="mb-12">
          <Astronaut />
        </div>
        <ErrorMessage />
      </div>
    </SpaceBackground>
  );
}

export default PageNotFound;