const presence = new Presence({
  clientId: "715045665796915250"
});
function NotFound(): boolean {
  const q = document.querySelector("#content>div>div>h1");
  if (window.location.pathname === "/404") return true;
  else if (q) if (q.textContent === "Página não encontrada!") return true;
  return false;
}
enum PathNames {
  watch = "/videos",
  profile = "/perfil",
  animeInfo = "/anime",
  social = "/postagens",
  forum = "/forum",
  history = "/minha-lista",
  newTopic = "/novo-topico",
  room = "/sala"
}
enum SettingsId {
  /* PathNames.profile */
  showProfile = "showProfile",
  showProfileUsername = "showProfileUsername",
  showProfileSelection = "showProfileSelection",
  /* PathNames.watch */
  showVideos = "showVideos",
  showVideosName = "showVideosName",
  showVideosEpisode = "showVideosEpisode",
  showVideosLTime = "showVideosLTime",
  showVideosComment = "showVideosComment",
  showVideosReport = "showVidoesReport",
  /* PathNames.forum */
  showForum = "showForum",
  showForumTitle = "showForumTitle",
  showForumCategory = "showForumCategory",
  showForumNewTopic = "showForumNewTopic",
  showForumReply = "showForumReply",
  /* PathNames.social */
  showSocial = "showSocial",
  showSocialTitle = "showSocialTitle",
  /* PathNames.animeInfo */
  showAnime = "showAnime",
  showAnimeReview = "showAnimeReview",
  showAnimeTrailer = "showAnimeTrailer",
  showAnimeSelection = "showAnimeSelection",
  showAnimeName = "showAnimeName",
  /* PathNames.room */
  showRoom = "showRoom",
  showRoomEpisode = "showRoomEpisode",
  showRoomName = "showRoomName",
  showRoomUsers = "showRoomUsers",
  showRoomLTime = "showRoomLTime"
}
enum ResourceNames {
  logo = "logo_shadow",
  play = "play",
  pause = "pause",
  stop = "stop",
  search = "search",
  writing = "writing",
  reading = "reading",
  info = "info",
  group = "group"
}
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: ResourceNames.logo,
      startTimestamp: browsingStamp
    },
    pathName = window.location.pathname,
    video = document.querySelector("video");
  function DefaultPresence(): void {
    if (!data.details) {
      presence.setTrayTitle();
      presence.setActivity();
    } else presence.setActivity(data);
  }
  if (
    pathName.startsWith(PathNames.watch) &&
    (await presence.getSetting(SettingsId.showVideos)) &&
    !NotFound()
  ) {
    const value = ["...", "..."],
      animeNameEP = document.querySelector("#main>article>h1"),
      comment = document.querySelector("textarea"),
      report = document.querySelector("div.modal-header>h1"),
      [, genders] = document.querySelectorAll("div.autofill>span");
    let timestamps: number[] = [];
    if (animeNameEP) {
      value[0] = animeNameEP.textContent.replace(
        animeNameEP.textContent.match(/ - \d+/g).slice(-1)[0],
        ""
      );
      [value[1]] = animeNameEP.textContent
        .match(/ - \d+/g)
        .slice(-1)[0]
        .match(/\d+/g);
    }
    if (video && !isNaN(video.duration)) {
      timestamps = presence.getTimestamps(video.currentTime, video.duration);
      if (await presence.getSetting(SettingsId.showVideosLTime)) {
        if (!video.paused && video.readyState >= 1) {
          [data.startTimestamp, data.endTimestamp] = timestamps;
          data.smallImageKey = ResourceNames.play;
        } else if (video.readyState >= 1)
          data.smallImageKey = ResourceNames.pause;
      }
    } else if (await presence.getSetting(SettingsId.showVideosLTime))
      data.smallImageKey = ResourceNames.stop;
    [data.details] = value;
    data.state = `Episódio ${value[1]}`;
    if (genders && !genders.textContent.toLowerCase().includes("carregando"))
      data.smallImageText = genders.textContent;
    if (!(await presence.getSetting(SettingsId.showVideosName))) {
      data.details = "Assistindo Anime:";
      delete data.smallImageText;
    }
    if (!(await presence.getSetting(SettingsId.showVideosEpisode))) {
      delete data.state;
      data.details = data.details.replace(":", "");
    }
    if (
      (await presence.getSetting(SettingsId.showVideosReport)) &&
      report &&
      report.textContent.toLowerCase().includes("relatando")
    ) {
      data.smallImageKey = ResourceNames.info;
      data.smallImageText = "Reportando...";
    } else if (
      (await presence.getSetting(SettingsId.showVideosComment)) &&
      comment &&
      comment.textLength > 0
    ) {
      data.smallImageKey = ResourceNames.writing;
      data.smallImageText = "Comentando...";
    }
    if (
      !data.state &&
      (await presence.getSetting(SettingsId.showVideosName)) &&
      !(await presence.getSetting(SettingsId.showVideosEpisode))
    ) {
      data.details = "Assistindo Anime:";
      [data.state] = value;
    }
    if (
      (await presence.getSetting(SettingsId.showVideosLTime)) &&
      video &&
      !isNaN(video.duration) &&
      timestamps[0] === timestamps[1]
    ) {
      data.details = data.details.replace(/^/, "✔ ");
      data.smallImageKey = ResourceNames.stop;
    }
  } else if (
    pathName.startsWith(PathNames.profile) &&
    (await presence.getSetting(SettingsId.showProfile)) &&
    !NotFound()
  ) {
    const title = ["Visualizando Perfil", "..."],
      username = document.querySelector("h1>b>font"),
      selected = document.querySelector(
        "#main > div.black.flexContent.subNav.p1 > a.btn.router-link-active"
      ),
      selfUsername = document.querySelector("#menu-links>ul>li>div>div>li>a");
    if (
      pathName.startsWith(PathNames.profile) &&
      pathName.includes("/editar") &&
      selfUsername &&
      username.textContent.toLowerCase() ===
        selfUsername.getAttribute("href").split("/").slice(-1)[0].toLowerCase()
    )
      title[0] = "Editando Perfil";
    title[1] = username ? username.textContent : "...";
    if (
      selected &&
      (await presence.getSetting(SettingsId.showProfileSelection))
    )
      title[0] += ` - ${selected.childNodes[1].textContent.trim()}`;
    [data.details, data.state] = title;
    if (!(await presence.getSetting(SettingsId.showProfileUsername))) {
      delete data.state;
      data.details = title[0].replace(":", "");
    } else data.details += ":";
  } else if (
    pathName.startsWith(PathNames.forum) &&
    (await presence.getSetting(SettingsId.showForum)) &&
    !NotFound()
  ) {
    const [Thread] = document.getElementsByClassName("thread"),
      ThreadTitle = document
        .querySelector("head>title")
        .textContent.replace(" - Tópico", ""),
      NonThread = document.querySelector("#main>article>div>h1>b");
    if (pathName.split("/").join("") === PathNames.forum.split("/").join("")) {
      data.details = "Fórum";
      if (await presence.getSetting(SettingsId.showForumCategory)) {
        data.state = "Categorias";
        data.smallImageKey = ResourceNames.search;
      }
    } else if (Thread) {
      data.details = (await presence.getSetting(SettingsId.showForumCategory))
        ? `Fórum - ${
            Thread.parentElement.firstChild.textContent.match(/\[(.*?\])/)[0]
          }`
        : "Fórum";
      const ThreadAuthor = document.querySelector(
          "div.flexContent.thread>div>div>a"
        ).textContent,
        textarea = document.querySelector("div.chill.fill");
      if (await presence.getSetting(SettingsId.showForumTitle)) {
        data.state = `${ThreadAuthor}: ${ThreadTitle}`;
        data.smallImageKey = ResourceNames.reading;
        data.smallImageText = `Thread Id: ${Thread.getAttribute("id").replace(
          "t",
          ""
        )}`;
      }
      if (
        textarea &&
        textarea.textContent.length > 0 &&
        (await presence.getSetting(SettingsId.showForumReply))
      ) {
        data.smallImageKey = ResourceNames.writing;
        data.smallImageText = "Respondendo...";
      }
    } else if (!pathName.endsWith(PathNames.newTopic)) {
      data.details = "Fórum";
      if (await presence.getSetting(SettingsId.showForumCategory)) {
        data.state = `Categoria: ${NonThread.childNodes[
          NonThread.childNodes.length - 1
        ].textContent.replace(/^\s+|\s+$/g, "")}`;
        data.smallImageKey = ResourceNames.search;
      }
    } else {
      data.details = "Fórum";
      if (await presence.getSetting(SettingsId.showForumNewTopic)) {
        data.details += " - [Novo Tópico]";
        const category = document.querySelector("select"),
          selectedCategory =
            category.options[category.selectedIndex].textContent;
        if (await presence.getSetting(SettingsId.showForumCategory)) {
          data.state = `Categoria: ${
            isNaN(parseInt(selectedCategory)) ? selectedCategory : "..."
          }`;
        }
        data.smallImageKey = ResourceNames.writing;
      }
    }
  } else if (
    pathName.startsWith(PathNames.social) &&
    (await presence.getSetting(SettingsId.showSocial)) &&
    !NotFound()
  ) {
    const title = document.querySelector("head>title").textContent;
    data.details = isNaN(parseInt(pathName.split("/").slice(-1)[0]))
      ? "Visualizando Publicações"
      : "Visualizando Postagem";
    if (
      !isNaN(parseInt(pathName.split("/").slice(-1)[0])) &&
      (await presence.getSetting(SettingsId.showSocialTitle))
    ) {
      data.details += ":";
      data.state = title;
      data.smallImageText = `Post Id: ${pathName.split("/").slice(-1)[0]}`;
    }
    data.smallImageKey = ResourceNames.reading;
  } else if (
    pathName.startsWith(PathNames.animeInfo) &&
    !pathName.startsWith(`${PathNames.animeInfo}s`) &&
    (await presence.getSetting(SettingsId.showAnime)) &&
    !NotFound()
  ) {
    const animeName = document.querySelector("h1>b"),
      modal = document.querySelector("div.modal-header>h1"),
      selected = document.querySelector("a.p1.din.router-link-exact-active");
    document.querySelectorAll("div.aniinfos>span").forEach((item) => {
      if (item.previousElementSibling.textContent.includes("Gêneros")) {
        data.smallImageKey = ResourceNames.search;
        data.smallImageText = item.textContent;
      }
    });

    if (await presence.getSetting(SettingsId.showAnimeReview)) {
      if (modal && modal.textContent.toLowerCase().includes("resenha")) {
        selected && (await presence.getSetting(SettingsId.showAnimeSelection))
          ? (data.details = `Criando Resenha - ${selected.textContent}:`)
          : (data.details = "Criando Resenha:");
      }
    }
    if (await presence.getSetting(SettingsId.showAnimeTrailer)) {
      if (modal && modal.textContent.toLowerCase().includes("trailer")) {
        selected && (await presence.getSetting(SettingsId.showAnimeSelection))
          ? (data.details = `Assistindo Trailer - ${selected.textContent}:`)
          : (data.details = "Assistindo Trailer:");
      }
    }
    if (!data.details) {
      selected && (await presence.getSetting(SettingsId.showAnimeSelection))
        ? (data.details = `Visualizando Anime - ${selected.textContent}:`)
        : (data.details = "Visualizando Anime:");
    }
    if (await presence.getSetting(SettingsId.showAnimeName))
      data.state = animeName ? animeName.textContent : "...";
    else {
      data.details = data.details.replace(":", "");
      delete data.smallImageText;
    }
  } else if (
    pathName.startsWith(PathNames.room) &&
    (await presence.getSetting(SettingsId.showRoom))
  ) {
    const usersCount = document.querySelector("#main>article>div>div>b"),
      animeNameEP = document.querySelector("#main>article>h1");
    let timestamps: number[] = [];
    const value = ["...", "..."];
    if (animeNameEP) {
      value[0] = animeNameEP.textContent.replace(
        animeNameEP.textContent.match(/ - \d+/g).slice(-1)[0],
        ""
      );
      [value[1]] = animeNameEP.textContent
        .match(/ - \d+/g)
        .slice(-1)[0]
        .match(/\d+/g);
    }
    data.details = !(await presence.getSetting(SettingsId.showRoomName))
      ? "Assistindo em Grupo:"
      : value[0];
    data.state = `Episódio ${value[1]}`;
    data.smallImageKey = ResourceNames.group;
    if (usersCount && (await presence.getSetting(SettingsId.showRoomUsers))) {
      data.smallImageText =
        usersCount.textContent.split(" ")[0] === "1"
          ? "Assistindo sozinho(a)"
          : `Assistindo com ${
              parseInt(usersCount.textContent.split(" ")[0]) - 1
            } usuário(s)`;
    } else if (
      !(await presence.getSetting(SettingsId.showRoomUsers)) &&
      (await presence.getSetting(SettingsId.showRoomName))
    )
      data.smallImageText = "Assistindo em Grupo";
    if (
      video &&
      !isNaN(video.duration) &&
      (await presence.getSetting(SettingsId.showRoomLTime))
    ) {
      timestamps = presence.getTimestamps(video.currentTime, video.duration);
      if (!video.paused && video.readyState >= 1)
        [data.startTimestamp, data.endTimestamp] = timestamps;
    }
    if (!(await presence.getSetting(SettingsId.showRoomEpisode)))
      delete data.state;
    if (
      !(await presence.getSetting(SettingsId.showRoomEpisode)) &&
      !(await presence.getSetting(SettingsId.showRoomName))
    ) {
      delete data.state;
      data.details = data.details.replace(":", "");
    }
  } else if (!NotFound()) {
    try {
      const pathsAndStrings = [
          "/login=Logando",
          "/registro=Registrando...",
          "/changelogs=Changelogs",
          "/loja=Loja",
          "/caixa-da-sorte",
          "/politica=Políticas do Site",
          "/equipe-membros=Membros da Equipe",
          "/conquistas=Lista de Conquistas",
          "/animes=Lista de Animes"
        ],
        customPaths: string = await presence.getSetting("customPaths"),
        pathsFromCustom = [customPaths.toLowerCase().replace(/[\s\n]+/g, "")];
      pathsAndStrings.forEach((item: string) => {
        const splitItem = item.split("=");
        if (
          pathName.startsWith(splitItem[0]) &&
          pathsFromCustom.indexOf(splitItem[0]) !== -1
        )
          [, data.details] = splitItem;
        if (pathName === "/" && pathsFromCustom.indexOf("/") !== -1)
          data.details = "Início";
      });
    } finally {
      DefaultPresence();
    }
  }
  DefaultPresence();
});
