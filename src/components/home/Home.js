import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center min-h-screen">
      <div className="lg:max-w-lg lg:w-full md:w-1/3 w-full">
        {/* Logo image */}
        <img
          className="object-cover object-center rounded"
          alt="hero"
          src="./stepbysteplogo.png"
        />
      </div>
      <div className="md:w-2/3 w-full p-4">
        {/* Text */}
        <h1> Step By Step - Daily Health Goals</h1>
        <p>
          This application is designed to assist users in improving their overall health and well-being. It offers a personalized approach to health goal setting and tracking. Upon logging in, users are presented with a dashboard displaying their daily health goals, which are generated based on their health profile and input. Users can mark these goals as completed or rejected, helping them stay accountable. Additionally, users can view and manage their historical health goals. The app also provides the functionality to generate new daily health goals for users looking to refresh their objectives. It serves as a valuable tool for individuals seeking to cultivate healthier habits, set specific wellness targets, and monitor their progress effectively. To use it, simply sign up, review your daily goals, submitt a health goals/information quiz, generate daily health goals, mark them as completed or rejected as necessary, and generate new goals when desired to continue your health journey.
        </p>
      </div>
    </div>
  );
};

export default Home;
