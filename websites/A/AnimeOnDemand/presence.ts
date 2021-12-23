const presence = new Presence({
    clientId: "639583736970739733"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let user: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "aod",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/anime/")) {
    user = document.querySelector(
      "body > div.l-off-canvas-container > div.l-mainsection > div > div:nth-child(1) > h1"
    );
    presenceData.details = "Viewing anime:";
    presenceData.smallImageKey = "reading";
    presenceData.state = user.textContent;
  } else if (document.location.pathname.includes("/animes"))
    presenceData.details = "Browsing for animes";
  else if (document.location.pathname.includes("/myanimes"))
    presenceData.details = "Viewing their animes";
  else if (document.location.pathname.includes("/articles/category")) {
    title = document.querySelector("head > title");
    presenceData.details = "Viewing articles category:";
    presenceData.state = title.textContent
      .replace("Anime-News: ", "")
      .replace(" | Anime on Demand", "");
  } else if (document.location.pathname.includes("/articles"))
    presenceData.details = "Viewing articles";
  else if (document.location.pathname.includes("/article/")) {
    presenceData.smallImageKey = "reading";
    title = document.querySelector(
      "body > div.l-off-canvas-container > div.l-mainsection > div > h1"
    );
    presenceData.details = "Reading article:";
    presenceData.state = title.textContent;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
