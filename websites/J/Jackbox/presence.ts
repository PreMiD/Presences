import games from "./games/index";

const presence = new Presence({
	clientId: "638118757453004820",
});

// The game state (usually contains the current game phase / 'kind')
let gamePlayerState: GamePlayerState = {
		playerName: null,
		state: null,
		username: null,
	},
	// The player's details, such as name. May be set only at the start.
	gamePlayerInfoState: GameInfoState = {
		name: null,
	},
	game: Game,
	browsingTimestamp = Math.round(Date.now() / 1000),
	gametag: string;

if (document.location.hostname === "jackbox.tv") {
	setInterval(async () => {
		const playerStateLogs = await presence.getLogs(
			/recv <- .*?("key": "(bc:customer|player|info):[a-z0-9-]+",)/s
		);
		if (playerStateLogs.length > 0) {
			let updatedMainState = false,
				updatedInfoState = false;
			for (
				let i = playerStateLogs.length - 1;
				!(updatedInfoState && updatedMainState) &&
				i >= playerStateLogs.length - 6 &&
				i >= 0;
				i--
			) {
				const latestLog = playerStateLogs[i];
				if (typeof latestLog !== "string") continue;
				let parsedLog;
				try {
					parsedLog = JSON.parse(latestLog.slice(8));
				} catch {
					presence.error(`Failed to parse log: ${latestLog}`);
					continue;
				}
				switch (true) {
					case /recv <- .*?"entities": {\n/s.test(latestLog): {
						if (!updatedMainState) {
							gamePlayerState =
								parsedLog.result.entities[
									latestLog.match(
										/"key": "((?:bc:customer|player):(?:[a-z0-9-]+))",/s
									)?.[1]
								]?.[1].val ?? parsedLog.result.val;
							updatedMainState = true;
						}
						if (!updatedInfoState) {
							gamePlayerInfoState =
								parsedLog.result.entities[
									latestLog.match(/"key": "(info:\d+)",/s)?.[1]
								]?.[1].val ?? parsedLog.result;
							updatedInfoState = true;
						}
						break;
					}
					case /recv <- .*?"key": "((?:bc:customer|player):(?:[a-z0-9-]+))",/s.test(
						latestLog
					): {
						if (!updatedMainState) {
							gamePlayerState = parsedLog.result.val;
							updatedMainState = true;
						}
						break;
					}
					case /recv <- .*?"key": "info:\d+",/s.test(latestLog): {
						if (!updatedInfoState) {
							gamePlayerInfoState = parsedLog.result.val;
							updatedInfoState = true;
						}
					}
				}
			}
		}
		if (!game) {
			type JackboxStorageLetiable = {
				tag: string;
			};
			const { tag } = await presence.getPageletiable<JackboxStorageLetiable>(
				'tv"]["storage'
			);
			gametag = tag;
			if (tag && tag !== "@connect") {
				game = games[tag];
				browsingTimestamp = Math.round(Date.now() / 1000);
				if (!game) game = games.unknown;
			}
		}
	}, 1000);
}

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/J/Jackbox/assets/logo.png",
	};
	const [useName, useTime, useDetails] = await Promise.all([
			presence.getSetting<boolean>("useName"),
			presence.getSetting<boolean>("useTime"),
			presence.getSetting<boolean>("useDetails"),
		]),
		{ href, hostname, pathname, search } = document.location,
		pathSplit = pathname.split("/").slice(1);

	if (useTime) presenceData.startTimestamp = browsingTimestamp;

	switch (hostname) {
		case "jackbox.tv": {
			if (game) {
				const { name, logo } = game;
				presenceData.largeImageKey = logo;
				presenceData.details = `Playing ${name}`;
				if (useName) {
					const { playerName, username, playerInfo } = gamePlayerState,
						realUsername =
							playerName ??
							username ??
							playerInfo?.username ??
							gamePlayerInfoState.name;
					if (realUsername) {
						if (useDetails) presenceData.details += ` as ${realUsername}`;
						else presenceData.state = `as ${realUsername}`;
					}
				}
				if (useDetails) {
					const gamePresenceData = await game.getPresenceData({
						tag: gametag,
						playerState: gamePlayerState,
						infoState: gamePlayerInfoState,
						presence,
					});
					presenceData = { ...presenceData, ...gamePresenceData };
				}
			} else presenceData.details = "Idle";
			break;
		}
		case "games.jackbox.tv": {
			presenceData.details = "Looking at a past game";
			presenceData.state = document.title;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"[class*=-artifact] .image"
			).src;
			presenceData.buttons = [
				{
					label: "View Game",
					url: href,
				},
			];
			break;
		}
		case "www.jackboxgames.com": {
			switch (pathSplit[0] ?? "") {
				case "": {
					presenceData.details = "Browsing home page";
					break;
				}
				case "author": {
					presenceData.details = "Browsing blog posts by author";
					presenceData.state = document
						.querySelector("h1")
						.textContent.match(/Author: (.*)/i)[1];
					break;
				}
				case "blog": {
					presenceData.details = "Browsing blog posts";
					break;
				}
				case "category": {
					presenceData.details = "Browsing blog category";
					presenceData.state = document
						.querySelector("h1")
						.textContent.match(/Category: (.*)/i)[1];
					break;
				}
				case "games": {
					presenceData.details = "Browsing games";
					break;
				}
				case "tag": {
					presenceData.details = "Browsing blog posts by tag";
					presenceData.state = document
						.querySelector("h1")
						.textContent.match(/Tag: (.*)/i)[1];
					break;
				}
				default: {
					if (/^\/\d{4}(\/\d{2})?(\/\d{2})?\/$/.test(pathname)) {
						presenceData.details = "Browsing blog posts by date";
						presenceData.state = document.querySelector("h1").textContent;
					} else if (
						document.body.getAttribute("itemtype") === "http://schema.org/Blog"
					) {
						presenceData.details = "Reading an article";
						presenceData.state = document.querySelector("h1").textContent;
						presenceData.buttons = [
							{
								label: "Read Article",
								url: href,
							},
						];
					} else {
						presenceData.details = "Browsing";
						presenceData.state = document.title.match(
							/^(.*?)( - Jackbox Games)?$/
						)[1];
					}
				}
			}
			break;
		}
		case "shop.jackboxgames.com": {
			switch (pathSplit[0] ?? "") {
				case "": {
					presenceData.details = "Browsing store";
					break;
				}
				case "cart": {
					presenceData.details = "Viewing cart";
					break;
				}
				case "collections": {
					if (pathSplit[1]) {
						if (pathSplit.includes("products")) {
							presenceData.details = "Viewing a product";
							presenceData.state = document.querySelector("h1").textContent;
						} else {
							presenceData.details = "Browsing collection";
							presenceData.state = document.querySelector("h1").textContent;
						}
					} else presenceData.details = "Browsing collections";
					break;
				}
				case "products": {
					if (pathSplit[1]) {
						presenceData.details = "Viewing a product";
						presenceData.state = document.querySelector("h1").textContent;
					} else presenceData.details = "Browsing collections";
					break;
				}
				case "search": {
					presenceData.details = "Searching store";
					presenceData.state = new URLSearchParams(search).get("q");
					break;
				}
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
