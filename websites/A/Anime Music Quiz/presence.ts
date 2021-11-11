const presence = new Presence({
  clientId: "691494438349832227"
});

let lobbyNumber,
  lobbyName,
  timeRemainingBR,
  totalRoundNumber,
  actualRoundNumber,
  animeName,
  timeRemaining;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "amq"
  };
  if (!navigator.language.includes("it-IT")) {
    // English
    if (document.location.pathname === "/") {
      if (document.querySelector("#gameChatPage") !== null) {
        if (
          document.querySelector("#roomBrowserPage").className !==
          "gamePage text-center hidden"
        ) {
          lobbyNumber = document.querySelector("#rbTotalGameCount").textContent;
          data.smallImageKey = "lobby";
          data.smallImageText = `Rooms count: ${lobbyNumber}`;
          presenceData.details = "Browsing the game rooms";
          presence.setActivity(data);
        } else if (
          document.querySelector("#gameChatPage").className === "gamePage"
        ) {
          if (
            document.querySelector("#lobbyPage").className === "text-center"
          ) {
            lobbyName = document.querySelector("#lobbyRoomName").textContent;
            data.smallImageKey = "room";
            data.smallImageText = `Room: ${lobbyName}`;
            presenceData.details = "In the room:";
            data.state = lobbyName;
            presence.setActivity(data);
          } else if (
            document.querySelector("#battleRoyalPage").className ===
            "text-center"
          ) {
            timeRemainingBR = document.querySelector("#brTimeLeft").textContent;
            data.smallImageKey = "btr";
            data.smallImageText = `Time remaining: ${timeRemainingBR}`;
            presenceData.details = "Choosing songs for";
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
              document.querySelector("#qpAnimeNameHider").className ===
              "center-text qpAnimeNameContainer hide"
            ) {
              animeName = document.querySelector("#qpAnimeName").textContent;
              data.smallImageKey = "headset";
              data.smallImageText = `Song from: ${animeName}`;
              presenceData.details = `Round ${actualRoundNumber} ended`;
              data.state = `Song from: ${animeName}`;
              presence.setActivity(data);
            } else if (
              document
                .querySelector("#qpHiderText")
                .textContent.startsWith("Loading")
            ) {
              data.smallImageKey = "gamepad";
              data.smallImageText = "Loading...";
              presenceData.details = "The game is beginning";
              data.state = "Loading...";
              presence.setActivity(data);
            } else if (
              document.querySelector("#qpHiderText").textContent === "Answers"
            ) {
              data.smallImageKey = "gamepad";
              data.smallImageText = "Waiting for the results...";
              presenceData.details = `Round ${actualRoundNumber} ended`;
              data.state = "Waiting for the results...";
              presence.setActivity(data);
            } else {
              timeRemaining =
                document.querySelector("#qpHiderText").textContent;
              data.smallImageKey = "gamepad";
              data.smallImageText = `Round: ${actualRoundNumber}｜Countdown: ${timeRemaining}`;
              presenceData.details = `Round: ${totalRoundNumber}`;
              data.state = `Time remaining: ${timeRemaining}`;
              presence.setActivity(data);
            }
          }
        } else {
          data.smallImageKey = "menu";
          data.smallImageText = "In the menu...";
          presenceData.details = "In the menu...";
          presence.setActivity(data);
        }
      } else {
        data.smallImageKey = "menu";
        data.smallImageText = "In the homepage...";
        presenceData.details = "In the homepage...";
        presence.setActivity(data);
      }
    } else if (document.location.pathname.startsWith("/legal/tos")) {
      data.smallImageKey = "info";
      data.smallImageText = "Terms of Service";
      presenceData.details = "Reading the terms of";
      data.state = "service";
      presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/legal/privacy")) {
      data.smallImageKey = "info";
      data.smallImageText = "Privacy Police";
      presenceData.details = "Reading the privacy";
      data.state = "police";
      presence.setActivity(data);
    } else {
      data.smallImageKey = "search";
      data.smallImageText = "Browsing...";
      presenceData.details = "Browsing...";
      presence.setActivity(data);
    }
    // Italian
  } else if (document.location.pathname === "/") {
    if (document.querySelector("#gameChatPage") !== null) {
      if (
        document.querySelector("#roomBrowserPage").className !==
        "gamePage text-center hidden"
      ) {
        lobbyNumber = document.querySelector("#rbTotalGameCount").textContent;
        data.smallImageKey = "lobby";
        data.smallImageText = `Numero stanze: ${lobbyNumber}`;
        presenceData.details = "Naviga tra le stanze";
        data.state = "di gioco";
        presence.setActivity(data);
      } else if (
        document.querySelector("#gameChatPage").className === "gamePage"
      ) {
        if (document.querySelector("#lobbyPage").className === "text-center") {
          lobbyName = document.querySelector("#lobbyRoomName").textContent;
          data.smallImageKey = "room";
          data.smallImageText = `Stanza: ${lobbyName}`;
          presenceData.details = "Nella stanza:";
          data.state = lobbyName;
          presence.setActivity(data);
        } else if (
          document.querySelector("#battleRoyalPage").className === "text-center"
        ) {
          timeRemainingBR = document.querySelector("#brTimeLeft").textContent;
          data.smallImageKey = "btr";
          data.smallImageText = `Tempo rimanente: ${timeRemainingBR}`;
          presenceData.details = "Sceglie le canzoni per";
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
            document.querySelector("#qpAnimeNameHider").className ===
            "center-text qpAnimeNameContainer hide"
          ) {
            animeName = document.querySelector("#qpAnimeName").textContent;
            data.smallImageKey = "headset";
            data.smallImageText = `Canzone da: ${animeName}`;
            presenceData.details = `Round ${actualRoundNumber} terminato`;
            data.state = `Canzone da: ${animeName}`;
            presence.setActivity(data);
          } else if (
            document
              .querySelector("#qpHiderText")
              .textContent.startsWith("Loading")
          ) {
            data.smallImageKey = "gamepad";
            data.smallImageText = "Caricamento...";
            presenceData.details = "La partita sta per iniziare";
            data.state = "Caricamento...";
            presence.setActivity(data);
          } else if (
            document.querySelector("#qpHiderText").textContent === "Answers"
          ) {
            data.smallImageKey = "gamepad";
            data.smallImageText = "Aspettando i risultati...";
            presenceData.details = `Round ${actualRoundNumber} terminato`;
            data.state = "Aspettando i risultati...";
            presence.setActivity(data);
          } else {
            timeRemaining = document.querySelector("#qpHiderText").textContent;
            data.smallImageKey = "gamepad";
            data.smallImageText = `Round: ${actualRoundNumber}｜Tempo rimanente: ${timeRemaining}`;
            presenceData.details = `Round: ${totalRoundNumber}`;
            data.state = `Tempo rimanente: ${timeRemaining}`;
            presence.setActivity(data);
          }
        }
      } else {
        data.smallImageKey = "menu";
        data.smallImageText = "Nel menù...";
        presenceData.details = "Nel menù...";
        presence.setActivity(data);
      }
    } else {
      data.smallImageKey = "menu";
      data.smallImageText = "Nella homepage...";
      presenceData.details = "Nella homepage";
      presence.setActivity(data);
    }
  } else if (document.location.pathname.startsWith("/legal/tos")) {
    data.smallImageKey = "info";
    data.smallImageText = "Termini di Servizio";
    presenceData.details = "Legge i termini";
    data.state = "di servizio";
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/legal/privacy")) {
    data.smallImageKey = "info";
    data.smallImageText = "Politica della Privacy";
    presenceData.details = "Legge la politica della";
    data.state = "privacy";
    presence.setActivity(data);
  } else {
    data.smallImageKey = "search";
    data.smallImageText = "Navigando...";
    presenceData.details = "Navigando...";
    presence.setActivity(data);
  }
});
