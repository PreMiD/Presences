const presence = new Presence({
    clientId: "842620457655730207"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.playback.browsing"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = { largeImageKey: "logo" },
    video: HTMLVideoElement = document.querySelector(
      "body > div > div > div > div > div > video"
    );
  function pegarNome() {
    if (
      document.location.pathname.startsWith("/filmes/") &&
      !document.location.pathname.endsWith("documentarios")
    ) {
      const genero = document.querySelector(
          "body > div > div > div > section > div > section > h1"
        ).textContent,
        generoRegEx = /\s[A-Za-záàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ-]{3,}/,
        regEx = new RegExp(generoRegEx);
      return genero?.match(regEx);
    }
  }

  switch (true) {
    // LISTA
    case document.location.pathname.endsWith("/mylist"):
      presenceData.details = "Visualizando lista...";
      break;
    // FRANQUIAS
    case document.location.pathname.includes("/franquias"):
      presenceData.details = "Visualizando franquias...";
      break;

    case document.location.pathname.includes("/franquia/"): {
      const franquia = document.querySelector(
        "body > div > div > div > section > div > h1"
      ).textContent;
      presenceData.details = franquia;
      presenceData.state = "Visualizando a franquia...";
      break;
    }
    // CINELISTS
    case document.location.pathname.includes("/cinelists"):
      presenceData.details = "Visualizando cinelists...";
      break;

    case document.location.pathname.includes("/cinelist/") ||
      document.location.pathname.includes("/dc"): {
      const cinelist = document.querySelector(
        "body > div > div > div > section > div > h1"
      ).textContent;
      presenceData.details = cinelist;
      presenceData.state = "Visualizando cinelist...";
      break;
    }
    // DOCUMENTÁRIOS
    case document.location.pathname.endsWith("documentarios"):
      presenceData.details = "Vendo documentários...";
      break;
    // FILMES
    case document.location.pathname.startsWith("/filmes/") &&
      !document.location.pathname.endsWith("documentarios"):
      presenceData.details = `Vendo filmes por gênero:${pegarNome()}`;
      break;

    case document.location.pathname.includes("/filmes"):
      presenceData.details = "Vendo filmes por gênero...";
      break;

    case document.location.pathname.startsWith("/filme/"): {
      const movie = document.querySelector(
        "body > div > div > div > div > section > div > div > h1"
      ).textContent;
      presenceData.details = movie;
      presenceData.state = "Visualizando página do filme...";
      if (video) {
        const watchingMovie = document.querySelector(
          "body > div > div > div > div > section > div > div > h1"
        ).textContent;
        presenceData.details = watchingMovie;
        presenceData.state = "Assistindo filme...";
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play;
        if (!video.paused) {
          [presenceData.startTimestamp, presenceData.endTimestamp] =
            presence.getTimestampsfromMedia(video);
        }
      }
      break;
    }
    // CONTA
    case document.location.pathname.includes("/account"):
      presenceData.details = "Visualizando informações da conta...";
      break;
    // PROGRAMAÇÃO
    case document.location.pathname.includes("/programacao"):
      presenceData.details = "Visualizando programação...";
      break;
  }

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
