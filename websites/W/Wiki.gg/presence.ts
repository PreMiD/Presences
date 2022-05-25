const presence = new Presence({
		clientId: "978186598669758504",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: string, mTitle: string, search: NodeListOf<HTMLInputElement>;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (!privacy) {
		if (document.location.hostname == "wiki.gg") {
			if (path === "/") presenceData.details = "Viewing the homepage";
			else {
				presenceData.details = document
					.querySelector("head > title")
					.textContent.slice(0, -10);
			}
		} else {
			search = document.querySelectorAll("input[name='search']");
			mTitle = document.location.hostname.split(".")[0];
			title = mTitle[0].toUpperCase() + mTitle.slice(1);
			switch (title) {
				case "Terraria": {
					presenceData.largeImageKey = "https://i.imgur.com/fNW9Glp.png";
					break;
				}
				case "Darkdeity": {
					presenceData.largeImageKey = "https://i.imgur.com/r1CDG80.png";
					break;
				}
				case "Coromon": {
					presenceData.largeImageKey = "https://i.imgur.com/0V4Onno.png";
				}
			}
			if (search[0]?.value || search[1]?.value) {
				if (search[0]?.value) presenceData.state = search[0].value;
				else if (
					document.querySelector("#mw-search-top-table > div.results-info") &&
					search[1]?.value
				)
					presenceData.state = search[1].value;
				title = `Searching ${title}'s wiki for:`;
				presenceData.buttons = [
					{
						label: "View Search Result",
						url: document.location.href,
					},
				];
			} else if (path.includes("wiki") || path.includes("index.php")) {
				title = `Viewing ${title} Wiki about:`;
				presenceData.state = document
					.querySelector("#firstHeading")
					.textContent.replace(":", " ");
				presenceData.buttons = [
					{
						label: "View Page",
						url: href,
					},
				];
			} else if (
				path === "/" ||
				document.querySelector(
					"#mw-content-text > div.mw-parser-output > div > div:nth-child(1) > div > div:nth-child(1)"
				)
			)
				presenceData.state = "Viewing Homepage";
			presenceData.details = title;
		}
	} else presenceData.details = "Browsing...";
	if (privacy || !buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
