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
  const presenceData: presenceData = {
    details: "Home",
    largeImageKey: "main"
  };
  if (document.location.pathname == "/home") {
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/buscar-projeto/anime") {
    presenceData.details = "Procurando anime...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/projeto/")) {
    let vid: any = document.getElementById("playerIframe");
    vid = vid.contentDocument.getElementsByTagName("video")[0];
    const anime: any = document.querySelectorAll(".content-heading h3")[0];

    if (document.getElementsByClassName("modal-open").length > 0) {
      if (vid && vid.currentTime > 0 && !vid.paused) {
        var { currentTime, duration } = vid;
        const start = Math.floor(Date.now() / 1000);

        presenceData.startTimestamp = start;
        presenceData.endTimestamp = Math.floor(start - currentTime + duration);
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).playing;

        const ep: any = document.getElementsByClassName("modal-title")[0];

        presenceData.details = anime.innerText;
        presenceData.state = `EP ${ep.innerText.substr(-2)}`;
      } else if (vid && vid.paused) {
        presenceData.details = anime.innerText;
        presenceData.smallImageKey = "paused";
        presenceData.smallImageText = (await strings).paused;
      } else {
        presenceData.details = `${anime.innerText}`;
      }
    } else {
      presenceData.details = `${anime.innerText}`;
    }

    presence.setActivity(presenceData);
  }
});
