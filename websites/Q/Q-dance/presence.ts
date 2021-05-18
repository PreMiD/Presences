var presence = new Presence({
    clientId: "844107169205190686"
  }),
  strings = presence.getStrings({
    live: "presence.activity.live"
  });

var elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };

  var radioCheck = document.querySelector(
    "svg.audioplayer-controls__icon--play"
  )
    ? false
    : true;
  if (radioCheck) {
    var song = document.querySelector(
      ".audioplayer-nowplaying__track"
    ).textContent;
    var artist = document.querySelector(
      ".audioplayer-nowplaying__artist"
    ).textContent;
    (data.details = song),
      (data.state = artist),
      (data.smallImageKey = "live"),
      (data.smallImageText = (await strings).live);
    if (elapsed === null) {
      elapsed = Math.floor(Date.now() / 1000);
    }
    data.startTimestamp = elapsed;
    presence.setActivity(data);
  } else {
    elapsed = null;
    presence.clearActivity();
  }
});
