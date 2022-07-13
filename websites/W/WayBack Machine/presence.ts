const presence = new Presence({
		clientId: "941298758598164481",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname,
		buttons = await presence.getSetting<boolean>("buttons"),
		pageSplit = page.split("/");

	if (page === "/") {
		search = document.querySelector(
			"#react-wayback-search > div.search-toolbar > div.search-text-container > form > div > div > input.rbt-input-main.form-control.rbt-input"
		);
		if (!search) presenceData.details = "Viewing the homepage";
		else if (search.value) {
			presenceData.details = "Searching for:";
			presenceData.state = search.value;
			presenceData.smallImageKey = "searching";
		} else presenceData.details = "Viewing the homepage";
	} else if (page.includes("/web/*/")) {
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
			];
		}
		presenceData.details = page.replace("/web/*/", "");
	} else if (page.includes("/web/")) {
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
			];
		}
		if (page.includes("*"))
			presenceData.details = document.location.href.replace(/http.*\*\//gm, "");
		else
			presenceData.details = document.location.href.replace(/http.*\/\//gm, "");

		presenceData.state = `${pageSplit[2].substring(
			6,
			8
		)}/${pageSplit[2].substring(4, 6)}/${pageSplit[2].substring(
			0,
			4
		)} ${pageSplit[2].substring(8, 10)}:${pageSplit[2].substring(
			10,
			12
		)}:${pageSplit[2].substring(12, 14)}`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
