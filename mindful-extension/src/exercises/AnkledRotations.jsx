import React from "react";

export default function AnkleRotations({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Ankle Rotations</h2>
      <p>Rotate each ankle in circles.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
