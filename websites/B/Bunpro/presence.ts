const presence: Presence = new Presence({
    clientId: "833430731816173669",
    injectOnComplete: true
  }),
  largeImageKey = "logo";

function getLevelIcon(level: number) {
  let iconKey = "level-10";

  if (level >= 10 && level < 100)
    iconKey = `level-${+(level / 100).toPrecision(1) * 100}`;

  if (level < 10) iconKey = "level-10";

  if (level >= 100) iconKey = "level-100";

  return iconKey;
}

function getLevelInHeader() {
  const levelElement: HTMLDivElement =
    document.querySelector(".navbar-user-level");

  return +levelElement.innerText.slice(6);
}

presence.on("UpdateData", () => {
  const { pathname } = window.location,
    data: PresenceData = {
      largeImageKey
    },
    level: number = getLevelInHeader();

  let details: string,
    state: string,
    smallImageText: string,
    startTimestamp: number;

  if (/grammar_points\/\d+/i.test(pathname)) {
    startTimestamp = Date.now();
    details = "Doing Lessons";

    const grammarPointElement: HTMLSpanElement = document.querySelector(
        ".grammar-point__title.grammar-point__title--default"
      ),
      grammarPoint = grammarPointElement.innerText,
      lessonProgressElement: HTMLDivElement = document.querySelector(
        ".header__lesson-progress"
      ),
      [lessonType, lessonProgress] =
        lessonProgressElement.innerText.split(": ");

    state = `Learning ${grammarPoint}`;

    smallImageText = `${lessonType}: ${lessonProgress}`;
  } else {
    switch (pathname) {
      case "/study": {
        startTimestamp = Date.now();
        details = "Doing reviews";

        const hint: HTMLDivElement = document.querySelector(
            ".study-question-english-hint"
          ),
          hintText = hint.innerText,
          SRS: HTMLDivElement = document.querySelector(
            ".review__stats.srs-tracker"
          ),
          SRSLevel = SRS.innerText,
          successRate: HTMLDivElement = document.querySelector(
            ".review__stats.review-percent"
          );

        smallImageText = successRate.innerText;

        state = hintText ? `${hintText} (${SRSLevel})` : SRSLevel;

        break;
      }
      case "/bookmarks":
      case "/lessons":
      case "/grammar_points": {
        details = "Browsing Grammar";

        break;
      }
      case "/learn": {
        startTimestamp = Date.now();

        const checkQuizzElement: HTMLDivElement = document.querySelector(
            "#learn-new-grammar-page"
          ),
          isOnQuizz = checkQuizzElement.style.display === "block";

        if (isOnQuizz) {
          details = "Learning New Grammar (Quizz)";

          const grammarPointElement: HTMLDivElement = document.querySelector(
              ".study-question-english-hint"
            ),
            grammarPoint = grammarPointElement.innerText,
            lessonProgressElement: HTMLDivElement = document.querySelector(
              ".review__stats#reviews"
            ),
            lessonProgress = lessonProgressElement.innerText;

          state = `${grammarPoint}`;

          smallImageText = `${lessonProgress}`;
        } else {
          details = "Learning New Grammar";

          let activeGrammarPoint: HTMLDivElement;

          activeGrammarPoint = document.querySelector(
            `.grammar-point-study[style*="display: block"]`
          );

          if (!activeGrammarPoint) {
            activeGrammarPoint = document.querySelector(".grammar-point-study");
          }

          const grammarPointElement: HTMLSpanElement =
              activeGrammarPoint.querySelector(
                ".grammar-point__title.grammar-point__title--default"
              ),
            grammarPoint = grammarPointElement.innerText,
            lessonProgressElement: HTMLDivElement =
              activeGrammarPoint.querySelector(".header__lesson-progress"),
            lessonProgress = lessonProgressElement.innerText,
            activeTabElement: HTMLLIElement = activeGrammarPoint.querySelector(
              ".navbar_option--active-tab"
            ),
            activeTab = activeTabElement.innerText;

          state = `${grammarPoint} | ${activeTab}`;

          smallImageText = lessonProgress;
        }

        break;
      }
      case "/cram": {
        const cramStartElement: HTMLDivElement =
          document.querySelector(".cram-start");

        if (cramStartElement.style.display !== "none") {
          details = "Browsing Grammar";
          break;
        }

        startTimestamp = Date.now();
        details = "Doing Cram";

        const grammarPointElement: HTMLDivElement = document.querySelector(
            ".study-question-english-hint"
          ),
          grammarPoint = grammarPointElement.innerText,
          lessonProgressElement: HTMLDivElement = document.querySelector(
            ".review__stats#reviews"
          ),
          lessonType = lessonProgressElement.innerText;

        state = `Reviewing ${grammarPoint}`;

        smallImageText = `${lessonType}`;

        break;
      }
      case "/":
      case "/dashboard":
      case "/login":
      default: {
        const reviews: HTMLDivElement = document.querySelector(
          "#user-dashboard > div:nth-child(1) > div.col-lg-7.col-md-12.height-100.d-flex.flex-column.flex-grow-2.pl-0.pr-xl-3.pr-0 > div:nth-child(1) > div.col-md-6.col-12.pl-md-1.pr-md-0.pr-0.pl-0 > div > div:nth-child(3)"
        );

        if (reviews) {
          const reviewsCount: string = reviews.innerText;

          details = "Viewing Dashboard";
          state = `${reviewsCount} reviews`;
        } else {
          details = "Browsing Pages";
        }

        break;
      }
    }
  }

  data.details = details;

  if (state) data.state = state;

  if (level) {
    data.smallImageKey = getLevelIcon(level);

    if (!smallImageText) smallImageText = `Level ${level}`;
  }
  if (smallImageText) data.smallImageText = smallImageText;

  if (startTimestamp) data.startTimestamp = Math.round(startTimestamp / 1000);

  presence.setActivity(data);
});
