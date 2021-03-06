const presence = new Presence({
    clientId: "767140375785111562"
  }),
  time = Math.floor(Date.now() / 1000);
let currentTime: number, duration: number, paused: boolean;
/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on(
  "iFrameData",
  (data: {
    iframevideo: boolean;
    currentTime: number;
    duration: number;
    paused: boolean;
  }) => {
    if (data.iframevideo == true) {
      currentTime = data.currentTime;
      duration = data.duration;
      paused = data.paused;
    }
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lolesports"
    },
    path = document.location.pathname;

  if (path == "/") {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = time;
  } else if (path.includes("/news")) {
    presenceData.details = "Viewing the latest news";
    presenceData.startTimestamp = time;
  } else if (path.includes("/schedule")) {
    presenceData.details = "Browsing the schedule";
    presenceData.startTimestamp = time;
  } else if (path.includes("/live/")) {
    presenceData.details = "Watching Live";
    presenceData.state = document
      .querySelector("div.teams")
      .textContent.replace("VS", " vs ");
    presenceData.startTimestamp = time;
    presenceData.smallImageKey = "live";
  } else if (path.includes("/article/")) {
    presenceData.details = "Reading news article:";
    presenceData.state = document.querySelector("div.title").textContent;
    presenceData.startTimestamp = time;
    presenceData.smallImageKey = "reading";
  } else if (path.includes("/vods/")) {
    presenceData.details = "VODS";
    presenceData.state = "Looking at past matches";
    presenceData.startTimestamp = time;
  } else if (path.includes("/vod/")) {
    const timestamps = getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    );
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];
    presenceData.smallImageKey = paused ? "pause" : "play";
    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presenceData.details = "Watching a replay";
    presenceData.state =
      document.querySelector("div.teams").textContent.replace("VS", " vs ") +
      " - Game " +
      document.querySelector(".game.selected").textContent;
  } else if (path.includes("/standings/")) {
    presenceData.details = "Looking at the standings";
    presenceData.startTimestamp = time;
  }
  presenceData.buttons = [
    {
      label: "Watch Broadcast",
      url: document.URL
    }
  ];
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
