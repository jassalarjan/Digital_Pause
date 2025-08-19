import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function OptionsPage() {
  const [sites, setSites] = useState([]);
  const [selectors, setSelectors] = useState([]);
  const [newSite, setNewSite] = useState("");
  const [newSelector, setNewSelector] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(["blockedSites", "blockedSelectors"], (data) => {
      setSites(data.blockedSites || []);
      setSelectors(data.blockedSelectors || []);
    });
  }, []);

  const save = () => {
    chrome.storage.sync.set({
      blockedSites: sites,
      blockedSelectors: selectors
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Mindful Extension Settings 🌿</h1>

      <h2>Blocked Sites</h2>
      <input
        value={newSite}
        onChange={(e) => setNewSite(e.target.value)}
        placeholder="example.com"
      />
      <button
        onClick={() => {
          if (newSite.trim()) {
            setSites([...sites, newSite.trim()]);
            setNewSite("");
          }
        }}
      >
        Add
      </button>

      <ul>
        {sites.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h2>Blocked Selectors</h2>
      <input
        value={newSelector}
        onChange={(e) => setNewSelector(e.target.value)}
        placeholder='div[aria-label="Reels"]'
      />
      <button
        onClick={() => {
          if (newSelector.trim()) {
            setSelectors([...selectors, newSelector.trim()]);
            setNewSelector("");
          }
        }}
      >
        Add
      </button>

      <ul>
        {selectors.map((sel, i) => (
          <li key={i}>{sel}</li>
        ))}
      </ul>

      <button style={{ marginTop: 20 }} onClick={save}>
        Save Settings
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById("options-root"));
root.render(<OptionsPage />);
