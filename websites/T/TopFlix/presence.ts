const presence = new Presence({
    clientId: "684410680392286247"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const browsingStamp = Math.floor(Date.now() / 1000);

let iFrameVideo: boolean, currentTime: any, duration: any, playback: boolean;

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "topflix"
  };

  let title;

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/serie")) {
    title = document.querySelector(".bd-hd");

    if (title !== null) {
      const year = document.querySelector(".bd-hd > span");
      title = title.textContent.replace(year.textContent, "");

      const seasonList = document
        .querySelector(".tabs > ul > li.active")
        .textContent.includes("Temporadas");
      const season = document.querySelector(".accordion > li.open > div");

      if (seasonList && season !== null) {
        const sseason = season.textContent.replace("ª Temporada", "");
        if (document.querySelector("body > .modal.fade.in") !== null) {
          presenceData.details = title;
          presenceData.state = season.textContent;

          if (iFrameVideo == true && !isNaN(duration)) {
            const timestamps = getTimestamps(
              Math.floor(currentTime),
              Math.floor(duration)
            );
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = (await strings).play;
          } else {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (await strings).pause;
          }
        } else {
          presenceData.details = "Vendo temporada " + sseason + " da série:";
          presenceData.state = title;
        }
      } else {
        presenceData.details = "Vendo série:";
        presenceData.state = title;
      }
    } else {
      presenceData.details = "Navegando pelas séries...";
    }
  } else if (document.location.pathname.includes("/filme")) {
    title = document.querySelector(".bd-hd");
    if (title !== null) {
      const year = document.querySelector(".bd-hd > span");
      let rating = document.querySelector(".rate > p > span").textContent;
      rating = rating + "/10";
      title = title.textContent.replace(year.textContent, "");

      if (document.querySelector("body > .modal.fade.in") !== null) {
        presenceData.details = title;
        presenceData.state = year.textContent + " - " + rating;

        if (iFrameVideo == true && !isNaN(duration)) {
          const timestamps = getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
          );
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];
          presenceData.smallImageKey = "play";
          presenceData.smallImageText = (await strings).play;
        } else {
          presenceData.smallImageKey = "pause";
          presenceData.smallImageText = (await strings).pause;
        }
      } else {
        presenceData.details = "Vendo filme:";
        presenceData.state = title;
      }
    } else {
      presenceData.details = "Navegando pelos filmes...";
    }
  } else if (document.location.pathname.includes("/lancamentos")) {
    presenceData.details = "Navegando lançamentos...";
  } else if (document.location.pathname.includes("/app")) {
    presenceData.details = "Vendo os aplicativos";
  } else if (document.location.pathname.includes("/imdb")) {
    presenceData.details = "Navegando IMDb...";
  } else if (document.location.pathname == "/") {
    presenceData.details = "Navegando...";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
