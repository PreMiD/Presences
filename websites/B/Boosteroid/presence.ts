const presence = new Presence({
		clientId: "1066889761928777848",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	interface Game {
		name: string;
		platform: string;
		icon: string;
	}

	async function getGame(id: number): Promise<Game | null> {
		const response = await fetch("https://github.saith.dev/games.json");
		if (!response.ok) return null;

		const games = await response.json();

		if (!games[id]) return null;
		return games[id];
	}

	const presenceData: PresenceData = {
			largeImageKey: "icon",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	switch (true) {
		case pathname === "/dashboard": {
			presenceData.details = "Browsing";
			presenceData.state = `In: ${
				(document.querySelector("button.tab-button--active") as HTMLElement)
					.innerHTML
			}`;
			presenceData.largeImageKey = "https://i.imgur.com/Ldqj50W.png";
			break;
		}
		case pathname.startsWith("/application/"): {
			presenceData.details = "Looking at Game information";
			presenceData.state = (
				document.querySelector("h1") as HTMLElement
			).innerHTML;
			presenceData.largeImageKey = "https://i.imgur.com/Ldqj50W.png";
			break;
		}
		case pathname === "/profile/account/main": {
			presenceData.details = "Browsing";
			presenceData.largeImageKey = "https://i.imgur.com/Ldqj50W.png";
			break;
		}
		case pathname === "/static/streaming/streaming.html": {
			const gameid = await getGame(
				Number(window.localStorage.getItem("appId"))
			);
			if (!gameid) {
				presenceData.details = "Unknown Game";
				presenceData.largeImageKey = "https://i.imgur.com/cnczdmM.png";
			} else {
				const gameid = await getGame(
					Number(window.localStorage.getItem("appId"))
				);
				presenceData.details = gameid.name;
				presenceData.state = `Platform: ${gameid.platform}`;
				presenceData.largeImageKey = gameid.icon;
			}
			break;
		}
	}
	presence.setActivity(presenceData);
});
