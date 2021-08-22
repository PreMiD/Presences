const etPresence = new Presence({
  clientId: "879084648540549221"
});

let etData: {
  address: string,
  songTitle?: string,
  totalBeats?: string,
  startedVibing?: number
} | null = null,
  startedVibing: number | null = null;

const getEtData = () => {
  const songTitle = document.querySelector("#song-title").textContent ?? "",
    totalBeats = document.querySelector("#beats").textContent ?? "0",
    address = location.href;

  if (songTitle === "" || parseInt(totalBeats) === 0) {
    etData = { address };
    return;
  }

  startedVibing = startedVibing ?? Date.now();
  etData = {
    address,
    songTitle,
    totalBeats
  };
};

setInterval(getEtData, 1000);

etPresence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon",
    details: etData.songTitle ?? "Not vibing 😒",
    state: etData.songTitle ? `Already got ${etData.totalBeats} beats in!` : "",
    startTimestamp: startedVibing,
    buttons: [
      {
        label: "Join on the vibes",
        url: etData.address
      }
    ]
  };

  etPresence.setActivity(presenceData);
});
