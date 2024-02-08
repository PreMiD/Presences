const presence = new Presence({
		clientId: "973729201104511007",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	EmblemMondstadt = "https://cdn.discordapp.com/app-assets/973729201104511007/973795983420977223.png?size=512",
	EmblemLiyue = "https://cdn.discordapp.com/app-assets/973729201104511007/973796136949280788.png?size=512",
	EmblemInazuma = "https://cdn.discordapp.com/app-assets/973729201104511007/973797157205323846.png?size=512",
	EmblemUnknown = "https://cdn.discordapp.com/app-assets/973729201104511007/973798500317921280.png?size=512",
	EnkanomiyaMap = "https://cdn.discordapp.com/app-assets/973729201104511007/973904146602278932.png?size=512",
	TeyvatMap = "https://cdn.discordapp.com/app-assets/973729201104511007/973904359400292402.png?size=512",
	TheChasmUndergroundMinesMap = "https://cdn.discordapp.com/app-assets/973729201104511007/973904999669202964.png?size=512",
	EmblemEnkanomiya = "https://cdn.discordapp.com/app-assets/973729201104511007/973924918913806356.png?size=512",
	EmblemThechasm = "https://cdn.discordapp.com/app-assets/973729201104511007/973924919056433172.png?size=512",
	PreviewMondstadt = "https://cdn.discordapp.com/app-assets/973729201104511007/973948984219557928.png?size=512",
	PreviewLiyue = "https://cdn.discordapp.com/app-assets/973729201104511007/973948985221992498.png?size=512",
	PreviewTenshukaku = "https://cdn.discordapp.com/app-assets/973729201104511007/973950153604087948.png?size=512",
	PreviewTheChasmUndergroundMines = "https://cdn.discordapp.com/app-assets/973729201104511007/973954373019381840.png?size=512",
	PreviewGoldenAppleArchipelago28 = "https://cdn.discordapp.com/app-assets/973729201104511007/997328289586753637.png?size=512",
	GoldenAppleArchipelagoMap28 = "https://cdn.discordapp.com/app-assets/973729201104511007/997330298771611810.png?size=512",
	PreviewEnkanomiya = "https://cdn.discordapp.com/app-assets/973729201104511007/997331604668153976.png?size=512",
	EmblemIsles = "https://cdn.discordapp.com/app-assets/973729201104511007/1000432365652418592.png?size=512",
	EmblemSumeru = "https://cdn.discordapp.com/app-assets/973729201104511007/1011656257465225216.png?size=512",
	PreviewSumeru = "https://cdn.discordapp.com/app-assets/973729201104511007/1011656919028609064.png?size=512",
	PreviewSumeru2 = "https://cdn.rcd.gg/PreMiD/websites/G/Genshin%20Impact%20Map/assets/0.png",
	Logo =
	"https://cdn.rcd.gg/PreMiD/websites/G/Genshin%20Impact%20Map/assets/logo.png",
}

interface Maps extends Image {
	id: number;
	map: string;
	key?: string[];
	city?: boolean;
	starting?: number;
	ending?: number;
}

interface City extends Image {
	position: number;
	map: string;
}

interface Image {
	image: {
		small: string;
		default: string;
		preview?: string | string[];
	};
}

const map: Maps[] = [
		{
			id: 2,
			map: "Teyvat",
			city: true,
			image: {
				small: Assets.EmblemUnknown,
				default: Assets.TeyvatMap,
				preview: Assets.TeyvatMap,
			},
		},
		{
			id: 7,
			map: "Enkanomiya",
			image: {
				small: Assets.EmblemEnkanomiya,
				default: Assets.EnkanomiyaMap,
				preview: Assets.PreviewEnkanomiya,
			},
		},
		{
			id: 9,
			map: "The Chasm: Underground Mines",
			key: ["chasm", "the-chasm-underground"],
			image: {
				small: Assets.EmblemThechasm,
				default: Assets.TheChasmUndergroundMinesMap,
				preview: Assets.PreviewTheChasmUndergroundMines,
			},
		},
		{
			// Event map 2.8
			// https://www.hoyolab.com/article/5958494/
			id: 12,
			map: "Golden Apple Archipelago",
			key: ["isles", "golden-apple-archipelago-2-8"],
			image: {
				small: Assets.EmblemIsles,
				default: Assets.GoldenAppleArchipelagoMap28,
				preview:Assets.PreviewGoldenAppleArchipelago28,
			},
			starting: 1657854000, // Fri, 15 Jul 2022 03:00 GMT
			ending: 1661295600, // Wed, 24 Aug 2022 23:00 GMT
		},
		{
			id: 0,
			map: "Unknown",
			image: {
				small: Assets.EmblemUnknown,
				default: Assets.EmblemUnknown,
			},
		},
	],
	city: City[] = [
		{
			position: 1200,
			map: "Mondstadt",
			image: {
				small: Assets.EmblemMondstadt,
				default: Assets.PreviewMondstadt,
				preview: Assets.PreviewMondstadt,
			},
		},
		{
			position: 2500,
			map: "Liyue",
			image: {
				small: Assets.EmblemLiyue,
				default: Assets.PreviewLiyue,
				preview: Assets.PreviewLiyue,
			},
		},
		{
			position: 5000,
			map: "Sumeru",
			image: {
				small: Assets.EmblemSumeru,
				default: Assets.PreviewSumeru,
				preview: [
					Assets.PreviewSumeru,
					Assets.PreviewSumeru2,
				],
			},
		},
		{
			position: 9000,
			map: "Inazuma",
			image: {
				small: Assets.EmblemInazuma,
				default: Assets.PreviewTenshukaku,
				preview: Assets.PreviewTenshukaku,
			},
		},
	];

let oldMap: string,
	current: Maps,
	currentCity: City,
	getPosition: number,
	randomNumber: number;

presence.on("UpdateData", async () => {
	const [timestamps, showPreview, randomPreview] = await Promise.all([
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("showPreview"),
			presence.getSetting<boolean>("randomPreview"),
		]),
		presenceData: PresenceData = {
			details: "Genshin Impact Map",
			largeImageKey: Assets.Logo,
			smallImageKey: Assets.Search,
			startTimestamp: browsingTimestamp,
		},
		{ hash, host, hostname, pathname, search } = document.location,
		searchParams = new URLSearchParams(search);

	if (hostname === "mapgenie.io" && !pathname.includes("genshin-impact"))
		return;
	switch (hostname) {
		case "genshin-impact-map.appsample.com":
			current = map.find(
				i =>
					i.key?.includes(searchParams.get("map")?.toLowerCase()) ??
					i.map
						.toLowerCase()
						.includes(searchParams.get("map")?.toLowerCase() || "teyvat")
			);
			break;
		case "mapgenie.io":
			current = map.find(
				i =>
					i.key?.includes(pathname?.split("/maps/")[1]?.toLowerCase()) ??
					i.map
						.toLowerCase()
						.includes(pathname?.split("/maps/")[1]?.toLowerCase() || "teyvat")
			);
			break;
		default: // Official Site
			if (pathname.includes("signin-sea")) return;
			current = map.find(
				i => i.id === (parseInt(hash?.split("/map/")[1]?.split("?")[0]) || 2)
			);
			getPosition = parseInt(new URLSearchParams(hash).get("center"));
			if (current?.city)
				currentCity = city.find(i => i.position >= getPosition);
			else currentCity = null;
			break;
	}
	if (!current) return;
	if (oldMap !== (currentCity?.map ?? current.map)) {
		oldMap = currentCity?.map ?? current.map;
		randomNumber = Math.random();
	}
	if (
		current.starting &&
		current.ending &&
		!(
			current.starting < Date.now() / 1000 && current.ending > Date.now() / 1000
		)
	)
		current = map[0];
	else if (
		(current.starting || current.ending) &&
		!(
			current.starting < Date.now() / 1000 || current.ending > Date.now() / 1000
		)
	)
		current = map[0];
	presenceData.details = current.map;
	presenceData.state = current.city && currentCity ? currentCity.map : null;
	presenceData.largeImageKey = getImage(
		showPreview ? "preview" : "default",
		randomPreview
	);
	presenceData.smallImageKey =
		current.city && currentCity ? currentCity.image.small : current.image.small;
	presenceData.smallImageText = host.replace(".com", "");
	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

function getImage(type: "default" | "preview", random?: boolean) {
	const currentImage = currentCity?.image ?? current.image;
	return (
		Array.isArray(currentImage[type]) && type === "preview"
			? currentImage[type][
					random ? Math.floor(randomNumber * currentImage[type].length) : 0
			  ]
			: currentImage[type] || current.image.default
	) as string;
}
