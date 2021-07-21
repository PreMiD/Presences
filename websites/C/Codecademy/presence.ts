const presence = new Presence({
    clientId: "736516965748834336"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  start = new Date().getTime();
let videoTitle: string,
  videoCurrentTime: number,
  videoDuration: number,
  videoPaused: boolean;

interface DataInterface {
  title: string;
  currentTime: number;
  duration: number;
  paused: boolean;
}
presence.on("iFrameData", (data: DataInterface) => {
  videoTitle = data.title;
  videoCurrentTime = data.currentTime;
  videoDuration = data.duration;
  videoPaused = data.paused;
});
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    pathArray: Array<string> = window.location.pathname
      .replace(/^\/|\/$/g, "")
      .split("/");
  let heading: Element | string =
      document.querySelector("[class^=headerTitle__]") ||
      document.querySelector("[class^=trackTitle__]"),
    premiumPath: boolean;

  switch (pathArray[0]) {
    case "learn":
      switch (pathArray.length) {
        case 1:
          presenceData.details = "At the dashboard";
          break;
        case 2:
          presenceData.details = "Looking at a course";
          presenceData.state = `"${
            document.querySelector("main h1").textContent
          }"`;
          presenceData.smallImageKey = document
            .querySelector("main h1")
            .textContent.split(" ")
            .slice(1)
            .join(" ")
            .toLowerCase()
            .replace(" ", "_")
            .replace("+", "plus")
            .replace("#", "sharp");
          presenceData.smallImageText = document
            .querySelector("main h1")
            .textContent.split(" ")
            .slice(1)
            .join(" ");
          break;
        case 3:
          presenceData.details = "Looking at a path";
          presenceData.state = `"${
            document.querySelector("[class^=goalHeader__]")
              ? document
                  .querySelector("main h1")
                  .textContent.slice(
                    document.querySelector("[class^=goalHeader__]").textContent
                      .length
                  )
              : document.querySelector("main h1").textContent
          }"`;
          break;
        case 4:
          presenceData.details = "Looking at a course module";
          presenceData.state = `"${
            document.querySelector("main h1").textContent
          }"`;
      }
      break;
    case "courses":
    case "paths":
      premiumPath = false;
      if (heading.className.startsWith("trackTitle__")) premiumPath = true;
      heading = heading.textContent;
      if (pathArray[0] === "courses") {
        if (heading.startsWith("Learn ")) {
          presenceData.smallImageKey = heading
            .split(" ")
            .slice(1)
            .join(" ")
            .toLowerCase()
            .replace(" ", "_")
            .replace("+", "plus")
            .replace("#", "sharp");
          presenceData.smallImageText = heading.split(" ").slice(1).join(" ");
        }
      }
      presenceData.details = heading.startsWith("Learn ")
        ? `Learning ${heading.split(" ").slice(1).join(" ")}`
        : premiumPath
        ? "Looking at a path"
        : heading;
      if (videoTitle) {
        presenceData.details = "Watching a video";
        presenceData.state = videoTitle;
        presenceData.smallImageKey = videoPaused ? "pause" : "play";
        presenceData.smallImageText = videoPaused
          ? (await strings).pause
          : (await strings).play;
        if (videoDuration && !videoPaused)
          presenceData.endTimestamp =
            Date.now() + (videoDuration - videoCurrentTime) * 1000;
      } else {
        presenceData.startTimestamp = start;
        const bodyHeading = document.querySelector(
            "[class^=contentItemTitle__]"
          ),
          articleTitle = document.querySelector("[class^=articleTitle_]");
        if (bodyHeading) presenceData.state = bodyHeading.textContent;
        if (articleTitle) {
          presenceData.details = "Reading an article";
          presenceData.state = articleTitle.textContent;
        }
        if (premiumPath) {
          presenceData.state = heading;
          delete presenceData.startTimestamp;
        }
      }
      presenceData.state = `"${presenceData.state}"`;
      break;
    case "login":
      presenceData.details = "Logging in";
      break;
    case "register":
      presenceData.details = "Registering";
      break;
    case "catalog":
      if (pathArray[1] === "language") {
        presenceData.details = `Looking at ${
          document.querySelector("#catalog-heading").textContent
        }`;
        presenceData.state = "in the catalog";
        presenceData.smallImageKey = document
          .querySelector("#catalog-heading")
          .textContent.toLowerCase()
          .replace(" ", "_")
          .replace("+", "plus")
          .replace("#", "sharp");
        presenceData.smallImageText =
          document.querySelector("#catalog-heading").textContent;
      } else if (pathArray[1] === "subject") {
        presenceData.details = "Looking at a subject";
        presenceData.state = `"${
          document.querySelector("#catalog-heading").textContent
        }"`;
      } else {
        presenceData.details = "Browsing the catalog";
        presenceData.state = "of available languages";
      }
      break;
    case "subscriptions":
      presenceData.details = "Considering the PRO";
      presenceData.state = "subscription";
      break;
    case "explore":
      presenceData.details = "Exploring...";
      break;
    case "":
      if (window.location.hostname === "news.codecademy.com") {
        presenceData.details = "Browsing articles";
      } else {
        presenceData.details = "At the homepage";
      }
      break;
    case "pricing":
      presenceData.details = "Checking out the";
      presenceData.state = "paid plans";
      break;
    case "business":
      presenceData.details = "Checking out the";
      presenceData.state = "bussiness plans";
      break;
    case "articles":
      if (pathArray[1]) {
        presenceData.details = "Reading an article";
        presenceData.state = `"${
          document.querySelector("[class^=articleHeader__]").textContent
        }"`;
      } else {
        presenceData.details = "Browsing articles";
      }
      break;
    default:
      if (window.location.hostname === "news.codecademy.com") {
        presenceData.details = "Reading an article";
        presenceData.state = `"${
          document.querySelector(".post-full-title").textContent
        }"`;
      } else presenceData.details = "Idle";
      break;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
