const presence = new Presence({
  clientId: "648181559840735232"
});

let sartist: string,
  strack: string,
  slisteners: string,
  sduration: number,
  selapsed: number;

function newStats(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      slisteners = data.listeners.total;
      sduration = data.now_playing.duration;
      selapsed = data.now_playing.elapsed;
    }
  };
  xhttp.open("GET", "https://radio.flareradio.net/api/nowplaying/1", true);
  xhttp.send();
}

setInterval(newStats, 1000);
newStats();

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "flare"
    },
    timestamps = presence.getTimestamps(
      Math.floor(selapsed),
      Math.floor(sduration)
    );
  presenceData.smallImageKey = "play";
  presenceData.details = `${sartist} - ${strack}`;
  presenceData.state = `${slisteners} Listeners`;
  presenceData.smallImageText = "Playing";
  [, presenceData.endTimestamp] = timestamps;
  presence.setActivity(presenceData);
});
