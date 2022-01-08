async function findRanking(rankingSelector: HTMLElement) {
  if (
    rankingSelector.textContent === strings.stString ||
    rankingSelector.textContent === strings.ndString ||
    rankingSelector.textContent === strings.rdString ||
    rankingSelector.textContent === strings.topX
  )
    return true;
  else return false;
}

const presence = new Presence({
  clientId: "612793327510749210"
});

async function getStrings() {
  return presence.getStrings(
    {
      buttonJoinGame: "kahoot.buttonJoinGame",
      joiningGame: "kahoot.joiningGame",
      waiting: "kahoot.waiting",
      gameStarting: "kahoot.gameStarting",
      playing: "kahoot.playing",
      questionLoading: "kahoot.questionLoading",
      incorrectAnswer: "kahoot.incorrectAnswer",
      correctAnswer: "kahoot.correctAnswer",
      resultsQuestion: "kahoot.resultsQuestion",
      slideViewing: "kahoot.slideViewing",
      gameOver: "kahoot.gameOver",
      gameCreate: "kahoot.gameCreate",
      loadingPage: "kahoot.loadingPage",
      firstPlace: "kahoot.firstPlace",
      points: "kahoot.points",
      questionsCorrect: "kahoot.questionsCorrect",
      slideShowing: "kahoot.slideShowing",
      questionShowing: "kahoot.questionShowing",
      stString: "kahoot.stString",
      ndString: "kahoot.ndString",
      rdString: "kahoot.rdString",
      topX: "kahoot.topX",
      of: "kahoot.of",
      questionNumber: "kahoot.questionNumber"
    },
    await presence.getSetting<string>("lang")
  );
}

let currentQuestion: string,
  score: string,
  ranking: string,
  top5: Promise<boolean>,
  strings: { [key: string]: string },
  oldLang: string = null,
  rankingSelector: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "kahoot"
    },
    buttons = await presence.getSetting<boolean>("buttons"),
    newLang = await presence.getSetting<string>("lang");

  oldLang ??= newLang;
  strings ??= await getStrings();
  if (oldLang !== newLang) oldLang = newLang;

  if (document.location.href.match("https://kahoot.it")) {
    const path = document.location.pathname;

    if (path === "/" || path.includes("/join") || path === "/v2/")
      presenceData.details = strings.joiningGame;
    // Joining Game...
    else if (path.includes("/instructions"))
      presenceData.details = strings.waiting;
    // Waiting to Start...
    else if (path.includes("/start"))
      presenceData.details = strings.gameStarting;
    // Game Starting!
    else if (path.includes("/gameblock")) {
      currentQuestion = document.querySelector(
        "div.top-bar__QuestionNumber-sc-186o9v8-2"
      ).textContent;
      score = document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
        .textContent
        ? document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
            .textContent
        : document.querySelector("div.podium-bottom-bar__Score-ssrx8z-1")
            .textContent;
      presenceData.details = strings.playing; // Playing:
      presenceData.state = `${strings.questionNumber.replace(
        "{0}",
        ""
      )} ${currentQuestion} | ${strings.points.replace("{0}", "")} ${score}`; // Question: 1 of 3 | 1000 points
    } else if (path.includes("/getready")) {
      currentQuestion = document.querySelector(
        "div.top-bar__QuestionNumber-sc-186o9v8-2"
      ).textContent;
      presenceData.details = strings.questionLoading; // Loading Question:
      presenceData.state = `${strings.questionNumber.replace(
        "{0}",
        ""
      )} ${currentQuestion}`; // Question: 1 of 3
    } else if (path.includes("/result")) {
      presenceData.details = strings.resultsQuestion; // Looking at Results:
      presenceData.state = document
        .querySelector("div.styles__MessageBody-sc-15a2o5w-4")
        .children[0].className.includes("Incorrect")
        ? strings.incorrectAnswer
        : strings.correctAnswer;
    } else if (path.includes("/contentblock"))
      presenceData.details = strings.slideViewing;
    // Looking at Slide with Content:
    else if (path.includes("/ranking")) {
      rankingSelector = document.querySelector(
        "p.shadow-text__Text-sc-1mgpgij-1"
      );
      top5 = findRanking(rankingSelector);
      ranking = rankingSelector.textContent;
      score = document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
        .textContent
        ? document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
            .textContent
        : document.querySelector("div.podium-bottom-bar__Score-ssrx8z-1")
            .textContent;
      presenceData.details = top5
        ? `${strings.gameOver} | ${ranking} | ${strings.points.replace(
            "{0}",
            ""
          )} ${score}` // Game Over | 1st, 2nd, 3rd, Top 5 |  Points:
        : `${strings.gameOver} | ${strings.points.replace("{0}", "")} ${score}`; // Game Over | Points:
    } else presenceData.details = strings.loadingPage;

    presence.setActivity(presenceData);
  } else if (document.location.href.match("https://play.kahoot.it")) {
    const path = document.location.pathname;
    if (path === "/v2/") presenceData.details = strings.gameCreate;
    // Creating a Game...
    else if (path.includes("/lobby")) {
      presenceData.details = strings.waiting; // Waiting to Start...

      if (buttons) {
        presenceData.buttons = [
          {
            label: `${strings.buttonJoinGame.replace(
              "{0}",
              document.querySelector(
                "div.headerstyles__GamePinGrouped-jk6b9n-9"
              ).textContent
            )}`, // Join Game: ID
            url: "https://kahoot.it/"
          }
        ];
      }
    } else if (path.includes("/gameover")) {
      presenceData.details = `${strings.firstPlace.replace("{0}", "")} ${
        document.querySelector("div.player-name__PlayerName-sc-1m2ooy2-1")
          .textContent
      } | ${strings.points.replace("{0}", "")} ${
        document.querySelector("div.bar-styles__Score-ws2yhg-2").textContent
      }`; // First Place: User | Points: 100000
      presenceData.state = `${strings.questionsCorrect.replace("{0}", "")} ${
        document.querySelector("div.bar-styles__Count-ws2yhg-3").textContent
      }`; // Questions Correct: 1 of 10
    } else if (path.includes("/contentblock")) {
      presenceData.details = strings.slideShowing; // Showing a Slide with Content:
      presenceData.state = `${strings.questionNumber.replace("{0}", "")} ${`${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[0]
      } ${strings.of.replace("{0}", "").replace("{1}", "")} ${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[1]
      }`}`; // Question: 1 of 3
    } else if (path.includes("/gameblock")) {
      presenceData.details = strings.questionShowing; // Showing Question:
      presenceData.state = `${strings.questionNumber.replace("{0}", "")} ${`${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[0]
      } ${strings.of.replace("{0}", "").replace("{1}", "")} ${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[1]
      }`}`; // Question: 1 of 3
    } else presenceData.details = strings.loadingPage; // Loading Page:

    presence.setActivity(presenceData);
  }
});
