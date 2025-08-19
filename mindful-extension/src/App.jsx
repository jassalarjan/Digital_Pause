import React, { useState } from "react";
import "./app.css";

const exercises = [
  { name: "Breathing Exercise", description: "Breathe deeply for 30 seconds." },
  { name: "Neck Stretch", description: "Gently stretch your neck side to side." },
  { name: "Shoulder Rolls", description: "Roll shoulders forward and backward." },
  { name: "Forward Bend", description: "Bend forward and relax for 20 seconds." },
  { name: "Seated Twist", description: "Twist gently to each side." },
  { name: "Ankle Rotations", description: "Rotate each ankle in circles." },
  { name: "Palm Press", description: "Press your palms together for 15 seconds, release and repeat." },
  { name: "Wrist Stretch", description: "Stretch wrists gently forward and backward." },
  { name: "Side Stretch", description: "Lift arms and stretch side to side." }
];

export default function App() {
  const shlok = "यदि ते साधु-व्यसनम् अस्ति, त्वं विजयिष्यसि; यदि ते पाप-व्यसनम् अस्ति, त्वं पराजयिष्यसि।";
  const translation = "If you have addiction to the right, you will win; but if you have addiction to the bad, you will lose.";

  const [exercise, setExercise] = useState(
    exercises[Math.floor(Math.random() * exercises.length)]
  );
  const [stage, setStage] = useState("exercise");

  return (
    <div className="app-container fade-in">
      {/* Sanskrit Header */}
      <header className="sanskrit-header">{shlok}</header>

      {/* Main Exercise Stage */}
      {stage === "exercise" && (
        <main className="exercise-container">
          <h2>{exercise.name}</h2>
          <p>{exercise.description}</p>

          {/* Placeholder for your image */}
          <div className="image-placeholder">[Your Image Here]</div>

          <button
            className="next-btn"
            onClick={() => setStage("redirectCheck")}
          >
            Done
          </button>
        </main>
      )}

      {/* Redirect Check Stage */}
      {stage === "redirectCheck" && (
        <main className="redirect-check">
          <h2>Are you going to an addictive platform?</h2>
          <button
            className="no"
            onClick={() => window.open("https://www.wikipedia.org", "_blank")}
          >
            No
          </button>
          <button
            className="yes"
            onClick={() => alert("Redirecting to your choice...")}
          >
            Yes
          </button>
        </main>
      )}

      {/* Footer Translation */}
      <footer className="translation-footer">{translation}</footer>
    </div>
  );
}
