const presence = new Presence({
  clientId: "698217762660548799"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mangakakalot"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.host == "mangakakalot.com") {
    if (document.location.pathname.includes("/chapter")) {
      presenceData.details = document
        .querySelector("body > div.info-top-chapter > h2")
        .textContent.split("Chapter")[0];
      presenceData.state =
        "Chapter" +
        document
          .querySelector("body > div.info-top-chapter > h2")
          .textContent.split("Chapter")[1];
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/manga_list")) {
      presenceData.details = "Viewing genre:";
      presenceData.state = document
        .querySelector(
          "body > div.container > div.main-wrapper > div.leftCol.listCol > div > div.breadcrumb.breadcrumbs > p > span:nth-child(3) > a"
        )
        .textContent.split(":")[1];
    } else if (document.location.pathname.includes("/manga")) {
      presenceData.details = "Viewing manga:";
      presenceData.state = document.querySelector(
        "body > div.container > div.main-wrapper > div.leftCol > div.manga-info-top > ul > li:nth-child(1) > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/latest")) {
      presenceData.details = "Viewing the latest mangas";
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching for:";
      presenceData.state = document.querySelector(
        "body > div.container > div.main-wrapper > div.leftCol > div.daily-update > h3"
      ).textContent;
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname == "/") {
      presenceData.details = "Browsing...";
    }
  } else {
    if (document.location.pathname.includes("/chapter")) {
      presenceData.details = document
        .querySelector(
          "body > div.body-site > div:nth-child(1) > div.panel-chapter-info-top > h1"
        )
        .textContent.split("CHAPTER")[0];
      presenceData.state =
        "CHAPTER" +
        document
          .querySelector(
            "body > div.body-site > div:nth-child(1) > div.panel-chapter-info-top > h1"
          )
          .textContent.split("CHAPTER")[1];
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/manga")) {
      presenceData.details = "Viewing manga:";
      presenceData.state = document.querySelector(
        "body > div.body-site > div.container.container-main > div.container-main-left > div.panel-story-info > div.story-info-right > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/genre")) {
      presenceData.details = "Viewing genre:";
      presenceData.state = document
        .querySelector(
          "body > div.body-site > div.container.container-main > div.panel-breadcrumb > a:nth-child(3)"
        )
        .textContent.split(":")[1];
    } else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching for:";
      presenceData.state =
        "Keyword: " +
        document
          .querySelector(
            "body > div.body-site > div.container.container-main > div.container-main-left > div.panel-breadcrumb"
          )
          .textContent.split("Keyword :")[1]
          .split(
            document.querySelector(
              "body > div.body-site > div.container.container-main > div.container-main-left > div.panel-breadcrumb > span:nth-child(3)"
            ).textContent
          )[0]
          .trim();
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname == "/") {
      presenceData.details = "Browsing...";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
