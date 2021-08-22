const presence = new Presence({
    clientId: "870850875562819595"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let video = {
    current: 0,
    duration: 0,
    paused: true
  },
  Sub: string;

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
    title =
      document.querySelector(
        "#contenedor > div.module > div.content > header > h1"
      )?.textContent ?? "ไม่ทราบชื่อ",
    titlemovies =
      document.querySelector(
        "#single > div.content > div.sheader > div.data > h1"
      )?.textContent ?? "ไม่ทราบชื่อ",
    playvdo =
      document.querySelector("#info > h1")?.textContent ?? "ไม่ทราบชื่อเรื่อง",
    ep =
      document.querySelector(
        "#single > div.content > div.sheader > div.data > h1"
      )?.textContent ?? "ไม่ทราบชื่อตอน",
    search =
      document.querySelector(".content.rigth.csearch > header > h1")
        ?.textContent ?? "ไม่พบสิ่งที่คุณกำลังค้นหา",
    path = document.location,
    presenceData: PresenceData = {
      largeImageKey: "site",
      startTimestamp: browsingStamp
    };

  // Presence
  if (path.search.includes("?s")) {
    const searchinfo = search.split("ผลการค้นหา:");
    presenceData.details = "กำลังค้นหา";
    presenceData.state = searchinfo.pop();
    presenceData.smallImageKey = "search";
  } else if (path.pathname === "/") presenceData.details = "อนิเมะอัพเดตล่าสุด";
  else if (path.pathname.includes("genre")) {
    presenceData.details = "ประเภท";
    presenceData.state = title;
  } else if (path.pathname.includes("catalog")) {
    presenceData.details = "หมวดหมู่";
    presenceData.state = title;
  } else if (path.pathname.includes("category")) {
    presenceData.details = "หมวดหมู่";
    presenceData.state = title;
  } else if (path.pathname.includes("tag")) {
    const titletag = title.split("รวมอนิเมะ");
    presenceData.details = "รวมอนิเมะ";
    presenceData.state = titletag.pop();
  } else if (path.pathname.includes("release")) {
    presenceData.details = "ปี";
    presenceData.state = title;
  } else if (path.pathname.includes("movies")) {
    presenceData.details = "เดอะมูฟวี่";
    presenceData.state = titlemovies;
    let movie;
    const timestamps = presence.getTimestamps(
      Math.floor(video.current),
      Math.floor(video.duration)
    );
    if (titlemovies.includes("มูฟวี่")) {
      const movieinfo = titlemovies.split(/(เดอะ)?(มูฟวี่)/);
      movie = movieinfo.pop();
      if (movie.includes("ซับไทย"))
        movie = movie.replace((Sub = "ซับไทย"), "").trim();
      else if (movie.includes("พากย์ไทย"))
        movie = movie.replace((Sub = "พากย์ไทย"), "").trim();
      movie = `เดอะมูฟวี่ ${movie} ${Sub}`;
      if (privacy) presenceData.details = movie;
      else if (!privacy) {
        presenceData.state = movie;
        [presenceData.details] = movieinfo;
      }
    }
    presenceData.smallImageKey = video.paused ? "pause" : "playing";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    if (!video.paused) [, presenceData.endTimestamp] = timestamps;
    if (buttons) {
      presenceData.buttons = [
        {
          label: "ดูเดอะมูฟวี่",
          url: document.location.href.replace(/#\d+/, "")
        }
      ];
    } else {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (path.pathname.includes("ep")) {
    let episode;
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
      episode = `ตอนที่ ${episode} ${Sub}`;
      if (privacy) presenceData.details = episode;
      else if (!privacy) {
        presenceData.state = episode;
        [presenceData.details] = info;
      }
    } else {
      let info;
      if (playvdo.includes("ซับไทย"))
        info = playvdo.replace("ซับไทย", "").trim();
      else if (playvdo.includes("พากย์ไทย"))
        info = playvdo.replace("พากย์ไทย", "").trim();
      episode = "กำลังดู";
      presenceData.state = info;
      presenceData.details = episode;
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
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "เลือกตอน";
    presenceData.state = ep;
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (privacy) {
    delete presenceData.state;
    delete presenceData.buttons;
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
