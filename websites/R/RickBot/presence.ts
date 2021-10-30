// Main Presence Module
const presence = new Presence({
    clientId: "903294796536348702"
  }),
  timeElapsed = Math.floor(Date.now() / 1000);

// Global States
let dashboardState: string, soundboardState: string;

// Quick Path Fetcher
function pathIncludes(path: string): boolean {
  return document.location.pathname.toLowerCase().includes(path);
}

// Easy Document Selector
function getSelectorValue(query: string) {
  return document.querySelector(query).textContent;
}

function getDashboardMenu(): boolean {
  if (!pathIncludes("/dashboard/s/")) return false;

  const dashboardMapper: Record<string, string> = {
      "#serverInfo": "Server Info",
      "#generalSettings": "General Settings",
      "#soundboard": "Soundboard",
      "#disabledCommands": "Disabled Commands",
      "#getPremium": "Premium",
      "#Vote": "Voting",
      "#levels": "Levels"
    },
    lastPath: string = window.location.hash;

  dashboardState = dashboardMapper[lastPath];

  return true;
}

function getSoundboardMenu() {
  const regex = /\/soundboards\/\d+\/info/;

  if (!regex.test(document.location.pathname)) return false;

  soundboardState = getSelectorValue(".title.has-text-centered");

  return true;
}

presence.on("UpdateData", async () => {
  // Presence
  const presenceData: PresenceData = {
    largeImageKey: "rickastley",
    startTimestamp: timeElapsed
  };

  // Default State
  if (document.location.hostname === "rickbot.net")
    presenceData.details = "Landing Page";

  switch (true) {
    // Custom Function Cases
    case getDashboardMenu():
      presenceData.details = "Viewing Dashboard:";
      presenceData.state = dashboardState;
      break;
    case getSoundboardMenu():
      presenceData.details = "Viewing Soundboard:";
      presenceData.state = soundboardState;
      break;

    // Standard Cases
    case pathIncludes("/profile"):
      presenceData.details = "Profile";
      break;
    case pathIncludes("/commands"):
      presenceData.details = "Commands";
      break;
    case pathIncludes("/player"):
      presenceData.details = "Music Player";
      break;
    case pathIncludes("/vote"):
      presenceData.details = "Votes";
      break;
    case pathIncludes("/trends"):
      presenceData.details = "Metrics";
      break;
    case pathIncludes("/soundboards"):
      presenceData.details = "Soundboard";
      break;
    case pathIncludes("/dashboard"):
      presenceData.details = "Dashboard";
      break;
  }

  presence.setActivity(presenceData);
});
