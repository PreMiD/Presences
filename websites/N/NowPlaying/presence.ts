var presence = new Presence({
    clientId: "744332419104243712"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  var presenceData: presenceData = {
    largeImageKey: "logo-gradient-norounded",
    smallImageText: "Some hover text",
    details: document.getElementById('name').textContent,
    state: document.getElementById('artists').textContent,
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});