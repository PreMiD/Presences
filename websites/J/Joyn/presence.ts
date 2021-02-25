const presence = new Presence({
  clientId: "799629862620758046"
});
presence.on("UpdateData", async function () {
  const presenceData = {
      largeImageKey: "logo"
    },
    set_timeRemaining = await presence.getSetting("timeRemaining"),
    set_showButtons = await presence.getSetting("showButtons"),
    urlpath = window.location.pathname.split("/"),
    video = document.querySelector("div video");
  if (
    document.location.hostname == "www.joyn.de" ||
    document.location.hostname == "joyn.de"
  ) {
    if (document.querySelector(".lk71lm-0.htJLsh")) {
      presenceData.details = "Suche";
      presenceData.state = document.querySelector(".search-input").value;
    } else if (
      (urlpath[1] == "" || document.location.pathname.includes("/#home")) &&
      urlpath[2] != ""
    ) {
      presenceData.details = "Durchstöbert";
    } else if (urlpath[1] == "compilation") {
      const compilation = document.querySelector(".artLogo");
      presenceData.details = "Betrachtet Compilation:";
      if (compilation) presenceData.state = compilation.alt;
      if (!compilation)
        presenceData.state = document.querySelector(".hXdaOG").textContent;

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Compilation anschauen",
            url: "https://www.joyn.de/compilation/" + urlpath[2]
          }
        ];
      }
    } else if (urlpath[1] == "filme") {
      const film = document.querySelector(".artLogo");
      presenceData.details = "Betrachtet Film:";
      if (film) presenceData.state = film.alt;
      if (!film)
        presenceData.state = document.querySelector(".hXdaOG").textContent;

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Film anschauen",
            url: "https://www.joyn.de/filme/" + urlpath[2]
          }
        ];
      }
    } else if (urlpath[1] == "serien") {
      const serie = document.querySelector(".artLogo");
      presenceData.details = "Betrachtet Serie:";
      if (serie) presenceData.state = serie.alt;
      if (!serie)
        presenceData.state = document.querySelector(".hXdaOG").textContent;

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Serie anschauen",
            url: "https://www.joyn.de/serien/" + urlpath[2]
          }
        ];
      }
    } else if (
      urlpath[1] != "play" &&
      (document.location.pathname.includes("/serien") ||
        document.location.pathname.includes("/filme") ||
        document.location.pathname.includes("/sport"))
    ) {
      presenceData.details = "Durchstöbert";
    } else if (urlpath[1] == "channels") {
      presenceData.details = "Durchstöbert";
      presenceData.state = document.querySelector(".bISbKZ").textContent;
    } else if (urlpath[1] == "play" && urlpath[2] == "filme") {
      const video_startTime = Date.now(),
        video_endTime =
          Math.floor(video_startTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("streamen | Joyn", "");
      presenceData.state = "Film";
      if (!video.paused) {
        if (set_timeRemaining) {
          presenceData.startTimestamp = video_startTime;
          presenceData.endTimestamp = video_endTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Wiedergabe";
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Pausiert";
      }
      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Film anschauen",
            url: "https://www.joyn.de/filme/" + urlpath[3]
          }
        ];
      }
    } else if (urlpath[1] == "play" && urlpath[2] == "serien") {
      const video_startTime = Date.now(),
        video_endTime =
          Math.floor(video_startTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("streamen", "");
      presenceData.state = "Serie";
      if (!video.paused) {
        if (set_timeRemaining) {
          presenceData.startTimestamp = video_startTime;
          presenceData.endTimestamp = video_endTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Wiedergabe";
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Pausiert";
      }

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Serie anschauen",
            url: "https://www.joyn.de/serien/" + urlpath[3]
          }
        ];
      }
    } else if (urlpath[1] == "play" && urlpath[2] == "trailer") {
      const video_startTime = Date.now(),
        video_endTime =
          Math.floor(video_startTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("Trailer | Joyn", "");
      presenceData.state = "Trailer";
      if (!video.paused) {
        if (set_timeRemaining) {
          presenceData.startTimestamp = video_startTime;
          presenceData.endTimestamp = video_endTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Wiedergabe";
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Pausiert";
      }
    } else if (urlpath[1] == "play" && urlpath[2] == "live-tv") {
      presenceData.details = document.title.replace(
        "im Livestream anschauen | Joyn",
        ""
      );
      presenceData.state = "Live-TV";
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = "Live";

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Sendung anschauen",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[1] == "play" && urlpath[2] == "compilation") {
      const video_startTime = Date.now(),
        video_endTime =
          Math.floor(video_startTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.title.replace("| Joyn", "");
      presenceData.state = "Compilation";
      if (!video.paused) {
        if (set_timeRemaining) {
          presenceData.startTimestamp = video_startTime;
          presenceData.endTimestamp = video_endTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Wiedergabe";
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Pausiert";
      }

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Compilation anschauen",
            url: "https://www.joyn.de/compilation/" + urlpath[3]
          }
        ];
      }
    } else if (urlpath[1] == "play" && urlpath[2] == "sport") {
      const video_startTime = Date.now(),
        video_endTime =
          Math.floor(video_startTime / 1000) -
          video.currentTime +
          video.duration;
      presenceData.details = document.querySelector(
        ".metadataWrapper .metadataTitle"
      ).textContent;
      presenceData.state = "Sport";
      if (!video.paused) {
        if (set_timeRemaining) {
          presenceData.startTimestamp = video_startTime;
          presenceData.endTimestamp = video_endTime;
        }
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = "Wiedergabe";
      } else {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Pausiert";
      }

      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Sportsendung anschauen",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[1] == "mein-account") {
      if (urlpath[2] == "details") {
        presenceData.details = "Mein Account";
        presenceData.state = "Details";
      } else {
        presenceData.details = "Mein Account";
      }
    } else if (urlpath[1] == "abo") {
      if (urlpath[2] == "bezahlung") {
        presenceData.details = "Mein Account";
        presenceData.state = "Bezahlungsmethode";
      } else if (urlpath[2] == "rechnung") {
        presenceData.details = "Mein Account";
        presenceData.state = "Rechnungen";
      } else {
        presenceData.details = "Mein Account";
        presenceData.state = "Mitgliedschaft";
      }
    } else if (urlpath[1] == "fsk") {
      presenceData.details = "Mein Account";
      presenceData.state = "FSK Einstellungen";
    } else if (urlpath[1] == "ueber-joyn") {
      presenceData.details = "Über Joyn";
    } else if (urlpath[1] == "jugendschutz") {
      presenceData.details = "Jugendschutz";
    } else if (urlpath[1] == "datenschutz") {
      presenceData.details = "Datenschutzerklärung";
    } else if (urlpath[1] == "agb") {
      presenceData.details = "AGB's";
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
