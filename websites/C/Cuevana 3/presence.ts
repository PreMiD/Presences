const presence = new Presence({
    clientId: "804448815942860821"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

let iFrameVideo: boolean, videoPaused: boolean, timestamps: number[];

presence.on(
  "iFrameData",
  (data: {
    iFrameVideo: boolean;
    duration: number;
    currentTime: number;
    paused: boolean;
  }) => {
    iFrameVideo = data.iFrameVideo;
    timestamps = presence.getTimestamps(data.currentTime, data.duration);
    videoPaused = data.paused;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (
    document.location.pathname.match("^/[0-9]") ||
    document.location.pathname.includes("/episodio")
  ) {
    const titulo = document.querySelector("h1.Title").textContent,
      subtitulo = document.querySelector("h2.SubTitle").textContent;

    if (!document.location.pathname.includes("/episodio")) {
      presenceData.details = titulo;
      subtitulo === titulo
        ? delete presenceData.state
        : (presenceData.state = subtitulo);
      presenceData.buttons = [
        { label: "Ver Película", url: window.location.href }
      ];
    } else {
      presenceData.details = titulo
        .replace(document.querySelector(`h1.Title > span`).textContent, ``)
        .replace(/\s+/g, ` `)
        .trim();
      presenceData.state =
        document.querySelector(`h1.Title > span`).textContent + " " + subtitulo;
      presenceData.buttons = [
        { label: "Ver Episodio", url: window.location.href }
      ];
    }

    if (iFrameVideo) {
      (presenceData.smallImageKey = videoPaused ? "pause" : "play"),
        (presenceData.smallImageText = videoPaused
          ? (await strings).pause
          : (await strings).play),
        (presenceData.startTimestamp = timestamps[0]),
        (presenceData.endTimestamp = timestamps[1]);

      if (videoPaused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }

    presence.setActivity(presenceData, !videoPaused);
  } else if (document.location.pathname.includes("/serie/")) {
    presenceData.details = document.querySelector(`h1.Title`).textContent;
    presenceData.smallImageKey = "browsing";
    presenceData.smallImageText = (await strings).browsing;
    presence.setActivity(presenceData);
  } else {
    presenceData.details = (await strings).browsing;
    presenceData.smallImageKey = "browsing";
    presenceData.smallImageText = (await strings).browsing;
    presence.setActivity(presenceData);
  }
});
