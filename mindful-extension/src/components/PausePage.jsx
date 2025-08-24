
import React from 'react';

const PausePage = () => {
  const proceedToSite = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const originalUrl = urlParams.get('originalUrl');
    if (originalUrl) {
      chrome.runtime.sendMessage({action: "proceedToSite", url: originalUrl});
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Digital Pause</h1>
        <p className="app-subtitle">Take a moment to breathe before you proceed.</p>
        <button 
          onClick={proceedToSite}
          className="dp-button dp-button-primary"
        >
          Proceed to Site
        </button>
      </div>
    </div>
  );
};

export default PausePage;
