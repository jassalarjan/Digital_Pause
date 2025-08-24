console.log("Digital Pause background script loaded.");

const DEFAULT_SETTINGS = {
  blockedSites: ["instagram.com", "tiktok.com", "x.com", "twitter.com"],
  pauseDuration: 15,
  isEnabled: true,
};

const RULE_ID = 1;

const getSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      resolve(settings);
    });
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "proceedToSite") {
    chrome.tabs.update(sender.tab.id, {url: request.url});
  }
});

const updateBlockingRules = async () => {
  const { isEnabled, blockedSites } = await getSettings();

  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const existingRuleIds = existingRules.map(rule => rule.id);
  if (existingRuleIds.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: existingRuleIds });
  }

  if (isEnabled && blockedSites && blockedSites.length > 0) {
    const newRule = {
      id: RULE_ID,
      priority: 1,
      action: {
        type: "redirect",
        redirect: { extensionPath: "/pause.html" },
      },
      condition: {
        requestDomains: blockedSites,
        resourceTypes: ["main_frame"],
      },
    };

    await chrome.declarativeNetRequest.updateDynamicRules({ addRules: [newRule] });
    console.log("Digital Pause: Blocking rules updated for:", blockedSites);
  } else {
    console.log("Digital Pause: Extension is disabled or no sites to block.");
  }
};

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) { // Only for top-level frames
    getSettings().then(({ isEnabled, blockedSites }) => {
      if (!isEnabled) return;
      
      const url = new URL(details.url);
      const hostname = url.hostname;

      // More robust check: matches exact domain or subdomains (e.g., www.instagram.com)
      const isBlocked = blockedSites.some(site => hostname === site || hostname.endsWith('.' + site));

      if (isBlocked) {
        console.log(`Digital Pause: Capturing navigation to blocked site: ${details.url}`);
        chrome.storage.local.set({ lastVisited: details.url });
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("Digital Pause: Extension installed or updated.");
  if (details.reason === "install") {
    await chrome.storage.sync.set(DEFAULT_SETTINGS);
  }
  updateBlockingRules();
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    console.log("Digital Pause: Settings changed, updating rules...");
    updateBlockingRules();
  }
});
