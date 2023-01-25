const presence = new Presence({
		clientId: "1067910906912194590",
	}),
	pages: { [k: string]: string } = {
		"/settings": "Settings",
		"/store/player-appearance": "Player Appearance",
		"/store/board-maps": "Board Maps",
		"/store/upgrades": "Upgrades",
		"/store/avatars": "Profile Pictures",
		"/store/coins": "Coins",
	};

let startTimestamp: number;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "rio-logo",
		},
		{ pathname } = location;

	if (pathname.includes("/store")) {
		presenceData.details = "Store";
		if (pages[pathname]) presenceData.state = pages[pathname];
	} else if (pathname.includes("/room")) {
		let latestInfo = document.querySelector(
				"#app > div:nth-child(4) > div > div:nth-child(2) > div > div > :first-child > :first-child > :last-child > :first-child"
			)?.children?.[0]?.textContent,
			players = [];

		presenceData.details = "🎮 In a room";

		if (latestInfo) {
			const playerList = document.querySelectorAll(
				"#app > div:nth-child(4) > div > div:nth-child(3) > div > :first-child > div > div > :not(:first-child) > div:nth-child(2) > div:first-child"
			);

			for (const element of playerList) players.push(element.textContent);

			players = [...players]
				.sort((a, b) => a.length - b.length)
				.filter(Boolean);

			/* Replace room ID */
			latestInfo = latestInfo.replace(pathname.split("/")[2], "");

			/* Replace player names */
			for (const player of players)
				latestInfo = latestInfo.replace(new RegExp(player, "g"), "A player");

			presenceData.state = latestInfo ? `🎲 ${latestInfo}` : "";
		}

		if (!startTimestamp) startTimestamp = Date.now();
		presenceData.startTimestamp = startTimestamp;
	} else if (pathname.includes("/profile/")) {
		presenceData.details = "Viewing a profile";
		presenceData.state = document.querySelector(
			"header > div > :last-child > span"
		).textContent;
	} else if (pages[pathname]) {
		presenceData.details = "Viewing a page";
		presenceData.state = pages[pathname];
	} else {
		presence.setActivity();
		return;
	}

	presence.setActivity(presenceData);
});
