const presence = new Presence({
  clientId: "712898966760587275"
});
function getPagination(): number[] {
  let pagination = document.getElementsByClassName("pagination")[0];
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
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  var pathName = window.location.pathname,
    notfound =
      window.location.pathname == "/404" ||
      document.getElementsByClassName("notfound").length != 0,
    data: PresenceData = {
      largeImageKey: "logo_dark"
    };
  if (pathName == "/") {
    data.details = "Início";
    browsingStamp = Math.floor(Date.now() / 1000);
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/login") && !notfound) {
    data.details = "Logando...";
    browsingStamp = Math.floor(Date.now() / 1000);
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/registrar") && !notfound) {
    data.details = "Registrando...";
    browsingStamp = Math.floor(Date.now() / 1000);
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/lista-mangas") && !notfound) {
    data.details = `Lista de Mangás - Página ${getPagination()[0]}/${
      getPagination()[1]
    }`;
    var Generos = "";
    const GenerosN = document.querySelectorAll(
      "#app > div.manga > div > div.multiselect.boxgenman > div.multiselect__tags > div.multiselect__tags-wrap > span > span"
    );
    if (GenerosN.length > 0)
      GenerosN.forEach((item) => {
        if (Generos.length == 0) Generos += item.textContent;
        else Generos += `, ${item.textContent}`;
      });
    data.state = `Gêneros: ${!Generos.trim() ? "Todos" : Generos}`;
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/perfil/") && !notfound) {
    const name = document.querySelector("#capapl > b");
    if (pathName.split("/").slice(-1)[0] != "editar") {
      data.details = "Visualizando Perfil:";
      data.state = name
        ? name.textContent.trim()
          ? name.textContent
          : "..."
        : "...";
    } else if (pathName.split("/").length == 4) {
      const user = (document.querySelector(
        "#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a"
      ) as HTMLLinkElement).href
        .split("/")
        .slice(-1)[0];
      if (user == pathName.split("/").slice(-2)[0]) {
        data.details = "Editando Perfil";
        data.state = user;
      } else {
        data.details = "Visualizando Perfil:";
        data.state = pathName.split("/").slice(-2)[0];
      }
    }
    browsingStamp = Math.floor(Date.now() / 1000);
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/manga/") && !notfound) {
    const MangaDefaultName = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
    );
    let MangaAltNames: any = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.lef > div.altt"
    );
    let MangaName = "...";
    if (MangaDefaultName != null && MangaDefaultName.textContent.trim()) {
      MangaAltNames == null || !MangaAltNames.textContent.trim()
        ? (MangaAltNames = "")
        : (MangaAltNames = " (" + MangaAltNames.textContent + ")");
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
      data.smallImageKey = "search_dark";
      data.smallImageText = gender;
    }
    browsingStamp = Math.floor(Date.now() / 1000);
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/leitor/") && !notfound) {
    let manga: any = document.querySelector("b.f20");
    let chapter: any = document.querySelector("b.f14c");
    manga ? (manga = manga.textContent) : (manga = "...");
    chapter ? (chapter = chapter.textContent) : (chapter = "...");
    let page: any = document.querySelector("select.backgsla.frightrr");
    if (page) {
      page = (page as HTMLInputElement).value;
      isNaN(parseInt(page))
        ? (page = " - Páginas abertas")
        : (page = " - Página " + page);
    } else page = "...";
    data.smallImageKey = "reading_dark";
    data.smallImageText = "Lendo...";
    data.details = manga.trim() ? manga : "...";
    if (chapter.trim() && chapter.includes("-")) {
      chapter = chapter.replace(/^\s+|\s+$/g, "");
      chapter = chapter.split(" - ");
      chapter = `${chapter[0]} - "${chapter[1]}"`;
    }
    data.state = chapter + page;
    if (document.querySelector("#app > div.manga > div.trasm")) {
      data.smallImageKey = "writing_dark";
      data.smallImageText = "Comentando...";
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
    let scanMembers: any = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > div.membrosscan > b"
    ).length;
    scanMembers > 0
      ? (scanMembers = ` - ${scanMembers.toString()} Membros`)
      : (scanMembers = " - 0 Membros");
    data.details = "Visualizando Grupo:";
    data.state =
      (scanName != null && scanName.textContent.trim()
        ? scanName.textContent
        : "...") +
      scanMembers +
      ` - Página ${getPagination()[0]}/${getPagination()[1]}`;
    data.startTimestamp = browsingStamp;
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
