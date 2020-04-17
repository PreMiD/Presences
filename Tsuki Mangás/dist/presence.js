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

  var notfound = document.getElementsByClassName("notfound").length == 0;
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Início";
  } else if (document.location.pathname.includes("/lista-mangas") && notfound) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Lista de Mangás";
    var GenerosN = document.querySelector(
      "#app > div.manga > div.alllc > div.multiselect.boxgenman > div.multiselect__tags > div.multiselect__tags-wrap"
    ).innerText;
    if (GenerosN.toString().trim()) {
      presenceData.state = GenerosN.toString().split("\n").join(", ");
    }
  } else if (document.location.pathname.includes("/equipe") && notfound) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Equipe";
  } else if (document.location.pathname.includes("/perfil/") && notfound) {
    function PerfilStatus(detail, state) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = detail;
      presenceData.state = state;
    }
    if (document.location.pathname.split("/").slice(-1)[0] != "editar")
      PerfilStatus("Vendo um perfil", document.querySelector("#capapl > b").textContent);
    else if (document.location.pathname.split("/").length == 4) {
      var user = document.querySelector(
        "#app > header > div.wrap > nav#menu > li.drop.mbl > ul.drop_menu > a"
      ).href.toString().split(document.location.origin).join("").split("/").slice(-1)[0];
      if (user == document.location.pathname.split("/").slice(-2)[0])
        PerfilStatus("Editando perfil", user)
      else PerfilStatus("Vendo um perfil", document.location.pathname.split("/").slice(-2)[0]);
    }
  } else if (document.location.pathname.includes("/manga") && notfound) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Vendo o mangá";
    presenceData.state = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
    ).innerText;
  } else if (document.location.pathname.includes("/leitor/") && notfound) {
    var manga = document.querySelector("b.f20").textContent;
    var chapter = document.querySelector("b.f14c").innerText;
    var page = document.querySelector("select.backgsla.frightrr").value;
    isNaN(page) ? page = "Páginas abertas" : page = "Página " + page;
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = manga;
    presenceData.state = chapter + " - " + page;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});