let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href,
  oldLang = "en";

const presence = new Presence({
    clientId: "802958789555781663"
  }),
  getElement = (query: string): string | undefined => {
    return document.querySelector(query)
      ? document.querySelector(query).textContent
      : undefined;
  },
  getStrings = async () => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        live: "general.live",
        browse: "general.browsing",
        viewPage: "general.viewPage",
        home: "twitch.home",
        download: "twitch.downloads",
        jobs: "twitch.jobs",
        turbo: "twitch.turbo",
        partners: "twitch.partners",
        press: "twitch.press",
        security: "twitch.security",
        access: "twitch.access",
        ads: "twitch.ads",
        guidelines: "twitch.guidelines",
        terms: "general.terms",
        privacy: "general.privacy",
        cookie: "general.cookie",
        watchingLive: "general.watchingLive",
        watchingVid: "general.watchingVid",
        viewProfile: "general.viewProfile",
        viewCategory: "general.viewCategory",
        viewWallet: "twitch.wallet",
        viewEsports: "twitch.esports",
        viewFollow: "twitch.viewFollow",
        viewTeam: "twitch.viewTeam",
        viewDropsInv: "twitch.viewDropsInv",
        viewDropsComp: "twitch.viewDropsComp",
        viewing: "general.viewing",
        searchingFor: "general.searchFor",
        searchingSomething: "general.searchSomething",
        viewSettings: "twitch.viewSettings",
        viewFriends: "twitch.viewFriends",
        subs: "twitch.subs",
        squad: "twitch.squad",
        modStreamer: "twitch.modStreamer",
        readingAbout: "general.readingAbout",
        redeem: "twitch.redeem",
        camp: "twitch.camp",
        campBasic: "twitch.campBasic",
        campSetup: "twitch.campSetup",
        campLevel: "twitch.campLevel",
        campConnect: "twitch.campConnect",
        campReward: "twitch.campReward",
        campMusic: "twitch.campMusic",
        campLive: "twitch.campLive",
        dashboard: "twitch.dashboard",
        dashboardManage: "twitch.dashboardManage",
        manageRoles: "twitch.manageRoles",
        produce: "twitch.produce",
        viewTheir: "twitch.viewTheir",
        channelAnaly: "twitch.channelAnaly",
        streamSum: "twitch.streamSum",
        achievements: "twitch.achievements",
        activity: "twitch.activity",
        followList: "twitch.followList",
        colls: "twitch.colls",
        clips: "twitch.clips",
        channelSettings: "twitch.channelSettings",
        moderationSettings: "twitch.moderationSettings",
        dropsSettings: "twitch.dropsSettings",
        tools: "twitch.tools",
        extensions: "twitch.extensions",
        brand: "twitch.brand",
        brandReal: "twitch.brandReal",
        brandMadness: "twitch.brandMadness",
        brandExpression: "twitch.brandExpression",
        brandTogether: "twitch.brandTogether",
        brandWatch: "twitch.brandWatch",
        blogArchive: "twitch.blogArchive",
        readingArticle: "general.readingArticle",
        blogBrowse: "twitch.blogBrowse",
        blogs: "twitch.blogs",
        help: "twitch.help",
        helpTopic: "twitch.helpTopic",
        helpTopicCatalog: "twitch.helpTopicCatalog",
        affiliate: "twitch.affiliate",
        dev: "twitch.dev",
        devProduct: "twitch.devProduct",
        devShowcase: "twitch.devShowcase",
        devSupport: "twitch.devSupport",
        devDocs: "twitch.devDocs",
        incident: "general.incidentHistory",
        uptime: "general.uptimeHistory",
        forums: "general.forums",
        thread: "general.readingThread",
        user: "general.viewUser",
        watchStream: "general.buttonWatchStream",
        watchVideo: "general.buttonWatchVideo"
      },
      oldLang
    );
  };

