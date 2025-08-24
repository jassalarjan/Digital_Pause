import React, { useState, useEffect } from "react";

export default function BreathingExercise({ timeLeft }) {
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold, exhale
  const [breathCount, setBreathCount] = useState(0);
  const [circleSize, setCircleSize] = useState(100);

  useEffect(() => {
    const breathCycle = 4000; // 4 seconds per breath cycle
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'inhale') {
          setCircleSize(150);
          return 'hold';
        } else if (prev === 'hold') {
          setCircleSize(150);
          return 'exhale';
        } else {
          setCircleSize(100);
          setBreathCount(prev => prev + 1);
          return 'inhale';
        }
      });
    }, breathCycle);

    return () => clearInterval(interval);
  }, []);

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe in slowly...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe out slowly...';
      default:
        return 'Breathe naturally...';
    }
  };

  const getBreathColor = () => {
    switch (breathPhase) {
      case 'inhale':
        return '#3b82f6';
      case 'hold':
        return '#8b5cf6';
      case 'exhale':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="exercise-container breathing-exercise">
      <h2 className="exercise-title">Deep Breathing Exercise</h2>
      <p className="exercise-description">
        Focus on your breath to center yourself and find calm
      </p>
      
      <div className="breathing-visual">
        <div 
          className="breathing-circle"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            backgroundColor: getBreathColor(),
            transition: 'all 1s ease-in-out'
          }}
        >
          <span className="breath-instruction">{getBreathInstruction()}</span>
        </div>
      </div>

      <div className="breath-stats">
        <div className="breath-count">
          <span className="breath-number">{breathCount}</span>
          <span className="breath-label">breaths completed</span>
        </div>
        <div className="time-remaining">
          <span className="time-number">{timeLeft}</span>
          <span className="time-label">seconds remaining</span>
        </div>
      </div>

      <div className="breathing-tips">
        <h4>Breathing Tips:</h4>
        <ul>
          <li>Breathe through your nose</li>
          <li>Let your belly expand naturally</li>
          <li>Keep your shoulders relaxed</li>
          <li>Focus on the rhythm of your breath</li>
        </ul>
      </div>
    </div>
  );
}

