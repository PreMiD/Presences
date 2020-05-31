const presence = new Presence({
  clientId: "715045665796915250"
});
function MediaTimestamps(mediaTimes: number, mediaDuration: number): number[] {
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(startTime - mediaTimes + mediaDuration);
  return [startTime, endTime];
}
function NotFound(): boolean {
  const q = document.querySelector("#content>div>div>h1");
  if (window.location.pathname == "/404") return true;
  else if (q) if (q.textContent == "Página não encontrada!") return true;
  return false;
}
enum PathNames {
  watch = "/videos",
  profile = "/perfil",
  anime_info = "/anime",
  social = "/postagens",
  forum = "/forum",
  history = "/minha-lista",
  newTopic = "/novo-topico"
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
  showVideosFTime = "showVideosFTime",
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
  /* PathNames.anime_info */
  showAnime = "showAnime",
  showAnimeReview = "showAnimeReview",
  showAnimeTrailer = "showAnimeTrailer",
  showAnimeSelection = "showAnimeSelection",
  showAnimeName = "showAnimeName"
}
enum ResourceNames {
  logo = "logo_shadow",
  play = "play",
  pause = "pause",
  stop = "stop",
  search = "search",
  writing = "writing",
  reading = "reading",
  info = "info"
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
    if (data.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else presence.setActivity(data);
  }
  if (
    pathName.startsWith(PathNames.watch) &&
    (await presence.getSetting(SettingsId.showVideos)) &&
    !NotFound()
  ) {
    const title = ["...", "Epsódio ..."];
    const animeName = document.querySelector("div.autofill.p1 > a > h4");
    const episode = pathName.split("/").slice(-1)[0];
    const comment = document.querySelector("textarea");
    const report = document.querySelector("div.modal-header>h1");
    const genders = document.querySelectorAll("div.autofill>span")[1];
    let timestamps: number[] = [];
    if (animeName) title[0] = animeName.textContent;
    title[1] = `Episódio ${episode}`;
    if (video && !isNaN(video.duration)) {
      timestamps = MediaTimestamps(video.currentTime, video.duration);
      if (await presence.getSetting(SettingsId.showVideosLTime)) {
        if (!video.paused && video.readyState >= 1) {
          data.startTimestamp = timestamps[0];
          data.endTimestamp = timestamps[1];
          data.smallImageKey = ResourceNames.play;
        } else if (video.readyState >= 1)
          data.smallImageKey = ResourceNames.pause;
      }
    } else if (await presence.getSetting(SettingsId.showVideosLTime))
      data.smallImageKey = ResourceNames.stop;
    data.details = title[0];
    data.state = title[1];
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
      data.state = animeName.textContent;
    }
  } else if (
    pathName.startsWith(PathNames.profile) &&
    (await presence.getSetting(SettingsId.showProfile)) &&
    !NotFound()
  ) {
    const title = ["Visualizando Perfil", "..."];
    const username = document.querySelector("h1>b>font");
    const selected = document.querySelector(
      "#main > div.black.flexContent.subNav.p1 > a.btn.router-link-active"
    );
    const selfUsername = document
      .querySelector("#menu-links>ul>li>div>div>li>a")
      .getAttribute("href")
      .split("/")
      .slice(-1)[0];
    if (
      pathName.startsWith(PathNames.profile) &&
      pathName.includes("/editar") &&
      username.textContent.toLowerCase() == selfUsername
    )
      title[0] = "Editando Perfil";
    title[1] = username.textContent;
    if (
      selected &&
      (await presence.getSetting(SettingsId.showProfileSelection))
    )
      title[0] += ` - ${selected.childNodes[1].textContent.trim()}`;
    data.details = title[0];
    data.state = title[1];
    if (!(await presence.getSetting(SettingsId.showProfileUsername))) {
      delete data.state;
      data.details = title[0].replace(":", "");
    } else data.details += ":";
  } else if (
    pathName.startsWith(PathNames.forum) &&
    (await presence.getSetting(SettingsId.showForum)) &&
    !NotFound()
  ) {
    const Thread = document.getElementsByClassName("thread")[0];
    const ThreadTitle = document
      .querySelector("head>title")
      .textContent.replace(" - Tópico", "");
    const NonThread = document.querySelector("#main>article>div>h1>b");
    if (pathName.split("/").join("") == PathNames.forum.split("/").join("")) {
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
      ).textContent;
      const textarea = document.querySelector("div.chill.fill");
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
        const category = document.querySelector("select");
        const selectedCategory =
          category.options[category.selectedIndex].textContent;
        if (await presence.getSetting(SettingsId.showForumCategory))
          data.state = `Categoria: ${
            isNaN(parseInt(selectedCategory)) ? selectedCategory : "..."
          }`;
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
    pathName.startsWith(PathNames.anime_info) &&
    !pathName.startsWith(PathNames.anime_info + "s") &&
    (await presence.getSetting(SettingsId.showAnime)) &&
    !NotFound()
  ) {
    const animeName = document.querySelector("h1>b").textContent;
    const modal = document.querySelector("div.modal-header>h1");
    const selected = document.querySelector(
      "a.p1.din.router-link-exact-active"
    );
    document.querySelectorAll("div.aniinfos>span").forEach((item) => {
      if (item.previousElementSibling.textContent.includes("Gêneros")) {
        data.smallImageKey = ResourceNames.search;
        data.smallImageText = item.textContent;
      }
    });

    if (await presence.getSetting(SettingsId.showAnimeReview)) {
      if (modal && modal.textContent.toLowerCase().includes("resenha"))
        selected && (await presence.getSetting(SettingsId.showAnimeSelection))
          ? (data.details = `Criando Resenha - ${selected.textContent}:`)
          : (data.details = `Criando Resenha:`);
    }
    if (await presence.getSetting(SettingsId.showAnimeTrailer)) {
      if (modal && modal.textContent.toLowerCase().includes("trailer"))
        selected && (await presence.getSetting(SettingsId.showAnimeSelection))
          ? (data.details = `Assistindo Trailer - ${selected.textContent}:`)
          : (data.details = `Assistindo Trailer:`);
    }
    if (!data.details)
      selected && (await presence.getSetting(SettingsId.showAnimeSelection))
        ? (data.details = `Visualizando Anime - ${selected.textContent}:`)
        : (data.details = `Visualizando Anime:`);
    if (await presence.getSetting(SettingsId.showAnimeName))
      data.state = animeName;
    else {
      data.details = data.details.replace(":", "");
      delete data.smallImageText;
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
      ];
      const customPaths: string = await presence.getSetting("customPaths");
      const pathsFromCustom = eval(
        `[${customPaths.toLowerCase().replace(/[\s\n]+/g, "")}]`
      );
      pathsAndStrings.forEach((item: string) => {
        const splitItem = item.split("=");
        if (
          pathName.startsWith(splitItem[0]) &&
          pathsFromCustom.indexOf(splitItem[0]) != -1
        )
          data.details = splitItem[1];
        if (pathName == "/" && pathsFromCustom.indexOf("/") != -1)
          data.details = "Início";
      });
    } finally {
      DefaultPresence();
    }
  }
  DefaultPresence();
});
