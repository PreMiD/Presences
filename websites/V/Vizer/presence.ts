const presence = new Presence({
    clientId: "684199669424848970"
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

interface IFrameData {
  iframeVideo: {
    iFrameVideo: boolean;
    currTime: number;
    dur: number | null;
  };
}

presence.on("iFrameData", (data: IFrameData) => {
  playback = data.iframeVideo.dur !== null ? true : false;

  if (playback) {
    ({ iFrameVideo } = data.iframeVideo);
    currentTime = data.iframeVideo.currTime;
    duration = data.iframeVideo.dur;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "vizer_logo"
  };

  let title;

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/serie")) {
    title = document.querySelector("#lp > section > h2");

    if (title !== null) {
      const season = document.querySelector(
          "#seasons > div > div:nth-child(2) > div > div > .owl-item.active > .item.active"
        ),
        episodeNumber = document.querySelector(
          "#episodes > div > div > div > div > .owl-item.active > div > .poster.active > .title"
        ),
        episodeName = document.querySelector(
          "#episodes > div > div > div > div > .owl-item.active > div > .poster.active > .title"
        );

      if (season !== null) {
        if (episodeNumber !== null && episodeName !== null) {
          presenceData.details = title.textContent;
          presenceData.state = `S${season.textContent}E${
            episodeNumber.textContent.split(".")[0]
          } - ${episodeName.textContent.split(".")[1]}`;

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
          presenceData.details = `Vendo temporada ${season.textContent} da série:`;
          presenceData.state = title.textContent;
        }
      } else {
        presenceData.details = "Vendo série:";
        presenceData.state = title.textContent;
      }
    } else presenceData.details = "Navegando pelas séries...";
  } else if (document.location.pathname.includes("/filme")) {
    title = document.querySelector("#ms > div.wrap > section > h2");
    if (title !== null) {
      if (
        document.querySelector("#watchMovieButton > div.tit").textContent ===
        "audio"
      ) {
        const year = document.querySelector(".year").textContent,
          rating = document.querySelector(".rating").textContent;
        presenceData.details = title.textContent;
        presenceData.state = `${year} - ${rating}`;

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
        presenceData.state = title.textContent;
      }
    } else presenceData.details = "Navegando pelos filmes...";
  } else if (document.location.pathname.includes("/animes"))
    presenceData.details = "Navegando pelos animes...";
  else if (document.location.pathname.includes("/aplicativo"))
    presenceData.details = "Vendo os aplicativos";
  else if (document.location.pathname.includes("/pesquisar")) {
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).search;

    if (document.location.pathname.includes("/pesquisar/")) {
      presenceData.details = "Procurando por:";
      presenceData.state = document.location.pathname.replace(
        "/pesquisar/",
        ""
      );
    } else presenceData.details = "Procurando por algo...";
  } else if (document.location.pathname === "/")
    presenceData.details = "Navegando...";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
