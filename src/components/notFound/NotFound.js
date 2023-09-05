import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-teal-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 text-lg">The page you are looking for could not be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
