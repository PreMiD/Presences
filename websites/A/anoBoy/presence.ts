const presence = new Presence({
    clientId: "860591302092521533"
  }),
  strings = presence.getStrings({
    play: "general.playing",
    pause: "general.paused",
    viewHome: "general.viewHome",
  });

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(".video-js"),
    browsingStamp = Math.floor(Date.now() / 1000),
    presenceData: PresenceData = {
      largeImageKey: "logo",
    };

  if (video !== null && !isNaN(video.duration)) {
    const [, endTimestamp] = presence.getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    presenceData.details = "Watching :";
    presenceData.state = document
      .querySelector(".pagetitle > h1")
      .textContent.replace(/Subtitle Indonesia/gi, "");
    presenceData.smallImageKey = video.paused
      ? "pause"
      : "play",
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play,
    presenceData.endTimestamp = endTimestamp;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (document.URL === "https://anoboy.media/") {
    presenceData.details = (await strings).viewHome;
    presenceData.startTimestamp = browsingStamp;
  } else {
    presenceData.details = `Viewing ${document
      .querySelector(".pagetitle > h1")
      .textContent.replace(/Subtitle Indonesia/gi, "")}`;
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
