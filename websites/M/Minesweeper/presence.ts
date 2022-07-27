const presence = new Presence({
		clientId: "989759189394030613",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/KtDhLn7.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;

	if (document.location.pathname === "/")
		presenceData.details = "Viewing the home page";
	else if (document.location.pathname.startsWith("/game/")) {
		presenceData.details = "Clicking cells";
		presenceData.state = `Difficulty: ${
			document.querySelector<HTMLSpanElement>(
				"a.level-select-link.active > span"
			).textContent
		}`;
		presenceData.buttons = [
			{
				label: "Spectate Game",
				url: location.href,
			},
		];
	} else if (document.location.pathname.startsWith("/player/")) {
		presenceData.details = "Viewing profile";
		presenceData.state = `${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")
			.replace(" - Minesweeper Online", "")}`;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: location.href,
			},
		];
	} else if (document.location.pathname.startsWith("/help/")) {
		presenceData.details = "Viewing the help page";
		presenceData.state = `${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")
			.replace(" - Minesweeper Online", "")}`;
                const checkText = document
                        .querySelector('[class*="active"]')
                        .textContent.trim();
                if (checkText.includes("my")) presenceData.details = `Viewing ${checkText}`;
                else presenceData.details = `Viewing the ${checkText}`;
	presence.setActivity(presenceData);
});
