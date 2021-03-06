const presence = new Presence({
  clientId: "612793327510749210"
});

let currentQuestion: string, score: string, ranking: string, gameId: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "kahoot"
  };

  if (document.location.href.match("https://kahoot.it")) {
    const path = document.location.pathname;

    if (path == "/" || path.includes("/join") || path == "/v2/") {
      presenceData.details = "Joining a game...";
    } else if (path.includes("/instructions")) {
      presenceData.details = "Waiting to start...";
    } else if (path.includes("/start")) {
      presenceData.details = "Game starting!";
    } else if (path.includes("/gameblock")) {
      (currentQuestion = document.querySelector(
        "div.top-bar__QuestionNumber-sc-186o9v8-2"
      ).textContent),
        (score = document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
          .textContent);
      presenceData.details = "Playing...";
      presenceData.state = `Question: ${currentQuestion} | Points: ${score}`;
    } else if (path.includes("/getready")) {
      currentQuestion = document.querySelector(
        "div.top-bar__QuestionNumber-sc-186o9v8-2"
      ).textContent;
      presenceData.details = "Next Question Loading...";
      presenceData.state = `${currentQuestion}`;
    } else if (path.includes("/result")) {
      const result = document
        .querySelector("div.styles__MessageBody-sc-15a2o5w-4")
        .children[0].className.includes("Incorrect")
        ? "Incorrect Answer"
        : "Correct Answer";
      presenceData.details = "Looking at Results of Question:";
      presenceData.state = result;
    } else if (path.includes("/contentblock")) {
      presenceData.details = "Viewing a content block";
    } else if (path.includes("/ranking")) {
      ranking = document.querySelector("p.shadow-text__Text-sc-1mgpgij-1")
        .textContent;
      score = document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
        .textContent;
      presenceData.details = `Game Over | ${ranking} | ${score}`;
    } else {
      presenceData.details = "Loading Page...";
    }
    presence.setActivity(presenceData);
  } else if (document.location.href.match("https://play.kahoot.it")) {
    const path = document.location.pathname;
    if (path == "/v2/") {
      presenceData.details = "Creating a Game...";
    } else if (path.includes("/lobby")) {
      presenceData.details = "Waiting in lobby for people to join";
      presenceData.buttons = [
        {
          label: `Join Game: ${document.querySelector("div.headerstyles__GamePinGrouped-jk6b9n-9").textContent}`,
          url: `https://kahoot.it/`
        }
      ];
    } else if (path.includes("/gameover")) {
      const firstPlaceName = document.querySelector(
          "div.player-name__PlayerName-sc-1m2ooy2-1"
        ).textContent,
        firstPlacePoints = document.querySelector(
          "div.bar-styles__Score-ws2yhg-2"
        ).textContent,
        firstPlaceQuetions = document.querySelector(
          "div.bar-styles__Count-ws2yhg-3"
        ).textContent;
      presenceData.details = `First place: ${firstPlaceName} Points: ${firstPlacePoints}`;
      presenceData.state = `Quetsions correct: ${firstPlaceQuetions}`;
    } else if (path.includes("/contentblock")) {
      presenceData.details = "Showing Content:";
      const questionNo = `${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[0]
      } of ${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[1]
      }`;
      presenceData.state = `Question: ${questionNo}`;
    } else if (path.includes("/gameblock")) {
      presenceData.details = "Showing Question:";
      const questionNo = `${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[0]
      } of ${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[1]
      }`;
      presenceData.state = `Question: ${questionNo}`;
    } else {
      presenceData.details = "Loading Page...";
    }
    presence.setActivity(presenceData);
  }
});