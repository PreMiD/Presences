const presence = new Presence({
    clientId: "709308577701036074"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  title = document.querySelector(
    "body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3"
  ),
  ep = document.querySelector(
    "body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-body > center:nth-child(2) > h3"
  ),
  title1 = title?.textContent ?? "ไม่ทราบชื่อ",
  ep1 = ep?.textContent ?? "ไม่ทราบชื่อตอน",
  path = document.location;

let video = {
  current: 0,
  duration: 0,
  paused: true
};

presence.on(
  "iFrameData",
  (data: { current: number; duration: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  // Presence
  if (path.hostname === "anime-sugoi.com" || path.hostname.includes("www.")) {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "อนิเมะอัพเดตล่าสุด";
    } else if (path.pathname.includes("index.html")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "อนิเมะอัพเดตล่าสุด";
    } else if (path.pathname.includes("catalog")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "หมวดหมู่ ";
      presenceData.state = title1;
    } else if (path.pathname.includes("tag")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "หมวดหมู่ ";
      presenceData.state = title1;
    } else if (path.search.includes("search")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "ค้นหา ";
      presenceData.state = title1;
    } else if (path.pathname.includes("play")) {
      let episode;
      const timestamps = presence.getTimestamps(
        Math.floor(video.current),
        Math.floor(video.duration)
      );
      if (title1.includes("ตอนที่")) {
        const info = title1.split("ตอนที่");
        episode = info.pop();

        if (episode.includes("ซับไทย"))
          episode = episode.replace("ซับไทย", "").trim();
        else if (episode.includes("พากย์ไทย"))
          episode = episode.replace("พากย์ไทย", "").trim();

        episode = `ตอนที่ ${episode}`;
        [presenceData.state] = info;
        presenceData.details = episode;
      } else {
        let info;
        if (title1.includes("ซับไทย"))
          info = title1.replace("ซับไทย", "").trim();
        else if (title1.includes("พากย์ไทย"))
          info = title1.replace("พากย์ไทย", "").trim();

        episode = "Movie";
        presenceData.state = info;
        presenceData.details = episode;
      }

      presenceData.smallImageKey = video.paused ? "pause" : "playing";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      if (!video.paused)
        [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
    } else if (path.href) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "เลือกตอน ";
      presenceData.state = ep1;
    } else {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
  //console.log(presenceData);
});
