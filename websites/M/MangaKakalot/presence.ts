const presence = new Presence({
    clientId: "698217762660548799"
  }),
  browsingStamp = ~~(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mangakakalot",
    startTimestamp: browsingStamp
  };

  switch (location.hostname) {
    case "mangakakalot.com": {
      if (document.location.pathname.includes("/chapter")) {
        const [title, chapterNum] = document
          .querySelector("div.info-top-chapter > h2")
          .textContent.split("Chapter");

        presenceData.details = title;
        presenceData.state = `CHAPTER ${chapterNum}`;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/manga_list")) {
        const [, genre] = document
          .querySelector(".breadcrumb.breadcrumbs > p > span:nth-child(3) > a")
          .textContent.split(":");

        presenceData.details = "Viewing genre:";
        presenceData.state = genre;
      } else if (
        location.pathname.includes("/manga") ||
        location.pathname.includes("/read")
      ) {
        presenceData.details = "Viewing manga:";
        presenceData.state = document.querySelector(
          ".manga-info-text > li > h1"
        ).textContent;
      } else if (location.pathname.includes("/latest"))
        presenceData.details = "Viewing the latest mangas";
      else if (document.location.pathname.includes("/search")) {
        const keyword = document
          .querySelector(".title.update-title")
          .textContent.split(" ")[1]
          .replace(/_/g, " ");

        presenceData.details = "Searching for:";
        presenceData.state = keyword;
        presenceData.smallImageKey = "search";
      } else presenceData.details = "Browsing...";
      break;
    }

    case "manganato.com": {
      if (location.pathname.includes("/chapter")) {
        const [title, chapterNum] = document
          .querySelector(".info-top-chapter > h2")
          .textContent.split("Chapter");

        presenceData.details = title;
        presenceData.state = `CHAPTER ${chapterNum}`;
        presenceData.smallImageKey = "reading";
      } else if (location.pathname.includes("/manga")) {
        const title = document.querySelector(
          ".story-info-right > h1"
        ).textContent;

        presenceData.details = "Viewing manga:";
        presenceData.state = title;
      } else if (location.pathname.includes("/genre")) {
        const [, genre] = document
          .querySelector(".panel-breadcrumb > a:nth-child(3)")
          .textContent.split(":");

        presenceData.details = "Viewing genre:";
        presenceData.state = genre;
      } else if (location.pathname.includes("/search")) {
        const keyword = document
          .querySelector(".panel-breadcrumb")
          .childNodes[4].textContent.split(":")[1]
          .trim()
          .replace(/_/g, " ");

        presenceData.details = "Searching for:";
        presenceData.state = keyword;
        presenceData.smallImageKey = "search";
      } else presenceData.details = "Browsing...";

      break;
    }

    case "readmanganato.com": {
      if (location.pathname.includes("/chapter")) {
        const [title, chapterNum] = document
          .querySelector(".panel-chapter-info-top > h1")
          .textContent.split("CHAPTER");

        presenceData.details = title;
        presenceData.state = `CHAPTER ${chapterNum}`;
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/manga")) {
        presenceData.details = "Viewing manga:";
        presenceData.state = document.querySelector(
          ".story-info-right > h1"
        ).textContent;
      }

      break;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
