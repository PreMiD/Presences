const presence = new Presence({
    clientId: "613628090219757599"
  }),
  timeElapsed = Math.floor(Date.now() / 1000);
let otherListeners: HTMLElement,
  stationStatus,
  listeningCheck,
  onAir: HTMLElement;

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/player") {
    otherListeners = document.querySelector(
      "html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small"
    );
    if (
      document.querySelector(
        "html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing"
      ) === null
    )
      (stationStatus = "Paused on PVFM One"), (listeningCheck = "No");
    else {
      (stationStatus = `Listening on PVFM One with${otherListeners.textContent} others`),
        (listeningCheck = "Yes");
    }
    onAir = document.querySelector(
      "html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3#mane_onair.ng-binding"
    );
    if (listeningCheck === "No") {
      presence.setActivity({
        details: stationStatus,
        largeImageKey: "pvfm",
        smallImageKey: "pause"
      });
    } else {
      presence.setActivity({
        details: stationStatus,
        state: `On air: ${onAir.textContent}`,
        largeImageKey: "pvfm",
        smallImageKey: "play",
        startTimestamp: timeElapsed
      });
    }
  } else if (document.location.pathname === "/player/two") {
    otherListeners = document.querySelector(
      "html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small"
    );
    if (
      document.querySelector(
        "html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing"
      ) === null
    )
      (stationStatus = "Paused on PVFM Two"), (listeningCheck = "No");
    else {
      (stationStatus = `Listening on PVFM Two with${otherListeners.textContent} others`),
        (listeningCheck = "Yes");
    }
    onAir = document.querySelector(
      "html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3"
    );
    if (listeningCheck === "No") {
      presence.setActivity({
        details: stationStatus,
        largeImageKey: "pvfm",
        smallImageKey: "pause"
      });
    } else {
      presence.setActivity({
        details: stationStatus,
        state: `On air: ${onAir.textContent}`,
        largeImageKey: "pvfm",
        smallImageKey: "play",
        startTimestamp: timeElapsed
      });
    }
  } else if (document.location.pathname === "/player/free") {
    otherListeners = document.querySelector(
      "html > body > #playerContent > #about > div > div.col-sm-12 > h4 > small"
    );
    if (
      document.querySelector(
        "html > body > #playerContent > #about > div.row > div.col-sm-12 > div.sm2-bar-ui.textured.full-width.playing"
      ) === null
    )
      (stationStatus = "Paused on PVFM Free"), (listeningCheck = "No");
    else {
      (stationStatus = `Listening on PVFM Free with${otherListeners.textContent} others`),
        (listeningCheck = "Yes");
    }
    onAir = document.querySelector(
      "html > body > div#playerContent.content > div#about.container.ng-scope > div.row > div.col-sm-12 > h3"
    );
    if (listeningCheck === "No") {
      presence.setActivity({
        details: stationStatus,
        largeImageKey: "pvfm",
        smallImageKey: "pause"
      });
    } else {
      presence.setActivity({
        details: stationStatus,
        state: `On air: ${onAir.textContent}`,
        largeImageKey: "pvfm",
        smallImageKey: "play",
        startTimestamp: timeElapsed
      });
    }
  }
});
