const presence = new Presence({
		clientId: "610123745033584651",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

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
			largeImageKey: "https://i.imgur.com/iTWct8S.png",
			startTimestamp: browsingTimestamp,
		},
		showButtons = await presence.getSetting<boolean>("buttons");

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
		lastPage = allPages[allPages.length - 2].textContent;
	else if (document.location.pathname.includes("/jobs"))
		lastPage = jobLastPage[jobLastPage.length - 2].textContent;
	else if (document.location.pathname === "/questions")
		lastPage = questionsLastPage[questionsLastPage.length - 2].textContent;

	if (title && document.location.pathname.includes("/questions/")) {
		presenceData.details = "Reading a question.";
		presenceData.state = title.textContent;
		presenceData.buttons = [
			{ label: "View Question", url: document.location.href },
		];
	} else if (document.location.pathname === "/") {
		presenceData.state = "Main Page | Home";
		delete presenceData.details;
	} else if (
		document.location.pathname === "/questions" &&
		pageNumber.textContent.length > 0
	) {
		const lastPageNumber: number = +lastPage,
			lastquestionsPageNumber: number = +pageNumber.textContent;

		if (lastquestionsPageNumber > lastPageNumber) {
			presence.info(`${lastPageNumber} --- ${lastquestionsPageNumber}`);
			lastPage = pageNumber.textContent;
		}

		presenceData.details = "Browsing all the questions.";
		presenceData.state = `Current page: ${pageNumber.textContent}/${lastPage}`;
	} else {
		switch (document.location.pathname) {
			case "/jobs": {
				const lastPageNumber: number = +lastPage,
					lastjobPageNumber: number = +jobPageNumber.textContent;

				if (lastjobPageNumber > lastPageNumber) {
					presence.info(`${lastPageNumber} --- ${lastjobPageNumber}`);

					lastPage = jobPageNumber.textContent;
				}

				presenceData.details = "Browsing jobs.";

				presenceData.state = `Current page: ${jobPageNumber.textContent}/${lastPage}`;
				break;
			}
			case "/users": {
				const lastPageNumber: number = +lastPage,
					lastusersortagsPageNumber: number =
						+usersortagsPageNumber.textContent;

				if (lastusersortagsPageNumber > lastPageNumber) {
					presence.info(`${lastPageNumber} --- ${lastusersortagsPageNumber}`);

					lastPage = usersortagsPageNumber.textContent;
				}

				presenceData.details = "Browsing users.";

				presenceData.state = `Current page: ${usersortagsPageNumber.textContent}/${lastPage}`;
				break;
			}
			case "/tags": {
				const lastPageNumber: number = +lastPage,
					lastusersortagsPageNumber: number =
						+usersortagsPageNumber.textContent;

				if (lastusersortagsPageNumber > lastPageNumber) {
					presence.info(`${lastPageNumber} --- ${lastusersortagsPageNumber}`);

					lastPage = usersortagsPageNumber.textContent;
				}

				presenceData.details = "Browsing tags.";
				presenceData.state = `Current page: ${usersortagsPageNumber.textContent}/${lastPage}`;
				break;
			}
		}
	}

	if (!showButtons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
