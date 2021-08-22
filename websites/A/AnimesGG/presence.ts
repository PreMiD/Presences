const presence = new Presence({
    clientId: "877352306100813944"
  }),
  pages: Record<string, PresenceData> = {
    "/assinatura/": {
      details: "Na pagina de premium",
      state: "Vendo sobre os planos premiums"
    },
    "/login/": {
      details: "Fazendo login no site",
      state: "Login..."
    },
    "/perfil/": {
      details: "Vendo seu proprio perfil",
      state: "Vendo o perfil."
    },
    "/generos/": {
      details: "Vendo todos os generos de anime.",
      state: "Vendo..."
    },
    "/calendario/": {
      details: "Vendo o calendario de animes",
      state: "Vendo..."
    }
  },
  presenceTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  let data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: presenceTimestamp
  };
  const page = document.location.pathname,
    params = new URLSearchParams(document.location.search.substring(1));

  if (page in pages) 
    data = Object.assign(data, pages[page]);
  else if (page === "/") {
    data.details = "Na pagina inicial";
    data.state = "Procurando animes...";
    if (params.get("s") !== null) {
      data.details = "Procurando animes.";
      data.state = `Procurando por ${params.get("s")}`;
    }
  } else if (page === "/lista-de-animes/") {
    data.details = "Procurando animes.";
    data.state = "Na lista de animes.";
    if (params.get("search") !== "0" )
      data.state = `Procurando por ${params.get("search")}`;
  } else if (page === "/filmes/") {
    data.details = "Procurando filmes de animes.";
    data.state = "Na lista de filmes de animes.";
    if (params.get("search") !== "0" && params.get("search") !== null)
      data.state = `Procurando por ${params.get("search")}`;
  } else if (page.includes("/anime/")) {
    const isEpisode = page.includes("/episodio");
    if(isEpisode) {
      const animeTitleWatching = document.querySelector(
          "#anime_title"
        ).innerHTML,
        video = document.querySelector(
          "#video > div > div > video"
        ) as HTMLMediaElement,
        timestamps = presence.getTimestampsfromMedia(video);
      data.details = "Assitindo um anime.";
      data.state = `Vendo ${animeTitleWatching}`;
      data.smallImageKey = "play";
      if (video.paused) {
        delete data.endTimestamp;
        delete data.startTimestamp;
        data.smallImageKey = "pause";
      }
      [, data.endTimestamp] = timestamps;
      data.buttons = [
        {
          label: "Asistir tambem",
          url: `https://animes.gg/${page}`
        }
      ];
    } else {
      const animeTitleAbout = document.querySelector(
          ".ani_titulo > h1"
        ).innerHTML,
        animeTitleFull = document.querySelector(
          ".ani_titulo_original"
        ).innerHTML,
        showFullName = await presence.getSetting("fullName");
      data.details = "Vendo sobre um anime.";
      if (showFullName && animeTitleFull) 
        data.state = `Vendo sobre ${animeTitleFull}`;
      else 
        data.state = `Vendo sobre ${animeTitleAbout}`;
    }
  } else if (page.startsWith("/usuario")) {
    const username = document.querySelector(
      ".profile-name"
    ).innerHTML;
    data.details = "Vendo a a pagina de um usuario";
    data.state = `Vendo a pagina do ${username}`;
  } else if (page.startsWith("/filme")) {
    const animeTitleAbout = document.querySelector(
        ".ani_titulo > h1"
      ).innerHTML,
      animeTitleFull = document.querySelector(
        ".ani_titulo_original"
      ).innerHTML,
      showFullName = await presence.getSetting("fullName"),
      video = document.querySelector(
        "#video > div > div > video"
      ) as HTMLMediaElement,
      timestamps = presence.getTimestampsfromMedia(video);
    data.details = "Assitindo um filme de anime";
    if (showFullName && animeTitleFull) 
      data.state = `Vendo sobre ${animeTitleFull}`;
    else 
      data.state = `Vendo sobre ${animeTitleAbout}`;
    [, data.endTimestamp] = timestamps;
    data.buttons = [
      {
        label: "Asistir tambem",
        url: `https://animes.gg/${page}`
      }
    ];
    data.smallImageKey = "play";
    if (video.paused) {
      delete data.endTimestamp;
      delete data.startTimestamp;
      data.smallImageKey = "pause";
    }
  } else if (page.startsWith("/genero")) {
    data.details = "Procurando um genero de anime";
    data.state = `Procurando ${page.substring("/genero/".length).slice(0, -1)}`;
  } else if (page.startsWith("/lancamentos")) {
    data.details = "Vendo os ultimos lancamentos no site.";
    data.state = "Vendo...";
  }

  if (data.details && data.state)
    presence.setActivity(data);
  else
    presence.setActivity();
});