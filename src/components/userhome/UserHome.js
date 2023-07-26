import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./UserHome.css";

const UserHome = () => {
  const { username } = useParams();
  const [goals, setGoals] = useState([]);
  const [todaysGoal, setTodaysGoal] = useState(null);

  useEffect(() => {
    // Fetch user goals
    axios.get(`/api/v1/goals/${username}`)
      .then(response => {
        setGoals(response.data);
      })
      .catch(error => {
        console.error("Error fetching user goals:", error);
      });
  
    // Fetch today's goal
    axios.get(`/api/v1/goals/today/${username}`)
      .then(response => {
        setTodaysGoal(response.data);
      })
      .catch(error => {
        console.error("Error fetching today's goal:", error);
      });
  }, [username]);
  
  

  const handleMarkCompleted = (goalId) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    if (!goalToUpdate) return;
  
    // Toggle between completed and incomplete states
    const isCompleted = !goalToUpdate.completed;
  
    // Make a PUT request to update the goal
    axios.put(`/api/v1/goals/${goalId}`, { completed: isCompleted })
      .then(response => {
        // Update the goals list after marking as completed/incomplete
        const updatedGoals = goals.map(goal => {
          if (goal.id === goalId) {
            return { ...goal, completed: isCompleted };
          }
          return goal;
        });
        setGoals(updatedGoals);
      })
      .catch(error => {
        console.error("Error marking goal as completed/incomplete:", error);
      });
  };
  
  const handleMarkRejected = (goalId) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    if (!goalToUpdate) return;
  
    // Toggle between rejected and not rejected states
    const isRejected = !goalToUpdate.rejected;
  
    // Make a PUT request to update the goal
    axios.put(`/api/v1/goals/${goalId}`, { rejected: isRejected })
      .then(response => {
        // Update the goals list after marking as rejected/not rejected
        const updatedGoals = goals.map(goal => {
          if (goal.id === goalId) {
            return { ...goal, rejected: isRejected };
          }
          return goal;
        });
        setGoals(updatedGoals);
      })
      .catch(error => {
        console.error("Error marking goal as rejected/not rejected:", error);
      });
  };

    const handleGenerateGoals = () => {
    axios.post(`/api/v1/goals/create`, { username: username })
      .then(response => {
        // Update the goals list with the newly generated goals
        setGoals(response.data);
      })
      .catch(error => {
        console.error("Error generating new goals:", error);
      });
  };

  return (
    <div>
      <h3>Welcome to the User Home Page, {username}!</h3>
      <button onClick={handleGenerateGoals}>Generate New Goals</button>
      <h4>Today's Goal:</h4>
      {todaysGoal ? (
        <div>
          <p>{todaysGoal.goalText}</p>
          <button onClick={() => handleMarkCompleted(todaysGoal.id)}>Mark as Completed</button>
          <button onClick={() => handleMarkRejected(todaysGoal.id)}>Mark as Rejected</button>
        </div>
      ) : (
        <p>No goal for today.</p>
      )}
      <h4>All Goals:</h4>
      {goals.length > 0 ? (
        <ul>
          {goals.map(goal => (
            <li key={goal.id} className={goal.completed ? "completed" : goal.rejected ? "rejected" : ""}>
              <p>{goal.goalText}</p>
              <button onClick={() => handleMarkCompleted(goal.id)}>Mark as Completed</button>
              <button onClick={() => handleMarkRejected(goal.id)}>Mark as Rejected</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals found.</p>
      )}
      {/* ... Add other components or content as needed ... */}
    </div>
  );
};


export default UserHome;
