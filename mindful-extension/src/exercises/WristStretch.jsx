import React from "react";

export default function WristStretch({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Wrist Stretch</h2>
      <p>Stretch wrists gently forward and backward.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
