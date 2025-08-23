import React from "react";

export default function BreathingExercise({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Breathing Exercise</h2>
      <p>Breathe deeply for 30 seconds.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}

