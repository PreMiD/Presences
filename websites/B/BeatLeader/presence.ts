const presence = new Presence({
		clientId: "939893188448104468",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/TWPjaYR.png",
	Playing = "https://i.imgur.com/xiZprpt.png",
	Paused = "https://i.imgur.com/w1jwJTh.png",
	Replay = "https://i.imgur.com/UxmT8G2.png",
	"360DegreeEasy" = "https://i.imgur.com/DVJ8DrX.png",
	"360DegreeExpert" = "https://i.imgur.com/TfqWdfp.png",
	"360DegreeExpert+" = "https://i.imgur.com/NA06k7F.png",
	"360DegreeHard" = "https://i.imgur.com/YPJtpLN.png",
	"360DegreeNormal" = "https://i.imgur.com/yQJMy15.png",
	"90DegreeEasy" = "https://i.imgur.com/Fo03ZyU.png",
	"90DegreeExpert" = "https://i.imgur.com/pQel27h.png",
	"90DegreeExpert+" = "https://i.imgur.com/VKgWOzs.png",
	"90DegreeHard" = "https://i.imgur.com/QG5xcsL.png",
	"90DegreeNormal" = "https://i.imgur.com/v6JkOai.png",
	LawlessEasy = "https://i.imgur.com/VkQqgWI.png",
	LawlessExpert = "https://i.imgur.com/Nc3MWRg.png",
	"LawlessExpert+" = "https://i.imgur.com/6Vkd5bU.png",
	LawlessHard = "https://i.imgur.com/ndA08Dj.png",
	LawlessNormal = "https://i.imgur.com/rMaDUFX.png",
	LightShowEasy = "https://i.imgur.com/xc1Topa.png",
	LightShowExpert = "https://i.imgur.com/cJKkojn.png",
	"LightShowExpert+" = "https://i.imgur.com/rF4tn28.png",
	LightShowHard = "https://i.imgur.com/awviQ8Y.png",
	LightShowNormal = "https://i.imgur.com/J5qLp9b.png",
	NoArrowsEasy = "https://i.imgur.com/7fM9HNb.png",
	NoArrowsExpert = "https://i.imgur.com/aLfl2ix.png",
	"NoArrowsExpert+" = "https://i.imgur.com/WR2pnWY.png",
	NoArrowsHard = "https://i.imgur.com/tiIyXay.png",
	NoArrowsNormal = "https://i.imgur.com/k2t9Lac.png",
	OneSaberEasy = "https://i.imgur.com/BpKnvbM.png",
	OneSaberExpert = "https://i.imgur.com/aWrR0ln.png",
	"OneSaberExpert+" = "https://i.imgur.com/SEdFi3h.png",
	OneSaberHard = "https://i.imgur.com/ZfZATnl.png",
	OneSaberNormal = "https://i.imgur.com/qcILmPs.png",
	StandardEasy = "https://i.imgur.com/2J4LtXj.png",
	StandardExpert = "https://i.imgur.com/HVzq27X.png",
	"StandardExpert+" = "https://i.imgur.com/wcL9Uar.png",
	StandardHard = "https://i.imgur.com/dxfOJXE.png",
	StandardNormal = "https://i.imgur.com/KOgMFdx.png",
}

presence.info("Presence loaded");

let preview = {
	name: "",
	subName: "",
	currentTime: "",
	difficulty: "",
	customDifficulty: "",
	playing: false,
	duration: "",
	gameMode: "",
	playerName: "",
};

presence.on(
	"iFrameData",
	(data: {
		name: string;
		subName: string;
		currentTime: string;
		difficulty: string;
		customDifficulty: string;
		gameMode: string;
		playing: boolean;
		duration: string;
		playerName: string;
	}) => {
		preview = data;
	}
);

presence.on("UpdateData", async () => {
	const [time, buttons, cover] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, hostname } = document.location;

	if (hostname.split(".")[0] === "www") {
		presenceData.largeImageKey = Assets.Logo;
		switch (pathname.split("/")[1]) {
			case "u": {
				presenceData.details = "Viewing profile";
				presenceData.state =
					document.querySelector(".player-nickname a")?.textContent;
				presenceData.smallImageKey =
					document.querySelector<HTMLImageElement>(".countryIcon")?.src;
				if (cover) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>(".avatar")?.src;
				}
				presenceData.buttons = [
					{
						label: "View Page",
						url: href,
					},
				];
				break;
			}
			case "leaderboard": {
				presenceData.details =
					document.querySelector(".title .name")?.textContent;
				presenceData.state =
					document.querySelector(".level-author")?.textContent;
				presenceData.smallImageText = `${
					document.querySelector<HTMLAnchorElement>(
						".diff-switch .primary > .icon > div"
					)?.title
				} ${
					document.querySelector(".diff-switch .primary > span:nth-of-type(2)")
						?.textContent
				}`;
				presenceData.smallImageKey =
					Assets[
						`${
							document
								.querySelector(".diff > .diff")
								.textContent.replaceAll(" ", "")
								.split("/")[1] ?? "Standard"
						}${
							document
								.querySelector(".diff > .diff")
								.textContent.replaceAll(" ", "")
								.split("/")[0]
						}` as keyof typeof Assets
					];
				if (cover) {
					presenceData.largeImageKey = document
						.querySelector<HTMLDivElement>(".leaderboard.content-box")
						?.style?.backgroundImage?.match(/url\(["']?([^"']*)["']?\)/)[1];
				}
				presenceData.buttons = [
					{
						label: "View Page",
						url: href,
					},
				];
				break;
			}
			case "event": {
				presenceData.details = "Viewing event";
				presenceData.state = document.querySelector("h2")?.textContent;
				presenceData.buttons = [
					{
						label: "View Page",
						url: href,
					},
				];
				if (cover) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>("section > img")?.src;
				}
				break;
			}
			case "clan": {
				presenceData.details = "Viewing clan";
				presenceData.state = document.querySelector(".title")?.textContent;
				presenceData.buttons = [
					{
						label: "View Page",
						url: href,
					},
				];
				if (cover) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>(".clanImage").src;
				}
				break;
			}
			case "playlist": {
				presenceData.details = "Viewing playlist";
				presenceData.state =
					document.querySelector(".playlistTitle")?.textContent;
				presenceData.buttons = [
					{
						label: "View Page",
						url: href,
					},
				];
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing dashboard";
				break;
			}
			case "ranking": {
				presenceData.details = "Viewing ranking";
				break;
			}
			case "clans": {
				presenceData.details = "Browsing clans";
				break;
			}
			case "leaderboards": {
				presenceData.details = "Browsing leaderboards";
				break;
			}
			case "events": {
				presenceData.details = "Browsing events";
				break;
			}
			case "playlists": {
				presenceData.details = "Viewing playlists";
				break;
			}
			case "search": {
				presenceData.details = "Searching users";
				break;
			}
		}
		if (
			(document
				.querySelector<HTMLIFrameElement>("iframe")
				?.src.includes("replay.beatleader.xyz") &&
				preview.name) ||
			(document
				.querySelector<HTMLIFrameElement>("iframe")
				?.src.includes("skystudioapps.com") &&
				preview.name)
		) {
			if (
				document
					.querySelector<HTMLIFrameElement>("iframe")
					?.src.includes("replay.beatleader.xyz")
			)
				presenceData.largeImageKey = Assets.Replay;

			if (
				document
					.querySelector<HTMLIFrameElement>("iframe")
					?.src.includes("skystudioapps.com")
			)
				delete preview.playerName;
			presenceData.details = `${preview.name} ${preview.subName}`;
			presenceData.state =
				preview.playerName ??
				(preview.difficulty === preview.customDifficulty
					? `${preview.gameMode} ${preview.difficulty}`
					: `${preview.customDifficulty}`);
			presenceData.smallImageKey = preview.playing
				? Assets.Playing
				: Assets.Paused;
			presenceData.smallImageText = preview.playing ? "Playing" : "Paused";
			if (preview.playing) {
				const timestamps = presence.getTimestamps(
					presence.timestampFromFormat(preview.currentTime),
					presence.timestampFromFormat(preview.duration)
				);
				presenceData.endTimestamp = timestamps[1];
			}
			presenceData.buttons = [
				{
					label: `View ${preview.playerName ? "Replay" : "Preview"}`,
					url: document.querySelector<HTMLIFrameElement>("iframe").src,
				},
			];
		}
	} else if (hostname.split(".")[0] === "replay") {
		presenceData.largeImageKey = cover
			? document.querySelector<HTMLImageElement>("#songImage").src
			: Assets.Replay;
		presenceData.details = document.querySelector("#songName").textContent;
		presenceData.state = document.querySelector("#playerName").textContent;
		presenceData.smallImageKey = document.querySelector("div.btn.play")
			? Assets.Paused
			: Assets.Playing;
		presenceData.smallImageText = document.querySelector("div.btn.play")
			? "Paused"
			: "Playing";
		if (document.querySelector("div.btn.pause")) {
			const timestamps = presence.getTimestamps(
				presence.timestampFromFormat(
					document.querySelector("#songProgress").textContent
				),
				presence.timestampFromFormat(
					document.querySelector("#songDuration").textContent
				)
			);
			presenceData.endTimestamp = timestamps[1];
		}
		presenceData.buttons = [
			{
				label: "View Replay",
				url: href,
			},
		];
	} else if (hostname.split(".")[0] === "royale") {
		presenceData.largeImageKey = cover
			? document.querySelector<HTMLImageElement>("#songImage").src
			: Assets.Replay;
		presenceData.details = document.querySelector("#songName").textContent;
		presenceData.state = `${
			document.querySelectorAll(".playerTableRow")?.length
		} player royale`;
		presenceData.smallImageKey = document.querySelector("div.btn.play")
			? Assets.Paused
			: Assets.Playing;
		presenceData.smallImageText = document.querySelector("div.btn.play")
			? "Paused"
			: "Playing";
		if (document.querySelector("div.btn.pause")) {
			const timestamps = presence.getTimestamps(
				presence.timestampFromFormat(
					document.querySelector("#songProgress").textContent
				),
				presence.timestampFromFormat(
					document.querySelector("#songDuration").textContent
				)
			);
			presenceData.endTimestamp = timestamps[1];
		}
		presenceData.buttons = [
			{
				label: "View Royale",
				url: href,
			},
		];
	}
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
