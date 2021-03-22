interface LangStrings {
  buttonJoinGame: string;
  joiningGame: string;
  waiting: string;
  gameStarting: string;
  playing: string;
  questionLoading: string;
  incorrectAnswer: string;
  correctAnswer: string;
  resultsQuestion: string;
  slideViewing: string;
  gameOver: string;
  gameCreate: string;
  loadingPage: string;
  firstPlace: string;
  points: string;
  questionsCorrect: string;
  slideShowing: string;
  questionShowing: string;
  stString: string;
  ndString: string;
  rdString: string;
  topX: string;
  of: string;
  questionNumber: string;
}

async function findRanking(rankingSelector: HTMLElement) {
  const stString = (await strings).stString,
    ndString = (await strings).ndString,
    rdString = (await strings).rdString,
    topX = (await strings).topX;

  if (
    rankingSelector.textContent == stString ||
    rankingSelector.textContent == ndString ||
    rankingSelector.textContent == rdString ||
    rankingSelector.textContent == topX
  )
    return true;
  else return false;
}

const presence = new Presence({
    clientId: "612793327510749210"
  }),
  getStrings = async (): Promise<LangStrings> => {
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
      await presence.getSetting("lang")
    );
  };

let currentQuestion: string,
  score: string,
  ranking: string,
  top5: Promise<boolean>,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null,
  rankingSelector: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "kahoot"
    },
    buttons = await presence.getSetting("buttons"),
    newLang = await presence.getSetting("lang");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.href.match("https://kahoot.it")) {
    const path = document.location.pathname;

    if (path == "/" || path.includes("/join") || path == "/v2/") {
      presenceData.details = (await strings).joiningGame; // Joining Game...
    } else if (path.includes("/instructions")) {
      presenceData.details = (await strings).waiting; // Waiting to Start...
    } else if (path.includes("/start")) {
      presenceData.details = (await strings).gameStarting; // Game Starting!
    } else if (path.includes("/gameblock")) {
      currentQuestion = document.querySelector(
        "div.top-bar__QuestionNumber-sc-186o9v8-2"
      ).textContent;
      score = document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
        .textContent
        ? document.querySelector("div.bottom-bar__Score-sc-1bibjvm-2")
            .textContent
        : document.querySelector("div.podium-bottom-bar__Score-ssrx8z-1")
            .textContent;
      presenceData.details = (await strings).playing; // Playing:
      presenceData.state = `${(await strings).questionNumber.replace(
        "{0}",
        ""
      )} ${currentQuestion} | ${(await strings).points.replace(
        "{0}",
        ""
      )} ${score}`; // Question: 1 of 3 | 1000 points
    } else if (path.includes("/getready")) {
      currentQuestion = document.querySelector(
        "div.top-bar__QuestionNumber-sc-186o9v8-2"
      ).textContent;
      presenceData.details = (await strings).questionLoading; // Loading Question:
      presenceData.state = `${(await strings).questionNumber.replace(
        "{0}",
        ""
      )} ${currentQuestion}`; // Question: 1 of 3
    } else if (path.includes("/result")) {
      const result = document
        .querySelector("div.styles__MessageBody-sc-15a2o5w-4")
        .children[0].className.includes("Incorrect")
        ? (await strings).incorrectAnswer // Incorrect Answer
        : (await strings).correctAnswer; // Correct Answer
      presenceData.details = (await strings).resultsQuestion; // Looking at Results:
      presenceData.state = result;
    } else if (path.includes("/contentblock")) {
      presenceData.details = (await strings).slideViewing; // Looking at Slide with Content:
    } else if (path.includes("/ranking")) {
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
        ? `${(await strings).gameOver} | ${ranking} | ${(
            await strings
          ).points.replace("{0}", "")} ${score}` // Game Over | 1st, 2nd, 3rd, Top 5 |  Points:
        : `${(await strings).gameOver} | ${(await strings).points.replace(
            "{0}",
            ""
          )} ${score}`; // Game Over | Points:
    } else {
      presenceData.details = (await strings).loadingPage;
    }
    presence.setActivity(presenceData);
  } else if (document.location.href.match("https://play.kahoot.it")) {
    const path = document.location.pathname;
    if (path == "/v2/") {
      presenceData.details = (await strings).gameCreate; // Creating a Game...
    } else if (path.includes("/lobby")) {
      presenceData.details = (await strings).waiting; // Waiting to Start...

      if (buttons) {
        presenceData.buttons = [
          {
            label: `${(await strings).buttonJoinGame.replace(
              "{0}",
              document.querySelector(
                "div.headerstyles__GamePinGrouped-jk6b9n-9"
              ).textContent
            )}`, // Join Game: ID
            url: `https://kahoot.it/`
          }
        ];
      }
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
      presenceData.details = `${(await strings).firstPlace.replace(
        "{0}",
        ""
      )} ${firstPlaceName} | ${(await strings).points.replace(
        "{0}",
        ""
      )} ${firstPlacePoints}`; // First Place: User | Points: 100000
      presenceData.state = `${(await strings).questionsCorrect.replace(
        "{0}",
        ""
      )} ${firstPlaceQuetions}`; // Questions Correct: 1 of 10
    } else if (path.includes("/contentblock")) {
      presenceData.details = (await strings).slideShowing; // Showing a Slide with Content:
      const questionNo = `${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[0]
      } ${(await strings).of.replace("{0}", "").replace("{1}", "")} ${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[1]
      }`;
      presenceData.state = `${(await strings).questionNumber.replace(
        "{0}",
        ""
      )} ${questionNo}`; // Question: 1 of 3
    } else if (path.includes("/gameblock")) {
      presenceData.details = (await strings).questionShowing; // Showing Question:
      const questionNo = `${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[0]
      } ${(await strings).of.replace("{0}", "").replace("{1}", "")} ${
        document
          .querySelector("div.styles__QuestionCount-sc-17ic93d-8")
          .textContent.split("/")[1]
      }`;
      presenceData.state = `${(await strings).questionNumber.replace(
        "{0}",
        ""
      )} ${questionNo}`; // Question: 1 of 3
    } else {
      presenceData.details = (await strings).loadingPage; // Loading Page:
    }
    presence.setActivity(presenceData);
  }
});
