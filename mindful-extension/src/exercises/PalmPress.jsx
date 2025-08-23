import React from "react";

export default function PalmPress({ timeLeft }) {
  return (
    <div className="exercise-container" style={{ textAlign: "center" }}>
      <h2>Palm Press</h2>
      <p>Press your palms together for 15 seconds, release and repeat.</p>
      <h3 className="timer">{timeLeft} sec</h3>
    </div>
  );
}
