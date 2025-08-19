// Default settings on install
chrome.runtime.onInstalled.addListener(async () => {
  const defaults = {
    blockedSites: ["instagram.com", "twitter.com", "x.com", "tiktok.com", "youtube.com"],
    pauseType: "breathing",     // "breathing" | "intention" | "gratitude" | "puzzle"
    pauseDurationSec: 15,
    metrics: { triggered: 0, completed: 0, skipped: 0 },
    focusSchedule: { enabled: false, start: "09:00", end: "17:00" }, // local time
    whitelistPaths: [] // e.g., ["instagram.com/direct/inbox"]
  };
  const existing = await chrome.storage.sync.get(null);
  await chrome.storage.sync.set({ ...defaults, ...existing });
  console.log("Digital Pause installed with defaults.");
});

// Utility: check if now is within the focus window
function withinSchedule({ enabled, start, end }) {
  if (!enabled) return true;
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const hhmm = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  return start <= end ? (hhmm >= start && hhmm <= end) : (hhmm >= start || hhmm <= end);
}

function isWhitelisted(url, whitelistPaths = []) {
  return whitelistPaths.some((p) => url.includes(p));
}

// Intercept navigations
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  try {
    // ignore subframes; we only want the main frame
    if (details.frameId !== 0) return;

    const pauseUrlBase = chrome.runtime.getURL("pause.html");
    if (details.url.startsWith(pauseUrlBase)) return; // avoid loop

    const { blockedSites = [], focusSchedule = { enabled: false }, whitelistPaths = [] } =
      await chrome.storage.sync.get(["blockedSites", "focusSchedule", "whitelistPaths"]);

    // schedule gate
    if (!withinSchedule(focusSchedule)) return;

    // whitelist gate
    if (isWhitelisted(details.url, whitelistPaths)) return;

    // match by substring
    const match = blockedSites.some((site) => details.url.includes(site));
    if (!match) return;

    // bump "triggered" metric
    const { metrics = { triggered: 0, completed: 0, skipped: 0 } } =
      await chrome.storage.sync.get("metrics");
    await chrome.storage.sync.set({ metrics: { ...metrics, triggered: (metrics.triggered || 0) + 1 } });

    const dest = encodeURIComponent(details.url);
    const pauseUrl = `${pauseUrlBase}?dest=${dest}`;
    await chrome.tabs.update(details.tabId, { url: pauseUrl });
  } catch (e) {
    console.error("Digital Pause error in navigation:", e);
  }
}, { url: [{ urlMatches: ".*" }] });

// Message channel from pause page to update metrics
chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
  if (msg?.type === "metrics") {
    const { metrics = { triggered: 0, completed: 0, skipped: 0 } } =
      await chrome.storage.sync.get("metrics");
    const updated = { ...metrics };
    if (msg.event === "completed") updated.completed = (updated.completed || 0) + 1;
    if (msg.event === "skipped")   updated.skipped   = (updated.skipped   || 0) + 1;
    await chrome.storage.sync.set({ metrics: updated });
    sendResponse({ ok: true });
  }
});
