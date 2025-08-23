import React from "react";

export default function SeatedTwist({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Seated Twist</h2>
      <p>Twist gently to each side.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
