const presence = new Presence({
		clientId: "973729201104511007"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	maps = [
		{
			city: true,
			hylid: 2,
			map: "Teyvat",
			largeImageKey: "teyvat_map",
			pvlargeImageKey: "teyvat_map",
			smallImageKey: "emblem_unknown"
		},
		{
			city: false,
			hylid: 7,
			map: "Enkanomiya",
			largeImageKey: "enkanomiya_map",
			pvlargeImageKey: "preview_enkanomiya",
			smallImageKey: "emblem_enkanomiya"
		},
		{
			city: false,
			hylid: 9,
			map: "The Chasm: Underground Mines",
			largeImageKey: "the_chasm_underground_mines_map",
			pvlargeImageKey: "preview_the_chasm_underground_mines",
			smallImageKey: "emblem_thechasm"
		},
		{
			city: false,
			hylid: 0,
			map: "Unknown",
			largeImageKey: "unknown_map",
			pvlargeImageKey: null,
			smallImageKey: "emblem_unknown"
		}
	],
	city = [
		{
			position: [1200],
			map: "Mondstadt",
			largeImageKey: "preview_mondstadt",
			smallImageKey: "emblem_mondstadt"
		},
		{
			position: [4000],
			map: "Liyue",
			largeImageKey: "preview_liyue",
			smallImageKey: "emblem_liyue"
		},
		{
			position: [9000],
			map: "Inazuma",
			largeImageKey: "preview_tenshukaku",
			smallImageKey: "emblem_inazuma"
		}
		// { position: [], map: "Sumeru", largeImageKey: "", smallImageKey: "" }
	];

let getpos: number,
	current: {
		city: boolean;
		hylid: number;
		map: string;
		largeImageKey: string;
		pvlargeImageKey: string | null;
		smallImageKey: string;
	},
	currentcity: {
		position?: number[];
		map: string;
		largeImageKey: string;
		smallImageKey: string;
	};

presence.on("UpdateData", async () => {
	const [showepreview, timestamps] = await Promise.all([
			presence.getSetting<boolean>("showepreview"),
			presence.getSetting<boolean>("timestamps")
		]),
		presenceData: PresenceData = {
			details: "Genshin Impact Map",
			largeImageKey: "main",
			smallImageKey: "search",
			startTimestamp: browsingTimestamp
		},
		path = document.location.toString().split("/");
	switch (document.location.hostname) {
		case "genshin-impact-map.appsample.com":
			current =
				maps.find(i =>
					i.map
						.toLowerCase()
						.includes(
							document
								.querySelector("#map-selector-btn > strong > p")
								.textContent.toLowerCase()
						)
				) ??
				maps.find(
					i =>
						i.map.toLowerCase().includes(path[3].split("?map=")[1]) ||
						i.hylid === 2
				);
			break;
		case "mapgenie.io":
			if (
				document.location.href.split("/maps/")[1].toLowerCase() ===
				"the-chasm-underground"
			)
				current = maps.find(i => i.hylid === 9);
			else {
				current = maps.find(i =>
					i.map
						.toLowerCase()
						.includes(document.location.href.split("/maps/")[1].toLowerCase())
				);
			}
			break;
		default: // Official Site
			if (
				!document.location.href.includes("&center=") &&
				!document.location.href.includes("&zoom=")
			)
				return;
			// pos[0].split(",").map(i => Number(i))
			getpos = parseInt(
				document.location.href
					.split("&center=")[1]
					.split("&zoom=")[0]
					.split(",")[0]
			);
			current = maps.find(
				i =>
					i.hylid ===
						parseInt(document.location.href.split("/map/")[1].split("?")[0]) ||
					0
			);
			if (current.city) {
				currentcity = city.find(
					i =>
						i.position.reduce((prev, curr) =>
							Math.abs(curr - getpos) < Math.abs(prev - getpos) ? curr : prev
						) > getpos
				);
			} else currentcity = null;
			break;
	}
	if (!current) return;
	presenceData.details = current.map;
	presenceData.state = current.city && currentcity ? currentcity.map : null;
	presenceData.largeImageKey =
		showepreview && currentcity
			? currentcity.largeImageKey
			: showepreview
			? current.pvlargeImageKey
			: current.largeImageKey;
	presenceData.smallImageKey = current.city
		? currentcity
			? currentcity.smallImageKey
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
