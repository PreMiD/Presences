const presence = new Presence({
  clientId: "629768767987122217"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "goyabu"
    },
    path = document.location.pathname,
    host = document.location.hostname,
    browsingTimestamp = Math.floor(Date.now() / 1000);

  if (host === "goyabu.com" && path === "/") {
    
    if (document.querySelector(
      "#home-content > h1 > span"
    ).textContent.includes("VOCÊ PESQUISOU POR:")) {
      
      presenceData.details = "Pesquisando Animes";
      presenceData.state = `Pesquisou: ${document.querySelector("#home-content > h1 > span").textContent.replace(
        "Você pesquisou por: ",
        ""
      )}`;
      presenceData.smallImageText = "Pesquisando";
      presenceData.smallImageKey = "search";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Página Inicial";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData);
    }
  } else if (
    host === "goyabu.com" &&
    path.startsWith("/anime/") &&
    path.replace("/anime/", "")
  ) {
    
    presenceData.details = "Visualizando Anime";
    presenceData.state = document.querySelector(
      "#channel-content > div.row > div.left20.right20 > h1"
    ).textContent;
    presenceData.smallImageText = "Visualizando";
    presenceData.smallImageKey = "visualizando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (
    host === "goyabu.com" &&
    path.startsWith("/lista-de-animes-online")
  ) {
    presenceData.details = "Procurando Anime";
    presenceData.state = "Lista de Animes";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.startsWith("/tag/filmes")) {
    presenceData.details = "Procurando Anime";
    presenceData.state = "Lista de Filme de Animes";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.startsWith("/tag/calendario")) {
    presenceData.details = "Procurando Anime";
    presenceData.state = "Calendário de Animes";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.startsWith("/dmca")) {
    presenceData.details = "DMCA";
    delete presenceData.startTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.includes("/wp-login.php")) {
    presenceData.details = "Iniciando Seção";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.includes("/wp-admin/profile.php")) {
    presenceData.details = "Visualizando Perfil";
    presenceData.smallImageText = "Perfil";
    presenceData.smallImageKey = "perfil";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.includes("/user.php")) {
    
    presenceData.details = "Visualizando Perfil";
    presenceData.state = document.querySelector("#home-content > h1") as HTMLElement.textContent.replace("Olá! ", "");
    presenceData.smallImageText = "Perfil";
    presenceData.smallImageKey = "perfil";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (
    host === "goyabu.com" &&
    path === `/video${path.replace("/video", "")}`
  ) {
    const video = document.querySelector("video"),
      title: HTMLHeadingElement = document.querySelector(
        "#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div.user-container.full.top20.bottom20 > div.pull-left.user-box > div > a:nth-child(1) > h3"
      ),
      
      b = document.querySelector(
        "#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div:nth-child(1) > div.row.vibe-interactions > h1"
      ).textContent
        .replace("(Assistido)", "")
        .replace(title.textContent, "")
        .replace(" – ", "")
        .replace("(HD)", "");
    presenceData.details = title.textContent;
    presenceData.state = b;
    if (video.paused === false) {
      
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(const presence = new Presence({
  clientId: "629768767987122217"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "goyabu"
    },
    path = document.location.pathname,
    host = document.location.hostname,
    browsingTimestamp = Math.floor(Date.now() / 1000);

  if (host === "goyabu.com" && path === "/") {
    const anSc2: HTMLSpanElement = document.querySelector(
      "#home-content > h1 > span"
    );
    if (anSc2.textContent.includes("VOCÊ PESQUISOU POR:")) {
      const anSc = document.querySelector("#home-content > h1 > span");
      presenceData.details = "Pesquisando Animes";
      presenceData.state = `Pesquisou: ${anSc.textContent.replace(
        "Você pesquisou por: ",
        ""
      )}`;
      presenceData.smallImageText = "Pesquisando";
      presenceData.smallImageKey = "search";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Página Inicial";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData);
    }
  } else if (
    host === "goyabu.com" &&
    path.startsWith("/anime/") &&
    path.replace("/anime/", "")
  ) {
    const aniN: HTMLHeadingElement = document.querySelector(
      "#channel-content > div.row > div.left20.right20 > h1"
    );
    presenceData.details = "Visualizando Anime";
    presenceData.state = aniN.textContent;
    presenceData.smallImageText = "Visualizando";
    presenceData.smallImageKey = "visualizando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (
    host === "goyabu.com" &&
    path.startsWith("/lista-de-animes-online")
  ) {
    presenceData.details = "Procurando Anime";
    presenceData.state = "Lista de Animes";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.startsWith("/tag/filmes")) {
    presenceData.details = "Procurando Anime";
    presenceData.state = "Lista de Filme de Animes";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.startsWith("/tag/calendario")) {
    presenceData.details = "Procurando Anime";
    presenceData.state = "Calendário de Animes";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.startsWith("/dmca")) {
    presenceData.details = "DMCA";
    delete presenceData.startTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.includes("/wp-login.php")) {
    presenceData.details = "Iniciando Seção";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.includes("/wp-admin/profile.php")) {
    presenceData.details = "Visualizando Perfil";
    presenceData.smallImageText = "Perfil";
    presenceData.smallImageKey = "perfil";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (host === "goyabu.com" && path.includes("/user.php")) {
    const pfName = document.querySelector("#home-content > h1") as HTMLElement;
    presenceData.details = "Visualizando Perfil";
    presenceData.state = pfName.textContent.replace("Olá! ", "");
    presenceData.smallImageText = "Perfil";
    presenceData.smallImageKey = "perfil";
    presenceData.startTimestamp = browsingTimestamp;
    presence.setActivity(presenceData);
  } else if (
    host === "goyabu.com" &&
    path === `/video${path.replace("/video", "")}`
  ) {
    const video = document.querySelector("video"),
      title: HTMLHeadingElement = document.querySelector(
        "#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div.user-container.full.top20.bottom20 > div.pull-left.user-box > div > a:nth-child(1) > h3"
      ),
      a = document.querySelector(
        "#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div:nth-child(1) > div.row.vibe-interactions > h1"
      ).textContent,
      b = a
        .replace("(Assistido)", "")
        .replace(title.textContent, "")
        .replace(" – ", "")
        .replace("(HD)", "");
    presenceData.details = title.textContent;
    presenceData.state = b;
    if (video.paused === false) {
      const { duration, currentTime } = video;
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(currentTime, duration);
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Assistindo";
      presence.setActivity(presenceData);
    } else if (video.currentTime > 0) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Pausado";
      presence.setActivity(presenceData);
    }
    presence.setActivity(presenceData);
  }
});
, duration);
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Assistindo";
      presence.setActivity(presenceData);
    } else if (video.currentTime > 0) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Pausado";
      presence.setActivity(presenceData);
    }
    presence.setActivity(presenceData);
  }
});
