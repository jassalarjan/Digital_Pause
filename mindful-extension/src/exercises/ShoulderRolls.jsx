import React, { useState, useEffect } from "react";

export default function ShoulderRolls({ timeLeft }) {
  const [rollDirection, setRollDirection] = useState('forward');
  const [rollCount, setRollCount] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setRollDirection(prev => {
        if (prev === 'forward') {
          setRollCount(prev => prev + 1);
          setIsRolling(true);
          setTimeout(() => setIsRolling(false), 1000);
          return 'backward';
        } else {
          setIsRolling(true);
          setTimeout(() => setIsRolling(false), 1000);
          return 'forward';
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const getRollInstruction = () => {
    return rollDirection === 'forward' 
      ? 'Roll shoulders forward' 
      : 'Roll shoulders backward';
  };

  const getRollStyle = () => {
    if (!isRolling) return {};
    
    return rollDirection === 'forward'
      ? { transform: 'translateY(10px) rotateX(15deg)' }
      : { transform: 'translateY(-10px) rotateX(-15deg)' };
  };

  return (
    <div className="exercise-container shoulder-rolls-exercise">
      <h2 className="exercise-title">Shoulder Rolls Exercise</h2>
      <p className="exercise-description">
        Loosen up your shoulder muscles with gentle rolling movements
      </p>
      
      <div className="shoulder-visual">
        <div className="shoulder-diagram">
          <div className="head">😊</div>
          <div className="shoulders-container">
            <div 
              className={`left-shoulder ${isRolling ? 'rolling' : ''}`}
              style={getRollStyle()}
            >
              <div className="shoulder-dot"></div>
            </div>
            <div 
              className={`right-shoulder ${isRolling ? 'rolling' : ''}`}
              style={getRollStyle()}
            >
              <div className="shoulder-dot"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="roll-instruction">
        <h3 className="roll-name">{getRollInstruction()}</h3>
        <div className="roll-animation">
          <div className="roll-indicator">
            {rollDirection === 'forward' ? '⬇️' : '⬆️'}
          </div>
        </div>
      </div>

      <div className="roll-stats">
        <div className="roll-count">
          <span className="roll-number">{rollCount}</span>
          <span className="roll-label">rolls completed</span>
        </div>
        <div className="time-remaining">
          <span className="time-number">{timeLeft}</span>
          <span className="time-label">seconds remaining</span>
        </div>
      </div>

      <div className="rolling-tips">
        <h4>Rolling Tips:</h4>
        <ul>
          <li>Keep your neck relaxed</li>
          <li>Move slowly and smoothly</li>
          <li>Feel the muscles working</li>
          <li>Breathe naturally throughout</li>
        </ul>
      </div>
    </div>
  );
}
