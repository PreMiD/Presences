const presence = new Presence({
  clientId: "645051733961211934"
});

let elapsed: number, oldURL: string;

presence.on("UpdateData", async () => {
  let details, state;
  const { title } = document;

  if (window.location.href !== oldURL) {
    oldURL = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (
    document.location.pathname.includes("/gallery/") ||
    document.location.pathname.includes("/story/")
  ) {
    details = "Reading: ";
    state = title.replace(" | WIRED", "");
  } else if (document.location.pathname.includes("/video/watch/")) {
    details = "Watching: ";
    state = title.replace(" | WIRED Video | CNE", "");
  } else {
    details = "Browsing: ";
    state = title.replace(" | WIRED", "");
  }

  const data: PresenceData = {
    details,
    state,
    largeImageKey: "wired",
    startTimestamp: elapsed
  };

  presence.setActivity(data);
});
