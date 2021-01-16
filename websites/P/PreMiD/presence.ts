const presence = new Presence({
    clientId: "792735245488488458"
  }),
  timestamp = Math.floor(Date.now() / 1000);

// checkmate javascript
function pathIncludes(string: string): boolean {
  return document.location.pathname.toLowerCase().includes(string);
}

interface LangStrings {
  browsing: string;
  reading: string;
  viewPage: string;
  viewUser: string;
  viewPresence: string;
  docs: string;
  home: string;
  contributors: string;
  downloads: string;
  store: string;
  cookies: string;
  privacy: string;
  terms: string;
  about: string;
  sysreq: string;
  install: string;
  installFor: string;
  yikes: string;
  start: string;
  api: string;
  apiPage: string;
  presenceDev: string;
  presenceGuide: string;
  partners: string;
  viewing: string;
  incident: string;
  uptime: string;
  class: string;
  slideshow: string;
  iframe: string;
  metadata: string;
  ts: string;
}

async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      browsing: "general.browsing",
      reading: "general.reading",
      viewPage: "general.viewPage",
      viewUser: "general.viewUser",
      viewPresence: "premid.viewPresence",
      docs: "premid.docs",
      home: "premid.pageHome",
      contributors: "premid.pageContributors",
      downloads: "premid.pageDownloads",
      store: "premid.pageStore",
      cookies: "general.cookie",
      privacy: "general.privacy",
      terms: "general.terms",
      about: "premid.pageAbout",
      sysreq: "premid.pageSysReq",
      install: "premid.pageInstall",
      installFor: "premid.pageInstallFor",
      yikes: "premid.pageTroubleshooting",
      start: "premid.pageStart",
      api: "premid.pageApi",
      apiPage: "premid.pageApiVersion",
      presenceDev: "premid.pagePresenceDev",
      presenceGuide: "premid.pagePresenceGuide",
      partners: "premid.partners",
      viewing: "general.viewing",
      incident: "general.incidentHistory",
      uptime: "general.uptimeHistory",
      class: "premid.pagePresenceClass",
      slideshow: "premid.pageSlideshowClass",
      iframe: "premid.pageIframe",
      metadata: "premid.pageMetadata",
      ts: "premid.pageTs"
    },
    await presence.getSetting("lang")
  );
}

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null,
  host: string;

presence.on("UpdateData", async () => {
  //* Update strings if user selected another language.
  const newLang = await presence.getSetting("lang"),
    time = await presence.getSetting("time");
  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  if (time) presenceData.startTimestamp = timestamp;

  host = document.location.hostname;

  if (host === "premid.app" || host === "beta.premid.app") {
    host.includes("beta")
      ? (presenceData.smallImageText = "BETA | " + (await strings).browsing)
      : (presenceData.smallImageText = (await strings).browsing);
    presenceData.smallImageKey = "search";

    switch (true) {
      case pathIncludes("/downloads"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).downloads;
        break;
      case pathIncludes("/contributors"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).contributors;
        break;
      case pathIncludes("/beta"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = "BETA";
        break;
      case pathIncludes("/partner"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).partners;
        break;
      case pathIncludes("/cookies"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).cookies;
        break;
      case pathIncludes("/privacy"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).privacy;
        break;
      case pathIncludes("/tos"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).terms;
        break;
      case pathIncludes("/users/"):
        presenceData.details = (await strings).viewUser;
        presenceData.state = document.querySelector("div.user-data p")
          ? document
              .querySelector("div.user-data p")
              .textContent.replace(/[\s\n]+/gi, "")
          : "USER NOT FOUND...";
        break;
      case pathIncludes("/store/presences/"):
        presenceData.details = (await strings).viewPresence;
        presenceData.state = document.querySelector(".header__title > div > h1")
          ? document
              .querySelector(".header__title > div > h1")
              .textContent.replace(/^\s+|\s+$/g, "")
          : (await strings).store;
        break;
      case pathIncludes("/store"):
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).store;
        break;
      default:
        presenceData.details = (await strings).viewPage;
        presenceData.state = (await strings).home;
    }
  } else if (host === "docs.premid.app") {
    presenceData.details =
      (await strings).docs + " | " + (await strings).viewPage;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = (await strings).reading;

    switch (true) {
      case pathIncludes("/troubleshooting"):
        presenceData.state = (await strings).yikes;
        break;
      case pathIncludes("/install/requirements"):
        presenceData.state = (await strings).sysreq;
        break;
      case pathIncludes("/install/windows"):
        presenceData.state = (await strings).installFor.replace(
          "{0}",
          "Windows"
        );
        break;
      case pathIncludes("/install/macos"):
        presenceData.state = (await strings).installFor.replace("{0}", "MacOS");
        break;
      case pathIncludes("/install/linux"):
        presenceData.state = (await strings).installFor.replace("{0}", "Linux");
        break;
      case pathIncludes("/install/firefox"):
        presenceData.state = (await strings).installFor.replace(
          "{0}",
          "Firefox"
        );
        break;
      case pathIncludes("/install/chromium"):
        presenceData.state = (await strings).installFor.replace(
          "{0}",
          "Chromium-based browsers"
        );
        break;
      case pathIncludes("/install"):
        presenceData.state = (await strings).install;
        break;
      case pathIncludes("/dev/presence/guidelines"):
        presenceData.state = (await strings).presenceGuide;
        break;
      case pathIncludes("/dev/presence/tsconfig"):
        presenceData.state = (await strings).ts;
        break;
      case pathIncludes("/dev/presence/metadata"):
        presenceData.state = (await strings).metadata;
        break;
      case pathIncludes("/dev/presence/iframe"):
        presenceData.state = (await strings).iframe;
        break;
      case pathIncludes("/dev/presence/class"):
        presenceData.state = (await strings).class;
        break;
      case pathIncludes("/dev/presence/slideshow"):
        presenceData.state = (await strings).slideshow;
        break;
      case pathIncludes("/dev/presence"):
        presenceData.state = (await strings).presenceDev;
        break;
      case pathIncludes("/dev/api/v3"):
        presenceData.state = (await strings).apiPage.replace("{0}", "3");
        break;
      case pathIncludes("/dev/api/v2"):
        presenceData.state = (await strings).apiPage.replace("{0}", "2");
        break;
      case pathIncludes("/dev/api/v1"):
        presenceData.state = (await strings).apiPage.replace("{0}", "1");
        break;
      case pathIncludes("/dev/api"):
        presenceData.state = (await strings).api;
        break;
      case pathIncludes("/dev"):
        presenceData.state = (await strings).start;
        break;
      case pathIncludes("/about"):
        presenceData.state = (await strings).about;
        break;
      case pathIncludes("/home"):
      default:
        presenceData.state = (await strings).home;
    }
  } else if (host === "status.premid.app") {
    presenceData.details = "Status page | " + (await strings).viewing;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).browsing;

    switch (true) {
      case pathIncludes("/incidents"):
        presenceData.details =
          (await strings).viewing +
          " " +
          document.title.replace("PreMiD Status - ", "");
        break;
      case pathIncludes("/history"):
        presenceData.state = (await strings).incident;
        break;
      case pathIncludes("/uptime"):
        presenceData.state = (await strings).uptime;
        break;
      default:
        presenceData.state = (await strings).home;
    }
  }
  presence.setActivity(presenceData);
});
