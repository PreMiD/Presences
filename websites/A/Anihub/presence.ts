const presence = new Presence({
  clientId: "715045665796915250"
});
function getTimestamps(videoTime: number, videoDuration: number): number[] {
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(startTime - videoTime + videoDuration);
  return [startTime, endTime];
}
function NotFound(): boolean {
  const q = document.querySelector("#content>div>div>h1");
  if (window.location.pathname == "/404") return true;
  else if (q) if (q.textContent == "Página não encontrada!") return true;
  return false;
}
enum PathNames {
  login = "/login",
  register = "/registro",
  home = "/",
  watch = "/videos",
  profile = "/perfil",
  anime_info = "/anime",
  anime_list = "/animes",
  social = "/postagens",
  forum = "/forum",
  staff_list = "/equipe-membros",
  achievements = "/conquistas",
  history = "/minha-lista",
  shop = "/loja",
  lucky_box = "/caixa-da-sorte",
  policy = "/politica",
  newTopic = "/novo-topico"
}
enum SettingsId {
  showUsername = "showUsername",
  showComment = "showComment",
  showReport = "showReport",
  showFTime = "showFTime",
  showLTime = "showLTime",
  showHistory = "showHistory"
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
    pathName = document.location.pathname,
    video = document.querySelector("video");
  if (pathName == PathNames.login) data.details = "Logando...";
  else if (pathName == PathNames.register) data.details = "Registrando...";
  else if (pathName == PathNames.home) data.details = "Início";
  else if (pathName.startsWith(PathNames.watch) && !NotFound()) {
    const title = ["...", "Epsódio ..."];
    const aniplayerTime = document.getElementsByClassName("aniplayer-time")[0];
    const animeName = document.querySelector("div.autofill.p1 > a > h4");
    const episode = pathName.split("/").slice(-1)[0];
    const comment = document.querySelector("textarea");
    const report = document.querySelector("div.modal-header>h1");
    const genders = document.querySelectorAll("div.autofill>span")[1];
    let timestamps: number[] = [];
    if (animeName) title[0] = animeName.textContent;
    title[1] = `Episódio ${episode}`;
    if (video && !isNaN(video.duration)) {
      timestamps = getTimestamps(video.currentTime, video.duration);
      if (
        aniplayerTime.children[0].textContent !=
        aniplayerTime.children[1].textContent
      ) {
        if (await presence.getSetting(SettingsId.showFTime))
          title[1] += ` - ${aniplayerTime.children[0].textContent}/${aniplayerTime.children[1].textContent}`;
      } else title[1] += " ✔";
      if (!video.paused && video.readyState >= 1) {
        if (await presence.getSetting(SettingsId.showLTime)) {
          data.startTimestamp = timestamps[0];
          data.endTimestamp = timestamps[1];
        }
        data.smallImageKey = ResourceNames.play;
      } else if (video.readyState >= 1)
        data.smallImageKey = ResourceNames.pause;
    } else data.smallImageKey = ResourceNames.stop;
    data.details = title[0];
    data.state = title[1];
    if (genders && !genders.textContent.includes("Carregando"))
      data.smallImageText = genders.textContent;
    if (
      (await presence.getSetting(SettingsId.showComment)) &&
      comment &&
      comment.textLength > 0
    ) {
      data.smallImageKey = ResourceNames.writing;
      data.smallImageText = "Comentando...";
    }
    if (
      (await presence.getSetting(SettingsId.showReport)) &&
      report &&
      report.textContent.toLowerCase().includes("relatando")
    ) {
      data.smallImageKey = ResourceNames.info;
      data.smallImageText = "Reportando...";
    }
  } else if (pathName.startsWith(PathNames.profile) && !NotFound()) {
    const title = ["Vizualizando Perfil:", "..."];
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
      title[0] = "Editando Perfil:";
    (await presence.getSetting(SettingsId.showUsername))
      ? (title[1] = username.textContent)
      : (title[1] = "🕵️‍♂️");
    if (selected) title[1] += ` - ${selected.childNodes[1].textContent.trim()}`;
    data.details = title[0];
    data.state = title[1];
  } else if (pathName.startsWith(PathNames.anime_list) && !NotFound())
    data.details = "Lista de Animes";
  else if (pathName.startsWith(PathNames.forum) && !NotFound()) {
    const Thread = document.getElementsByClassName("thread")[0];
    const ThreadTitle = document
      .querySelector("head>title")
      .textContent.replace(" - Tópico", "");
    const NonThread = document.querySelector("#main>article>div>h1>b");
    const value = ["...", "...", ""];
    if (pathName.split("/").join("") == PathNames.forum.split("/").join("")) {
      value[0] = "Fórum";
      value[1] = "Categorias";
      value[2] = ResourceNames.search;
    } else if (Thread) {
      value[0] = `Fórum - [${
        Thread.parentElement.firstChild.textContent.match(/(?<=\[).*(?=\])/g)[0]
      }]`;
      const ThreadAuthor = document.querySelector(
        "div.flexContent.thread>div>div>a"
      ).textContent;
      value[1] = `${ThreadAuthor}: ${ThreadTitle}`;
      value[2] = ResourceNames.reading;
    } else {
      value[0] = "Fórum";
      value[1] = `Categoria: ${NonThread.childNodes[
        NonThread.childNodes.length - 1
      ].textContent.replace(/^\s+|\s+$/g, "")}`;
      value[2] = ResourceNames.search;
    }
    if (pathName.endsWith(PathNames.newTopic)) {
      value[0] = "Fórum - [Novo Tópico]";
      const category = document.querySelector("select");
      const selectedCategory =
        category.options[category.selectedIndex].textContent;
      value[1] = `Categoria: ${
        isNaN(parseInt(selectedCategory)) ? selectedCategory : "..."
      }`;
      value[2] = ResourceNames.writing;
    }
    data.details = value[0];
    data.state = value[1];
    data.smallImageKey = value[2];
    if (Thread)
      data.smallImageText = `Thread Id: ${Thread.getAttribute("id").replace(
        "t",
        ""
      )}`;
  } else if (pathName.startsWith(PathNames.staff_list) && !NotFound()) {
    data.details = "Membros da Equipe";
  } else if (pathName.startsWith(PathNames.achievements) && !NotFound()) {
    data.details = "Lista de Conquistas";
  } else if (pathName.startsWith(PathNames.social) && !NotFound()) {
    const title = document.querySelector("head>title").textContent;
    data.details = isNaN(parseInt(pathName.split("/").slice(-1)[0]))
      ? "Vizualizando Postagens"
      : "Vizualizando Postagem:";
    if (!isNaN(parseInt(pathName.split("/").slice(-1)[0]))) data.state = title;
    data.smallImageKey = ResourceNames.reading;
    if (!isNaN(parseInt(pathName.split("/").slice(-1)[0])))
      data.smallImageText = `Post Id: ${pathName.split("/").slice(-1)[0]}`;
  } else if (pathName.startsWith(PathNames.anime_info) && !NotFound()) {
    const animeName = document.querySelector("h1>b").textContent;
    const resenha = document.querySelector("div.modal-mask");
    const selected = document.querySelector(
      "a.p1.din.router-link-exact-active"
    );
    document.querySelectorAll("div.aniinfos>span").forEach((item) => {
      if (item.previousElementSibling.textContent.includes("Gêneros")) {
        data.smallImageKey = ResourceNames.search;
        data.smallImageText = item.textContent;
      }
    });
    data.details = resenha
      ? "Escrevendo Resenha:"
      : selected
      ? `Vizualizando Anime - ${selected.textContent}:`
      : `Vizualizando Anime:`;
    data.state = animeName;
  } else if (pathName.startsWith(PathNames.shop) && !NotFound())
    data.details = "Loja";
  else if (pathName.startsWith(PathNames.lucky_box) && !NotFound())
    data.details = "Caixas da Sorte";
  else if (pathName.startsWith(PathNames.policy) && !NotFound())
    data.details = "Politicas do Site";
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
