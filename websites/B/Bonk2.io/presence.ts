const presence = new Presence({
    clientId: "778092541836656712"
  }),
  menuIDs = [
    // Login/Guest
    "guestOrAccountContainer",
    "guestContainer",
    "accountContainer",
    "autoLoginContainer",

    // Lobby
    "newbonklobby",
    "mapeditorcontainer",

    // MainMenu
    "classic_mid",
    "friendsContainer",
    "skinmanager",
    "skineditorcontainer",
    "quickPlayWindow",
    "roomListContainer",

    // Game Canvas
    "sm_connectingContainer",
    "gamerenderer"
  ],
  modePair: { [key: string]: string } = {
    Arrows: "arrows2",
    "Death Arrows": "arrows2",
    Grapple: "grapple2"
  },
  selector = menuIDs
    .map(
      (id) =>
        "#" +
        id +
        '[style*="visibility: inherit"]' +
        "," +
        ("#" + id + '[style*="display: block"]')
    )
    .join(",");

let gameStartTimestamp: number = null,
  lastGameMode: string = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "bonk"
    },
    element = document.querySelector(selector);

  if (element) {
    const playerCount = document.querySelectorAll(".newbonklobby_playerentry")
        .length,
      lobbyGameMode = document.querySelector("#newbonklobby_modetext")
        .textContent;
    data.state =
      document.querySelector("#pretty_top_name").textContent +
      " - " +
      document.querySelector("#pretty_top_level").textContent;
    switch (element.id) {
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
        lastGameMode = lobbyGameMode;
        data.details = `In a lobby - ${lastGameMode} (${playerCount} player${
          playerCount === 1 ? "" : "s"
        })`;
        data.smallImageKey = modePair[lastGameMode] || "classic2";
        data.smallImageText = lastGameMode;
        break;
      case "mapeditorcontainer":
        data.details = "Editing a map";
        break;
      case "sm_connectingContainer":
        data.details = "Connecting to a game...";
        break;
      case "gamerenderer":
        data.details = "In Game";
        if (lastGameMode) {
          data.details += ` - ${lastGameMode}`;
          data.smallImageKey = modePair[lastGameMode] || "classic2";
          data.smallImageText = lastGameMode;
        }
        break;
    }

    if (element.id === "gamerenderer" && !gameStartTimestamp)
      gameStartTimestamp = Date.now();
    else if (element.id !== "gamerenderer") gameStartTimestamp = null;

    if (gameStartTimestamp) data.startTimestamp = gameStartTimestamp;
  }

  if (!(await presence.getSetting("showName"))) delete data.state;

  // If data doesn't exist clear else set activity to the presence data
  if (data.details == null) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: string) => (lastGameMode = data));
