const presence = new Presence({
		clientId: "971311477514444800",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		search = document.querySelector<HTMLInputElement>(
			"body > div.pusher > div.site-nav.clearfix > div > header > nav > div.right.menu > div > div.ui.right.action.left.icon.input > input"
		),
		page = window.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (privacy) presenceData.details = "Browsing...";
	else if (search.value) {
		presenceData.details = "Searching for:";
		presenceData.state = search.value;
		presenceData.smallImageKey = "searching";
	} else if (page === "/") presenceData.details = "Homepage";
	else if (page.includes("/server")) {
		title = document.querySelector(
			"body > div.pusher > section > div.ui.stackable.grid > div.six.wide.column > table > thead > tr > th"
		);
		presenceData.details = title.textContent.trim();
		presenceData.state = document.querySelector(
			"[class='active item']"
		).textContent;
		presenceData.buttons = [
			{
				label: "View server",
				url: document.location.href,
			},
		];
	} else if (page.includes("/cp")) {
		presenceData.buttons = [
			{
				label: "Open control panel",
				url: document.location.href,
			},
		];
		presenceData.details = "Control Panel";
		presenceData.state =
			document.querySelector("[class='active item']")?.textContent ??
			document.querySelector("[class=' active item']")?.textContent;
	} else if (page.includes("/partners")) {
		presenceData.buttons = [
			{
				label: "View partners",
				url: document.location.href,
			},
		];
		presenceData.details = "Partners";
	} else if (page.includes("/sponsored")) {
		presenceData.buttons = [
			{
				label: "View sponsored servers",
				url: document.location.href,
			},
		];
		presenceData.details = "Sponsored";
	} else if (page.search(new RegExp(/Minecraft .* Servers/gm))) {
		presenceData.buttons = [
			{
				label: "View category",
				url: document.location.href,
			},
		];
		presenceData.details = document.querySelector(
			"body > div.pusher > section > div.header-wrappy > h2 > span"
		).textContent;
	}
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
