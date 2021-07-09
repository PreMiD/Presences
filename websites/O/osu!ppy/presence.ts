const presence = new Presence({
  clientId: "609774216430092298"
});

let beatmapTitle: string,
  profileName: string,
  profileRanking: string,
  rank: string,
  pp: string,
  title: string,
  diffName: string,
  selected: string,
  gamemode: string,
  forumName: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/home") {
    presenceData.details = "Viewing...";
    presenceData.state = "The Homepage";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/home/download")) {
    presenceData.details = "Viewing...";
    presenceData.state = "The Download Page";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/home/news")) {
    if (document.location.pathname.split("/")[3] !== undefined) {
      presenceData.details = "Reading...";
      presenceData.state = "An osu! News Page";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = "Viewing...";
      presenceData.state = "The osu! News Feed";
      presenceData.smallImageKey = "searching";
    }
  } else if (document.location.pathname.includes("/beatmapsets")) {
    if (document.location.pathname == "/beatmapsets") {
      presenceData.details = "Browsing...";
      presenceData.state = "Beatmap Listings";
      presenceData.smallImageKey = "searching";
    } else {
      title = document.querySelector(
        ".beatmapset-header__details-text--title"
      ).textContent;
      diffName = document.querySelector(
        ".beatmapset-header__diff-name"
      ).textContent;
      if (title != null && diffName != null) {
        (beatmapTitle = `${title} [${diffName}]`),
          (presenceData.details = "Looking at the beatmap:");
        presenceData.state = beatmapTitle;
        presenceData.smallImageKey = "searching";
      }
    }
  } else if (document.location.pathname.startsWith("/beatmaps/packs")) {
    presenceData.details = "Browsing...";
    presenceData.state = "Beatmap Packs";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/beatmaps/artists")) {
    presenceData.details = "Browsing...";
    presenceData.state = "Featured Artists";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/store")) {
    presenceData.details = "Browsing...";
    presenceData.state = "The osu! Store";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/rankings")) {
    gamemode = document.location.pathname.split("/")[2];
    if (document.location.pathname.includes("/performance")) {
      if (
        document.querySelector("div.u-ellipsis-overflow").textContent !== "All"
      ) {
        selected = document.querySelector(
          "div.u-ellipsis-overflow"
        ).textContent;
        presenceData.details = "Browsing...";
        presenceData.state = `The Performance Rankings (for ${selected}) [${gamemode}]`;
        presenceData.smallImageKey = "searching";
      } else {
        presenceData.details = "Browsing...";
        presenceData.state = `The Performance Rankings [${gamemode}]`;
        presenceData.smallImageKey = "searching";
      }
    } else if (document.location.pathname.includes("/charts")) {
      selected = document.querySelector("div.u-ellipsis-overflow").textContent;
      presenceData.details = "Browsing...";
      presenceData.state = `The ${gamemode} Spotlights (${selected})`;
      presenceData.smallImageKey = "searching";
    } else if (document.location.pathname.includes("/score")) {
      presenceData.details = "Browsing...";
      presenceData.state = `The Score Rankings [${gamemode}]`;
      presenceData.smallImageKey = "searching";
    } else if (document.location.pathname.includes("/country")) {
      presenceData.details = "Browsing...";
      presenceData.state = `The Country Rankings [${gamemode}]`;
      presenceData.smallImageKey = "searching";
    }
  } else if (document.location.pathname.startsWith("/multiplayer/rooms")) {
    selected = document.querySelector("div.u-ellipsis-overflow").textContent;
    presenceData.details = "Browsing...";
    presenceData.state = `${selected}`;
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/community/forums")) {
    if (document.location.pathname.split("/")[3] == "topics") {
      presenceData.details = "Reading...";
      presenceData.state = "A Forum Post";
      presenceData.smallImageKey = "reading";
    } else if (
      isNaN(parseInt(document.location.pathname.split("/")[3])) == false
    ) {
      forumName = document
        .querySelector("h1.forum-title__name a.link--white.link--no-underline")
        .textContent.replace(/[\n|\r][\s\S][\s\S]/g, "")
        .trimStart()
        .trimEnd();
      presenceData.details = "Browsing...";
      presenceData.state = `Forums (${forumName})`;
      presenceData.smallImageKey = "searching";
    } else {
      presenceData.details = "Browsing...";
      presenceData.state = "The Forums";
      presenceData.smallImageKey = "searching";
    }
  } else if (document.location.pathname.startsWith("/community/chat")) {
    presenceData.details = "Chatting...";
  } else if (document.location.pathname.startsWith("/community/contests")) {
    presenceData.details = "Browsing...";
    presenceData.state = "Contests";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/community/livestreams")) {
    presenceData.details = "Browsing...";
    presenceData.state = "Livestreams";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/community/tournaments")) {
    presenceData.details = "Browsing...";
    presenceData.state = "Tournaments";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/home/search")) {
    presenceData.details = "Searching...";
    presenceData.smallImageKey = "searching";
  } else if (document.location.pathname.startsWith("/home/account/edit")) {
    presenceData.details = "Changing account settings...";
  } else if (document.location.pathname.startsWith("/wiki")) {
    if (document.location.pathname.includes("/FAQ")) {
      presenceData.details = "Reading...";
      presenceData.state = "The FAQ";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/Rules")) {
      presenceData.details = "Reading...";
      presenceData.state = "The Rules";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/Main_Page")) {
      presenceData.details = "Browsing...";
      presenceData.state = "The Wiki (Main Page)";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/Help_Centre")) {
      presenceData.details = "Looking at...";
      presenceData.state = "The Help Centre";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/People")) {
      presenceData.details = "Looking at...";
      presenceData.state = "The osu! team";
    } else {
      presenceData.details = "Reading...";
      presenceData.state = "Somewhere in The Wiki";
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname.startsWith("/home/changelog")) {
    presenceData.details = "Looking at...";
    presenceData.state = "Changelog";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.startsWith("/home/friends")) {
    presenceData.details = "Looking at...";
    presenceData.state = "Their Friend List";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.startsWith("/home/follows")) {
    presenceData.details = "Looking at...";
    presenceData.state = "Their Watchlists";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.startsWith("/users")) {
    profileName = (
      document.querySelector(
        "h1.profile-info__name  span.u-ellipsis-pre-overflow"
      ) as HTMLElement
    ).textContent;
    rank = document.querySelector(".value-display__value").textContent;
    pp = document.querySelector(
      ".value-display--pp .value-display__value"
    ).textContent;
    profileRanking = `Rank: ${rank} / ${pp}pp`;
    presenceData.details =
      document.querySelector("div.u-relative").textContent == profileName
        ? `Looking at ${profileName}'s Profile (Their Own)`
        : `Looking at ${profileName}'s Profile`;
    presenceData.state = profileRanking;
    presenceData.smallImageKey = "reading";
  } else {
    presenceData.details = "Viewing...";
    presenceData.state = "An Unsupported Page";
  }

  presence.setActivity(presenceData);
});
