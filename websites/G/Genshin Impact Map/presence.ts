const presence = new Presence({
		clientId: "973729201104511007",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

interface Maps {
	city: boolean;
	hylid: number;
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
			hylid: 2,
			map: "Teyvat",
			largeImageKey: "teyvat_map",
			pvlargeImageKey: "teyvat_map",
			smallImageKey: "emblem_unknown",
		},
		{
			city: false,
			hylid: 7,
			map: "Enkanomiya",
			largeImageKey: "enkanomiya_map",
			pvlargeImageKey: "preview_enkanomiya",
			smallImageKey: "emblem_enkanomiya",
		},
		{
			city: false,
			hylid: 9,
			map: "The Chasm: Underground Mines",
			largeImageKey: "the_chasm_underground_mines_map",
			pvlargeImageKey: "preview_the_chasm_underground_mines",
			smallImageKey: "emblem_thechasm",
		},
		{
			city: false,
			hylid: 0,
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
		path = document.location.href;
	switch (document.location.hostname) {
		case "genshin-impact-map.appsample.com":
			current = map.find(
				i =>
					i.map
						.toLowerCase()
						.includes(
							document
								.querySelector("#map-selector-btn > strong > p")
								.textContent.toLowerCase()
						) ||
					i.map.toLowerCase().includes(path.split("?map=")[1] || "Teyvat")
			);
			break;
		case "mapgenie.io":
			if (path.split("/maps/")[1].toLowerCase() === "the-chasm-underground")
				current = map.find(i => i.hylid === 9);
			else {
				current = map.find(i =>
					i.map.toLowerCase().includes(path.split("/maps/")[1].toLowerCase())
				);
			}
			break;
		default: // Official Site
			if (!path.includes("&center=") && !path.includes("&zoom=")) return;
			getpos = parseInt(
				path.split("&center=")[1].split("&zoom=")[0].split(",")[0]
			);
			current = map.find(
				i => i.hylid === parseInt(path.split("/map/")[1].split("?")[0]) || 0
			);
			if (current.city) currentCity = city.find(i => i.position > getpos);
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
	presenceData.smallImageText = document.location.host.replace(".com", "");
	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
