const presence = new Presence({
  clientId: "711175341825064970"
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;

  return [Math.floor(startTime / 1000), endTime];
}

const browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  playback;

presence.on(
  "iFrameData",
  (data: {
    iframe_video: {
      duration: number;
      iFrameVideo: boolean;
      currTime: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
      iFrameVideo = data.iframe_video.iFrameVideo;
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.duration;
      paused = data.iframe_video.paused;
    }
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo_ds" // Banner
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    // dreamsub.stream/

    presenceData.smallImageKey = "home";
    presenceData.smallImageText = "DreamSub";
    presenceData.details = "Nella Homepage...";
  } else if (document.location.pathname.includes("/animelist")) {
    // Anime guardati
    const username = document.title.split("-")[1];
    if (document.location.href.includes("?type=watched")) {
      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Lista Anime Guardati";
      presenceData.state = "Di" + username;
    } else if (document.location.href.includes("?type=planToWatch")) {
      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Lista Anime da guardare";
      presenceData.state = "Di" + username;
    } else if (document.location.href.includes("/animelist?type=watching")) {
      // Anime in corso

      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Lista Anime In corso";
      presenceData.state = "Di" + username;
    } else if (document.location.href.includes("/animelist?type=planToWatch")) {
      // Anime da guardare

      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Lista Anime Da Guardare";
      presenceData.state = "Di" + username;
    } else if (document.location.href.includes("/animelist?type=dropped")) {
      // Anime droppati

      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Lista Anime Droppati";
      presenceData.state = "Di" + username;
    } else if (document.location.href.includes("/animelist?type=paused")) {
      // Anime in pausa

      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Lista Anime In Pausa";
      presenceData.state = "Di" + username;
    } else if (document.location.href.includes("animelist")) {
      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Nella Animelist";
      presenceData.state = "Di" + username;
    }
  } else if (document.location.pathname.includes("/settings")) {
    // Impostazioni utente

    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "Dreamsub";
    presenceData.details = "Nelle impostazioni";
    presenceData.state = "Utente...";
  } else if (document.location.pathname.includes("/user")) {
    // Profilo

    const username = document.title.split("-")[1];
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "DreamSub";
    presenceData.details = "Guardando il profilo di:";
    presenceData.state = username;
  } else if (document.location.pathname.includes("/404")) {
    // Error 404

    presenceData.smallImageKey = "error";
    presenceData.smallImageText = "Errore 404";
    presenceData.details = "In una Pagina inesistente";
    presenceData.state = "su Dreamsub";
  } else if (document.location.pathname.includes("/palinsesto")) {
    // Palinsesto

    presenceData.smallImageKey = "calendar";
    presenceData.smallImageText = "Prossime uscite";
    presenceData.details = "Sfogliando le ";
    presenceData.state = "Prossime uscite...";
  } else if (document.location.pathname.includes("/segnala")) {
    // Segnalazioni

    presenceData.smallImageKey = "report";
    presenceData.smallImageText = "DreamSub";
    presenceData.details = "Effettuando una ";
    presenceData.state = "Segnalazione...";
  } else if (document.location.pathname.includes("/admin")) {
    //Pannello admin
    presenceData.smallImageKey = "admin";
    presenceData.smallImageText = "DreamSub";
    presenceData.details = "Nel pannello admin...";
    presenceData.state = "DreamSub";
  } else if (document.location.pathname.includes("/search")) {
    // Ricerca per tipo, categoria e nome

    const searching = document.querySelector(
      "#main-content > center > h3"
    ).textContent;

    if (document.location.href.includes("tv")) {
      // Ricerca TV

      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando la Categoria";
      presenceData.state = "Anime...";
    } else if (document.location.href.includes("movie")) {
      // Ricerca TV

      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando i film...";
      presenceData.state = "su DreamSub";
    } else if (
      document.location.href.includes("oav") // Ricerca OAV
    ) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando i Generi";
      presenceData.state = "OAV...";
    } else if (
      document.location.href.includes("spinoff") // Ricerca Spinoff
    ) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando gli";
      presenceData.state = "Spinoff...";
    } else if (
      document.location.href.includes("special") // Ricerca Special
    ) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando i Generi";
      presenceData.state = "Special...";
    } else if (document.location.href.includes("ona")) {
      // Ricerca ONA

      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando i Generi";
      presenceData.state = "ONA...";
    } else if (
      document.location.href.includes("inCorso") // Ricerca "In corso"
    ) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando Anime ";
      presenceData.state = "in Corso...";
    } else if (
      document.location.href.includes("future") // Ricerca "Futuri"
    ) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando Anime";
      presenceData.state = "Futuri...";
    } else if (
      document.location.href.includes("concluse") // Ricerca "Conclusi"
    ) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "DreamSub";
      presenceData.details = "Sfogliando Anime ";
      presenceData.state = "Conclusi...";
    } else if (document.location.href.includes("/search")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Cercando:" + "\n";
      presenceData.details = searching;
      presenceData.state = "su Dreamsub";
    }
  } else if (
    document.location.pathname.includes("anime") ||
    document.location.pathname.includes("spinoff") ||
    document.location.pathname.includes("oav") ||
    document.location.pathname.includes("special") ||
    document.location.pathname.includes("ona")
  ) {
    //Visualizzazione anime
    const type = document.querySelector(
        "#animeDetails > div > div > div.dc-info > div.dci-spe > div:nth-child(1)"
      ).textContent,
      episodes = document.querySelector(
        "#animeDetails > div > div > div.dc-info > div.dci-spe > div:nth-child(2)"
      ).textContent,
      releaseDate = document.querySelector(
        "#animeDetails > div > div > div.dc-info > div.dci-spe > div:nth-child(7)"
      ).textContent,
      vote = document.querySelector("#vote_percent").textContent,
      timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
      animepreviewname = document.querySelector(
        "#animeDetails > div > div > div.dc-info > h1 > a > strong"
      ).textContent;

    presenceData.smallImageKey = "prewatch";
    presenceData.smallImageText = animepreviewname;
    presenceData.details = "Sta per guardare:\n" + animepreviewname;
    presenceData.state =
      "Per più informazioni 🎦\n" +
      type +
      "\n" +
      episodes +
      "\n" +
      releaseDate +
      "\n" +
      "Voto: " +
      vote;

    if (iFrameVideo === true && !isNaN(duration)) {
      const newname = document.title.split(": Episodio")[0],
        animenumber = document.title
          .split(": ")[1]
          .split("Streaming & Download HD")[0];

      if (currentTime == duration) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = newname + "｜ " + animenumber;
        presenceData.details = "Guardando: " + newname;
        presenceData.state = animenumber + "｜Finito";
      } else if (currentTime != duration) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = newname + " | " + animenumber;
        presenceData.details = "Guardando: " + newname;
        presenceData.startTimestamp = paused ? null : timestamps[0];
        presenceData.state = paused
          ? animenumber + "｜In pausa"
          : animenumber + "｜In riproduzione";
        presenceData.endTimestamp = paused ? null : timestamps[1];
      }
    }
  } else if (document.location.pathname.includes("movie")) {
    //Visualizzazione film
    const type = document.querySelector(
        "#animeDetails > div > div > div.dc-info > div.dci-spe > div:nth-child(1)"
      ).textContent,
      episodes = document.querySelector(
        "#animeDetails > div > div > div.dc-info > div.dci-spe > div:nth-child(2)"
      ).textContent,
      releaseDate = document.querySelector(
        "#animeDetails > div > div > div.dc-info > div.dci-spe > div:nth-child(7)"
      ).textContent,
      vote = document.querySelector("#vote_percent").textContent,
      timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
      animepreviewname = document.querySelector(
        "#animeDetails > div > div > div.dc-info > h1 > a > strong"
      ).textContent;

    presenceData.smallImageKey = "prewatch";
    presenceData.smallImageText = animepreviewname;
    presenceData.details = "Sta per guardare:\n" + animepreviewname;
    presenceData.state =
      "Per più informazioni 🎦\n" +
      type +
      "\n" +
      episodes +
      "\n" +
      releaseDate +
      "\n" +
      "Voto: " +
      vote;

    if (iFrameVideo === true && !isNaN(duration)) {
      const newname = document.querySelector(
        "#main-content > div.goblock.play-anime > div.gobread > ol > li.active > h1 > a"
      ).textContent;

      if (currentTime == duration) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = newname;
        presenceData.details = "Guardando:";
        presenceData.state = newname;
      } else if (currentTime != duration) {
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = newname;
        presenceData.details = "Guardando: ";
        presenceData.startTimestamp = paused ? null : timestamps[0];
        presenceData.state = paused
          ? newname + " | In pausa"
          : newname + " | In riproduzione";
        presenceData.endTimestamp = paused ? null : timestamps[1];
      }
    }
  } else {
    //Generico
    presenceData.largeImageKey = "logo_ds";
    presenceData.smallImageText = "Navigando...";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
