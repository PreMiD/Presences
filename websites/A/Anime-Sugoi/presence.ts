const presence = new Presence({
    clientId: "709308577701036074"
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

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

// Const thing
const browsingStamp = Math.floor(Date.now() / 1000);
const title = document.querySelector(
  "body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3"
);
const ep = document.querySelector(
  "body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-body > center:nth-child(2) > h3"
);
const title1 = title?.textContent ?? "ไม่ทราบชื่อ";
const ep1 = ep?.textContent ?? "ไม่ทราบชื่อตอน";
const path = document.location;

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
  if (path.hostname == "anime-sugoi.com" || path.hostname.includes("www.")) {
    if (document.location.pathname == "/") {
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
      const timestamps = getTimestamps(
        Math.floor(video.current),
        Math.floor(video.duration)
      );
      if (title1.includes("ตอนที่")) {
        const info = title1.split("ตอนที่");
        episode = info.pop();

        if (episode.includes("ซับไทย")) {
          episode = episode.replace("ซับไทย", "").trim();
        } else if (episode.includes("พากย์ไทย")) {
          episode = episode.replace("พากย์ไทย", "").trim();
        }

        episode = "ตอนที่ " + episode;
        presenceData.state = info[0];
        presenceData.details = episode;
        presenceData.buttons = [
    {
            label: "รับชมตอนนี้",
            url: path.href
        },
        {
            label: "ดูตอนอื่นๆ",
            url: document.querySelector<HTMLAnchorElement>("h3 > a").href
        }
    ];
      } else {
        let info;
        if (title1.includes("ซับไทย")) {
          info = title1.replace("ซับไทย", "").trim();
        } else if (title1.includes("พากย์ไทย")) {
          info = title1.replace("พากย์ไทย", "").trim();
        }
        episode = "Movie";
        presenceData.state = info;
        presenceData.details = episode;
        presenceData.buttons = [
    {
            label: "รับชมเรื่องนี้",
            url: path.href
        }
    ];
      }

      presenceData.smallImageKey = video.paused ? "pause" : "playing";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      if (!video.paused) {
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
      }
    } else if (path.href) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังเลือกตอน ";
      presenceData.state = ep1;
      presenceData.buttons = [
    {
            label: "ดูเรื่องนี้",
            url: path.href
        }
    ];
    } else {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
    //console.log(presenceData);
  }
});
