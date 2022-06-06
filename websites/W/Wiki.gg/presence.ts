const presence = new Presence({
		clientId: "978186598669758504",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: string, mTitle: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = document.location,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (!privacy) {
		if (hostname == "wiki.gg") {
			if (pathname === "/") presenceData.details = "Viewing the home page";
			else {
				presenceData.details = document
					.querySelector("head > title")
					.textContent.slice(0, -10);
			}
		} else {
			const search = document.querySelectorAll<HTMLInputElement>(
				"input[name='search']"
			);
			mTitle = hostname.split(".")[0];
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
			} else if (pathname.includes("wiki") || pathname.includes("index.php")) {
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
				pathname === "/" ||
				document.querySelector(
					"#mw-content-text > div.mw-parser-output > div > div:nth-child(1) > div > div:nth-child(1)"
				)
			)
				presenceData.state = "Viewing Homepage";
			presenceData.details = title;
		}
	} else presenceData.details = "Browsing";
	if (privacy || !buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
