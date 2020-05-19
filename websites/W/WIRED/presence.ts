const presence = new Presence({
  clientId: "645051733961211934"
});

var elapsed, oldURL;

presence.on("UpdateData", async () => {
  let details, state;
  const title = document.title;

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

  var data: presenceData = {
    details: details,
    state: state,
    largeImageKey: "wired",
    startTimestamp: elapsed
  };

  presence.setActivity(data);
});
