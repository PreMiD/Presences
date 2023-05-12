const presence = new Presence({
	clientId: "813110347165728849",
});

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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/HWwm0q0.png",
		buttons: [{ label: "Pagina bekijken", url: document.location.href }],
	};
	presenceData.details = "Bladert op bol.com";
	presenceData.state = `Pagina '${
		document.title.replace("| ", "|").replace(" |", "|").split("|")[1]
	}'`;
	if (document.querySelector<HTMLInputElement>("#searchfor").textContent) {
		presenceData.details = "Zoekt voor:";
		presenceData.state =
			document.querySelector<HTMLInputElement>("#searchfor").textContent;
		presenceData.smallImageKey = Assets.Search;
	} else if (
		document.location.pathname === "/" ||
		document.location.pathname === "/nl/"
	)
		presenceData.state = "Startpagina";
	else if (
		document.querySelector(
			"#mainContent > div > div.constrain.u-pb--m > div.pdp-header.slot.slot--pdp-header.js_slot-title > h1 > span"
		)
	) {
		presenceData.largeImageKey =
			document.querySelector<HTMLMetaElement>('meta[property="og:image"]')
				?.content ?? "bol";
		presenceData.details = `Bekijkt '${
			document.querySelector(
				"#mainContent > div > div.constrain.u-pb--m > div.pdp-header.slot.slot--pdp-header.js_slot-title > h1 > span"
			).textContent
		}'`;
		presenceData.state = `In ${
			document.querySelector("#option_block_4").lastElementChild
				.lastElementChild.textContent
		}`;
		presenceData.buttons = [
			{ label: "Product bekijken", url: document.location.href },
		];
	} else if (
		document.querySelector("h1[class*=bol_header][data-test*=page-title]")
	) {
		presenceData.details = `Bekijkt ${
			document.querySelector("h1[class*=bol_header][data-test*=page-title]")
				.textContent
		}`;
		delete presenceData.state;
		presenceData.buttons = [
			{ label: "Categorie bekijken", url: document.location.href },
		];
	} else if (document.location.pathname.toLowerCase().includes("basket"))
		presenceData.details = "Bekijkt winkelwagentje";
	else if (document.location.pathname.toLowerCase().includes("lijstje"))
		presenceData.details = "Bekijkt verlanglijstje";
	else if (document.location.pathname.toLowerCase().includes("order"))
		presenceData.details = "Bestelt iets";
	else if (document.location.pathname.toLowerCase().includes("bestellingen"))
		presenceData.details = "Bekijkt bestellingen";
	else if (document.location.pathname.toLowerCase().includes("account"))
		presenceData.details = "Beheert account";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
