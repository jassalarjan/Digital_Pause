console.log("Digital Pause background script loaded.");

// Default configuration
const defaultConfig = {
  blockedSites: ["instagram.com", "tiktok.com", "x.com", "twitter.com"],
  pauseDuration: 15,
  isEnabled: true
};

let ruleId = 1;

// Helper function to get settings from storage
const getSettings = () => new Promise((resolve) => {
  chrome.storage.sync.get(defaultConfig, (result) => {
    resolve(result);
  });
});

// Helper function to increment intervention count
const incrementInterventionCount = async () => {
  const today = new Date().toDateString();
  try {
    const data = await chrome.storage.local.get(['interventionStats']);
    const stats = data.interventionStats || {};
    const currentCount = stats[today] || 0;
    const newStats = { ...stats, [today]: currentCount + 1 };
    await chrome.storage.local.set({ interventionStats: newStats });
    console.log(`Digital Pause: Intervention count incremented for ${today}: ${newStats[today]}`);
  } catch (error) {
    console.error("Digital Pause: Error incrementing intervention count:", error);
  }
};

// Handle proceed to site requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "proceedToSite") {
    console.log("Received proceedToSite request for URL:", message.url);
    
    getSettings().then(async ({ blockedSites }) => {
      const hostname = new URL(message.url).hostname;
      
      if (blockedSites.find(site => hostname === site || hostname.endsWith("." + site))) {
        // Remove existing blocking rules
        const existingRules = (await chrome.declarativeNetRequest.getDynamicRules()).map(rule => rule.id);
        if (existingRules.length > 0) {
          await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: existingRules
          });
        }
        
        // Navigate to the requested site
        chrome.tabs.update(sender.tab.id, { url: message.url });
        
        // Re-enable blocking after pause duration
        setTimeout(updateBlockingRules, 5000);
      }
    });
    
    return true; // Keep message channel open for async response
  }
});

// Update blocking rules based on current settings
const updateBlockingRules = async () => {
  const { isEnabled, blockedSites } = await getSettings();
  
  // Remove existing rules
  const existingRules = (await chrome.declarativeNetRequest.getDynamicRules()).map(rule => rule.id);
  if (existingRules.length > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRules
    });
  }
  
  if (isEnabled && blockedSites && blockedSites.length > 0) {
    // Create new blocking rule
    const rule = {
      id: ruleId,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          extensionPath: "/pause.html"
        }
      },
      condition: {
        requestDomains: blockedSites,
        resourceTypes: ["main_frame"]
      }
    };
    
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [rule]
    });
    
    console.log("Digital Pause: Blocking rules updated for:", blockedSites);
  } else {
    console.log("Digital Pause: Extension is disabled or no sites to block.");
  }
};

// Monitor navigation to blocked sites
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId === 0) { // Main frame only
    const { isEnabled, blockedSites } = await getSettings();
    if (!isEnabled) return;
    
    const hostname = new URL(details.url).hostname;
    if (blockedSites.some(site => hostname === site || hostname.endsWith("." + site))) {
      console.log(`Digital Pause: Capturing navigation to blocked site: ${details.url}`);
      
      // Store the URL and increment intervention count
      await chrome.storage.local.set({ lastVisited: details.url });
      await incrementInterventionCount();
    }
  }
});

// Handle extension installation/update
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("Digital Pause: Extension installed or updated.");
  
  if (details.reason === "install") {
    await chrome.storage.sync.set(defaultConfig);
  }
  
  updateBlockingRules();
});

// Handle settings changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync") {
    console.log("Digital Pause: Settings changed, updating rules...");
    updateBlockingRules();
  }
});

// Initialize blocking rules on startup
updateBlockingRules();
