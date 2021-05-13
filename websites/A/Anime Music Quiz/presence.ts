const presence = new Presence({
  clientId: "691494438349832227"
});

let lobbyNumber;
let lobbyName;
let timeRemainingBR;
let totalRoundNumber;
let actualRoundNumber;
let animeName;
let timeRemaining;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "amq"
  };
  if (!navigator.language.includes("it-IT")) {
    // English
    if (document.location.pathname == "/") {
      if (document.querySelector("#gameChatPage") != null) {
        if (
          document.querySelector("#roomBrowserPage").className !=
          "gamePage text-center hidden"
        ) {
          lobbyNumber = document.querySelector("#rbTotalGameCount").textContent;
          data.smallImageKey = "lobby";
          data.smallImageText = "Rooms count: " + lobbyNumber;
          data.details = "Browsing the game rooms";
          presence.setActivity(data);
        } else if (
          document.querySelector("#gameChatPage").className == "gamePage"
        ) {
          if (document.querySelector("#lobbyPage").className == "text-center") {
            lobbyName = document.querySelector("#lobbyRoomName").textContent;
            data.smallImageKey = "room";
            data.smallImageText = "Room: " + lobbyName;
            data.details = "In the room:";
            data.state = lobbyName;
            presence.setActivity(data);
          } else {
            if (
              document.querySelector("#battleRoyalPage").className ==
              "text-center"
            ) {
              timeRemainingBR =
                document.querySelector("#brTimeLeft").textContent;
              data.smallImageKey = "btr";
              data.smallImageText = "Time remaining: " + timeRemainingBR;
              data.details = "Choosing songs for";
              data.state = "battle royale mode";
              presence.setActivity(data);
            } else {
              totalRoundNumber = document
                .querySelector("#qpCounter")
                .textContent.replace("/", " of ");
              actualRoundNumber = document
                .querySelector("#qpCounter")
                .textContent.split("/")[0]
                .trim();
              if (
                document.querySelector("#qpAnimeNameHider").className ==
                "center-text qpAnimeNameContainer hide"
              ) {
                animeName = document.querySelector("#qpAnimeName").textContent;
                data.smallImageKey = "headset";
                data.smallImageText = "Song from: " + animeName;
                data.details = "Round " + actualRoundNumber + " ended";
                data.state = "Song from: " + animeName;
                presence.setActivity(data);
              } else {
                if (
                  document
                    .querySelector("#qpHiderText")
                    .textContent.startsWith("Loading")
                ) {
                  data.smallImageKey = "gamepad";
                  data.smallImageText = "Loading...";
                  data.details = "The game is beginning";
                  data.state = "Loading...";
                  presence.setActivity(data);
                } else if (
                  document.querySelector("#qpHiderText").textContent ==
                  "Answers"
                ) {
                  data.smallImageKey = "gamepad";
                  data.smallImageText = "Waiting for the results...";
                  data.details = "Round " + actualRoundNumber + " ended";
                  data.state = "Waiting for the results...";
                  presence.setActivity(data);
                } else {
                  timeRemaining =
                    document.querySelector("#qpHiderText").textContent;
                  data.smallImageKey = "gamepad";
                  data.smallImageText =
                    "Round: " +
                    actualRoundNumber +
                    "｜Countdown: " +
                    timeRemaining;
                  data.details = "Round: " + totalRoundNumber;
                  data.state = "Time remaining: " + timeRemaining;
                  presence.setActivity(data);
                }
              }
            }
          }
        } else {
          data.smallImageKey = "menu";
          data.smallImageText = "In the menu...";
          data.details = "In the menu...";
          presence.setActivity(data);
        }
      } else {
        data.smallImageKey = "menu";
        data.smallImageText = "In the homepage...";
        data.details = "In the homepage...";
        presence.setActivity(data);
      }
    } else if (document.location.pathname.startsWith("/legal/tos")) {
      data.smallImageKey = "info";
      data.smallImageText = "Terms of Service";
      data.details = "Reading the terms of";
      data.state = "service";
      presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/legal/privacy")) {
      data.smallImageKey = "info";
      data.smallImageText = "Privacy Police";
      data.details = "Reading the privacy";
      data.state = "police";
      presence.setActivity(data);
    } else {
      data.smallImageKey = "search";
      data.smallImageText = "Browsing...";
      data.details = "Browsing...";
      presence.setActivity(data);
    }
  } else {
    // Italian
    if (document.location.pathname == "/") {
      if (document.querySelector("#gameChatPage") != null) {
        if (
          document.querySelector("#roomBrowserPage").className !=
          "gamePage text-center hidden"
        ) {
          lobbyNumber = document.querySelector("#rbTotalGameCount").textContent;
          data.smallImageKey = "lobby";
          data.smallImageText = "Numero stanze: " + lobbyNumber;
          data.details = "Naviga tra le stanze";
          data.state = "di gioco";
          presence.setActivity(data);
        } else if (
          document.querySelector("#gameChatPage").className == "gamePage"
        ) {
          if (document.querySelector("#lobbyPage").className == "text-center") {
            lobbyName = document.querySelector("#lobbyRoomName").textContent;
            data.smallImageKey = "room";
            data.smallImageText = "Stanza: " + lobbyName;
            data.details = "Nella stanza:";
            data.state = lobbyName;
            presence.setActivity(data);
          } else {
            if (
              document.querySelector("#battleRoyalPage").className ==
              "text-center"
            ) {
              timeRemainingBR =
                document.querySelector("#brTimeLeft").textContent;
              data.smallImageKey = "btr";
              data.smallImageText = "Tempo rimanente: " + timeRemainingBR;
              data.details = "Sceglie le canzoni per";
              data.state = "la battle royale";
              presence.setActivity(data);
            } else {
              totalRoundNumber = document
                .querySelector("#qpCounter")
                .textContent.replace("/", " di ");
              actualRoundNumber = document
                .querySelector("#qpCounter")
                .textContent.split("/")[0]
                .trim();
              if (
                document.querySelector("#qpAnimeNameHider").className ==
                "center-text qpAnimeNameContainer hide"
              ) {
                animeName = document.querySelector("#qpAnimeName").textContent;
                data.smallImageKey = "headset";
                data.smallImageText = "Canzone da: " + animeName;
                data.details = "Round " + actualRoundNumber + " terminato";
                data.state = "Canzone da: " + animeName;
                presence.setActivity(data);
              } else {
                if (
                  document
                    .querySelector("#qpHiderText")
                    .textContent.startsWith("Loading")
                ) {
                  data.smallImageKey = "gamepad";
                  data.smallImageText = "Caricamento...";
                  data.details = "La partita sta per iniziare";
                  data.state = "Caricamento...";
                  presence.setActivity(data);
                } else if (
                  document.querySelector("#qpHiderText").textContent ==
                  "Answers"
                ) {
                  data.smallImageKey = "gamepad";
                  data.smallImageText = "Aspettando i risultati...";
                  data.details = "Round " + actualRoundNumber + " terminato";
                  data.state = "Aspettando i risultati...";
                  presence.setActivity(data);
                } else {
                  timeRemaining =
                    document.querySelector("#qpHiderText").textContent;
                  data.smallImageKey = "gamepad";
                  data.smallImageText =
                    "Round: " +
                    actualRoundNumber +
                    "｜Tempo rimanente: " +
                    timeRemaining;
                  data.details = "Round: " + totalRoundNumber;
                  data.state = "Tempo rimanente: " + timeRemaining;
                  presence.setActivity(data);
                }
              }
            }
          }
        } else {
          data.smallImageKey = "menu";
          data.smallImageText = "Nel menù...";
          data.details = "Nel menù...";
          presence.setActivity(data);
        }
      } else {
        data.smallImageKey = "menu";
        data.smallImageText = "Nella homepage...";
        data.details = "Nella homepage";
        presence.setActivity(data);
      }
    } else if (document.location.pathname.startsWith("/legal/tos")) {
      data.smallImageKey = "info";
      data.smallImageText = "Termini di Servizio";
      data.details = "Legge i termini";
      data.state = "di servizio";
      presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/legal/privacy")) {
      data.smallImageKey = "info";
      data.smallImageText = "Politica della Privacy";
      data.details = "Legge la politica della";
      data.state = "privacy";
      presence.setActivity(data);
    } else {
      data.smallImageKey = "search";
      data.smallImageText = "Navigando...";
      data.details = "Navigando...";
      presence.setActivity(data);
    }
  }
});
