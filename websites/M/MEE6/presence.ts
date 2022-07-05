const presence = new Presence({
		clientId: "632002763483512843",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement, search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "mee6.xyz") {
		if (document.location.pathname.includes("/leaderboard/")) {
			title = document.querySelector<HTMLElement>(
				"#app-mount > div > div > div > div.leaderboardHeader > div.leaderboardHeaderGuildInfo > div.leaderboardGuildName"
			);
			presenceData.details = "Viewing leaderboard of server:";
			presenceData.state = title.textContent;
		} else if (
			document.querySelector(
				"#app-mount > div > div.sc-e2wlkd-0.ideomx > div.sc-e2wlkd-2.bnyPVx > div > div > div.sc-13ru8pb-14.bhtyFP > h4"
			)
		) {
			title = document.querySelector(
				"#app-mount > div > div.sc-e2wlkd-0.ideomx > div.sc-e2wlkd-2.bnyPVx > div > div > div.sc-13ru8pb-14.bhtyFP > h4"
			);
			presenceData.details = "Dashboard - Editing plugin:";
			presenceData.state = title.textContent;
			presenceData.smallImageKey = "writing";
		} else if (document.location.pathname.includes("/dashboard/")) {
			title = document.querySelector(".subHeaderMenuListItem.selected");
			presenceData.details = "Dashboard - Viewing tab:";
			presenceData.state = title.textContent;
		} else if (document.location.pathname.includes("/premium")) {
			presenceData.details = "Reading about premium";
			presenceData.smallImageKey = "reading";
		} else if (document.location.pathname === "/")
			presenceData.details = "Viewing the homepage";
	} else if (document.location.hostname === "help.mee6.xyz") {
		title = document.querySelector<HTMLElement>("head > title");
		search = document.querySelector<HTMLInputElement>(
			"body > header > div.csh-wrapper > form > span > input"
		);
		if (!search.textContent) {
			presenceData.details = "Helpdesk searching for:";
			presenceData.state = search.value;
			presenceData.smallImageKey = "searching";
		} else if (title.textContent === "MEE6 Helpdesk")
			presenceData.details = "Browsing the helpdesk";
		else {
			presenceData.details = "Helpdesk viewing:";
			presenceData.state = title.textContent.replace(" | MEE6 Helpdesk", "");
			presenceData.smallImageKey = "reading";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
