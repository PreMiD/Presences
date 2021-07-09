var presence = new Presence({
  clientId: "641409342566039558"
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ml"
  };

  if (document.location.hostname == "mangalivre.net") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
    } else if (
      document.querySelector(".page-navigation > span > em:nth-child(1)") !==
      null
    ) {
      presenceData.details =
        "Reading '" + document.querySelector(".title").textContent + "'";
      presenceData.state =
        "Chapter " +
        document
          .querySelector(".current-chapter")
          .textContent.replace("Chap ", "") +
        " - Page " +
        document.querySelector(".page-navigation > span > em:nth-child(1)")
          .textContent;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/manga/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the manga:";
      presenceData.state =
        document.querySelector(".series-title > h1").textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/lista-de-mangas")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing manga list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/lista-de-categorias")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing category list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/grupos")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing group list";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/scanlator/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing group:";
      presenceData.state = document.querySelector(".series-title").textContent;
    } else if (document.location.pathname.includes("/mangas/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing category:";
      presenceData.state = document
        .querySelector("#wraper > div > a > div > h2")
        .textContent.replace(
          document.querySelector("#wraper > div > a > div > h2 > div > span")
            .textContent,
          ""
        )
        .trim();
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
