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

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Início";
  } else if (document.location.pathname.includes("/lista-mangas")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Lista de Mangás";
    var GenerosN = document.querySelector(
      "#app > div.manga > div.alllc > div.multiselect.boxgenman > div.multiselect__tags > div.multiselect__tags-wrap"
    ).innerText;
    var ListaGeneros = [];
    ListaGeneros.push(GenerosN.split("\n"));
    ListaGeneros.join("");
    if (ListaGeneros.toString().trim())
      presenceData.state = ListaGeneros.toString().split(",").join(", ");
  } else if (document.location.pathname.includes("/equipe")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Equipe";
  } else if (document.location.pathname.includes("/perfil/") && document.location.pathname.split("/").slice(-1)[0] != "editar") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Vendo um perfil";
    presenceData.state = document.querySelector("#capapl > b").textContent;
  } else if (document.location.pathname.includes("/perfil/") && document.location.pathname.split("/").slice(-1)[0] == "editar") {
    var user = document.location.pathname.split("/").slice(-2)[0];
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Editando perfil";
    presenceData.state = user;
  } else if (document.location.pathname.includes("/manga")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Vendo o mangá";
    presenceData.state = document.querySelector(
      "#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
    ).innerText;
  } else if (document.location.pathname.includes("/leitor/")) {
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
