const presence = new Presence({
  clientId: "883446187099840562"
}),
  strings = presence.getStrings({
    play: "general.playing",
    pause: "general.paused",
    live: "general.live",
    search: "general.searchFor"
  });

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "tv"
  };
  if (document.location.href.includes("search")) {
    data.details = "Searching..."
    data.smallImageKey = "search"
    data.smallImageText = await (await strings).search
  } else if (document.location.href.includes("loginSplash")) {
    data.details = "Viewing login page..."
  } else if (document.location.href.includes("settings")) {
    data.details = "Viewing settings..."
  } else if (document.location.href.includes("channels")) {
    data.details = "Browsing Channels..."
  } else if (document.location.href.includes("privacy")) {
    data.details = "Viewing privacy policy..."
  } else if (document.location.href.includes("livetv/replaytv")) {
    data.details = "Browsing Replay TV..."
  } else if (document.location.href.includes("livetv/guide")) {
    data.details = "Browsing Live TV Guide..."
  } else if (document.location.href.includes("livetv")) {
    data.details = "Browsing Live TV..."
  } else if (document.location.href.includes("onDemand/FILMS")) {
    data.details = "Browsing Films..."
  } else if (document.location.href.includes("onDemand/SERIES")) {
    data.details = "Browsing Series..."
  } else if (document.location.href.includes("onDemand/MOVIES_CLUB")) {
    data.details = "Browsing Movies Club..."
  } else if (document.location.href.includes("onDemand/SPORTS")) {
    data.details = "Browsing Sports..."
  } else if (document.location.href.includes("onDemand/DOCUMENTARIES")) {
    data.details = "Browsing Documentaries..."
  } else if (document.location.href.includes("onDemand/KIDS")) {
    data.details = "Browsing Kids content..."
  } else if (document.location.href.includes("watchlist")) {
    data.details = "Viewing watchlist..."
  } else {
    data.details = "Browsing..."
  }
  data.startTimestamp = Math.floor(Date.now() / 1000);

  const playerCheck = document.querySelector(
    "div[ng-if='showPlayer']"
  )
    ? true
    : false;

  if (playerCheck) {
    var channel = document
      .querySelector(
        ".meta-title[ng-bind='details.channel.title']"
      )
      ?.textContent;

    var title = document
      .querySelector(
        ".meta-title[ng-bind='details.title']"
      )
      ?.textContent;

    var video: HTMLVideoElement = document.querySelector("video#arxPlayer");

    var paused = video.paused
    var currentTime = video.currentTime;
    var duration = video.duration;
    var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));

    var live = document.querySelector(
      ".meta-remain"
    )
      ? true
      : false;

    if (live === false) {
      (data.smallImageKey = paused ? "pause" : "play"),
        (data.smallImageText = paused
          ? (await strings).pause
          : (await strings).play);

      (data.startTimestamp = timestamps[0]),
        (data.endTimestamp = timestamps[1]);

      var series = document.querySelector(
        "span[ng-bind='details.seriesSubs']"
      ).innerHTML.length > 0
        ? true
        : false;
    } else {
      (data.smallImageKey = paused ? "pause" : "live"),
        (data.smallImageText = paused
          ? (await strings).pause
          : (await strings).live);

      var watchTime = Math.floor(Date.now() / 1000);
      data.startTimestamp = watchTime;
    }

    if (channel !== '') {
      if (live === false) {
        data.state = 'Watching on ' + channel;
      } else {
        data.state = 'Live on ' + channel;
      }
      var hashCode = channel.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
      data.largeImageKey = hashCode.toString();
    }

    if (series === true) {
      data.details = document.querySelector(
        "span[ng-bind='details.seriesSubs']"
      ).textContent;
    } else {
      data.details = title;
    }

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
      data.state = 'Paused'
    }
  }
  if (data.details === null) {
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
