const iframe = new iFrame();

interface TrickSplitWindow {
  game?: {
    aliveTime: number;
    lbPosition: number;
    playerCells: Map<number, object>;
  };
  menuHandler?: {
    gameMode: string;
    loggedIn: boolean;
    region: string;
    selectedServer: string;
  };
}

iframe.on("UpdateData", async () => {
  const ts = window as TrickSplitWindow;
  if (!ts.game || !ts.menuHandler) return;

  const data = {
    gameMode: ts.menuHandler.gameMode,
    region: ts.menuHandler.region,
    aliveTime: ts.game.aliveTime,
    pos: ts.game.lbPosition,
    cellCount: ts.game.playerCells.size,
    connected: !!ts.menuHandler.selectedServer
  };

  iframe.send(data);
});
