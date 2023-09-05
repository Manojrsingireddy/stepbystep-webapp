import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";

const QuizResponses = ({ username }) => {
  const [quizResponses, setQuizResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP GET request to fetch quiz responses from the endpoint
    axios
      .get(`/api/v1/quizzes/${username}`) // Update the URL as needed
      .then((response) => {
        const responseData = response.data;

        // Extract questions and answers from the response
        const questions = responseData.questions || [];
        setQuizResponses(questions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz responses:", error);
        setLoading(false);
      });
  }, [username]);

  return (
    <div className="bg-gray-100 h-[400px] p-4 overflow-y-scroll">
      {loading ? (
        <p>Loading quiz responses...</p>
      ) : quizResponses.length === 0 ? (
        <p>No quiz responses found.</p>
      ) : (
        <ul>
          {quizResponses.map((response, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-md shadow-md mt-4"
            >
              <p className="font-semibold">Question: {response.question}</p>
              <p>Answer: {response.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizResponses;
