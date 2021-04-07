const presence = new Presence({
    clientId: "658971769285115957"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "general.paused"
  }),
  startBrowsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;

  if (path == "/") {
    presenceData.startTimestamp = startBrowsingStamp;
    presenceData.details = `Смотрит домашнюю страницу`;
  } else if (path == "/anime") {
    presenceData.startTimestamp = startBrowsingStamp;
    presenceData.details = `Выбирает аниме`;
  } else if (path == "/manga") {
    presenceData.startTimestamp = startBrowsingStamp;
    presenceData.details = `Выбирает мангу`;
  } else {
    const mangaTitle = document.getElementById("the_manga_title");

    if (mangaTitle) {
      const nameArray = mangaTitle.childNodes[0].nodeValue
          .trim()
          .substring(0, mangaTitle.childNodes[0].nodeValue.trim().length - 1)
          .split(" "),
        chapter = nameArray[nameArray.indexOf("глава") - 1];
      presenceData.state = `${chapter} глава`;

      const mangaName = nameArray.splice(nameArray.indexOf("манги") + 1);
      presenceData.details = mangaName.join(" ");
    } else {
      const video = document.querySelector("#my-player_html5_api");

      if (video) {
        const timestamps = presence.getTimestampsfromMedia(
            video as HTMLMediaElement
          ),
          isVideoPlaying = (video: HTMLVideoElement) =>
            !!(
              video.currentTime > 0 &&
              !video.paused &&
              !video.ended &&
              video.readyState > 2
            );

        if (isVideoPlaying(video as HTMLVideoElement)) {
          presenceData.endTimestamp = Number.isNaN(timestamps[1])
            ? null
            : timestamps[1];
          presenceData.smallImageKey = "play";
          presenceData.smallImageText = (await strings).play;
        } else {
          delete presenceData.endTimestamp;
          presenceData.smallImageKey = "pause";
          presenceData.smallImageText = (await strings).pause;
        }
      }

      const name = document.querySelector('[itemprop="name"]');

      if (name) {
        const nameArray = name.textContent.trim().split(" ");
        nameArray.shift();

        const episode = nameArray[nameArray.indexOf("серия") - 1],
          season = nameArray[nameArray.indexOf("сезон") - 1];

        nameArray.splice(nameArray.indexOf("сезон") - 1, season ? 4 : 2);
        presenceData.details = nameArray.join(" ");

        if (episode)
          presenceData.state = `${
            season ? `${season} сезон ` : ""
          }${episode} серия`;
      }

      const namePreview = document.querySelector(
        ".header_video.allanimevideo.anime_padding_for_title"
      );

      if (namePreview) {
        const namePreviewArray = namePreview.textContent.trim().split(" ");
        namePreviewArray.shift();

        namePreviewArray.splice(namePreviewArray.indexOf("все"));
        presenceData.details = namePreviewArray.join(" ");
      }
    }
  }

  presence.setActivity(presenceData);
});
