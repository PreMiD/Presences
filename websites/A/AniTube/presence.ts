const presence = new Presence({ clientId: "801135853433913394" });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    { pathname } = document.location,
    titulo = document.title;

  if (titulo.includes("Resultados da pesquisa")) {
    const result = document.querySelector(
      "body > div.pagAniTitulo > div > h1"
    ).textContent;
    presenceData.details = "Página de Busca";
    presenceData.state = `Pesquisando: ${result.replace(
      "Você pesquisou por:",
      ""
    )}`;
  } else if (pathname === "/lista-de-animes-online/")
    presenceData.details = "Animes Legendados";
  else if (pathname === "/lista-de-animes-dublados-online/")
    presenceData.details = "Animes Dublados";
  else if (pathname === "/lista-de-generos-online/")
    presenceData.details = "Gêneros";
  else if (pathname === "/calendario/")
    presenceData.details = "Calendário de Animes";
  else if (titulo.includes("Todos os Epi")) {
    const nameAni = document.querySelector(
        "body > div.pagAniTitulo > div > h1"
      ).textContent,
      genrAni = document.querySelector(
        "#anime > div.animeFlexContainer > div.right > div > div:nth-child(2)"
      ).textContent;
    presenceData.details = nameAni.replace(" – Todos os Episódios", "");
    presenceData.state = genrAni;
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
      const seasonepisode = AniEp.replace("– ", "").replace(
          " [SEM CENSURA]",
          ""
        ),
        [, endTimestamp] = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused ? "Pausado" : "Assistindo";
      presenceData.endTimestamp = endTimestamp;
      presence.setTrayTitle(video.paused ? "" : AniN);
      presenceData.state = seasonepisode;

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
