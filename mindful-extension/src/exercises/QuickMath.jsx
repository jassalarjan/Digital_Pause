import React, { useState, useEffect } from "react";

const QuickMath = ({ timeLeft }) => {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [problemsAttempted, setProblemsAttempted] = useState(0);

  const generateMathProblem = () => {
    const operations = [
      { symbol: '+', func: (a, b) => a + b, name: 'Addition' },
      { symbol: '-', func: (a, b) => a - b, name: 'Subtraction' },
      { symbol: '×', func: (a, b) => a * b, name: 'Multiplication' },
      { symbol: '÷', func: (a, b) => Math.round((a / b) * 100) / 100, name: 'Division' }
    ];

    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    switch (operation.symbol) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = operation.func(num1, num2);
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 25;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = operation.func(num1, num2);
        break;
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = operation.func(num1, num2);
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
        answer = operation.func(num1, num2);
        break;
      default:
        num1 = 5;
        num2 = 3;
        answer = 8;
    }

    return {
      num1,
      num2,
      operation: operation.symbol,
      operationName: operation.name,
      answer,
      question: `${num1} ${operation.symbol} ${num2} = ?`
    };
  };

  useEffect(() => {
    setCurrentProblem(generateMathProblem());
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    // Generate new problem every 12 seconds
    const interval = setInterval(() => {
      setCurrentProblem(generateMathProblem());
      setUserAnswer("");
      setShowResult(false);
    }, 12000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const userNum = parseFloat(userAnswer);
    const correct = Math.abs(userNum - currentProblem.answer) < 0.01;
    
    setIsCorrect(correct);
    setShowResult(true);
    setProblemsAttempted(prev => prev + 1);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setCurrentProblem(generateMathProblem());
    setUserAnswer("");
    setShowResult(false);
  };

  if (!currentProblem) {
    return (
      <div className="exercise-container">
        <h2 className="exercise-title">Loading Math Problem...</h2>
      </div>
    );
  }

  return (
    <div className="exercise-container quick-math-exercise">
      <h2 className="exercise-title">Quick Math Challenge</h2>
      <p className="exercise-description">
        Keep your mind sharp with quick calculations
      </p>
      
      <div className="math-problem-card">
        <div className="problem-header">
          <span className="operation-badge">{currentProblem.operationName}</span>
        </div>
        
        <div className="math-question">
          <h3 className="question-text">{currentProblem.question}</h3>
        </div>

        <form onSubmit={handleSubmit} className="math-answer-form">
          <div className="input-group">
            <input
              type="number"
              step="0.01"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="math-input"
              disabled={showResult}
            />
            <button
              type="submit"
              className="dp-button dp-button-primary submit-btn"
              disabled={showResult || !userAnswer.trim()}
            >
              Check Answer
            </button>
          </div>
        </form>

        {showResult && (
          <div className="result-section">
            <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              <span className="result-icon">
                {isCorrect ? '✅' : '❌'}
              </span>
              <span className="result-text">
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </span>
            </div>
            
            <div className="correct-answer">
              <span className="answer-label">Correct answer:</span>
              <span className="answer-value">{currentProblem.answer}</span>
            </div>
            
            <button
              onClick={handleNext}
              className="dp-button dp-button-secondary next-btn"
            >
              Next Problem
            </button>
          </div>
        )}

        <div className="math-stats">
          <div className="score-display">
            <span className="score-label">Score:</span>
            <span className="score-value">{score}/{problemsAttempted}</span>
          </div>
          <div className="accuracy">
            <span className="accuracy-label">Accuracy:</span>
            <span className="accuracy-value">
              {problemsAttempted > 0 ? Math.round((score / problemsAttempted) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="math-tips">
          <h4>Math Tips:</h4>
          <ul>
            <li>Take your time - accuracy over speed</li>
            <li>Use mental math when possible</li>
            <li>Double-check your calculations</li>
            <li>Practice makes perfect!</li>
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

export default QuickMath;
