const presence = new Presence({ clientId: "929349462365704222" }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const trackerPreData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = window.location,
    botHost = document.location.hostname;

  if (botHost === "tracker.gg") {
    if (pathname === "/") {
      trackerPreData.details = "Viewing Page:";
      trackerPreData.state = "Homepage";
    } else if (pathname === "/apps") {
      trackerPreData.details = "Viewing Page:";
      trackerPreData.state = "Tracker Apps";
    } else if (pathname === "/developers") {
      trackerPreData.details = "Viewing Page:";
      trackerPreData.state = "Developers";
    } else if (pathname === "/developers/apps/create") {
      trackerPreData.details = "Creating";
      trackerPreData.state = "Tracker Dev App";
    } else if (pathname.includes("/developers/apps/")) {
      try {
        const appName: string = document
          .querySelector(
            "#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__analytics.card.bordered.responsive > header > div > div.left > div:nth-child(2) > div.title"
          )
          .textContent.replace("Dashboard", "");
        trackerPreData.details = "Editing App";
        trackerPreData.state = appName;
        trackerPreData.smallImageKey = document.querySelector<HTMLImageElement>(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__details.card.responsive > div > div:nth-child(1) > div > img"
        ).src;
        trackerPreData.smallImageText = appName;
      } catch (e) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "Developer Apps";
      }
    } else if (pathname.includes("/developers/docs")) {
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
    } else if (pathname === "/overlays") {
      trackerPreData.details = "Viewing Page:";
      trackerPreData.state = "Overlays";
    } else if (pathname === "/overlays/editor") {
      trackerPreData.details = "Creating";
      trackerPreData.state = "Tracker Overlay";
    } else if (pathname === "/premium") {
      trackerPreData.details = "Viewing Page:";
      trackerPreData.state = "Premium";
    } else if (pathname === "/partners") {
      trackerPreData.details = "Viewing Page:";
      trackerPreData.state = "Partners";
    } else if (pathname === "/shop") {
      trackerPreData.details = "Viewing Page:";
      trackerPreData.state = "Shop";
    } else if (pathname === "/valorant") {
      trackerPreData.details = "Viewing Valorant Page";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/profile")) {
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
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/leaderboards")) {
      if (pathname.includes("/valorant/leaderboards/ranked")) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "Valorant Leaderboards Ranked";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "valorant";
      } else if (pathname.includes("/valorant/leaderboards/stats")) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "Valorant Leaderboards Seasonal";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "valorant";
      }
    } else if (pathname.includes("/valorant/guides")) {
      if (pathname.includes("/clips/submit")) {
        trackerPreData.details = "Submitting Valorant Clip";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "valorant";
      } else if (pathname.includes("/clips")) {
        try {
          const stream: Element = document.querySelector(
            "#app > div.trn-wrapper > div.trn-container > div > div.container.guide-tile__modal > div.content.animated > div > div > iframe"
          );
          if (stream) {
            trackerPreData.details = "Watching:";
            trackerPreData.state = "Valorant Lineup Clip";
            trackerPreData.smallImageKey = "logo";
            trackerPreData.smallImageText = "TRN";
            trackerPreData.largeImageKey = "valorant";
          } else {
            trackerPreData.details = "Viewing:";
            trackerPreData.state = "Valorant Lineup Guides";
            trackerPreData.smallImageKey = "logo";
            trackerPreData.smallImageText = "TRN";
            trackerPreData.largeImageKey = "valorant";
          }
        } catch {
          trackerPreData.details = "Viewing:";
          trackerPreData.state = "Valorant Lineup Guides";
          trackerPreData.smallImageKey = "valorant";
          trackerPreData.smallImageText = "Valorant";
        }
      } else if (pathname.includes("/dashboard")) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "own Valorant Guides";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "valorant";
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
          trackerPreData.smallImageKey = "logo";
          trackerPreData.smallImageText = `Written by ${authorName}`;
          trackerPreData.largeImageKey = "valorant";
        } catch {
          trackerPreData.details = "Viewing:";
          trackerPreData.state = "Valorant Guides";
          trackerPreData.smallImageKey = "logo";
          trackerPreData.smallImageText = "TRN";
          trackerPreData.largeImageKey = "valorant";
        }
      }
    } else if (pathname === "/valorant/lfg") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Looking for Group";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/insights/agents") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Insights";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/agents") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Agents";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/agents")) {
      const agentName: string = document.querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > div.agent-breadcrumbs > ol > li:nth-child(3) > a > span"
      ).textContent;
      trackerPreData.details = "Viewing Valorant Agent:";
      trackerPreData.state = agentName;
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/weapons") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Weapons";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/weapons")) {
      const weaponName: string = document.querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > ol > li:nth-child(4) > a > span"
      ).textContent;
      trackerPreData.details = "Viewing Valorant Weapon:";
      trackerPreData.state = weaponName;
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/maps") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Maps";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/maps")) {
      const mapName: string = document
        .querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.no-card-margin.site-container.site-container--mobile-margin.site-container--background-fade.map-grid > div:nth-child(3) > div.map-info > h1"
        )
        .textContent.replace(" - Valorant Map", "");
      trackerPreData.details = "Viewing Valorant Map:";
      trackerPreData.state = mapName;
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/cards") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Cards";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/buddies") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Buddies";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/sprays") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Valorant Sprays";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "valorant";
    } else if (pathname === "/hyper-scape") {
      trackerPreData.details = "Viewing Game:";
      trackerPreData.state = "Hyper Scape";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "hyperscape";
    } else if (pathname.includes("/hyper-scape/profile")) {
      const playerName: string = document.querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span"
        ).textContent,
        image: string = document
          .querySelector(
            "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > img"
          )
          .getAttribute("src");

      trackerPreData.details = "Viewing HyperScape Profile:";
      trackerPreData.state = playerName;
      trackerPreData.smallImageKey = image;
      trackerPreData.smallImageText = playerName;
      trackerPreData.largeImageKey = "hyperscape";
    } else if (pathname.includes("/hyper-scape/leaderboards/")) {
      if (pathname.includes("/stats/")) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "HyperScape Leaderboards Lifetime";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "hyperscape";
      } else if (pathname.includes("/career-bests/")) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "HyperScape Leaderboards Career Bests";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "hyperscape";
      } else if (pathname.includes("/playlists/")) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "HyperScape Leaderboards Playlists";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "hyperscape";
      } else if (pathname.includes("/weapons/")) {
        trackerPreData.details = "Viewing:";
        trackerPreData.state = "HyperScape Leaderboards Weapons";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "hyperscape";
      }
    }
  } else if (botHost === "fortnitetracker.com") {
    if (pathname === "/") {
      trackerPreData.details = "Viewing Fortnite Page";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname.includes("/profile/all/")) {
      const playerName: string = document.querySelector(
          "#profile > div.trn-card.trn-profile-header > div > h1 > span"
        ).textContent,
        image: string = document
          .querySelector(
            "#profile > div.trn-card.trn-profile-header > div > div.trn-profile-header__avatar.trn-roundavatar.trn-roundavatar--white > img"
          )
          .getAttribute("src");

      trackerPreData.details = "Viewing Fortnite Profile:";
      trackerPreData.state = playerName;
      trackerPreData.smallImageKey = image;
      trackerPreData.smallImageText = playerName;
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname === "/event-lfp") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Tournament Looking for Player";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname === "/events") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Events";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname === "/events/powerrankings") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Power Ranking";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname === "/arena/leaderboards") {
      trackerPreData.details = "Viewing Leaderboard:";
      trackerPreData.state = "Hype";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname === "/events/earnings") {
      trackerPreData.details = "Viewing Leaderboard:";
      trackerPreData.state = "Earnings";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname === "/bests/win-streaks") {
      trackerPreData.details = "Viewing Leaderboard:";
      trackerPreData.state = "Win Streak";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname.includes("/bests/high-kills/")) {
      trackerPreData.details = "Viewing Leaderboard:";
      trackerPreData.state = "Single Match Kills";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname.includes("/leaderboards/")) {
      if (pathname.includes("/TRNRating")) {
        trackerPreData.details = "Viewing Leaderboard:";
        trackerPreData.state = "Tracker Network Rating";
        trackerPreData.smallImageKey = "logo";
        trackerPreData.smallImageText = "TRN";
        trackerPreData.largeImageKey = "fortnite";
      }
    } else if (pathname === "/challenges") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Challanges";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname.includes("/challenges/")) {
      const title: string = document.querySelector(
        "#app > div > div.ftr-challenges > div:nth-child(1) > div.trn-card__header > h3"
      ).textContent;
      trackerPreData.details = "Viewing Challange:";
      trackerPreData.state = title;
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    } else if (pathname === "/creative") {
      trackerPreData.details = "Viewing:";
      trackerPreData.state = "Creative Maps";
      trackerPreData.smallImageKey = "logo";
      trackerPreData.smallImageText = "TRN";
      trackerPreData.largeImageKey = "fortnite";
    }
  }

  if (
    !presence.getSetting("buttons") ||
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

  if (trackerPreData.details) presence.setActivity(trackerPreData);
  else presence.setActivity();
});
