const presence = new Presence({
		clientId: "973729201104511007",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

interface Maps {
	city: boolean;
	id: number;
	map: string;
	largeImageKey: string;
	pvlargeImageKey: string | null;
	smallImageKey: string;
}

interface City {
	position?: number;
	map: string;
	largeImageKey: string;
	smallImageKey: string;
}

const map: Maps[] = [
		{
			city: true,
			id: 2,
			map: "Teyvat",
			largeImageKey: "teyvat_map",
			pvlargeImageKey: "teyvat_map",
			smallImageKey: "emblem_unknown",
		},
		{
			city: false,
			id: 7,
			map: "Enkanomiya",
			largeImageKey: "enkanomiya_map",
			pvlargeImageKey: "preview_enkanomiya",
			smallImageKey: "emblem_enkanomiya",
		},
		{
			city: false,
			id: 9,
			map: "The Chasm: Underground Mines",
			largeImageKey: "the_chasm_underground_mines_map",
			pvlargeImageKey: "preview_the_chasm_underground_mines",
			smallImageKey: "emblem_thechasm",
		},
		{
			city: false,
			id: 0,
			map: "Unknown",
			largeImageKey: "unknown_map",
			pvlargeImageKey: null,
			smallImageKey: "emblem_unknown",
		},
	],
	city: City[] = [
		{
			position: 1200,
			map: "Mondstadt",
			largeImageKey: "preview_mondstadt",
			smallImageKey: "emblem_mondstadt",
		},
		{
			position: 4000,
			map: "Liyue",
			largeImageKey: "preview_liyue",
			smallImageKey: "emblem_liyue",
		},
		{
			position: 9000,
			map: "Inazuma",
			largeImageKey: "preview_tenshukaku",
			smallImageKey: "emblem_inazuma",
		},
	];

let getpos: number, current: Maps, currentCity: City;

presence.on("UpdateData", async () => {
	const [showPreview, timestamps] = await Promise.all([
			presence.getSetting<boolean>("showPreview"),
			presence.getSetting<boolean>("timestamps"),
		]),
		presenceData: PresenceData = {
			details: "Genshin Impact Map",
			largeImageKey: "main",
			smallImageKey: "search",
			startTimestamp: browsingTimestamp,
		},
		{ hash, host, hostname, pathname, search } = document.location;
	switch (hostname) {
		case "genshin-impact-map.appsample.com":
			current = map.find(i =>
				i.map
					.toLowerCase()
					.includes(search?.split("?map=")[1].toLowerCase() || "teyvat")
			);
			break;
		case "mapgenie.io":
			if (pathname.split("/maps/")[1].toLowerCase() === "the-chasm-underground")
				current = map.find(i => i.id === 9);
			else {
				current = map.find(i =>
					i.map
						.toLowerCase()
						.includes(pathname?.split("/maps/")[1].toLowerCase() || "teyvat")
				);
			}
			break;
		default: // Official Site
			if (!hash.includes("&center=") && !hash.includes("&zoom=")) return;
			getpos = parseInt(
				hash.split("&center=")[1].split("&zoom=")[0].split(",")[0]
			);
			current = map.find(
				i => i.id === (parseInt(hash?.split("/map/")[1]?.split("?")[0]) || 2)
			);
			if (current?.city) currentCity = city.find(i => i.position > getpos);
			else currentCity = null;
			break;
	}
	if (!current) return;
	presenceData.details = current.map;
	presenceData.state = current.city && currentCity ? currentCity.map : null;
	presenceData.largeImageKey =
		showPreview && currentCity
			? currentCity.largeImageKey
			: showPreview
			? current.pvlargeImageKey
			: current.largeImageKey;
	presenceData.smallImageKey = current.city
		? currentCity
			? currentCity.smallImageKey
			: current.smallImageKey
		: current.smallImageKey;
	presenceData.smallImageText = host.replace(".com", "");
	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
