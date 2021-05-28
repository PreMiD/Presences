const presence = new Presence({
    clientId: "640266769218666502"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let title,
  iFrameVideo: boolean,
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
    iframeVideo: {
      iFrameVideo: boolean;
      currentTime: number;
      duration: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframeVideo.duration !== null ? true : false;

    if (playback)
      ({ iFrameVideo, currentTime, duration, paused } = data.iframeVideo);
  }
);

presence.on("UpdateData", async () => {
  const [, endTimestamp] = presence.getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    ),
    presenceData: PresenceData = {
      largeImageKey: "cc",
      startTimestamp: browsingStamp
    };

  if (document.location.pathname.includes("/watch/")) {
    if (iFrameVideo && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = endTimestamp;

      title = document.querySelector("#episode > div.h1 > h1");
      if (title.textContent.includes(" – ")) {
        const [splittedTitle] = title.textContent.split(" – ");
        presenceData.details = splittedTitle;
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
    } else if (iFrameVideo && isNaN(duration)) {
      presenceData.details = "Looking at: ";
      title = document.querySelector("#episode > div.h1 > h1");

      presenceData.state = title.textContent;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname === "/")
    presenceData.details = "Viewing main page";
  else if (document.location.pathname.includes("/cartoon-list"))
    presenceData.details = "Viewing cartoonlist";
  else if (document.location.pathname.includes("/anime-dubbed"))
    presenceData.details = "Viewing animelist";
  else if (document.URL.includes("?genre"))
    presenceData.details = "Viewing genres";
  else if (document.URL.includes("/cartoon/")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document
      .querySelector("#anime > div.h1")
      .textContent.replace("Online at cartooncrazy.tv", "")
      .replace("at wcartooncrazy.tv", "");
  } else if (document.URL.includes("/anime/")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document
      .querySelector("#anime > div.h1")
      .textContent.replace("Online at cartooncrazy.tv", "")
      .replace("at wcartooncrazy.tv", "");
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
