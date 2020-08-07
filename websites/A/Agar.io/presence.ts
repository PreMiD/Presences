const presence = new Presence({
  clientId: "719974375188725770"
});

interface AgarData {
  state: number;
  gameMode: string;
  nick: string;
  connecting: boolean;
}

let agarData: AgarData = null;

interface ItemMap {
  [key: string]: string;
}

// A map of game mode IDs with their names.
const gameModeMap: ItemMap = {
  ":battleroyale": "Battle Royale",
  ":experimental": "Experimental",
  ":ffa": "Free-For-All",
  ":party": "Party",
  ":teamrush": "Team Rush",
  ":teams": "Teams"
};

// The timestamp of the first time a game was detected.
let gameStartTimestamp: number = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "agar"
  };

  if (agarData) {
    if (agarData.connecting) {
      data.details = "Connecting...";
      gameStartTimestamp = null;
    } else {
      switch (agarData.state) {
        case 0:
          data.details = "Main Menu";
          gameStartTimestamp = null;
          break;
        case 1:
          data.details = `Playing as ${agarData.nick}`;
          if (!gameStartTimestamp) gameStartTimestamp = Date.now();
          break;
        case 2:
          data.details = "Game Over";
          gameStartTimestamp = null;
          break;
        case 3:
          data.details = "Spectating";
          gameStartTimestamp = null;
          break;
      }
      data.state = gameModeMap[agarData.gameMode];
      data.startTimestamp = gameStartTimestamp;
    }
  }

  // If data doesn't exist clear else set activity to the presence data
  if (data.details == null) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: AgarData) => (agarData = data));
