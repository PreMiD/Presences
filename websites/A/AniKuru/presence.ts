const presence = new Presence({
  clientId: "841277040732930049"
	

presence.on("UpdateData", async () => {
    const presenceData = {
      largeImageKey: "kurusquare",
      details: "About to watch someting"
    };
    const watchingPresenceData = {
      largeImageKey: "kurusquare"
    };
    if (document.location.pathname.includes("/anime")) {
      watchingPresenceData.details = document.querySelector(".sc-kfYoZR.lpaEYv").textContent;
      watchingPresenceData.state = document.querySelector(".sc-fKgJPI.cxbltl").textContent;
      const timeValues = document.querySelector('.plyr__progress').childNodes[0];

      if (document.querySelector('.plyr__controls__item.plyr__control.plyr__control--pressed')) {
        const startTime = Date.now() / 1000;
        secsLeft = timeValues.getAttribute('aria-valuemax') - timeValues.getAttribute('aria-valuenow');
        const endTime = startTime + secsLeft;
        watchingPresenceData.endTimestamp = endTime;
        watchingPresenceData.smallImageKey = "playing";
        watchingPresenceData.smallImageText = "Playing";
    } else {
        watchingPresenceData.smallImageKey = "paused";
        watchingPresenceData.smallImageText = "Paused";
      }
  presence.setActivity(watchingPresenceData);
  } else {
    presence.setActivity(presenceData);
    }
  });
