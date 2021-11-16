const presence = new Presence({
    clientId: "883446187099840562"
  }),
  strings = presence.getStrings({
    play: "general.playing",
    pause: "general.paused",
    live: "general.live",
    search: "general.searchFor"
  }),
  startedTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "tv",
    startTimestamp: startedTime
  };
  if (document.location.href.includes("search")) {
    data.details = "Searching...";
    data.smallImageKey = "search";
    data.smallImageText = (await strings).search;
  } else if (document.location.href.includes("loginSplash"))
    data.details = "Viewing login page...";
  else if (document.location.href.includes("settings"))
    data.details = "Viewing settings...";
  else if (document.location.href.includes("channels"))
    data.details = "Browsing Channels...";
  else if (document.location.href.includes("privacy"))
    data.details = "Viewing privacy policy...";
  else if (document.location.href.includes("livetv/replaytv"))
    data.details = "Browsing Replay TV...";
  else if (document.location.href.includes("livetv/guide"))
    data.details = "Browsing Live TV Guide...";
  else if (document.location.href.includes("livetv"))
    data.details = "Browsing Live TV...";
  else if (document.location.href.includes("onDemand/FILMS"))
    data.details = "Browsing Films...";
  else if (document.location.href.includes("onDemand/SERIES"))
    data.details = "Browsing Series...";
  else if (document.location.href.includes("onDemand/MOVIES_CLUB"))
    data.details = "Browsing Movies Club...";
  else if (document.location.href.includes("onDemand/SPORTS"))
    data.details = "Browsing Sports...";
  else if (document.location.href.includes("onDemand/DOCUMENTARIES"))
    data.details = "Browsing Documentaries...";
  else if (document.location.href.includes("onDemand/KIDS"))
    data.details = "Browsing Kids content...";
  else if (document.location.href.includes("watchlist"))
    data.details = "Viewing watchlist...";
  else data.details = "Browsing...";

  const playerCheck = document.querySelector("div[ng-if='showPlayer']")
    ? true
    : false;

  if (playerCheck) {
    const title = document.querySelector(
        ".meta-title[ng-bind='details.title']"
      )?.textContent,
      video: HTMLVideoElement = document.querySelector("video#arxPlayer"),
      { paused, currentTime, duration } = video,
      timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      ),
      live = document.querySelector(".meta-remain") ? true : false;

    if (!live) {
      data.smallImageKey = paused ? "pause" : "play";
      data.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;

      data.endTimestamp = timestamps.pop();

      const series =
        document.querySelector("span[ng-bind='details.seriesSubs']").innerHTML
          .length > 0
          ? true
          : false;

      if (series) {
        data.details = document.querySelector(
          "span[ng-bind='details.seriesSubs']"
        ).textContent;
      } else data.details = title;
    } else {
      data.smallImageKey = paused ? "pause" : "live";
      data.smallImageText = paused
        ? (await strings).pause
        : (await strings).live;

      const watchTime = Math.floor(Date.now() / 1000);
      data.startTimestamp = watchTime;
      data.details = title;
    }

    const channel = document.querySelector(
      ".meta-title[ng-bind='details.channel.title']"
    )?.textContent;

    if (channel?.length !== 0) {
      if (!live) data.state = `Watching on ${channel}`;
      else data.state = `Live on ${channel}`;

      const hashCode = channel.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
      data.largeImageKey = hashCode.toString();
    }

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
      data.state = "Paused";
    }
  }
  presence.setActivity(data);
});
