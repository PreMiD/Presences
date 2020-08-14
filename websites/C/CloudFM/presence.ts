const presence = new Presence({
  clientId: "743793403753660426"
});

const browsingStamp = Math.floor(Date.now() / 1000);

let title, artist, dj, playbackStatus: string;

function getStatus(): string {
  const playPauseBtn = document.querySelector("#play");
  if (playPauseBtn.className === "fas fa-play fa-lg") {
    return "Paused";
  } else if (playPauseBtn.className === "fas fa-pause fa-lg") {
    return "Playing";
  }
  return "Playing";
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (
    document.location.hostname === "www.cloudfm.xyz" ||
    document.location.hostname === "cloudfm.xyz"
  ) {
    presenceData.startTimestamp = browsingStamp;
    title = document.querySelector("#title").textContent;
    artist = document.querySelector("#artist").textContent;
    dj = document.querySelector("#dj").textContent;
    playbackStatus = getStatus();
    if (playbackStatus === "Paused") {
      presenceData.smallImageKey = "pause";
    } else if (playbackStatus === "Playing") {
      presenceData.smallImageKey = "play";
    }

    presenceData.details = `🎵 | ${artist} - ${title}`;
    presenceData.state = `🎙️ | ${dj}`;
    presenceData.smallImageText = playbackStatus;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
