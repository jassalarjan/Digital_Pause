import React from "react";

export default function NeckStretch({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Neck Stretch</h2>
      <p>Gently stretch your neck side to side.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
