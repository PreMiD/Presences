const presence = new Presence({
  clientId: "684627733145452555"
});

let presenceData: PresenceData;
const browsingStamp = Math.floor(Date.now() / 1000);

function PerfilStatus(detail, state): void {
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = detail;
  presenceData.state = state;
}

presence.on("UpdateData", () => {
  presenceData = {
    largeImageKey: "logo"
  };

  const pathName = window.location.pathname;
  const notfound =
    pathName == "/404" ||
    document.getElementsByClassName("notfound").length != 0;
  if (pathName == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Início";
  } else if (pathName.startsWith("/lista-mangas") && !notfound) {
    const listCurrentPage = document.querySelector(
      "#app > div.manga > div.alllc > ul.pagination > li.active"
    );
    let listMaxPage: any = document.querySelectorAll(
      "#app > div.manga > div.alllc > ul.pagination > li > a"
    );
    let listPage = "";
    if (listCurrentPage != null && listMaxPage != null) {
      if (!listMaxPage[listMaxPage.length - 1].textContent.includes("Próximo"))
        listMaxPage = listCurrentPage.textContent;
      else listMaxPage = listMaxPage[listMaxPage.length - 2].textContent;
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
    if (pathName.split("/").slice(-1)[0] != "editar")
      PerfilStatus(
        "Olhando um Perfil:",
        document.querySelector("#capapl > b").textContent
      );
    else if (pathName.split("/").length == 4) {
      const user = (document.querySelector(
        "#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a"
      ) as HTMLLinkElement).href
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
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Olhando um Mangá:";
    presenceData.state = MangaName;
  } else if (pathName.startsWith("/leitor/") && !notfound) {
    const manga = document.querySelector("b.f20").textContent;
    const chapter = document
      .querySelector("b.f14c")
      .textContent.replace(" - ", ": ");
    let page = (document.querySelector(
      "select.backgsla.frightrr"
    ) as HTMLInputElement).value;
    isNaN(parseInt(page))
      ? (page = "Páginas abertas")
      : (page = "Página " + page);
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
    let scanMaxPage: any = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > ul.pagination > li > a"
    );
    let scanPage = "";
    if (scanCurrentPage != null && scanMaxPage != null) {
      if (!scanMaxPage[scanMaxPage.length - 1].textContent.includes("Próximo"))
        scanMaxPage = scanCurrentPage.textContent;
      else scanMaxPage = scanMaxPage[scanMaxPage.length - 2].textContent;
      scanPage = " - Página " + scanCurrentPage.textContent + "/" + scanMaxPage;
    }
    let scanMembers: any = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > div.membrosscan > b"
    ).length;
    scanMembers != 0
      ? (scanMembers = " - " + scanMembers.toString() + " Membros")
      : (scanMembers = "");
    if (scanName != null && scanName.textContent.trim()) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Olhando um Scan Perfil:";
      presenceData.state = scanName.textContent + scanMembers + scanPage;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
