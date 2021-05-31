const presence = new Presence({
  clientId: "691491207356088320"
});

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let currentTime, duration, paused;

presence.on("iFrameData", (data) => {
  const playback = data.duration !== null ? true : false;
  if (playback) {
    currentTime = data.currentTime;
    duration = data.duration;
    paused = data.paused;
  }
});

presence.on("UpdateData", () => {
  const timestamps = getTimestamps(
    Math.floor(currentTime),
    Math.floor(duration)
  );

  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.URL === "https://www.threenow.co.nz/") {
    presenceData.details = "Browsing the main page";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.pathname.includes("/shows/")) {
    if (
      document.getElementsByClassName("EpisodeSynopsis-subtitle").length >= 1
    ) {
      if (!isNaN(timestamps[1])) {
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
      }

      presenceData.state = document.getElementsByClassName(
        "EpisodeSynopsis-title"
      )[0].textContent;

      if (paused) {
        presenceData.details = "Watching a show";
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
        presenceData.smallImageKey = "pause";
      } else {
        presenceData.details = "Watching a show";
        presenceData.smallImageKey = "play";
      }
    } else {
      presenceData.details = "Viewing a show";
      presenceData.state =
        document.getElementsByClassName("HeroSynopsis-title")[0].textContent;
    }
  } else if (document.location.pathname.includes("/search")) {
    presenceData.details = "Searching shows";
    presenceData.state = (
      document.getElementsByClassName(
        "SearchInput-input"
      )[0] as HTMLInputElement
    ).value;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.URL === "https://www.threenow.co.nz/live-tv-guide") {
    presenceData.details = "Viewing the Live TV guide";
  } else if (
    document.URL === "https://www.threenow.co.nz/live-tv-guide/three"
  ) {
    presenceData.details = "Watching Three Live";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (
    document.URL === "https://www.threenow.co.nz/live-tv-guide/three-life"
  ) {
    presenceData.details = "Watching ThreeLife Live";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (
    document.URL === "https://www.threenow.co.nz/live-tv-guide/bravo"
  ) {
    presenceData.details = "Watching Bravo Live";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (
    document.URL === "https://www.threenow.co.nz/live-tv-guide/bravo"
  ) {
    presenceData.details = "Watching The Edge TV Live";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (
    document.location.pathname.includes("/tv") &&
    document.location.pathname.includes(".html")
  ) {
    presenceData.details = "ThreeFans";
    presenceData.state = "Checking out information for fans!";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
