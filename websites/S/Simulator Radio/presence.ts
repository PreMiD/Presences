const presence = new Presence({
  clientId: "651455140477272065"
});

let strack, sartist, slisteners, sDJ;

function newStats(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      strack = data.nowplaying.title;
      sartist = data.nowplaying.artists;
      slisteners = data.listeners;
      sDJ = data.dj.displayname;
    }
  };
  xhttp.open("GET", "https://api.simulatorradio.com/premid", true);
  xhttp.withCredentials = true;
  xhttp.send();
}

setInterval(newStats, 10000);
newStats();

var browsingStamp = Math.floor(Date.now() / 1000);
var lastTitle = "";
var lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", function () {
  const presenceData: presenceData = {
    largeImageKey: "srlogo"
  };

  if (document.querySelector(".fa.fa-play-circle") !== null) {
    presenceData.startTimestamp = browsingStamp;

    if (document.location.pathname.includes("/request")) {
      presenceData.details = "Requesting...";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/timetable")) {
      presenceData.details = "Viewing the Timetable for:";
      presenceData.state = document.querySelector("#timetable-day").textContent;
    } else if (document.location.pathname.includes("/home")) {
      presenceData.details = "Viewing the Homepage";
    } else if (document.location.pathname.includes("/articles")) {
      presenceData.details = "Browsing the Blog";
    } else if (document.location.pathname.includes("/post")) {
      presenceData.details = "Reading Blog Post:";
      presenceData.state = document.querySelector(".blog-title").textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing the Team";
    } else if (document.location.pathname.includes("/changelog")) {
      presenceData.details = "Reading the Changelog";
      presenceData.smallImageKey = "reading";
    }
  } else {
    presenceData.details = strack + " - " + sartist;
    presenceData.state = "Listening to " + sDJ;
    presenceData.smallImageText = "Listeners: " + slisteners;
    presenceData.smallImageKey = "play";

    if (lastTitle != strack) {
      lastTitle = strack;
      lastTimeStart = Math.floor(Date.now() / 1000);
    }

    presenceData.startTimestamp = lastTimeStart;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
