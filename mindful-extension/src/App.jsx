import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [blockedSites, setBlockedSites] = useState([]);
  const [newSite, setNewSite] = useState("");
  const [interventionCount, setInterventionCount] = useState(0);

  useEffect(() => {
    // Load initial settings
    chrome.storage.sync.get(['isEnabled', 'blockedSites'], (result) => {
      setIsEnabled(result.isEnabled !== false);
      setBlockedSites(result.blockedSites || []);
    });

    // Load and update intervention count
    const loadInterventionCount = () => {
      const today = new Date().toDateString();
      chrome.storage.local.get(['interventionStats'], (data) => {
        const stats = data.interventionStats || {};
        setInterventionCount(stats[today] || 0);
      });
    };

    // Load initial count
    loadInterventionCount();

    // Listen for changes in intervention stats
    const handleStorageChange = (changes, namespace) => {
      if (namespace === 'local' && changes.interventionStats) {
        loadInterventionCount();
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const handleToggle = () => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);
    chrome.storage.sync.set({ isEnabled: newIsEnabled });
  };

  const handleAddSite = (e) => {
    e.preventDefault();
    if (newSite && !blockedSites.includes(newSite)) {
      const newBlockedSites = [...blockedSites, newSite.trim()];
      setBlockedSites(newBlockedSites);
      chrome.storage.sync.set({ blockedSites: newBlockedSites });
      setNewSite("");
    }
  };

  const handleRemoveSite = (siteToRemove) => {
    const newBlockedSites = blockedSites.filter(site => site !== siteToRemove);
    setBlockedSites(newBlockedSites);
    chrome.storage.sync.set({ blockedSites: newBlockedSites });
  };

  return (
    <div className="app-container popup-mode">
      <div className="app-header">
        <div className="header-logo">
          <img src="/DP.png" alt="Digital Pause" className="logo-image" />
        </div>
        <h1 className="app-title">Digital Pause</h1>
        <p className="app-subtitle">Mindful browsing starts here</p>
      </div>

      <div className="stats-counter">
        <span className="stats-number">{interventionCount}</span>
        <span className="stats-label">interventions today</span>
      </div>

      <div className="toggle-container">
        <span className="toggle-label">Extension Enabled</span>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={isEnabled} 
            onChange={handleToggle}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="blocked-sites-list">
        <h2 className="font-semibold mb-3">Blocked Websites</h2>
        {blockedSites.length > 0 ? (
          <div className="space-y-2">
            {blockedSites.map(site => (
              <div key={site} className="site-item">
                <span className="text-sm">{site}</span>
                <button 
                  onClick={() => handleRemoveSite(site)} 
                  className="remove-site-btn"
                  title="Remove site"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No sites blocked yet</p>
        )}
      </div>

      <form onSubmit={handleAddSite} className="add-site-form">
        <input 
          type="text"
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
          placeholder="Enter website (e.g., facebook.com)"
          className="site-input"
        />
        <button type="submit" className="add-site-btn">Add</button>
      </form>

      <a href="options.html" target="_blank" className="settings-link">
        Open Full Settings →
      </a>
    </div>
  );
}

export default App;
