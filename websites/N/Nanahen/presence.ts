const presence = new Presence({
    clientId: "898197972490256404"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

presence.on("UpdateData", async () => {
  switch (
    document.location.pathname.endsWith("/") &&
    document.location.pathname.length > 1
      ? document.location.pathname.slice(
          0,
          document.location.pathname.length - 1
        )
      : document.location.pathname
  ) {
    case "/":
      presenceData.details = "Viewing homepage...";
      break;
    case "/bookmark":
      presenceData.details = "Viewing my bookmarks...";
      break;
    case "/all-series":
      presenceData.details = "Viewing all series...";
      break;
    case "/authors":
      presenceData.details = "Viewing author list...";
      break;
    case "/parodies":
      presenceData.details = "Viewing parody list...";
      break;
    case "/genres":
      presenceData.details = "Viewing genre list...";
      break;
    case "/tags":
      presenceData.details = "Viewing tags list...";
      break;
    case "/about-us":
      presenceData.details = "Viewing about us...";
      break;
    case "/disclaimer":
      presenceData.details = "Viewing disclaimer...";
      break;
    default: {
      if (document.location.pathname.includes("/adv-search/")) {
        presenceData.details = "Searching doujin...";
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("/show/genre/")) {
        const genres = document.querySelector(
          "body > main > div > div > h2"
        ).textContent;
        presenceData.details = "Searching by genres...";
        presenceData.state = genres;
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("/show/tags/")) {
        const genres = document.querySelector(
          "body > main > div > div > h2"
        ).textContent;
        presenceData.details = "Searching by tags...";
        presenceData.state = genres;
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("/show/parody/")) {
        const genres = document.querySelector(
          "body > main > div > div > h2"
        ).textContent;
        presenceData.details = "Searching by parody...";
        presenceData.state = genres;
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("/show/authors/")) {
        const genres = document.querySelector(
          "body > main > div > div > h2"
        ).textContent;
        presenceData.details = "Viewing archive authors...";
        presenceData.state = genres;
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.startsWith("/show/series/")) {
        const name = document.querySelector(
          "body > main > div > div > div.container > div > div.series-flexright > div.series-title > h2"
        ).textContent;
        presenceData.details = "Viewing a page...";
        presenceData.state = name;
        presenceData.buttons = [
          { label: "View Manga", url: document.location.href }
        ];
      }
      const readManga = document.querySelector(".reader-area");
      if (readManga) {
        const manga = document.querySelector(
            "#chapnav > div > div.infox > span.title"
          ).textContent,
          chapter = document.querySelector(
            "#chapnav > div > div.infox > span.chapter"
          ).textContent;
        presenceData.details = `Reading ${manga}`;
        presenceData.state = chapter;
        presenceData.buttons = [
          { label: "Read Manga", url: document.location.href }
        ];
      }
      break;
    }
  }

  presence.setActivity(presenceData);
});
