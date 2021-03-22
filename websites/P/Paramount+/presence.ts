const presence = new Presence({
  clientId: "821433038335377418"
});
(async function () {
  const strings = await presence.getStrings({
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

  presence.on("UpdateData", () => {

    vidArea = document.querySelector(".video__player-area");
    let video: HTMLVideoElement = null,
      details = undefined,
      state = undefined,
      smallImageKey = undefined,
      smallImageText = undefined,
      startTimestamp = undefined,
      endTimestamp = undefined;

    const href = window.location.href,
      path = window.location.pathname;

    if (href !== oldUrl) {
      oldUrl = href;
      elapsed = Math.floor(Date.now() / 1000);
    }

    state = undefined;

    if (path.includes("/home")) {

      details = "Browsing:";
      state = "Home Page";
      startTimestamp = elapsed;

    } else if (path.includes("/shows") && document.querySelector(".subnav__items--tuneInfo") == null) {

      details = "Browsing:";
      state = "Viewing Shows";
      startTimestamp = elapsed;

    } else if (!vidArea && path.includes("/shows")) {

      title = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).name;

      if (title) {
        
        state = title;
        details = "Viewing Series:";
      
      }
    } else if (!vidArea && path.includes("/movies")) {

      state = "Viewing Movies";
      details = "Browsing:";
      startTimestamp = elapsed;

    } else if (path.includes("/search")) {
      
      details = "Searching";
      smallImageKey = "search";
      smallImageText = strings.search;
    
    } else if (path.includes("/account")) {
      
      details = "Viewing Account";

      if (path.includes("/signin")) {
        details = null;
      }

    } else if (path.includes("/user-profile/whos-watching")) {
      
      details = "User Profiles";
      state = "Selecting User...";
      
    } else if (path.includes("/news/") && !path.includes("video")) {

      details = "Browsing News";
      state = "CBSN";
      startTimestamp = elapsed;

    } else if (path.includes("/brands")) {

      details = "Browsing Brands:";
      state = "Selecting Brand...";

      if (path.includes("/cbs/")) {

        state = "CBS";
        startTimestamp = elapsed;
        smallImageKey = "cbs";

      } else if (path.includes("/bet/")) {

        state = "BET";
        startTimestamp = elapsed;
        smallImageKey = "bet";

      } else if (path.includes("/comedy-central/")) {

        state = "Comedy Central";
        startTimestamp = elapsed;
        smallImageKey = "comedycentral";

      } else if (path.includes("/mtv/")) {

        state = "MTV";
        startTimestamp = elapsed;
        smallImageKey = "mtv";

      } else if (path.includes("/nickelodeon/")) {

        state = "Nickelodeon";
        startTimestamp = elapsed;
        smallImageKey = "nickelodeon";

      } else if (path.includes("/smithsonian-channel/")) {

        state = "Smithsonian Channel";
        startTimestamp = elapsed;
        smallImageKey = "smithsonian";
      }

    } else if (path.includes("/live")) {

      vidMdTl = document.getElementsByClassName("video__player-area")[0].querySelector("h1");
      const liveTitle = document.getElementsByClassName("video__player-area")[0].querySelector("span.subTitle").textContent;

      smallImageKey = "live";
      smallImageText = strings.live;
      startTimestamp = elapsed;

      details = "Watching WCBS Live";
      state = liveTitle;

      if (path.includes("/cbsn/")) {

        details = "Watching CBSN News";
        state = vidMdTl.textContent;

      } else if (path.includes("/sports/")) {

        details = "Watching CBS Sports";
        state = vidMdTl.textContent;

      } else if (path.includes("/etl/")) {

        details = "Watching ET Live";
        state = vidMdTl.textContent;

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
          state = movTitle;
          details = "Watching Movie:";
        }

        if (title) {
          details = title;
        }

        if (content) {
          state = content;
        }

        if (path.includes("/news/")) {
          details = "Watching News Content";
          state = jsonData.partOfSeries.name + ": " + jsonData.name;
        }

        smallImageKey = live ? "live" : video.paused ? "pause" : "play";
        smallImageText = live ?
          strings.live :
          video.paused ?
          strings.pause :
          strings.play;
        startTimestamp = live ? elapsed : timestamps[0];
        endTimestamp = live ? undefined : timestamps[1];

        if (video.paused) {
          startTimestamp = undefined;
          endTimestamp = undefined;
        }
      }
    }

    const data: PresenceData = {
      details: details,
      state: state,
      largeImageKey: "logo",
      smallImageKey: smallImageKey,
      smallImageText: smallImageText,
      startTimestamp: startTimestamp,
      endTimestamp: endTimestamp
    };
    presence.setActivity(data, video ? !video.paused : true);
    presence.setTrayTitle(details);
  });
})();