const presence = new Presence({
		clientId: "840489095767261194",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let title: HTMLElement, title2: HTMLElement, titleSite: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname,
		buttons = await presence.getSetting<boolean>("buttons");

	titleSite = document.querySelector(
		"#nav-container > div > div.sidebar__header.flex.flex-col > a.sidebar-header__app-link.text-color-white.text-bold.disabled-link.sidebar-header__app-link--disabled > span"
	);
	if (titleSite) presenceData.state = titleSite.textContent;
	if (page === "/") presenceData.details = "Viewing the Homepage";
	else if (page.includes("/forum")) {
		if (page.includes("/t/")) {
			title = document.querySelector("head > title");
			title2 = document.querySelector(
				"#suggested-topics > h3.suggested-topics-message > a.badge-wrapper.box > span.badge-category.clear-badge > span"
			);
			presenceData.details = "Reading Forum Post:";
			presenceData.state = title.textContent.replace(
				`- ${title2.textContent} - 000webhost forum`,
				""
			);
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Forum Post",
						url: document.location.href,
					},
				];
			}
		} else if (page.includes("/c/")) {
			title = document.querySelector("head > title");
			presenceData.details = "Browsing through Forum Category:";
			presenceData.state = title.textContent
				.replace(" topics - 000webhost forum", "")
				.replace("Latest", "");
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Forum Category",
						url: document.location.href,
					},
				];
			}
		} else presenceData.details = "Browsing Through The Forum";
	} else if (page.includes("/free-website-sign-up"))
		presenceData.details = "Signing up";
	else if (page.includes("members/website/list"))
		presenceData.details = "Viewing All Websites";
	else if (page.includes("/members/store"))
		presenceData.details = "Viewing the Store";
	else if (page.endsWith("/build") && titleSite) {
		presenceData.details = "Managing Website:";
		presenceData.state = titleSite.textContent;
	} else if (page.endsWith("/domain") && titleSite)
		presenceData.details = "Managing Domains For:";
	else if (page.endsWith("/files"))
		presenceData.details = "Managing Files For:";
	else if (page.endsWith("/database"))
		presenceData.details = "Managing Database For:";
	else if (page.endsWith("/email"))
		presenceData.details = "Managing Email For:";
	else if (page.endsWith("/settings"))
		presenceData.details = "Managing Settings For:";
	else if (page.endsWith("/stats")) presenceData.details = "Viewing Stats For:";
	else if (page.endsWith("/security"))
		presenceData.details = "Managing Security Settings For:";
	else if (page.endsWith("/cron-jobs"))
		presenceData.details = "Managing Cron-Jobs For:";
	else if (page.endsWith("/redirect"))
		presenceData.details = "Managing Redirects For:";
	else if (page.endsWith("/logs")) presenceData.details = "Viewing Logs For:";
	else if (page.endsWith("/backup"))
		presenceData.details = "Managing Backups For:";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
