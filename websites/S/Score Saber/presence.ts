const presence = new Presence({
    clientId: "833644176967991346"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("time"),
    privacy = await presence.getSetting("privacy"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };

  if (document.location.pathname.includes("/global"))
    if (document.location.href.includes("search=")) {
      presenceData.details = "Searching Users";
      presenceData.state = document
        .querySelector("input.input")
        .getAttribute("value");
    } else if (document.location.href.includes("country=")) {
      presenceData.details =
        "Browsing " +
        document.location.href.split("=")[1].toUpperCase() +
        " Rankings";
      if (!document.location.href.includes("?country="))
        presenceData.state =
          "Page " + document.location.href.split("/")[4].split("&")[0];
      else presenceData.state = "Page 1";
    } else {
      presenceData.details = "Browsing Global Rankings";
      if (document.location.href.includes("/global/"))
        presenceData.state = "Page " + document.location.href.split("/")[4];
      else presenceData.state = "Page 1";
    }
  else if (document.location.pathname.includes("/rankings"))
    presenceData.details = "Browsing Global Rankings";
  else if (document.location.pathname.includes("/faq"))
    presenceData.details = "Viewing FAQ";
  else if (document.location.pathname.includes("/leaderboard"))
    if (document.location.pathname.includes("/leaderboard/")) {
      presenceData.details = "Viewing Leaderboard";
      presenceData.state = document.querySelector("h4 > a").textContent;
      presenceData.smallImageKey = document
        .querySelector("li.is-active > a > span")
        .textContent.toLowerCase()
        .replace("+", "_");
      presenceData.smallImageText = document.querySelector(
        "li.is-active > a > span"
      ).textContent;
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else presenceData.details = "Viewing Leaderboard";
  else if (document.location.pathname.includes("/ranking/requests"))
    presenceData.details = "Browsing Rank Requests";
  else if (document.location.pathname.includes("/ranking/request")) {
    presenceData.details = "Viewing Rank Request";
    presenceData.state = document.querySelector(
      "h4.title.is-5.songInfos > a"
    ).textContent;
    presenceData.smallImageKey = document
      .querySelector("li.is-active > a > span")
      .textContent.toLowerCase()
      .replace("+", "_");
    presenceData.smallImageText = document.querySelector(
      "li.is-active > a > span"
    ).textContent;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/u/")) {
    presenceData.details = "Viewing User";
    presenceData.state =
      document.querySelector("h5.title.is-5 > a").textContent.slice(0, -9) +
      "(" +
      document
        .querySelectorAll("div.column > ul > li")
        .item(1)
        .textContent.split(":")[1]
        .slice(1) +
      ")";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname == "/") {
    if (document.location.href.includes("search=")) {
      presenceData.details = "Searching Leaderboards";
      presenceData.state = document
        .querySelector("input.input")
        .getAttribute("value");
    } else presenceData.details = "Browsing Leaderboards";
  }

  if (!time) delete presenceData.startTimestamp;

  if (!buttons) delete presenceData.buttons;

  if (privacy) {
    delete presenceData.state, delete presenceData.buttons;
  }

  presence.setActivity(presenceData);
});
