const presence = new Presence({
  clientId: "719179907518693427"
});

interface Data20XX {
  user?: {
    displayName: string;
    isGuest: boolean;
    isDonator: boolean;
    username: string;
    rank?: number;
  };
  serverInfo?: {
    name: string;
    location: string;
    description: string;
  };
  game?: {
    character: string;
    gameOver: boolean;
    info: {
      gametype: string;
      maxplayers: number;
      players: number;
      name: string;
      objective: number;
      scoreToWin: number;
      teams: number;
    };
    score: {
      death: number;
      kill: number;
      name: string;
      objective: number;
      team: number;
    };
    map?: string;
  };
  nav: string;
}

let data20XX: Data20XX = null;

interface ItemMap {
  [key: string]: string;
}

// A map of character prefixes with their names.
const characterNameMap: ItemMap = {
    box: "Box",
    crt: "Crate",
    qua: "Quad",
    vox: "Voxel",
    blk: "Block",
    crg: "Cargo",
    inf: "Plus",
    cub: "Cube"
  },
  // A map of map IDs with their names.
  mapNameMap: ItemMap = {
    attack: "Attack Area",
    battle: "Battle Field",
    big: "Big Place",
    area: "404",
    combat: "Combat Zone",
    final: "Final Destination",
    location: "Last Location",
    platform: "Penultimate Platform",
    point: "Prerequisite Point",
    position: "Primary Position",
    vector: "Veritable Vector",
    war: "War Ground",
    dig: "Dig",
    unearth: "Unearth",
    excavate: "Excavate"
  };

// The timestamp of the first time a game was detected.
let gameStartTimestamp: number = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "20xx"
  };

  if (data20XX) {
    switch (data20XX.nav) {
      case "setgame":
        data.details = "Changing Game Settings";
        break;
      case "setgraphic":
        data.details = "Changing Graphic Settings";
        break;
      case "stat":
        data.details = "Looking at Player Stats";
        break;
      case "unlock":
        data.details = "Looking at Unlocks";
        break;
      case "lobby":
        data.details = "In Lobby Select";
        break;
      default:
        data.details = "Main Menu";
    }

    if (data20XX.user) {
      data.state = `${data20XX.user.displayName} (${
        data20XX.user.isGuest ? "guest" : `rank ${data20XX.user.rank}`
      })`;
      if (data20XX.serverInfo)
        data.state += ` in ${data20XX.serverInfo.location}`;
    }

    if (data20XX.game) {
      data.details = `In-Game - ${data20XX.game.info.gametype} (${data20XX.game.info.players}/${data20XX.game.info.maxplayers})`;

      gameStartTimestamp ??= Date.now();

      // Character
      data.smallImageKey = `char_${data20XX.game.character.split("_")[0]}`;
      data.smallImageText =
        characterNameMap[data20XX.game.character.split("_")[0]];

      // Map
      if (data20XX.game.map) {
        data.largeImageKey = `map_${data20XX.game.map}`;
        data.smallImageText = `${mapNameMap[data20XX.game.map]} - ${
          data.smallImageText
        }`;
      }

      data.startTimestamp = gameStartTimestamp;
    } else gameStartTimestamp = null;
  } else {
    if (location.pathname.endsWith("/help.html"))
      data.details = "Reading the Help Document";
    else if (location.pathname.endsWith("/rules.html"))
      data.details = "Reading the Rules";
    else if (location.pathname.endsWith("/tos.html"))
      data.details = "Reading the Terms of Service";
  }

  if (!(await presence.getSetting("showName"))) delete data.state;

  // If data doesn't exist clear else set activity to the presence data
  if (!data.details) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: Data20XX) => (data20XX = data));
