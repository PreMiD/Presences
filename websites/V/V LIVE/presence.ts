interface LangStrings {
  play: string;
  pause: string;
  live: string;
  browse: string;
  watchingLive: string;
  watchingVid: string;
  waitingVid: string;
  waitingVidThe: string;
  waitingLive: string;
  waitingLiveThe: string;
  readingPost: string;
  readingAbout: string;
  searchFor: string;
  searchSomething: string;
  browseThrough: string;
  newVid: string;
  charts: string;
  upcoming: string;
  channelList: string;
  events: string;
  store: string;
  recentUploads: string;
  ofChannel: string;
  channelHome: string;
  channelSchedule: string;
  channelMy: string;
  channelStore: string;
  channelBoard: string;
  product: string;
  profileEdit: string;
  viewTheir: string;
  profile: string;
  watched: string;
  purchases: string;
  coins: string;
  devices: string;
  followed: string;
  policies: string;
}

const presence = new Presence({
    clientId: "614386371532161054",
    injectOnComplete: true
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        live: "general.live",
        browse: "general.browsing",
        watchingLive: "general.watchingLive",
        watchingVid: "general.watchingVid",
        waitingVid: "general.waitingVid",
        waitingVidThe: "general.waitingVidThe",
        waitingLive: "general.waitingLive",
        waitingLiveThe: "general.waitingLiveThe",
        readingPost: "general.readingPost",
        readingAbout: "general.readingAbout",
        searchFor: "general.searchFor",
        searchSomething: "general.searchSomething",
        browseThrough: "v live.browseThrough",
        newVid: "v live.newVid",
        charts: "v live.charts",
        upcoming: "v live.upcoming",
        channelList: "v live.channelList",
        events: "v live.events",
        store: "v live.store",
        recentUploads: "v live.recentUploads",
        ofChannel: "v live.ofChannel",
        channelHome: "v live.channelHome",
        channelSchedule: "v live.channelSchedule",
        channelMy: "v live.channelMy",
        channelStore: "v live.channelStore",
        channelBoard: "v live.channelBoard",
        product: "v live.product",
        profileEdit: "v live.profileEdit",
        viewTheir: "v live.viewTheir",
        profile: "v live.profile",
        watched: "v live.watched",
        purchases: "v live.purchases",
        coins: "v live.coins",
        devices: "v live.devices",
        followed: "v live.followed",
        policies: "v live.policies"
      },
      await presence.getSetting("lang")
    );
  };

