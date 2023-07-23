import React, { useState } from "react";
import axios from "../../api/axiosConfig"; // Import your axios instance
import { useNavigate } from "react-router-dom";


export default function AuthForm(props) {
  let [authMode, setAuthMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const navigate = useNavigate();

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
          navigate(`/userhome/${username}`)


        })
        .catch((error) => {
          console.log("Login error: ", error.response);
          // console.error("Login error:", error.response.data);
        });
    } else {
      // Perform the signup API call
      // Implement signup functionality as per your API requirements
      axios
        .post("/api/v1/users/register", {
          username: username,
          password: password,
          email: email
        })
        .then((response) => {
          // Handle successful login
          console.log("Register successful!");
          console.log(response.data);
          const username = response.data.username;
          navigate(`/quizform/${username}`)
        })
        .catch((error) => {
          console.log("Register error: ", error.response);
          // console.error("Login error:", error.response.data);
        });
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          {authMode === "signin" ? (
            <>
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
            </>
          ) : (
            <>
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="myname@example.com"
                  value = {email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
