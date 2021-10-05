const presence = new Presence({
    clientId: "614388233886760972"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let browsingStamp = Math.floor(Date.now() / 1000),
  iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  lastPlaybackState: boolean,
  playback: boolean;

interface IFrameData {
  iframeVideo: {
    dur: number;
    iFrameVideo: boolean;
    paused: boolean;
    currTime: number;
  };
}

if (document.location.pathname.includes(".html")) {
  presence.on("iFrameData", (data: IFrameData) => {
    playback = data.iframeVideo.dur !== null ? true : false;
    if (playback) {
      ({ iFrameVideo, paused } = data.iframeVideo);
      currentTime = data.iframeVideo.currTime;
      duration = data.iframeVideo.dur;
    }
  });
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ksow123stack"
  };

  presenceData.startTimestamp = browsingStamp;

  if (lastPlaybackState !== playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (
    document.location.pathname.includes(".html") &&
    document.location.pathname.includes("/pages/")
  ) {
    presenceData.details = "Reading the FAQs";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes(".html")) {
    if (iFrameVideo === true && !isNaN(duration)) {
      const timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );

      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

      const title = document.querySelector(
          "#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
        ),
        views = document.querySelector(
          "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)"
        );
      presenceData.details = title.textContent;

      const air = document.querySelector(
          "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)"
        ),
        air2 = document.querySelector(
          "#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)"
        );

      if (air !== null && air.textContent.includes("Air on:")) {
        presenceData.state = `${views.textContent.replace(
          "Status: ",
          ""
        )}, ${air.textContent.replace("Air", "Aired")}`;
      } else if (air2 !== null && air2.textContent.includes("Air on:")) {
        presenceData.state = `${views.textContent.replace(
          "Status: ",
          ""
        )}, ${air2.textContent.replace("Air", "Aired")}`;
      } else presenceData.state = views.textContent;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo === null && isNaN(duration)) {
      const title = document.querySelector(
        "#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
      );
      presenceData.details = "Looking at: ";
      presenceData.state = title.textContent;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the main page";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/show/latest/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the latest shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/show/popular/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the most popular shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/show/rated/") {
    presenceData.details = "Browsing through";
    presenceData.state = "the highest rated shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname === "/show/") {
    presenceData.details = "Browsing through";
    presenceData.state = "a list of all shows";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/show/")) {
    const views = document.querySelector("#info > div.media > div > h1 > a");

    presenceData.details = "Browsing through all episodes of:";
    presenceData.state = views.textContent;
    presenceData.smallImageKey = "reading";

    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search/")) {
    const views = document.querySelector("#featured > div.page-header > h3");

    presenceData.details = "Searching for:";
    presenceData.state = views.textContent;
    presenceData.smallImageKey = "search";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
