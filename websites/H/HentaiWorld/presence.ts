const presence = new Presence({
    clientId: "660882722839068702"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  usernamewl,
  username,
  hentainame,
  episodenumber,
  timestamps;

interface IFrameData {
  iframeVideo: {
    duration: number;
    iFrameVideo: boolean;
    paused: boolean;
    currTime: number;
  };
}

presence.on("iFrameData", (data: IFrameData) => {
  const playback = data.iframeVideo.duration !== null ? true : false;
  if (playback) {
    ({ iFrameVideo, duration, paused } = data.iframeVideo);
    currentTime = data.iframeVideo.currTime;
  }
});
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "hwnew"
  };

  presenceData.startTimestamp = browsingStamp;

  if (!navigator.language.includes("it-IT")) {
    // English
    if (document.location.pathname === "/") {
      presenceData.smallImageKey = "home";
      presenceData.details = "Browsing in the homepage";
    } else if (document.location.pathname.startsWith("/contact")) {
      // Contact the Staff
      presenceData.smallImageKey = "contacts";
      presenceData.details = "Contacting the Staff";
    } else if (document.location.pathname.startsWith("/user/")) {
      // User Settings
      if (document.location.pathname.startsWith("/user/settings")) {
        // General Settings
        presenceData.smallImageKey = "settings";
        presenceData.details = "In the settings";
      } else if (document.location.href.includes("watchlist")) {
        // WatchList
        presenceData.smallImageKey = "wlsettings";
        presenceData.details = "Editing the WatchList";
      } else if (document.location.pathname.startsWith("/user/import")) {
        // Import WL
        presenceData.smallImageKey = "import";
        presenceData.details = "Importing the";
        presenceData.state = "WatchList from MAL";
      } else if (document.location.pathname.startsWith("/user/notifications")) {
        // Notifications
        presenceData.smallImageKey = "notifications";
        presenceData.details = "Browsing the";
        presenceData.state = "notifications";
      } else presenceData.smallImageKey = "settings";
      presenceData.details = "In the settings";
    } else if (document.location.pathname.startsWith("/profile")) {
      // Profile
      if (document.location.href.includes("watchlist")) {
        usernamewl = document.querySelector("span.site-name > b").textContent;
        presenceData.smallImageKey = "userwl";
        presenceData.details = `Watching the ${usernamewl}'s`;
        presenceData.state = "WatchList";
      } else {
        username = document
          .querySelector("div.ruolo-aw2")
          .textContent.replace("Hey ", "")
          .replace(" Benvenuto!", "");
        presenceData.smallImageKey = "user";
        presenceData.details = `Watching the ${username}'s`;
        presenceData.state = "profile";
      }
    } else if (document.location.pathname.startsWith("/genre")) {
      // Genre
      if (document.location.href.includes("?page=")) {
        presenceData.smallImageKey = "search";
        presenceData.details = "Browsing the genre:";
        presenceData.state = `${document.title.split('"')[1]}Page: ${
          document.location.href.split("=")[1]
        }`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = `Browsing the genre:${
          document.title.split('"')[1]
        }`;
        presenceData.state = `${document.title.split('"')[1]}Page: 1`;
      }
    } else if (document.location.pathname.startsWith("/newest")) {
      // Newest
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/newest?page="
        )
      ) {
        presenceData.smallImageKey = "new";
        presenceData.details = "Browsing the new Hentai";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/newest?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "new";
        presenceData.details = "Browsing the new Hentai";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/updated")) {
      // Updated
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/updated?page="
        )
      ) {
        presenceData.smallImageKey = "new";
        presenceData.details = "Browsing the new episodes";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/newest?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "new";
        presenceData.details = "Browsing the new episodes";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/ongoing")) {
      // On Going
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/ongoing?page="
        )
      ) {
        presenceData.smallImageKey = "schedule";
        presenceData.details = "Browsing the on going";
        presenceData.state = `Hentai. Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/ongoing?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "schedule";
        presenceData.details = "Browsing the on going";
        presenceData.state = "Hentai. Page: 1";
      }
    } else if (document.location.pathname.startsWith("/upcoming")) {
      // Upcoming
      presenceData.smallImageKey = "clock";
      presenceData.details = "Browsing the upcoming";
      presenceData.state = "Hentai";
    } else if (document.location.pathname.startsWith("/az-list")) {
      // A-Z List
      if (document.location.href.includes("?page=")) {
        presenceData.smallImageKey = "archive";
        presenceData.details = "Browsing the archive";
        presenceData.state = `Page: ${document.location.href.split("=")[1]}`;
      } else presenceData.smallImageKey = "archive";
      presenceData.details = "Browsing the archive";
      presenceData.state = "Page: 1";
    } else if (document.location.pathname.startsWith("/search")) {
      // Search
      presenceData.smallImageKey = "search";
      presenceData.details = "Searching:";
      presenceData.state = document.title.replace("HentaiWorld: ", "");
    } else if (
      document.location.href.startsWith("https://www.hentaiworld.eu/filter")
    ) {
      // Accurate Research
      presenceData.smallImageKey = "search";
      presenceData.details = "Doing an advanced";
      presenceData.state = "search";
    } else if (document.location.pathname.startsWith("/tv-series")) {
      // Categories
      // TV-Series
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/tv-series?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Hentai";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/tv-series?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Hentai";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/movies")) {
      // Movies
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/movies?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Movies";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/movies?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Movies";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/ova")) {
      // OVA
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/ova?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: OVA";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/ova?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: OVA";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/ona")) {
      // ONA
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/ona?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: ONA";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/ona?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: ONA";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/specials")) {
      // Specials
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/specials?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Specials";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/specials?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Specials";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/preview")) {
      // Preview
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/preview?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Preview";
        presenceData.state = `Page: ${document.location.href.replace(
          "https://www.hentaiworld.eu/preview?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "In the category: Preview";
        presenceData.state = "Page: 1";
      }
    } else if (document.location.pathname.startsWith("/watch")) {
      // End Categories
      // Hentai Episode
      [hentainame] = document.title
        .replace("HentaiWorld: ", "")
        .split(" Episodio");
      [, episodenumber] = document
        .querySelector("a#downloadLink.btn.btn-sm.btn-primary")
        .textContent.split("Ep ");
      timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
      if (iFrameVideo === true && !isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.details = `Watching: ${hentainame}`;
        presenceData.state = paused
          ? `Ep. ${episodenumber}｜Paused`
          : `Ep. ${episodenumber}｜Playing`;
        presenceData.startTimestamp = paused ? null : timestamps[0];
        presenceData.endTimestamp = paused ? null : timestamps[1];
      } else {
        presenceData.smallImageKey = "watching";
        presenceData.details = ` Is going to watch: ${hentainame}`;
        presenceData.state = `Episode: ${episodenumber}`;
      }
    }
  } else {
    // Italian
    if (document.location.pathname === "/") {
      presenceData.smallImageKey = "home";
      presenceData.details = "Nella homepage";
    } else if (document.location.pathname.startsWith("/contact")) {
      // Contact the Staff
      presenceData.smallImageKey = "contacts";
      presenceData.details = "Sta contattando lo";
      presenceData.state = "Staff";
    } else if (document.location.pathname.startsWith("/user/")) {
      // User Settings
      if (document.location.pathname.startsWith("/user/settings")) {
        // General Settings
        presenceData.smallImageKey = "settings";
        presenceData.details = "Nelle sue impostazioni";
      } else if (document.location.href.includes("watchlist")) {
        // WatchList
        presenceData.smallImageKey = "wlsettings";
        presenceData.details = "Sta modificando la";
        presenceData.state = "sua WatchList";
      } else if (document.location.pathname.startsWith("/user/import")) {
        // Import WL
        presenceData.smallImageKey = "import";
        presenceData.details = "Sta importando la sua";
        presenceData.state = "WatchList da MAL";
      } else if (document.location.pathname.startsWith("/user/notifications")) {
        // Notifications
        presenceData.smallImageKey = "notifications";
        presenceData.details = "Sfoglia le notifiche";
      } else presenceData.smallImageKey = "settings";
      presenceData.details = "Nelle impostazioni";
    } else if (document.location.pathname.startsWith("/profile")) {
      // Profile
      if (document.location.href.includes("watchlist")) {
        usernamewl = document.querySelector("span.site-name > b").textContent;
        presenceData.smallImageKey = "userwl";
        presenceData.details = "Guarda la WatchList di:";
        presenceData.state = usernamewl;
      } else {
        username = document
          .querySelector("div.ruolo-aw2")
          .textContent.replace("Hey ", "")
          .replace(" Benvenuto!", "");
        presenceData.smallImageKey = "user";
        presenceData.details = "Guarda il profilo di:";
        presenceData.state = username;
      }
    } else if (document.location.pathname.startsWith("/genre")) {
      // Genre
      if (document.location.href.includes("?page=")) {
        presenceData.smallImageKey = "search";
        presenceData.details = `Nel genere: ${document.title.split('"')[1]}`;
        presenceData.state = `Pagina: ${document.location.href.split("=")[1]}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = `Nel genere: ${document.title.split('"')[1]}`;
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/newest")) {
      // Newest
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/newest?page="
        )
      ) {
        presenceData.smallImageKey = "new";
        presenceData.details = "Sfoglia le nuove aggiunte";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/newest?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "new";
        presenceData.details = "Sfoglia le nuove aggiunte";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/updated")) {
      // Updated
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/updated?page="
        )
      ) {
        presenceData.smallImageKey = "new";
        presenceData.details = "Sfoglia i nuovi episodi";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/newest?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "new";
        presenceData.details = "Sfoglia i nuovi episodi";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/ongoing")) {
      // On Going
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/ongoing?page="
        )
      ) {
        presenceData.smallImageKey = "schedule";
        presenceData.details = "Sfoglia gli hentai in corso";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/ongoing?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "schedule";
        presenceData.details = "Sfoglia gli hentai in corso";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/upcoming")) {
      // Upcoming
      presenceData.smallImageKey = "clock";
      presenceData.details = "Sfoglia le prossime";
      presenceData.state = "uscite";
    } else if (document.location.pathname.startsWith("/az-list")) {
      // A-Z List
      if (document.location.href.includes("?page=")) {
        presenceData.smallImageKey = "archive";
        presenceData.details = "Sfoglia tutti gli hentai";
        presenceData.state = `Pagina: ${document.location.href.split("=")[1]}`;
      } else presenceData.smallImageKey = "archive";
      presenceData.details = "Sfoglia tutti gli hentai";
      presenceData.state = "Pagina: 1";
    } else if (document.location.pathname.startsWith("/search")) {
      // Search
      presenceData.smallImageKey = "search";
      presenceData.details = "Sta cercando:";
      presenceData.state = document.title.replace("HentaiWorld: ", "");
    } else if (
      document.location.href.startsWith("https://www.hentaiworld.eu/filter")
    ) {
      // Accurate Research
      presenceData.smallImageKey = "search";
      presenceData.details = "Sta facendo una ricerca";
      presenceData.state = "avanzata";
    } else if (document.location.pathname.startsWith("/tv-series")) {
      // Categories
      // TV-Series
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/tv-series?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Hentai";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/tv-series?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Hentai";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/movies")) {
      // Movies
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/movies?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Film";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/movies?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Film";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/ova")) {
      // OVA
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/ova?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: OVA";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/ova?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: OVA";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/ona")) {
      // ONA
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/ona?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: ONA";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/ona?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: ONA";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/specials")) {
      // Specials
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/specials?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Specials";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/specials?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Specials";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/preview")) {
      // Preview
      if (
        document.location.href.startsWith(
          "https://www.hentaiworld.eu/preview?page="
        )
      ) {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Preview";
        presenceData.state = `Pagina: ${document.location.href.replace(
          "https://www.hentaiworld.eu/preview?page=",
          ""
        )}`;
      } else {
        presenceData.smallImageKey = "search";
        presenceData.details = "Nella categoria: Preview";
        presenceData.state = "Pagina: 1";
      }
    } else if (document.location.pathname.startsWith("/watch")) {
      // End Categories
      // Hentai Episode
      [hentainame] = document.title
        .replace("HentaiWorld: ", "")
        .split(" Episodio");
      [, episodenumber] = document
        .querySelector("a#downloadLink.btn.btn-sm.btn-primary")
        .textContent.split("Ep ");
      timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
      if (iFrameVideo === true && !isNaN(duration)) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.details = `Guardando: ${hentainame}`;
        presenceData.state = paused
          ? `Ep. ${episodenumber}｜In pausa`
          : `Ep. ${episodenumber}｜In riproduzione`;
        presenceData.startTimestamp = paused ? 0 : timestamps[0];
        presenceData.endTimestamp = paused ? 0 : timestamps[1];
      } else {
        presenceData.smallImageKey = "watching";
        presenceData.details = `Sta per guardare: ${hentainame}`;
        presenceData.state = `Episodio: ${episodenumber}`;
      }
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
