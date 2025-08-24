
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
    <div>
      {/* Your existing pause page content */}
      <button onClick={proceedToSite}>Proceed to Site</button>
    </div>
  );
};

export default PausePage;
