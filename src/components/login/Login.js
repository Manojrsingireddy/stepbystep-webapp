import React, { useState } from "react";
import axios from "../../api/axiosConfig"; // Import your axios instance
import { useNavigate } from "react-router-dom";

export default function AuthForm(props) {
  const [authMode, setAuthMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password state
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setError(""); // Clear any previous error messages when switching modes
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (authMode === "signin") {
      // Perform the login API call
      axios
        .post("/api/v1/users/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          // Handle successful login
          console.log("Login successful!");
          console.log(response.data);
          const username = response.data.username;
          navigate(`/userhome/${username}`);
        })
        .catch((error) => {
          console.log("Login error: ", error.response);
          setError("Login failed. Please try again."); // Set error message
          setPassword(""); // Clear the password field
        });
    } else {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      // Perform the signup API call
      axios
        .post("/api/v1/users/register", {
          username: username,
          password: password,
          email: email,
        })
        .then((response) => {
          // Handle successful sign-up
          console.log("Register successful!");
          console.log(response.data);
          const username = response.data.username;
          navigate(`/quizform/${username}`);
        })
        .catch((error) => {
          console.log("Register error: ", error.response);
          setError("Sign-up failed. Please try again."); // Set error message
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-8 shadow-md rounded-lg w-full md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-center mb-4">
          {authMode === "signin" ? "Sign In" : "Sign Up"}
        </h3>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        {authMode === "signup" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="myname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {authMode === "signup" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        <div className="mb-6 text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-primary font-medium focus:outline-none"
            onClick={toggleAuthMode}
          >
            {authMode === "signin"
              ? "Register for a new account?"
              : "Already Registered?"}
          </button>
        </div>
      </form>
    </div>
  );
}
