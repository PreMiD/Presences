const presence = new Presence({
    clientId: "719865208515854369"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    browsing: "presence.activity.browsing"
  });

let video = {
  current: 0,
  duration: 0,
  paused: true,
  isLive: false
};

presence.on(
  "iFrameData",
  (data: {
    current: number;
    duration: number;
    paused: boolean;
    isLive: boolean;
  }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const path = document.location.pathname;
  if (path === "/portal/search") {
    return presence.setActivity({
      details: "Searching for :",
      state: document.location.search.replace("?q=", ""),
      largeImageKey: "logo",
      smallImageKey: "search",
      smallImageText: "Searching..."
    });
  }

  if (path.includes("/portal/get_section")) {
    return presence.setActivity({
      details: "Browsing for :",
      state: document.querySelector(".default-title").textContent || "",
      largeImageKey: "logo"
    });
  }

  const presenceData: PresenceData = { largeImageKey: "logo" };
  if (isNaN(video.duration) || video.duration <= 0) {
    presenceData.details = "Browsing...";

    return presence.setActivity(presenceData);
  }

  const timestamps = presence.getTimestamps(
      Math.floor(video.current),
      Math.floor(video.duration)
    ),
    Info =
      document.querySelector(".default-title") ||
      document.querySelector(".live-text-text");
  let episode;

  if (Info.textContent.includes("ตอนที่")) {
    const info = Info.textContent.split("ตอนที่");
    episode = info.pop();

    episode = `ตอนที่ ${episode}`;
    presenceData.state = episode;
    [presenceData.details] = info;
  } else if (Info.textContent) presenceData.details = Info.textContent;

  presenceData.smallImageKey = video.paused
    ? "pause"
    : video.isLive
    ? "live"
    : "play";
  presenceData.smallImageText = video.paused
    ? (await strings).pause
    : video.isLive
    ? (await strings).live
    : (await strings).play;

  if (!video.paused && !video.isLive)
    [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
  else if (!video.paused && video.isLive)
    [presenceData.startTimestamp] = timestamps;
  else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  presence.setActivity(presenceData);
});
