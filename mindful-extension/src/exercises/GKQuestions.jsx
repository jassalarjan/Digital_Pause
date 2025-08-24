import React, { useState, useEffect } from "react";

const GKQuestions = ({ timeLeft }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const gkQuestions = [
    {
      question: "What is the capital of Japan?",
      answer: "Tokyo",
      category: "Geography"
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      category: "Art"
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
      category: "Science"
    },
    {
      question: "In which year did World War II end?",
      answer: "1945",
      category: "History"
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
      category: "Science"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare",
      category: "Literature"
    },
    {
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
      category: "Geography"
    },
    {
      question: "How many sides does a hexagon have?",
      answer: "6",
      category: "Mathematics"
    },
    {
      question: "What is the national flower of India?",
      answer: "Lotus",
      category: "Culture"
    },
    {
      question: "Who discovered gravity?",
      answer: "Isaac Newton",
      category: "Science"
    },
    {
      question: "What is the currency of Australia?",
      answer: "Australian Dollar",
      category: "Economics"
    },
    {
      question: "How many players are there in a basketball team?",
      answer: "5",
      category: "Sports"
    },
    {
      question: "What is the largest mammal?",
      answer: "Blue Whale",
      category: "Biology"
    },
    {
      question: "In which city is the Eiffel Tower located?",
      answer: "Paris",
      category: "Geography"
    },
    {
      question: "What is the square root of 144?",
      answer: "12",
      category: "Mathematics"
    }
  ];

  useEffect(() => {
    // Select a random question
    const randomIndex = Math.floor(Math.random() * gkQuestions.length);
    setCurrentQuestion(gkQuestions[randomIndex]);
    setQuestionIndex(randomIndex);
    setShowAnswer(false);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    // Change question every 10 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * gkQuestions.length);
      setCurrentQuestion(gkQuestions[randomIndex]);
      setQuestionIndex(randomIndex);
      setShowAnswer(false);
    }, 10000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!currentQuestion) {
    return (
      <div className="exercise-container">
        <h2 className="exercise-title">Loading GK Question...</h2>
      </div>
    );
  }

  return (
    <div className="exercise-container gk-questions-exercise">
      <h2 className="exercise-title">General Knowledge Challenge</h2>
      <p className="exercise-description">
        Test your knowledge while you take a mindful pause
      </p>
      
      <div className="gk-question-card">
        <div className="question-category">
          <span className="category-badge">{currentQuestion.category}</span>
        </div>
        
        <div className="question-text">
          <h3 className="question-title">{currentQuestion.question}</h3>
        </div>

        <div className="answer-section">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="dp-button dp-button-primary show-answer-btn"
            >
              Show Answer
            </button>
          ) : (
            <div className="answer-revealed">
              <div className="answer-label">Answer:</div>
              <div className="answer-text">{currentQuestion.answer}</div>
              <button
                onClick={() => setShowAnswer(false)}
                className="dp-button dp-button-secondary hide-answer-btn"
              >
                Hide Answer
              </button>
            </div>
          )}
        </div>

        <div className="gk-tips">
          <h4>Did you know?</h4>
          <ul>
            <li>Learning new facts keeps your mind active</li>
            <li>Knowledge is power - use this time wisely</li>
            <li>Challenge yourself with different categories</li>
            <li>Share interesting facts with friends</li>
          </ul>
        </div>
      </div>

      <div className="time-remaining">
        <span className="time-number">{timeLeft}</span>
        <span className="time-label">seconds remaining</span>
      </div>
    </div>
  );
};

export default GKQuestions;
