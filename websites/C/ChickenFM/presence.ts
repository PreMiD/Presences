const presence = new Presence({
  clientId: "614154889206956043"
});
const loadTimeStamp = Math.floor(Date.now() / 1000);
let trackTitle, trackArtist, stationName;

function getData(): void {
  const apiId = document.getElementById("premidstationname").innerHTML;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const api = JSON.parse(this.responseText);
      trackTitle = api.now_playing.song.title;
      trackArtist = api.now_playing.song.artist;
      stationName = api.station.name;
    }
  };
  xhttp.open(
    "GET",
    `https://radio.chickenfm.com/api/nowplaying/${apiId}`,
    true
  );
  xhttp.send();
}

setInterval(getData, 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "default"
  };
  presenceData.details = trackArtist + " - " + trackTitle;
  presenceData.state = stationName;
  presenceData.smallImageText = "Playing";
  presenceData.startTimestamp = loadTimeStamp;
  presence.setActivity(presenceData);
});
