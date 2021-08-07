const presence = new Presence({
    clientId: "872656825890254849"
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
  },
  Sub: string;
// Const thing
const browsingStamp = Math.floor(Date.now() / 1000),
  title =
    document.querySelector(".panel-heading")?.textContent ?? "ไม่ทราบชื่อ",
  titlemovie =
    document.querySelector(".panel-heading")?.textContent ??
    "ไม่ทราบชื่อเรื่อง",
  ep =
    document.querySelector(".panel-heading")?.textContent ?? "ไม่ทราบชื่อตอน",
  playvdo =
    document.querySelector(
      "body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3"
    )?.textContent ?? "ไม่ทราบชื่อเรื่อง",
  path = document.location;

presence.on(
  "iFrameData",
  (data: { current: number; duration: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("timestamps"),
    privacy = await presence.getSetting("privacy"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "site",
      startTimestamp: browsingStamp
    };

  // Presence
  if (document.location.pathname === "/")
    presenceData.state = "อนิเมะอัพเดตล่าสุด";
  else if (path.pathname.includes("index.html"))
    presenceData.state = "อนิเมะอัพเดตล่าสุด";
  else if (path.pathname.includes("genre")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "ประเภท ";
    presenceData.state = title;
  } else if (path.pathname.includes("catalog")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "หมวดหมู่ ";
    presenceData.state = title;
  } else if (path.search.includes("search")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "ค้นหา ";
    presenceData.state = title;
  } else if (path.pathname.includes("play")) {
    let episode, Movie;
    presenceData.startTimestamp = browsingStamp;
    const timestamps = presence.getTimestamps(
      Math.floor(video.current),
      Math.floor(video.duration)
    );
    if (playvdo.includes("ตอนที่")) {
      const info = playvdo.split("ตอนที่");
      episode = info.pop();

      if (episode.includes("ซับไทย"))
        episode = episode.replace((Sub = "ซับไทย"), "").trim();
      else if (episode.includes("พากย์ไทย"))
        episode = episode.replace((Sub = "พากย์ไทย"), "").trim();

      episode = `ตอนที่  ${episode} ${Sub}`;
      [presenceData.details] = info;
      presenceData.state = episode;
    } else if (
      titlemovie.includes(
        "The Movie" || "เดอะมูวี่" || "เดอะมูฟวี่" || "มูฟวี่"
      )
    ) {
      const info = titlemovie.split("The Movie" || "พากย์ไทย");
      Movie = info.pop();
      if (Movie.includes("ซับไทย"))
        Movie = Movie.replace((Sub = "ซับไทย"), "").trim();
      else if (Movie.includes("พากย์ไทย"))
        Movie = Movie.replace((Sub = "พากย์ไทย"), "").trim();

      Movie = `เดอะมูวี่ ${Movie} ${Sub}`;
      [presenceData.details] = info;
      presenceData.state = Movie;
    } else {
      let info;
      if (ep.includes("ซับไทย")) info = ep.replace("ซับไทย", "").trim();
      else if (ep.includes("พากย์ไทย"))
        info = ep.replace("พากย์ไทย", "").trim();

      episode = "กำลังดู";
      presenceData.details = info;
      presenceData.state = episode;
    }
    presenceData.smallImageKey = video.paused ? "pause" : "playing";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    if (!video.paused) [, presenceData.endTimestamp] = timestamps;
    if (buttons) {
      presenceData.buttons = [
        {
          label: "ดูอนิเมะ",
          url: document.location.href.replace(/#\d+/, "")
        }
      ];
    }
  } else if (path.href) {
    delete presenceData.startTimestamp;
    presenceData.details = ep;
    presenceData.state = "เลือกตอน ";
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (privacy) {
    delete presenceData.details;
    delete presenceData.buttons;
  }
  if (!presenceData.state) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
