var presence = new Presence({
  clientId: "684627733145452555"
}),
  strings = presence.getStrings({
    reading: "presence.activity.reading"
  });

var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  let presenceData = {
    largeImageKey: "logo"
  };

  var notfound = (document.location.pathname == "/404") || (document.getElementsByClassName("notfound").length != 0);
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Início";
  } else if (document.location.pathname.startsWith("/lista-mangas") && !notfound) {
    var listCurrentPage = document.querySelector(
      "#app > div.manga > div.alllc > ul.pagination > li.active"
    );
    var listMaxPage = document.querySelectorAll(
      "#app > div.manga > div.alllc > ul.pagination > li > a"
    );
    var listPage = "";
    if (listCurrentPage != null && listMaxPage != null) {
      if (!listMaxPage[listMaxPage.length - 1].innerText.includes("Próximo"))
        listMaxPage = listCurrentPage.innerText;
      else listMaxPage = listMaxPage[listMaxPage.length - 2].innerText;
      listPage = " - Página " + listCurrentPage.innerText + "/" + listMaxPage;
    }
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Lista de Mangás" + listPage;
    var GenerosN = document.querySelector(
      "#app > div.manga > div.alllc > div.multiselect.boxgenman > div.multiselect__tags > div.multiselect__tags-wrap"
    );
    if (GenerosN != null && GenerosN.innerText.trim())
      presenceData.state = "Gêneros: " + GenerosN.innerText.split("\n").join(", ");
  } else if (document.location.pathname.startsWith("/equipe") && !notfound) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Equipe";
  } else if (document.location.pathname.startsWith("/perfil/") && !notfound) {
    function PerfilStatus(detail, state) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = detail;
      presenceData.state = state;
    }
    if (document.location.pathname.split("/").slice(-1)[0] != "editar")
      PerfilStatus(
        "Vendo um Perfil:",
        document.querySelector("#capapl > b").textContent
      );
    else if (document.location.pathname.split("/").length == 4) {
      var user = document
        .querySelector(
          "#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a"
        ).href.split("/").slice("-1")[0];
      if (user == document.location.pathname.split("/").slice(-2)[0])
        PerfilStatus("Editando Perfil", user);
      else
        PerfilStatus(
          "Vendo um Perfil:",
          document.location.pathname.split("/").slice(-2)[0]
        );
    }
  } else if (document.location.pathname.startsWith("/manga/") && !notfound) {
    var MangaDefaultName = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
    );
    var MangaAltNames = document.querySelector("#app > div.manga.mtopmanga > div.all > div.lef > div.altt");
    var MangaName = "...";
    if (MangaDefaultName != null && MangaDefaultName.innerText.trim()) {
      (MangaAltNames == null || !MangaAltNames.innerText.trim()) ? (MangaAltNames = "") : (MangaAltNames = " (" + MangaAltNames.innerText + ")");
      MangaName = MangaDefaultName.innerText + MangaAltNames;
    }
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Vendo um Mangá:";
    presenceData.state = MangaName;
  } else if (document.location.pathname.startsWith("/leitor/") && !notfound) {
    var manga = document.querySelector("b.f20").textContent;
    var chapter = document.querySelector("b.f14c").innerText.replace(" - ", ": ");
    var page = document.querySelector("select.backgsla.frightrr").value;
    isNaN(page) ? (page = "Páginas abertas") : (page = "Página " + page);
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = manga;
    presenceData.state = (chapter + " - " + page);
  } else if (document.location.pathname.startsWith("/scan/") && document.location.pathname != "/scan/" && !notfound) {
    var scanName = document.querySelector("#app > div.scan > div.contentscan > div > h2");
    var scanCurrentPage = document.querySelector(
      "#app > div.scan > div.contentscan > div > ul.pagination > li.active > a"
    );
    var scanMaxPage = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > ul.pagination > li > a"
    );
    var scanPage = "";
    if (scanCurrentPage != null && scanMaxPage != null) {
      if (!scanMaxPage[scanMaxPage.length - 1].innerText.includes("Próximo"))
        scanMaxPage = scanCurrentPage.innerText;
      else scanMaxPage = scanMaxPage[scanMaxPage.length - 2].innerText;
      scanPage = " - Página " + scanCurrentPage.innerText + "/" + scanMaxPage;
    }
    var scanMembers = document.querySelectorAll(
      "#app > div.scan > div.contentscan > div > div.membrosscan > b"
    ).length;
    (scanMembers != 0) ? (scanMembers = " - " + scanMembers.toString() + " Membros") : (scanMembers = "");
    if (scanName != null && scanName.innerText.trim()) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Vendo um Scan Perfil:";
      presenceData.state = (scanName.innerText + scanMembers + scanPage);
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});