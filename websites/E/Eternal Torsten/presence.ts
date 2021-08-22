const etPresence = new Presence({
  clientId: "879084648540549221"
});

let etData: {
  address: string,
  songTitle?: string,
  totalBeats?: string,
  startedVibing?: number
} | null = null;

const getElapsedMiliseconds = (timeFormat: string): number => {
    const parts = timeFormat.split(":"),
      hours = parseInt(parts[0]) * 60 * 60 * 1000,
      minutes = parseInt(parts[1]) * 60 * 1000,
      seconds = parseInt(parts[2]) * 1000;
    return hours + minutes + seconds;
  },

  getEtData = () => {
    const songTitle = document.querySelector("#song-title").textContent ?? "",
      totalBeats = document.querySelector("#beats").textContent ?? "0",
      address = location.href;

    if (songTitle === "" || parseInt(totalBeats) === 0) {
      etData = { address };
      return;
    }

    const startedVibing = Date.now() - getElapsedMiliseconds(document.querySelector("#time").textContent ?? "00:00:00");
    etData = {
      address,
      songTitle,
      totalBeats,
      startedVibing
    };
  };

setInterval(getEtData, 1000);

etPresence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon",
    details: etData.songTitle ?? "Not vibing 😒",
    state: etData.songTitle ? `Already got ${etData.totalBeats} beats in!` : "",
    startTimestamp: etData.songTitle ? etData.startedVibing : null,
    buttons: [
      {
        label: "Join on the vibes",
        url: etData.address
      }
    ]
  };

  etPresence.setActivity(presenceData);
});
