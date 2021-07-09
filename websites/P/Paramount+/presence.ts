const presence = new Presence({
    clientId: "821433038335377418"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

let title: string,
  seasonEpi: string,
  movTitle: string,
  vidMdTl: Element,
  elapsed: number = undefined,
  oldUrl: string = undefined;

presence.on("UpdateData", async () => {
  let video: HTMLVideoElement = null;
  const vidArea = document.querySelector(".video__player-area"),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    href = window.location.href,
    path = window.location.pathname;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (path.includes("/home")) {
    presenceData.details = "Browsing:";
    presenceData.state = "Home Page";
    presenceData.startTimestamp = elapsed;
  } else if (
    path.includes("/shows") &&
    document.querySelector(".subnav__items--tuneInfo") === null
  ) {
    presenceData.details = "Browsing:";
    presenceData.state = "Viewing Shows";
    presenceData.startTimestamp = elapsed;
  } else if (!vidArea && path.includes("/shows")) {
    title = JSON.parse(
      document.querySelector('[type="application/ld+json"]').innerHTML
    ).name;

    if (title) {
      presenceData.state = title;
      presenceData.details = "Viewing Series:";
    }
  } else if (!vidArea && path.includes("/movies")) {
    presenceData.state = "Viewing Movies";
    presenceData.details = "Browsing:";
    presenceData.startTimestamp = elapsed;
  } else if (path.includes("/search")) {
    presenceData.details = "Searching";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).search;
  } else if (path.includes("/account")) {
    presenceData.details = "Viewing Account";

    if (path.includes("/signin")) delete presenceData.details;
  } else if (path.includes("/user-profile/whos-watching")) {
    presenceData.details = "User Profiles";
    presenceData.state = "Selecting User...";
  } else if (path.includes("/news/") && !path.includes("video")) {
    presenceData.details = "Browsing News";
    presenceData.state = "CBSN";
    presenceData.startTimestamp = elapsed;
  } else if (path.includes("/brands")) {
    presenceData.details = "Browsing Brands:";
    presenceData.state = "Selecting Brand...";

    if (path.includes("/cbs/")) {
      presenceData.state = "CBS";
      presenceData.startTimestamp = elapsed;
      presenceData.smallImageKey = "cbs";
    } else if (path.includes("/bet/")) {
      presenceData.state = "BET";
      presenceData.startTimestamp = elapsed;
      presenceData.smallImageKey = "bet";
    } else if (path.includes("/comedy-central/")) {
      presenceData.state = "Comedy Central";
      presenceData.startTimestamp = elapsed;
      presenceData.smallImageKey = "comedycentral";
    } else if (path.includes("/mtv/")) {
      presenceData.state = "MTV";
      presenceData.startTimestamp = elapsed;
      presenceData.smallImageKey = "mtv";
    } else if (path.includes("/nickelodeon/")) {
      presenceData.state = "Nickelodeon";
      presenceData.startTimestamp = elapsed;
      presenceData.smallImageKey = "nickelodeon";
    } else if (path.includes("/smithsonian-channel/")) {
      presenceData.state = "Smithsonian Channel";
      presenceData.startTimestamp = elapsed;
      presenceData.smallImageKey = "smithsonian";
    }
  } else if (path.includes("/live")) {
    vidMdTl = document
      .getElementsByClassName("video__player-area")[0]
      .querySelector("h1");
    const liveTitle = document
      .getElementsByClassName("video__player-area")[0]
      .querySelector("span.subTitle").textContent;

    presenceData.smallImageKey = "live";
    presenceData.smallImageText = (await strings).live;
    presenceData.startTimestamp = elapsed;

    presenceData.details = "Watching WCBS Live";
    presenceData.state = liveTitle;

    if (path.includes("/cbsn/")) {
      presenceData.details = "Watching CBSN News";
      presenceData.state = vidMdTl.textContent;
    } else if (path.includes("/sports/")) {
      presenceData.details = "Watching CBS Sports";
      presenceData.state = vidMdTl.textContent;
    } else if (path.includes("/etl/")) {
      presenceData.details = "Watching ET Live";
      presenceData.state = vidMdTl.textContent;
    }
  } else if ((vidArea && path.includes("/video")) || path.includes("/movies")) {
    video = document.querySelector("video");
    const jsonData = JSON.parse(
      document.querySelector('[type="application/ld+json"]').innerHTML
    );
    if (vidArea) {
      if (path.includes("/movies")) {
        movTitle = jsonData.name;
      } else if (path.includes("/video")) {
        title = jsonData.partOfSeries.name;

        seasonEpi =
          "S" +
          jsonData.partOfSeason.seasonNumber +
          ":" +
          "E" +
          jsonData.episodeNumber +
          " " +
          jsonData.name;
      }

      const content = seasonEpi,
        timestamps = presence.getTimestampsfromMedia(video);

      if (movTitle) {
        presenceData.state = movTitle;
        presenceData.details = "Watching Movie:";
      }

      if (title) presenceData.details = title;

      if (content) presenceData.state = content;

      if (path.includes("/news/")) {
        presenceData.details = "Watching News Content";
        presenceData.state = jsonData.partOfSeries.name + ": " + jsonData.name;
      }

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  }

  presence.setActivity(presenceData);
  presence.setTrayTitle(presenceData.details);
});
