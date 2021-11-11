const presence = new Presence({
    clientId: "783068812635013180"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
  getTimestamps = (videoTime: number, videoDuration: number): number[] => {
    const startTime = Date.now();
    return [
      Math.floor(startTime / 1000),
      Math.floor(startTime / 1000) - videoTime + videoDuration
    ];
  };

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    pathname: string = document.location.pathname.toLowerCase();

  if (pathname === "/") {
    presenceData.details = "Przegląda:";
    data.state = "Stronę Główną";
    data.smallImageKey = "browsing";
  } else if (
    pathname.includes("/video") &&
    document.querySelector("#naglowek > span > span > h1")
  ) {
    const title = document.querySelector(
      "#naglowek > span > span > h1"
    ).textContent;

    presenceData.details = title;
    data.state = `Przesłał: ${
      document.querySelector(
        "#leftCol > div:nth-child(2) > div.DescrVID > div.DescrVID-left > div > div > div > div:nth-child(1) > a > span > span"
      ).textContent
    }`;
    if (
      window
        .getComputedStyle(
          document.querySelector(
            "#player > div > div > div > div > div > div > span.pb-video-player-wrap > span.pb-video-ad-container"
          ),
          null
        )
        .getPropertyValue("display") === "block"
    ) {
      presenceData.details = `(Reklama) ${title}`;
      delete data.startTimestamp;
    } else {
      const video: HTMLVideoElement = document.querySelector("video");
      [data.startTimestamp, data.endTimestamp] = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      data.smallImageKey = video.paused ? "paused" : "play";
      data.smallImageText = video.paused ? "Pauza" : "Odtwarzanie";
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }
    }
  } else if (pathname === "/video") {
    presenceData.details = "Przegląda:";
    data.state = "Filmy";
    data.smallImageKey = "reading";
  } else if (pathname.includes("/gry-online")) {
    presenceData.details = "Przegląda:";
    data.state = "Gry";
    data.smallImageKey = "reading";
  } else if (pathname.includes("/info")) {
    const [, , searchData] = pathname.split("/");
    presenceData.details = "Szuka:";
    data.state = searchData;
    data.smallImageKey = "search";
  } else if (pathname === "/premium") {
    presenceData.details = "Przegląda:";
    data.state = "Filmy premium";
    data.smallImageKey = "reading";
  }

  if (!presenceData.details) {
    presence.setActivity();
  } else presence.setActivity(data);
});
