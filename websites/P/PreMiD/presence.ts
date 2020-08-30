var presence = new Presence({
    clientId: "688166209736409100"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
  }),
  host: string,
  timestamp: any = Math.floor(Date.now() / 1000);

// checkmate javascript
function pathIncludes(string: string): boolean {
  return document.location.pathname.toLowerCase().includes(string);
}

presence.on("UpdateData", async () => {
  // eslint-disable-next-line no-var
  var data: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: timestamp
  };

  host = document.location.hostname;

  if (host === "premid.app" || host === "beta.premid.app") {
    host.includes("beta") ? (data.state = "Beta") : delete data.state;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;

    switch (true) {
      case pathIncludes("/downloads"):
        data.details = "Downloads";
        break;
      case pathIncludes("/contributors"):
        data.details = "Contributors";
        break;
      case pathIncludes("/beta"):
        data.details = "Beta";
        break;
      case pathIncludes("/partner"):
        data.details = "Partners";
        break;
      case pathIncludes("/cookies"):
      case pathIncludes("/privacy"):
      case pathIncludes("/tos"):
        data.details = "Policies";
        break;
      case pathIncludes("/users/"):
        data.details = document.querySelector("div.user-data p")
          ? document
              .querySelector("div.user-data p")
              .textContent.replace(/[\s\n]+/gi, "")
          : "...";
        data.state = "User page";
        break;
      case pathIncludes("/store/presences/"):
        data.details = document.querySelector("h1.presence-name")
          ? document
              .querySelector("h1.presence-name")
              .textContent.replace(/^\s+|\s+$/g, "")
          : "Store";
        data.state = "Presence page";
        break;
      case pathIncludes("/store"):
        data.details = "Store";
        break;
      default:
        data.details = "Home";
    }
  } else if (host === "docs.premid.app") {
    data.state = "Docs";
    data.smallImageKey = "reading";
    data.smallImageText = (await strings).reading;

    switch (true) {
      case pathIncludes("/troubleshooting"):
        data.details = "Troubleshooting";
        break;
      case pathIncludes("/install/requirements"):
        data.details = "System requirements";
        break;
      case pathIncludes("/install/windows"):
        data.details = "Installing on Windows";
        break;
      case pathIncludes("/install/macos"):
        data.details = "Installing on MacOS";
        break;
      case pathIncludes("/install/linux"):
        data.details = "Installing on Linux";
        break;
      case pathIncludes("/install/firefox"):
        data.details = "Installing on Firefox";
        break;
      case pathIncludes("/install/chromium"):
        data.details = "Installing on Chromium-based browsers";
        break;
      case pathIncludes("/install"):
        data.details = "Installation";
        break;
      case pathIncludes("/dev/presence/tsconfig"):
        data.details = "Configuring TypeScript";
        break;
      case pathIncludes("/dev/presence/metadata"):
        data.details = "Configuring metadata.json";
        break;
      case pathIncludes("/dev/presence/iframe"):
        data.details = "Understanding iframe";
        break;
      case pathIncludes("/dev/presence/class"):
        data.details = "Presence class";
        break;
      case pathIncludes("/dev/presence"):
        data.details = "Presence development";
        break;
      case pathIncludes("/dev/api/v2"):
        data.details = "Understanding API v2";
        break;
      case pathIncludes("/dev/api/v1"):
        data.details = "Understanding API v1";
        break;
      case pathIncludes("/dev/api"):
        data.details = "Understanding API";
        break;
      case pathIncludes("/dev"):
        data.details = "Getting started";
        break;
      case pathIncludes("/about"):
        data.details = "About PreMiD";
        break;
      case pathIncludes("/home"):
      default:
        data.details = "Home";
    }
  } else if (host === "status.premid.app") {
    data.state = "Status page";
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;

    switch (true) {
      case pathIncludes("/incidents"):
        data.details =
          "Viewing: " + document.title.replace("PreMiD Status - ", "");
        break;
      case pathIncludes("/history"):
        data.details = "Incident history";
        break;
      case pathIncludes("/uptime"):
        data.details = "Uptime history";
        break;
      default:
        data.details = "Home";
    }
  }
  presence.setActivity(data);
});
