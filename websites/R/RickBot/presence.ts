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
      "#serverInfo": "Viewing Server Info",
      "#generalSettings": "Configuring Settings",
      "#soundboard": "Editing Soundboard",
      "#disabledCommands": "Managing disabled Commands",
      "#getPremium": "Viewing Premium",
      "#Vote": "Attempting to Vote"
    },
    lastPath: string = window.location.pathname.split("/").pop();

  dashboardState = dashboardMapper[lastPath];

  return true;
}

function getSoundboardMenu() {
  const regex = /\/soundboards\/\d+\/info/;

  if (!regex.test(document.location.pathname)) return false;

  soundboardState = getSelectorValue(".title.has-text-centered");

  return true;
}

presence.on("UpdateData", () => {
  // Presence
  const presenceData: PresenceData = {
    largeImageKey: "rickastley",
    startTimestamp: timeElapsed
  };

  switch (true) {
    // Displays if user is on the landing page
    case document.location.hostname === "rickbot.net":
      presenceData.details = "Viewing Home";
      presenceData.state = "In the landing page";
      break;

    // Custom Function Cases
    case getDashboardMenu():
      presenceData.details = "Managing Dashboard:";
      presenceData.state = dashboardState;
      break;
    case getSoundboardMenu():
      presenceData.details = "Viewing Soundboard:";
      presenceData.state = soundboardState;
      break;

    // Standard Cases
    case pathIncludes("/profile"):
      presenceData.details = "Viewing Profile";
      presenceData.state = "Looking at my profile";
      break;
    case pathIncludes("/commands"):
      presenceData.details = "Searching for Commands";
      presenceData.state = "Looking for commands";
      break;
    case pathIncludes("/player"):
      presenceData.details = "Managing Player";
      presenceData.state = "Managing music player";
      break;
    case pathIncludes("/vote"):
      presenceData.details = "Attempting to Vote";
      presenceData.state = "Voting for daily rewards";
      break;
    case pathIncludes("/trends"):
      presenceData.details = "Viewing RickStats";
      presenceData.state = "Analysing bot metrics";
      break;
    case pathIncludes("/soundboards"):
      presenceData.details = "Searching Soundboards";
      break;
    case pathIncludes("/dashboard"):
      presenceData.details = "Searching Dashboards";
      break;
  }

  presence.setActivity(presenceData);
});
