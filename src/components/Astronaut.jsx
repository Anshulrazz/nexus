import React from 'react';
import { Rocket, Orbit } from 'lucide-react';

const Astronaut = () => {
  return (
    <div className="relative animate-float">
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        <Rocket className="w-full h-full text-white opacity-90 rotate-45" />
        <Orbit className="absolute -top-4 -right-4 w-8 h-8 text-blue-400 animate-spin-slow" />
      </div>
    </div>
  );
};

export default Astronaut;
