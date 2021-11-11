const eldiru = new Presence({
    clientId: "798139973240225812"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let course, sub: string;

eldiru.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname === "eldiru.unsoed.ac.id") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "Viewing homepage";
    } else if (document.location.pathname.includes("/login")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "Viewing login page";
    } else if (document.location.pathname.includes("/my")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "Viewing dashboard";
    } else if (document.location.pathname.includes("/course/")) {
      presenceData.startTimestamp = browsingTimestamp;
      course = document.querySelector(
        "#page-course-view-topics > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
      ).textContent;
      presenceData.details = "Viewing course:";
      presenceData.state = course;
    } else if (document.location.pathname.includes("/mod/attendance/")) {
      presenceData.startTimestamp = browsingTimestamp;
      course = document.querySelector(
        "#page-mod-attendance-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
      ).textContent;
      if (
        document.querySelector(
          "#page-mod-attendance-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ) !== null
      ) {
        sub = document.querySelector(
          "#page-mod-attendance-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ).textContent;
        presenceData.details = `Viewing ${sub}`;
      } else presenceData.details = "Viewing attendance:";

      presenceData.state = course;
    } else if (document.location.pathname.includes("/mod/forum/")) {
      presenceData.startTimestamp = browsingTimestamp;
      course = document.querySelector(
        "#page-mod-forum-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
      ).textContent;
      if (
        document.querySelector(
          "#page-mod-forum-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ) !== null
      ) {
        sub = document.querySelector(
          "#page-mod-forum-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ).textContent;
        presenceData.details = `Viewing ${sub}`;
      } else presenceData.details = "Viewing forum:";

      presenceData.state = course;
    } else if (document.location.pathname.includes("/mod/page/")) {
      presenceData.startTimestamp = browsingTimestamp;
      course = document.querySelector(
        "#page-mod-page-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
      ).textContent;
      if (
        document.querySelector(
          "#page-mod-page-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ) !== null
      ) {
        sub = document.querySelector(
          "#page-mod-page-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ).textContent;
        presenceData.details = `Viewing ${sub}`;
      } else presenceData.details = "Viewing page:";

      presenceData.state = course;
    } else if (document.location.pathname.includes("/mod/assign/")) {
      presenceData.startTimestamp = browsingTimestamp;
      course = document.querySelector(
        "#page-mod-assign-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
      ).textContent;
      if (
        document.querySelector(
          "#page-mod-assign-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ) !== null
      ) {
        sub = document.querySelector(
          "#page-mod-assign-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ).textContent;
        presenceData.details = `Viewing ${sub}`;
      } else presenceData.details = "Viewing assignment:";

      presenceData.state = course;
    } else if (document.location.pathname.includes("/mod/quiz/")) {
      presenceData.startTimestamp = browsingTimestamp;
      course = document.querySelector(
        "#page-mod-quiz-view > div#page-wrapper > div#page > div#learningcontent > header#page-header > div.col-12 > div.card > div.card-body > div.d-flex > div.mr-auto > a > div.page-context-header > div.page-header-headings > h1"
      ).textContent;
      if (
        document.querySelector(
          "#page-mod-quiz-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ) !== null
      ) {
        sub = document.querySelector(
          "#page-mod-quiz-view > div#page-wrapper > div#page > div#learningcontent > div#page-content > div#region-main-box > section#region-main > div > h2"
        ).textContent;
        presenceData.details = `Viewing ${sub}`;
      } else presenceData.details = "Viewing quiz:";

      presenceData.state = course;
    }

    if (!presenceData.details) {
      eldiru.setTrayTitle();
      eldiru.setActivity();
    } else eldiru.setActivity(presenceData);
  }
});
