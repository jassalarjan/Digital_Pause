import React from "react";

export default function ForwardBend({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Forward Bend</h2>
      <p>Bend forward and relax for 20 seconds.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
