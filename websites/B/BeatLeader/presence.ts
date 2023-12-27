const presence = new Presence({
		clientId: "939893188448104468",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	date = new Date(),
	random = Math.floor(Math.random() * 100),
	logoArr = [
		"",
		"https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/76.gif", //Regular
		"https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/77.png", //BoooLeader
		"https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/78.png", //SpookLeader
		"https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/79.png", //Poodleader
		"https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/80.png", //GladdePaling
		"https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/81.gif", //EarthDay
		`https://i.imgur.com${"/Kf8bXNc.gif"}`, //Christmas
	];

const enum Assets {
	Replay = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/0.png",
}

enum OtherAssets {
	"360DegreeEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/1.png",
	"360DegreeExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/2.png",
	"360DegreeExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/3.png",
	"360DegreeHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/4.png",
	"360DegreeNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/5.png",
	"360Degree" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/6.png",
	"90DegreeEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/7.png",
	"90DegreeExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/8.png",
	"90DegreeExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/9.png",
	"90DegreeHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/10.png",
	"90DegreeNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/11.png",
	"90Degree" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/12.png",
	LawlessEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/13.png",
	LawlessExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/14.png",
	LawlessExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/15.png",
	LawlessHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/16.png",
	LawlessNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/17.png",
	Lawless = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/18.png",
	LightshowEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/19.png",
	LightshowExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/20.png",
	LightshowExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/21.png",
	LightshowHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/22.png",
	LightshowNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/23.png",
	Lightshow = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/24.png",
	LegacyEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/25.png",
	LegacyExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/26.png",
	LegacyExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/27.png",
	LegacyHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/28.png",
	LegacyNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/29.png",
	Legacy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/30.png",
	NoArrowsEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/31.png",
	NoArrowsExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/32.png",
	NoArrowsExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/33.png",
	NoArrowsHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/34.png",
	NoArrowsNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/35.png",
	NoArrows = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/36.png",
	OneSaberEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/37.png",
	OneSaberExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/38.png",
	OneSaberExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/39.png",
	OneSaberHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/40.png",
	OneSaberNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/41.png",
	OneSaber = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/42.png",
	StandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/43.png",
	StandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/44.png",
	StandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/45.png",
	StandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/46.png",
	StandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/47.png",
	Standard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/48.png",
	HorizontalEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/49.png",
	HorizontalHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/50.png",
	HorizontalExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/51.png",
	HorizontalNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/52.png",
	HorizontalExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/53.png",
	Horizontal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/54.png",
	VerticalHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/55.png",
	VerticalEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/56.png",
	VerticalExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/57.png",
	VerticalExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/58.png",
	VerticalNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/59.png",
	Vertical = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/60.png",
	InvertedExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/61.png",
	InvertedEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/62.png",
	InvertedExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/63.png",
	InvertedNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/64.png",
	InvertedHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/65.png",
	Inverted = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/66.png",
	InverseHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/67.png",
	InverseExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/68.png",
	InverseEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/69.png",
	InverseExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/70.png",
	InverseNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/71.png",
	Inverse = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/72.png",
	RhythmGameStandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/73.png",
	RhythmGameStandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/74.png",
	RhythmGameStandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/75.png",
	RhythmGameStandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/82.png",
	RhythmGameStandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/83.png",
	RhythmGameStandard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/84.png",
	"Standard-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/85.png",
	"Standard-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/86.png",
	"Standard-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/87.png",
	"Standard-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/88.png",
	"Standard-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/89.png",
	"Standard-PinkPlay_Controllable" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/90.png",
	"OneSaber-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/91.png",
	"OneSaber-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/92.png",
	"OneSaber-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/93.png",
	"OneSaber-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/94.png",
	"OneSaber-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/95.png",
	"OneSaber-PinkPlay_Controllable" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/96.png",
	"Lawless-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/97.png",
	"Lawless-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/98.png",
	"Lawless-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/99.png",
	"Lawless-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/100.png",
	"Lawless-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/101.png",
	"Lawless-PinkPlay_Controllable" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/102.png",
	Easy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/103.png",
	Expert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/104.png",
	ExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/105.png",
	Hard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/106.png",
	Normal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/107.png",
	UnknownEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/108.png",
	UnknownExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/109.png",
	UnknownExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/110.png",
	UnknownHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/111.png",
	UnknownNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/112.png",
	Unknown = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/113.png",
}

function simplifyKey(key: string): string {
	let result = key;
	if (
		(result.includes("-PinkPlay_Controllable") &&
			!result.match(/(?:Standard|OneSaber|Lawless)-PinkPlay_Controllable/)) ||
		result.match(/(Horizontal|Vertical|Inverted|Inverse)/)
	)
		result = result.replace("-PinkPlay_Controllable", "");
	if (result.startsWith("Generated")) result = result.replace("Generated", "");
	if (result.match(/(Horizontal|Vertical|Inverted|Inverse)/))
		result = result.replace(/Lawless|OneSaber|NoArrows|Standard|Legacy/, "");
	return result;
}

let replay = {
		name: "",
		subName: "",
		currentTime: "",
		playing: false,
		duration: "",
		playerName: "",
		cover: "",
	},
	dynamicLogo = "";

switch (date.getMonth()) {
	case 3: {
		if (date.getDate() === 22) dynamicLogo = logoArr[6];
		break;
	}
	case 9: {
		if (random < 50) dynamicLogo = logoArr[2];
		else dynamicLogo = logoArr[3];
		break;
	}
	case 11: {
		dynamicLogo = logoArr[7];
		break;
	}
	default: {
		if (random < 98) dynamicLogo = logoArr[1];
		else if (random >= 98) {
			if (random <= 98) dynamicLogo = logoArr[4];
			else dynamicLogo = logoArr[5];
		}
		break;
	}
}

presence.on(
	"iFrameData",
	(data: {
		name: string;
		subName: string;
		currentTime: string;
		playing: boolean;
		duration: string;
		playerName: string;
		cover: string;
	}) => {
		replay = data;
	}
);

presence.on("UpdateData", async () => {
	const [time, buttons, cover, logo, mapSmallImages] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<number>("logo"),
			presence.getSetting<number>("mapSmallImages"),
		]),
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, hostname } = document.location;

	if (hostname.split(".")[0] === "replay") {
		presenceData.largeImageKey = cover
			? document.querySelector<HTMLImageElement>("#songImage").src
			: Assets.Replay;
		presenceData.details = document.querySelector("#songName").textContent;
		presenceData.state = document.querySelector("#playerName").textContent;
		presenceData.smallImageKey = document.querySelector("div.btn.play")
			? Assets.Pause
			: Assets.Play;
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
			? Assets.Pause
			: Assets.Play;
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
	} else {
		presenceData.largeImageKey = logo === 0 ? dynamicLogo : logoArr[logo];
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
				const previewURL = new URL(
					document.querySelector<HTMLAnchorElement>(
						'a[href^="https://allpoland.github.io"]'
					)?.href
				);
				presenceData.details =
					document.querySelector(".title .name")?.textContent;
				presenceData.state =
					document.querySelector(".level-author")?.textContent;
				if (presenceData.smallImageText === "")
					delete presenceData.smallImageText;
				if (mapSmallImages !== 3) {
					presenceData.smallImageText = `${
						mapSmallImages === 0 || mapSmallImages === 1
							? previewURL.searchParams.get("mode")
							: ""
					} ${
						mapSmallImages === 0 || mapSmallImages === 2
							? previewURL.searchParams.get("difficulty").replace("Plus", "+")
							: ""
					}`;
					presenceData.smallImageKey =
						OtherAssets[
							simplifyKey(
								`${
									mapSmallImages === 0 || mapSmallImages === 1
										? previewURL.searchParams.get("mode")
										: ""
								}${
									mapSmallImages === 0 || mapSmallImages === 2
										? previewURL.searchParams.get("difficulty")
										: ""
								}`
							) as keyof typeof OtherAssets
						] ??
						OtherAssets[
							`Unknown${
								mapSmallImages === 0 || mapSmallImages === 2
									? previewURL.searchParams.get("difficulty")
									: ""
							}` as keyof typeof OtherAssets
						];
				}
				if (cover) {
					presenceData.largeImageKey = document
						.querySelector("header")
						.style.backgroundImage.match(
							/(https:\/\/.+\.((png)|(jpg)|(jpeg)))/g
						)
						?.toString();
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
						document.querySelector<HTMLImageElement>(".event > img")?.src;
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
				presenceData.state = document.querySelector(
					".content-box .playlistTitle"
				)?.textContent;
				if (cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						".content-box .playlistImage"
					).src;
				}
				presenceData.buttons = [
					{
						label: "View Page",
						url: href,
					},
				];
				break;
			}
			case "settings": {
				presenceData.details = "Viewing settings";
				presenceData.state = document.querySelector(
					".navigation-item.selected"
				).textContent;
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing dashboard";
				presenceData.state =
					document.querySelector(".leaderboard-type").textContent;
				break;
			}
			case "": {
				presenceData.details = "Viewing dashboard";
				presenceData.state =
					document.querySelector(".leaderboard-type").textContent;
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
			case "followed": {
				presenceData.details = "Viewing their follows";
				break;
			}
		}
		if (
			document
				.querySelector<HTMLIFrameElement>("iframe")
				?.src.includes("replay.beatleader.xyz") &&
			replay.name
		) {
			presenceData.largeImageKey = cover ? replay.cover : Assets.Replay;
			presenceData.details = replay.name;
			presenceData.state = replay.playerName;
			presenceData.smallImageKey = replay.playing ? Assets.Play : Assets.Pause;
			presenceData.smallImageText = replay.playing ? "Playing" : "Paused";
			if (replay.playing) {
				const timestamps = presence.getTimestamps(
					presence.timestampFromFormat(replay.currentTime),
					presence.timestampFromFormat(replay.duration)
				);
				presenceData.endTimestamp = timestamps[1];
			}
			presenceData.buttons = [
				{
					label: "View Replay",
					url: document.querySelector<HTMLIFrameElement>("iframe").src,
				},
			];
		}
	}
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
