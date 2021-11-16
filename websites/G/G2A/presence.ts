const presence = new Presence({
    clientId: "633805202868273153"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: string | HTMLElement | Element, title: string | HTMLElement | Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "g2alogo"
  };

  if (document.location.hostname === "www.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/wishlist"))
      presenceData.details = "Viewing their wishlist";
    else if (document.location.pathname.includes("/cart"))
      presenceData.details = "Viewing their cart";
    else if (document.location.pathname.includes("/search")) {
      presenceData.details = "Searching for:";
      presenceData.state = (title as HTMLElement).innerText
        .replace('" - G2A.COM', "")
        .replace('Search results - "', "");
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/category")) {
      presenceData.details = "Viewing category:";
      title = document.querySelector("head > title");
      presenceData.state = (title as HTMLElement).innerText.replace(
        " - G2A.COM",
        ""
      );
    } else if (
      document.querySelector(
        "#app > div > div.content > div > article > header > div > div > h1 > span"
      ) !== null
    ) {
      presenceData.details = "Viewing item:";
      title = document.querySelector(
        "#app > div > div.content > div > article > header > div > div > h1 > span"
      );
      presenceData.state = (title as HTMLElement).innerText;
    } else if (document.location.pathname.includes("/user")) {
      presenceData.details = "Viewing user:";
      user = document.querySelector(
        "#app > div > div.content > div > div > div > section > div.user-info > button > strong"
      );
      presenceData.state = (user as HTMLElement).innerText;
    } else if (document.location.pathname.includes("/goldmine"))
      presenceData.details = "Using the goldmine";
    else if (document.location.pathname.includes("/news/")) {
      presenceData.startTimestamp = browsingStamp;
      title = document.querySelector(
        "body > div.single-article.single-article--feature.default-template > div.review-top > div.review-top__wrapper > div > header > h1"
      );
      if (!title) presenceData.details = "Browsing news section";
      else {
        presenceData.details = "News - Reading:";
        presenceData.state = (title as HTMLElement).innerText;
        presenceData.smallImageKey = "reading";
      }
    }
  } else if (document.location.hostname === "id.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their account details";
  } else if (document.location.hostname === "dashboard.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their dashboard";
  } else if (document.location.hostname === "pay.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Using G2A Pay";
  } else if (document.location.hostname === "plus.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "G2A Plus - Viewing:";
    title = document.querySelector("head > title");
    presenceData.state = (title as HTMLElement).innerText.replace(
      " - G2A Plus",
      ""
    );
  } else if (document.location.hostname === "loot.g2a.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname === "/")
      presenceData.details = "Browsing G2A Loot";
    else {
      presenceData.details = "G2A Loot - Viewing:";
      title = document.querySelector("head > title");
      presenceData.state = (title as HTMLElement).innerText.replace(
        " - G2A Loot",
        ""
      );
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
