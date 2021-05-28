const presence = new Presence({
    clientId: "641243628903333900"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ao",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/animes-dublado/")) {
    user = document.querySelector(
      "#wrapper > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div.panel.panel-primary > div.panel-heading > h1 > span"
    );
    presenceData.details = "Viewing anime dubbed:";
    presenceData.state = user.textContent;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/animes-dublado"))
    presenceData.details = "Browsing for anime dubbeds...";
  else if (document.location.pathname.includes("/anime/")) {
    user = document.querySelector(
      "#wrapper > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div.panel.panel-primary > div.panel-heading > h1 > span"
    );
    presenceData.details = "Viewing anime:";
    presenceData.state = user.textContent;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/anime"))
    presenceData.details = "Browsing for anime...";
  else if (document.location.pathname.includes("/genero"))
    presenceData.details = "Viewing a genre...";
  else if (document.location.pathname.includes("/videos/")) {
    const video = document.querySelector<HTMLVideoElement>(
        "#playersdbeta > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      ),
      title = document.querySelector(
        "#wrapper > div.container > div:nth-child(1) > div:nth-child(2) > h1"
      ).textContent,
      { currentTime, duration, paused } = video,
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    if (!isNaN(duration)) {
      const [splittedTitle] = title.split("-");
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = endTimestamp;
      presenceData.details = splittedTitle;
      presenceData.state = title.replace(`${splittedTitle} - `, "");

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (isNaN(duration)) {
      presenceData.details = "Looing at:";
      presenceData.state = title;
    }
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
