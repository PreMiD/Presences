const presence = new Presence({
  clientId: "712898966760587275"
});
function getPagination(): number[] {
  const pagination = document.getElementsByClassName("pagination")[0];
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
presence.on("UpdateData", () => {
  const pathName = window.location.pathname,
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
    let Generos = "";
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
      data.smallImageKey = "search_dark";
      data.smallImageText = gender;
    }
    browsingStamp = Math.floor(Date.now() / 1000);
    data.startTimestamp = browsingStamp;
  } else if (pathName.startsWith("/leitor/") && !notfound) {
    const qmanga = document.querySelector("b.f20");
    const qchapter = document.querySelector("b.f14c");
    const qpage = document.querySelector("select.backgsla.frightrr");
    const manga = qmanga ? qmanga.textContent : "...";
    let chapter = qchapter ? qchapter.textContent : "...";
    let page = "...";
    if (qpage) {
      page = (qpage as HTMLInputElement).value;
      isNaN(parseInt(page))
        ? (page = " - Páginas abertas")
        : (page = " - Página " + page);
    }
    data.smallImageKey = "reading_dark";
    data.smallImageText = "Lendo...";
    data.details = manga.trim() ? manga : "...";
    if (chapter.trim() && chapter.includes("-")) {
      chapter = chapter.replace(/^\s+|\s+$/g, "");
      chapter = `${chapter.split(" - ")[0]} - "${chapter.split(" - ")[1]}"`;
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
      ` - Página ${getPagination()[0]}/${getPagination()[1]}`;
    data.startTimestamp = browsingStamp;
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
