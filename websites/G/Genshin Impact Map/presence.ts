const presence = new Presence({
		clientId: "973729201104511007",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

interface Maps {
	city: boolean;
	id: number;
	map: string;
	key?: string[];
	image: {
		large: string;
		small: string;
		preview?: string | string[] | null;
	};
	starting?: number;
	ending?: number;
}

interface City {
	position?: number;
	map: string;
	image: {
		small: string;
		large?: string | null;
		preview: string | string[] | null;
	};
}

const map: Maps[] = [
		{
			city: true,
			id: 2,
			map: "Teyvat",
			image: {
				large: "teyvat_map",
				small: "emblem_unknown",
				preview: "teyvat_map",
			},
		},
		{
			city: false,
			id: 7,
			map: "Enkanomiya",
			image: {
				large: "enkanomiya_map",
				small: "emblem_enkanomiya",
				preview: "preview_enkanomiya",
			},
		},
		{
			city: false,
			id: 9,
			map: "The Chasm: Underground Mines",
			key: ["chasm", "the-chasm-underground"],
			image: {
				large: "the_chasm_underground_mines_map",
				small: "emblem_thechasm",
				preview: "preview_the_chasm_underground_mines",
			},
		},
		{
			// Event map 2.8
			// https://www.hoyolab.com/article/5958494/
			city: false,
			id: 12,
			map: "Golden Apple Archipelago",
			key: ["isles", "golden-apple-archipelago-2-8"],
			image: {
				large: "golden_apple_archipelago_map_2_8",
				small: "emblem_isles",
				preview: "preview_golden_apple_archipelago_2_8",
			},
			starting: 1657854000, // Fri, 15 Jul 2022 03:00 GMT
			ending: 1661295600, // Wed, 24 Aug 2022 23:00 GMT
		},
		{
			city: false,
			id: 0,
			map: "Unknown",
			image: {
				large: "unknown_map",
				small: "emblem_unknown",
			},
		},
	],
	city: City[] = [
		{
			position: 1200,
			map: "Mondstadt",
			image: {
				small: "emblem_mondstadt",
				preview: "preview_mondstadt",
			},
		},
		{
			position: 4000,
			map: "Liyue",
			image: {
				small: "emblem_liyue",
				preview: "preview_liyue",
			},
		},
		{
			position: 9000,
			map: "Inazuma",
			image: {
				small: "emblem_inazuma",
				preview: "preview_tenshukaku",
			},
		},
		{
			position: 0,
			map: "Sumeru",
			image: {
				large: "sumeru_map",
				small: "emblem_sumeru",
				preview: "preview_sumeru",
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
			largeImageKey: "main",
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
			if (current?.city) currentCity = city.find(i => i.position > getPosition);
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
		showPreview ? "preview" : "large",
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

function getImage(type: "large" | "preview", random?: boolean) {
	const currentImage = currentCity?.image ?? current.image;
	return (
		Array.isArray(currentImage[type]) && type === "preview"
			? currentImage[type][
					random ? Math.floor(randomNumber * currentImage[type].length) : 0
			  ]
			: currentImage[type] || current.image.large
	) as string;
}
