const presence = new Presence({
  clientId: "821433038335377418"
});

  const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

  let title: string,
    seasonEpi: string,
    movTitle: string,
    vidArea: Element,
    vidMdTl: Element,
    elapsed: number = undefined,
    oldUrl: string = undefined;

  presence.on("UpdateData", async () => {

    vidArea = document.querySelector(".video__player-area");
    let video: HTMLVideoElement = null;
    const PresenceData: PresenceData = { 
      largeImageKey: "logo"
    };
    const href = window.location.href,
      path = window.location.pathname;

    if (href !== oldUrl) {
      oldUrl = href;
      elapsed = Math.floor(Date.now() / 1000);
    }

    PresenceData.state = undefined;

    if (path.includes("/home")) {

      PresenceData.details = "Browsing:";
      PresenceData.state = "Home Page";
      PresenceData.startTimestamp = elapsed;

    } else if (path.includes("/shows") && document.querySelector(".subnav__items--tuneInfo") == null) {

      PresenceData.details = "Browsing:";
      PresenceData.state = "Viewing Shows";
      PresenceData.startTimestamp = elapsed;

    } else if (!vidArea && path.includes("/shows")) {

      title = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).name;

      if (title) {
        
        PresenceData.state = title;
        PresenceData.details = "Viewing Series:";
      
      }
    } else if (!vidArea && path.includes("/movies")) {

      PresenceData.state = "Viewing Movies";
      PresenceData.details = "Browsing:";
      PresenceData.startTimestamp = elapsed;

    } else if (path.includes("/search")) {
      
      PresenceData.details = "Searching";
      PresenceData.smallImageKey = "search";
      PresenceData.smallImageText = (await strings).search;
    
    } else if (path.includes("/account")) {
      
      PresenceData.details = "Viewing Account";

      if (path.includes("/signin")) {
        PresenceData.details = null;
      }

    } else if (path.includes("/user-profile/whos-watching")) {
      
      PresenceData.details = "User Profiles";
      PresenceData.state = "Selecting User...";
      
    } else if (path.includes("/news/") && !path.includes("video")) {

      PresenceData.details = "Browsing News";
      PresenceData.state = "CBSN";
      PresenceData.startTimestamp = elapsed;

    } else if (path.includes("/brands")) {

      PresenceData.details = "Browsing Brands:";
      PresenceData.state = "Selecting Brand...";

      if (path.includes("/cbs/")) {

        PresenceData.state = "CBS";
        PresenceData.startTimestamp = elapsed;
        PresenceData.smallImageKey = "cbs";

      } else if (path.includes("/bet/")) {

        PresenceData.state = "BET";
        PresenceData.startTimestamp = elapsed;
        PresenceData.smallImageKey = "bet";

      } else if (path.includes("/comedy-central/")) {

        PresenceData.state = "Comedy Central";
        PresenceData.startTimestamp = elapsed;
        PresenceData.smallImageKey = "comedycentral";

      } else if (path.includes("/mtv/")) {

        PresenceData.state = "MTV";
        PresenceData.startTimestamp = elapsed;
        PresenceData.smallImageKey = "mtv";

      } else if (path.includes("/nickelodeon/")) {

        PresenceData.state = "Nickelodeon";
        PresenceData.startTimestamp = elapsed;
        PresenceData.smallImageKey = "nickelodeon";

      } else if (path.includes("/smithsonian-channel/")) {

        PresenceData.state = "Smithsonian Channel";
        PresenceData.startTimestamp = elapsed;
        PresenceData.smallImageKey = "smithsonian";
      }

    } else if (path.includes("/live")) {

      vidMdTl = document.getElementsByClassName("video__player-area")[0].querySelector("h1");
      const liveTitle = document.getElementsByClassName("video__player-area")[0].querySelector("span.subTitle").textContent;

      PresenceData.smallImageKey = "live";
      PresenceData.smallImageText = (await strings).live;
      PresenceData.startTimestamp = elapsed;

      PresenceData.details = "Watching WCBS Live";
      PresenceData.state = liveTitle;

      if (path.includes("/cbsn/")) {

        PresenceData.details = "Watching CBSN News";
        PresenceData.state = vidMdTl.textContent;

      } else if (path.includes("/sports/")) {

        PresenceData.details = "Watching CBS Sports";
        PresenceData.state = vidMdTl.textContent;

      } else if (path.includes("/etl/")) {

        PresenceData.details = "Watching ET Live";
        PresenceData.state = vidMdTl.textContent;

      }

    } else if (vidArea && path.includes("/video") || path.includes("/movies")) {
      video = document.querySelector("video");
      const jsonData = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML);
      if (vidArea) {
        if (path.includes("/movies")) {

          movTitle = jsonData.name;

        } else if (path.includes("/video")) {

          title = jsonData.partOfSeries.name;

          seasonEpi = "S" + jsonData.partOfSeason.seasonNumber + ":" +
            "E" + jsonData.episodeNumber + " " +
            jsonData.name;
        }

        const content = seasonEpi,
          timestamps = presence.getTimestamps(
            Math.floor(video.currentTime),
            Math.floor(video.duration)
          ),
          live = timestamps[1] === Infinity;
        
        if (movTitle) {
          PresenceData.state = movTitle;
          PresenceData.details = "Watching Movie:";
        }

        if (title) {
          PresenceData.details = title;
        }

        if (content) {
          PresenceData.state = content;
        }

        if (path.includes("/news/")) {
          PresenceData.details = "Watching News Content";
          PresenceData.state = jsonData.partOfSeries.name + ": " + jsonData.name;
        }

        PresenceData.smallImageKey = live ? "live" : video.paused ? "pause" : "play";
        PresenceData.smallImageText = live ?
          (await strings).live :
          video.paused ?
          (await strings).pause :
          (await strings).play;
        PresenceData.startTimestamp = live ? elapsed : timestamps[0];
        PresenceData.endTimestamp = live ? undefined : timestamps[1];

        if (video.paused) {
          PresenceData.startTimestamp = undefined;
          PresenceData.endTimestamp = undefined;
        }
      }
    }

    presence.setActivity(PresenceData, video ? !video.paused : true);
    presence.setTrayTitle(PresenceData.details);
  });
