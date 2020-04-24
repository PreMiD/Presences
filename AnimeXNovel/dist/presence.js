var presence = new Presence({
  clientId: "700596580218175548"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let resultsInfo, searchTab;
let titulo = document.title;
let pesquisaR = titulo.slice(77);
let tituloLength = titulo.length - 3;
let obraR = titulo.slice(0, tituloLength);
let capituloR = titulo.slice(tituloLength);
let removeanime = titulo.slice(7);
let obraanimeR = removeanime.slice(0, titulo.length - 18);
let listaR = titulo.slice(54);
let capitulo =
  document
    .querySelector("h2.post-title.entry-title")
    .textContent.match(/\d+/g) || null;
let obra = document.querySelector("h2.post-title.entry-title").textContent;
let noticia = document.querySelector("h2.post-title.entry-title").textContent;
presence.on("UpdateData", async () => {
  const data = {
    largeImageKey: "axn-logo"
  };
  if (document.location.pathname.indexOf("anime") != -1) {
    data.details = obraanimeR;
    data.state = "Episódio " + capituloR;
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/search")) {
    if (document.location.pathname.indexOf("/search/label/") != -1) {
      if (document.location.pathname.indexOf("/In%C3%ADcio") != -1) {
        data.details = "Página inícial";
        data.startTimestamp = browsingStamp;
      } else {
        data.details = "Vendo a lista de";
        data.state = listaR;
        data.startTimestamp = browsingStamp;
      }
    } else {
      data.details = "Pesquisando...";
      data.state = pesquisaR;
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.match("/", /^\d/, "/", /^\d/)) {
    if (
      capitulo === null &&
      document.querySelector("div.post-body.entry-content.cl div.ocultar") !=
        null
    ) {
      data.details = "Vendo página de obra";
      data.state = obra;
      data.startTimestamp = browsingStamp;
    } else if (
      document.querySelector("div.post-body.entry-content.cl div.ocultar") ==
      null
    ) {
      data.details = "Vendo página";
      data.state = noticia;
      data.startTimestamp = browsingStamp;
    } else {
      data.details = obraR;
      data.state = "Capítulo " + capituloR;
      data.startTimestamp = browsingStamp;
    }
  }
  presence.setActivity(data);
});
