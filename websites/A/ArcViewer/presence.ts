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
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/logo.png",
}

enum OtherAssets {
	"360DegreeEasy" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/0.png",
	"360DegreeExpert" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/1.png",
	"360DegreeExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/2.png",
	"360DegreeHard" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/3.png",
	"360DegreeNormal" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/4.png",
	"360Degree" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/5.png",
	"90DegreeEasy" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/6.png",
	"90DegreeExpert" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/7.png",
	"90DegreeExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/8.png",
	"90DegreeHard" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/9.png",
	"90DegreeNormal" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/10.png",
	"90Degree" = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/11.png",
	LawlessEasy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/12.png",
	LawlessExpert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/13.png",
	LawlessExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/14.png",
	LawlessHard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/15.png",
	LawlessNormal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/16.png",
	Lawless = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/17.png",
	LightshowEasy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/18.png",
	LightshowExpert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/19.png",
	LightshowExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/20.png",
	LightshowHard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/21.png",
	LightshowNormal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/22.png",
	Lightshow = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/23.png",
	LegacyEasy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/24.png",
	LegacyExpert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/25.png",
	LegacyExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/26.png",
	LegacyHard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/27.png",
	LegacyNormal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/28.png",
	Legacy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/29.png",
	NoArrowsEasy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/30.png",
	NoArrowsExpert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/31.png",
	NoArrowsExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/32.png",
	NoArrowsHard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/33.png",
	NoArrowsNormal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/34.png",
	NoArrows = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/35.png",
	OneSaberEasy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/36.png",
	OneSaberExpert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/37.png",
	OneSaberExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/38.png",
	OneSaberHard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/39.png",
	OneSaberNormal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/40.png",
	OneSaber = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/41.png",
	StandardEasy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/42.png",
	StandardExpert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/43.png",
	StandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/44.png",
	StandardHard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/45.png",
	StandardNormal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/46.png",
	Standard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/47.png",
	Easy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/48.png",
	Expert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/49.png",
	ExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/50.png",
	Hard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/51.png",
	Normal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/52.png",
	UnknownEasy = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/53.png",
	UnknownExpert = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/54.png",
	UnknownExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/55.png",
	UnknownHard = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/56.png",
	UnknownNormal = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/57.png",
	Unknown = "https://cdn.rcd.gg/PreMiD/websites/A/ArcViewer/assets/58.png",
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
