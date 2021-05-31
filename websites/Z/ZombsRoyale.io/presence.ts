const presence = new Presence({
  clientId: "845354103118364672"
});

let matchStart: number = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    currentGameState = await getPageletiable("game.currentGameState");

  if (currentGameState === "loading" || currentGameState === "UiLoadingOverlay")
    presenceData.details = "Loading...";
  else if (currentGameState === "MainMenu")
    presenceData.details = "Lurking in main menu";
  else if (
    currentGameState === "Cosmetics" ||
    currentGameState === "UiCosmeticSelectorOverlay"
  )
    presenceData.details = "Viewing cosmetics";
  else if (currentGameState === "Profile")
    presenceData.details = "Viewing their profile";
  else if (
    currentGameState === "Shop" ||
    currentGameState === "UiPreviewPackOverlay"
  )
    presenceData.details = "Browsing Shop";
  else if (
    currentGameState === "Friends" ||
    currentGameState === "UiFriendAddOverlay"
  )
    presenceData.details = "Viewing their friends";
  else if (currentGameState === "Leaderboards")
    presenceData.details = "Browsing leaderboards";
  else if (currentGameState === "UiLoginOverlay")
    presenceData.details = "Loging in";
  else if (currentGameState === "UiSettingsOverlay")
    presenceData.details = "Changing settings";
  else if (currentGameState === "UiSeasonPurchaseOverlay")
    presenceData.details = "Buying a Battle Pass";
  else if (
    currentGameState.startsWith("UiSeason") ||
    currentGameState === "UiPreviewItemOverlay"
  )
    presenceData.details = "Viewing Battle Pass";
  else if (currentGameState === "UiChallengesOverlay")
    presenceData.details = "Viewing challenges";
  else if (currentGameState === "UiBuyGemsOverlay")
    presenceData.details = "Buying gems";
  else if (currentGameState === "VideoAd")
    presenceData.details = "Watching video ad";
  else if (currentGameState === "Countdown" || currentGameState === "Lobby") {
    presenceData.details = "In Lobby";
    presenceData.state = "Waiting for game to start";
  } else if (
    currentGameState === "Game" ||
    currentGameState === "UiReportPlayerOverlay" ||
    currentGameState === "UiLeaveOverlay"
  ) {
    presenceData.details = "In Game";
  } else if (currentGameState === "Plane") {
    presenceData.details = "In Game";
    presenceData.state = "Flying plane";
  } else if (currentGameState === "Parachute") {
    presenceData.details = "In Game";
    presenceData.state = "Parachuting";
  } else if (
    currentGameState === "Dead" ||
    currentGameState === "UiGameOver" ||
    currentGameState === "UiSpectator" ||
    currentGameState === "UiFeedbackOverlay"
  ) {
    presenceData.details = "In Game";
    presenceData.state = "Dead";
  } else if (currentGameState === "UiMapOverlay") {
    presenceData.details = "In Game";
    presenceData.state = "Viewing map";
  } else presence.error("Unknown state: " + currentGameState);

  const playing =
    presenceData.details === "In Game" || presenceData.details === "In Lobby";

  if (playing && matchStart === null) {
    matchStart = Math.floor(Date.now() / 1000);
  } else if (!playing && matchStart !== null) {
    matchStart = null;
  }

  presenceData.startTimestamp = matchStart;

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

// Stolen from https://github.com/PreMiD/Presences/blob/master/websites/R/Rythm/presence.ts#L461
function getPageletiable(js: string): Promise<string> {
  const eventName = "PreMiD_ZombsRoyale_Pageletiable";

  return new Promise<string>((resolve) => {
    const script = document.createElement("script"),
      _listener = (data: CustomEvent) => {
        script.remove();
        resolve(JSON.parse(data.detail));
        window.removeEventListener(eventName, _listener, true);
      };

    window.addEventListener(eventName, _listener);
    script.id = eventName;
    script.appendChild(
      document.createTextNode(`
     var pmdPL = new CustomEvent("${eventName}", {detail: JSON.stringify(${js})});
     window.dispatchEvent(pmdPL);
     `)
    );

    (document.body || document.head || document.documentElement).appendChild(
      script
    );
  });
}
