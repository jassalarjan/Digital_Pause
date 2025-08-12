console.log("Mindful Surf content script running...");

function replaceReels() {
  const reelsSection = document.querySelector('div[aria-label="Reels"]');
  if (reelsSection) {
    reelsSection.innerHTML = "<div style='padding:20px;font-size:18px;background:#fafafa;border-radius:8px;'>Take a mindful break 🌱</div>";
  }
}

setInterval(replaceReels, 2000);
