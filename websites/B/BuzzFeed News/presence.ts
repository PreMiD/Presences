const presence = new Presence({
  clientId: "651445584955310100"
});

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    article = document.querySelector(
      "#js-post-container > div > div.grid-layout-main.xs-mb2.lg-mb0 > header > h1"
    ),
    sections = document.querySelector(
      "#news-content > div.content-column.xs-mt2.lg-mt0.md-mb4 > h1 > span"
    ),
    presenceData: PresenceData = {
      largeImageKey: "bfnews-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (page.includes("/section")) {
    presenceData.details = "Viewing To Section:";
    presenceData.state = sections.textContent;
  } else if (page.includes("/article")) {
    presenceData.details = "Reads a Article:";
    presenceData.state = article.textContent;
  } else {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Homepage";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
