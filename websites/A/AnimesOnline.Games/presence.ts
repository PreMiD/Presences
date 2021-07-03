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
    presenceData.details = "Looking at favorites";
  else {
    if (pathname === "/") {
      if (search) {
        presenceData.details = "Searching";
        presenceData.state = `Searching for ${search.substring(3)}`;
      } else presenceData.details = "Exploring AnimeOnline.Games";
    } else if (pathname === "/lancamentos")
      presenceData.details = "Browsing latest releases";
    else if (pathname === "/lista-de-animes")
      presenceData.details = "Viewing List of animes";
    else if (pathname === "/filmes") {
      presenceData.details = "Viewing List of movies";
      if (search) presenceData.state = `Searching for ${search.substring(8)}`;
    } else if (pathname === "/desenhos") {
      presenceData.details = "Looking at cartoons";
      if (search) presenceData.state = `Searching for ${search.substring(8)}`;
    } else if (pathname === "/calendario") {
      const day: HTMLLIElement = document.querySelector(
        "ul#calen-nav > li.active"
      );
      presenceData.details = "Looking at calendar";
      if (day) presenceData.state = `For day: ${day.innerText}`;
    } else if (pathname.startsWith("/genero/")) {
      const genre: HTMLHeadingElement = document.querySelector(
        "body > div.conteudoAlinhado > div.conteudoGen > section:nth-child(1) > section > h1"
      );
      presenceData.details = "Searching By genre";
      if (genre) presenceData.state = genre.innerText;
    } else if (/\/[a-z]\/animes\//.test(pathname)) {
      const anime: HTMLHeadingElement = document.querySelector(
        "body > div.conteudoAlinhado > div.conteudo > section:nth-child(1) > section.tituloPrincipal > h1"
      );
      presenceData.details = "Checking Synopsis";
      if (anime) presenceData.state = anime.innerText;
      presenceData.buttons = [
        {
          label: "Check Synopsis",
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
        if (!isNaN(episode)) presenceData.state = `Episode: ${episode}`;
        if (video) {
          [, presenceData.endTimestamp] =
            presence.getTimestampsfromMedia(video);
        }
        presenceData.buttons = [
          {
            label: "Watch Episode",
            url: document.location.href
          }
        ];
      }
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
