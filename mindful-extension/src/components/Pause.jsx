import React, { useState, useEffect } from 'react';

const Pause = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [countdown, setCountdown] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    console.log("Pause page loaded. Fetching data...");
    chrome.storage.local.get(['lastVisited'], (data) => {
      if (data && data.lastVisited) {
        console.log("Successfully retrieved lastVisited URL:", data.lastVisited);
        setTargetUrl(data.lastVisited);
      } else {
        console.error("Could not retrieve lastVisited URL from storage.");
      }
    });
    chrome.storage.sync.get(['pauseDuration'], (settings) => {
      console.log("Retrieved settings:", settings);
      setCountdown(settings.pauseDuration || 15);
    });
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTimeUp(true);
    }
  }, [countdown]);

  const handleProceed = () => {
    console.log(`Attempting to proceed to: ${targetUrl}`);
    if (targetUrl) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs[0]) {
          console.log(`Found active tab ${tabs[0].id}. Updating URL...`);
          chrome.tabs.update(tabs[0].id, { url: targetUrl });
        } else {
          console.error("Could not find active tab to update.");
        }
      });
    } else {
      console.error("Cannot proceed: targetUrl is empty.");
    }
  };

  const handleStayFocused = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.remove(tabs[0].id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Digital Pause</h1>
        <p className="text-lg text-gray-600 mb-8">
          Take a moment to breathe before you proceed.
        </p>
        <div className="mb-8">
          <div className="text-6xl font-mono text-indigo-600">{countdown}</div>
          <p className="text-sm text-gray-500">seconds remaining</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStayFocused}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300"
          >
            Stay Focused
          </button>
          <button
            onClick={handleProceed}
            disabled={!isTimeUp}
            className={`px-6 py-3 text-white rounded-lg shadow-md transition-all duration-300 ${
              isTimeUp
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-indigo-300 cursor-not-allowed'
            }`}
          >
            Proceed to Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pause;
