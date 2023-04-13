const presence = new Presence({
  clientId: "611012705306017792"
});

const strings = await presence.getStrings({
  play: "general.playing",
  pause: "general.paused",
});

presence.on("UpdateData", async () => {
  if (
    location.pathname.startsWith("/animestore/sc_d_pc") &&
    document.querySelector("#dplayer_video_box video")
  ) {
    const video = document.querySelector("#dplayer_video_box video"),
          isPlaying = !video.paused,
          presenceData = {
            details: `${document.querySelector(".backInfoTxt1").textContent} - ${document.querySelector(".backInfoTxt2").textContent}`,
            state: document.querySelector(".backInfoTxt3").textContent,
            largeImageKey: "https://i.imgur.com/6sp3k8m.png",
            smallImageKey: isPlaying ? "play" : "pause",
            smallImageText: isPlaying ? (await strings).play : (await strings).pause,
            startTimestamp: isPlaying ? Math.floor(Date.now() / 1000) - Math.floor(video.currentTime) : undefined
          };
    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
  }
});
