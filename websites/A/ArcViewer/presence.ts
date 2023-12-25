const presence = new Presence({
		clientId: "939893132156366860",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.info("loaded");

let difficulty = "",
	characteristic = "",
	mapHash = "",
	uiState = "",
	replay = false,
	playerName = "",
	mapName = "",
	mapperName = "";

const enum Assets {
	Logo = "https://i.imgur.com/cAN8Mop.png",
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

presence.on("UpdateData", async () => {
	const [time, buttons, cover, mapSmallImages] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<number>("mapSmallImages"),
		]),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		logs = await presence.getLogs<string>();

	for (const line of logs) {
		if (line.startsWith("Current diff is ")) {
			characteristic = line
				.replace("Current diff is ", "")
				.split(", ")[0]
				.trim();
			difficulty = line.replace("Current diff is ", "").split(", ")[1].trim();
		}
		if (
			line.startsWith("Downloading map data from:") ||
			line.startsWith("Getting BeatSaver response for hash:")
		)
			mapHash = line.match(/[A-Za-z0-9]{40}/)[0];
		if (line.startsWith("UI state ")) uiState = line.split(" ")[2].trim();
		if (line.trim().startsWith("Loading difficulties asynchronously."))
			replay = false;
		if (line.trim().startsWith("Loading single difficulty for replay."))
			replay = true;
		if (line.startsWith("Loaded replay"))
			playerName = line.split(", played by ")[1].split(", with score ")[0];
		if (line.startsWith("Loaded info for ")) {
			mapName = line.split(" - ")[1].split(", mapped by ")[0];
			mapperName = line.split(", mapped by ")[1];
		}
	}

	if (uiState === "MapSelection")
		presenceData.details = "Selecting map or replay";
	else if (uiState === "Previewer") {
		presenceData.details = mapName;
		if (replay) presenceData.state = playerName;
		else presenceData.state = mapperName;
		if (mapSmallImages !== 3) {
			presenceData.smallImageText = `${
				mapSmallImages === 0 || mapSmallImages === 1 ? characteristic : ""
			} ${
				mapSmallImages === 0 || mapSmallImages === 2
					? difficulty.replace("Plus", "+")
					: ""
			}`;
			presenceData.smallImageKey =
				OtherAssets[
					`${
						mapSmallImages === 0 || mapSmallImages === 1 ? characteristic : ""
					}${
						mapSmallImages === 0 || mapSmallImages === 2 ? difficulty : ""
					}` as keyof typeof OtherAssets
				] ??
				OtherAssets[
					`Unknown${
						mapSmallImages === 0 || mapSmallImages === 2 ? difficulty : ""
					}` as keyof typeof OtherAssets
				];
		}
		if (cover && mapHash)
			presenceData.largeImageKey = `https://cdn.beatsaver.com/${mapHash}.jpg`;
		presenceData.buttons = [
			{
				label: "Preview Map",
				url: `https://allpoland.github.io/ArcViewer/?url=https://cdn.beatsaver.com/${mapHash}.zip`,
			},
		];
		if (replay) {
			presenceData.buttons.unshift({
				label: "View Replay",
				url: document.location.href,
			});
		}
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
