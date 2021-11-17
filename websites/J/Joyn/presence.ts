const presence = new Presence({
  clientId: "799629862620758046"
});

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      browsing: "general.browsing",
      live: "general.live",
      searching: "general.search",
      viewMovie: "general.viewMovie",
      watchingMovie: "general.watchingMovie",
      watchingSeries: "general.watchingSeries",
      watchMovie: "general.buttonViewMovie",
      watchSeries: "general.buttonViewSeries"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let lang = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async function () {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    newLang = await presence.getSetting("lang").catch(() => "en"),
    setting = {
      timeRemaining: await presence.getSetting("timeRemaining"),
      showButtons: await presence.getSetting("showButtons")
    },
    urlpath = window.location.pathname.split("/"),
    video: HTMLVideoElement = document.querySelector("div video");

  if (oldLang !== newLang) {
    oldLang = newLang;
    lang = getStrings();
  }

  if (
    document.location.hostname === "www.joyn.de" ||
    document.location.hostname === "joyn.de"
  ) {
    if (document.querySelector(".lk71lm-0.htJLsh")) {
      presenceData.details = (await lang).searching;
      presenceData.state = (
        document.querySelector(".search-input") as HTMLElement
      ).textContent;
    } else if (
      (urlpath[1] === "" || document.location.pathname.includes("/#home")) &&
      urlpath[2] !== ""
    )
      presenceData.details = (await lang).browsing;
    else if (urlpath[1] === "compilation") {
      const compilation = document.querySelector(".artLogo");
      presenceData.details = "Viewing Compilation:";
      if (compilation)
        presenceData.state = (compilation as HTMLImageElement).alt;
      if (!compilation)
        presenceData.state = document.querySelector(".hXdaOG").textContent;

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: "Watch Compilation",
            url: `https://www.joyn.de/compilation/${urlpath[2]}`
          }
        ];
      }
    } else if (urlpath[1] === "filme") {
      const film = document.querySelector(".artLogo");
      presenceData.details = (await lang).viewMovie;
      if (film) presenceData.state = (film as HTMLImageElement).alt;
      if (!film)
        presenceData.state = document.querySelector(".hXdaOG").textContent;

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: (await lang).watchMovie,
            url: `https://www.joyn.de/filme/${urlpath[2]}`
          }
        ];
      }
    } else if (urlpath[1] === "serien") {
      const serie = document.querySelector(".artLogo");
      presenceData.details = "Viewing Series:";
      if (serie) presenceData.state = (serie as HTMLImageElement).alt;
      if (!serie)
        presenceData.state = document.querySelector(".hXdaOG").textContent;

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: (await lang).watchSeries,
            url: `https://www.joyn.de/serien/${urlpath[2]}`
          }
        ];
      }
    } else if (
      urlpath[1] !== "play" &&
      (document.location.pathname.includes("/serien") ||
        document.location.pathname.includes("/filme") ||
        document.location.pathname.includes("/sport"))
    )
      presenceData.details = (await lang).browsing;
    else if (urlpath[1] === "channels") {
      presenceData.details = (await lang).browsing;
      presenceData.state = document.querySelector(".bISbKZ").textContent;
    } else if (urlpath[1] === "play" && urlpath[2] === "filme") {
      const videoStartTime = Date.now(),
        videoEndTime =
          Math.floor(videoStartTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("streamen | Joyn", "");
      presenceData.state = "Movie";
      if (!video.paused) {
        if (setting.timeRemaining) {
          presenceData.startTimestamp = videoStartTime;
          presenceData.endTimestamp = videoEndTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await lang).play;
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await lang).pause;
      }
      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: (await lang).watchMovie,
            url: `https://www.joyn.de/filme/${urlpath[3]}`
          }
        ];
      }
    } else if (urlpath[1] === "play" && urlpath[2] === "serien") {
      const videoStartTime = Date.now(),
        videoEndTime =
          Math.floor(videoStartTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("streamen", "");
      presenceData.state = "Series";
      if (!video.paused) {
        if (setting.timeRemaining) {
          presenceData.startTimestamp = videoStartTime;
          presenceData.endTimestamp = videoEndTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await lang).play;
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await lang).pause;
      }

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: (await lang).watchSeries,
            url: `https://www.joyn.de/serien/${urlpath[3]}`
          }
        ];
      }
    } else if (urlpath[1] === "play" && urlpath[2] === "trailer") {
      const videoStartTime = Date.now(),
        videoEndTime =
          Math.floor(videoStartTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("Trailer | Joyn", "");
      presenceData.state = "Trailer";
      if (!video.paused) {
        if (setting.timeRemaining) {
          presenceData.startTimestamp = videoStartTime;
          presenceData.endTimestamp = videoEndTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await lang).play;
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await lang).pause;
      }
    } else if (urlpath[1] === "play" && urlpath[2] === "live-tv") {
      presenceData.details = document.title.replace(
        "im Livestream anschauen | Joyn",
        ""
      );
      presenceData.state = "Live-TV";
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = (await lang).live;

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: "Watch show",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[1] === "play" && urlpath[2] === "compilation") {
      const videoStartTime = Date.now(),
        videoEndTime =
          Math.floor(videoStartTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("| Joyn", "");
      presenceData.state = "Compilation";
      if (!video.paused) {
        if (setting.timeRemaining) {
          presenceData.startTimestamp = videoStartTime;
          presenceData.endTimestamp = videoEndTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await lang).play;
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await lang).pause;
      }

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: "Watch Compilation",
            url: `https://www.joyn.de/compilation/${urlpath[3]}`
          }
        ];
      }
    } else if (urlpath[1] === "play" && urlpath[2] === "sport") {
      const videoStartTime = Date.now(),
        videoEndTime =
          Math.floor(videoStartTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.querySelector(
        ".metadataWrapper .metadataTitle"
      ).textContent;
      presenceData.state = "Sport";
      if (!video.paused) {
        if (setting.timeRemaining) {
          presenceData.startTimestamp = videoStartTime;
          presenceData.endTimestamp = videoEndTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await lang).play;
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await lang).pause;
      }

      if (setting.showButtons) {
        presenceData.buttons = [
          {
            label: "Watch sports show",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[1] === "collections" && urlpath[2]) {
      presenceData.details = "Viewing Collection:";
      presenceData.state = document.querySelector(
        "h1.sc-eqamei-0.cdfQp"
      )?.textContent;
    } else if (urlpath[1] === "mein-account") {
      if (urlpath[2] === "details") {
        presenceData.details = "My Account";
        presenceData.state = "Details";
      } else presenceData.details = "My Account";
    } else if (urlpath[1] === "abo") {
      if (urlpath[2] === "bezahlung") {
        presenceData.details = "My Account";
        presenceData.state = "Payment method";
      } else if (urlpath[2] === "rechnung") {
        presenceData.details = "My Account";
        presenceData.state = "Bills";
      } else {
        presenceData.details = "My Account";
        presenceData.state = "Membership";
      }
    } else if (urlpath[1] === "fsk") {
      presenceData.details = "My Account";
      presenceData.state = "FSK Settings";
    } else if (urlpath[1] === "ueber-joyn") presenceData.details = "About Joyn";
    else if (urlpath[1] === "jugendschutz")
      presenceData.details = "Youth protection";
    else if (urlpath[1] === "datenschutz")
      presenceData.details = "Privacy policy";
    else if (urlpath[1] === "agb") presenceData.details = "Terms of service";
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
