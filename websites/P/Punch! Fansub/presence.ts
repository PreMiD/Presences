const presence = new Presence({
    clientId: "636322995329302543"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    episode: "presence.media.info.episode"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    details: "Home",
    largeImageKey: "main"
  };
  if (document.location.pathname === "/home")
    presence.setActivity(presenceData);
  else if (document.location.pathname === "/buscar-projeto/anime") {
    presenceData.details = "Procurando anime...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/projeto/")) {
    let vid: HTMLIFrameElement | HTMLVideoElement =
      document.querySelector<HTMLIFrameElement>("#playerIframe");
    [vid] = vid.contentDocument.getElementsByTagName("video");
    const [anime] = document.querySelectorAll<HTMLElement>(
      ".content-heading h3"
    );

    if (document.getElementsByClassName("modal-open").length > 0) {
      if (vid && vid.currentTime > 0 && !vid.paused) {
        const { currentTime, duration } = vid,
          start = Math.floor(Date.now() / 1000);

        presenceData.startTimestamp = start;
        presenceData.endTimestamp = Math.floor(start - currentTime + duration);
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).playing;

        const [ep] = document.getElementsByClassName("modal-title");

        presenceData.details = anime.innerText;
        presenceData.state = `EP ${(ep as HTMLElement).innerText.substr(-2)}`;
      } else if (vid && vid.paused) {
        presenceData.details = anime.innerText;
        presenceData.smallImageKey = "paused";
        presenceData.smallImageText = (await strings).paused;
      } else presenceData.details = `${anime.innerText}`;
    } else presenceData.details = `${anime.innerText}`;

    presence.setActivity(presenceData);
  }
});
