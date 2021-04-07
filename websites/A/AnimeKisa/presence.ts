const presence = new Presence({
    clientId: "765545656579522572"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });
let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

presence.on(
  "iFrameData",
  (data: {
    video: boolean;
    duration: number;
    currentTime: number;
    paused: boolean;
  }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "akisa"
  };
  if (
    document.querySelector(".infoan2") !== null &&
    document.querySelector("#iframemain") !== null
  ) {
    // on page of a episode
    const timestamps = presence.getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    presenceData.details = document.querySelector(".infoan2").textContent;
    presenceData.state = document
      .querySelector("#main > div.now2 > div")
      .textContent.split(" - ")[1];

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (document.querySelector(".infodes") !== null) {
    presenceData.details = "Viewing show:";
    presenceData.state = document.querySelector(".infodes").textContent;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/categories/")) {
    presenceData.details = "Viewing category:";
    presenceData.state = document
      .querySelector(".lisbg")
      .textContent.split(": ")[1];
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/categories")) {
    presenceData.details = "Browsing through";
    presenceData.state = "the categories";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/search")) {
    presenceData.details = "Searching for some anime...";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname.includes("/popular")) {
    presenceData.details = "Browsing through";
    presenceData.state = "popular anime";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/movies")) {
    presenceData.details = "Browsing through";
    presenceData.state = "anime movies";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/alldubbed")) {
    presenceData.details = "Browsing through";
    presenceData.state = "dubbed anime";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/anime")) {
    presenceData.details = "Browsing through";
    presenceData.state = "anime archives";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/dubbed")) {
    presenceData.details = "Browsing through";
    presenceData.state = "dubbed anime";
    presenceData.smallImageKey = "reading";
  }

  if (presenceData.details == null) {
    presenceData.details = (await strings).browsing;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = (await strings).browsing;
    presence.setActivity(presenceData);
  } else {
    presence.setActivity(presenceData);
  }
});
