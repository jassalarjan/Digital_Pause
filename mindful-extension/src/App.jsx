import React, { useState, useEffect } from "react";
import "./app.css";
import positionImg from "./assets/position.jpeg"; // background image

const exercises = [
  { name: "Breathing Exercise", description: "Breathe deeply for 30 seconds.", duration: 30 },
  { name: "Neck Stretch", description: "Gently stretch your neck side to side.", duration: 20 },
  { name: "Shoulder Rolls", description: "Roll shoulders forward and backward.", duration: 25 },
  { name: "Forward Bend", description: "Bend forward and relax for 20 seconds.", duration: 20 },
  { name: "Seated Twist", description: "Twist gently to each side.", duration: 20 },
  { name: "Ankle Rotations", description: "Rotate each ankle in circles.", duration: 15 },
  { name: "Palm Press", description: "Press your palms together for 15 seconds, release and repeat.", duration: 15 },
  { name: "Wrist Stretch", description: "Stretch wrists gently forward and backward.", duration: 15 },
  { name: "Side Stretch", description: "Lift arms and stretch side to side.", duration: 20 }
];

export default function App() {
  const shlok =
    "यदि ते साधु-व्यसनम् अस्ति, त्वं विजयिष्यसि; यदि ते पाप-व्यसनम् अस्ति, त्वं पराजयिष्यसि।";
  const translation =
    "If you have addiction to the right, you will win; but if you have addiction to the bad, you will lose.";

  const [exercise, setExercise] = useState(null);
  const [stage, setStage] = useState("start");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // timer effect
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startExercise = () => {
    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    setExercise(randomExercise);
    setTimeLeft(randomExercise.duration); // set exercise duration
    setIsRunning(true);
    setStage("exercise");
  };

  return (
    <div className="app-container fade-in">
      {/* Sanskrit Header */}
      <header className="sanskrit-header">{shlok}</header>

      {/* Start Screen */}
      {stage === "start" && (
        <main className="start-container">
          <h2>Welcome to Wellness Break</h2>
          <p>Take a mindful pause and refresh yourself with a short exercise.</p>
          <button className="next-btn" onClick={startExercise}>
            Start Exercise
          </button>
        </main>
      )}

      {/* Exercise Screen */}
      {stage === "exercise" && exercise && (
        <main
          className="exercise-container"
          style={{
            backgroundImage: `url(${positionImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "16px",
            padding: "2rem",
            color: "white",
            minHeight: "60vh",
          }}
        >
          <h2>{exercise.name}</h2>
          <p>{exercise.description}</p>

          {/* Timer */}
          <h3 className="timer">{timeLeft} sec</h3>

          {timeLeft === 0 ? (
            <button
              className="next-btn"
              onClick={() => setStage("redirectCheck")}
            >
              Done
            </button>
          ) : null}
        </main>
      )}

      {/* Redirect Check */}
      {stage === "redirectCheck" && (
        <main className="redirect-check" style={{ textAlign: "center" }}>
          <h2>
            This platform will ruin your mental health. Still you wanna
            continue?
          </h2>
          <button
            className="no"
            onClick={() =>
              window.open("https://www.wikipedia.org", "_blank")
            }
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
