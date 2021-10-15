const presence = new Presence({
    clientId: "669254632400355358"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  playback,
  pageNumber,
  videoName,
  videoEpisode,
  fullName: string,
  timestamps: number[];

presence.on(
  "iFrameData",
  (data: {
    iframeVideo: {
      duration: number;
      iFrameVideo: boolean;
      currTime: number;
      paused: boolean;
    };
  }) => {
    playback = data.iframeVideo.duration !== null ? true : false;
    if (playback) {
      ({ iFrameVideo, duration, paused } = data.iframeVideo);
      currentTime = data.iframeVideo.currTime;
    }
  }
);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "asnew"
  };

  if (document.location.pathname === "/") {
    data.smallImageKey = "home";
    data.smallImageText = "Homepage";
    data.details = "Nella homepage";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/animelist")) {
    data.smallImageKey = "archive";
    data.smallImageText = "Archivio";
    data.details = "Sfoglia l'archivio";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/toplist")) {
    data.smallImageKey = "top";
    data.smallImageText = "Top degli anime";
    data.details = "Guarda la top list degli";
    data.state = "anime";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/animeincorso")) {
    if (document.location.href.includes("?page=")) {
      [pageNumber] = document.location.href.split("=")[1].split("#");
      data.smallImageKey = "schedule";
      data.smallImageText = "Anime in corso";
      data.details = "Sfoglia gli anime in corso";
      data.state = `Pagina: ${pageNumber}`;
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      data.smallImageKey = "schedule";
      data.smallImageText = "Nuove aggiunte";
      data.details = "Sfoglia gli anime in corso";
      data.state = "Pagina: 1";
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
  } else if (document.location.pathname.startsWith("/newest")) {
    if (document.location.href.includes("?page=")) {
      [pageNumber] = document.location.href.split("=")[1].split("#");
      data.smallImageKey = "new";
      data.smallImageText = "Nuove aggiunte";
      data.details = "Sfoglia le nuove aggiunte";
      data.state = `Pagina: ${pageNumber}`;
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      data.smallImageKey = "new";
      data.smallImageText = "Nuove aggiunte";
      data.details = "Sfoglia le nuove aggiunte";
      data.state = "Pagina: 1";
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
  } else if (document.location.pathname.startsWith("/upcoming")) {
    if (document.location.href.includes("?page=")) {
      [pageNumber] = document.location.href.split("=")[1].split("#");
      data.smallImageKey = "schedule";
      data.smallImageText = "Prossime uscite";
      data.details = "Sfoglia le prossime uscite";
      data.state = `Pagina: ${pageNumber}`;
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      data.smallImageKey = "schedule";
      data.smallImageText = "Prossime uscite";
      data.details = "Sfoglia le prossime uscite";
      data.state = "Pagina: 1";
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
  } else if (document.location.pathname.startsWith("/calendario")) {
    data.smallImageKey = "schedule";
    data.smallImageText = "Calendario";
    data.details = "Guarda il calendario degli";
    data.state = "anime";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/info")) {
    data.smallImageKey = "info";
    data.smallImageText = "Contatti";
    data.details = "Cerca di contattare lo";
    data.state = "staff di AnimeSaturn";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/anime")) {
    [videoName] = document.title
      .split("AnimeSaturn - ")[1]
      .split(" Streaming ");
    if (videoName.includes(" (ITA)"))
      videoName = videoName.replace(" (ITA)", "");

    data.smallImageKey = "viewing";
    data.smallImageText = `Scheda di: ${videoName}`;
    data.details = "Guarda la scheda di:";
    data.state = videoName;
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/ep/")) {
    [videoName] = document.title.split("AnimeSaturn - ")[1].split(" Episodio ");
    if (videoName.includes(" (ITA)"))
      videoName = videoName.replace(" (ITA)", "");

    [videoEpisode] = document.title.split(" Episodio ")[1].split(" Streaming ");
    data.smallImageKey = "watching";
    data.smallImageText = `Sta per guardare: ${videoName}`;
    data.details = `Sta per guardare:\n${videoName}`;
    data.state = `Episodio: ${videoEpisode}`;
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/movie/")) {
    [videoName] = document.title.split("AnimeSaturn - ")[1].split(" Movie ");
    if (videoName.includes(" Movie"))
      videoName = videoName.replace(" Movie", "");

    if (videoName.includes(" (ITA)"))
      videoName = videoName.replace(" (ITA)", "");

    data.smallImageKey = "watching";
    data.smallImageText = `Sta per guardare il film: ${videoName}`;
    data.details = "Sta per guardare il film:";
    data.state = videoName;
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/oav/")) {
    [videoName] = document.title.split("AnimeSaturn - ")[1].split(" OVA ");
    if (videoName.includes(" OVA")) videoName = videoName.replace(" OVA", "");

    if (videoName.includes(" OAV")) videoName = videoName.replace(" OAV", "");

    if (videoName.includes(" (ITA)"))
      videoName = videoName.replace(" (ITA)", "");

    data.smallImageKey = "watching";
    data.smallImageText = `Sta per guardare l'ova: ${videoName}`;
    data.details = "Sta per guardare l'ova:";
    data.state = videoName;
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/special/")) {
    [videoName] = document.title.split("AnimeSaturn - ")[1].split(" Special ");
    if (videoName.includes(" Specials"))
      videoName = videoName.replace(" Specials", "");

    if (videoName.includes(" (ITA)"))
      videoName = videoName.replace(" (ITA)", "");

    data.smallImageKey = "watching";
    data.smallImageText = `Sta per guardare lo special: ${videoName}`;
    data.details = "Sta per guardare lo special:";
    data.state = videoName;
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/watch")) {
    if (timestamps) {
      data.startTimestamp = paused ? null : timestamps[0];
      data.endTimestamp = paused ? null : timestamps[1];
    }
    if (document.location.href.endsWith("&extra=1")) {
      fullName = document
        .querySelector(
          "#wtf > footer > div.container.rounded.bg-dark-as-box.text-white.mt-1.mb-1.p-2 > h4 > div"
        )
        .textContent.trim()
        .replace("Server 1", "")
        .replace("Server 2", "");
    } else if (
      document.querySelector(
        "body > center > footer > div.container.rounded.bg-dark-as-box.text-white.mt-1.mb-1.p-2 > h4 > div"
      )
    ) {
      fullName = document
        .querySelector(
          "body > center > footer > div.container.rounded.bg-dark-as-box.text-white.mt-1.mb-1.p-2 > h4 > div"
        )
        .textContent.trim()
        .replace("Server 1", "")
        .replace("Server 2", "");
    } else {
      fullName = document
        .querySelector(
          "#wtf > footer > div.container.rounded.bg-dark-as-box.text-white.mt-1.mb-1.p-2 > h4 > div"
        )
        .textContent.trim()
        .replace("Server 1", "")
        .replace("Server 2", "");
    }
    if (iFrameVideo === true) {
      timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
    }

    if (document.location.href.endsWith("=alt")) {
      // Alternative
      if (fullName.includes(" Special")) {
        if (fullName.includes(" Specials Episodio ")) {
          // Specials OLD

          [videoName] = fullName.split(" Specials Episodio ");
          [videoEpisode] = fullName.split(" Specials Episodio ");
          if (videoName.includes(" (ITA)"))
            videoName = videoName.replace(" (ITA)", "");

          data.smallImageKey = paused ? "pause" : "play";
          data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
          data.details = `Guarda: ${videoName}`;
          data.state = paused
            ? `${videoEpisode}° Special｜In pausa`
            : `${videoEpisode}° Special｜In riproduzione`;
          presence.setActivity(data);
        } else {
          // Specials NEW

          [videoName] = fullName.split(" Special ");
          [videoEpisode] = fullName.split(" Special ");
          if (videoName.includes(" Special"))
            videoName = videoName.replace(" Special", "");

          if (videoName.includes(" (ITA)"))
            videoName = videoName.replace(" (ITA)", "");

          data.smallImageKey = paused ? "pause" : "play";
          data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
          data.details = `Guarda: ${videoName}`;
          data.state = paused
            ? `${videoEpisode}° Special｜In pausa`
            : `${videoEpisode}° Special｜In riproduzione`;
          presence.setActivity(data);
        }
      } else if (fullName.includes(" Movie ")) {
        // Movies

        [videoName] = fullName.split(" Movie ");
        if (videoName.includes(" Movie"))
          videoName = videoName.replace(" Movie", "");

        if (videoName.includes(" (ITA)"))
          videoName = videoName.replace(" (ITA)", "");

        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
        data.details = `Guarda: ${videoName}`;
        data.state = paused ? "Film｜In pausa" : "Film｜In riproduzione";
        presence.setActivity(data);
      } else if (fullName.includes(" OVA ")) {
        //OVA

        [videoName, videoEpisode] = fullName.split(" OVA ");
        if (videoName.includes(" OVA"))
          videoName = videoName.replace(" OVA", "");

        if (videoName.includes(" (ITA)"))
          videoName = videoName.replace(" (ITA)", "");

        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
        data.details = `Guarda: ${videoName}`;
        data.state = paused
          ? `${videoEpisode}° OVA｜In pausa`
          : `${videoEpisode}° OVA｜In riproduzione`;
        presence.setActivity(data);
      } else {
        // Anime

        [videoName, videoEpisode] = fullName.split(" Episodio ");
        if (videoName.includes(" (ITA)"))
          videoName = videoName.replace(" (ITA)", "");

        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
        data.details = `Guarda: ${videoName}`;
        data.state = paused
          ? `Ep. ${videoEpisode}｜In pausa`
          : `Ep. ${videoEpisode}｜In riproduzione`;
        presence.setActivity(data);
      }
    } else {
      // Original
      if (fullName.includes(" Special")) {
        if (fullName.includes(" Specials Episodio ")) {
          // Specials OLD

          [videoName, videoEpisode] = fullName.split(" Specials Episodio ");
          if (videoName.includes(" (ITA)"))
            videoName = videoName.replace(" (ITA)", "");

          data.smallImageKey = paused ? "pause" : "play";
          data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
          data.details = `Guarda: ${videoName}`;
          data.state = paused
            ? `${videoEpisode}° Special｜In pausa`
            : `${videoEpisode}° Special｜In riproduzione`;
          presence.setActivity(data);
        } else {
          // Specials NEW

          [videoName, videoEpisode] = fullName.split(" Special ");
          if (videoName.includes(" Special"))
            videoName = videoName.replace(" Special", "");

          if (videoName.includes(" (ITA)"))
            videoName = videoName.replace(" (ITA)", "");

          data.smallImageKey = paused ? "pause" : "play";
          data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
          data.details = `Guarda: ${videoName}`;
          data.state = paused
            ? `${videoEpisode}° Special｜In pausa`
            : `${videoEpisode}° Special｜In riproduzione`;
          presence.setActivity(data);
        }
      } else if (fullName.includes(" Movie ")) {
        // Movies

        [videoName] = fullName.split(" Movie ");
        if (videoName.includes(" Movie"))
          videoName = videoName.replace(" Movie", "");

        if (videoName.includes(" (ITA)"))
          videoName = videoName.replace(" (ITA)", "");

        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
        data.details = `Guarda: ${videoName}`;
        data.state = paused ? "Film｜In pausa" : "Film｜In riproduzione";
        presence.setActivity(data);
      } else if (fullName.includes(" OVA ")) {
        //OVA

        [videoName, videoEpisode] = fullName.split(" OVA ");
        if (videoName.includes(" OVA"))
          videoName = videoName.replace(" OVA", "");

        if (videoName.includes(" (ITA)"))
          videoName = videoName.replace(" (ITA)", "");

        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
        data.details = `Guarda: ${videoName}`;
        data.state = paused
          ? `${videoEpisode}° OVA｜In pausa`
          : `${videoEpisode}° OVA｜In riproduzione`;
        presence.setActivity(data);
      } else {
        // Anime

        [videoName, videoEpisode] = fullName.split(" Episodio ");
        if (videoName.includes(" (ITA)"))
          videoName = videoName.replace(" (ITA)", "");

        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
        data.details = `Guarda: ${videoName}`;
        data.state = paused
          ? `Ep. ${videoEpisode}｜In pausa`
          : `Ep. ${videoEpisode}｜In riproduzione`;
        presence.setActivity(data);
      }
    }
  } else if (document.location.pathname.startsWith("/admin")) {
    data.largeImageKey = "hitomi";
    data.smallImageKey = "working";
    data.smallImageText = "💜 Hitomi Lover";
    data.details = "Sta lavorando su";
    data.state = "AnimeSaturn";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else {
    data.smallImageKey = "search";
    data.smallImageText = "Navigando...";
    data.details = "Navigando...";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  }
});
