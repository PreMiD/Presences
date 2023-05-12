const presence = new Presence({
		clientId: "800702121866559508",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

enum Assets {
	Logo = "https://i.imgur.com/R29E1DX.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		privacy = await presence.getSetting<number>("privacy");
	let locationScript: {
			name: string | null;
			region: string | null;
			country: string | null;
		},
		locationTitle: string;
	if (
		document
			.querySelector("head")
			.childNodes[9]?.textContent.includes('country":')
	) {
		locationScript = JSON.parse(
			document
				.querySelector("head")
				.childNodes[9].textContent.replace(/(<!-- {2})|( -->)|( HOST: )/gm, "")
		);
	} else if (
		document
			.querySelector("head")
			.childNodes[10]?.textContent.includes('country":')
	) {
		locationScript = JSON.parse(
			document
				.querySelector("head")
				.childNodes[10].textContent.replace(/(<!-- {2})|( -->)|( HOST: )/gm, "")
		);
	} else locationScript = null;

	const search = document.querySelector<HTMLInputElement>(
		'[class="input white-text focus"]'
	);

	if (search?.value) {
		if (privacy === 2) {
			presenceData.details = "Zoekt naar";
			presenceData.state = search.value;
		} else presenceData.details = "Aan het zoeken";
		presenceData.smallImageKey = Assets.Search;
	} else if (locationScript === null) {
		if (pathname === "/") presenceData.details = "Bekijkt de home pagina";
		else presenceData.details = "Aan het browsen..";
	} else {
		locationTitle =
			privacy === 0
				? `Een locatie in ${locationScript.country}`
				: privacy === 1
				? `Een locatie in ${locationScript.region}`
				: privacy === 2
				? locationScript.name
				: "Een Privé locatie";

		presenceData.state = locationTitle;
		presenceData.smallImageKey = document
			.querySelector('[class="icon left"]')
			.getAttribute("src")
			.split("weather/")[1]
			.replace(".svg", "")
			.toLowerCase();
		if (
			document.querySelector('[class="ip-btn ip-active"]')?.textContent ??
			document.querySelector('[class="ip-btn"]')?.textContent !== "❚❚"
		)
			presenceData.details = "Bekijkt de weersverwachting voor";
		else presenceData.details = "Bekijkt de weersgrafiek voor";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
