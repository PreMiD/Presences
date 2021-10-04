const presence = new Presence({
    clientId: "640969147911503910"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "star"
  };

  if (document.location.hostname === "www.gamestar.de") {
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
      const video = document.querySelector(
        "#playerID > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      );
      (title = document.querySelector(
        "#content > div:nth-child(3) > div > div > div > div:nth-child(3) > div > h1"
      ).textContent),
        ({ currentTime, duration, paused } = video),
        (timestamps = presence.getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        ));
      if (!isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

        [presenceData.details] = title.split("-");
        presenceData.state = title.replace(`${title.split("-")[0]}- `, "");

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else if (isNaN(duration)) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Betrachtet:";
        presenceData.state = title;
      }
    }
  }

  if (!presenceData.details) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Betrachtet Seite:";
    presenceData.state = document.querySelector("head > title").textContent;
    presence.setActivity(presenceData);
  } else presence.setActivity(presenceData);
});
