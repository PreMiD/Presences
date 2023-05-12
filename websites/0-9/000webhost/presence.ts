const presence = new Presence({
		clientId: "840489095767261194",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/FiCZfzh.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]),
		title = document.querySelector("head > title"),
		titleSite = document.querySelector(
			'[class="sidebar__header flex flex-col"]'
		);
	if (titleSite) presenceData.state = titleSite.textContent;
	if (pathname === "/") presenceData.details = "Viewing the Homepage";
	else if (pathname.includes("/forum")) {
		if (pathname.includes("/t/")) {
			presenceData.details = "Reading Forum Post:";
			presenceData.state = title.textContent.replace(
				`- ${
					document.querySelector(
						"#suggested-topics > h3.suggested-topics-message > a.badge-wrapper.box > span.badge-category.clear-badge > span"
					).textContent
				} - 000webhost forum`,
				""
			);
			presenceData.buttons = [
				{
					label: "View Forum Post",
					url: href,
				},
			];
		} else if (pathname.includes("/c/")) {
			presenceData.details = "Browsing through Forum Category:";
			presenceData.state = title.textContent
				.replace(" topics - 000webhost forum", "")
				.replace("Latest", "");
			presenceData.buttons = [
				{
					label: "View Forum Category",
					url: href,
				},
			];
		} else if (pathname.includes("/u/")) {
			presenceData.details = `Viewing ${
				document.querySelector('[class="username"]').firstChild.textContent
			}'s Profile`;
			presenceData.buttons = [
				{
					label: "View Profile",
					url: href,
				},
			];
		} else presenceData.details = "Browsing Through The Forum";
	} else if (pathname.includes("/cheap-web-hosting"))
		presenceData.details = "Viewing webhosting";
	else if (pathname.includes("members/website/list"))
		presenceData.details = "Viewing All Websites";
	else if (pathname.includes("/members/store"))
		presenceData.details = "Viewing the Store";
	else if (pathname.endsWith("/build") && titleSite) {
		presenceData.details = "Managing Website:";
		presenceData.state = titleSite.textContent;
	} else if (pathname.endsWith("/domain") && titleSite)
		presenceData.details = "Managing Domains For:";
	else if (pathname.endsWith("/files"))
		presenceData.details = "Managing Files For:";
	else if (pathname.endsWith("/database"))
		presenceData.details = "Managing Database For:";
	else if (pathname.endsWith("/email"))
		presenceData.details = "Managing Email For:";
	else if (pathname.endsWith("/settings"))
		presenceData.details = "Managing Settings For:";
	else if (pathname.endsWith("/stats"))
		presenceData.details = "Viewing Stats For:";
	else if (pathname.endsWith("/security"))
		presenceData.details = "Managing Security Settings For:";
	else if (pathname.endsWith("/cron-jobs"))
		presenceData.details = "Managing Cron-Jobs For:";
	else if (pathname.endsWith("/redirect"))
		presenceData.details = "Managing Redirects For:";
	else if (pathname.endsWith("/logs"))
		presenceData.details = "Viewing Logs For:";
	else if (pathname.endsWith("/backup"))
		presenceData.details = "Managing Backups For:";

	if (privacy) {
		delete presenceData.buttons;
		delete presenceData.state;
		presenceData.details = "Browsing";
	}
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
