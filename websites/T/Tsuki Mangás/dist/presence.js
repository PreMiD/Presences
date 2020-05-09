var presence = new Presence({
  clientId: "684627733145452555"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  let presenceData = {
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
    let listCurrentPage = document.querySelector(
      "#app > div.manga > div.alllc > ul.pagination > li.active"
    );
    let listMaxPage = document.querySelectorAll(
      "#app > div.manga > div.alllc > ul.pagination > li > a"
    );
    let listPage = "";
    if (listCurrentPage != null && listMaxPage != null) {
      if (!listMaxPage[listMaxPage.length - 1].innerText.includes("Próximo"))
        listMaxPage = listCurrentPage.innerText;
      else listMaxPage = listMaxPage[listMaxPage.length - 2].innerText;
      listPage = " - Página " + listCurrentPage.innerText + "/" + listMaxPage;
    }
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Lista de Mangás" + listPage;
    let GenerosN = document.querySelector(
      "#app > div.manga > div.alllc > div.multiselect.boxgenman > div.multiselect__tags > div.multiselect__tags-wrap"
    );
    if (GenerosN != null && GenerosN.innerText.trim())
      presenceData.state =
        "Gêneros: " + GenerosN.innerText.split("\n").join(", ");
  } else if (pathName.startsWith("/equipe") && !notfound) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Equipe";
  } else if (pathName.startsWith("/perfil/") && !notfound) {
    function PerfilStatus(detail, state) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = detail;
      presenceData.state = state;
    }
    if (pathName.split("/").slice(-1)[0] != "editar")
      PerfilStatus(
        "Olhando um Perfil:",
        document.querySelector("#capapl > b").textContent
      );
    else if (pathName.split("/").length == 4) {
      let user = document
        .querySelector(
          "#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a"
        )
        .href.split("/")
        .slice("-1")[0];
      if (user == pathName.split("/").slice(-2)[0])
        PerfilStatus("Editando Perfil", user);
      else PerfilStatus("Olhando um Perfil:", pathName.split("/").slice(-2)[0]);
    }
  } else if (pathName.startsWith("/manga/") && !notfound) {
    let MangaDefaultName = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
    );
    let MangaAltNames = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.lef > div.altt"
    );
    let MangaName = "...";
    if (MangaDefaultName != null && MangaDefaultName.innerText.trim()) {
      MangaAltNames == null || !MangaAltNames.innerText.trim()
        ? (MangaAltNames = "")
        : (MangaAltNames = " (" + MangaAltNames.innerText + ")");
      MangaName = MangaDefaultName.innerText + MangaAltNames;
    }
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Olhando um Mangá:";
    presenceData.state = MangaName;
  } else if (pathName.startsWith("/leitor/") && !notfound) {
    let manga = document.querySelector("b.f20").textContent;
    let chapter = document
      .querySelector("b.f14c")
      .innerText.replace(" - ", ": ");
    let page = document.querySelector("select.backgsla.frightrr").value;
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
    let scanName = document.querySelector(
      "#app > div.scan > div.contentscan > div > h2"
    );
    let scanCurrentPage = document.querySelector(
      "#app > div.scan > div.contentscan > div > ul.pagination > li.active > a"
    );
    let scanMaxPage = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > ul.pagination > li > a"
    );
    let scanPage = "";
    if (scanCurrentPage != null && scanMaxPage != null) {
      if (!scanMaxPage[scanMaxPage.length - 1].innerText.includes("Próximo"))
        scanMaxPage = scanCurrentPage.innerText;
      else scanMaxPage = scanMaxPage[scanMaxPage.length - 2].innerText;
      scanPage = " - Página " + scanCurrentPage.innerText + "/" + scanMaxPage;
    }
    let scanMembers = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > div.membrosscan > b"
    ).length;
    scanMembers != 0
      ? (scanMembers = " - " + scanMembers.toString() + " Membros")
      : (scanMembers = "");
    if (scanName != null && scanName.innerText.trim()) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Olhando um Scan Perfil:";
      presenceData.state = scanName.innerText + scanMembers + scanPage;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
