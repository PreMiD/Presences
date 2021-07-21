const presence = new Presence({
    clientId: "640980262750126080"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tmo"
  };

  if (document.location.hostname == "lectortmo.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
    } else if (document.location.pathname.includes("/library/manga/")) {
      presenceData.startTimestamp = browsingStamp;
      const user = document.querySelector(
        "#app > section > header > section > div > div > div:nth-child(3) > h1"
      );
      presenceData.details = "Viewing manga:";
      presenceData.state = user.textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/library")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the library";
    } else if (document.location.pathname.includes("/groups/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing group:";
      presenceData.state = document.querySelector(
        "#app > section > header > section > div > div > div:nth-child(2) > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/groups")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing groups";
    } else if (document.location.pathname.includes("/lists/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing group:";
      presenceData.state = document.querySelector(
        "#app > section > header > section > div > div > div:nth-child(2) > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/lists")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing groups";
    } else if (document.location.pathname.includes("/viewer/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading manga:";
      presenceData.smallImageKey = "reading";
      presenceData.state = document.querySelector(
        "#app > section:nth-child(2) > div > div > h1"
      ).textContent;
    }
  } else if (document.location.hostname == "tmocommunity.com") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing the forums...";
    if (document.location.pathname.includes("/d/")) {
      presenceData.details = "Reading forum post:";
      presenceData.state = document.querySelector(
        "#content > div > div > header > div > ul > li.item-title > h2"
      ).textContent;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
