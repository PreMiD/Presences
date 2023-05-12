interface Channel {
	id: string;
	name: string;
	track: string;
	artist: string;
	cover: string;
	listeners: number;
	timeStart: string;
	timeEnd: string;
}

const presence = new Presence({
		clientId: "748660637021896835",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let totalListeners: number,
	channels: Channel[] = [];

function newStats(): void {
	fetch("https://api.reyfm.de/v4?voting=true")
		.then(response => response.json())
		.then(data => {
			totalListeners = data.all_listeners;
			const channelList: string[] = data.sequence,
				channelArray: Channel[] = [];
			for (const channel of channelList) {
				channelArray.push({
					id: channel,
					name: "",
					track: "",
					artist: "",
					cover: "",
					listeners: 0,
					timeStart: "",
					timeEnd: "",
				});
			}
			for (const channel of channelArray) {
				const channelData = data.channels[`${channel.id}`];
				channel.name = channelData.name;
				channel.listeners = channelData.listeners;
				channel.track = channelData.now.title;
				channel.artist = channelData.now.artist;
				channel.cover = channelData.now.cover_urls["500x500"];
				channel.timeStart = channelData.now.time.start;
				channel.timeEnd = channelData.now.time.end;
			}
			channels = channelArray;
		});
}

function findChannel(): string {
	try {
		for (const rows of document.querySelector("#container > div.channels")
			.children) {
			for (const channel of rows.children) {
				if (
					!channel.className.includes("desktop") &&
					(
						channel.firstElementChild.children[2]
							.firstElementChild as HTMLImageElement
					).src.includes("stop.png")
				)
					return channel.firstElementChild.id.replace("channel-", "");
			}
		}

		return "YOU FAILED";
	} catch (e) {
		return "YOU FAILED";
	}
}

newStats();
setInterval(() => {
	newStats();
}, 10_000);

presence.on("UpdateData", async () => {
	const [info, elapsed, format1, format2, format3, buttons, logo] =
			await Promise.all([
				presence.getSetting<boolean>("sInfo"),
				presence.getSetting<boolean>("tElapsed"),
				presence.getSetting<string>("sFormat1"),
				presence.getSetting<string>("sFormat2"),
				presence.getSetting<string>("sListeners"),
				presence.getSetting<boolean>("buttons"),
				presence.getSetting<number>("logo"),
			]),
		logoArr = [
			"reywhitebacksmall",
			"reyblackbacksmall",
			"reycolorbacksmall",
			"reywhiteback",
			"reyblackback",
			"reycolorback",
			"reywhite",
			"reyblack",
			"rey",
		],
		presenceData: PresenceData = {
			largeImageKey: logoArr[logo] || "reywhitebacksmall",
			smallImageKey: "reading",
		};

	let showFormat3 = false;

	if (info) {
		if (document.location.hostname === "status.rey.fm")
			presenceData.details = "Viewing status page";
		else if (document.location.hostname === "rey.fm") {
			if (document.location.pathname.includes("/bots")) {
				presenceData.details = "Viewing bots";
				presenceData.buttons = [
					{
						label: "View Bots",
						url: "https://rey.fm/bots",
					},
				];
			} else if (document.location.pathname.includes("/discord-bot")) {
				presenceData.details = "Viewing the Discord bot";
				presenceData.buttons = [
					{
						label: "View Bot",
						url: "https://rey.fm/discord-bot",
					},
				];
			} else if (document.location.pathname.includes("/partner"))
				presenceData.details = "Viewing partners";
			else if (document.location.pathname.includes("/stream-urls"))
				presenceData.details = "Viewing streams";
			else if (document.location.pathname.includes("/apply"))
				presenceData.details = "Viewing job postings";
			else if (document.location.pathname.includes("/datenschutz"))
				presenceData.details = "Reading the datenschutz";
			else if (document.location.pathname.includes("/impressum"))
				presenceData.details = "Reading the impressum";
			else if (document.location.pathname.includes("/stats"))
				presenceData.details = "Viewing the statistics";
			else if (document.location.pathname === "/")
				presenceData.details = "Browsing...";
		}
	}

	if (elapsed) presenceData.startTimestamp = browsingTimestamp;

	if (
		document.location.hostname === "rey.fm" &&
		document.location.pathname === "/"
	) {
		if (
			document.querySelector<HTMLElement>("#player").style.cssText !==
			"display: none;"
		) {
			let track: string, artist: string, cover: string;

			if (
				!document
					.querySelector<HTMLImageElement>("#miniplayer-play")
					.src.includes("play.png")
			) {
				const channelID = findChannel();
				if (channelID !== "YOU FAILED") {
					const channel = channels.find(channel => channel.id === channelID);
					({ track, artist, cover } = channel);

					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = format3
						.replace("%listeners%", `${channel.listeners}`)
						.replace("%totalListeners%", `${totalListeners}`);
					presenceData.startTimestamp = Date.parse(channel.timeStart);
					presenceData.endTimestamp = Date.parse(channel.timeEnd);
					showFormat3 = true;
					presenceData.buttons = [
						{
							label: "Listen along!",
							url: `https://rey.fm/station/${channel.name}`,
						},
					];
				} else {
					artist = document.querySelector(
						"#player > div.wrapper > div.current > span.artist"
					).textContent;
					track = document.querySelector(
						"#player > div.wrapper > div.current > span.title"
					).textContent;
					cover = document
						.querySelector(
							"#player > div.wrapper > div.cover > img#player-coverart"
						)
						.getAttribute("src");
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = "Loading statistics...";
				}
			} else {
				artist = document.querySelector(
					"#player > div.wrapper > div.current > span.artist"
				).textContent;
				track = document.querySelector(
					"#player > div.wrapper > div.current > span.title"
				).textContent;
				cover = document
					.querySelector(
						"#player > div.wrapper > div.cover > img#player-coverart"
					)
					.getAttribute("src");
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = `Total Listeners: ${totalListeners}`;
				delete presenceData.startTimestamp;
			}

			presenceData.details = format1
				.replace("%title%", track)
				.replace("%artist%", artist);
			presenceData.state = format2
				.replace("%title%", track)
				.replace("%artist%", artist);
			presenceData.largeImageKey = cover;
		}
	} else if (
		document.location.hostname === "rey.fm" &&
		document.querySelector("#channel-player") !== null
	) {
		const channel = channels.find(
				channel =>
					channel.id ===
					document
						.querySelector("#channel-player")
						.className.replace("shadow channel-color-", "")
			),
			paused = document
				.querySelector<HTMLImageElement>("#play")
				.src.includes("play.png");

		paused
			? (presenceData.smallImageKey = "pause")
			: (presenceData.smallImageKey = "play");

		presenceData.details = format1
			.replace("%title%", channel.track)
			.replace("%artist%", channel.artist);
		presenceData.state = format2
			.replace("%title%", channel.track)
			.replace("%artist%", channel.artist);

		presenceData.smallImageText = format3
			.replace("%listeners%", `${channel.listeners}`)
			.replace("%totalListeners%", `${totalListeners}`);

		presenceData.largeImageKey = channel.cover;

		showFormat3 = true;

		presenceData.buttons = [{ label: "Listen along!", url: document.URL }];

		if (!paused) {
			presenceData.startTimestamp = Date.parse(channel.timeStart);
			presenceData.endTimestamp = Date.parse(channel.timeEnd);
		} else {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	showFormat3
		? presence.showSetting("sListeners")
		: presence.hideSetting("sListeners");

	if (!buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
