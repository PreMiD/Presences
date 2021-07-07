const presence = new Presence({
  clientId: "813680039354826784"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "malltvlogo"
    },
    strings = await presence.getStrings({
      browsing: "general.browsing",
      playing: "general.playing",
      paused: "general.paused",
      live: "general.live",
      homepage: "general.viewHome",
      watchVideo: "general.buttonWatchVideo",
      watchStream: "general.buttonWatchStream",
      viewChannel: "general.buttonViewChannel"
    }),
    path: string = document.location.pathname.toLowerCase(),
    channel: HTMLHeadingElement = document.querySelector("h1.text-ellipsis"),
    videoElement: HTMLVideoElement =
      document.querySelector("#vp-player > video"),
    videoTitle: HTMLHeadingElement = document.querySelector(
      "h1.video__info-title"
    ),
    videoChannel: HTMLAnchorElement = document.querySelector(
      "a.influencer__info-link"
    );
  if (path === "/") {
    presenceData.details = strings.homepage;
    presenceData.state = strings.browsing;
    presenceData.smallImageKey = "malltvbrowsing";
  } else if (channel !== null) {
    presenceData.details = channel.textContent;
    presenceData.state = strings.browsing;
    presenceData.smallImageKey = "malltvbrowsing";
  } else if (videoTitle !== null && videoChannel !== null) {
    const videoTimestamp: number[] =
        presence.getTimestampsfromMedia(videoElement),
      videoLive: HTMLButtonElement = document.querySelector("button.vp-live");
    presenceData.details = videoTitle.textContent;
    presenceData.state = videoChannel.textContent;
    presenceData.buttons = [
      {
        label:
          videoLive.style.display === "none"
            ? strings.watchVideo
            : strings.watchStream,
        url: document.URL.split("?")[0]
      },
      {
        label: strings.viewChannel,
        url: videoChannel.href
      }
    ];
    if (videoLive.style.display !== "none") {
      presenceData.smallImageKey = "malltvlive";
      presenceData.smallImageText = strings.live;
    } else if (!videoElement.paused) {
      presenceData.startTimestamp = videoTimestamp[0];
      presenceData.endTimestamp = videoTimestamp[1];
      presenceData.smallImageKey = "malltvplaying";
      presenceData.smallImageText = strings.playing;
    } else {
      presenceData.smallImageKey = "malltvpaused";
      presenceData.smallImageText = strings.paused;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
