const presence = new Presence({
    clientId: "811572600294735902"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement, title: Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    page = window.location.pathname,
    host = document.location.hostname;

  presenceData.startTimestamp = browsingStamp;
  if (host == "www.marktplaats.nl") {
    if (page == "/") {
      search = document.querySelector("#category-keywords");
      if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching For:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "The homepage";
      }
    }
    if (page == "/plaats") {
      search = document.querySelector("#category-keywords");
      if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Selling:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "writing";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Sell an item";
        presenceData.smallImageKey = "writing";
      }
    }
    if (page == "/m/auto/auto-verkopen/" || page == "/m/auto/auto-verkopen") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:";
      presenceData.state = "Selling a car";
      presenceData.smallImageKey = "writing";
    }
    if (page.includes("/c/")) {
      if (page.includes("/auto-s/")) {
        presenceData.details = "Viewing Category:";
        presenceData.state = "Auto's";
      } else {
        const numberPat = "[0-9]+",
          r = new RegExp("/c" + numberPat),
          r2 = new RegExp("/c" + numberPat + "/");
        if (r2.test(page)) {
          title = document.querySelector(
            "div.bucket-page.active > h2.bucket-title.heading.heading-3"
          );
          if (title.textContent.includes("Alle categorieën in")) {
            title.textContent = title.textContent.replace(
              "Alle categorieën in",
              ""
            );
          }
          presenceData.details = "Viewing Category:";
          presenceData.state = title.textContent;
        } else if (r.test(page)) {
          title = document.querySelector("#content > h1");
          presenceData.details = "Viewing Category:";
          presenceData.state = title.textContent;
        }
      }
    } else if (page.includes("/a/")) {
      title = document.querySelector("#title");
      presenceData.details = "Viewing Item:";
      presenceData.state = title.textContent;
    } else if (page.includes("/u/")) {
      title = document.querySelector(
        "#content > section > div > div.mp-TopSection > div > div"
      );
      presenceData.details = "Viewing User:";
      presenceData.state = title.textContent;
    }
    if (page.includes("/q/")) {
      search = document.querySelector("#input");
      if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching For:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Items About:";
        presenceData.state = window.location.href
          .replace("https://www.marktplaats.nl/q/", "")
          .replace("/", "");
      }
    }
    if (page.includes("/l/auto-s/")) {
      search = document.querySelector("#input");
      if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching For:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Auto's";
      }
    }
    if (page.includes("/veilig-en-succesvol/")) {
      title = document.querySelector(
        "#hero-top > section > div > div.column > div > div:nth-child(1) > h1"
      );
      presenceData.details = "Reading about:";
      presenceData.state = title.textContent;
      presenceData.smallImageKey = "reading";
    }
    if (page == "/i/help/contact/") {
      presenceData.details = "Reading about:";
      presenceData.state = "Contact";
      presenceData.smallImageKey = "reading";
    } else if (page.includes("/i/help/")) {
      if (
        page ==
        "/i/help/over-marktplaats/voorwaarden-en-privacybeleid/privacyverklaring/"
      ) {
        presenceData.details = "Reading about:";
        presenceData.state = "Privacyverklaring";
        presenceData.smallImageKey = "reading";
      } else if (page.includes("/voorwaarden-en-privacybeleid/")) {
        title = document.querySelector(
          "#content > div.tabs-submenu > div.main-content > h3"
        );
        if (title == null) {
          title = document.querySelector(
            "#page-wrapper > div > div.content > main > h2"
          );
          if (title == null) {
            title = document.querySelector(
              "#page-wrapper > div > div.content > main > h3"
            );
          }
        }
        presenceData.details = "Reading about:";
        presenceData.state = title.textContent;
        presenceData.smallImageKey = "reading";
      } else {
        title = document.querySelector(
          "#page-wrapper > div > div.content > main > div > h3"
        );
        presenceData.details = "Reading about:";
        presenceData.state = title.textContent;
        presenceData.smallImageKey = "reading";
      }
    }
    if (page == "/messages") {
      presenceData.details = "Viewing:";
      presenceData.state = "My Messages";
    } else if (page.includes("/messages/")) {
      title = document.querySelector("div.AdvertisementSnippetMolecule-title");
      presenceData.details = "Viewing messages about:";
      presenceData.state = title.textContent;
    }
    if (page == "/notifications") {
      presenceData.details = "Viewing:";
      presenceData.state = "My Notifications";
    }
    if (page.includes("/sell/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Ads";
    } else if (page.includes("/favorites/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Favourites";
    } else if (page.includes("/saved-searches/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Saved Searches";
    } else if (page.includes("/favorite-sellers/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Favourite Sellers";
    } else if (page.includes("/recently-viewed/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Recently Seen Ads";
    } else if (page.includes("/profile/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Profile";
    }
  } else if (host == "help.marktplaats.nl") {
    search = document.querySelector("#\\31 37\\:0");
    title = document.querySelector("head > title");
    if (page == "/s/") {
      if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Helpdesk searching for:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking out the helpdesk";
      }
    }
    if (page.includes("/topic/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Helpdesk viewing:";
      presenceData.state = title.textContent.replace(" | Helpdesk", "");
      presenceData.smallImageKey = "reading";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
