const presence = new Presence({
  clientId: "714001239351885904"
});
enum ResourceNames {
  logo = "logo",
  reading = "reading",
  search = "search",
  writing = "writing",
  history = "history",
  info = "info"
}
async function Resource(ResourceSelected: ResourceNames): Promise<string> {
  let value = ResourceSelected.toString();
  const logo: number = await presence.getSetting("logo");
  const darkmode: boolean = await presence.getSetting("darkResource");
  if (ResourceSelected == ResourceNames.logo)
    logo != 0 ? (value += "_book") : (value += "_cloud");
  if (darkmode) value += "_dark";
  return value;
}
function getPagination(pagN: number): number[] {
  const pagination = document.getElementsByClassName("pagination")[pagN];
  let current = 1;
  let max = 1;
  if (pagination) {
    current = parseInt(
      pagination.getElementsByClassName("active")[0].textContent
    );
    pagination.childNodes.forEach((item) => {
      if (
        item.nodeName == "LI" &&
        !isNaN(parseInt(item.textContent)) &&
        parseInt(item.textContent) > max
      )
        max = parseInt(item.textContent);
    });
  }
  return [current, max];
}
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const pathName = window.location.pathname,
    notfound =
      window.location.pathname == "/404" ||
      document.getElementsByClassName("notfound").length != 0,
    data: PresenceData = {
      largeImageKey: await Resource(ResourceNames.logo)
    };
  if (await presence.getSetting("resetTimestamp"))
    browsingStamp = Math.floor(Date.now() / 1000);
  if (pathName == "/") {
    let lancamentos = "...";
    const qlancamentos = document.querySelectorAll("div.leflist > div");
    if (qlancamentos.length > 0) {
      qlancamentos.forEach((item) => {
        if (item.className.includes("activedlanca"))
          lancamentos = item.textContent;
      });
    }
    data.details = "Início";
    data.state = "Lançamentos: " + lancamentos;
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/login") && !notfound) {
    data.details = "Logando...";
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/registrar") && !notfound) {
    data.details = "Registrando...";
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/lista-mangas") && !notfound) {
    data.details = `Lista de Mangás - Página ${getPagination(0)[0]}/${
      getPagination(0)[1]
    }`;
    let Generos = "";
    const GenerosN = document.querySelectorAll(
      "div.multiselect>div>div>span>span"
    );
    if (GenerosN.length > 0)
      GenerosN.forEach((item) => {
        if (Generos.length == 0) Generos += item.textContent;
        else Generos += `, ${item.textContent}`;
      });
    data.state = `Gêneros: ${!Generos.trim() ? "Todos" : Generos}`;
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/perfil/") && !notfound) {
    const username = document.querySelector("#capapl > b");
    const sessionUsername = (
      document.querySelector("#menu>li>ul>a") as HTMLLinkElement
    ).href
      .split("/")
      .slice(-1)[0];
    const usernameValue = [0, "...", true];
    if (!(await presence.getSetting("showUserName"))) {
      usernameValue[1] = "👁‍🗨👁‍🗨";
      usernameValue[3] = false;
    } else usernameValue[3] = true;
    if (
      username &&
      username.textContent.trim() &&
      pathName.split("/").slice(-1)[0] != "editar"
    ) {
      usernameValue[0] = 0;
      if (usernameValue[3]) usernameValue[1] = username.textContent;
    } else if (
      pathName.split("/").length == 4 &&
      sessionUsername &&
      sessionUsername.trim() &&
      sessionUsername == pathName.split("/").slice(-2)[0]
    ) {
      usernameValue[0] = 1;
      if (usernameValue[3]) usernameValue[1] = sessionUsername;
    } else if (
      pathName.split("/").length == 4 &&
      sessionUsername &&
      sessionUsername.trim() &&
      pathName.split("/").slice(-1)[0] == "editar" &&
      sessionUsername != pathName.split("/").slice(-2)[0]
    ) {
      usernameValue[0] = 0;
      if (usernameValue[3]) usernameValue[1] = pathName.split("/").slice(-2)[0];
    }
    data.details =
      usernameValue[0] == 0 ? "Vizualizando Perfil:" : "Editando Perfil:";
    data.state = usernameValue[1].toString();
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/manga/") && !notfound) {
    const MangaDefaultName = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
    );
    const qMangaAltNames = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.lef > div.altt"
    );
    let MangaAltNames = "";
    let MangaName = "...";
    if (MangaDefaultName && MangaDefaultName.textContent.trim()) {
      if (qMangaAltNames && qMangaAltNames.textContent.trim())
        MangaAltNames = " (" + qMangaAltNames.textContent + ")";
      MangaName = MangaDefaultName.textContent + MangaAltNames;
    }
    data.details = "Visualizando Mangá:";
    data.state = MangaName;
    const qgender = document.querySelector("div.mtop>span");
    let gender = "";
    if (qgender)
      qgender.childNodes.forEach((item) => {
        if (item.textContent == "Gêneros:") return;
        if (gender != "") gender += ", ";
        gender += item.textContent.replace(/^\s+|\s+$/g, "");
      });
    if (gender != "") {
      data.smallImageKey = await Resource(ResourceNames.search);
      data.smallImageText = gender;
    }
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/leitor/") && !notfound) {
    const overlay = document.querySelector(
      "#app > div.manga > div.v--modal-overlay"
    );
    const qmanga = document.querySelector("b.f20");
    const qchapter = document.querySelector("b.f14c");
    const qpage = document.querySelector("select.backgsla.frightrr");
    const manga = qmanga ? qmanga.textContent : "...";
    let chapter = qchapter ? qchapter.textContent : "...";
    let page = "...";
    if (qpage) {
      page = (qpage as HTMLInputElement).value;
      isNaN(parseInt(page))
        ? page.trim()
          ? (page = " - Páginas abertas")
          : (page = "...")
        : (page = " - Página " + page);
    }
    data.smallImageKey = await Resource(ResourceNames.reading);
    data.smallImageText = "Lendo...";
    data.details = manga.trim() ? manga : "...";
    if (chapter.trim() && chapter.includes("-")) {
      chapter = chapter.replace(/^\s+|\s+$/g, "");
      chapter = `${chapter.split(" - ")[0]} - "${chapter.split(" - ")[1]}"`;
    }
    data.state = chapter + page;
    if (
      (await presence.getSetting("showComment")) &&
      overlay &&
      overlay.getAttribute("data-modal").includes("comentarios")
    ) {
      data.smallImageKey = await Resource(ResourceNames.writing);
      data.smallImageText = "Comentando...";
    } else if (
      (await presence.getSetting("showReport")) &&
      overlay &&
      overlay.getAttribute("data-modal").includes("report")
    ) {
      data.smallImageKey = await Resource(ResourceNames.info);
      data.smallImageText = "Reportando...";
    }
    data.startTimestamp = browsingStamp;
  } else if (
    pathName.startsWith("/scan/") &&
    pathName != "/scan/" &&
    !notfound
  ) {
    const scanName = document.querySelector(
      "#app > div.scan > div.contentscan > div > h2"
    );
    const qscanMembers = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > div.membrosscan > b"
    ).length;
    let scanMembers;
    qscanMembers > 0
      ? (scanMembers = ` - ${qscanMembers.toString()} Membros`)
      : (scanMembers = " - 0 Membros");
    data.details = "Visualizando Grupo:";
    data.state =
      (scanName != null && scanName.textContent.trim()
        ? scanName.textContent
        : "...") +
      scanMembers +
      ` - Página ${getPagination(0)[0]}/${getPagination(0)[1]}`;
    data.startTimestamp = browsingStamp;
  }
  if (
    (await presence.getSetting("showHistory")) &&
    document.getElementsByClassName("historicob").length != 0
  ) {
    if (
      parseInt(
        document
          .getElementsByClassName("historicob")[0]
          .parentElement.style.width.replace("%", "")
      ) != 0
    ) {
      const hCategory = document
        .getElementsByClassName("activmancap")[0]
        .textContent.replace(/^\s+|\s+$/g, "");
      let hSession;
      document.querySelectorAll("div.selecths").forEach((item) => {
        if (item.classList[item.classList.length - 1].includes("selecths"))
          hSession = `${item.childNodes[0].textContent} ${item.childNodes[1].textContent}`;
      });
      const qUser = document.querySelector("#menu>li>ul>a");
      let user = qUser
        ? (qUser as HTMLLinkElement).href.split("/").slice(-1)[0]
        : "...";
      data.details = "Vizualizando Histórico:";
      data.state = `${hCategory} - ${hSession} - Página ${
        getPagination(0)[0]
      }/${getPagination(0)[1]}`;
      if (!(await presence.getSetting("showUserName"))) user = "👁‍🗨👁‍🗨";
      data.smallImageKey = await Resource(ResourceNames.history);
      data.smallImageText = "Username: " + user;
    }
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
