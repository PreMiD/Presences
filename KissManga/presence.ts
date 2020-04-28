var presence = new Presence({
  clientId: "619416396337643531"
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "kissmanga-logo"
  };

  var manga;

  if (document.location.pathname == "/") {
    (data.details = "Viewing Homepage"), (data.startTimestamp = browsingStamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/MangaList")) {
    (data.details = "Browsing Manga"), (data.startTimestamp = browsingStamp);
    presence.setActivity(data);
  } else if (document.location.pathname.includes("/Manga/")) {
    const mangacheck = document.querySelector("div.barContent .bigChar")
      ? true
      : false;
    if (mangacheck) {
      manga = document.querySelector("div.barContent .bigChar").textContent;
      (data.details = "Viewing a Manga"), (data.state = manga);
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      manga = document
        .querySelector("#headnav #navsubbar p a")
        .textContent.split("Manga")
        .pop()
        .split("information")[0];
      var chapter = document.querySelector("select.selectChapter option")
        .textContent;
      (data.details = "Reading " + manga.trim()), (data.state = chapter);
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
  }
});
