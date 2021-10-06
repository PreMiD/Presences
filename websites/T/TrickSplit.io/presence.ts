const presence = new Presence({
  clientId: "719732079180644424"
});

interface TrickSplitData {
  gameMode?: string;
  region?: string;
  aliveTime: number;
  pos: number;
  cellCount: number;
  connected: boolean;
}

let tsData: TrickSplitData = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "tricksplit"
  };

  if (tsData && tsData.connected) {
    data.state = `${tsData.gameMode} on ${tsData.region}`;

    // In game?
    if (!document.querySelector(".end[style*=flex],.menu:not([style*=none])")) {
      // Spectating?
      if (tsData.cellCount === 0) data.details = "Spectating";
      else {
        data.details = `Playing as ${
          localStorage.getItem("nick") || "TrickSplit.io"
        } (#${tsData.pos})`;
        data.startTimestamp = tsData.aliveTime;
      }
    } else data.details = "Main Menu";
  } else data.details = "Connecting...";

  // If data doesn't exist clear else set activity to the presence data
  if (!data.details) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: TrickSplitData) => (tsData = data));
