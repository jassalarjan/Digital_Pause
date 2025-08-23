import React from "react";

export default function SideStretch({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Side Stretch</h2>
      <p>Lift arms and stretch side to side.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
