import React, { useState, useEffect } from 'react';

const Options = () => {
  const [blockedSites, setBlockedSites] = useState([]);
  const [newSite, setNewSite] = useState("");
  const [pauseDuration, setPauseDuration] = useState(15);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(['blockedSites', 'pauseDuration'], (result) => {
      setBlockedSites(result.blockedSites || []);
      setPauseDuration(result.pauseDuration || 15);
    });
  }, []);

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => setFeedback(""), 2000);
  }

  const handleAddSite = (e) => {
    e.preventDefault();
    if (newSite && !blockedSites.includes(newSite)) {
      const newBlockedSites = [...blockedSites, newSite.trim()];
      setBlockedSites(newBlockedSites);
      chrome.storage.sync.set({ blockedSites: newBlockedSites });
      setNewSite("");
      showFeedback("Site added!");
    }
  };

  const handleRemoveSite = (siteToRemove) => {
    const newBlockedSites = blockedSites.filter(site => site !== siteToRemove);
    setBlockedSites(newBlockedSites);
    chrome.storage.sync.set({ blockedSites: newBlockedSites });
    showFeedback("Site removed!");
  };

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value, 10);
    setPauseDuration(duration);
    chrome.storage.sync.set({ pauseDuration: duration });
    showFeedback("Duration saved!");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Digital Pause Settings</h1>
        
        {feedback && <div className="bg-green-100 text-green-800 p-3 rounded-md mb-6">{feedback}</div>}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Blocked Websites</h2>
          <form onSubmit={handleAddSite} className="flex mb-4">
            <input 
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              placeholder="e.g., youtube.com"
              className="flex-grow p-3 border rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-r-md hover:bg-indigo-700">Add Site</button>
          </form>
          <ul className="space-y-2">
            {blockedSites.map(site => (
              <li key={site} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span className="font-mono">{site}</span>
                <button onClick={() => handleRemoveSite(site)} className="text-red-500 hover:text-red-700 font-bold text-lg">&times;</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pause Duration</h2>
          <div className="flex items-center space-x-4">
            <input 
              type="range" 
              min="5" 
              max="60" 
              value={pauseDuration} 
              onChange={handleDurationChange}
              className="w-full"
            />
            <span className="font-bold text-indigo-600 text-lg">{pauseDuration}s</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Options;
