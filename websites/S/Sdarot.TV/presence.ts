const presence = new Presence({
    clientId: "641969062083035146"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: string,
  title: string,
  currentTime: number,
  duration: number,
  paused: boolean,
  startTimestamp: number,
  endTimestamp: number;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "sdarot"
  };

  if (
    document.location.pathname === "/" ||
    document.location.pathname === "/index"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "צופה בדף הבית";
  } else if (document.location.pathname === "/series") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "צופה ברשימת הסדרות";
  } else if (document.location.pathname.includes("/watch/")) {
    let video = document.querySelector(
      "#playerDiv > div > video"
    ) as HTMLVideoElement;
    if (video === null) video = document.querySelector("#videojs_html5_api");

    title = document.querySelector(
      "#watchEpisode > div.poster > div > h1"
    ).textContent;
    user = document.querySelector("#player > div.head > p").textContent;
    if (user.includes(" - ")) [, user] = user.split(" - ");

    if (video !== null) {
      ({ currentTime, duration, paused } = video);
      [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    }

    if (!isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;

      presenceData.details = title;
      presenceData.state = user;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = ":צופה ב";
      presenceData.state = `${title} - ${user}`;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
