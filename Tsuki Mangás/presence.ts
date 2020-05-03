const presence = new Presence({
  clientId: "684627733145452555"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  var presenceData: presenceData = {
    largeImageKey: "logo"
  };
  var pathName = window.location.pathname;
  var notfound =
    pathName == "/404" ||
    document.getElementsByClassName("notfound").length != 0;
  if (pathName == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Início";
  } else if (pathName.startsWith("/lista-mangas") && !notfound) {
    const listCurrentPage = document.querySelector(
      "#app > div.manga > div.alllc > ul.pagination > li.active"
    );
    const qlistMaxPage = document.querySelectorAll(
      "#app > div.manga > div.alllc > ul.pagination > li > a"
    );
    let listPage = "";
    let listMaxPage = "";
    if (listCurrentPage != null && qlistMaxPage != null) {
      if (
        !qlistMaxPage[qlistMaxPage.length - 1].textContent.includes("Próximo")
      )
        listMaxPage = listCurrentPage.textContent;
      else listMaxPage = qlistMaxPage[qlistMaxPage.length - 2].textContent;
      listPage = " - Página " + listCurrentPage.textContent + "/" + listMaxPage;
    }
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Lista de Mangás" + listPage;
    const GenerosN = document.querySelector(
      "#app > div.manga > div.alllc > div.multiselect.boxgenman > div.multiselect__tags > div.multiselect__tags-wrap"
    );
    if (GenerosN != null && GenerosN.textContent.trim())
      presenceData.state =
        "Gêneros: " + GenerosN.textContent.split("\n").join(", ");
  } else if (pathName.startsWith("/equipe") && !notfound) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Equipe";
  } else if (pathName.startsWith("/perfil/") && !notfound) {
    var PerfilStatus = function (detail: string, state: string): void {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = detail;
      presenceData.state = state;
    };
    if (pathName.split("/").slice(-1)[0] != "editar")
      PerfilStatus(
        "Olhando um Perfil:",
        document.querySelector("#capapl > b").textContent
      );
    else if (pathName.split("/").length == 4) {
      const user = document
        .querySelector(
          "#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a"
        )
        .getAttribute("href")
        .split("/")
        .slice(-1)[0];
      if (user == pathName.split("/").slice(-2)[0])
        PerfilStatus("Editando Perfil", user);
      else PerfilStatus("Olhando um Perfil:", pathName.split("/").slice(-2)[0]);
    }
  } else if (pathName.startsWith("/manga/") && !notfound) {
    const MangaDefaultName = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
    );
    const qMangaAltNames = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.lef > div.altt"
    );
    let MangaName = "...";
    let MangaAltNames = "";
    if (MangaDefaultName != null && MangaDefaultName.textContent.trim()) {
      if (qMangaAltNames != null && qMangaAltNames.textContent.trim())
        MangaAltNames = " (" + qMangaAltNames.textContent + ")";
      MangaName = MangaDefaultName.textContent + MangaAltNames;
    }
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Olhando um Mangá:";
    presenceData.state = MangaName;
  } else if (pathName.startsWith("/leitor/") && !notfound) {
    const manga = document.querySelector("b.f20").textContent;
    const chapter = document
      .querySelector("b.f14c")
      .textContent.replace(" - ", ": ");
    let page = document.querySelector("select.backgsla.frightrr")["value"];
    isNaN(page) ? (page = "Páginas abertas") : (page = "Página " + page);
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = manga;
    presenceData.state = chapter + " - " + page;
  } else if (
    pathName.startsWith("/scan/") &&
    pathName != "/scan/" &&
    !notfound
  ) {
    const scanName = document.querySelector(
      "#app > div.scan > div.contentscan > div > h2"
    );
    const scanCurrentPage = document.querySelector(
      "#app > div.scan > div.contentscan > div > ul.pagination > li.active > a"
    );
    const qscanMaxPage = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > ul.pagination > li > a"
    );
    let scanMaxPage = "";
    let scanPage = "";
    if (scanCurrentPage != null && qscanMaxPage != null) {
      if (
        !qscanMaxPage[qscanMaxPage.length - 1].textContent.includes("Próximo")
      )
        scanMaxPage = scanCurrentPage.textContent;
      else scanMaxPage = qscanMaxPage[qscanMaxPage.length - 2].textContent;
      scanPage = " - Página " + scanCurrentPage.textContent + "/" + scanMaxPage;
    }
    const qscanMembers = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > div.membrosscan > b"
    ).length;
    let scanMembers = "";
    if (qscanMembers != 0)
      scanMembers = " - " + scanMembers.toString() + " Membros";
    let state = "...";
    if (scanName != null && scanName.textContent.trim())
      state = `${scanName.textContent}${scanMembers}${scanPage}`;
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Olhando um Scan Perfil:";
    presenceData.state = state;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
