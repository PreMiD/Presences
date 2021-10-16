const presence = new Presence({
    clientId: "687352219598585905"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "animeradio"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.host === "www.animeradio.de") {
    if (document.location.pathname.includes("/webplayer/")) {
      presenceData.details = "Hört AnimeRadio";
      presenceData.smallImageKey = "play";
    } else if (document.URL.includes("top100"))
      presenceData.details = "Betrachtet Top100";
    else if (document.URL.includes("events"))
      presenceData.details = "Betrachtet Events";
    else if (document.URL.includes("programm"))
      presenceData.details = "Betrachtet Programm";
  } else if (document.location.host === "www.animetreff.de") {
    presenceData.largeImageKey = "animetreff";
    if (document.URL.includes("/CustomPage/?id=1")) {
      presenceData.details = "Chattet";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/gallery/")) {
      if (document.location.pathname.includes("/Image/")) {
        presenceData.details = "Betrachtet Bild";
        presenceData.state = document.querySelector(
          "#content > header > h1"
        ).textContent;
      } else if (document.location.pathname.includes("/Album/")) {
        presenceData.details = "Betrachtet Album";
        presenceData.state = document
          .querySelector("#content > header > h1")
          .textContent.replace(
            document.querySelector("#content > header > h1 > span").textContent,
            ""
          );
      } else if (document.location.pathname.includes("/AlbumList/"))
        presenceData.details = "Betrachtet Galerie";
    } else if (document.location.pathname.includes("/calendar/")) {
      presenceData.details = "Betrachtet Kalender";
      presenceData.state = document.querySelector(
        "#content > header > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/MemberList/"))
      presenceData.details = "Betrachtet Mitglieder";
    else if (document.location.pathname.includes("/User/"))
      presenceData.details = "Betrachtet Nutzer";
    else if (document.location.pathname.includes("/Thread/")) {
      presenceData.details = "Liest Beiträge:";
      presenceData.state = document.querySelector(
        "#content > header > h1 > a"
      ).textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/Board/")) {
      presenceData.details = `Betrachtet ${
        document.querySelector("#content > header > h1 > a").textContent
      }`;
    } else if (document.location.pathname.includes("/Search/")) {
      if (document.querySelector("#errorMessage") !== null) {
        presenceData.details = `Sucht nach ${
          document
            .querySelector("#errorMessage")
            .textContent.split("„")[1]
            .split("“")[0]
        }`;
      } else {
        presenceData.details = `Sucht nach ${
          document.querySelector("#content > header > p > strong").textContent
        }`;
      }
    } else presenceData.details = "Stöbert in den Foren";
  } else if (document.location.host === "www.animenews.de") {
    presenceData.largeImageKey = "animenews";
    presenceData.details = "Liest Neuigkeiten";
    presenceData.smallImageKey = "reading";
  } else if (document.location.host === "www.animekino.de") {
    presenceData.largeImageKey = "animekino";
    if (document.URL.includes("partner"))
      presenceData.details = "Betrachtet Partner";
    else if (document.URL.includes("kontakt"))
      presenceData.details = "Betrachtet Kontakt";
    else if (document.URL.includes("ort"))
      presenceData.details = "Betrachtet Ort";
    else if (document.URL.includes("filme"))
      presenceData.details = "Betrachtet Filmvorstellungen";
    else presenceData.details = "Betrachtet Kino";
  } else if (document.location.host === "www.animehamburg.de") {
    if (document.URL.includes("partner"))
      presenceData.details = "Betrachtet Partner";
    else if (document.URL.includes("kontakt"))
      presenceData.details = "Betrachtet Kontakt";
    else if (document.URL.includes("ort"))
      presenceData.details = "Betrachtet Ort";
    else if (document.URL.includes("programm"))
      presenceData.details = "Betrachtet Programm";
    else presenceData.details = "Betrachtet Hanmaco";
  } else if (document.location.host === "www.animekultur.de") {
    if (document.URL.includes("joinus")) {
      presenceData.details = "Will ein Mitglied werden";
      presenceData.smallImageKey = "writing";
    } else if (document.URL.includes("projekte"))
      presenceData.details = "Betrachtet Projekte";
    else if (document.URL.includes("pressemitteilungen"))
      presenceData.details = "Betrachtet Pressemitteilungen";
    else if (document.URL.includes("marketing"))
      presenceData.details = "Betrachtet Marketing";
    else if (document.URL.includes("kontakt"))
      presenceData.details = "Betrachtet Kontakt";
    else if (document.URL.includes("hajime"))
      presenceData.details = "Betrachtet Hanjime! Anime-Con";
    else presenceData.details = "Betrachtet Kultur / Über uns";
  } else if (document.location.host === "www.animetickets.de") {
    if (document.location.pathname.includes("/event/")) {
      presenceData.details = "Betrachtet Eventtickets für";
      presenceData.state = document.querySelector(
        "body > div > div > div > div:nth-child(2) > span"
      ).textContent;
    } else if (document.location.pathname.includes("/events"))
      presenceData.details = "Betrachtet Events";
    else if (document.location.pathname.includes("contact"))
      presenceData.details = "Betrachtet Kontakt";
    else if (document.location.pathname.includes("order"))
      presenceData.details = "Betrachtet Order";
  } else if (document.location.host === "www.animemesse.de") {
    presenceData.largeImageKey = "animemesse";
    presenceData.details = `Betrachtet ${
      document.querySelector("#content > li.active > a").textContent
    }`;
  } else if (document.location.host === "www.animefanshop.de") {
    presenceData.largeImageKey = "animefanshop";
    const product = document.querySelector(
      ".product-info-title-desktop > span"
    );
    if (product !== null) {
      presenceData.details = "Betrachtet Produkt:";
      presenceData.state = product.textContent;
    } else if (document.location.pathname.includes("/advanced_search_result")) {
      presenceData.details = `Sucht nach ${
        document
          .querySelector("#main > div > h1")
          .textContent.split('"')[1]
          .split('"')[0]
      }`;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
