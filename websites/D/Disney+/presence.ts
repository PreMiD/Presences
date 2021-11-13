const presence: Presence = new Presence({
  clientId: "630236276829716483"
});

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      browsing: "general.browsing",
      watchingMovie: "general.watchingMovie",
      watchingSeries: "general.watchingSeries",
      watchEpisode: "general.buttonViewEpisode",
      watchVideo: "general.buttonWatchVideo"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string,
  title: string,
  subtitle: string,
  groupWatchCount: number;

presence.on("UpdateData", async () => {
  const newLang: string = await presence.getSetting("lang").catch(() => "en"),
    privacy: boolean = await presence.getSetting("privacy"),
    time: boolean = await presence.getSetting("time"),
    buttons: boolean = await presence.getSetting("buttons"),
    groupWatchBtn: boolean = await presence.getSetting("groupWatchBtn"),
    isHostDP = /(www\.)?disneyplus\.com/.test(location.hostname),
    isHostHS = /(www\.)?hotstar\.com/.test(location.hostname),
    data: PresenceData & {
      partySize?: number;
      partyMax?: number;
    } = {};

  // Update strings when user sets language
  if (!oldLang || oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (isHostDP) data.largeImageKey = "disneyplus-logo";
  else if (isHostHS) data.largeImageKey = "disneyplus-hotstar-logo";

  // Disney+ video
  if (isHostDP && location.pathname.includes("/video/")) {
    const video: HTMLVideoElement = document.querySelector(
      ".btm-media-clients video"
    );

    if (video && !isNaN(video.duration)) {
      const groupWatchId = new URLSearchParams(location.search).get(
          "groupWatchId"
        ),
        timestamps = presence.getTimestampsfromMedia(video);

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

      title = titleField?.innerText;
      subtitle = subtitleField?.innerText; // episode or empty if it's a movie

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
            url: `https://www.disneyplus.com${location.pathname}`
          }
        ];

        // change button if GroupWatch is active and user enabled the button
        if (groupWatchId && groupWatchBtn) {
          data.buttons.push({
            label: "Join GroupWatch",
            url: `https://www.disneyplus.com/groupwatch/${groupWatchId}`
          });
        }
      }

      if (title) presence.setActivity(data, !video.paused);
    }

    // GroupWatch lobby
  } else if (
    isHostDP &&
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
      title = seriesFields[0]?.innerText;
      subtitle = seriesFields[1]?.innerText;
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

    // Disney+ Hotstar video
  } else if (isHostHS && /\/(tv|movies)\//.test(location.pathname)) {
    const video: HTMLVideoElement =
      document.querySelector(".player-base video");

    if (video && !isNaN(video.duration)) {
      [data.startTimestamp, data.endTimestamp] =
        presence.getTimestampsfromMedia(video);
      const titleField: HTMLDivElement = document.querySelector(
          ".controls-overlay .primary-title"
        ),
        subtitleField: HTMLDivElement = document.querySelector(
          ".controls-overlay .show-title"
        );

      title = titleField?.innerText;
      subtitle = subtitleField?.innerText; // episode or empty if it's a movie

      if (privacy) {
        data.state = subtitle
          ? (await strings).watchingSeries
          : (await strings).watchingMovie;
      } else {
        data.details = title;
        data.state = subtitle || "Movie";
      }
      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      if (video.paused || !time) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (!privacy && buttons) {
        data.buttons = [
          {
            label: (await strings).watchVideo,
            url: `https://www.hotstar.com${location.pathname}`
          }
        ];
      }

      if (title) presence.setActivity(data, !video.paused);
    }

    // Browsing
  } else {
    data.details = (await strings).browsing;
    presence.setActivity(data);
  }
});
