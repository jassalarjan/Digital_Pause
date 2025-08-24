import React, { useState, useEffect } from "react";

const ReflectionQuestions = ({ timeLeft }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionCount, setReflectionCount] = useState(0);

  const reflectionQuestions = [
    {
      question: "Why do you want to visit this page?",
      options: [
        { id: "required", text: "It's required for work/study", color: "#3b82f6" },
        { id: "dms", text: "Need to check DMs/messages", color: "#8b5cf6" },
        { id: "fun", text: "Just for fun/entertainment", color: "#f59e0b" },
        { id: "habit", text: "Force of habit", color: "#ef4444" },
        { id: "bored", text: "Feeling bored", color: "#10b981" },
        { id: "other", text: "Other reason", color: "#6b7280" }
      ]
    },
    {
      question: "How urgent is this visit?",
      options: [
        { id: "very", text: "Very urgent - can't wait", color: "#ef4444" },
        { id: "somewhat", text: "Somewhat urgent", color: "#f59e0b" },
        { id: "not", text: "Not urgent at all", color: "#10b981" },
        { id: "unsure", text: "I'm not sure", color: "#6b7280" }
      ]
    },
    {
      question: "What could you do instead?",
      options: [
        { id: "work", text: "Focus on important work", color: "#3b82f6" },
        { id: "exercise", text: "Do some physical exercise", color: "#10b981" },
        { id: "read", text: "Read a book/article", color: "#8b5cf6" },
        { id: "meditate", text: "Meditate or practice mindfulness", color: "#f59e0b" },
        { id: "call", text: "Call a friend or family member", color: "#ec4899" },
        { id: "plan", text: "Plan your day/week", color: "#6b7280" }
      ]
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;

    // Change question every 15 seconds
    const interval = setInterval(() => {
      setCurrentQuestionIndex(prev => (prev + 1) % reflectionQuestions.length);
      setSelectedReason(null);
      setShowReflection(false);
    }, 15000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const currentQuestion = reflectionQuestions[currentQuestionIndex];

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    setShowReflection(true);
    setReflectionCount(prev => prev + 1);
  };

  const getReflectionMessage = (reasonId) => {
    const messages = {
      required: "Work and study are important. Consider if this is truly necessary right now.",
      dms: "Communication matters, but urgent messages usually find their way to you.",
      fun: "Entertainment is valuable, but so is your time and focus.",
      habit: "Breaking habits takes awareness. You're already doing great by pausing!",
      bored: "Boredom can be a gateway to creativity and new activities.",
      other: "Take a moment to reflect on what's truly important to you right now.",
      very: "If it's truly urgent, you can proceed. But most things can wait.",
      somewhat: "Consider if this can wait until you've completed more important tasks.",
      not: "Great awareness! Use this time for something more meaningful.",
      unsure: "Uncertainty is okay. Use this pause to gain clarity.",
      work: "Excellent choice! Focus on what matters most.",
      exercise: "Great idea! Physical activity boosts mood and energy.",
      read: "Reading expands your mind and knowledge.",
      meditate: "Mindfulness helps you make better decisions.",
      call: "Connecting with others is always time well spent.",
      plan: "Planning helps you achieve your goals more effectively."
    };
    return messages[reasonId] || "Take this time to reflect on your choices.";
  };

  return (
    <div className="exercise-container reflection-questions-exercise">
      <h2 className="exercise-title">Mindful Reflection</h2>
      <p className="exercise-description">
        Take a moment to reflect on why you want to visit this page
      </p>
      
      <div className="reflection-question-card">
        <div className="question-header">
          <h3 className="reflection-question">{currentQuestion.question}</h3>
          <div className="question-counter">
            Question {currentQuestionIndex + 1} of {reflectionQuestions.length}
          </div>
        </div>

        <div className="options-grid">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleReasonSelect(option)}
              className={`reflection-option ${selectedReason?.id === option.id ? 'selected' : ''}`}
              style={{ 
                '--option-color': option.color,
                borderColor: selectedReason?.id === option.id ? option.color : '#e5e7eb'
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        {showReflection && selectedReason && (
          <div className="reflection-message">
            <div className="message-header">
              <span className="message-icon">💭</span>
              <span className="message-title">Reflection</span>
            </div>
            <p className="message-text">
              {getReflectionMessage(selectedReason.id)}
            </p>
          </div>
        )}

        <div className="reflection-stats">
          <div className="reflection-count">
            <span className="count-number">{reflectionCount}</span>
            <span className="count-label">reflections completed</span>
          </div>
        </div>

        <div className="reflection-tips">
          <h4>Mindful Tips:</h4>
          <ul>
            <li>Pause before acting on impulse</li>
            <li>Question your motivations</li>
            <li>Choose activities that align with your values</li>
            <li>Use this time for self-reflection</li>
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

export default ReflectionQuestions;
