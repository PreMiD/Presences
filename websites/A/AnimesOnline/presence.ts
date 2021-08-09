const presence = new Presence({
    clientId: "874161536074145833"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

let video = {
  current: 0,
  duration: 0,
  paused: true
};

const browsingStamp = Math.floor(Date.now() / 1000),
  title =
    document.querySelector("div.data > h1")?.textContent ?? "desconhecido",
  titlemovie = document.querySelector("#info > h2")?.textContent,
  Search =
    document.querySelector(
      "#contenedor > div.module > div.content.rigth.csearch > header > h1"
    )?.textContent ?? "pesquisa não encontrada",
  playfilmes =
    document.querySelector(
      "#single > div.content.right > div.sheader > div.data > h1"
    )?.textContent ?? "desconhecido",
  playvdo = document.querySelector("#info > h1")?.textContent ?? "desconhecido",
  path = document.location;

presence.on(
  "iFrameData",
  (data: { current: number; duration: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("timestamps"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "site",
      startTimestamp: browsingStamp
    };

  // Presence
  if (document.location.pathname === "/") presenceData.details = "Vendo página";
  presenceData.state = "em Página Inicial";
  if (path.search.includes("s")) {
    presenceData.details = "Pesquisando po";
    presenceData.state = `${Search}`;
    presenceData.smallImageKey = "search";
  } else if (path.pathname.includes("legendados")) {
    presenceData.details = "Vendo Legendados";
    presenceData.state = "Lista de Animes Legendados";
  } else if (path.pathname.includes("dublados")) {
    presenceData.details = "Vendo dublados";
    presenceData.state = "Lista de Animes Dublados";
  } else if (path.pathname.includes("donghua")) {
    presenceData.details = "Vendo Chineses";
    presenceData.state = "Lista de Animes Chineses";
  } else if (path.pathname.includes("pedidos")) {
    presenceData.details = "Vendo página";
    presenceData.state = "Pedidos de Animes";
  } else if (path.pathname.includes("calendario")) {
    presenceData.details = "Vendo calendario";
    presenceData.state = "Calendário de Animes";
  } else if (path.pathname.includes("generos")) {
    presenceData.details = "Vendo Gêneros";
    presenceData.state =
      document.querySelector("header > h1")?.textContent ?? "desconhecido";
  } else if (path.pathname.includes("animes")) {
    presenceData.details = title;
    presenceData.state = "Selecionando um episódio";
  } else if (
    path.pathname.includes("episodio") ||
    path.pathname.includes("filmes/")
  ) {
    let episode, filmes;
    presenceData.startTimestamp = browsingStamp;
    const timestamps = presence.getTimestamps(
      Math.floor(video.current),
      Math.floor(video.duration)
    );
    if (playvdo.includes("Episódio")) {
      const info = playvdo.split("- Episódio" || "Episódio");
      episode = info.pop();
      episode = `Episódio ${episode}`;
      [presenceData.details] = info;
      presenceData.state = episode;
    } else if (titlemovie.includes("Sinopse")) {
      const titlemovie = playfilmes;
      filmes = titlemovie;
      filmes = `${filmes}`;
      presenceData.details = "Filmes";
      presenceData.state = filmes;
    } else {
      let info;
      episode = "Assistir Anime";
      presenceData.details = info;
      presenceData.state = episode;
    }
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    if (!video.paused) [, presenceData.endTimestamp] = timestamps;

    if (buttons) {
      presenceData.buttons = [
        {
          label: "Assistir Anime",
          url: document.location.href.replace(/#\d+/, "")
        }
      ];
    }
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (!presenceData.state) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
