import React, { useState, useEffect } from 'react';
import BreathingExercise from '../exercises/breathing.jsx';
import NeckStretch from '../exercises/NeckStrech.jsx';
import ShoulderRolls from '../exercises/ShoulderRolls.jsx';
import WristStretch from '../exercises/WristStretch.jsx';
import SideStretch from '../exercises/SideStretch.jsx';
import SeatedTwist from '../exercises/seatedtwist.jsx';
import PalmPress from '../exercises/PalmPress.jsx';
import ForwardBend from '../exercises/forwardBend.jsx';
import AnkledRotations from '../exercises/AnkledRotations.jsx';
import GKQuestions from '../exercises/GKQuestions.jsx';
import ReflectionQuestions from '../exercises/ReflectionQuestions.jsx';
import QuickMath from '../exercises/QuickMath.jsx';

const allExercises = [
  {
    id: 'breathing',
    component: BreathingExercise,
    name: 'Deep Breathing',
    description: 'Focus on your breath to center yourself',
    duration: 30,
    category: 'Mindfulness'
  },
  {
    id: 'neck',
    component: NeckStretch,
    name: 'Neck Stretch',
    description: 'Release tension in your neck and shoulders',
    duration: 45,
    category: 'Physical'
  },
  {
    id: 'shoulders',
    component: ShoulderRolls,
    name: 'Shoulder Rolls',
    description: 'Loosen up your shoulder muscles',
    duration: 30,
    category: 'Physical'
  },
  {
    id: 'wrists',
    component: WristStretch,
    name: 'Wrist Stretch',
    description: 'Relieve tension from typing and scrolling',
    duration: 30,
    category: 'Physical'
  },
  {
    id: 'side',
    component: SideStretch,
    name: 'Side Stretch',
    description: 'Stretch your sides and improve posture',
    duration: 30,
    category: 'Physical'
  },
  {
    id: 'twist',
    component: SeatedTwist,
    name: 'Seated Twist',
    description: 'Gently twist to release back tension',
    duration: 30,
    category: 'Physical'
  },
  {
    id: 'palms',
    component: PalmPress,
    name: 'Palm Press',
    description: 'Relax your hands and fingers',
    duration: 20,
    category: 'Physical'
  },
  {
    id: 'forward',
    component: ForwardBend,
    name: 'Forward Bend',
    description: 'Release tension in your back and hamstrings',
    duration: 30,
    category: 'Physical'
  },
  {
    id: 'ankles',
    component: AnkledRotations,
    name: 'Ankle Rotations',
    description: 'Improve circulation in your feet and ankles',
    duration: 30,
    category: 'Physical'
  },
  {
    id: 'gk',
    component: GKQuestions,
    name: 'GK Challenge',
    description: 'Test your general knowledge',
    duration: 40,
    category: 'Mental'
  },
  {
    id: 'reflection',
    component: ReflectionQuestions,
    name: 'Mindful Reflection',
    description: 'Reflect on your motivations',
    duration: 45,
    category: 'Mindfulness'
  },
  {
    id: 'math',
    component: QuickMath,
    name: 'Quick Math',
    description: 'Sharpen your mental math skills',
    duration: 35,
    category: 'Mental'
  }
];

const ExerciseManager = ({ timeLeft, currentExercise, onExerciseComplete }) => {
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [currentExerciseData, setCurrentExerciseData] = useState(null);
  const [randomizedExercises, setRandomizedExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shuffle exercises function
  const shuffleExercises = (exercises) => {
    const shuffled = [...exercises];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Create a randomized order of exercises
    const shuffled = shuffleExercises(allExercises);
    setRandomizedExercises(shuffled);
    
    // Find the current exercise in the randomized list
    const currentIndex = shuffled.findIndex(ex => ex.id === currentExercise);
    setCurrentIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [currentExercise]);

  useEffect(() => {
    const exercise = randomizedExercises[currentIndex];
    if (exercise) {
      setCurrentExerciseData(exercise);
      setExerciseProgress(0);
    }
  }, [currentIndex, randomizedExercises]);

  useEffect(() => {
    if (!currentExerciseData) return;

    const interval = setInterval(() => {
      setExerciseProgress(prev => {
        const newProgress = prev + (100 / (currentExerciseData.duration || 30));
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentExerciseData]);

  if (!currentExerciseData) {
    return (
      <div className="exercise-section">
        <div className="exercise-container">
          <h2 className="exercise-title">Mindful Moment</h2>
          <p className="exercise-description">
            Take this time to breathe and be present
          </p>
          <div className="stats-counter">
            <span className="stats-number">{timeLeft}</span>
            <span className="stats-label">seconds remaining</span>
          </div>
        </div>
      </div>
    );
  }

  const ExerciseComponent = currentExerciseData.component;
  const totalExercises = randomizedExercises.length;
  
  return (
    <div className="exercise-section">
      <div className="exercise-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${exerciseProgress}%` }}
          ></div>
        </div>
        <div className="exercise-counter">
          Exercise {currentIndex + 1} of {totalExercises} • {currentExerciseData.category}
        </div>
      </div>

      <ExerciseComponent timeLeft={timeLeft} />
      
      <div className="exercise-navigation">
        <button
          onClick={onExerciseComplete}
          className="dp-button dp-button-primary"
        >
          {currentIndex === totalExercises - 1 ? 'Complete Session' : 'Next Exercise'}
        </button>
        
        <div className="exercise-info">
          <h4>{currentExerciseData.name}</h4>
          <p>{currentExerciseData.description}</p>
          <span className="exercise-duration">
            {currentExerciseData.duration} seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;
export { allExercises as exercises };
