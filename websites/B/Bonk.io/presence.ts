const presence = new Presence({
    clientId: "778092541836656712"
  }),
  modePair: { [key: string]: string } = {
    Arrows: "arrows2",
    "Death Arrows": "arrows2",
    Grapple: "grapple2"
  };

interface IFrameData {
  lastGameMode?: string;
  id?: string;
  state: string;
  playerCount: number;
}

let gameStartTimestamp: number = null,
  ifd: IFrameData = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "bonk"
  };

  if (ifd?.id) {
    data.state = ifd.state;
    switch (ifd.id) {
      case "guestOrAccountContainer":
      case "guestContainer":
      case "accountContainer":
      case "autoLoginContainer":
        data.details = "Logging In";
        delete data.state;
        break;
      case "classic_mid":
        data.details = "Main Menu";
        break;
      case "friendsContainer":
        data.details = "Friends List";
        break;
      case "skinmanager":
        data.details = "Skin Manager";
        break;
      case "skineditorcontainer":
        data.details = "Editing a skin";
        break;
      case "quickPlayWindow":
        data.details = "Quick Play Menu";
        break;
      case "roomListContainer":
        data.details = "Viewing Room List";
        break;
      case "newbonklobby":
        data.details = `In a lobby - ${ifd.lastGameMode} (${
          ifd.playerCount
        } player${ifd.playerCount === 1 ? "" : "s"})`;
        data.smallImageKey = modePair[ifd.lastGameMode] || "classic2";
        data.smallImageText = ifd.lastGameMode;
        break;
      case "mapeditorcontainer":
        data.details = "Editing a map";
        break;
      case "sm_connectingContainer":
        data.details = "Connecting to a game...";
        break;
      case "gamerenderer":
        data.details = "In Game";
        if (ifd.lastGameMode) {
          data.details += ` - ${ifd.lastGameMode}`;
          data.smallImageKey = modePair[ifd.lastGameMode] || "classic2";
          data.smallImageText = ifd.lastGameMode;
        }
        break;
    }

    if (ifd.id === "gamerenderer" && !gameStartTimestamp)
      gameStartTimestamp = Date.now();
    else if (ifd.id !== "gamerenderer") gameStartTimestamp = null;

    if (gameStartTimestamp) data.startTimestamp = gameStartTimestamp;
  }

  if (!(await presence.getSetting("showName"))) delete data.state;

  // If data doesn't exist clear else set activity to the presence data
  if (!data.details) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: IFrameData) => (ifd = data));
