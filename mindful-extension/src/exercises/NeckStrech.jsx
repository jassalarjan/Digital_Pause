import React, { useState, useEffect } from "react";

export default function NeckStretch({ timeLeft }) {
  const [currentStretch, setCurrentStretch] = useState('center');
  const [stretchCount, setStretchCount] = useState(0);
  const [isStretching, setIsStretching] = useState(false);

  const stretches = [
    { id: 'center', name: 'Center', instruction: 'Start in neutral position', duration: 2000 },
    { id: 'left', name: 'Left Side', instruction: 'Gently tilt head to the left', duration: 3000 },
    { id: 'right', name: 'Right Side', instruction: 'Gently tilt head to the right', duration: 3000 },
    { id: 'forward', name: 'Forward', instruction: 'Gently tilt head forward', duration: 3000 },
    { id: 'backward', name: 'Backward', instruction: 'Gently tilt head backward', duration: 3000 }
  ];

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setCurrentStretch(prev => {
        const currentIndex = stretches.findIndex(s => s.id === prev);
        const nextIndex = (currentIndex + 1) % stretches.length;
        const nextStretch = stretches[nextIndex];
        
        if (nextStretch.id === 'center') {
          setStretchCount(prev => prev + 1);
        }
        
        setIsStretching(true);
        setTimeout(() => setIsStretching(false), nextStretch.duration - 500);
        
        return nextStretch.id;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const getCurrentStretch = () => {
    return stretches.find(s => s.id === currentStretch);
  };

  const getStretchStyle = () => {
    const stretch = getCurrentStretch();
    if (!stretch) return {};

    switch (stretch.id) {
      case 'left':
        return { transform: 'rotate(-15deg)' };
      case 'right':
        return { transform: 'rotate(15deg)' };
      case 'forward':
        return { transform: 'rotate(15deg)' };
      case 'backward':
        return { transform: 'rotate(-15deg)' };
      default:
        return { transform: 'rotate(0deg)' };
    }
  };

  return (
    <div className="exercise-container neck-stretch-exercise">
      <h2 className="exercise-title">Neck Stretch Exercise</h2>
      <p className="exercise-description">
        Release tension in your neck and shoulders with gentle stretches
      </p>
      
      <div className="stretch-visual">
        <div className="neck-diagram">
          <div 
            className={`head ${isStretching ? 'stretching' : ''}`}
            style={getStretchStyle()}
          >
            <div className="face">😊</div>
          </div>
          <div className="neck"></div>
          <div className="shoulders"></div>
        </div>
      </div>

      <div className="stretch-instruction">
        <h3 className="stretch-name">{getCurrentStretch()?.name} Stretch</h3>
        <p className="stretch-text">{getCurrentStretch()?.instruction}</p>
        <div className="stretch-timer">
          <div className="timer-bar">
            <div 
              className="timer-progress"
              style={{ 
                width: `${(timeLeft % 3) / 3 * 100}%`,
                transition: 'width 0.5s ease'
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="stretch-stats">
        <div className="stretch-count">
          <span className="stretch-number">{stretchCount}</span>
          <span className="stretch-label">stretch cycles completed</span>
        </div>
        <div className="time-remaining">
          <span className="time-number">{timeLeft}</span>
          <span className="time-label">seconds remaining</span>
        </div>
      </div>

      <div className="stretching-tips">
        <h4>Stretching Tips:</h4>
        <ul>
          <li>Move slowly and gently</li>
          <li>Don't force the stretch</li>
          <li>Breathe naturally throughout</li>
          <li>Stop if you feel any pain</li>
        </ul>
      </div>
    </div>
  );
}
