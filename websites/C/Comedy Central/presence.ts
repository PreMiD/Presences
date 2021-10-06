const presence = new Presence({
    clientId: "630533580119998496"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "comedycentral"
  };

  if (document.location.pathname.startsWith("/episodes")) {
    const player: HTMLVideoElement = document.querySelector(
        ".edge-player-content-element"
      ),
      show = document.querySelector(".header h3 a").textContent,
      epTitle = document.querySelector(".sub-header h1").textContent;
    let epNumber: string | Element | HTMLElement =
      document.querySelector(".meta span");
    epNumber &&= `${(epNumber as HTMLElement).textContent
      .replace("Season ", "S")
      .replace(" Ep ", ":E")} `;
    epNumber ??= "";

    [data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
      Math.floor(player.currentTime),
      Math.floor(player.duration)
    );

    data.details = show;
    data.state = epNumber + epTitle;
    data.smallImageKey = player.paused ? "pause" : "play";
    data.smallImageText = player.paused
      ? (await strings).pause
      : (await strings).play;

    if (player.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    data.details = "Browsing...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  }
});
