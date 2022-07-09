const presence = new Presence({
    clientId: "995303983264567346"
    }),
    browsingTimestamp = Math.floor(Date.now() / 1000),
    
    strings = presence.getStrings({
      play: "presence.playback.playing",
      pause: "presence.playback.paused"
    });

  
  presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "key",   
      startTimestamp: browsingTimestamp,
    };

      presenceData.details = "Editing a webhook.";
    if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
  });