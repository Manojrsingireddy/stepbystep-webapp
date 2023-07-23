import React from "react";
import { useParams } from "react-router-dom";

const UserHome = () => {
  const { username } = useParams();

  // Now you can use the 'username' variable to retrieve related data or perform other actions.

  return (
    <div>
      <h3>Welcome to the User Home Page, {username}!</h3>
      {/* ... Display other content and retrieve related data using 'username' ... */}
    </div>
  );
};

export default UserHome;
