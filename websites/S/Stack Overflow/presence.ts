const presence = new Presence({
    clientId: "610123745033584651"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title: HTMLAnchorElement,
  pageNumber: HTMLElement,
  jobPageNumber: HTMLAnchorElement,
  usersortagsPageNumber: HTMLElement,
  allPages: NodeListOf<HTMLAnchorElement>,
  lastPage: string,
  jobLastPage: NodeListOf<HTMLAnchorElement>,
  questionsLastPage: NodeListOf<HTMLAnchorElement>;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    details: "Unknown page",
    largeImageKey: "lg"
  };

  title = document.querySelector("div#question-header h1 a");

  pageNumber = document.querySelector("div.pager.fl span.page-numbers.current");

  usersortagsPageNumber = document.querySelector(
    "div.pager.fr span.page-numbers.current"
  );

  jobPageNumber = document.querySelector(
    "div:nth-child(1) > div > a.job-link.selected"
  );

  allPages = document.querySelectorAll("div.pager.fr a");

  jobLastPage = document.querySelectorAll("div.pagination a");

  questionsLastPage = document.querySelectorAll("div.pager.fl a");

  if (
    document.location.pathname.includes("/users") ||
    document.location.pathname.includes("/tags")
  )
    lastPage = allPages[allPages.length - 2].innerText;
  else if (document.location.pathname.includes("/jobs"))
    lastPage = jobLastPage[jobLastPage.length - 2].innerText;
  else if (document.location.pathname === "/questions")
    lastPage = questionsLastPage[questionsLastPage.length - 2].innerText;

  if (title && document.location.pathname.includes("/questions/")) {
    presenceData.details = "Reading a question.";

    presenceData.state = title.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else {
    if (document.location.pathname === "/") {
      presenceData.state = "Main Page | Home";

      presenceData.startTimestamp = browsingStamp;

      delete presenceData.details;
    } else if (
      document.location.pathname === "/questions" &&
      pageNumber.innerText.length > 0
    ) {
      const lastPageNumber: number = +lastPage,
        lastquestionsPageNumber: number = +pageNumber.innerText;

      if (lastquestionsPageNumber > lastPageNumber) {
        presence.info(`${lastPageNumber} --- ${lastquestionsPageNumber}`);

        lastPage = pageNumber.innerText;
      }

      presenceData.details = "Browsing all the questions.";

      presenceData.state = `Current page: ${pageNumber.innerText}/${lastPage}`;

      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname === "/jobs") {
      const lastPageNumber: number = +lastPage,
        lastjobPageNumber: number = +jobPageNumber.innerText;

      if (lastjobPageNumber > lastPageNumber) {
        presence.info(`${lastPageNumber} --- ${lastjobPageNumber}`);

        lastPage = jobPageNumber.innerText;
      }

      presenceData.details = "Browsing jobs.";

      presenceData.state = `Current page: ${jobPageNumber.innerText}/${lastPage}`;

      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname === "/users") {
      const lastPageNumber: number = +lastPage,
        lastusersortagsPageNumber: number = +usersortagsPageNumber.innerText;

      if (lastusersortagsPageNumber > lastPageNumber) {
        presence.info(`${lastPageNumber} --- ${lastusersortagsPageNumber}`);

        lastPage = usersortagsPageNumber.innerText;
      }

      presenceData.details = "Browsing users.";

      presenceData.state = `Current page: ${usersortagsPageNumber.innerText}/${lastPage}`;

      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname === "/tags") {
      const lastPageNumber: number = +lastPage,
        lastusersortagsPageNumber: number = +usersortagsPageNumber.innerText;

      if (lastusersortagsPageNumber > lastPageNumber) {
        presence.info(`${lastPageNumber} --- ${lastusersortagsPageNumber}`);

        lastPage = usersortagsPageNumber.innerText;
      }

      presenceData.details = "Browsing tags.";

      presenceData.state = `Current page: ${usersortagsPageNumber.innerText}/${lastPage}`;

      presenceData.startTimestamp = browsingStamp;
    }
  }

  presence.setActivity(presenceData);
});
