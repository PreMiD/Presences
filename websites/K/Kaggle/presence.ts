const presence = new Presence({
		clientId: "938966985994289172"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Viewing an unsupported page",
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		page = document.location.pathname,
		[time, buttons, images] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("images")
		]);

	if (page === "/") presenceData.details = "Browsing home page";
	else if (page.endsWith("/datasets")) presenceData.details = "Browsing Datasets";
	else if (document.querySelector("#dataset-header")) {
		presenceData.details = "Reading Dataset:"
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"h1.dataset-header-v2__title"
		).textContent;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"div.dataset-header-v2__top-image-container img"
		).src;
		presenceData.smallImageKey = "reading";
		presenceData.buttons = [
			{
				label: "View Dataset",
				url: document.URL
			}
		];
	} else if (
		page.endsWith("/edit") &&
		document.querySelector<HTMLInputElement>("input#notebook-title-input")
	) {
		presenceData.details = "Editing Notebook:";
		presenceData.state = document.querySelector<HTMLInputElement>(
			"input#notebook-title-input"
		).value;
	} else if (page.endsWith("/learn")) {
		presenceData.details = "Browsing Courses";
		presenceData.buttons = [
			{
				label: "View Courses",
				url: document.URL
			}
		];
	} else if (page.includes("/learn/")) {
		const progress: string = document.querySelectorAll<HTMLParagraphElement>(
				"p.sc-cxNHIi.sc-lmgQwP.kYejgE.hpRDUw"
			)[2].textContent;
		presenceData.details = "Viewing Course:";
		presenceData.state = `${document.title.replace('Learn', "")} | ${progress.includes("complete") ? progress : "0% complete"}`;
		presenceData.buttons = [
			{
				label: "View Course",
				url: document.URL
			}
		];
	} else if (
		document.querySelector(
			"div.sc-FRrlG.PPKzT span.sc-iBzEeX.sc-efHYUO.keYuAL.cFSLxQ"
		) &&
		document.querySelector(
			"div.sc-FRrlG.PPKzT span.sc-iBzEeX.sc-efHYUO.keYuAL.cFSLxQ"
		).textContent.includes("Instructor")
	) {
		presenceData.details = "Learning Lesson:"
		presenceData.state = `${document.title.replace(' | Kaggle', "")} | Tabs: ${page.includes("/data") ? 'Data' : 'Tutorial'}`;
		presenceData.smallImageKey = "reading";
		presenceData.buttons = [
			{
				label: "View Lesson",
				url: document.URL
			}
		];
	} else if (page.endsWith("/code")) presenceData.details = "Browsing Notebooks";
	else if (
		document.querySelector<HTMLDivElement>(
			"div[data-testid=notebook-detail-render-tid]"
		)
	) {
		presenceData.details = "Viewing Notebook:";
		presenceData.state = document.title.replace(' | Kaggle', "");
		presenceData.smallImageKey = "reading";
		presenceData.buttons = [
			{
				label: "View Notebook",
				url: document.URL
			}
		];
	}
	else if (page.endsWith("/discussion")) presenceData.details = "Browsing Discussions";
	else if (page.endsWith("/rankings")) presenceData.details = "Viewing Rankings";
	else if (page.endsWith("/progression")) presenceData.details = "Viewing Progression";
	else if (page.endsWith("/docs")) presenceData.details = "Viewing Documentations";
	else if (page.includes("/docs/")) {
		presenceData.details = "Reading Documentation:";
		presenceData.state = document.title.replace(' | Kaggle', "");
		presenceData.smallImageKey = "reading";
	} else if (page.endsWith("/competitions"))
		presenceData.details = "Browsing Competitions";
	else if (page.includes("/c/")) {
		presenceData.details = "Viewing Competition:";
		presenceData.state = document.title.replace(' | Kaggle', "");
		presenceData.largeImageKey = document
			.querySelector<HTMLDivElement>("div.competition-header__top-image")
			.style.backgroundImage.slice(4, -1)
			.replace(/"/g, "");
		presenceData.buttons = [
			{
				label: "View Competition",
				url: document.URL
			}
		];
		if (page.includes("/discussion/")) {
			presenceData.details = "Reading Competition Discussion:";
			presenceData.state = document.title.replace(' | Kaggle', "");
			presenceData.buttons = [
				{
					label: "View Discussion",
					url: document.URL
				}
			];
		}
	} else if (
		document.querySelector<HTMLSpanElement>(
			"span.profile__head-display-name"
		)
	) {
		presenceData.details = "Viewing profile:";
		presenceData.state =
			document.querySelector<HTMLSpanElement>(
				"span.profile__head-display-name"
			).textContent;
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>(
				"div.pageheader__avatar--profile a img"
			).src;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: document.URL
			}
		];
	} 
	

	if (!time) delete presenceData.startTimestamp;
	if (!images && presenceData.largeImageKey)
		presenceData.largeImageKey = "logo";
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
