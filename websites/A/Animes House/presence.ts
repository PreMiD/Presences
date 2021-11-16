const presence = new Presence({
    clientId: "711685584573169686"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let currentTime: number,
  duration: number,
  paused: boolean,
  played: boolean,
  timestamps;
const pesquisaText: HTMLInputElement = document.querySelector("#s"),
  paginaText: HTMLElement = document.querySelector(
    "#contenedor > div.module > div.content > div.pagination > span:nth-child(1)"
  ),
  nomeObraText: HTMLElement = document.querySelector(
    "#single > div.content > div.sheader > div.data > h1"
  ),
  lancamentoText: HTMLElement = document.querySelector(
    "#single > div.content > div.sheader > div.data > div.extra > span.date"
  ),
  generoText: HTMLElement = document.querySelector(
    "#contenedor > div.module > div.content > header > h1"
  ),
  nomeObraEpisodioText: HTMLElement = document.querySelector("#info > h1"),
  episodioEpisodioText: HTMLElement =
    document.querySelector("#info > div > h3"),
  filmeNomeText: HTMLElement = document.querySelector(
    "#single > div.content > div.sheader > div.data > h1"
  ),
  contaText: HTMLElement = document.querySelector(
    "#contenedor > div > nav > ul > li > a.selected"
  );

interface IFrameData {
  duration: number;
  played: boolean;
  paused: boolean;
  currentTime: number;
}

presence.on("iFrameData", (data: IFrameData) => {
  ({ currentTime, duration, paused, played } = data);
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname;

  if (path === "/") {
    if (document.title.includes("Resultados da pesquisa por ")) {
      presenceData.details = "Pesquisando por: ";
      presenceData.state = pesquisaText.value;
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = "Pagina inícial";
      presenceData.startTimestamp = browsingStamp;
    }
  } else if (path.includes("anime")) {
    path.split("/").length - 1 === 2 || path.split("/").length - 1 === 4
      ? ((presenceData.details = "Lista de animes"),
        (presenceData.state = paginaText.innerText),
        (presenceData.startTimestamp = browsingStamp))
      : ((presenceData.details = nomeObraText.innerText),
        (presenceData.state = lancamentoText.innerText),
        (presenceData.startTimestamp = browsingStamp));
  } else if (path.includes("generos")) {
    presenceData.details = `Gênero: ${generoText.innerText}`;
    presenceData.state = paginaText.innerText;
    presenceData.startTimestamp = browsingStamp;
  } else if (path.includes("episodio")) {
    presenceData.details = nomeObraEpisodioText.innerText;
    presenceData.state = episodioEpisodioText.innerText;
    presenceData.smallImageKey = "";
    presenceData.smallImageText = "";
    if (played) {
      !paused
        ? ((timestamps = presence.getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
          )),
          ([presenceData.startTimestamp, presenceData.endTimestamp] =
            timestamps),
          (presenceData.smallImageKey = "play"),
          (presenceData.smallImageText = "Assistindo"))
        : ((presenceData.smallImageKey = "pause"),
          (presenceData.smallImageText = "Pausado"));
    }
  } else if (path.includes("filme")) {
    if (path.split("/").length - 1 === 2 || path.split("/").length - 1 === 4) {
      presenceData.details = "Lista de filmes";
      presenceData.state = paginaText.innerText;
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = "Assistindo um filme";
      presenceData.state = filmeNomeText.innerText;
      if (played) {
        !paused
          ? ((timestamps = presence.getTimestamps(
              Math.floor(currentTime),
              Math.floor(duration)
            )),
            ([presenceData.startTimestamp, presenceData.endTimestamp] =
              timestamps),
            (presenceData.smallImageKey = "play"),
            (presenceData.smallImageText = "Assistindo"))
          : ((presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Pausado"));
      }
    }
  } else if (path.includes("/pedidos")) {
    presenceData.details = "Página de pedidos";
    presenceData.startTimestamp = browsingStamp;
    if (document.querySelector("div.discover.hidde.show"))
      presenceData.state = "Fazendo um novo pedido...";
  } else if (path.includes("/calendario")) {
    presenceData.details = "Calendário de lançamentos";
    presenceData.startTimestamp = browsingStamp;
  } else if (path.includes("/account")) {
    presenceData.details = "Minha Conta";
    presenceData.state = contaText.innerText;
    presenceData.startTimestamp = browsingStamp;
  } else presenceData.details = "Navegando...";

  presence.setActivity(presenceData);
});
