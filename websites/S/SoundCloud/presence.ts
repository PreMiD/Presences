const presence = new Presence({
    clientId: "802958833214423081"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
  }),
  getElement = (query: string): string | undefined => {
    let text = "";

    const element = document.querySelector(query);
    if (element) {
      if (element.childNodes.length > 1)
        text = element.childNodes[0].textContent;
      else text = element.textContent;
    }
    return text.trimStart().trimEnd();
  },
  capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const statics = {
  "/stream/": {
    details: "Browsing...",
    state: "Latest Posts"
  },
  "/terms-of-use/": {
    details: "Viewing...",
    state: "Terms of Service"
  },
  "/pages/privacy/": {
    details: "Viewing...",
    state: "Privacy Policy"
  },
  "/pages/cookies/": {
    details: "Viewing...",
    state: "Cookies Policy"
  },
  "/pages/copyright/": {
    details: "Viewing...",
    state: "Copyright"
  },
  "/pages/copyright/report": {
    details: "Viewing...",
    state: "Report Copyright Infringement"
  },
  "/pages/contact": {
    details: "Viewing...",
    state: "Contact"
  },
  "/imprint/": {
    details: "Viewing...",
    state: "Imprint"
  },
  "/community-guidelines/": {
    details: "Viewing...",
    state: "Community Guidelines"
  },
  "/law-enforcement-guidelines/": {
    details: "Viewing...",
    state: "Law Enforcement Guidelines"
  },
  "/network-enforcement-act/": {
    details: "Viewing...",
    state: "Network Enforcement Act"
  },
  "/mobile/": {
    details: "Viewing App...",
    state: "SoundCloud Mobile"
  },
  "/mobile/pulse/": {
    details: "Viewing App...",
    state: "Pulse"
  },
  "/notifications/": {
    details: "Browsing...",
    state: "Notifications"
  },
  "/messages/": {
    details: "Browsing...",
    state: "Messages"
  },
  "/popular/searches/": {
    details: "Browsing...",
    state: "Popular Searches"
  },
  "/people/": {
    details: "Viewing...",
    state: "Who to Follow"
  },
  "/upload": {
    details: "Uploading..."
  },
  "/logout": {
    details: "Logged Out"
  }
};

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/"),
    showBrowsing = await presence.getSetting("browse"),
    showSong = await presence.getSetting("song"),
    showTimestamps = await presence.getSetting("timestamp");

  let data: PresenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "soundcloud",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: elapsed,
    endTimestamp: undefined
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  const playButton = document.querySelector(".playControls__play.playing"),
    playing = playButton ? true : false;

  if ((playing || (!playing && !showBrowsing)) && showSong) {
    data.details = getElement(
      ".playbackSoundBadge__titleLink > span:nth-child(2)"
    );
    data.state = getElement(".playbackSoundBadge__lightLink");
    const timer = [
        presence.timestampFromFormat(
          document.querySelector(
            "#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div.playControls__elements > div.playControls__timeline > div > div.playbackTimeline__timePassed > span:nth-child(2)"
          ).textContent
        ),
        presence.timestampFromFormat(
          document.querySelector(
            "#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div.playControls__elements > div.playControls__timeline > div > div.playbackTimeline__duration > span:nth-child(2)"
          ).textContent
        )
      ],
      [currentTime, duration] = timer,
      timestamps = presence.getTimestamps(currentTime, duration),
      pathLinkSong = document
        .querySelector(
          "#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div.playControls__elements > div.playControls__soundBadge > div > div.playbackSoundBadge__titleContextContainer > div > a"
        )
        .getAttribute("href");
    data.startTimestamp = timestamps[0];
    data.endTimestamp = timestamps[1];
    data.smallImageKey = playing ? "play" : "pause";
    data.smallImageText = (await strings)[playing ? "play" : "pause"];
    data.buttons = [
      {
        label: "Listen Along",
        url: `https://soundcloud.com${pathLinkSong}`
      }
    ];
  }

  if ((!playing || !showSong) && showBrowsing) {
    for (const [k, v] of Object.entries(statics)) 
      if (path.match(k)) data = { ...data, ...v };
    

    if (path === "/") {
      data.details = "Browsing...";
      data.state = "Home";
    } else if (path.includes("/charts/")) {
      data.details = "Browsing Charts...";

      const heading = path.split("/").slice(-2)[0];
      data.state =
        heading && !heading.includes("charts") && capitalize(heading);
    } else if (path.includes("/you/")) {
      data.details = "Browsing My Content...";

      const heading = location.pathname.split("/").pop();
      data.state = heading && capitalize(heading);
    } else if (path.includes("/settings/")) {
      data.details = "Browsing Settings...";
      data.state = getElement(".g-tabs-link.active");
    } else if (path.includes("/search/")) {
      data.details = "Searching...";

      const searchBox: HTMLInputElement = document.querySelector(
        ".headerSearch__input"
      );
      data.state = searchBox && searchBox.value;
    } else if (path.includes("/discover/")) {
      data.details = "Discovering...";
      data.state = "Music";

      const setLabel = getElement(".fullHero__titleTextLineBig > span");
      if (setLabel) {
        data.details = "Browsing Set...";
        data.state = setLabel;
      }
    } else if (path.includes("/stats/")) {
      data.details = "Viewing Stats...";
      data.state = getElement(".statsNavigation .g-tabs-link.active");
    }

    const username =
      getElement(".profileHeaderInfo__userName") ||
      getElement(".userNetworkTop__title > a");
    if (username) {
      data.details = "Viewing Profile...";
      data.state = `${username} (${getElement(".g-tabs-link.active")})`;
    }

    const waveform = document.querySelector(".fullListenHero .waveform__layer");
    if (waveform) {
      if (waveform.childElementCount >= 3) data.details = "Viewing Song...";
      else data.details = "Browsing Playlist/Album...";

      data.state = `${getElement(".soundTitle__title > span")} by ${getElement(
        ".soundTitle__username"
      )}`;
    }
  }

  if (data.details) {
    if (data.details.match("(Browsing|Viewing|Discovering)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    } else if (data.details.match("(Searching)")) {
      data.smallImageKey = "search";
      data.smallImageText = (await strings).search;
    } else if (data.details.match("(Uploading)")) {
      data.smallImageKey = "uploading";
      data.smallImageText = "Uploading..."; // no string available
    } else if (!showTimestamps || (!playing && !showBrowsing)) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
