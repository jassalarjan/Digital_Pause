import React from 'react';
import BreathingExercise from '../exercises/breathing.jsx';
import NeckStretch from '../exercises/NeckStrech.jsx';
import ShoulderRolls from '../exercises/ShoulderRolls.jsx';
import WristStretch from '../exercises/WristStretch.jsx';
import SideStretch from '../exercises/SideStretch.jsx';
import SeatedTwist from '../exercises/seatedtwist.jsx';
import PalmPress from '../exercises/PalmPress.jsx';
import ForwardBend from '../exercises/forwardBend.jsx';
import AnkledRotations from '../exercises/AnkledRotations.jsx';

const exercises = [
  {
    id: 'breathing',
    component: BreathingExercise,
    name: 'Deep Breathing',
    description: 'Focus on your breath to center yourself'
  },
  {
    id: 'neck',
    component: NeckStretch,
    name: 'Neck Stretch',
    description: 'Release tension in your neck and shoulders'
  },
  {
    id: 'shoulders',
    component: ShoulderRolls,
    name: 'Shoulder Rolls',
    description: 'Loosen up your shoulder muscles'
  },
  {
    id: 'wrists',
    component: WristStretch,
    name: 'Wrist Stretch',
    description: 'Relieve tension from typing and scrolling'
  },
  {
    id: 'side',
    component: SideStretch,
    name: 'Side Stretch',
    description: 'Stretch your sides and improve posture'
  },
  {
    id: 'twist',
    component: SeatedTwist,
    name: 'Seated Twist',
    description: 'Gently twist to release back tension'
  },
  {
    id: 'palms',
    component: PalmPress,
    name: 'Palm Press',
    description: 'Relax your hands and fingers'
  },
  {
    id: 'forward',
    component: ForwardBend,
    name: 'Forward Bend',
    description: 'Release tension in your back and hamstrings'
  },
  {
    id: 'ankles',
    component: AnkledRotations,
    name: 'Ankle Rotations',
    description: 'Improve circulation in your feet and ankles'
  }
];

const ExerciseManager = ({ timeLeft, currentExercise, onExerciseComplete }) => {
  const exercise = exercises.find(ex => ex.id === currentExercise);
  
  if (!exercise) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mindful Moment</h2>
        <p className="text-gray-600">Take this time to breathe and be present</p>
        <div className="text-4xl font-mono text-indigo-600 mt-6">{timeLeft}</div>
        <p className="text-sm text-gray-500">seconds remaining</p>
      </div>
    );
  }

  const ExerciseComponent = exercise.component;
  
  return (
    <div className="exercise-section">
      <ExerciseComponent timeLeft={timeLeft} />
      <div className="text-center mt-6">
        <button
          onClick={onExerciseComplete}
          className="dp-button dp-button-primary"
        >
          Next Exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseManager;
export { exercises };
