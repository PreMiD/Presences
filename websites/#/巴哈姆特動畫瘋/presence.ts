const presence = new Presence({
    clientId: "640194732718292992"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ani",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.querySelector("#ani_video_html5_api") !== null) {
    const video = document.querySelector<HTMLVideoElement>(
        "#ani_video_html5_api"
      ),
      videoDuration = video.duration,
      videoCurrentTime = video.currentTime,
      { paused } = video,
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(videoCurrentTime),
        Math.floor(videoDuration)
      );
    if (!isNaN(videoDuration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = endTimestamp;

      title = document.querySelector(
        "#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1"
      );
      presenceData.details = title.innerText;

      user = document.querySelector(
        "#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > div > p"
      );

      if (user !== null) presenceData.state = user.innerText;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (isNaN(videoDuration)) {
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1"
      );
      presenceData.state = title.innerText;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname.includes("/animeList"))
    presenceData.details = "Viewing all animes";

  if (presenceData.details === null) {
    presenceData.details = "Viewing page:";
    presenceData.state = document
      .querySelector("head > title")
      .textContent.replace(" - 巴哈姆特動畫瘋", "");
    presence.setActivity(presenceData);
  } else presence.setActivity(presenceData);
});
