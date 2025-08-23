import React, { useState, useEffect } from "react";
import "./app.css";
import logo from "./assets/DP.png"; // ✅ tumhara logo
import exercises from "./exercises"; // ✅ imported from exercises.js

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
    const randomExercise =
      exercises[Math.floor(Math.random() * exercises.length)];
    setExercise(randomExercise);
    setTimeLeft(randomExercise.duration);
    setIsRunning(true);
    setStage("exercise");
  };

  return (
    <div className="app-container fade-in">
      {/* Logo Section */}
      <div className="logo-wrapper">
        <img src={logo} alt="App Logo" className="app-logo" />
      </div>

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
        <main className="exercise-container">
          <exercise.component /> {/* ✅ sirf component render hoga, naam duplicate nahi aayega */}
          <h3 className="timer">{timeLeft} sec</h3>
          {timeLeft === 0 && (
            <button
              className="next-btn"
              onClick={() => setStage("redirectCheck")}
            >
              Done
            </button>
          )}
        </main>
      )}

      {/* Redirect Check */}
      {stage === "redirectCheck" && (
        <main className="redirect-check">
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

      {/* Footer */}
      <footer className="translation-footer">{translation}</footer>
    </div>
  );
}
