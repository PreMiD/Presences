const presence: Presence = new Presence({
    clientId: "613510331066482699"
  }),
  startedBrowsing: number = Math.floor(Date.now() / 1000),
  path: string = window.location.pathname,
  strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    playing: "presence.playback.playing",
    paused: "presence.playback.paused"
  }),
  presenceData: PresenceData = {
    largeImageKey: "yay_lg",
    startTimestamp: startedBrowsing
  };
let playback: boolean,
  video: HTMLVideoElement,
  currentTime: number,
  duration: number,
  videoTitle: string,
  episode: string,
  paused: boolean;

presence.on("UpdateData", async () => {
  playback =
    document.querySelector("div#p1 > div > div > div > div > video") ||
    document.querySelector("div#p2 > video")
      ? true
      : false;
  if (playback) {
    video = document.querySelector("div#p2 > video");
    video =
      video.currentTime !== 0
        ? video
        : document.querySelector("div#p1 > div > div > div > div > video");
  }
  if (playback && Math.floor(video.currentTime) !== 0) {
    duration = Math.floor(document.querySelector("video").duration);
    videoTitle = document
      .querySelector(".color-change")
      .textContent.split("–")[0]
      .trim();
    episode = document
      .querySelector(".color-change")
      .textContent.split("–")[1]
      .trim();
    ({ paused } = video);
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).paused
      : (await strings).playing;
    if (!paused) {
      currentTime = Math.floor(document.querySelector("video").currentTime);
      const [startTimestamp, endTimestamp] = presence.getTimestamps(
        currentTime,
        duration
      );
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;
    } else {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presenceData.details = videoTitle;
    presenceData.state = episode;
  } else if (path.includes("lista-de-animes"))
    presenceData.details = "Procurando um anime";
  else if (
    document.querySelector(
      "#content > div.contentBox > div > h1 > div > b > p > span"
    )
  ) {
    presenceData.details = `Olhando o anime ${
      document.querySelector(
        "#content > div.contentBox > div > h1 > div > b > p > span"
      ).textContent
    }`;
  } else if (path.includes("pedidos"))
    presenceData.details = "Pedindo um anime";
  else if (path.includes("calendario"))
    presenceData.details = "Vendo o calendário de animes";
  else if (path.includes("noticia")) presenceData.details = "Lendo notícias";
  else if (path.includes("perfil")) {
    presenceData.details = `Vendo o perfil de ${
      document.querySelector("div.um-name > a").textContent
    }`;
  } else presenceData.details = (await strings).browsing;

  presence.setActivity(presenceData, true);
});
