const presence = new Presence({
    clientId: "719974375188725770"
  }),
  gameModeMap: ItemMap = {
    ":battleroyale": "Battle Royale",
    ":experimental": "Experimental",
    ":ffa": "Free-For-All",
    ":party": "Party",
    ":teamrush": "Team Rush",
    ":teams": "Teams"
  };

interface AgarData {
  state: number;
  gameMode: string;
  nick: string;
  connecting: boolean;
}

interface ItemMap {
  [key: string]: string;
}

let gameStartTimestamp: number = null,
  agarData: AgarData = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "agar"
    },
    buttons = await presence.getSetting("buttons");

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
          if (await presence.getSetting("showName"))
            data.details = `Playing as ${agarData.nick}`;
          else data.details = "Playing";
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

      if (buttons) {
        const code = document.querySelector(".partymode-info > #code");
        if (code)
          data.buttons = [
            {
              label: "Join Party",
              url: document.URL
            }
          ];
      }
    }
  }

  // If data doesn't exist clear else set activity to the presence data
  if (data.details == null) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: AgarData) => (agarData = data));