let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  let presenceData: PresenceData = {
    largeImageKey: "vlive2",
    startTimestamp: elapsed
  };

  const path = location.pathname.replace(/\/?$/, "/"),
    showBrowsing = await presence.getSetting("browse"),
    showLive = await presence.getSetting("live"),
    showVideo = await presence.getSetting("video"),
    showTimestamps = await presence.getSetting("timestamp"),
    newLang = await presence.getSetting("lang"),
    privacy = await presence.getSetting("privacy"),
    vidDetail = await presence.getSetting("vidDetail"),
    vidState = await presence.getSetting("vidState"),
    streamDetail = await presence.getSetting("streamDetail"),
    streamState = await presence.getSetting("streamState"),
    channelPageChannelName = document.querySelector(
      "#root > div > div > div > nav > div > a > strong"
    )
      ? document.querySelector(
          "#root > div > div > div > nav > div > a > strong"
        ).textContent
      : "ERROR: NOT FOUND!",
    channelPageBoardTitle = document.querySelector(
      "#root > div > div > div > div > div > h3"
    )
      ? document.querySelector("#root > div > div > div > div > div > h3")
          .textContent
      : "ERROR: NOT FOUND!",
    productPageTitle = document.querySelector("h3.tit")
      ? document.querySelector("h3.tit").textContent
      : "ERROR: NOT FOUND!",
    productPageChannel = document.querySelector("a.name")
      ? document.querySelector("a.name").textContent
      : "ERROR: NOT FOUND!",
    searchPageValue = privacy
      ? undefined
      : document.querySelector("#searchForm > input")
      ? (document.querySelector("#searchForm > input") as HTMLInputElement)
          .value
      : "ERROR: NOT FOUND!",
    statics: {
      [name: string]: PresenceData;
    } = {
      "/home/new/": {
        details: (await strings).browseThrough,
        state: (await strings).newVid,
        smallImageKey: "reading"
      },
      "/home/chart/": {
        details: (await strings).browseThrough,
        state: (await strings).charts,
        smallImageKey: "reading"
      },
      "/home/my/": {
        details: (await strings).recentUploads.includes("{0}")
          ? (await strings).recentUploads.split("{0}")[0]
          : (await strings).recentUploads,
        state: (await strings).recentUploads.includes("{0}")
          ? (await strings).recentUploads.split("{0}")[1]
          : undefined,
        smallImageKey: "reading"
      },
      "/my/": {
        details: (await strings).viewTheir,
        state: (await strings).profile,
        smallImageKey: "reading"
      },
      "/my/profile/": {
        details: (await strings).profileEdit.includes("{0}")
          ? (await strings).profileEdit.split("{0}")[0]
          : (await strings).profileEdit,
        state: (await strings).profileEdit.includes("{0}")
          ? (await strings).profileEdit.split("{0}")[1]
          : undefined,
        smallImageKey: "search"
      },
      "/my/watched/": {
        details: (await strings).viewTheir,
        state: (await strings).watched,
        smallImageKey: "reading"
      },
      "/my/purchased/": {
        details: (await strings).viewTheir,
        state: (await strings).purchases,
        smallImageKey: "reading"
      },
      "/my/coin/": {
        details: (await strings).viewTheir,
        state: (await strings).coins,
        smallImageKey: "reading"
      },
      "/my/devices/": {
        details: (await strings).viewTheir,
        state: (await strings).devices,
        smallImageKey: "reading"
      },
      "/my/channels/": {
        details: (await strings).viewTheir,
        state: (await strings).followed,
        smallImageKey: "reading"
      },
      "/upcoming/": {
        details: (await strings).browseThrough,
        state: (await strings).upcoming,
        smallImageKey: "reading"
      },
      "/channels/": {
        details: (await strings).browseThrough,
        state: (await strings).channelList,
        smallImageKey: "reading"
      },
      "/channel/(\\w*\\d*)/": {
        details: (await strings).channelHome,
        state: (await strings).ofChannel.replace("{0}", channelPageChannelName),
        smallImageKey: "reading"
      },
      "/channel/(\\w*\\d*)/schedule/": {
        details: (await strings).channelSchedule,
        state: (await strings).ofChannel.replace("{0}", channelPageChannelName),
        smallImageKey: "reading"
      },
      "/channel/(\\w*\\d*)/my/": {
        details: (await strings).channelMy,
        state: (await strings).ofChannel.replace("{0}", channelPageChannelName),
        smallImageKey: "reading"
      },
      "/channel/(\\w*\\d*)/store/": {
        details: (await strings).channelStore,
        state: (await strings).ofChannel.replace("{0}", channelPageChannelName),
        smallImageKey: "reading"
      },
      "/channel/(\\w*\\d*)/board/": {
        details: (await strings).channelBoard.replace(
          "{0}",
          channelPageBoardTitle
        ),
        state: (await strings).ofChannel.replace("{0}", channelPageChannelName),
        smallImageKey: "reading"
      },
      "/events/": {
        details: (await strings).browseThrough,
        state: (await strings).events,
        smallImageKey: "reading"
      },
      "/vstore/": {
        details: (await strings).browseThrough,
        state: (await strings).store,
        smallImageKey: "reading"
      },
      "/product/(\\w*\\d*)/": {
        details: (await strings).product.replace("{0}", productPageChannel),
        state: productPageTitle,
        smallImageKey: "reading"
      },
      "/search/": {
        details: privacy
          ? (await strings).searchSomething
          : (await strings).searchFor,
        state: searchPageValue,
        smallImageKey: "search"
      },
      "/policies/": {
        details: (await strings).policies,
        smallImageKey: "reading"
      },
      "/about/": {
        details: (await strings).readingAbout + " V LIVE",
        smallImageKey: "reading"
      }
    };

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (showBrowsing) {
    for (const [k, v] of Object.entries(statics)) {
      if (path.match(k)) {
        presenceData = { ...presenceData, ...v };
      }
    }

    if (privacy) {
      presenceData.details = (await strings).browse;
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    }
  }

  //* Video page
  if (path.match("/video/(\\d*)/")) {
    const video = document.querySelector("video"),
      upcoming = document.querySelector(
        "#root > div > div > div > div > div > div > div > div > div> div > div > div > strong"
      ),
      badge = document.querySelector(
        "#root > div > div > div > div > div > div > div > div > div > span > em"
      ),
      title = document.querySelector(
        "#root > div > div > div > div > div > div > div > div > div > span > strong"
      )
        ? document.querySelector(
            "#root > div > div > div > div > div > div > div > div > div > span > strong"
          ).textContent
        : "ERROR: NOT FOUND!";

    if (video) {
      if (badge && badge.className.includes("-liveon--")) {
        //* Is a livestream
        if (showLive) {
          if (document.querySelector(".timeBox")) {
            const timestamp = presence.timestampFromFormat(
              document.querySelector(".timeBox").textContent
            );
            presenceData.startTimestamp = Math.floor(
              Date.now() / 1000 - timestamp
            );
          }
          presenceData.smallImageKey = video.paused ? "pause" : "live";
          presenceData.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).live;
          presenceData.details = streamDetail
            .replace("%title%", title)
            .replace("%streamer%", channelPageChannelName);
          presenceData.state = streamState
            .replace("%title%", title)
            .replace("%streamer%", channelPageChannelName);

          if (video.paused) {
            delete presenceData.startTimestamp;
          }
        }

        //* Privacy mode enabled.
        if (privacy && showLive) {
          presenceData.details = (await strings).watchingLive;
          delete presenceData.state;
        } else if (showBrowsing && !showLive) {
          presenceData.details = (await strings).browse;
          presenceData.smallImageKey = "reading";
          delete presenceData.state;
        }
      } else {
        //* Is a a normal video
        if (showVideo) {
          const timestamps = presence.getTimestampsfromMedia(video);
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];
          presenceData.smallImageKey = video.paused ? "pause" : "play";
          presenceData.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play;
          presenceData.details = vidDetail
            .replace("%title%", title)
            .replace("%uploader%", channelPageChannelName);
          presenceData.state = vidState
            .replace("%title%", title)
            .replace("%uploader%", channelPageChannelName);

          if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        }

        //* Privacy mode enabled.
        if (privacy && showVideo) {
          presenceData.details = (await strings).watchingVid;
          delete presenceData.state;
        } else if (showBrowsing && !showVideo) {
          presenceData.details = (await strings).browse;
          presenceData.smallImageKey = "reading";
          delete presenceData.state;
        }
      }
    } else if (upcoming) {
      //* Video not out yet...
      if (badge && badge.className.includes("-live--")) {
        //* Will be a livestream
        if (showLive) {
          presenceData.details = streamDetail
            .replace("%title%", title)
            .replace("%streamer%", channelPageChannelName);
          presenceData.state = streamState
            .replace("%title%", title)
            .replace("%streamer%", channelPageChannelName);
          presenceData.smallImageKey = "premiere-live";
          presenceData.smallImageText = (await strings).waitingLiveThe;
        }

        //* Privacy mode enabled.
        if (privacy && showLive) {
          presenceData.details = (await strings).waitingLive;
          delete presenceData.state;
          delete presenceData.smallImageText;
        } else if (showBrowsing && !showLive) {
          presenceData.details = (await strings).browse;
          presenceData.smallImageKey = "reading";
          delete presenceData.state;
          delete presenceData.smallImageText;
        }
      } else {
        //* Will be a normal video
        if (showVideo) {
          presenceData.details = vidDetail
            .replace("%title%", title)
            .replace("%uploader%", channelPageChannelName);
          presenceData.state = vidState
            .replace("%title%", title)
            .replace("%uploader%", channelPageChannelName);
          presenceData.smallImageKey = "premiere";
          presenceData.smallImageText = (await strings).waitingVidThe;
        }

        //* Privacy mode enabled.
        if (privacy && showVideo) {
          presenceData.details = (await strings).waitingVid;
          delete presenceData.state;
          delete presenceData.smallImageText;
        } else if (showBrowsing && !showVideo) {
          presenceData.details = (await strings).browse;
          presenceData.smallImageKey = "reading";
          delete presenceData.state;
          delete presenceData.smallImageText;
        }
      }
    }
  }

  //* Post page
  if (path.match("/post/(\\d*-\\d*)/")) {
    const video = document.querySelector("video"),
      videoTitle = document.querySelector(
        "#root > div > div > div > div > div > div > div > div > div > span > strong"
      ),
      videoPoster = document.querySelector(
        "#root > div > div > div > div > div > div > div > div > div > div > div > a > span"
      ),
      postTitle = document.querySelector(
        "#root > div > div > div > div > div > div > div > strong"
      ),
      postPoster = document.querySelector(
        "#root > div > div > div > div > div > div > div > div > div > a > span"
      );

    if (video && videoTitle && videoPoster) {
      //* Has video
      if (showVideo) {
        const timestamps = presence.getTimestampsfromMedia(video);
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.details = vidDetail
          .replace("%title%", videoTitle.textContent)
          .replace("%uploader%", videoPoster.textContent);
        presenceData.state = vidState
          .replace("%title%", videoTitle.textContent)
          .replace("%uploader%", videoPoster.textContent);

        if (video.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }

      //* Privacy mode enabled.
      if (privacy && showVideo) {
        presenceData.details = (await strings).watchingVid;
        delete presenceData.state;
      } else if (showBrowsing && !showVideo) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
      }
    } else if (postTitle && postPoster) {
      //* Normal text post
      presenceData.details =
        (await strings).readingPost + " (" + postPoster.textContent + ")";
      presenceData.state = postTitle.textContent;
      presenceData.smallImageKey = "reading";
    }
  }

  if (presenceData.details) {
    if (!showTimestamps) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData);

    if (
      presenceData.details.includes("ERROR: NOT FOUND!") ||
      (presenceData.state && presenceData.state.includes("ERROR: NOT FOUND!"))
    ) {
      presence.error(
        `Unable to find an element...\nPlease contact Bas950#0950 in Discord (https://discord.premid.app/).\nPath: ${path}`
      );
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
    presence.info(
      `Looks like your current page is unsupported!\nPlease contact Bas950#0950 in Discord (https://discord.premid.app/).\nPath: ${path}`
    );
  }
});
