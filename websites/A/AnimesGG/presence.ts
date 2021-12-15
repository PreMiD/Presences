const presence = new Presence({
    clientId: "877352306100813944"
  }),
  pages: Record<string, PresenceData> = {
    "/assinatura/": {
      details: "Na página de premium",
      state: "Vendo sobre os planos premiums"
    },
    "/login/": {
      details: "Fazendo login no site",
      state: "Login..."
    },
    "/perfil/": {
      details: "Vendo seu próprio perfil",
      state: "Vendo o perfil."
    },
    "/generos/": {
      details: "Vendo todos os gêneros de anime.",
      state: "Vendo..."
    },
    "/calendario/": {
      details: "Vendo o calendário de animes",
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

  if (page in pages) data = Object.assign(data, pages[page]);
  else if (page === "/") {
    data.details = "Na página inicial";
    data.state = "Procurando animes...";
    if (params.get("s") !== null) {
      data.details = "Procurando animes.";
      data.state = `Procurando por ${params.get("s")}`;
    }
  } else if (page === "/lista-de-animes/") {
    data.details = "Procurando animes";
    data.state = "Na lista de animes";
    if (params.get("search") !== "0")
      data.state = `Procurando por ${params.get("search")}`;
  } else if (page === "/filmes/") {
    data.details = "Procurando filmes de animes";
    data.state = "Na lista de filmes de animes";
    if (params.get("search") !== "0" && params.get("search") !== null)
      data.state = `Procurando por ${params.get("search")}`;
  } else if (page.includes("/anime/")) {
    const isEpisode = page.includes("/episodio");
    if (isEpisode) {
      const animeTitleWatching =
          document.querySelector("#anime_title").innerHTML,
        video = document.querySelector(
          "#video > div > div > video"
        ) as HTMLMediaElement,
        timestamps = presence.getTimestampsfromMedia(video);
      data.details = "Assistindo um anime";
      data.state = `${animeTitleWatching}`;
      data.smallImageKey = "play";
      if (video.paused) {
        delete data.endTimestamp;
        delete data.startTimestamp;
        data.smallImageKey = "pause";
      }
      [, data.endTimestamp] = timestamps;
      data.buttons = [
        {
          label: "Assista também",
          url: `https://animes.gg/${page}`
        }
      ];
    } else {
      const animeTitleAbout =
          document.querySelector(".ani_titulo > h1").innerHTML,
        animeTitleFull = document.querySelector(
          ".ani_titulo_original"
        ).innerHTML,
        showFullName = await presence.getSetting("fullName");
      data.details = "Vendo sobre um anime";
      if (showFullName && animeTitleFull)
        data.state = `Vendo sobre ${animeTitleFull}`;
      else data.state = `Vendo sobre ${animeTitleAbout}`;
    }
  } else if (page.startsWith("/usuario")) {
    const username = document.querySelector(".profile-name").innerHTML;
    data.details = "Vendo a página de um usuário";
    data.state = `Vendo a página do ${username}`;
  } else if (page.startsWith("/filme")) {
    const animeTitleAbout =
        document.querySelector(".ani_titulo > h1").innerHTML,
      animeTitleFull = document.querySelector(".ani_titulo_original").innerHTML,
      showFullName = await presence.getSetting("fullName"),
      video = document.querySelector(
        "#video > div > div > video"
      ) as HTMLMediaElement,
      timestamps = presence.getTimestampsfromMedia(video);
    data.details = "Assistindo um filme de anime";
    if (showFullName && animeTitleFull) data.state = `${animeTitleFull}`;
    else data.state = `${animeTitleAbout}`;
    [, data.endTimestamp] = timestamps;
    data.buttons = [
      {
        label: "Assista também",
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
    data.details = "Procurando um gênero de anime";
    data.state = `Procurando ${page.substring("/genero/".length).slice(0, -1)}`;
  } else if (page.startsWith("/lancamentos")) {
    data.details = "Vendo os ultimos lançamentos no site";
    data.state = "Vendo...";
  }

  if (data.details && data.state) presence.setActivity(data);
  else presence.setActivity();
});
