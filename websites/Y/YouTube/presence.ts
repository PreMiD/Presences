const presence = new Presence({
    clientId: "463097721130188830"
  }),
  // YouTube TV separator pattern
  pattern = "•";

function truncateAfter(str: string, pattern: string): string {
  return str.slice(0, str.indexOf(pattern));
}

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      live: "general.live",
      ad: "youtube.ad",
      search: "general.searchFor",
      browsingVid: "youtube.browsingVideos",
      browsingPlayl: "youtube.browsingPlaylists",
      viewCPost: "youtube.viewingCommunityPost",
      ofChannel: "youtube.ofChannel",
      readChannel: "youtube.readingChannel",
      searchChannel: "youtube.searchChannel",
      trending: "youtube.trending",
      browsingThrough: "youtube.browsingThrough",
      subscriptions: "youtube.subscriptions",
      library: "youtube.library",
      history: "youtube.history",
      purchases: "youtube.purchases",
      reports: "youtube.reportHistory",
      upload: "youtube.upload",
      viewChannel: "general.viewChannel",
      viewAllPlayL: "youtube.viewAllPlaylist",
      viewEvent: "youtube.viewLiveEvents",
      viewLiveDash: "youtube.viewLiveDashboard",
      viewAudio: "youtube.viewAudioLibrary",
      studioVid: "youtube.studio.viewVideos",
      studioEdit: "youtube.studio.editVideo",
      studioAnaly: "youtube.studio.videoAnalytics",
      studioComments: "youtube.studio.videoComments",
      studioTranslate: "youtube.studio.videoTranslations",
      studioTheir: "youtube.studio.viewTheir",
      studioCAnaly: "youtube.studio.channelAnalytics",
      studioCComments: "youtube.studio.channelComments",
      studioCTranslate: "youtube.studio.channelTranslations",
      studioArtist: "youtube.studio.artistPage",
      studioDash: "youtube.studio.dashboard",
      viewPlaylist: "general.viewPlaylist",
      readAbout: "general.readingAbout",
      viewAccount: "general.viewAccount",
      viewHome: "general.viewHome",
      watchVid: "general.watchingVid",
      watchLive: "general.watchingLive",
      browsing: "general.browsing",
      searchSomething: "general.searchSomething",
      watchStreamButton: "general.buttonWatchStream",
      watchVideoButton: "general.buttonWatchVideo",
      viewChannelButton: "general.buttonViewChannel"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  //* Update strings if user selected another language.
  const newLang = await presence.getSetting("lang").catch(() => "en"),
    privacy = await presence.getSetting("privacy"),
    time = await presence.getSetting("time"),
    vidDetail = await presence.getSetting("vidDetail"),
    vidState = await presence.getSetting("vidState"),
    buttons = await presence.getSetting("buttons");
  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  //* If there is a vid playing
  const video: HTMLVideoElement = document.querySelector(".video-stream");
  if (video !== null && !isNaN(video.duration)) {
    let oldYouTube: boolean = null,
      YouTubeTV: boolean = null,
      YouTubeEmbed: boolean = null,
      title: HTMLElement;

    //* Checking if user has old YT layout.
    document.querySelector(".watch-title") !== null
      ? (oldYouTube = true)
      : (oldYouTube = false);

    document.querySelector(".player-video-title") !== null
      ? (YouTubeTV = true)
      : (YouTubeTV = false);

    document.location.pathname.includes("/embed")
      ? (YouTubeEmbed = true)
      : (YouTubeEmbed = false);

    //* Due to differences between old and new YouTube, we should add different selectors.
    // Get title
    YouTubeEmbed
      ? (title = document.querySelector("div.ytp-title-text > a"))
      : oldYouTube && document.location.pathname.includes("/watch")
      ? (title = document.querySelector(".watch-title"))
      : YouTubeTV
      ? (title = document.querySelector(".player-video-title"))
      : !document.location.pathname.includes("/watch")
      ? (title = document.querySelector(".ytd-miniplayer .title"))
      : (title = document.querySelector(
          "h1 yt-formatted-string.ytd-video-primary-info-renderer"
        ));

    let uploaderTV: Element | string,
      uploaderMiniPlayer: HTMLElement,
      uploader2: HTMLElement,
      edited: boolean,
      uploaderEmbed: HTMLElement;
    (edited = false),
      (uploaderTV =
        document.querySelector(".player-video-details") ||
        document.querySelector(
          "ytd-video-owner-renderer  .ytd-channel-name a"
        )),
      (uploaderEmbed = document.querySelector(
        "div.ytp-title-expanded-heading > h2 > a"
      )),
      (uploaderMiniPlayer = document.querySelector(
        "yt-formatted-string#owner-name"
      )),
      (uploader2 = document.querySelector("#owner-name a"));

    if (
      uploaderMiniPlayer != null &&
      uploaderMiniPlayer.textContent == "YouTube"
    ) {
      edited = true;
      uploaderMiniPlayer.setAttribute(
        "premid-value",
        "Listening to a playlist"
      );
    }

    const uploader =
        uploaderMiniPlayer !== null && uploaderMiniPlayer.textContent.length > 0
          ? uploaderMiniPlayer
          : uploader2 !== null && uploader2.textContent.length > 0
          ? uploader2
          : document.querySelector(
              "#upload-info yt-formatted-string.ytd-channel-name a"
            ) !== null
          ? document.querySelector(
              "#upload-info yt-formatted-string.ytd-channel-name a"
            )
          : uploaderEmbed !== null &&
            YouTubeEmbed &&
            uploaderEmbed.textContent.length > 0
          ? uploaderEmbed
          : (uploaderTV = truncateAfter(
              uploaderTV.textContent.replace(/\s+/g, ""),
              pattern
            )),
      timestamps = presence.getTimestampsfromMedia(video),
      live = Boolean(document.querySelector(".ytp-live")),
      ads = Boolean(document.querySelector(".ytp-ad-player-overlay"));
    let isPlaylistLoop = false;

    if (
      document.querySelector("#playlist-actions .yt-icon-button#button") &&
      document
        .querySelector("#playlist-actions .yt-icon-button#button")
        .getAttribute("aria-pressed")
    )
      isPlaylistLoop =
        document
          .querySelector("#playlist-actions .yt-icon-button#button")
          .getAttribute("aria-pressed") === "true";

    let finalUploader =
        edited == true
          ? uploaderMiniPlayer.getAttribute("premid-value")
          : uploaderTV !== null
          ? typeof uploaderTV === "string"
            ? uploaderTV
            : uploaderTV.textContent
          : typeof uploader === "string"
          ? uploader
          : uploader.textContent,
      finalTitle =
        title == null || title.textContent.replace(/\s+/g, "") == ""
          ? document.querySelector("div.ytp-title-text > a").textContent
          : title.textContent;

    //* YouTube Movies
    if (
      title == null &&
      document.querySelector(
        ".title.style-scope.ytd-video-primary-info-renderer"
      ) !== null
    ) {
      finalTitle = document.querySelector(
        ".title.style-scope.ytd-video-primary-info-renderer"
      ).textContent;
    }
    if (
      uploader == null &&
      document.querySelector(".style-scope.ytd-channel-name > a") !== null
    ) {
      finalUploader = document.querySelector(
        ".style-scope.ytd-channel-name > a"
      ).textContent;
    }
    const unlistedPathElement = document.querySelector<SVGPathElement>(
        "g#privacy_unlisted > path"
      ),
      unlistedBadgeElement = document.querySelector<SVGPathElement>(
        "h1.title+ytd-badge-supported-renderer path"
      ),
      unlistedVideo =
        unlistedPathElement !== null &&
        unlistedBadgeElement !== null &&
        unlistedPathElement.getAttribute("d") ===
          unlistedBadgeElement.getAttribute("d"),
      presenceData: PresenceData = {
        details: vidDetail
          .replace("%title%", finalTitle)
          .replace("%uploader%", finalUploader),
        state: vidState
          .replace("%title%", finalTitle)
          .replace("%uploader%", finalUploader),
        largeImageKey: "yt_lg",
        smallImageKey: video.paused
          ? "pause"
          : video.loop
          ? "repeat-one"
          : isPlaylistLoop
          ? "repeat"
          : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : video.loop
          ? "On loop"
          : isPlaylistLoop
          ? "Playlist on loop"
          : (await strings).play,
        endTimestamp: timestamps[1]
      };

    if (vidState.includes("{0}")) delete presenceData.state;

    presence.setTrayTitle(
      video.paused
        ? ""
        : finalTitle == null
        ? document.querySelector(
            ".title.style-scope.ytd-video-primary-info-renderer"
          ).textContent
        : finalTitle
    );

    //* Remove timestamps if paused or live
    if (video.paused || live) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;

      if (live) {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live;
      }
    }

    //* Update title to indicate when an ad is being played
    if (ads) {
      presenceData.details = (await strings).ad;
      delete presenceData.state;
    } else if (privacy) {
      if (live) {
        presenceData.details = (await strings).watchLive;
      } else {
        presenceData.details = (await strings).watchVid;
      }
      delete presenceData.state;
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
      delete presenceData.endTimestamp;
    } else if (buttons) {
      if (!unlistedVideo) {
        presenceData.buttons = [
          {
            label: live
              ? (await strings).watchStreamButton
              : (await strings).watchVideoButton,
            url: document.URL.includes("/watch?v=")
              ? document.URL.split("&")[0]
              : `https://www.youtube.com/watch?v=${document
                  .querySelector("#page-manager > ytd-watch-flexy")
                  .getAttribute("video-id")}`
          },
          {
            label: (await strings).viewChannelButton,
            url: (
              document.querySelector(
                "#top-row > ytd-video-owner-renderer > a"
              ) as HTMLLinkElement
            ).href
          }
        ];
      }
    }
    if (!time) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  } else if (
    document.location.hostname == "www.youtube.com" ||
    document.location.hostname == "youtube.com"
  ) {
    const presenceData: PresenceData = {
        largeImageKey: "yt_lg"
      },
      browsingStamp = Math.floor(Date.now() / 1000);
    let searching = false;

    if (document.location.pathname.includes("/results")) {
      searching = true;
      let search: HTMLInputElement;
      //When searching something
      search = document.querySelector(
        "#search-input > div > div:nth-child(2) > input"
      );
      if (search == null) {
        search = document.querySelector("#search-input > input");
      }
      presenceData.details = (await strings).search;
      presenceData.state = search.value;
      presenceData.smallImageKey = "search";
      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.location.pathname.includes("/channel") ||
      document.location.pathname.includes("/c") ||
      document.location.pathname.includes("/user")
    ) {
      //Sometimes causes problems
      let user: string;
      if (
        document.querySelector("#text.ytd-channel-name") &&
        document.title
          .substr(0, document.title.lastIndexOf(" - YouTube"))
          .includes(
            document.querySelector("#text.ytd-channel-name").textContent
          )
      ) {
        user = document.querySelector("#text.ytd-channel-name").textContent;
      } else if (
        /\(([^)]+)\)/.test(
          document.title.substr(0, document.title.lastIndexOf(" - YouTube"))
        )
      ) {
        user = document.title
          .substr(0, document.title.lastIndexOf(" - YouTube"))
          .replace(/\(([^)]+)\)/, "");
      } else {
        user = document.title.substr(
          0,
          document.title.lastIndexOf(" - YouTube")
        );
      }

      // don't remove the second, includes an invisible character
      if (user.replace(/\s+/g, "") == "" || user.replace(/\s+/g, "") == "‌")
        user = "null";

      if (document.location.pathname.includes("/videos")) {
        presenceData.details = (await strings).browsingThrough;
        presenceData.state = `${(await strings).ofChannel} ${user}`;
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/playlists")) {
        presenceData.details = (await strings).browsingPlayl;
        presenceData.state = `${(await strings).ofChannel} ${user}`;
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/community")) {
        presenceData.details = (await strings).viewCPost;
        presenceData.state = `${(await strings).ofChannel} ${user}`;
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/about")) {
        presenceData.details = (await strings).readChannel;
        presenceData.state = user;
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = browsingStamp;
      } else if (document.location.pathname.includes("/search")) {
        searching = true;
        const search = document.URL.split("search?query=")[1];
        presenceData.details = (await strings).searchChannel.replace(
          "{0}",
          user
        );
        presenceData.state = search;
        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = browsingStamp;
      } else {
        presenceData.details = (await strings).viewChannel;
        presenceData.state = user;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/post")) {
      presenceData.details = (await strings).viewCPost;
      const selector: Node = document.querySelector("#author-text");
      presenceData.state =
        (selector && `${(await strings).ofChannel} ${selector.textContent}`) ||
        null;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/trending")) {
      presenceData.details = (await strings).trending;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/subscriptions")) {
      presenceData.details = (await strings).browsingThrough;
      presenceData.state = (await strings).subscriptions;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/library")) {
      presenceData.details = (await strings).browsingThrough;
      presenceData.state = (await strings).library;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/history")) {
      presenceData.details = (await strings).browsingThrough;
      presenceData.state = (await strings).history;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/feed/purchases")) {
      presenceData.details = (await strings).browsingThrough;
      presenceData.state = (await strings).purchases;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/playlist")) {
      presenceData.details = (await strings).viewPlaylist;

      let title: HTMLElement | null = document.querySelector("#text-displayed");
      if (title == null) {
        title = document.querySelector("#title > yt-formatted-string > a");
      }

      presenceData.state = title.textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = (await strings).readAbout;
      presenceData.state = "Youtube Premium";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/gaming")) {
      presenceData.details = (await strings).browsingThrough;
      presenceData.state = "Youtube Gaming";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/account")) {
      presenceData.details = (await strings).viewAccount;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/reporthistory")) {
      presenceData.details = (await strings).reports;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/intl")) {
      presenceData.details = (await strings).readAbout;
      presenceData.state = document.title.substr(
        0,
        document.title.lastIndexOf(" - YouTube")
      );
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.URL == "https://www.youtube.com/") {
      presenceData.details = (await strings).viewHome;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/upload")) {
      presenceData.details = (await strings).upload;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/view_all_playlists")) {
      presenceData.details = (await strings).viewAllPlayL;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/my_live_events")) {
      presenceData.details = (await strings).viewEvent;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/live_dashboard")) {
      presenceData.details = (await strings).viewLiveDash;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/audiolibrary")) {
      presenceData.details = (await strings).viewAudio;
      presenceData.startTimestamp = browsingStamp;
    }

    if (privacy) {
      if (searching) {
        presenceData.details = (await strings).searchSomething;
        delete presenceData.state;
      } else {
        presenceData.details = (await strings).browsing;
        delete presenceData.state;
        delete presenceData.smallImageKey;
      }
    }

    if (!time) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "studio.youtube.com") {
    const presenceData: PresenceData = {
        largeImageKey: "yt_lg",
        smallImageKey: "studio",
        smallImageText: "Youtube Studio"
      },
      browsingStamp = Math.floor(Date.now() / 1000);

    if (document.location.pathname.includes("/videos")) {
      presenceData.details = (await strings).studioVid;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/video")) {
      const title: HTMLElement = document.querySelector("#entity-name");
      presenceData.startTimestamp = browsingStamp;
      if (document.location.pathname.includes("/edit")) {
        presenceData.details = (await strings).studioEdit;
        presenceData.state = title.textContent;
      } else if (document.location.pathname.includes("/analytics")) {
        presenceData.details = (await strings).studioAnaly;
        presenceData.state = title.textContent;
      } else if (document.location.pathname.includes("/comments")) {
        presenceData.details = (await strings).studioComments;
        presenceData.state = title.textContent;
      } else if (document.location.pathname.includes("/translations")) {
        presenceData.details = (await strings).studioTranslate;
        presenceData.state = title.textContent;
      }
    } else if (document.location.pathname.includes("/analytics")) {
      presenceData.details = (await strings).studioTheir;
      presenceData.state = (await strings).studioCAnaly;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/comments")) {
      presenceData.details = (await strings).studioTheir;
      presenceData.state = (await strings).studioCComments;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/translations")) {
      presenceData.details = (await strings).studioTheir;
      presenceData.state = (await strings).studioCTranslate;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/channel")) {
      presenceData.details = (await strings).studioDash;
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/artist")) {
      presenceData.details = (await strings).studioTheir;
      presenceData.state = (await strings).studioArtist;
      presenceData.startTimestamp = browsingStamp;
    }

    if (privacy) {
      presenceData.details = (await strings).browsing;
      delete presenceData.state;
      delete presenceData.smallImageKey;
    }

    if (!time) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  }
});
