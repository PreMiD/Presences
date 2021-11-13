const presence = new Presence({
    clientId: "860857600203554816"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo_anime",
      startTimestamp: browsingStamp
    },
    { pathname } = document.location,
    { search } = document.location,
    fav: HTMLDivElement = document.querySelector(".favFixed");

  if (fav && fav.style.display === "block")
    presenceData.details = "Olhando os favoritos";
  else if (pathname === "/") {
    if (search) {
      presenceData.details = "Procurando";
      presenceData.state = `Procurando por ${search.substring(3)}`;
    } else presenceData.details = "Explorando AnimeOnline.Games";
  } else if (pathname === "/lancamentos")
    presenceData.details = "Navegando os lançamentos";
  else if (pathname === "/lista-de-animes")
    presenceData.details = "Vendo Lista de Animes";
  else if (pathname === "/filmes") {
    presenceData.details = "Vendo Lista de Filmes";
    if (search) presenceData.state = `Procurando por ${search.substring(8)}`;
  } else if (pathname === "/desenhos") {
    presenceData.details = "Olhando para desenhos";
    if (search) presenceData.state = `Procurando por ${search.substring(8)}`;
  } else if (pathname === "/calendario") {
    const day: HTMLLIElement = document.querySelector(
      "ul#calen-nav > li.active"
    );
    presenceData.details = "Olhando o Calendário";
    if (day) presenceData.state = `No dia: ${day.innerText}`;
  } else if (pathname.startsWith("/genero/")) {
    const genre: HTMLHeadingElement = document.querySelector(
      "body > div.conteudoAlinhado > div.conteudoGen > section:nth-child(1) > section > h1"
    );
    presenceData.details = "Procurando por gênero";
    if (genre) presenceData.state = genre.innerText;
  } else if (/\/[a-z]\/animes\//.test(pathname)) {
    const anime: HTMLHeadingElement = document.querySelector(
      "body > div.conteudoAlinhado > div.conteudo > section:nth-child(1) > section.tituloPrincipal > h1"
    );
    presenceData.details = "Vendo Sinopse";
    if (anime) presenceData.state = anime.innerText;
    presenceData.buttons = [
      {
        label: "Vendo Sinopse",
        url: document.location.href
      }
    ];
  } else {
    const anime: HTMLHeadingElement = document.querySelector(
        "body > div.conteudoAlinhado > div.conteudo > section:nth-child(1) > section > h1"
      ),
      video: HTMLVideoElement = document.querySelector("video");
    if (anime) {
      const [animeTitle] = anime.innerText.split("-"),
        episode = parseInt(anime.innerText.split(" ").pop());
      presenceData.details = animeTitle;
      if (!isNaN(episode)) presenceData.state = `Episódio: ${episode}`;
      if (video)
        [, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);

      presenceData.buttons = [
        {
          label: "Assistir Episódio",
          url: document.location.href
        }
      ];
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
