import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-dark dark:text-light mb-4">404</h1>
      <p className="text-xl text-dark mb-6 dark:text-light">Oops! The page you're looking for doesn't exist.</p>
      
      <Link
        to="/"
        className="text-xl px-6 py-2 rounded-lg hover:opacity-90 bg-dark text-light dark:bg-light dark:text-dark transition duration-150"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;