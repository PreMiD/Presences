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
	"360DegreeEasy" = "https://i.imgur.com/OjCC0a2.png",
	"360DegreeExpert" = "https://i.imgur.com/Yzo8x11.png",
	"360DegreeExpertPlus" = "https://i.imgur.com/hIVjHVn.png",
	"360DegreeHard" = "https://i.imgur.com/kDRa5yC.png",
	"360DegreeNormal" = "https://i.imgur.com/2B47zsQ.png",
	"360Degree" = "https://i.imgur.com/ZZIy47j.png",
	"90DegreeEasy" = "https://i.imgur.com/PyfCdsU.png",
	"90DegreeExpert" = "https://i.imgur.com/Oh4JK87.png",
	"90DegreeExpertPlus" = "https://i.imgur.com/w7Lrg26.png",
	"90DegreeHard" = "https://i.imgur.com/614eBsR.png",
	"90DegreeNormal" = "https://i.imgur.com/Lyinu0R.png",
	"90Degree" = "https://i.imgur.com/S1JazD5.png",
	LawlessEasy = "https://i.imgur.com/g89WIhy.png",
	LawlessExpert = "https://i.imgur.com/MwJO8XO.png",
	LawlessExpertPlus = "https://i.imgur.com/2Pkfbsz.png",
	LawlessHard = "https://i.imgur.com/zq7N05l.png",
	LawlessNormal = "https://i.imgur.com/Sm9lHhc.png",
	Lawless = "https://i.imgur.com/0S2j43F.png",
	LightshowEasy = "https://i.imgur.com/PdQg0hR.png",
	LightshowExpert = "https://i.imgur.com/XoOh1hC.png",
	LightshowExpertPlus = "https://i.imgur.com/1CEVUT6.png",
	LightshowHard = "https://i.imgur.com/ltthw6g.png",
	LightshowNormal = "https://i.imgur.com/AkFJbtq.png",
	Lightshow = "https://i.imgur.com/tttOnGz.png",
	LegacyEasy = "https://i.imgur.com/KvYCJE8.png",
	LegacyExpert = "https://i.imgur.com/GEEPOJ4.png",
	LegacyExpertPlus = "https://i.imgur.com/Di0s2HS.png",
	LegacyHard = "https://i.imgur.com/X8gYxVN.png",
	LegacyNormal = "https://i.imgur.com/cbfykqi.png",
	Legacy = "https://i.imgur.com/1Lstuag.png",
	NoArrowsEasy = "https://i.imgur.com/paIHyy8.png",
	NoArrowsExpert = "https://i.imgur.com/bDKWwVA.png",
	NoArrowsExpertPlus = "https://i.imgur.com/2qeKbua.png",
	NoArrowsHard = "https://i.imgur.com/a6CVhdU.png",
	NoArrowsNormal = "https://i.imgur.com/Uw6Ci9A.png",
	NoArrows = "https://i.imgur.com/gM9e7R1.png",
	OneSaberEasy = "https://i.imgur.com/3JR9H4i.png",
	OneSaberExpert = "https://i.imgur.com/OpdqBoF.png",
	OneSaberExpertPlus = "https://i.imgur.com/3FgTB6G.png",
	OneSaberHard = "https://i.imgur.com/VTLKvXF.png",
	OneSaberNormal = "https://i.imgur.com/6AhE9Oy.png",
	OneSaber = "https://i.imgur.com/a8pREAV.png",
	StandardEasy = "https://i.imgur.com/7jE3gMV.png",
	StandardExpert = "https://i.imgur.com/c5lpTfm.png",
	StandardExpertPlus = "https://i.imgur.com/aZyA5kb.png",
	StandardHard = "https://i.imgur.com/41pumvg.png",
	StandardNormal = "https://i.imgur.com/FqAg2k7.png",
	Standard = "https://i.imgur.com/u3Ou4UR.png",
	HorizontalEasy = "https://i.imgur.com/lncT4zk.png",
	HorizontalHard = "https://i.imgur.com/6XkP42A.png",
	HorizontalExpert = "https://i.imgur.com/Ou351KE.png",
	HorizontalNormal = "https://i.imgur.com/DKLAucj.png",
	HorizontalExpertPlus = "https://i.imgur.com/3DE6SMi.png",
	Horizontal = "https://i.imgur.com/fLOKnE8.png",
	VerticalHard = "https://i.imgur.com/AsV9wZe.png",
	VerticalEasy = "https://i.imgur.com/u3dmKMl.png",
	VerticalExpertPlus = "https://i.imgur.com/qPGRTN9.png",
	VerticalExpert = "https://i.imgur.com/zwAqCYc.png",
	VerticalNormal = "https://i.imgur.com/wyu0iqg.png",
	Vertical = "https://i.imgur.com/mAkXjis.png",
	InvertedExpert = "https://i.imgur.com/y7wGYhF.png",
	InvertedEasy = "https://i.imgur.com/QVYL77o.png",
	InvertedExpertPlus = "https://i.imgur.com/hycB834.png",
	InvertedNormal = "https://i.imgur.com/4nEmG4B.png",
	InvertedHard = "https://i.imgur.com/iQRzehc.png",
	Inverted = "https://i.imgur.com/Gerp2UQ.png",
	InverseHard = "https://i.imgur.com/JrwEETQ.png",
	InverseExpertPlus = "https://i.imgur.com/jkg9RlL.png",
	InverseEasy = "https://i.imgur.com/T92CGVQ.png",
	InverseExpert = "https://i.imgur.com/yMkb9pm.png",
	InverseNormal = "https://i.imgur.com/tGXJg2W.png",
	Inverse = "https://i.imgur.com/O4tKcYQ.png",
	RhythmGameStandardEasy = "https://i.imgur.com/8JBWLXV.png",
	RhythmGameStandardNormal = "https://i.imgur.com/tfWfN9F.png",
	RhythmGameStandardHard = "https://i.imgur.com/dAehTVk.png",
	RhythmGameStandardExpert = "https://i.imgur.com/jLgM1TI.png",
	RhythmGameStandardExpertPlus = "https://i.imgur.com/Kg70jNv.png",
	RhythmGameStandard = "https://i.imgur.com/pUmqXrE.png",
	"Standard-PinkPlay_ControllableEasy" = "https://i.imgur.com/txQ58Hb.png",
	"Standard-PinkPlay_ControllableNormal" = "https://i.imgur.com/UQItzOw.png",
	"Standard-PinkPlay_ControllableHard" = "https://i.imgur.com/oM2tIFX.png",
	"Standard-PinkPlay_ControllableExpert" = "https://i.imgur.com/W3i1ijv.png",
	"Standard-PinkPlay_ControllableExpertPlus" = "https://i.imgur.com/lNtoqI5.png",
	"Standard-PinkPlay_Controllable" = "https://i.imgur.com/GtkyTMP.png",
	"OneSaber-PinkPlay_ControllableEasy" = "https://i.imgur.com/6WC4TAs.png",
	"OneSaber-PinkPlay_ControllableNormal" = "https://i.imgur.com/cYWy2N7.png",
	"OneSaber-PinkPlay_ControllableHard" = "https://i.imgur.com/X9rAyum.png",
	"OneSaber-PinkPlay_ControllableExpert" = "https://i.imgur.com/J5e3rAr.png",
	"OneSaber-PinkPlay_ControllableExpertPlus" = "https://i.imgur.com/MBPSOmq.png",
	"OneSaber-PinkPlay_Controllable" = "https://i.imgur.com/1Lb0aA3.png",
	"Lawless-PinkPlay_ControllableEasy" = "https://i.imgur.com/N6DVXBa.png",
	"Lawless-PinkPlay_ControllableNormal" = "https://i.imgur.com/wpNPfTF.png",
	"Lawless-PinkPlay_ControllableHard" = "https://i.imgur.com/gcHz84A.png",
	"Lawless-PinkPlay_ControllableExpert" = "https://i.imgur.com/ZbNQqCe.png",
	"Lawless-PinkPlay_ControllableExpertPlus" = "https://i.imgur.com/SEp8fm5.png",
	"Lawless-PinkPlay_Controllable" = "https://i.imgur.com/MoNRVVD.png",
	Easy = "https://i.imgur.com/fNND69T.png",
	Expert = "https://i.imgur.com/Zy5kVyl.png",
	ExpertPlus = "https://i.imgur.com/yxPfNmQ.png",
	Hard = "https://i.imgur.com/cSexHo3.png",
	Normal = "https://i.imgur.com/uWBt3mb.png",
	UnknownEasy = "https://i.imgur.com/X2g8nos.png",
	UnknownExpert = "https://i.imgur.com/tvdwov1.png",
	UnknownExpertPlus = "https://i.imgur.com/tDsfuAG.png",
	UnknownHard = "https://i.imgur.com/0jTbumO.png",
	UnknownNormal = "https://i.imgur.com/1vbCA1u.png",
	Unknown = "https://i.imgur.com/B7aVigy.png",
}

function simplifyKey(key: string): string {
	let result = key;
	if (key.match(/^(Horizontal|Vertical|Inverted|Inverse)/))
		result = result.replace(/Lawless|OneSaber|NoArrows|Standard|Legacy/, "");
	if (
		key.match(
			/^(360Degree|90Degree|NoArrows|Lightshow|Legacy)-PinkPlay_Controllable/
		)
	)
		result = result.replace("-PinkPlay_Controllable", "");
	if (key.startsWith("Generated")) result = result.replace("Generated", "");
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
