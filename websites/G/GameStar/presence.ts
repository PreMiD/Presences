const presence = new Presence({
    clientId: "640969147911503910"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement,
  title: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "star"
  };

  if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Betrachtet die Startseite";
  } else if (document.location.pathname.includes("/artikel/")) {
    presenceData.startTimestamp = browsingStamp;
    user = document.querySelector(
      "#content > div:nth-child(3) > div > div > div.col-xs-12.div-article-title > div:nth-child(6) > div:nth-child(1) > h1"
    );
    presenceData.details = "Liest Artikel:";
    presenceData.state = user.textContent;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/videos/")) {
    const video: HTMLVideoElement = document.querySelector(
      "#playerID > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ),
      timestamps = presence.getTimestampsfromMedia(video);

    title = document.querySelector(
      "#content > div:nth-child(3) > div > div > div > div:nth-child(3) > div > h1"
    ).textContent;
    if (!isNaN(video.duration)) {
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = timestamps.pop();

      [presenceData.details] = title.split("-");
      presenceData.state = title.replace(`${title.split("-")[0]}- `, "");

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (isNaN(video.duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Betrachtet:";
      presenceData.state = title;
    }
  }

  if (!presenceData.details) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Betrachtet Seite:";
    presenceData.state = document.querySelector("head > title").textContent;
    presence.setActivity(presenceData);
  } else presence.setActivity(presenceData);
});
