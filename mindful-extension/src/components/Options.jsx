import React, { useState, useEffect } from 'react';

const Options = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [blockedSites, setBlockedSites] = useState([]);
  const [pauseDuration, setPauseDuration] = useState(15);
  const [newSite, setNewSite] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    // Load settings on component mount
    chrome.storage.sync.get(['isEnabled', 'blockedSites', 'pauseDuration'], (data) => {
      if (data.isEnabled !== undefined) {
        setIsEnabled(data.isEnabled);
      }
      if (data.blockedSites) {
        setBlockedSites(data.blockedSites);
      }
      if (data.pauseDuration) {
        setPauseDuration(data.pauseDuration);
      }
    });
  }, []);

  const handleToggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    chrome.storage.sync.set({ isEnabled: newValue });
    showFeedback('Extension ' + (newValue ? 'enabled' : 'disabled') + ' successfully!');
  };

  const addSite = () => {
    if (newSite.trim() && !blockedSites.includes(newSite.trim())) {
      const newSites = [...blockedSites, newSite.trim()];
      setBlockedSites(newSites);
      chrome.storage.sync.set({ blockedSites: newSites });
      setNewSite('');
      showFeedback('Site added successfully!');
    }
  };

  const removeSite = (siteToRemove) => {
    const newSites = blockedSites.filter(site => site !== siteToRemove);
    setBlockedSites(newSites);
    chrome.storage.sync.set({ blockedSites: newSites });
    showFeedback('Site removed successfully!');
  };

  const handleDurationChange = (event) => {
    const newDuration = parseInt(event.target.value);
    setPauseDuration(newDuration);
    chrome.storage.sync.set({ pauseDuration: newDuration });
    showFeedback('Pause duration updated successfully!');
  };

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSite();
  };

  return (
    <div className="options-container">
      <div className="options-card">
        <div className="app-header">
          <div className="header-logo">
            <img src="/DP.png" alt="Digital Pause" className="logo-image" />
          </div>
          <h1 className="app-title">Digital Pause Settings</h1>
          <p className="app-subtitle">Customize your digital wellbeing experience</p>
        </div>

        {feedbackMessage && (
          <div className="feedback-message">
            {feedbackMessage}
          </div>
        )}

        <div className="settings-section">
          <h2 className="settings-heading">Extension Status</h2>
          <p className="settings-description">
            Enable or disable the Digital Pause extension. When disabled, no sites will be blocked.
          </p>
          <div className="toggle-container">
            <span className="toggle-label">Enable Digital Pause</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={handleToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-heading">Blocked Sites</h2>
          <p className="settings-description">
            Add or remove websites that you want to block. When you visit these sites, you'll be redirected to a mindful pause page.
          </p>
          
          <form onSubmit={handleSubmit} className="site-form">
            <input
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              placeholder="Enter site (e.g., facebook.com)"
              className="site-input"
              required
            />
            <button type="submit" className="add-site-btn">
              Add Site
            </button>
          </form>

          <div className="sites-container">
            {blockedSites.length === 0 ? (
              <div className="empty-state">
                No sites blocked yet. Add some to get started!
              </div>
            ) : (
              <ul className="sites-list">
                {blockedSites.map((site, index) => (
                  <li key={index} className="site-item">
                    <span className="site-name">{site}</span>
                    <button
                      onClick={() => removeSite(site)}
                      className="remove-site-btn"
                      title="Remove site"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-heading">Pause Duration</h2>
          <p className="settings-description">
            Set how long (in seconds) the pause page should be displayed before allowing access to blocked sites.
          </p>
          
          <div className="duration-control">
            <div className="duration-labels">
              <span>5 seconds</span>
              <span>60 seconds</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={pauseDuration}
              onChange={handleDurationChange}
              className="duration-slider"
            />
            <div className="duration-value">
              {pauseDuration} seconds
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <span>Digital Pause v1.0</span>
          <span>Made with mindfulness</span>
        </div>
      </div>
    </div>
  );
};

export default Options;
