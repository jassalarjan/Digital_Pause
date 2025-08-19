import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

chrome.storage.sync.get(["blockedSites", "blockedSelectors"], (data) => {
  const { blockedSites = [], blockedSelectors = [] } = data;
  const isBlockedSite = blockedSites.some((site) =>
    window.location.href.includes(site)
  );

  if (isBlockedSite) {
    injectApp(document.body); // replace whole page
  } else {
    blockedSelectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        injectApp(el);
      }
    });
  }
});

function injectApp(targetElement) {
  targetElement.innerHTML = "";
  const container = document.createElement("div");
  container.id = "mindful-root";
  targetElement.appendChild(container);

  const root = createRoot(container);
  root.render(<App />);
}
