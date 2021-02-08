const presence = new Presence({ clientId: "801135853433913394" });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    tempo = Math.floor(Date.now() / 1000),
    path = document.location.pathname,
    titulo = document.title;

  if (titulo.includes("Resultados da pesquisa")) {
    const result = document.querySelector("body > div.pagAniTitulo > div > h1")
      .textContent;
    presenceData.details = "Página de Busca";
    presenceData.state =
      "Pesquisando: " + result.replace("Você pesquisou por:", "");
    presenceData.startTimestamp = tempo;
  } else if (path == "/lista-de-animes-online/") {
    presenceData.details = "Animes Legendados";
    presenceData.startTimestamp = tempo;
  } else if (path == "/lista-de-animes-dublados-online/") {
    presenceData.details = "Animes Dublados";
    presenceData.startTimestamp = tempo;
  } else if (path == "/lista-de-generos-online/") {
    presenceData.details = "Gêneros";
    presenceData.startTimestamp = tempo;
  } else if (path == "/calendario/") {
    presenceData.details = "Calendário de Animes";
    presenceData.startTimestamp = tempo;
  } else if (titulo.includes("Todos os Epi")) {
    const nameAni = document.querySelector("body > div.pagAniTitulo > div > h1")
        .textContent,
      genrAni = document.querySelector(
        "#anime > div.animeFlexContainer > div.right > div > div:nth-child(2)"
      ).textContent;
    presenceData.details = nameAni.replace(" – Todos os Episódios", "");
    presenceData.state = genrAni;
    presenceData.startTimestamp = tempo;
  } else if (titulo.includes(" – Episód")) {
    const AniN = document
        .querySelector("body > div.pagEpiTitulo > div > h1")
        .textContent.split(" ")
        .join(" ")
        .replace(" HD", "")
        .replace(" [SEM CENSURA]", "")
        .slice(0, -2)
        .replace(" – Episódio", ""),
      AniEp = document
        .querySelector("body > div.pagEpiTitulo > div > h1")
        .textContent.replace(AniN, "");
    presenceData.details = AniN;
    presenceData.state = AniEp.replace(" – Episódio", "Episódio: ");
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = "Pausado";

    const video: HTMLVideoElement = document.querySelector(".jw-video");

    if (video !== null && !isNaN(video.duration)) {
      const videoTitle = AniN,
        seasonepisode = AniEp.replace("– ", "").replace(" [SEM CENSURA]", ""),
        timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused ? "Pausado" : "Assistindo";
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      presence.setTrayTitle(video.paused ? "" : videoTitle);
      presenceData.details = videoTitle;
      presenceData.state = seasonepisode;

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
