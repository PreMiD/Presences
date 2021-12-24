const presence = new Presence({
    clientId: "917456087299534858"
  }),
  browsingTimestamp = Date.now() / 1000;

presence.on("UpdateData", () => {
  let presenceData: PresenceData = {
    largeImageKey: "lastfm",
    smallImageKey: "browse",
    startTimestamp: browsingTimestamp
  };

  const pages: Record<string, PresenceData> = {
    "/home": {
      details: "Home"
    },
    "/dashboard": {
      details: "Dashboard"
    },
    "/features": {
      details: "Features"
    },
    "/events": {
      details: "Events"
    },
    "/charts": {
      details: "Charts"
    },
    "/inbox": {
      details: "Inbox"
    },
    "/settings": {
      details: "Settings"
    },
    "/search": {
      details: "Searching for:",
      state: new URLSearchParams(document.location.search).get("q")
    },
    "/user": {
      details: "Viewing user:",
      state: document.querySelector("h1.header-title")?.textContent?.trim(),
      buttons: [
        {
          url: document.querySelector<HTMLAnchorElement>("h1.header-title > a")
            ?.href,
          label: "View User"
        }
      ]
    },
    "/music": {
      details: (() => {
        if (
          location.pathname.split("/").length === 4 &&
          !location.pathname.endsWith("+bookmarks")
        )
          return "Viewing Album:";
        else if (location.pathname.endsWith("+bookmarks"))
          return "Viewing Bookmarks";
        else if (location.pathname === "/music") return "Music";
        else return "Viewing Artist:";
      })(),
      state: document.querySelector("h1.header-new-title")?.textContent,
      buttons: ((): [ButtonData] => {
        if (location.pathname.split("/").length === 4) {
          return [
            {
              url: document.URL,
              label: "View Album"
            }
          ];
        } else if (
          location.pathname.split("/").length === 3 &&
          !location.pathname.endsWith("+bookmarks")
        ) {
          return [
            {
              url: document.URL,
              label: "View Artist"
            }
          ];
        }
      })()
    }
  };

  for (const [path, data] of Object.entries(pages)) {
    if (location.pathname.match(path))
      presenceData = { ...presenceData, ...data };
  }

  if (
    !document.querySelector<HTMLButtonElement>(
      '[data-analytics-action="PlaybarResumeTrack"]'
    )?.disabled
  ) {
    let paused = document
      .querySelector('[data-analytics-action="PlaybarResumeTrack"]')
      .className.endsWith("play");

    const timeLeft = presence.timestampFromFormat(
      document
        .querySelector("div.player-bar-progress-wrap > div > div > span")
        .textContent.slice(1)
    );

    if (Date.now() / 1000 >= Date.now() / 1000 + timeLeft) paused = true;

    presenceData.details = "Listening to:";
    presenceData.state = document
      .querySelector("p.player-bar-track.js-player-status")
      ?.getAttribute("title");

    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused ? "Paused" : "Playing";

    delete presenceData.startTimestamp;
    delete presenceData.buttons;

    if (!paused) presenceData.endTimestamp = Date.now() / 1000 + timeLeft;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
