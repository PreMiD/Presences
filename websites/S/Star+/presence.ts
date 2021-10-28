const presence: Presence = new Presence({
  clientId: "897325334200975360"
});

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      browsing: "general.browsing",
      watchingMovie: "general.watchingMovie",
      watchingSeries: "general.watchingSeries",
      watchingLive: "general.watchingLive",
      watchEpisode: "general.buttonViewEpisode",
      watchVideo: "general.buttonWatchVideo",
      watchLive: "general.live",
      watchStream: "general.buttonWatchStream"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null,
  title: string,
  subtitle: string,
  groupWatchCount: number;

presence.on("UpdateData", async () => {
  const newLang: string = await presence.getSetting("lang").catch(() => "en"),
    privacy: boolean = await presence.getSetting("privacy"),
    time: boolean = await presence.getSetting("time"),
    buttons: boolean = await presence.getSetting("buttons"),
    groupWatchBtn: boolean = await presence.getSetting("groupWatchBtn"),
    isHostSP = /(www\.)?starplus\.com/.test(location.hostname),
    data: PresenceData & {
      partySize?: number;
      partyMax?: number;
    } = {};

  // Update strings when user sets language
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (isHostSP) data.largeImageKey = "starplus-logo";

  // Star+ videos
  if (isHostSP && location.pathname.includes("/video/")) {
    const video: HTMLVideoElement = document.querySelector(
      ".btm-media-clients video"
    );

    if (video && !isNaN(video.duration)) {
      const groupWatchId = new URLSearchParams(location.search).get(
          "groupWatchId"
        ),
        timestamps: number[] = presence.getTimestampsfromMedia(video);

      if (!privacy && groupWatchId) {
        groupWatchCount = Number(
          document.querySelector(
            ".btm-media-overlays-container .group-profiles-control .group-profiles-control__count"
          )?.textContent
        );
      }

      const titleField: HTMLDivElement = document.querySelector(
          ".btm-media-overlays-container .title-field"
        ),
        subtitleField: HTMLDivElement = document.querySelector(
          ".btm-media-overlays-container .subtitle-field"
        );

      title = titleField?.textContent;
      subtitle = subtitleField?.textContent; // episode or empty if it's a movie

      if (!privacy && groupWatchId) {
        data.details = `${title} ${subtitle ? `- ${subtitle}` : ""}`;
        data.state = "In a GroupWatch";
      } else {
        if (privacy) {
          data.state = subtitle
            ? (await strings).watchingSeries
            : (await strings).watchingMovie;
        } else {
          data.details = title;
          data.state = subtitle || "Movie";
        }
      }

      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      [data.startTimestamp, data.endTimestamp] = timestamps;

      // remove timestamps if video is paused or user disabled timestamps
      if (video.paused || !time) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      // set GroupWatch participants size
      if (!privacy && groupWatchId) {
        data.partySize = groupWatchCount;
        data.partyMax = 7;
      }

      // add buttons, if enabled
      if (!privacy && buttons) {
        data.buttons = [
          {
            label: subtitle
              ? (await strings).watchEpisode
              : (await strings).watchVideo,
            url: `https://www.starplus.com${location.pathname}`
          }
        ];

        // change button if GroupWatch is active and user enabled the button
        if (groupWatchId && groupWatchBtn) {
          data.buttons.push({
            label: "Join GroupWatch",
            url: `https://www.starplus.com/groupwatch/${groupWatchId}`
          });
        }
      }

      if (title) presence.setActivity(data, !video.paused);
    }

    //Star+ Livestreams
  } else if (isHostSP && location.pathname.includes("/live-event/")) {
    const video: HTMLVideoElement = document.querySelector(
      ".btm-media-clients video"
    );

    if (video && !isNaN(video.duration)) {
      const titleField: HTMLDivElement = document.querySelector(
          ".btm-media-overlays-container .title-field"
        ),
        subtitleField: HTMLDivElement = document.querySelector(
          ".btm-media-overlays-container .subtitle-field"
        );

      title = titleField?.textContent;
      subtitle = subtitleField?.textContent; // episode or empty if it's a movie

      if (!privacy) {
        data.details = `${title} ${subtitle ? `- ${subtitle}` : ""}`;
        data.state = (await strings).watchLive;
      } else if (privacy) data.state = (await strings).watchingLive;

      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      // add buttons, if enabled
      if (!privacy && buttons) {
        data.buttons = [
          {
            label: (await strings).watchStream,
            url: `https://www.starplus.com${location.pathname}`
          }
        ];
      }
      if (title) presence.setActivity(data, !video.paused);
    }

    // GroupWatch lobby
  } else if (
    isHostSP &&
    !privacy &&
    location.pathname.includes("/groupwatch/")
  ) {
    groupWatchCount = document.querySelectorAll(
      ".gw-avatar-enter-done:not([id=gw-invite-button])"
    ).length;

    const seriesFields: NodeListOf<HTMLDivElement> = document.querySelectorAll(`
      #webAppScene main #group + div:not([id]) h3[style]:nth-of-type(1),
      #webAppScene main #group + div:not([id]) h3[style]:nth-of-type(2)
    `);

    if (seriesFields.length > 0) {
      title = seriesFields[0]?.textContent;
      subtitle = seriesFields[1]?.textContent;
    } else {
      const movieField: HTMLImageElement = document.querySelector(
        "#webAppScene main #group + div:not([id]) img[alt]"
      );
      title = movieField?.alt;
    }

    data.details = `${title} ${subtitle ? `- ${subtitle}` : ""}`;
    data.state = "Starting a GroupWatch";
    // set GroupWatch participants size
    data.partySize = groupWatchCount;
    data.partyMax = 7;

    // add button, if enabled
    if (buttons && groupWatchBtn) {
      data.buttons = [
        {
          label: "Join GroupWatch",
          url: location.pathname
        }
      ];
    }

    if (title) presence.setActivity(data, false);

    //Browsing
  } else {
    data.details = (await strings).browsing;
    presence.setActivity(data);
  }
});
