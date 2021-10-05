const presence = new Presence({
    clientId: "684410680392286247"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  playback: boolean;

presence.on(
  "iFrameData",
  (data: {
    iframeVideo: {
      duration: number;
      iFrameVideo?: boolean;
      currentTime?: number;
    };
  }) => {
    playback = data.iframeVideo.duration ? true : false;

    if (playback) ({ iFrameVideo, currentTime, duration } = data.iframeVideo);
  }
);

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
          .textContent.includes("Temporadas"),
        season = document.querySelector(".accordion > li.open > div");

      if (seasonList && season !== null) {
        const sseason = season.textContent.replace("ª Temporada", "");
        if (document.querySelector("body > .modal.fade.in") !== null) {
          presenceData.details = title;
          presenceData.state = season.textContent;

          if (iFrameVideo === true && !isNaN(duration)) {
            const [startTimestamp, endTimestamp] = presence.getTimestamps(
              Math.floor(currentTime),
              Math.floor(duration)
            );
            presenceData.startTimestamp = startTimestamp;
            presenceData.endTimestamp = endTimestamp;
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = (await strings).play;
          } else {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (await strings).pause;
          }
        } else {
          presenceData.details = `Vendo temporada ${sseason} da série:`;
          presenceData.state = title;
        }
      } else {
        presenceData.details = "Vendo série:";
        presenceData.state = title;
      }
    } else presenceData.details = "Navegando pelas séries...";
  } else if (document.location.pathname.includes("/filme")) {
    title = document.querySelector(".bd-hd");
    if (title !== null) {
      const year = document.querySelector(".bd-hd > span");
      let rating = document.querySelector(".rate > p > span").textContent;
      rating = `${rating}/10`;
      title = title.textContent.replace(year.textContent, "");

      if (document.querySelector("body > .modal.fade.in") !== null) {
        presenceData.details = title;
        presenceData.state = `${year.textContent} - ${rating}`;

        if (iFrameVideo === true && !isNaN(duration)) {
          const [startTimestamp, endTimestamp] = presence.getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
          );
          presenceData.startTimestamp = startTimestamp;
          presenceData.endTimestamp = endTimestamp;
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
    } else presenceData.details = "Navegando pelos filmes...";
  } else if (document.location.pathname.includes("/lancamentos"))
    presenceData.details = "Navegando lançamentos...";
  else if (document.location.pathname.includes("/app"))
    presenceData.details = "Vendo os aplicativos";
  else if (document.location.pathname.includes("/imdb"))
    presenceData.details = "Navegando IMDb...";
  else if (document.location.pathname === "/")
    presenceData.details = "Navegando...";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
