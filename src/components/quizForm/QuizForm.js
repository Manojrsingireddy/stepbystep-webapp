import React, { useState } from "react";
import axios from "../../api/axiosConfig"; // Import your axios instance
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Sample questions and answers
const sampleQuestions = [
  {
    id: 1,
    questionText: "Gender",
  },
  {
    id: 2,
    questionText: "Date of Birth",
  },
  {
    id: 3,
    questionText: "Height (in cm or feet/inches)",
  },
  {
    id: 4,
    questionText: "Weight (in kg or lbs)",
  },
  {
    id: 5,
    questionText: "Do you have any existing medical conditions? (e.g., diabetes, hypertension, asthma, etc.)",
  },
  {
    id: 6,
    questionText: "Are you currently taking any medications?",
  },
  {
    id: 7,
    questionText: "Do you have any allergies?",
  },
  {
    id: 8,
    questionText: "How often do you engage in physical activity or exercise? (e.g., never, rarely, 1-2 times a week, 3-4 times a week, daily)",
  },
  {
    id: 9,
    questionText: "What types of physical activities or exercises do you enjoy?",
  },
  {
    id: 10,
    questionText: "How would you describe your current eating habits? (e.g., healthy, moderate, unhealthy)",
  },
  {
    id: 11,
    questionText: "Do you have any dietary preferences or restrictions? (e.g., vegetarian, vegan, gluten-free)",
  },
  {
    id: 12,
    questionText: "How many hours of sleep do you typically get per night?",
  },
  {
    id: 13,
    questionText: "How do you manage stress in your life?",
  },
  {
    id: 14,
    questionText: "Do you have any mental health concerns or conditions?",
  },
  {
    id: 15,
    questionText: "Do you smoke?",
  },
  {
    id: 16,
    questionText: "How often do you consume alcoholic beverages?",
  },
  {
    id: 17,
    questionText: "What are your primary health and fitness goals?",
  },
  {
    id: 18,
    questionText: "Are there any specific challenges or obstacles you face in achieving these goals?",
  },
  {
    id: 19,
    questionText: "What does a typical day in your life look like? (e.g., work schedule, meal times, leisure activities)",
  },
  {
    id: 20,
    questionText: "What motivates you to improve your health and well-being?",
  },
  {
    id: 21,
    questionText: "Have you tried any health or fitness programs in the past? If so, what were the results?",
  },
  {
    id: 22,
    questionText: "Additional Comments",
  },
];

const QuizForm = () => {
  const { username } = useParams();
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const payload = {
      username: username, 
      questionList: sampleQuestions.map((question) => ({
        question: question.questionText,
        answer: answers[question.id] || "",
      })),
    };
    console.log(payload);
    axios
      .post("/api/v1/quizzes", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("Quiz created successfully:", response.data);
        navigate(`/userhome/${username}`)
        // Add any additional logic after successful quiz creation if needed
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
        // Handle the error here, you can log the specific error response:
        if (error.response) {
          console.error("Error response:", error.response.data);
        }
      });
  };

  return (
    <div>
      <h2>Quiz Form</h2>
      <form onSubmit={handleSubmit}>
        {sampleQuestions.map((question) => (
          <div key={question.id}>
            <p>{question.questionText}</p>
            <input
              type="text"
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuizForm;
