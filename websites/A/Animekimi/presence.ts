const presence = new Presence({
    clientId: "870850875562819595"
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
  title =
    document.querySelector(
      "#contenedor > div.module > div.content > header > h1"
    )?.textContent ?? "ไม่ทราบชื่อ",
  titlemovies =
    document.querySelector(
      "#single > div.content > div.sheader > div.data > h1"
    )?.textContent ?? "ไม่ทราบชื่อ",
  playvdo = document.querySelector("#info > h1")?.textContent ?? "ไม่ทราบชื่อ",
  ep =
    document.querySelector(
      "#single > div.content > div.sheader > div.data > h1"
    )?.textContent ?? "ไม่ทราบชื่อตอน",
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
    presenceData.details = "อนิเมะอัพเดตล่าสุด";
  else if (path.pathname.includes("genre")) {
    presenceData.details = "ประเภท ";
    presenceData.state = title;
  } else if (path.pathname.includes("catalog")) {
    presenceData.details = "หมวดหมู่ ";
    presenceData.state = title;
  } else if (path.pathname.includes("category")) {
    presenceData.details = "หมวดหมู่ ";
    presenceData.state = title;
  } else if (path.pathname.includes("title")) {
    presenceData.details = "หมวดหมู่ ";
    presenceData.state = title;
  } else if (path.pathname.includes("tag")) {
    presenceData.details = "หมวดหมู่ ";
    presenceData.state = playvdo;
  } else if (path.pathname.includes("release")) {
    presenceData.details = "ปี ";
    presenceData.state = title;
  } else if (path.search.includes("search")) {
    presenceData.details = "ค้นหา ";
    presenceData.state = playvdo;
  } else if (path.pathname.includes("movies")) {
    presenceData.details = "เดอะมูฟวี่ ";
    presenceData.state = titlemovies;
    let moive;
    const timestamps = presence.getTimestamps(
      Math.floor(video.current),
      Math.floor(video.duration)
    );
    if (titlemovies.includes("เดอะมูฟวี่")) {
      const moiveinfo = titlemovies.split("เดอะมูฟวี่");
      moive = moiveinfo.pop();

      if (moive.includes("ซับไทย"))
        moive = moive.replace("เดอะมูฟวี่ ซับไทย", "").trim();
      else if (moive.includes("พากย์ไทย"))
        moive = moive.replace("เดอะมูฟวี่ พากย์ไทย", "").trim();

      moive = `เดอะมูฟวี่ ${moive}`;
      presenceData.details = moive;
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
        episode = episode.replace("ซับไทย", "").trim();
      else if (episode.includes("พากย์ไทย"))
        episode = episode.replace("พากย์ไทย", "").trim();

      episode = `ตอนที่ ${episode}`;
      [presenceData.state] = info;
      presenceData.details = episode;
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
    presenceData.details = "เลือกตอน ";
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
