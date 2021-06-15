const presence = new Presence({
    clientId: "854128240078356480"
  });
  
  presence.on("UpdateData", () => {
    const spins = document.querySelector("#spin").textContent.split("Jump to")[0].trim();
    const browsingStamp = Math.floor(Date.now() / 1000);
    const presenceData: PresenceData = {
      largeImageKey: "dogspinthumbnail",
      startTimestamp: browsingStamp,
      details: "Watching the chihuahua spin!",
      state: `${spins}`,
      buttons: [{label: "Website", url: "http://chihuahuaspin.com/"}]
    };
    presence.setActivity(presenceData);
  });