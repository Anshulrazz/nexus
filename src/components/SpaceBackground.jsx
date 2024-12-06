import React from 'react';

const SpaceBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0B0B1F] via-[#1F1F3F] to-[#0B0B1F] overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default SpaceBackground;
