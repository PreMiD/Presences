const presence = new Presence({
    clientId: "849684658563055627"
  }),
  logRegex = /^.+ - \w+$/,
  generalStartTime = Math.floor(Date.now() / 1000);
let lobbyStartTime: number, gameStartTime: number;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: generalStartTime
  };

  if (
    document.querySelector(".my-table") ||
    document.querySelector(".score-page")
  ) {
    if (lobbyStartTime === 0) lobbyStartTime = Math.floor(Date.now() / 1000);
    gameStartTime = 0;

    const isHost =
        document.querySelector(".rules-editor") !== null ||
        document.querySelector('button[ng-click="$ctrl.editTable()"]') !== null,
      members = document
        .querySelector(".participant-list-label")
        .textContent.trim();

    presenceData.details = `In Lobby: ${members}`;
    presenceData.state = isHost ? "Host" : null;
    presenceData.startTimestamp = lobbyStartTime;
  } else if (document.querySelector(".game-page")) {
    if (gameStartTime === 0) gameStartTime = Math.floor(Date.now() / 1000);
    lobbyStartTime = 0;

    const membersCount = document.querySelectorAll(".spec-list-line").length,
      logs = document.querySelectorAll(".actual-log");

    // Find last turn log from end
    for (let i = logs.length - 1; i >= 0; i--) {
      if (!logs[i]) continue;

      const logText = logs[i].textContent.trim();

      // Append turn
      if (logRegex.test(logText)) {
        presenceData.state = logText;
        break;
      }
    }

    presenceData.details = `In Game (${membersCount} Players)`;
    presenceData.startTimestamp = gameStartTime;
  } else if (
    document.querySelector(".login-page") ||
    document.querySelector(".lobby-page")
  ) {
    gameStartTime = lobbyStartTime = 0;
    presenceData.details = "Main Menu";
  } else if (document.querySelector(".loading-spinner")) {
    gameStartTime = lobbyStartTime = 0;
    presenceData.details = "Loading...";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