let strings = getStrings();

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/"),
    showBrowsing = await presence.getSetting("browse"),
    showLive = await presence.getSetting("live"),
    showVideo = await presence.getSetting("video"),
    showTimestamps = await presence.getSetting("timestamp"),
    newLang = await presence.getSetting("lang").catch(() => "en"),
    privacy = await presence.getSetting("privacy"),
    vidDetail = await presence.getSetting("vidDetail"),
    vidState = await presence.getSetting("vidState"),
    streamDetail = await presence.getSetting("streamDetail"),
    streamState = await presence.getSetting("streamState"),
    logo: number = await presence.getSetting("logo"),
    logoArr = ["twitch", "black-ops", "white", "purple", "pride"],
    devLogo: number = await presence.getSetting("devLogo"),
    devLogoArr = ["dev-main", "dev-white", "dev-purple"],
    buttons = await presence.getSetting("buttons");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  let presenceData: PresenceData = {
    largeImageKey: logoArr[logo] || "twitch",
    startTimestamp: elapsed
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (document.location.hostname === "www.twitch.tv") {
    //* Main website
    const parseVideo = async (video: HTMLVideoElement): Promise<void> => {
        const live = video.duration >= 1073741824;

        if (showLive && live) {
          //* Live
          const title = getElement(".channel-info-content h2"),
            streamer = getElement(".channel-info-content h1"),
            game =
              document.querySelector("a[data-a-target='stream-game-link']")
                ?.textContent || "Just Chatting";
          presenceData.details =
            title && streamer
              ? streamDetail
                  .replace("%title%", title)
                  .replace("%streamer%", streamer)
                  .replace("%game%", game)
              : undefined;
          presenceData.state =
            title && streamer
              ? streamState
                  .replace("%title%", title)
                  .replace("%streamer%", streamer)
                  .replace("%game%", game)
              : undefined;
          presenceData.smallImageKey = "live";
          presenceData.smallImageText = (await strings).live;
          if (buttons) {
            presenceData.buttons = [
              {
                label: (await strings).watchStream,
                url: document.URL.split("?")[0]
              }
            ];
          }
        }

        if (showVideo && !live) {
          //* Video or Clips
          const title = getElement(".channel-info-content h2")
              .split("•")
              .shift(),
            uploader = getElement(".channel-info-content h1"),
            game =
              document.querySelector("a[data-a-target='stream-game-link']")
                ?.textContent || "Just Chatting";
          presenceData.details =
            title && uploader
              ? vidDetail
                  .replace("%title%", title)
                  .replace("%uploader%", uploader)
                  .replace("%game%", game)
              : undefined;
          presenceData.state =
            title && uploader
              ? vidState
                  .replace("%title%", title)
                  .replace("%uploader%", uploader)
                  .replace("%game%", game)
              : undefined;
          presenceData.smallImageKey = "play";
          presenceData.smallImageText = (await strings).play;

          const timestamps = presence.getTimestampsfromMedia(video);
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          if (buttons) {
            presenceData.buttons = [
              {
                label: (await strings).watchVideo,
                url: document.URL.split("?")[0]
              }
            ];
          }
        }

        if (((showLive && live) || (showVideo && !live)) && video.paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
          presenceData.smallImageKey = "pause";
          presenceData.smallImageText = (await strings).pause;
        }

        //* Privacy mode enabled.
        if (privacy && showLive && live) {
          presenceData.details = (await strings).watchingLive;
          delete presenceData.state;
        } else if (privacy && showVideo && !live) {
          presenceData.details = (await strings).watchingVid;
          delete presenceData.state;
        } else if (showBrowsing && (!showVideo || !showLive)) {
          presenceData.details = (await strings).browse;
          delete presenceData.state;
        }
      },
      statics = {
        "/downloads/": {
          details: (await strings).viewPage,
          state: (await strings).download
        },
        "/jobs/": {
          details: (await strings).viewPage,
          state: (await strings).jobs
        },
        "/turbo/": {
          details: (await strings).viewPage,
          state: (await strings).turbo
        },
        "/broadcast/studio/": {
          details: (await strings).readingAbout,
          state: "Twitch Studio"
        },
        "/redeem/": {
          details: (await strings).redeem
        },
        "/p/partners/": {
          details: (await strings).viewPage,
          state: (await strings).partners
        },
        "/p/press-center/": {
          details: (await strings).viewPage,
          state: (await strings).press
        },
        "/p/security/": {
          details: (await strings).viewPage,
          state: (await strings).security
        },
        "/p/legal/accessibility/": {
          details: (await strings).viewPage,
          state: (await strings).access
        },
        "/p/legal/ad-choices/": {
          details: (await strings).viewPage,
          state: (await strings).ads
        },
        "/p/legal/community-guidelines/": {
          details: (await strings).viewPage,
          state: (await strings).guidelines
        },
        "/p/legal/cookie-policy/": {
          details: (await strings).viewPage,
          state: (await strings).cookie
        },
        "/p/legal/privacy-notice/": {
          details: (await strings).viewPage,
          state: (await strings).privacy
        },
        "/p/legal/terms-of-serice/": {
          details: (await strings).viewPage,
          state: (await strings).terms
        },
        "/p/(\\w*|\\w*-\\w*)/about/": {
          details: (await strings).readingAbout,
          state: "Twitch"
        },
        "/p/(\\w*|\\w*-\\w*)/stream/": {
          details: (await strings).readingAbout,
          state: "How to stream"
        },
        "/p/(\\w*|\\w*-\\w*)/watch/": {
          details: (await strings).readingAbout,
          state: "How to watch"
        },
        "/p/(\\w*|\\w*-\\w*)/company/": {
          details: (await strings).readingAbout,
          state: "The Company"
        },
        "/p/(\\w*|\\w*-\\w*)/giftcard/": {
          details: (await strings).readingAbout,
          state: "Giftcards"
        },
        "/p/(\\w*|\\w*-\\w*)/artists/": {
          details: (await strings).readingAbout,
          state: "Artists"
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/learn-the-basics/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).campBasic
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/setting-up-your-stream/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).campSetup
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/level-up/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).campLevel
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/connect-and-engage/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).campConnect
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/get-rewarded/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).campReward
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/twitch-music-getting-started/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).campMusic
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/live/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).campLive
        },
        "/creatorcamp/(\\w*|\\w*-\\w*)/": {
          details: (await strings).camp + " | " + (await strings).viewPage,
          state: (await strings).home
        }
      };

    if (showBrowsing) {
      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (path === "/") {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).home;
      }

      let user = getElement(".home-header-sticky .tw-title");
      if (user) {
        const tab = getElement(".tw-c-text-link");
        user += tab ? ` (${tab})` : "";

        presenceData.details = (await strings).viewProfile;
        presenceData.state = user;
      }

      if (path.includes("/team/")) {
        const teamName = document.location.pathname
          .split("/")
          .pop()
          .split("_")
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");

        presenceData.details = (await strings).viewTeam;
        presenceData.state = teamName;
      }

      if (path.includes("/settings/")) {
        presenceData.details = (await strings).viewSettings;
        presenceData.state = getElement(".tw-tab__link--active");
      }

      if (path.includes("/friends/")) {
        const tab = getElement(".tw-tab__link--active");

        presenceData.details = (await strings).viewFriends;
        presenceData.state = tab;
      }

      let searching = false;
      if (path.includes("/search/")) {
        searching = true;
        const search = document.querySelector(
          ".tw-combo-input__input > div > input"
        ) as HTMLInputElement;

        presenceData.details = (await strings).searchingFor;
        presenceData.state = search ? search.value : undefined;
        presenceData.smallImageKey = "search";
      }

      if (path.includes("/drops/inventory/")) {
        presenceData.details = (await strings).viewDropsInv;
      }

      if (path.includes("/drops/campaigns/")) {
        presenceData.details = (await strings).viewDropsComp;

        const drops = document.querySelector(
          ".drops-root__content > div:nth-child(5)"
        ).children;
        let activeDrop = null;

        for (const drop of drops) {
          if (!drop.children[1].className.includes("tw-hide")) {
            activeDrop =
              drop.firstElementChild.firstElementChild.firstElementChild
                .children[1].firstElementChild.children[0].textContent +
              " (" +
              drop.firstElementChild.firstElementChild.firstElementChild
                .children[1].firstElementChild.children[1].textContent +
              ")";
          }
        }

        if (activeDrop) presenceData.state = activeDrop;
      }

      if (path.includes("/subscriptions/")) {
        const tab = getElement(".tw-tab__link--active");

        presenceData.details = (await strings).subs;
        presenceData.state = !tab.includes("Your")
          ? tab.replace("Subscriptions", "")
          : undefined;
      }

      if (path.includes("/wallet/")) {
        const tab = getElement(".tw-c-text-link");

        presenceData.details = (await strings).viewWallet;
        presenceData.state = !tab.includes("Wallet") ? tab : undefined;
      }

      if (path.includes("/directory/")) {
        const tab = getElement(".tw-c-text-link");

        presenceData.details = (await strings).browse;
        presenceData.state = tab;
      }

      if (path.includes("/directory/game/")) {
        const category = getElement(".directory-header-new__banner-cover h1"),
          tab = getElement(".tw-c-text-link");

        presenceData.details = (await strings).viewCategory;
        presenceData.state = category && category + ` (${tab})`;
      }

      if (path.includes("/directory/esports/")) {
        const game = getElement(
          ".esports-directory-single-category-header__info p"
        );

        presenceData.details = (await strings).viewEsports;
        presenceData.state = game;
      }

      if (path.includes("/directory/following/")) {
        const tab = getElement(".tw-c-text-link");

        presenceData.details = (await strings).viewFollow;
        presenceData.state = !tab.includes("Overview") ? tab : undefined;
      }

      if (privacy && searching) {
        presenceData.details = (await strings).searchingSomething;
        delete presenceData.state;
      } else if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }

    if (path.includes("/squad/")) {
      const squad = document.querySelectorAll(".squad-stream-channel-card a"),
        squadNames: string[] = [];

      squad.forEach((squadUser) => {
        squadNames.push(squadUser.textContent);
      });

      presenceData.details = (await strings).squad;
      presenceData.state = squadNames.join(", ");
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = (await strings).live;
    }

    if (path.includes("/moderator/")) {
      const user = getElement(".stream-info-card p > a"),
        status = getElement(".modview-dock-widget p");

      presenceData.details = (await strings).modStreamer;
      presenceData.state = user;

      if (status !== "Offline") {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live;
      }
    }

    const homeCarousel: HTMLDivElement = document.querySelector(
        ".home-carousel-info"
      ),
      channelRoot: HTMLDivElement = document.querySelector(".channel-root"),
      video: HTMLVideoElement = document.querySelector("video");
    if (!homeCarousel && channelRoot && video) {
      await parseVideo(video);
    }
  } else if (document.location.hostname === "dashboard.twitch.tv") {
    //* Creator Dashboard
    if (showBrowsing) {
      const statics = {
        "/home/": {
          details: (await strings).dashboard + " | " + (await strings).viewPage,
          state: (await strings).home
        },
        "/stream-manager/": {
          details: (await strings).dashboard,
          state: (await strings).dashboardManage
        },
        "/channel-analytics/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).channelAnaly
        },
        "/stream-summary/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).streamSum
        },
        "/achievements/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).achievements
        },
        "/community/roles/": {
          details: (await strings).dashboard,
          state: (await strings).manageRoles
        },
        "/community/activity/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).activity
        },
        "/community/followers-list/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).followList
        },
        "/content/video-producer/": {
          details: (await strings).dashboard,
          state: (await strings).produce
        },
        "/content/collections/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).colls
        },
        "/content/clips/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).clips
        },
        "/settings/channel/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).channelSettings
        },
        "/settings/moderation/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).moderationSettings
        },
        "/drops/": {
          details:
            (await strings).dashboard + " | " + (await strings).viewTheir,
          state: (await strings).dropsSettings
        },
        "/broadcast/": {
          details: (await strings).dashboard,
          state: (await strings).tools
        },
        "/extensions/": {
          details: (await strings).dashboard,
          state: (await strings).extensions
        }
      };

      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  } else if (document.location.hostname === "brand.twitch.tv") {
    //* Brand website
    if (showBrowsing) {
      const statics = {
        "/brand/": {
          details: (await strings).brand,
          state: (await strings).brandReal
        },
        "/madness/": {
          details: (await strings).brand,
          state: (await strings).brandMadness
        },
        "/expression/": {
          details: (await strings).brand,
          state: (await strings).brandExpression
        },
        "/together/": {
          details: (await strings).brand,
          state: (await strings).brandTogether
        }
      };

      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (
        path === "/" &&
        document.querySelector(".plyr").className.includes("plyr--playing")
      ) {
        presenceData.details = (await strings).brandWatch;
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).play;
        const timestamps = presence.getTimestamps(
          presence.timestampFromFormat(
            document.querySelector(".c-controls__time.plyr__time--current")
              .textContent
          ),
          presence.timestampFromFormat("01:30")
        );
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
      } else if (path === "/") {
        presenceData.details = (await strings).brand;
      }

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  } else if (document.location.hostname === "blog.twitch.tv") {
    //* Blog website
    if (showBrowsing) {
      const statics = {
        "/": {
          details: (await strings).blogBrowse
        },
        "/(\\w*|\\w*-\\w*)/archive/": {
          details: (await strings).blogArchive.replace(
            "{0}",
            location.pathname.replace(/\/?$/, "/").split("/")[3]
          )
        },
        "/(\\w*|\\w*-\\w*)/(\\d*)/(\\d*)/(\\d*)/((\\w*|\\w*-\\w*)*)/": {
          details:
            (await strings).blogs + " | " + (await strings).readingArticle,
          state: document.querySelector(".c-page-heading__text")
            ? document.querySelector(".c-page-heading__text").textContent
            : undefined
        }
      };

      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  } else if (document.location.hostname === "help.twitch.tv") {
    //* Help website
    if (showBrowsing) {
      const statics = {
        "/s/": {
          details: (await strings).help + " | " + (await strings).browse
        },
        "/s/topiccatalog/": {
          details: (await strings).helpTopicCatalog
        },
        "/s/topic/": {
          details: (await strings).helpTopic,
          state: document.querySelector(".headlineTitle")
            ? document.querySelector(".headlineTitle").textContent
            : undefined
        },
        "/s/article/": {
          details:
            (await strings).help + " | " + (await strings).readingArticle,
          state: document.querySelector(".articleTitle")
            ? document.querySelector(".articleTitle").textContent
            : undefined
        }
      };

      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  } else if (document.location.hostname === "affiliate.twitch.tv") {
    //* Help website
    if (showBrowsing) {
      presenceData.details = (await strings).readingAbout;
      presenceData.state = (await strings).affiliate;
      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = (await strings).browse;

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  } else if (document.location.hostname == "dev.twitch.tv") {
    //* Dev docs
    presenceData.largeImageKey = devLogoArr[devLogo] || "dev-main";
    if (showBrowsing) {
      const statics = {
        "/": {
          details: (await strings).dev + " | " + (await strings).browse
        },
        "/products/": {
          details: (await strings).dev + " | " + (await strings).viewing,
          state: (await strings).devProduct
        },
        "/showcase/": {
          details: (await strings).dev + " | " + (await strings).viewing,
          state: (await strings).devShowcase
        },
        "/support/": {
          details: (await strings).dev + " | " + (await strings).viewing,
          state: (await strings).devSupport
        },
        "/docs/": {
          details: (await strings).devDocs,
          state: (await strings).browse
        },
        "/docs/(\\w*|\\w*-\\w*)/": {
          details:
            (await strings).devDocs + " | " + (await strings).readingAbout,
          state: document.querySelector(".text-content > h1")
            ? document.querySelector(".text-content > h1").textContent
            : undefined
        }
      };

      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  } else if (document.location.hostname === "discuss.dev.twitch.tv") {
    //! Development forums
    presenceData.largeImageKey = devLogoArr[devLogo] || "dev-main";
    if (showBrowsing) {
      const statics = {
        "/": {
          details:
            (await strings).dev +
            " (" +
            (await strings).forums +
            ") | " +
            (await strings).browse
        },
        "/c/": {
          details:
            (await strings).dev +
            " (" +
            (await strings).forums +
            ") | " +
            (await strings).viewCategory,
          state: document.querySelector(".category-name")
            ? document.querySelector(".category-name").textContent
            : undefined
        },
        "/t/": {
          details:
            (await strings).dev +
            " (" +
            (await strings).forums +
            ") | " +
            (await strings).thread,
          state: document.querySelector(".fancy-title")
            ? document.querySelector(".fancy-title").textContent
            : undefined
        },
        "/u/": {
          details:
            (await strings).dev +
            " (" +
            (await strings).forums +
            ") | " +
            (await strings).user,
          state: document.querySelector(".username")
            ? document.querySelector(".username").textContent
            : undefined
        }
      };

      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  } else if (
    document.location.hostname === "devstatus.twitch.tv" ||
    document.location.hostname === "status.twitch.tv"
  ) {
    //* Status pages
    if (document.location.hostname == "devstatus.twitch.tv")
      presenceData.largeImageKey = devLogoArr[devLogo] || "dev-main";
    if (showBrowsing) {
      const statics = {
        "/": {
          details: "Status page | " + (await strings).browse
        },
        "/incidents/": {
          details: "Status page | " + (await strings).viewing,
          state: document.querySelector(".page-title > div")
            ? document.querySelector(".page-title > div").textContent
            : undefined
        },
        "/history/": {
          details: "Status page | " + (await strings).viewing,
          state: (await strings).incident
        },
        "/uptime/": {
          details: "Status page | " + (await strings).viewing,
          state: (await strings).uptime
        }
      };

      for (const [k, v] of Object.entries(statics)) {
        if (path.match(k)) {
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
          presenceData = { ...presenceData, ...v };
        }
      }

      if (privacy) {
        presenceData.details = (await strings).browse;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }
  }

  if (presenceData.details) {
    if (!showTimestamps) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
