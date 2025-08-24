import React, { useState, useEffect } from 'react';
import ExerciseManager from './ExerciseManager';

const Pause = () => {
  const [countdown, setCountdown] = useState(15);
  const [targetUrl, setTargetUrl] = useState('');
  const [currentExercise, setCurrentExercise] = useState('breathing');
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  useEffect(() => {
    console.log("Pause page loaded. Fetching data...");

    // Load target URL and settings
    chrome.storage.local.get(['lastVisited'], (data) => {
      if (data && data.lastVisited) {
        setTargetUrl(data.lastVisited);
        console.log("Target URL loaded:", data.lastVisited);
      }
    });

    chrome.storage.sync.get(['pauseDuration'], (settings) => {
      console.log("Retrieved settings:", settings);
      setCountdown(settings.pauseDuration || 15);
    });

    // Increment intervention count when pause page is shown
    const incrementInterventionCount = () => {
      const today = new Date().toDateString();
      chrome.storage.local.get(['interventionStats'], (data) => {
        const stats = data.interventionStats || {};
        const currentCount = stats[today] || 0;
        const newStats = { ...stats, [today]: currentCount + 1 };
        chrome.storage.local.set({ interventionStats: newStats });
        console.log("Intervention count incremented for today:", newStats[today]);
      });
    };

    // Increment count when pause page loads
    incrementInterventionCount();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleProceedToSite = () => {
    if (targetUrl) {
      chrome.runtime.sendMessage({
        action: 'proceedToSite',
        url: targetUrl
      });
    }
  };

  const handleStayFocused = () => {
    // Reset countdown and continue with exercises
    chrome.storage.sync.get(['pauseDuration'], (settings) => {
      setCountdown(settings.pauseDuration || 15);
    });
    setExerciseCompleted(false);
  };

  const handleExerciseComplete = () => {
    setExerciseCompleted(true);
  };

  const getRandomExercise = () => {
    const exercises = ['breathing', 'neck', 'shoulders', 'wrists', 'side', 'twist', 'palms', 'forward', 'ankles', 'gk', 'reflection', 'math'];
    return exercises[Math.floor(Math.random() * exercises.length)];
  };

  useEffect(() => {
    // Set a random exercise when component mounts
    setCurrentExercise(getRandomExercise());
  }, []);

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-logo">
          <img src="/DP.png" alt="Digital Pause" className="logo-image" />
        </div>
        <h1 className="app-title">Digital Pause</h1>
        <p className="app-subtitle">
          Take a mindful moment before continuing
        </p>
      </div>

      {!exerciseCompleted ? (
        <ExerciseManager
          timeLeft={countdown}
          currentExercise={currentExercise}
          onExerciseComplete={handleExerciseComplete}
        />
      ) : (
        <div className="exercise-section">
          <div className="exercise-container">
            <h2 className="exercise-title">Great job!</h2>
            <p className="exercise-description">
              You've completed your mindful exercise. Take a moment to reflect on how you feel.
            </p>
            
            <div className="stats-counter">
              <span className="stats-number">{countdown}</span>
              <span className="stats-label">seconds remaining</span>
            </div>
          </div>
        </div>
      )}

      <div className="exercise-navigation">
        {countdown > 0 ? (
          <button
            onClick={handleStayFocused}
            className="dp-button dp-button-primary"
          >
            Stay Focused
          </button>
        ) : (
          <button
            onClick={handleProceedToSite}
            className="dp-button dp-button-primary"
            disabled={!targetUrl}
          >
            Proceed to Site
          </button>
        )}
      </div>
    </div>
  );
};

export default Pause;
