import React from "react";

export default function ShoulderRolls({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Shoulder Rolls</h2>
      <p>Roll shoulders forward and backward.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
