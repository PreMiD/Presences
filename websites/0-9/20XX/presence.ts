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
}

let data20XX: Data20XX = null;

interface ItemMap {
  [key: string]: string;
}

// A map of character prefixes with their names.
const characterNameMap: ItemMap = {
  box: 'Box',
  crt: 'Crate',
  qua: 'Quad',
  vox: 'Voxel',
  blk: 'Block',
  crg: 'Cargo',
  inf: 'Plus',
};

// A map of map IDs with their names.
const mapNameMap: ItemMap = {
  attack: 'Attack Area',
  battle: 'Battle Field',
  big: 'Big Place',
  area: '404',
  combat: 'Combat Zone',
  final: 'Final Destination',
  location: 'Last Location',
  platform: 'Penultimate Platform',
  point: 'Prerequisite Point',
  position: 'Primary Position',
  vector: 'Veritable Vector',
  war: 'War Ground',
  dig: 'Dig',
  unearth: 'Unearth',
  excavate: 'Excavate',
};

// The timestamp of the first time a game was detected.
let gameStartTimestamp: number = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "20xx"
  };

  if (data20XX) {
    data.details = "Main Menu";

    if (data20XX.user) {
      data.state = `${data20XX.user.displayName} (${data20XX.user.isGuest ? 'guest' : `rank ${data20XX.user.rank}`})`;
      if (data20XX.serverInfo)
        data.state += ` in ${data20XX.serverInfo.location}`
    }

    if (data20XX.game) {
      data.details = `In-Game - ${data20XX.game.info.gametype} (${data20XX.game.info.players}/${data20XX.game.info.maxplayers})`;

      if (!gameStartTimestamp)
        gameStartTimestamp = Date.now();
      
      // Character
      data.smallImageKey = 'char_' + data20XX.game.character.split('_')[0];
      data.smallImageText = characterNameMap[data20XX.game.character.split('_')[0]];

      // Map
      if (data20XX.game.map) {
        data.largeImageKey = data20XX.game.map ? 'map_' + data20XX.game.map : '20xx';
        data.smallImageText = `${mapNameMap[data20XX.game.map]} - ${data.smallImageText}`;
      }

      data.startTimestamp = gameStartTimestamp;
    } else gameStartTimestamp = null;
  }

  // If data doesn't exist clear else set activity to the presence data
  if (data.details == null) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: Data20XX) => data20XX = data);