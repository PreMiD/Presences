const presence: Presence = new Presence({
  clientId: "630236276829716483"
});

interface LangStrings {
  play: string;
  pause: string;
  browsing: string;
  watchEpisode: string;
  watchVideo: string;
}

async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      browsing: "general.browsing",
      watchEpisode: "general.buttonViewEpisode",
      watchVideo: "general.buttonWatchVideo"
    },
    await presence.getSetting("lang")
  );
}

let strings: LangStrings,
  oldLang: string,
  title: string,
  subtitle: string,
  groupWatchCount: number;

presence.on("UpdateData", async () => {
  const newLang: string = await presence.getSetting("lang"),
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
    strings = await getStrings();
  }

  if (isHostDP) {
    data.largeImageKey = "disneyplus-logo";
  } else if (isHostHS) {
    data.largeImageKey = "disneyplus-hotstar-logo";
  }

  // Disney+ video
  if (isHostDP && location.pathname.includes("/video/")) {
    const video: HTMLVideoElement = document.querySelector(
      ".btm-media-clients video"
    );

    if (video && !isNaN(video.duration)) {
      const groupWatchId = new URLSearchParams(location.search).get(
          "groupWatchId"
        ),
        timestamps: number[] = presence.getTimestampsfromMedia(video);

      if (groupWatchId) {
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

      if (groupWatchId) {
        data.details = `${title} ${subtitle ? `- ${subtitle}` : ""}`;
        data.state = "In a GroupWatch";
      } else {
        data.details = title;
        data.state = subtitle || "Movie";
      }

      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused ? strings.pause : strings.play;
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];

      // remove timestamps if video is paused or user disabled timestamps
      if (video.paused || !time) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      // set GroupWatch participants size
      if (groupWatchId) {
        data.partySize = groupWatchCount;
        data.partyMax = 7;
      }

      // add buttons, if enabled
      if (buttons) {
        data.buttons = [
          {
            label: subtitle ? strings.watchEpisode : strings.watchVideo,
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
  } else if (isHostDP && location.pathname.includes("/groupwatch/")) {
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

    // Disney+ Hotstar video
  } else if (isHostHS && /\/(tv|movies)\//.test(location.pathname)) {
    const video: HTMLVideoElement = document.querySelector(
      ".player-base video"
    );

    if (video && !isNaN(video.duration)) {
      const timestamps: number[] = presence.getTimestampsfromMedia(video),
        titleField: HTMLDivElement = document.querySelector(
          ".controls-overlay .primary-title"
        ),
        subtitleField: HTMLDivElement = document.querySelector(
          ".controls-overlay .show-title"
        );

      title = titleField?.textContent;
      subtitle = subtitleField?.textContent; // episode or empty if it's a movie

      data.details = title;
      data.state = subtitle || "Movie";
      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused ? strings.pause : strings.play;
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];

      if (video.paused || !time) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (buttons) {
        data.buttons = [
          {
            label: strings.watchVideo,
            url: location.pathname
          }
        ];
      }

      if (title) presence.setActivity(data, !video.paused);
    }

    // Browsing
  } else {
    data.details = strings.browsing;
    presence.setActivity(data);
  }
});
