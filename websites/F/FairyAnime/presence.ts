const presence = new Presence({
    clientId: "724289548015763578"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

let video = {
  current: 0,
  duration: 0,
  paused: true
};

// Const thing
const browsingStamp = Math.floor(Date.now() / 1000),
  path = document.location;

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
  if (path.hostname === "fairyanime.com" || path.hostname.includes("www.")) {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = (await strings).browsing;
    } else if (path.pathname.includes("watch")) {
      const title =
        document.querySelector(
          "#section-opt > div > div > div > div > div.movie-heading.overflow-hidden > span"
        ).textContent ?? "ไม่ทราบเรื่อง";
      let episode;
      if (title.includes("ตอนที่")) {
        const info = title.split("ตอนที่");
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
        if (title.includes("ซับไทย")) info = title.replace("ซับไทย", "").trim();
        else if (title.includes("พากย์ไทย"))
          info = title.replace("พากย์ไทย", "").trim();

        episode = "Movie";
        presenceData.state = info;
        presenceData.details = episode;
      }

      presenceData.smallImageKey = video.paused ? "pause" : "playing";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      if (!video.paused) {
        [presenceData.startTimestamp, presenceData.endTimestamp] =
          presence.getTimestamps(
            Math.floor(video.current),
            Math.floor(video.duration)
          );
      } else {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      const ep = document.querySelector(
          "#section-opt > div > div > div > div > div.movie-heading.overflow-hidden > span"
        ),
        rate = document.querySelector("#home > p > span");
      if (!rate || !ep) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = (await strings).browsing;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "เลือกตอน ";
        presenceData.state = `${rate.textContent}⭐ -${ep.textContent
          .replace("ตอนของ", " ")
          .replace('"', " ")
          .replace('"', " ")}`;
      }
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
