const iframe = new iFrame();

// Since maps don't have IDs in the game object, we can infer
// what map is being played by it's data.
const guessKeys: ItemMap = {
  // 'xBound:yBound:camPosX:camPosY:spawnCount:doodadCount': 'mapID'
  '32:32:11:15.75:24:36': 'attack',
  '32:32:15.5:15.5:29:88': 'combat',
  '24:48:11.5:23.5:43:106': 'battle',
  '48:48:23:22:62:337': 'big',
  '32:32:15.5:15.5:39:78': 'final',
  '32:32:14.5:5.5:44:84': 'area',
  '32:32:n:48:49': 'location',
  '32:32:15:15:56:66': 'position',
  '32:32:15.5:15.5:39:57': 'point',
  '48:28:23.5:13.5:55:160': 'platform',
  '32:32:15.5:15.5:58:57': 'vector',
  '32:32:n:33:163': 'dig',
  '48:48:23.5:23.5:44:101': 'war',
  '32:32:15.5:15.25:46:72': 'unearth',
  '48:48:23:23:46:492': 'excavate',
}

// Guesses the map via the map object
function guessMap (map: any) {
  const camera = map.spawns.find((spawn: any) => spawn.type === 'camera');
  const cameraKey = camera ? `${camera.pos.x}:${camera.pos.y}` : 'n';
  const guessKey = `${map.size.x}:${map.size.y}:${cameraKey}:${map.spawns.length}:${map.doodads.length}`;
  return guessKeys[guessKey] || null;
}

iframe.on("UpdateData", async () => {
  const main = (<any>window)['main'];
  if (!main) return;

  const data = {
    user: main.net.user ? {
      displayName: main.net.display,
      isGuest: main.net.guest,
      username: main.net.user,
      isDonator: main.net.type === 1,
      rank: main.stats ? main.stats.rank : null
    } : null,
    serverInfo: main.net.game.info || null,
    game: main.game ? {
      character: main.game.charSelect,
      gameOver: main.game.gameOver,
      info: {
        ...main.game.settings,
        players: main.game.ui.score.scores.length
      },
      score: main.game.ui.score.scores.find((score: any) => score.name.replace('γ', '') === main.net.display),
      map: guessMap(main.game.map)
    } : null
  };

  iframe.send(data);
});