import React from 'react';

const ErrorMessage = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-light text-blue-200 mb-8">Lost in Space</h2>
      <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
        Houston, we have a problem! The page you're looking for has drifted into deep space.
      </p>
      <a
        href="/"
        className="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/25"
      >
        Return to Planet !
      </a>
    </div>
  );
};

export default ErrorMessage;
