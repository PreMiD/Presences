const presence = new Presence({
		clientId: "811572600294735902",
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
let search: HTMLInputElement, title: Element;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/K0yeNeC.png",
			startTimestamp: browsingTimestamp,
		},
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, hostname, href } = document.location,
		active = document.querySelector("[class='hz-TabNext hz-TabNext--active']");
	if (privacy) presenceData.details = "Aan het browsen";
	else if (hostname === "www.marktplaats.nl") {
		search = document.querySelector('[data-role="searchForm-autocomplete"]');
		if (search?.value) {
			const script = JSON.parse(
				document.querySelector("[type='application/ld+json']").textContent
			).itemListElement[1].name;
			if (pathname.includes("/q/") && search?.value === script) {
				presenceData.details = "Bekijkt resultaten voor:";
				presenceData.state = script;
			} else {
				presenceData.details = "Zoekt naar:";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			}
		} else if (pathname === "/") presenceData.details = "Homepagina";
		else if (pathname.includes("/plaats")) {
			presenceData.state = "Verkoop een Artikel";
			presenceData.smallImageKey = Assets.Writing;
		} else if (pathname.includes("/auto-kopen"))
			presenceData.details = `Bekijkt ${active.textContent}`;
		else if (pathname.includes("/cp/")) {
			presenceData.buttons = [
				{
					label: "Bekijk Categorie",
					url: href,
				},
			];
			presenceData.details = document.querySelector(
				"[class='CategoryBreadcrumbs-categoryTitle']"
			).textContent;
			presenceData.state = active.textContent;
		} else if (pathname.includes("/l/")) {
			presenceData.details = "Bekijkt categorie";
			presenceData.state = document
				.querySelector(
					"#content > div.mp-Page-element.mp-Page-element--full-width.mp-Page-element--breadCrumbAndSaveSearch > div.mp-Nav-breadcrumb"
				)
				.lastChild.textContent.replace(/[0-9]*.[0-9]* resultaten/gm, "")
				.trim();
		} else if (pathname.includes("/v/")) {
			presenceData.buttons = [
				{
					label: "Bekijk Product",
					url: href,
				},
			];
			const product = JSON.parse(
				document.querySelectorAll("[type='application/ld+json']")[1].textContent
			).name.toLowerCase();
			presenceData.details = "Bekijkt product";
			presenceData.state = `${product
				.charAt(0)
				.toUpperCase()}${product.substring(1)}`;
		} else if (pathname.includes("/u/")) {
			presenceData.details = "Bekijkt gebruiker";
			presenceData.state = document.querySelector(
				'[class="mp-TopSection-TitleWrap-Name"]'
			).textContent;
		} else if (pathname.includes("/messages")) {
			const adCheck = document.querySelector(
				'[class="AdvertisementSnippetMolecule-title"]'
			);
			if (
				document.querySelector<HTMLInputElement>('[data-sem="sendMessageText"]')
					?.textContent
			) {
				presenceData.smallImageKey = Assets.Writing;
				presenceData.details = "Schrijft bericht naar verkoper over";
			} else {
				presenceData.smallImageKey = Assets.Reading;
				presenceData.details = "Leest berichten over";
			}
			if (adCheck) {
				presenceData.state = adCheck.textContent;
				presenceData.buttons = [
					{
						label: "Bekijk Product",
						url:
							document
								.querySelector('[data-sem="advertisementDisplayAction"]')
								?.getAttribute("href") ?? href,
					},
				];
			} else presenceData.state = "Alle chats";
		} else if (pathname.includes("/my-account/")) {
			presenceData.details = "Bekijkt";
			presenceData.state = `Mijn ${
				document.querySelector('[class="mp-Tab is-selected"]').textContent
			}`;
		} else if (pathname.includes("/notifications")) {
			presenceData.details = "Bekijkt";
			presenceData.state = "Mijn notificaties";
		} else if (pathname.includes("/experiences/")) {
			presenceData.details = "Bekijkt";
			presenceData.state = "Mijn ervaringen";
		} else if (
			pathname.includes("/m/") &&
			!pathname.includes("/veiligheidscentrum/")
		) {
			presenceData.details = "Leest over";
			presenceData.state = document.querySelector<HTMLMetaElement>(
				'meta[name="description"]'
			).content;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.buttons = [
				{
					label: "Lees Artikel",
					url: href,
				},
			];
		} else if (
			pathname.includes("/m") ||
			pathname.includes("/veiligheidscentrum/")
		) {
			presenceData.buttons = [
				{
					label: "Bekijk het Veiligheidscentrum",
					url: href,
				},
			];
			presenceData.details = "Bekijkt";
			presenceData.state = "Marktplaats Veiligheidscentrum";
		}
	} else if (hostname === "help.marktplaats.nl") {
		presenceData.buttons = [
			{
				label: "Bekijk Helpdesk",
				url: href,
			},
		];
		search = document.querySelector("input");
		title = document.querySelector("head > title");
		if (pathname === "/s/") {
			if (search.textContent) {
				presenceData.details = "Zoekt in de Helpdesk naar";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			} else presenceData.details = "Bekijkt de Helpdesk";
		}
		if (pathname.includes("/topic/") || pathname.includes("/article/")) {
			presenceData.details = "Leest een artikel over";
			presenceData.state = title.textContent.replace(" | Helpdesk", "");
			presenceData.smallImageKey = Assets.Reading;
		}
	}

	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
