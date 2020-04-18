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
  } else if (document.location.pathname.includes("/equipe")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Equipe";
  } else if (document.location.pathname.includes("/perfil/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Vendo um perfil";
    presenceData.state = document.querySelector("#capapl > b").textContent;
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
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = manga + " - " + chapter;
    presenceData.state = "Página " + page;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
