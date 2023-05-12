const presence = new Presence({
		clientId: "973729201104511007",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
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
				small: "emblem_unknown",
				default: "teyvat_map",
				preview: "teyvat_map",
			},
		},
		{
			id: 7,
			map: "Enkanomiya",
			image: {
				small: "emblem_enkanomiya",
				default: "enkanomiya_map",
				preview: "preview_enkanomiya",
			},
		},
		{
			id: 9,
			map: "The Chasm: Underground Mines",
			key: ["chasm", "the-chasm-underground"],
			image: {
				small: "emblem_thechasm",
				default: "the_chasm_underground_mines_map",
				preview: "preview_the_chasm_underground_mines",
			},
		},
		{
			// Event map 2.8
			// https://www.hoyolab.com/article/5958494/
			id: 12,
			map: "Golden Apple Archipelago",
			key: ["isles", "golden-apple-archipelago-2-8"],
			image: {
				small: "emblem_isles",
				default: "golden_apple_archipelago_map_2_8",
				preview: "preview_golden_apple_archipelago_2_8",
			},
			starting: 1657854000, // Fri, 15 Jul 2022 03:00 GMT
			ending: 1661295600, // Wed, 24 Aug 2022 23:00 GMT
		},
		{
			id: 0,
			map: "Unknown",
			image: {
				small: "emblem_unknown",
				default: "unknown_map",
			},
		},
	],
	city: City[] = [
		{
			position: 1200,
			map: "Mondstadt",
			image: {
				small: "emblem_mondstadt",
				default: "preview_mondstadt",
				preview: "preview_mondstadt",
			},
		},
		{
			position: 2500,
			map: "Liyue",
			image: {
				small: "emblem_liyue",
				default: "preview_liyue",
				preview: "preview_liyue",
			},
		},
		{
			position: 5000,
			map: "Sumeru",
			image: {
				small: "emblem_sumeru",
				default: "preview_sumeru",
				preview: ["preview_sumeru", "https://i.imgur.com/23Sw1VR.png"],
			},
		},
		{
			position: 9000,
			map: "Inazuma",
			image: {
				small: "emblem_inazuma",
				default: "preview_tenshukaku",
				preview: "preview_tenshukaku",
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
			largeImageKey: "https://i.imgur.com/6XrkcZs.png",
			smallImageKey: "search",
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
