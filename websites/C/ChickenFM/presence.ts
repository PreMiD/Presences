const presence = new Presence({
    clientId: "614154889206956043"
  }),
  loadTimeStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "default",
    details: `${document.getElementById("nowPlayingArtist").innerHTML} - ${
      document.getElementById("nowPlayingTitle").innerHTML
    }`,
    state: document.getElementById("premidStationName").innerHTML,
    smallImageKey: document.getElementsByTagName("audio")[0].paused
      ? "pause"
      : "play",
    smallImageText: document.getElementsByTagName("audio")[0].paused
      ? "Paused"
      : "Playing",
    startTimestamp: loadTimeStamp
  };
  presence.setActivity(presenceData);
});
