const presence = new Presence({
  clientId: "907692817604833281"
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  browsing: "presence.activity.browsing"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "protonmail",
    details: "Browsing Proton Mail",
    state: "Writing a mail...",
    startTimestamp: 1577232000,
    endTimestamp: 1577151472000 
  };

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
})