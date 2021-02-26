const presence = new Presence({
    clientId: "804448815942860821"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
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
    const timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      titulo = document.querySelector(`h1.Title`).textContent,
      subtitulo = document.querySelector(`h2.SubTitle`).textContent;

    if (!document.location.pathname.includes("/episodio"))
      presenceData.details = titulo;
    else {
      presenceData.details = titulo
        .replace(document.querySelector(`h1.Title > span`).textContent, ``)
        .replace(/\s+/g, ` `)
        .trim();
      presenceData.state =
        document.querySelector(`h1.Title > span`).textContent + " " + subtitulo;
    }

    (presenceData.smallImageKey = video.paused ? "pause" : "play"),
      (presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play),
      (presenceData.startTimestamp = timestamps[0]),
      (presenceData.endTimestamp = timestamps[1]);

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presenceData.buttons = [
      { label: "Ver Película", url: window.location.href }
    ];

    presence.setActivity(presenceData, !video.paused);
  } else if (document.location.pathname.includes("/serie/")) {
    presenceData.details = document.querySelector(`h1.Title`).textContent;
    presenceData.smallImageKey = "browsing";
    presenceData.smallImageText = (await strings).browsing;
    presenceData.buttons = [
      { label: "Ver Episodio", url: window.location.href }
    ];
    presence.setActivity(presenceData);
  } else {
    presenceData.details = (await strings).browsing;
    presenceData.smallImageKey = "browsing";
    presenceData.smallImageText = (await strings).browsing;
    presence.setActivity(presenceData);
  }
});
