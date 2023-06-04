const presence = new Presence({
		clientId: "609791567540256780",
	}),
	startTimestamp = Math.floor(Date.now() / 1000),
	{ pathname } = window.location,
	strings = presence.getStrings({
		browsing: "general.browsing",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/U/Union%20Mang%C3%A1s/assets/logo.png",
		startTimestamp,
	};

	if (pathname.startsWith("/lista-mangas")) {
		presenceData.details = "Procurando um mangá";
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Procurando";
	} else if (pathname.startsWith("/manga")) {
		presenceData.details = "Olhando um mangá";
		presenceData.state =
			document.querySelector("div.col-md-12 > h2").textContent;
	} else if (pathname.startsWith("/leitor")) {
		const [mangaName, mangaChapter] = document
			.querySelector(".titulo-leitura")
			.textContent.split(" - ");
		presenceData.details = mangaName;
		if (
			!document
				.querySelector("#paginas")
				.getAttribute("style")
				.match(/display:\Wnone/)
		) {
			presenceData.state = `${mangaChapter} - Página ${
				(document.querySelector("#paginas") as HTMLSelectElement).options
					.selectedIndex + 1
			}`;
		} else presenceData.state = mangaChapter;

		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Lendo";
	} else if (pathname.startsWith("/scans")) {
		presenceData.details = "Procurando uma Scan";
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Procurando";
	} else presenceData.details = (await strings).browsing;

	presence.setActivity(presenceData, true);
});
