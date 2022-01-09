const presence = new Presence({ clientId: "929349462365704222" }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = window.location,
    botHost = document.location.hostname;

  if (botHost === "tracker.gg") {
    if (pathname === "/") {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Homepage";
    } else if (pathname === "/apps") {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Tracker Apps";
    } else if (pathname === "/developers") {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Developers";
    } else if (pathname === "/developers/apps/create") {
      presenceData.details = "Creating";
      presenceData.state = "Tracker Dev App";
    } else if (pathname.includes("/developers/apps/")) {
      try {
        const appName: string = document
          .querySelector(
            "#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__analytics.card.bordered.responsive > header > div > div.left > div:nth-child(2) > div.title"
          )
          .textContent.replace("Dashboard", "");
        presenceData.details = "Editing App";
        presenceData.state = appName;
        presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.apps > div.content-container > div > div > div > div > div.dashboard__details.card.responsive > div > div:nth-child(1) > div > img"
        ).src;
        presenceData.smallImageText = appName;
      } catch (e) {
        presenceData.details = "Viewing:";
        presenceData.state = "Developer Apps";
      }
    } else if (pathname.includes("/developers/docs")) {
      try {
        const title: string = document.querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.docs > div.content-container > div > div > h1"
        ).textContent;
        presenceData.details = "Viewing Docs";
        presenceData.state = title;
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
        presenceData.details = "Viewing API";
        presenceData.state = game;
      }
    } else if (pathname === "/overlays") {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Overlays";
    } else if (pathname === "/overlays/editor") {
      presenceData.details = "Creating";
      presenceData.state = "Tracker Overlay";
    } else if (pathname === "/premium") {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Premium";
    } else if (pathname === "/partners") {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Partners";
    } else if (pathname === "/shop") {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Shop";
    } else if (pathname === "/valorant") {
      presenceData.details = "Viewing Valorant Page";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/profile")) {
      const playerName: string = document.querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span.trn-ign__username"
        ).textContent,
        playerTag: string = document.querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span.trn-ign__discriminator"
        ).textContent,
        image: string = document
          .querySelector<HTMLImageElement>(
            "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > svg > image"
          )
          .getAttribute("href");
      presenceData.details = "Viewing Valorant Profile:";
      presenceData.state = playerName + playerTag;
      presenceData.smallImageKey = image;
      presenceData.smallImageText = playerName;
      presenceData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/leaderboards")) {
      if (pathname.includes("/valorant/leaderboards/ranked")) {
        presenceData.details = "Viewing:";
        presenceData.state = "Valorant Leaderboards Ranked";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "valorant";
      } else if (pathname.includes("/valorant/leaderboards/stats")) {
        presenceData.details = "Viewing:";
        presenceData.state = "Valorant Leaderboards Seasonal";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "valorant";
      }
    } else if (pathname.includes("/valorant/guides")) {
      if (pathname.includes("/clips/submit")) {
        presenceData.details = "Submitting Valorant Clip";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "valorant";
      } else if (pathname.includes("/clips")) {
        try {
          const stream: Element = document.querySelector(
            "#app > div.trn-wrapper > div.trn-container > div > div.container.guide-tile__modal > div.content.animated > div > div > iframe"
          );
          if (stream) {
            presenceData.details = "Watching:";
            presenceData.state = "Valorant Lineup Clip";
            presenceData.smallImageKey = "logo";
            presenceData.smallImageText = "TRN";
            presenceData.largeImageKey = "valorant";
          } else {
            presenceData.details = "Viewing:";
            presenceData.state = "Valorant Lineup Guides";
            presenceData.smallImageKey = "logo";
            presenceData.smallImageText = "TRN";
            presenceData.largeImageKey = "valorant";
          }
        } catch {
          presenceData.details = "Viewing:";
          presenceData.state = "Valorant Lineup Guides";
          presenceData.smallImageKey = "valorant";
          presenceData.smallImageText = "Valorant";
        }
      } else if (pathname.includes("/dashboard")) {
        presenceData.details = "Viewing:";
        presenceData.state = "own Valorant Guides";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "valorant";
      } else {
        try {
          const guideName: string = document.querySelector(
              "#app > div.trn-wrapper > div.trn-container > div > main > article > div.guide__header > h1"
            ).textContent,
            authorName: string = document.querySelector(
              "#app > div.trn-wrapper > div.trn-container > div > main > article > div.guide__main > div > div.guide-main__hero.card.header-bordered.responsive > div.guide-main-metadata > div.guide-main__author.guide-main-metadata__author > span.guide-main__author-username"
            ).textContent;
          presenceData.details = "Reading Guide:";
          presenceData.state = guideName;
          presenceData.smallImageKey = "logo";
          presenceData.smallImageText = `Written by ${authorName}`;
          presenceData.largeImageKey = "valorant";
        } catch {
          presenceData.details = "Viewing:";
          presenceData.state = "Valorant Guides";
          presenceData.smallImageKey = "logo";
          presenceData.smallImageText = "TRN";
          presenceData.largeImageKey = "valorant";
        }
      }
    } else if (pathname === "/valorant/lfg") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Looking for Group";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/insights/agents") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Insights";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/agents") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Agents";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/agents")) {
      const agentName: string = document.querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > div.agent-breadcrumbs > ol > li:nth-child(3) > a > span"
      ).textContent;
      presenceData.details = "Viewing Valorant Agent:";
      presenceData.state = agentName;
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/weapons") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Weapons";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/weapons")) {
      const weaponName: string = document.querySelector(
        "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.site-container.no-card-margin > ol > li:nth-child(4) > a > span"
      ).textContent;
      presenceData.details = "Viewing Valorant Weapon:";
      presenceData.state = weaponName;
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/maps") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Maps";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname.includes("/valorant/maps")) {
      const mapName: string = document
        .querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div:nth-child(2) > div.no-card-margin.site-container.site-container--mobile-margin.site-container--background-fade.map-grid > div:nth-child(3) > div.map-info > h1"
        )
        .textContent.replace(" - Valorant Map", "");
      presenceData.details = "Viewing Valorant Map:";
      presenceData.state = mapName;
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/cards") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Cards";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/buddies") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Buddies";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/valorant/sprays") {
      presenceData.details = "Viewing:";
      presenceData.state = "Valorant Sprays";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "valorant";
    } else if (pathname === "/hyper-scape") {
      presenceData.details = "Viewing Game:";
      presenceData.state = "Hyper Scape";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "hyperscape";
    } else if (pathname.includes("/hyper-scape/profile")) {
      const playerName: string = document.querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span"
        ).textContent,
        image: string = document.querySelector<HTMLImageElement>(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > img"
        ).src;

      presenceData.details = "Viewing HyperScape Profile:";
      presenceData.state = playerName;
      presenceData.smallImageKey = image;
      presenceData.smallImageText = playerName;
      presenceData.largeImageKey = "hyperscape";
    } else if (pathname.includes("/hyper-scape/leaderboards/")) {
      if (pathname.includes("/stats/")) {
        presenceData.details = "Viewing:";
        presenceData.state = "HyperScape Leaderboards Lifetime";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "hyperscape";
      } else if (pathname.includes("/career-bests/")) {
        presenceData.details = "Viewing:";
        presenceData.state = "HyperScape Leaderboards Career Bests";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "hyperscape";
      } else if (pathname.includes("/playlists/")) {
        presenceData.details = "Viewing:";
        presenceData.state = "HyperScape Leaderboards Playlists";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "hyperscape";
      } else if (pathname.includes("/weapons/")) {
        presenceData.details = "Viewing:";
        presenceData.state = "HyperScape Leaderboards Weapons";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "hyperscape";
      }
    } else if (pathname === "/csgo") {
      presenceData.details = "Viewing Game:";
      presenceData.state = "CS:GO";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "csgo";
    } else if (pathname.includes("/csgo/profile/")) {
      const playerName: string = document.querySelector(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-details > div.ph-details__identifier > span > span"
        ).textContent,
        image: string = document.querySelector<HTMLImageElement>(
          "#app > div.trn-wrapper > div.trn-container > div > main > div.content.no-card-margin > div.ph > div.ph__container > div.ph-avatar > img"
        ).src;

      presenceData.details = "Viewing CSGO Profile:";
      presenceData.state = playerName;
      presenceData.smallImageKey = image;
      presenceData.smallImageText = playerName;
      presenceData.largeImageKey = "csgo";
    } else if (pathname.includes("/csgo/leaderboards/stats/all/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "CSGO Leaderboard";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "csgo";
    }
  } else if (botHost === "fortnitetracker.com") {
    if (pathname === "/") {
      presenceData.details = "Viewing Fortnite Page";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname.includes("/profile/all/")) {
      const playerName: string = document.querySelector(
          "#profile > div.trn-card.trn-profile-header > div > h1 > span"
        ).textContent,
        image: string = document
          .querySelector(
            "#profile > div.trn-card.trn-profile-header > div > div.trn-profile-header__avatar.trn-roundavatar.trn-roundavatar--white > img"
          )
          .getAttribute("src");

      presenceData.details = "Viewing Fortnite Profile:";
      presenceData.state = playerName;
      presenceData.smallImageKey = image;
      presenceData.smallImageText = playerName;
      presenceData.largeImageKey = "fortnite";
    } else if (pathname === "/event-lfp") {
      presenceData.details = "Viewing:";
      presenceData.state = "Tournament Looking for Player";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname === "/events") {
      presenceData.details = "Viewing:";
      presenceData.state = "Events";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname === "/events/powerrankings") {
      presenceData.details = "Viewing:";
      presenceData.state = "Power Ranking";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname === "/arena/leaderboards") {
      presenceData.details = "Viewing Leaderboard:";
      presenceData.state = "Hype";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname === "/events/earnings") {
      presenceData.details = "Viewing Leaderboard:";
      presenceData.state = "Earnings";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname === "/bests/win-streaks") {
      presenceData.details = "Viewing Leaderboard:";
      presenceData.state = "Win Streak";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname.includes("/bests/high-kills/")) {
      presenceData.details = "Viewing Leaderboard:";
      presenceData.state = "Single Match Kills";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname.includes("/leaderboards/")) {
      if (pathname.includes("/TRNRating")) {
        presenceData.details = "Viewing Leaderboard:";
        presenceData.state = "Tracker Network Rating";
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "TRN";
        presenceData.largeImageKey = "fortnite";
      }
    } else if (pathname === "/challenges") {
      presenceData.details = "Viewing:";
      presenceData.state = "Challanges";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname.includes("/challenges/")) {
      const title: string = document.querySelector(
        "#app > div > div.ftr-challenges > div:nth-child(1) > div.trn-card__header > h3"
      ).textContent;
      presenceData.details = "Viewing Challange:";
      presenceData.state = title;
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    } else if (pathname === "/creative") {
      presenceData.details = "Viewing:";
      presenceData.state = "Creative Maps";
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = "TRN";
      presenceData.largeImageKey = "fortnite";
    }
  }

  if (
    !presence.getSetting("buttons") ||
    presenceData.details === "Editing App:"
  )
    delete presenceData.buttons;
  else {
    presenceData.buttons = [
      {
        label: "Open Page",
        url: document.URL
      }
    ];
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
