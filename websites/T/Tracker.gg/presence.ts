const trackerPresence = new Presence({ clientId: "929349462365704222" }),
  trackerBrowsing = Math.floor(Date.now() / 1000);

trackerPresence.on("UpdateData", async () => {
  const trackerPreData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: trackerBrowsing
    },
    trackerPage = window.location.pathname;

  if (trackerPage === "/") {
    trackerPreData.details = "Viewing Page:";
    trackerPreData.state = "Homepage";
  } else if (trackerPage === "/apps") {
    trackerPreData.details = "Viewing Page:";
    trackerPreData.state = "Tracker Apps";
  } else if (trackerPage === "/developers") {
    trackerPreData.details = "Viewing Page:";
    trackerPreData.state = "Developers";
  } else if (trackerPage === "/developers/apps/create") {
    trackerPreData.details = "Creating";
    trackerPreData.state = "Tracker Dev App";
  } else if (trackerPage.includes("/developers/apps")) {
    try {
      const appName: string = document
        .querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__analytics.card.bordered.responsive > header > div > div.left > div:nth-child(2) > div.title"
        )
        .textContent.replace("Dashboard", "");
      trackerPreData.details = "Editing App:";
      trackerPreData.state = appName;
      trackerPreData.smallImageKey = document
        .querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__details.card.responsive > div > div:nth-child(1) > div > img"
        )
        .getAttribute("src")
        .toString();
      trackerPreData.smallImageText = appName;
    } catch {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Developer Apps";
    }
  } else if (trackerPage.includes("/developers/docs")) {
    try {
      const title: string = document.querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div.docs > div.content-container > div > div > h1"
      ).textContent;
      trackerPreData.details = "Viewing Docs";
      trackerPreData.state = title;
    } catch {
      const game: string = document
        .querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.docs > div.content-container > div > div > header > h1"
        )
        .textContent.replace("apex", "")
        .replace("csgo", "")
        .replace("division-2", "")
        .replace("splitgate", "")
        .replace("hyper-scape", "")
        .replace("fortnite", "");
      trackerPreData.details = "Viewing API";
      trackerPreData.state = game;
    }
  } else if (trackerPage === "/overlays") {
    trackerPreData.details = "Viewing Page:";
    trackerPreData.state = "Overlays";
  } else if (trackerPage === "/overlays/editor") {
    trackerPreData.details = "Creating";
    trackerPreData.state = "Tracker Overlay";
  } else if (trackerPage === "/premium") {
    trackerPreData.details = "Viewing Page:";
    trackerPreData.state = "Premium";
  } else if (trackerPage === "/partners") {
    trackerPreData.details = "Viewing Page:";
    trackerPreData.state = "Partners";
  } else if (trackerPage === "/shop") {
    trackerPreData.details = "Viewing Page:";
    trackerPreData.state = "Shop";
  } else if (trackerPage === "/valorant") {
    trackerPreData.details = "Viewing Game:";
    trackerPreData.state = "Valorant";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage.includes("/valorant/profile")) {
    const playerName: string = document.querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span.trn-ign__username"
      ).textContent,
      playerTag: string = document.querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span.trn-ign__discriminator"
      ).textContent,
      image: string = document
        .querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > svg > image"
        )
        .getAttribute("href");
    trackerPreData.details = "Viewing Valorant Profile:";
    trackerPreData.state = playerName + playerTag;
    trackerPreData.smallImageKey = image;
    trackerPreData.smallImageText = playerName;
  } else if (trackerPage.includes("/valorant/leaderboards")) {
    if (trackerPage.includes("/valorant/leaderboards/ranked")) {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Leaderboards Ranked";
      trackerPreData.smallImageKey = "valorant";
      trackerPreData.smallImageText = "Valorant";
    } else if (trackerPage.includes("/valorant/leaderboards/stats")) {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Leaderboards Seasonal";
      trackerPreData.smallImageKey = "valorant";
      trackerPreData.smallImageText = "Valorant";
    }
  } else if (trackerPage.includes("/valorant/guides")) {
    if (trackerPage.includes("/clips/submit")) {
      trackerPreData.details = "Submitting Valorant Clip";
      trackerPreData.smallImageKey = "valorant";
      trackerPreData.smallImageText = "Valorant";
    } else if (trackerPage.includes("/clips")) {
      try {
        const stream: Element = document.querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > div.container.guide-tile__modal > div.content.animated > div > div > iframe"
        );
        if (stream) {
          trackerPreData.details = "Watching:";
          trackerPreData.state = "Valorant Lineup Clip";
          trackerPreData.smallImageKey = "valorant";
          trackerPreData.smallImageText = "Valorant";
        } else {
          trackerPreData.details = "Viewing:";
          trackerPreData.state = "Valorant Lineup Guides";
          trackerPreData.smallImageKey = "valorant";
          trackerPreData.smallImageText = "Valorant";
        }
      } catch {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "Valorant Lineup Guides";
        trackerPreData.smallImageKey = "valorant";
        trackerPreData.smallImageText = "Valorant";
      }
    } else if (trackerPage.includes("/dashboard")) {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "own Valorant Guides";
      trackerPreData.smallImageKey = "valorant";
      trackerPreData.smallImageText = "Valorant";
    } else {
      try {
        const guideName: string = document.querySelector(
            "#app > div.trn-wrapper > div.trn-container > div > main > article > div.guide__header > h1"
          ).textContent,
          authorName: string = document.querySelector(
            "#app > div.trn-wrapper > div.trn-container > div > main > article > div.guide__main > div > div.guide-main__hero.card.header-bordered.responsive > div.guide-main-metadata > div.guide-main__author.guide-main-metadata__author > span.guide-main__author-username"
          ).textContent;
        trackerPreData.details = "Reading Guide:";
        trackerPreData.state = guideName;
        trackerPreData.smallImageKey = "valorant";
        trackerPreData.smallImageText = `Written by ${authorName}`;
      } catch {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "Valorant Guides";
        trackerPreData.smallImageKey = "valorant";
        trackerPreData.smallImageText = "Valorant";
      }
    }
  } else if (trackerPage === "/valorant/lfg") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Looking for Group";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage === "/valorant/insights/agents") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Insights";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage === "/valorant/agents") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Agents";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage.includes("/valorant/agents")) {
    const agentName: string = document.querySelector(
      "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > div.agent-breadcrumbs > ol > li:nth-child(3) > a > span"
    ).textContent;
    trackerPreData.details = "Viewing Valorant Agent:";
    trackerPreData.state = agentName;
  } else if (trackerPage === "/valorant/weapons") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Weapons";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage.includes("/valorant/weapons")) {
    const weaponName: string = document.querySelector(
      "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > ol > li:nth-child(4) > a > span"
    ).textContent;
    trackerPreData.details = "Viewing Valorant Weapon:";
    trackerPreData.state = weaponName;
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage === "/valorant/maps") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Maps";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage.includes("/valorant/maps")) {
    const mapName: string = document
      .querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.no-card-margin.site-container.site-container--mobile-margin.site-container--background-fade.map-grid > div:nth-child(3) > div.map-info > h1"
      )
      .textContent.replace(" - Valorant Map", "");
    trackerPreData.details = "Viewing Valorant Map:";
    trackerPreData.state = mapName;
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage === "/valorant/cards") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Cards";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage === "/valorant/buddies") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Buddies";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  } else if (trackerPage === "/valorant/sprays") {
    trackerPreData.details = "Viewing:";
    trackerPreData.state = "Valorant Sprays";
    trackerPreData.smallImageKey = "valorant";
    trackerPreData.smallImageText = "Valorant";
  }

  if (
    !trackerPresence.getSetting("buttons") ||
    trackerPreData.details === "Editing App:"
  )
    delete trackerPreData.buttons;
  else {
    trackerPreData.buttons = [
      {
        label: "Open Page",
        url: document.URL
      }
    ];
  }

  if (trackerPreData.details === null) {
    trackerPresence.setTrayTitle();
    trackerPresence.setActivity();
  } else {
    trackerPresence.setActivity(trackerPreData);
  }
});
