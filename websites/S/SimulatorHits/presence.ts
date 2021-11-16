const presence = new Presence({
  clientId: "701623299460825108"
});

let title = "Loading SimulatorHits",
  artist = "",
  presenter = "AutoDJ";

function getSongData(): void {
  fetch("https://api.simulatorhits.dev/now-playing?override").then(
    (response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          ({ title, artist } = data.song);
          presenter = data.presenter.username;
        });
      }
    }
  );
}

setInterval(getSongData, 10000);
getSongData();

const currentTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageText: `Current Presenter: ${presenter}`,
    smallImageKey: "play",
    startTimestamp: currentTime
  };

  if (document.location.hostname === "simulatorhits.com") {
    if (document.location.pathname === "/schedule") {
      presenceData.details = "Viewing Schedule";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname === "/news") {
      presenceData.details = "Reading News";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname === "/about/meet-the-team") {
      presenceData.details = "Viewing Staff Team";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname === "/request") {
      presenceData.details = "Making a Request";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname === "/streamers") {
      presenceData.details = "Viewing Streamers";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = title;
      presenceData.state = artist;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
