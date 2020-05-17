const presence = new Presence({
  clientId: "680160273474388014"
});

const browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners, sdj, play;

function newStats(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      sdj = data.live.is_live ? "DJ " + data.live.streamer_name : "AutoDJ";
      slisteners = " • " + data.listeners.unique;
    }
  };
  xhttp.open("GET", "https://radio.itspulse.net/api/nowplaying/1", true);
  xhttp.send();
}

setInterval(newStats, 6000);
newStats();

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (document.location.pathname.startsWith("/lite")) {
    play = document.querySelector(
      "body > div > div > div > div > div > div > i"
    );
    play = play.className;
    switch (play) {
      case "fa fa-play":
        // Music Paused
        presenceData.smallImageKey = "pause";
        presenceData.state = (strack || "Loading...") + (" - " + sartist);
        presenceData.details =
          (sdj || "Loading...") + (slisteners || "Loading...") + " Listeners";
        presenceData.smallImageText = "https://itspulse.net";
        break;
      case "fa fa-pause":
        // Music Playing
        presenceData.smallImageKey = "play";
        presenceData.state = (strack || "Loading...") + (" - " + sartist);
        presenceData.details =
          (sdj || "Loading...") + (slisteners || "Loading...") + " Listeners";
        presenceData.smallImageText = "https://itspulse.net";
    }
  }
  presence.setActivity(presenceData);
});
