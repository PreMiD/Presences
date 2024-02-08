const presence = new Presence({
		clientId: "815006153066151998",
	}),
	SelectorMap = {
		header: "div#header_text.ns",
		username: "h1#me_username",
		status: "div#social_status",
		game: "div#social_status > b",
		roomid: "div#roomid",
		replay: "div#data_replay",
	},
	menuPrincipal = ["SOLO", "MULTIPLAYER"],
	soloModes: { [key: string]: string } = {
		zen: "ZEN",
		bl: "BLITZ",
		lines40: "40 LINES",
		ct: "CUSTOM",
		ctgame: "custom game",
	};
let browsingTimestamp = Math.floor(Date.now() / 1000);

function getText(selector: string): string {
	if (
		document.querySelector(selector) !== null &&
		document.querySelector(selector)
	)
		return document.querySelector(selector).textContent;
	else return null;
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/T/TETR.IO/assets/logo.jpg",
	Qp = "https://cdn.rcd.gg/PreMiD/websites/T/TETR.IO/assets/0.png",
	Ct = "https://cdn.rcd.gg/PreMiD/websites/T/TETR.IO/assets/1.png",
	Tl = "https://cdn.rcd.gg/PreMiD/websites/T/TETR.IO/assets/2.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		showPrivButton = await presence.getSetting<boolean>("privateRoom"),
		showButtons = await presence.getSetting<boolean>("showButtons"),
		header = getText(SelectorMap.header),
		status = getText(SelectorMap.status),
		game = getText(SelectorMap.game),
		roomID = getText(SelectorMap.roomid);
	if (
		status.includes("Idle") ||
		status.includes("Busy") ||
		status.includes("Offline")
	)
		presenceData.details = status;
	else if (menuPrincipal.includes(header)) {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = header;
		presenceData.state = "In Menus";
	} else if (Object.values(soloModes).includes(header)) {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = header;
		presenceData.state = "Setting up game";
		presenceData.smallImageKey = Object.keys(soloModes).find(
			key => soloModes[key] === header
		);
		presenceData.smallImageText = header;
	} else if (header.includes("LISTING")) {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = "ROOM LISTING";
		presenceData.state = "Browsing public rooms";
		presenceData.smallImageKey = Assets.Ct;
		presenceData.smallImageText = "ROOM LISTING";
	} else if (status.includes("custom room")) {
		if (status.includes("game"))
			presenceData.startTimestamp = browsingTimestamp;
		else browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = "CUSTOM GAME";
		presenceData.state = status.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
		presenceData.smallImageKey = Assets.Ct;
		presenceData.smallImageText = game;
		if (status.includes("public")) {
			presenceData.buttons = [
				{
					label: "Enter Public Room",
					url: `https://tetr.io/${roomID}`,
				},
			];
		} else if (showPrivButton) {
			presenceData.buttons = [
				{
					label: "Enter Private Room",
					url: `https://tetr.io/${roomID}`,
				},
			];
		}
	} else if (status.includes("QUICK")) {
		if (status.includes("game"))
			presenceData.startTimestamp = browsingTimestamp;
		else browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = game;
		presenceData.state = status.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
		presenceData.smallImageKey = Assets.Qp;
		presenceData.smallImageText = game;
	} else if (status.includes("LEAGUE")) {
		if (status.includes("game"))
			presenceData.startTimestamp = browsingTimestamp;
		else browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = game;
		presenceData.state = status.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
		presenceData.smallImageKey = Assets.Tl;
		presenceData.smallImageText = game;
	} else if (header.includes("LEAGUE")) {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = header;
		presenceData.smallImageKey = Assets.Tl;
		presenceData.smallImageText = header;
	} else if (Object.values(soloModes).includes(game)) {
		if (!header.includes("RESULTS"))
			presenceData.startTimestamp = browsingTimestamp;
		else {
			browsingTimestamp = Math.floor(Date.now() / 1000);
			presenceData.state = "Checking Results";
		}
		presenceData.details = game;
		presenceData.smallImageKey = Object.keys(soloModes).find(
			key => soloModes[key] === game
		);
		presenceData.smallImageText = game;
	} else if (!document.querySelector("#replay").classList.contains("hidden")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "REPLAY";
		presenceData.state = getText(SelectorMap.replay);
	} else {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presenceData.details = status;
	}
	if (
		getText(SelectorMap.username) !== "" &&
		!getText(SelectorMap.username).includes("guest-") &&
		showButtons
	) {
		presenceData.buttons = [
			{
				label: "View Profile",
				url: `https://ch.tetr.io/u/${getText(SelectorMap.username)}`,
			},
		];
	} else delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
