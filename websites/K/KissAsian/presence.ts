const presence = new Presence({
    clientId: "641402862961950733"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", (data: { iframeVideo: HTMLVideoElement }) => {
  video = data.iframeVideo;
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ka",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/Drama/")) {
    const dramaTitle = document.querySelector(".barContent > div > .bigChar"),
      videoTitle = document.querySelector(".heading > h3"),
      selectEpisode = document.querySelector("#selectEpisode > [selected]");
    if (dramaTitle) {
      presenceData.details = "Viewing drama:";
      presenceData.state = dramaTitle.textContent;
      presenceData.smallImageKey = "reading";
    } else if (!isNaN(video?.duration) && (videoTitle || selectEpisode)) {
      delete presenceData.startTimestamp;
      if (videoTitle) {
        [presenceData.details, presenceData.state] =
          videoTitle.textContent.split(" » ");
      } else {
        presenceData.details = document
          .querySelector("#navsubbar > p > a")
          .textContent.split("\n")[2]
          .trim();
        presenceData.state = selectEpisode.textContent.trim();
      }
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      [, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
      if (video.paused) delete presenceData.endTimestamp;
    }
  } else if (document.location.pathname.includes("/DramaList")) {
    presenceData.details = "Viewing drama list";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("AreYouHuman"))
    presenceData.details = "Completing a captcha...";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
