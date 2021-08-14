const presence = new Presence({
    clientId: "783068812635013180"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  getTimestamps = (videoTime: number, videoDuration: number): Array<number> => {
    const startTime = Date.now(),
      endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
  };

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    pathname: string = document.location.pathname.toLowerCase();

  if (pathname === "/") {
    data.details = "Przegląda:";
    data.state = "Stronę Główną";
    data.smallImageKey = "browsing";
  } else if (
    pathname.includes("/video") &&
    document.querySelector("#naglowek > span > span > h1")
  ) {
    const title = document.querySelector(
        "#naglowek > span > span > h1"
      ).textContent,
      ad = document.querySelector(
        "#player > div > div > div > div > div > div > span.pb-video-player-wrap > span.pb-video-ad-container"
      ),
      uploader = document.querySelector(
        "#leftCol > div:nth-child(2) > div.DescrVID > div.DescrVID-left > div > div > div > div:nth-child(1) > a > span > span"
      ).textContent;
    data.details = title;
    data.state = "Przesłał: " + uploader;
    if (
      window.getComputedStyle(ad, null).getPropertyValue("display") === "block"
    ) {
      data.details = "(Reklama) " + title;
      delete data.startTimestamp;
    } else {
      const video: HTMLVideoElement = document.querySelector("video"),
        timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
      data.smallImageKey = video.paused ? "paused" : "play";
      data.smallImageText = video.paused ? "Pauza" : "Odtwarzanie";
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }
    }
  } else if (pathname === "/video") {
    data.details = "Przegląda:";
    data.state = "Filmy";
    data.smallImageKey = "reading";
  } else if (pathname.includes("/gry-online")) {
    data.details = "Przegląda:";
    data.state = "Gry";
    data.smallImageKey = "reading";
  } else if (pathname.includes("/info")) {
    const searchData = pathname.split("/")[2];
    data.details = "Szuka:";
    data.state = searchData;
    data.smallImageKey = "search";
  } else if (pathname === "/premium") {
    data.details = "Przegląda:";
    data.state = "Filmy premium";
    data.smallImageKey = "reading";
  }

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
