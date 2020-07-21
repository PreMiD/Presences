const presence = new Presence({
  clientId: "607754656453623843"
});
const strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live",
  browse: "presence.activity.browsing"
});

const getElement = (query: string): string | undefined => {
  return document.querySelector(query)?.textContent || undefined;
};

const getTimestamps = (
  videoTime: number,
  videoDuration: number
): Array<number> => {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
};

let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const statics = {
  "/downloads/": {
    details: "Viewing Page...",
    state: "Downloads"
  },
  "/jobs/": {
    details: "Viewing Page...",
    state: "Jobs"
  },
  "/turbo/": {
    details: "Viewing Page...",
    state: "Turbo"
  },
  "/p/partners/": {
    details: "Viewing Page...",
    state: "Partners"
  },
  "/p/press-center/": {
    details: "Viewing Page...",
    state: "Press Center"
  },
  "/p/security/": {
    details: "Viewing Page...",
    state: "Security"
  },
  "/p/legal/accessibility/": {
    details: "Viewing Page...",
    state: "Accessibility"
  },
  "/p/legal/ad-choices/": {
    details: "Viewing Page...",
    state: "Ad Choices"
  },
  "/p/legal/community-guidelines/": {
    details: "Viewing Page...",
    state: "Community Guidelines"
  },
  "/p/legal/cookie-policy/": {
    details: "Viewing Page...",
    state: "Cookie Policy"
  },
  "/p/legal/privacy-notice/": {
    details: "Viewing Page...",
    state: "Privacy Notice"
  },
  "/p/legal/terms-of-serice/": {
    details: "Viewing Page...",
    state: "Terms of Service"
  },
  "/p/(\\w*)/about/": {
    details: "Viewing Info...",
    state: "About"
  },
  "/p/(\\w*)/stream/": {
    details: "Viewing Info...",
    state: "Stream"
  },
  "/p/(\\w*)/watch/": {
    details: "Viewing Info...",
    state: "Watch"
  },
  "/p/(\\w*)/company/": {
    details: "Viewing Info...",
    state: "Company"
  },
  "/p/(\\w*)/giftcard/": {
    details: "Viewing Info...",
    state: "Giftcards"
  },
  "/p/(\\w*)/artists/": {
    details: "Viewing Info...",
    state: "Artists"
  }
};

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/");

  const showBrowsing = await presence.getSetting("browse");
  const showLive = await presence.getSetting("live");
  const showVideo = await presence.getSetting("video");
  const showTimestamps = await presence.getSetting("timestamp");

  let data: PresenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "twitch",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: elapsed,
    endTimestamp: undefined
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  const parseVideo = async (video: HTMLVideoElement): Promise<void> => {
    const live = video.duration >= 1073741824;

    if (showLive && live) {
      // Live

      data.details = getElement(".channel-info-content h2"); // Title
      data.state = getElement(".channel-info-content .tw-c-text-base"); // Streamer
      data.smallImageKey = "live";
      data.smallImageText = (await strings).live;
    }

    if (showVideo && !live) {
      // Video or Clips

      data.details = getElement(".channel-info-content h2")?.split("•").shift();
      data.state = getElement(".channel-info-content .tw-c-text-base"); //Streamer
      data.smallImageKey = "play";
      data.smallImageText = (await strings).play;

      const timestamps = getTimestamps(video.currentTime, video.duration);
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    }

    if (((showLive && live) || (showVideo && !live)) && video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
      data.smallImageKey = "pause";
      data.smallImageText = (await strings).pause;
    }
  };

  if (showBrowsing) {
    for (const [k, v] of Object.entries(statics)) {
      if (path.match(k)) {
        data = { ...data, ...v };
      }
    }

    if (path === "/") {
      data.details = "Browsing...";
      data.state = "Home";
    }

    let user = getElement(".home-header-sticky .tw-title");
    if (user) {
      const tab = getElement(".tw-c-text-link");
      user += tab ? ` (${tab})` : "";

      data.details = "Viewing Profile...";
      data.state = user;
    }

    if (path.includes("/team/")) {
      let teamName = document.location.pathname.split("/").pop();
      teamName = teamName
        .split("_")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");

      data.details = "Viewing Team...";
      data.state = teamName;
    }

    if (path.includes("/settings/")) {
      data.details = "Viewing Settings...";
      data.state = getElement(".tw-tab__link--active");
    }

    if (path.includes("/friends/")) {
      const tab = getElement(".tw-tab__link--active");

      data.details = "Viewing Friends...";
      data.state = tab;
    }

    if (path.includes("/subscriptions/")) {
      const tab = getElement(".tw-tab__link--active");

      data.details = "Viewing Subscriptions...";
      data.state = !tab.includes("Your")
        ? tab.replace("Subscriptions", "")
        : undefined;
    }

    if (path.includes("/wallet/")) {
      const tab = getElement(".tw-c-text-link");

      data.details = "Viewing Wallet...";
      data.state = !tab.includes("Wallet") ? tab : undefined;
    }

    if (path.includes("/directory/")) {
      const tab = getElement(".tw-c-text-link");

      data.details = "Browsing...";
      data.state = tab;
    }

    if (path.includes("/directory/game/")) {
      const category = getElement(".directory-header-new__banner-cover h1");
      const tab = getElement(".tw-c-text-link");

      data.details = "Viewing Category...";
      data.state = category && category + ` (${tab})`;
    }

    if (path.includes("/directory/esports/")) {
      const game = getElement(
        ".esports-directory-single-category-header__info p"
      );

      data.details = "Viewing Esports...";
      data.state = game;

      console.log(data.details);
    }

    if (path.includes("/directory/following/")) {
      const tab = getElement(".tw-c-text-link");

      data.details = "Viewing People I Follow...";
      data.state = !tab.includes("Overview") ? tab : undefined;
    }
  }

  if (path.includes("/squad/")) {
    const squad = document.querySelectorAll(".squad-stream-channel-card a");

    const squadNames: string[] = [];
    squad.forEach((squadUser) => {
      squadNames.push(squadUser.textContent);
    });

    data.details = "Watching Squad...";
    data.state = squadNames.join(", ");
    data.smallImageKey = "live";
    data.smallImageText = (await strings).live;
  }

  if (path.includes("/moderator/")) {
    const user = getElement(".stream-info-card p > a");
    const status = getElement(".modview-dock-widget p");

    data.details = "Moderating User...";
    data.state = user;

    if (status !== "Offline") {
      data.smallImageKey = "live";
      data.smallImageText = (await strings).live;
    }
  }

  const homeCarousel: HTMLDivElement = document.querySelector(
    ".home-carousel-info"
  );
  const channelRoot: HTMLDivElement = document.querySelector(".channel-root");
  const video: HTMLVideoElement = document.querySelector("video");
  if (!homeCarousel && channelRoot && video) {
    await parseVideo(video);
  }

  if (data.details) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }
    if (!showTimestamps) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
