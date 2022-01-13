const presence = new Presence({ clientId: "906057236927893576" }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const [privacy, cover, timestamps, buttons] = await Promise.all([
    presence.getSetting<boolean>("privacy"),
    presence.getSetting<boolean>("cover"),
    presence.getSetting<boolean>("timestamps"),
    presence.getSetting<boolean>("buttons")
  ]);
  let presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: !privacy ? "home" : "",
    details: "Browsing...",
    state: "at Home Page",
    startTimestamp: browsingStamp
  };
  const path = document.location.pathname,
    pages: Record<string, PresenceData> = {
      "/manga/": {
        details: "Viewing a Manga...",
        state: document.title.split(" | MangaLife")[0],
        startTimestamp: browsingStamp
      },
      "/read-online/": {
        smallImageKey: "reading",
        startTimestamp: browsingStamp
      },
      "/search": {
        smallImageKey: "search",
        details: "Searching...",
        startTimestamp: browsingStamp
      },
      "/discussion": {
        smallImageKey: !privacy ? "discussions" : "",
        details: "Browsing...",
        state: "at Discussions",
        startTimestamp: browsingStamp
      },
      "hot.php": {
        smallImageKey: !privacy ? "hot" : "",
        details: "Browsing...",
        state: "at Hot Manga Updates",
        startTimestamp: browsingStamp,
        buttons: [{ label: "Hot Manga Updates", url: `${document.location}` }]
      },
      "subscription.php": {
        smallImageKey: !privacy ? "subscriptions" : "",
        details: "Browsing...",
        state: "at Subscriptions",
        startTimestamp: browsingStamp
      },
      "feed.php": {
        smallImageKey: !privacy ? "subscriptions" : "",
        details: "Browsing...",
        state: "at Subscriptions Feed",
        startTimestamp: browsingStamp
      },
      "bookmark.php": {
        smallImageKey: !privacy ? "bookmark" : "",
        details: "Browsing...",
        state: "at Bookmarks",
        startTimestamp: browsingStamp
      },
      "settings.php": {
        smallImageKey: "settings",
        details: "Editing Settings...",
        startTimestamp: browsingStamp
      },
      "/contact": {
        smallImageKey: !privacy ? "contact" : "",
        details: "Browsing...",
        state: "at Contact Page",
        startTimestamp: browsingStamp
      },
      "/privacy": {
        smallImageKey: !privacy ? "privacy" : "",
        details: "Browsing...",
        state: "at Privacy Policy Page",
        startTimestamp: browsingStamp
      }
    };

  for (const [path, data] of Object.entries(pages)) {
    if (
      document.location.pathname.startsWith(path) ||
      document.location.pathname.includes(path)
    )
      presenceData = { ...presenceData, ...data };
  }

  switch (true) {
    case path.startsWith("/manga/"):
      presenceData.largeImageKey =
        !privacy && cover
          ? `https://cover.nep.li/cover/${path.split("/manga/")[1]}.jpg`
          : "logo";
      presenceData.smallImageKey = !privacy && cover ? "logo-png" : "search";
      presenceData.buttons = [
        {
          label:
            presenceData.state.length >= 30 ? "View Manga" : presenceData.state,
          url: `${document.location}`
        }
      ];
      break;
    case path.startsWith("/read-online/"):
      presenceData.largeImageKey =
        !privacy && cover
          ? `https://cover.nep.li/cover/${
              path.split("/read-online/")[1].split("-chapter-")[0]
            }.jpg`
          : "logo";
      presenceData.details = !privacy
        ? document.querySelector(".col-12 > a").textContent.trim()
        : "Reading a Manga...";
      presenceData.state = path.includes("-page-")
        ? `Chapter ${path.split("-chapter-")[1].split("-page-")[0]} | Page ${
            path.split("-page-")[1].split(".html")[0]
          }`
        : `Chapter ${path.split("-chapter-")[1].split(".html")[0]}`;
      presenceData.buttons = [
        {
          label:
            presenceData.details.length >= 30
              ? "View Manga"
              : presenceData.details,
          url: `${document.location.origin}/manga/${
            path.split("/read-online/")[1].split("-chapter-")[0]
          }`
        },
        {
          label: `${presenceData.state.replace("|", " ")}`,
          url: `${document.location}`
        }
      ];
      break;
    case path.startsWith("/search"):
      // todo show state as search query, for now just delete state
      delete presenceData.state;
      break;
  }

  if (!timestamps) delete presenceData.startTimestamp;
  if (privacy) delete presenceData.state;
  if (privacy || !buttons) delete presenceData.buttons;
  if (privacy && !presenceData.smallImageKey) delete presenceData.smallImageKey;

  presence.setActivity(presenceData);
});
