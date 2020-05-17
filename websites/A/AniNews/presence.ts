var presence = new Presence({
  clientId: "651244193624096778"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title = document
  .querySelector("#content h1")
  .textContent.replace(document.querySelector("#content h1 i").textContent, "")
  .trim();
presence.on("UpdateData", async () => {
  var presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname.includes("/resenhas/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Lendo uma resenha:";
    presenceData.state = document.querySelector("#noticia_titulo").textContent;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/noticia/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Lendo uma notícia:";
    presenceData.state = document.querySelector("#noticia_titulo").textContent;
    presenceData.smallImageKey = "reading";
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details =
      "Vendo a" + (document.location.pathname == "/" ? "s " : " ") + title;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
