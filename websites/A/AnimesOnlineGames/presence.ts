const presence = new Presence({
  clientId: "843568969804939306"
});

function Timestamps(videoTime, videoDuration): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const nomeObraAnime: HTMLElement = document.querySelector(
  "body > div.conteudoAlinhado > div.conteudo > section:nth-child(1) > section.tituloPrincipal > h1"
);
const nomeEpisodio: HTMLElement = document.querySelector(
  "body > div.conteudoAlinhado > div.conteudo > section:nth-child(1) > section > h1"
);
const paginaAtual: HTMLElement = document.querySelector(
  "body > div.conteudoAlinhado > p > b:nth-child(1)"
);
const ultimaPagina: HTMLElement = document.querySelector(
  "body > div.conteudoAlinhado > p > b:nth-child(2)"
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const path = document.location.pathname;

  if (path == "/") {
    if (pesquisaTitulo != null) {
      if (pesquisaTitulo.innerText.includes("RESULTADO PARA A PESQUISA :")) {
        presenceData.details = "Em pesquisa por: ";
        presenceData.state = pesquisaTitulo.innerText.slice(19);
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
      }
    } else {
      presenceData.details = "Início";
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
  } else if (path.includes("/b/animes/")) {
    if (path == "/b/animes/") {
      presenceData.details = "Vendo animes";
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else {
      presenceData.details = nomeObraAnime.innerText;
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
  } else if (path.includes("/video/")) {
    if (path == "/video/") {
      presenceData.details = "Lista de vídeos";
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    } else {
      const video: any = document.querySelector("video");
      const timestamps: any = Timestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.details = nomeEpisodio.innerText;
      if (!video.paused) {
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Assistindo";
      }
    }
  } else if (path.includes("/lista-de-animes")) {
    presenceData.details =
      "Animes" +
      " | Página: " +
      paginaAtual.innerText +
      " de " +
      ultimaPagina.innerText;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else {
    presenceData.details = "Navegando... ";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }
  presence.setActivity(presenceData);
});