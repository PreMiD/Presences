const presence = new Presence({
  clientId: "714628886222209105"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let chapter, titlePage, title;
let subject;
const path = document.location.pathname;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  function subjectCondition(subject: string): string {
    title = document.querySelector(
      "body > header.TitleHeader_header.TitleHeader_header--studyGuide > div > div > h1"
    );
    if (path == "/" + subject + "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing " + subject.replace(/-/gi, " ");
    } else if (title) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = title.textContent;
      chapter = document.querySelector(
        "body > header.interior-header > div > div.interior-header__title > div"
      );
      if (chapter) {
        presenceData.state = chapter.textContent;
      }
    }
    return;
  }
  title = document.querySelector(
    "body > header.TitleHeader_header.TitleHeader_header--studyGuide > div > div > h1"
  );
  if (path == "/") {
    presenceData.details = "Viewing Home";
    presenceData.startTimestamp = browsingStamp;
  } else if (path == "/shakespeare/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Shakespheare Literature";
  } else if (path == "/lit/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing All Literature";
  } else if (path.includes("/blog/")) {
    title = document.querySelector("head > title");
    if (title) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing: ";
      presenceData.state = title.textContent.replace(
        " | The SparkNotes Blog",
        ""
      );
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Blog";
    }
  } else if (path.includes("/writinghelp/")) {
    title = document.querySelector(
      "body > header.titleHeader--howTo > div > h1"
    );
    if (title) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    }
  } else if (path == "/othersubjects/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Other Subjects";
  } else if (path == "/math/") {
    subjectCondition("math");
  } else if (path == "/biology/") {
    subjectCondition("biology");
  } else if (path == "/american-government/") {
    subjectCondition("american-government");
  } else if (path == "/sociology/") {
    subjectCondition("sociology");
  } else if (path == "/poetry/") {
    subjectCondition("poetry");
  } else if (path == "/drama/") {
    subjectCondition("drama");
  } else if (path == "/cs/") {
    subject = "cs";
    title = document.querySelector(
      "body > header.TitleHeader_header.TitleHeader_header--studyGuide > div > div > h1"
    );
    if (path == "/" + subject + "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Computer Science";
    } else if (title) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = title.textContent;
      chapter = document.querySelector(
        "body > header.interior-header > div > div.interior-header__title > div"
      );
      if (chapter) {
        presenceData.state = chapter.textContent;
      }
    }
  } else if (path == "/health/") {
    subjectCondition("health");
  } else if (path == "/physics/") {
    subjectCondition("physics");
  } else if (path == "/biography/") {
    subjectCondition("biography");
  } else if (path == "/economics/") {
    subjectCondition("economics");
  } else if (path == "/history/") {
    subjectCondition("history");
  } else if (path == "/philosophy/") {
    subjectCondition("philosophy");
  } else if (path == "/psychology/") {
    subjectCondition("psychology");
  } else if (path == "/us-government-and-politics/") {
    subjectCondition("us-government-and-politics");
  } else if (path == "/search") {
    title = (
      document.querySelector("#results-search-input") as HTMLInputElement
    ).value;
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching:";
    presenceData.state = title;
  } else if (title) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing: " + title.textContent;
    chapter = document.querySelector("#section > h3:nth-child(2)");
    titlePage = document.querySelector(
      "body > header.interior-header > div > div.interior-header__title > div > span.interior-header__title__pagetitle"
    );
    if (chapter) {
      presenceData.state = chapter.textContent;
    } else if (titlePage) {
      presenceData.state = titlePage.textContent;
    } else {
      presenceData.state = "Viewing Study Guide";
    }
  } else if (
    title == null &&
    document.querySelector(
      "body > header.TitleHeader_header.TitleHeader_header--noFear > div > div > h1"
    )
  ) {
    title = document.querySelector(
      "body > header.TitleHeader_header.TitleHeader_header--noFear > div > div > h1"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing: " + title.textContent;
    titlePage = document.querySelector(
      "body > header.interior-header > div > div.interior-header__title > div"
    );
    if (titlePage) {
      presenceData.state = titlePage.textContent;
    }
  } else if (path == "/login/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Login Unavailable";
  } else if (path == "/help/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Help";
  } else {
    presenceData.details = "Unable to Read Page";
    presenceData.startTimestamp = browsingStamp;
  }
  // Used To Start The RPC
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
