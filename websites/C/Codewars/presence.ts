const presence = new Presence({
		clientId: "821106305241972746",
	}),
	timebrowsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [pages, state] = document.location.pathname.split("/").filter(p => p),
		presenceData: PresenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/C/Codewars/assets/logo.png",
			startTimestamp: timebrowsed,
			details: "Browsing ...",
		},
		displayStats = await presence.getSetting<boolean>("statsdisplay");

	switch (pages[0]) {
		case "dashboard": {
			presenceData.details = "Viewing Dashboard";
			if (displayStats) {
				presenceData.state = `${
					document.querySelector(".ml-10px").textContent
				} Honor`;
			}

			break;
		}
		case "topics": {
			if (pages[1]) {
				presenceData.details = "Viewing Topic";
				presenceData.state = state;
			} else presenceData.details = "Viewing Forum";

			break;
		}
		case "kumite": {
			presenceData.details = "Viewing kumite";
			break;
		}
		case "subscription": {
			presenceData.details = "Viewing Codewars Red";
			break;
		}
		default:
			if (pages[0] === "users" && pages[1] === "leaderboard")
				presenceData.details = "Viewing Leaderboard";
			else if (pages[0] === "kata") {
				if (pages[2]) {
					presenceData.details = "Searching Katas";
					presenceData.state = `${document.querySelector(".ml-0").textContent}`;
				} else {
					presenceData.details = `Solving Kata | ${
						document.querySelector(".inner-small-hex > span").textContent
					}`;
					presenceData.state =
						document.querySelector(".items-center > h4").textContent;
				}
			} else if (pages[0] === "users" && pages[1] === "edit")
				presenceData.details = "Editing Account";
			else if (pages[0] === "trainer" && pages[1] === "setup") {
				presenceData.details = "Editing Trainer Setup";
				presenceData.state = `${
					Array.from(document.querySelectorAll(".icon-list > li > .is-active"))
						.length
				} Languages selected`;
			} else if (
				pages[0] === "users" &&
				pages[1] !== "leaderboard" &&
				pages[1] !== "edit"
			) {
				if (Array.from(document.querySelectorAll(".h-full")).length > 6) {
					presenceData.details = "Viewing own Profile";
					if (displayStats) {
						presenceData.state = `${
							document.querySelector(".ml-10px").textContent
						} Honor | ${document.querySelector(".small-hex").textContent}`;
					}
				} else {
					presenceData.details = "Viewing Profile from";
					if (displayStats) {
						presenceData.state = `${document
							.querySelector(".stat")
							.textContent.slice("Name:".length)} | ${Array.from(
							document.querySelector(".stat-box").children
						)
							.find(e => e.textContent.startsWith("<b>Clan:</b>"))
							.textContent.slice("Clan:".length)}`;
					}
				}
			}
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
