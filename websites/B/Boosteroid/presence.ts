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
		const response = await fetch('https://github.saith.dev/games.json')
		if (!response.ok) return null;

		let games = await response.json()

		if (!games[id]) return null;
		return games[id]
	}

	const presenceData: PresenceData = {
		largeImageKey: "icon",
		startTimestamp: browsingTimestamp,
	},
		{ pathname } = document.location

	switch (true) {
		case pathname === "/dashboard":
			presenceData.details = "Browsing"
			presenceData.state = `In: ${(document.querySelector('button.tab-button--active')).innerHTML}`
			presenceData.largeImageKey = "https://i.imgur.com/Ldqj50W.png"
			presence.setActivity(presenceData);
			break;

		case pathname.startsWith('/application/'):
			presenceData.details = "Looking at Game information"
			presenceData.state = document.querySelector('h1').innerHTML
			presenceData.largeImageKey = "https://i.imgur.com/Ldqj50W.png"
			presence.setActivity(presenceData);
			break;

		case pathname === "/static/streaming/streaming.html":
			let gameid = await getGame(Number(window.localStorage.getItem('appId')))
			if (!gameid) {
				presenceData.details = "Unknown Game"
				presenceData.largeImageKey = "https://i.imgur.com/cnczdmM.png"
				presence.setActivity(presenceData);
			} else {
				let gameid = await getGame(Number(window.localStorage.getItem('appId')))
				presenceData.details = gameid.name
				presenceData.state = `Platform: ${gameid.platform}`
				presenceData.largeImageKey = gameid.icon
				presence.setActivity(presenceData);
			}
			break;
	}
})
