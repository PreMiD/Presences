const presence = new Presence({
    clientId: "844107169205190686"
  }),
  strings = presence.getStrings({
    live: "presence.activity.live"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: elapsed
  };
  if (
    document.querySelector("svg.audioplayer-controls__icon--play")
      ? false
      : true
  ) {
    (presenceData.details = document.querySelector(
      ".audioplayer-nowplaying__track"
    ).textContent),
      (data.state = document.querySelector(
        ".audioplayer-nowplaying__artist"
      ).textContent),
      (data.smallImageKey = "live"),
      (data.smallImageText = (await strings).live);
    presence.setActivity(data);
  } else presence.clearActivity();
});
