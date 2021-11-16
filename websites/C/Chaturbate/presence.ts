const presence = new Presence({
    clientId: "760587514477281320"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
  });
let prev: string, elapsed: number, path: string, gender: string;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "chb"
    },
    video: HTMLVideoElement = document.querySelector("video[id$='_html5_api']");

  path = document.location.pathname;

  if (
    path.includes("/b/") &&
    document.querySelector("#broadcaster_intro") &&
    (document.querySelector("#broadcaster_intro") as HTMLElement).style
      .display === "none"
  ) {
    if (window.location.href !== prev) {
      prev = window.location.href;
      elapsed = Math.floor(Date.now() / 1000);
    }

    data.details = "Broadcasting as";
    [, , data.state] = path.split("/");
    data.smallImageKey = "live";
    data.smallImageText = (await strings).live;
    data.startTimestamp = elapsed;
  } else if (
    !video &&
    document.querySelector("#header div.logo-zone") !== null
  ) {
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;

    if (path.includes("/p/")) {
      // Whoever editing this file in the future, keep this as it is for the sake of user's privacy
      data.state = "Accounts";
    } else if (path.includes("/b/")) data.state = "Broadcast page";
    else if (path.includes("/tag/")) {
      if (
        typeof path.split("/")[3] === "undefined" ||
        path.split("/")[3] === null ||
        path.split("/")[3] === "" ||
        path.split("/")[3].length > 1
      ) {
        // Different checks to prevent "undefined" gender strings.
        data.state = `Tag : ${path.split("/")[2]}`;
      } else {
        switch (path.split("/")[3]) {
          case "f":
            gender = "female";
            break;
          case "m":
            gender = "male";
            break;
          case "c":
            gender = "couple";
            break;
          case "s":
            gender = "trans";
        }

        data.state = `Tag : ${path.split("/")[2]} (${gender})`;
      }
    } else {
      switch (path) {
        case "/":
          data.state = "Featured cams";
          break;
        case "/female-cams/":
          data.state = "Female cams";
          break;
        case "/male-cams/":
          data.state = "Male cams";
          break;
        case "/couple-cams/":
          data.state = "Couple cams";
          break;
        case "/trans-cams/":
          data.state = "Trans cams";
          break;
        case "/tags/":
          data.state = "Tags";
          break;
        case "/accounts/register/":
          data.state = "Signing up";
          break;
        case "/auth/login/":
          data.state = "Logging in";
          break;
        case "/auth/logout/":
          data.state = "Logging out";
          break;
        case "/north-american-cams/":
          data.state = "North American cams";
          break;
        case "/other-region-cams/":
          data.state = "Other region cams";
          break;
        case "/euro-russian-cams/":
          data.state = "Euro Russian cams";
          break;
        case "/asian-cams/":
          data.state = "Asian cams";
          break;
        case "/south-american-cams/":
          data.state = "South American cams";
          break;
        case "/exhibitionist-cams/":
          data.state = "Exhibitionist cams";
          break;
        case "/hd-cams/":
          data.state = "HD cams";
          break;
        case "/spy-on-cams/":
          data.state = "Private cams";
          break;
        case "/new-cams/":
          data.state = "New cams";
          break;
        case "/mature-cams/":
          data.state = "Mature cams";
          break;
        case "/teen-cams/":
          data.state = "Teen cams";
          break;
        case "/sitemap/":
        case "/2257/":
        case "/terms/":
        case "/contest/details/":
        case "/jobs/":
        case "/apps/":
        case "/billingsupport/":
        case "/security/":
        case "/affiliates/":
        case "/privacy/":
        case "/law_enforcement/":
          data.details = "Reading";
          data.state = "Law and meta pages";
          data.smallImageKey = "reading";
          data.smallImageText = "Reading";
          break;
        case "/tube/":
          data.state = "Tube";
          break;
        case "/accounts/welcome/":
          data.state = "Welcome page";
          break;
        case "/my_collection/private_shows/":
          data.state = "Recorded private shows";
          break;
        case "/my_collection/photo_videos/":
          data.state = "Purchased photos/videos";
          break;
        case "/tipping/free_tokens/":
          data.state = "Free token methods";
          break;
        case "/supporter/upgrade/":
          data.state = "Upgrade page";
          break;
        default:
          data.state = "Cams";
      }
    }
  } else if (path.includes("/photo_videos/")) {
    if (!video && path.includes("/photo_videos/photo/")) {
      data.details = "Looking at a photo";
      data.state = document.querySelector("h1").textContent;
      data.smallImageKey = "search";
      data.smallImageText = (await strings).browsing;
    } else if (video && path.includes("/photo_videos/photo/")) {
      [data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

      data.details = "Watching a clip";
      data.state = document.querySelector("h1").textContent;
      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }
    } else {
      data.details = (await strings).browsing;
      data.state = "Photosets";
      data.smallImageKey = "search";
      data.smallImageText = (await strings).browsing;
    }
  } else if (path.split("/")[2] === null || path.split("/")[2].length === 0) {
    if (window.location.href !== prev) {
      prev = window.location.href;
      elapsed = Math.floor(Date.now() / 1000);
    }

    data.startTimestamp = elapsed;
    [, data.details] = path.split("/");

    if (video && !video.paused) {
      data.smallImageKey = "live";
      data.smallImageText = (await strings).live;
    } else {
      data.smallImageKey = "search";
      data.smallImageText = (await strings).browsing;
      data.state = (await strings).browsing;
    }
  } else {
    data.details = (await strings).browsing;
    data.state = "Cams";
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;
  }

  presence.setActivity(data);
});
