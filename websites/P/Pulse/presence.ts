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
      strack = data.song.title;
      sartist = data.song.artist;
      sdj = data.dj.livedj;
      slisteners = " • " + data.listeners.current;
    }
  };
  xhttp.open("GET", "https://api.itspulse.net/stats", true);
  xhttp.send();
}

setInterval(newStats, 6000);
newStats();

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (document.location.pathname.startsWith("/")) {
    play = document.querySelector(
      "body > div > i"
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
