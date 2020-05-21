const presence = new Presence({
  clientId: "704767276590694400"
});

let dSong, dArtist, dListeners, dStart, dFinish, dDJ;

function getSongData(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      dSong = data.now_playing.name;
      dArtist = data.now_playing.artist;
      dListeners = data.listeners;
      dStart = data.time.start;
      dFinish = data.time.finish;
      dDJ = data.dj.name;
    }
  };
  xhttp.open("GET", "https://panel.simulator.fm/api/v4/current-song", true);
  xhttp.withCredentials = true;
  xhttp.send();
}

setInterval(getSongData, 10000);
getSongData();

const currentTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "sfmlogo"
  };
  if (document.location.hostname == "simulator.fm") {
    if (document.location.pathname.includes("/home")) {
      presenceData.details = dSong + " - " + dArtist;
      presenceData.state = "DJ: " + dDJ;
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "play";
      presenceData.startTimestamp = dStart;
      presenceData.endTimestamp = dFinish;
    } else if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing the Staff Team";
      if (document.querySelector("ng-component > div > div > h2") !== null) {
        presenceData.state =
          "User: " +
          document.querySelector("ng-component > div > div > h2").textContent;
      }
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "search";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/request")) {
      presenceData.details = "Making a Request";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "writing";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/timetable")) {
      presenceData.details = "Viewing the Timetable";
      presenceData.state =
        "Date: " +
        document.querySelector(
          "div.p-timetable__day.p-timetable__day--selected"
        ).textContent;
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/apply")) {
      presenceData.details = "Applying for the Team";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/contact")) {
      presenceData.details = "Viewing the Contact Page";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else {
      presenceData.details = "Unknown Page";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    }
  } else if (document.location.hostname == "panel.simulator.fm") {
    if (document.location.pathname.includes("/dashboard")) {
      presenceData.details = "Staff Panel";
      presenceData.state = "Viewing Dashboard";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/timetable")) {
      presenceData.details = "Staff Panel";
      presenceData.state = "Viewing Timetable";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/requests")) {
      presenceData.details = "Staff Panel";
      presenceData.state = "Viewing Requests";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/admin/applications")) {
      presenceData.details = "Staff Panel";
      presenceData.state = "Viewing Applications";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else if (document.location.pathname.includes("/song-history")) {
      presenceData.details = "Staff Panel";
      presenceData.state = "Viewing Song History";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    } else {
      presenceData.details = "Staff Panel";
      presenceData.smallImageText = dListeners + " Listeners";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = currentTime;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
