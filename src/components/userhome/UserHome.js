import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import QuizResponses from "./QuizResponses";

const UserHome = () => {
  const { username } = useParams();
  const [goals, setGoals] = useState([]);
  const [todaysGoal, setTodaysGoal] = useState(null);
  const [isLoadingGenerateGoals, setIsLoadingGenerateGoals] = useState(false);
  const [isLoadingGenerateTodayGoal, setIsLoadingGenerateTodayGoal] = useState(false);
  const [isLoadingRetrieveQuizResponses, setIsLoadingRetrieveQuizResponses] = useState(false);
  const [isLoadingRetrieveAllGoals, setIsLoadingRetrieveAllGoals] = useState(false);

    // Function to generate a new goal for today
    const generateNewGoalForToday = () => {
      setIsLoadingGenerateTodayGoal(true); // Set loading state to true
      axios.get(`/api/v1/goals/today/${username}`)
        .then(response => {
          setTodaysGoal(response.data);
        })
        .catch(error => {
          console.error("Error fetching today's goal:", error);
        })
        .finally(() => {
          setIsLoadingGenerateTodayGoal(false); // Set loading state to false
        });
    };

  useEffect(() => {

    setIsLoadingRetrieveAllGoals(true); // Set loading state to true for retrieving all goals
    axios.get(`/api/v1/goals/${username}`)
      .then(response => {
        setGoals(response.data);
      })
      .catch(error => {
        console.error("Error fetching user goals:", error);
      })
      .finally(() => {
        setIsLoadingRetrieveAllGoals(false); // Set loading state to false after retrieving all goals
      });

    setIsLoadingRetrieveQuizResponses(true); // Set loading state to true for retrieving quiz responses
    axios.get(`/api/v1/goals/today/${username}`)
      .then(response => {
        setTodaysGoal(response.data);
      })
      .catch(error => {
        console.error("Error fetching today's goal:", error);
      })
      .finally(() => {
        setIsLoadingRetrieveQuizResponses(false); // Set loading state to false after retrieving quiz responses
      });

    // Initial loading of today's goal
    generateNewGoalForToday();
  }, [username]);

  const handleMarkCompleted = (goalId) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    if (!goalToUpdate) return;

    const isCompleted = !goalToUpdate.completed;

    axios.put(`/api/v1/goals/${goalId}`, { completed: isCompleted })
      .then(response => {
        const updatedGoals = goals.map(goal => {
          if (goal.id === goalId) {
            return { ...goal, completed: isCompleted };
          }
          return goal;
        });
        setGoals(updatedGoals);
        // Regenerate a new goal for today when marked as completed
        if (todaysGoal && todaysGoal.id === goalId) {
          setIsLoadingGenerateTodayGoal(true); // Set loading state to true
          generateNewGoalForToday();
        }
      })
      .catch(error => {
        console.error("Error marking goal as completed/incomplete:", error);
      });
  };

  const handleMarkRejected = (goalId) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    if (!goalToUpdate) return;

    const isRejected = !goalToUpdate.rejected;

    axios.put(`/api/v1/goals/${goalId}`, { rejected: isRejected })
      .then(response => {
        const updatedGoals = goals.map(goal => {
          if (goal.id === goalId) {
            return { ...goal, rejected: isRejected };
          }
          return goal;
        });
        setGoals(updatedGoals);
        // Regenerate a new goal for today when marked as rejected
        if (todaysGoal && todaysGoal.id === goalId) {
          setIsLoadingGenerateTodayGoal(true); // Set loading state to true
          generateNewGoalForToday();
        }
      })
      .catch(error => {
        console.error("Error marking goal as rejected/not rejected:", error);
      });
  };

  const handleGenerateGoals = () => {
    setIsLoadingGenerateGoals(true); // Set loading state to true for generating new goals
    axios.post(`/api/v1/goals/create`, { username: username })
      .then(response => {
        setGoals(response.data);
      })
      .catch(error => {
        console.error("Error generating new goals:", error);
      })
      .finally(() => {
        setIsLoadingGenerateGoals(false); // Set loading state to false after generating new goals
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h3 className="text-2xl font-semibold mb-4">Welcome to the User Home Page, {username}!</h3>
      <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50" onClick={handleGenerateGoals}>Generate New Goals</button>
      {/* Loading message for generating new goals */}
      {isLoadingGenerateGoals && <p>Generating new goals...</p>}
      <h4 className="text-xl mt-4">Today's Goal:</h4>
      {isLoadingGenerateTodayGoal ? (
        // Loading message for generating today's goal
        <p>Generating today's goal...</p>
      ) : (
        todaysGoal ? (
          <div className="border border-gray-300 rounded-md p-4 mt-2">
            <p>{todaysGoal.goalText}</p>
            <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 ml-2" onClick={() => handleMarkCompleted(todaysGoal.id)}>Mark as Completed</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 ml-2" onClick={() => handleMarkRejected(todaysGoal.id)}>Mark as Rejected</button>
          </div>
        ) : (
          <p>No goal for today.</p>
        )
      )}
      <h4 className="text-xl mt-4">All Goals:</h4>
      {isLoadingRetrieveAllGoals ? (
        // Loading message for retrieving all goals
        <p>Retrieving all goals...</p>
      ) : (
        <div className="h-[400px] p-4 overflow-y-scroll">
          {goals.length > 0 ? (
            <ul className="list-none mt-2"> {/* Apply list-none class here */}
              {goals.map(goal => (
                <li key={goal.id} className={`border rounded-md p-4 mt-2 ${goal.completed ? 'bg-green-100' : goal.rejected ? 'bg-red-100' : 'bg-white'}`}>
                  <p>{goal.goalText}</p>
                  <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 ml-2" onClick={() => handleMarkCompleted(goal.id)}>Mark as Completed</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 ml-2" onClick={() => handleMarkRejected(goal.id)}>Mark as Rejected</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No goals found. Click Generate goals to add new goals.</p>
          )}
        </div>
      )}
      <h4 className="text-xl mt-4">Quiz Responses:</h4>
      {/* Loading message for retrieving quiz responses */}
      {isLoadingRetrieveQuizResponses ? (
        <p>Retrieving quiz responses...</p>
      ) : (
        <QuizResponses username={username} />
      )}
    </div>
  );
};

export default UserHome;
