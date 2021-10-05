const presence = new Presence({
    clientId: "642111645774118944"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement | Element | string, title: HTMLElement | Element | string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "vg"
  };

  if (document.location.hostname === "vuighe.net") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Đang xem trang chủ";
    } else if (
      document.querySelector("#player > video.player-video") !== null
    ) {
      let currentTime: number,
        duration: number,
        paused: boolean,
        timestamps: number[],
        video: HTMLVideoElement;
      video = document.querySelector("#player > video.player-video");
      if (video === null)
        video = document.querySelector("#centerDivVideo > div > div > video");

      title = document.querySelector(
        "body > div.container > div.film-info > h1"
      ).textContent;
      user = document.querySelector(
        "body > div.container > div.film-info > div.film-info-views"
      ).textContent;

      if (video !== null) {
        ({ currentTime, duration, paused } = video);
        timestamps = presence.getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
      }
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

        presenceData.details = title;
        presenceData.state = user;

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Đang xem:";
        presenceData.state = title;
      }
    } else if (document.location.pathname.includes("/anime")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Đang xem:";
      presenceData.state = `Anime - ${
        document.querySelector(
          "body > div.container > div.genre > a.genre-item.activated"
        ).textContent
      }`;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/bang-xep-hang")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Đang xem:";
      presenceData.state = "Bảng xếp hạng anime";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/tim-kiem")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "search";
      [presenceData.details, presenceData.state] = document
        .querySelector("body > div.container > section > div.tray-title")
        .textContent.split(": ");
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
