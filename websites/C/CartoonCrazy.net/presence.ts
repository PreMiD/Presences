const presence = new Presence({
    clientId: "640266769218666502"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let title,
  iFrameVideo: HTMLVideoElement,
  currentTime: number,
  duration: number,
  paused: boolean,
  lastPlaybackState = null,
  playback,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on(
  "iFrameData",
  (data: {
    iFrameVideo: {
      iFrameVideo: HTMLVideoElement;
      currTime: number;
      dur: number;
      paused: boolean;
    };
  }) => {
    playback = data.iFrameVideo.dur !== null ? true : false;

    if (playback) {
      ({ iFrameVideo, paused } = data.iFrameVideo);
      currentTime = data.iFrameVideo.currTime;
      duration = data.iFrameVideo.dur;
    }
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "cc"
  };

  if (document.location.pathname.includes("/watch/")) {
    if (iFrameVideo && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      ([presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(Math.floor(currentTime), Math.floor(duration))),
        (title = document.querySelector("#episode > div.h1 > h1"));
      if (title.textContent.includes(" – ")) {
        [presenceData.details] = title.textContent.split(" – ");
        presenceData.state = title.textContent
          .split(" – ")[1]
          .replace("Online at cartooncrazy.tv", "");
      } else {
        presenceData.details = title.textContent.replace(
          "Online at cartooncrazy.tv",
          ""
        );
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo === null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector("#episode > div.h1 > h1");

      presenceData.state = title.textContent;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/cartoon-list")) {
    presenceData.details = "Viewing cartoonlist";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/anime-dubbed")) {
    presenceData.details = "Viewing animelist";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("?genre")) {
    presenceData.details = "Viewing genres";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/cartoon/")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document
      .querySelector("#anime > div.h1")
      .textContent.replace("Online at cartooncrazy.tv", "")
      .replace("at wcartooncrazy.tv", "");
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/anime/")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document
      .querySelector("#anime > div.h1")
      .textContent.replace("Online at cartooncrazy.tv", "")
      .replace("at wcartooncrazy.tv", "");
    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
