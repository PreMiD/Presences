const presence = new Presence({
  clientId: "701623299460825108"
});

let dSong: string, dArtist: string, dListeners: number, dDJ: string;

function getSongData(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      dSong = data.song.name;
      dArtist = data.song.artist;
      dListeners = data.listeners;
      dDJ = data.presenter.name;
    }
  };
  xhttp.open("GET", "https://api.simulatorhits.com/v1/now-playing", true);
  xhttp.withCredentials = true;
  xhttp.send();
}

setInterval(getSongData, 10000);
getSongData();

const currentTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  presenceData.smallImageText = dListeners + " Listeners";
  presenceData.startTimestamp = currentTime;

  if (document.location.hostname == "simulatorhits.com") {
    if (document.getElementById("artwork").classList.contains("rotateImg")) {
      presenceData.smallImageKey = "play";
    } else {
      presenceData.smallImageKey = "pause";
    }

    if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing the Staff Team";
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/profile")) {
      presenceData.details =
        document.getElementById("name").innerText + "'s Profile";
      presenceData.state = document.getElementById("position").innerText;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/timetable")) {
      presenceData.details = "Viewing Schedule";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/terms")) {
      presenceData.details = "Viewing Terms of Service";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = dSong + " - " + dArtist;
      presenceData.state = "Presenter: " + dDJ;
    }
  } else if (document.location.hostname == "panel.simulatorhits.com") {
    if (document.location.pathname.includes("/dashboard")) {
      presenceData.details = "Staff Dashboard";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/timetable")) {
      presenceData.details = "Staff Timetable";
      if (document.getElementById("book-modal").classList.contains("show")) {
        presenceData.state = "Booking a Slot";
      } else {
        presenceData.state = "Viewing";
      }
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/admin")) {
      presenceData.details = "Admin Area";
      presenceData.state = "Doing Secret Things";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = dSong + " - " + dArtist;
      presenceData.state = "Presenter: " + dDJ;
      presenceData.smallImageKey = "reading";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
