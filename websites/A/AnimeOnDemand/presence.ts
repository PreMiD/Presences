const presence = new Presence({
    clientId: "639583736970739733"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "aod"
  };

  if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("/anime/")) {
    presenceData.startTimestamp = browsingStamp;
    user = document.querySelector(
      "body > div.l-off-canvas-container > div.l-mainsection > div > div:nth-child(1) > h1"
    );
    presenceData.details = "Viewing anime:";
    presenceData.smallImageKey = "reading";
    presenceData.state = user.innerText;
  } else if (document.location.pathname.includes("/animes")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing for animes";
  } else if (document.location.pathname.includes("/myanimes")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their animes";
  } else if (document.location.pathname.includes("/articles/category")) {
    presenceData.startTimestamp = browsingStamp;
    title = document.querySelector("head > title");
    presenceData.details = "Viewing articles category:";
    presenceData.state = title.innerText
      .replace("Anime-News: ", "")
      .replace(" | Anime on Demand", "");
  } else if (document.location.pathname.includes("/articles")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing articles";
  } else if (document.location.pathname.includes("/article/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    title = document.querySelector(
      "body > div.l-off-canvas-container > div.l-mainsection > div > h1"
    );
    presenceData.details = "Reading article:";
    presenceData.state = title.innerText;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
