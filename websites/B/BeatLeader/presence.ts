const presence = new Presence({
		clientId: "939893188448104468",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/logo.png",
	Replay = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/0.png",
}

enum OtherAssets {
	"360DegreeEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/1.png",
	"360DegreeExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/2.png",
	"360DegreeExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/3.png",
	"360DegreeHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/4.png",
	"360DegreeNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/5.png",
	"90DegreeEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/6.png",
	"90DegreeExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/7.png",
	"90DegreeExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/8.png",
	"90DegreeHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/9.png",
	"90DegreeNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/10.png",
	Generated360DegreeEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/1.png",
	Generated360DegreeExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/2.png",
	Generated360DegreeExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/3.png",
	Generated360DegreeHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/4.png",
	Generated360DegreeNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/5.png",
	Generated90DegreeEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/6.png",
	Generated90DegreeExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/7.png",
	Generated90DegreeExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/8.png",
	Generated90DegreeHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/9.png",
	Generated90DegreeNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/10.png",
	LawlessEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/11.png",
	LawlessExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/12.png",
	LawlessExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/13.png",
	LawlessHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/14.png",
	LawlessNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/15.png",
	LightshowEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/16.png",
	LightshowExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/17.png",
	LightshowExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/18.png",
	LightshowHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/19.png",
	LightshowNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/20.png",
	NoArrowsEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/21.png",
	NoArrowsExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/22.png",
	NoArrowsExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/23.png",
	NoArrowsHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/24.png",
	NoArrowsNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/25.png",
	OneSaberEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/26.png",
	OneSaberExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/27.png",
	OneSaberExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/28.png",
	OneSaberHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/29.png",
	OneSaberNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/30.png",
	StandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/31.png",
	StandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/32.png",
	StandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/33.png",
	StandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/34.png",
	StandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/35.png",
	HorizontalStandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/36.png",
	HorizontalStandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/37.png",
	HorizontalStandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/38.png",
	HorizontalStandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/39.png",
	HorizontalStandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/40.png",
	VerticalStandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/41.png",
	VerticalStandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/42.png",
	VerticalStandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/43.png",
	VerticalStandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/44.png",
	VerticalStandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/45.png",
	InvertedStandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/46.png",
	InvertedStandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/47.png",
	InvertedStandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/48.png",
	InvertedStandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/49.png",
	InvertedStandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/50.png",
	InverseStandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/51.png",
	InverseStandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/52.png",
	InverseStandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/53.png",
	InverseStandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/54.png",
	InverseStandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/55.png",
	HorizontalLawlessEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/36.png",
	HorizontalLawlessHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/37.png",
	HorizontalLawlessExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/38.png",
	HorizontalLawlessNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/39.png",
	HorizontalLawlessExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/40.png",
	VerticalLawlessHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/41.png",
	VerticalLawlessEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/42.png",
	VerticalLawlessExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/43.png",
	VerticalLawlessExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/44.png",
	VerticalLawlessNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/45.png",
	InvertedLawlessExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/46.png",
	InvertedLawlessEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/47.png",
	InvertedLawlessExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/48.png",
	InvertedLawlessNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/49.png",
	InvertedLawlessHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/50.png",
	InverseLawlessHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/51.png",
	InverseLawlessExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/52.png",
	InverseLawlessEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/53.png",
	InverseLawlessExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/54.png",
	InverseLawlessNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/55.png",
	HorizontalNoArrowsEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/36.png",
	HorizontalNoArrowsHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/37.png",
	HorizontalNoArrowsExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/38.png",
	HorizontalNoArrowsNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/39.png",
	HorizontalNoArrowsExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/40.png",
	VerticalNoArrowsHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/41.png",
	VerticalNoArrowsEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/42.png",
	VerticalNoArrowsExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/43.png",
	VerticalNoArrowsExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/44.png",
	VerticalNoArrowsNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/45.png",
	InvertedNoArrowsExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/46.png",
	InvertedNoArrowsEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/47.png",
	InvertedNoArrowsExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/48.png",
	InvertedNoArrowsNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/49.png",
	InvertedNoArrowsHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/50.png",
	InverseNoArrowsHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/51.png",
	InverseNoArrowsExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/52.png",
	InverseNoArrowsEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/53.png",
	InverseNoArrowsExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/54.png",
	InverseNoArrowsNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/55.png",
	HorizontalOneSaberEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/36.png",
	HorizontalOneSaberHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/37.png",
	HorizontalOneSaberExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/38.png",
	HorizontalOneSaberNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/39.png",
	HorizontalOneSaberExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/40.png",
	VerticalOneSaberHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/41.png",
	VerticalOneSaberEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/42.png",
	VerticalOneSaberExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/43.png",
	VerticalOneSaberExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/44.png",
	VerticalOneSaberNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/45.png",
	InvertedOneSaberExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/46.png",
	InvertedOneSaberEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/47.png",
	InvertedOneSaberExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/48.png",
	InvertedOneSaberNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/49.png",
	InvertedOneSaberHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/50.png",
	InverseOneSaberHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/51.png",
	InverseOneSaberExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/52.png",
	InverseOneSaberEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/53.png",
	InverseOneSaberExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/54.png",
	InverseOneSaberNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/55.png",
	RhythmGameStandardEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/56.png",
	RhythmGameStandardNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/57.png",
	RhythmGameStandardHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/58.png",
	RhythmGameStandardExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/59.png",
	RhythmGameStandardExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/60.png",
	"Standard-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/61.png",
	"Standard-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/62.png",
	"Standard-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/63.png",
	"Standard-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/64.png",
	"Standard-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/65.png",
	"OneSaber-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/66.png",
	"OneSaber-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/67.png",
	"OneSaber-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/68.png",
	"OneSaber-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/69.png",
	"OneSaber-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/70.png",
	"Lawless-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/71.png",
	"Lawless-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/72.png",
	"Lawless-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/73.png",
	"Lawless-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/74.png",
	"Lawless-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/75.png",
	"360Degree-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/1.png",
	"360Degree-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/2.png",
	"360Degree-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/3.png",
	"360Degree-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/4.png",
	"360Degree-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/5.png",
	"90Degree-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/6.png",
	"90Degree-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/7.png",
	"90Degree-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/8.png",
	"90Degree-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/9.png",
	"90Degree-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/10.png",
	"Lightshow-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/16.png",
	"Lightshow-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/17.png",
	"Lightshow-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/18.png",
	"Lightshow-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/19.png",
	"Lightshow-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/20.png",
	"NoArrows-PinkPlay_ControllableEasy" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/21.png",
	"NoArrows-PinkPlay_ControllableExpert" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/22.png",
	"NoArrows-PinkPlay_ControllableExpertPlus" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/23.png",
	"NoArrows-PinkPlay_ControllableHard" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/24.png",
	"NoArrows-PinkPlay_ControllableNormal" = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/25.png",
	undefinedEasy = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/31.png",
	undefinedExpert = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/32.png",
	undefinedExpertPlus = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/33.png",
	undefinedHard = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/34.png",
	undefinedNormal = "https://cdn.rcd.gg/PreMiD/websites/B/BeatLeader/assets/35.png",
}

presence.info("Presence loaded");

let replay = {
	name: "",
	subName: "",
	currentTime: "",
	playing: false,
	duration: "",
	playerName: "",
	cover: "",
};

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
				const previewURL = new URL(
					document.querySelector<HTMLAnchorElement>(
						'a[href^="https://allpoland.github.io"]'
					)?.href
				);
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
					OtherAssets[
						`${previewURL.searchParams.get(
							"mode"
						)}${previewURL.searchParams.get(
							"difficulty"
						)}` as keyof typeof OtherAssets
					] ??
					OtherAssets[
						`undefined${previewURL.searchParams.get(
							"difficulty"
						)}` as keyof typeof OtherAssets
					];
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
			case "settings": {
				presenceData.details = "Viewing settings";
				presenceData.state = document.querySelector(
					".navigation-item.selected"
				).textContent;
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing dashboard";
				break;
			}
			case "": {
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
	} else if (hostname.split(".")[0] === "replay") {
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
	}
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
