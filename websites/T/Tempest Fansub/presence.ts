const presence = new Presence({
		clientId: "1047102386478534727",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const { pathname, hostname } = document.location,
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/MVWiX8p.png",
		},
		searchParams = new URLSearchParams(location.search);
	//Dino
	if (pathname === "/dinozor-oyunu/") presenceData.details = "Dino oynuyor.";
	//arama
	else if (searchParams.get("s")) {
		if (hostname === "tempestfansub.com")
			presenceData.details = "Bir anime arıyor.";
		if (hostname === "manga.tempestfansub.com")
			presenceData.details = "Bir manga arıyor.";
		presenceData.state = searchParams.get("s");
		//Animeler
	} else if (
		(hostname === "tempestfansub.com" && pathname === "/") ||
		pathname.endsWith("/anime/")
	)
		presenceData.details = "Animelere göz atıyor.";
	//Bir Anime
	else if (!pathname.endsWith("/anime/") && pathname.includes("/anime/")) {
		presenceData.details = "Bir animeye bakıyor.";
		presenceData.state = document
			.querySelector("h1.entry-title")
			?.textContent.trim();
		const imgs = document.querySelectorAll(
			"#content > div > div > article > div:nth-child(2) > div > div.thumbook > div > img"
		);
		for (const element of imgs) {
			if (element.getAttribute("src"))
				presenceData.largeImageKey = element.getAttribute("src");
		}
		//Mangalar
	} else if (
		hostname.startsWith("manga.") &&
		(pathname.endsWith("/manga/") || pathname.endsWith("/anasayfa/"))
	)
		presenceData.details = "Mangalara göz atıyor.";
	//Bir Manga
	else if (pathname.includes("/manga/")) {
		presenceData.details = "Bir mangaya bakıyor.";
		presenceData.state = document
			.querySelector("h1.entry-title")
			?.textContent.trim();
		presenceData.buttons = [
			{
				label: "Mangayı Aç",
				url: location.href,
			},
		];
		const imgs = document.querySelectorAll(
			"#content > div > div > article > div:nth-child(2) > div > div.thumbook > div > img"
		);
		for (const element of imgs) {
			if (element.getAttribute("src"))
				presenceData.largeImageKey = element.getAttribute("src");
		}
		//manga a-z listesi
	} else if (pathname.includes("/a-z/"))
		presenceData.details = "Manga A-Z Listesine bakıyor.";
	//Anime a-z listesi
	else if (pathname.includes("/az-listesi/"))
		presenceData.details = "Anime A-Z Listesine bakıyor.";
	//Anime tür listesi
	else if (
		pathname.includes("/turler/") ||
		pathname.includes("/genres/") ||
		pathname.includes("/siniflandirma/")
	) {
		presenceData.details = "Anime Türler Listesine bakıyor.";
		if (pathname.includes("/genres/")) {
			presenceData.state = document
				.querySelector("#content > div > div > div > div > h1")
				?.textContent.trim();
		} //Kitaplık
	} else if (pathname.includes("/kitaplik/"))
		presenceData.details = "Kitaplığa bakıyor.";
	//Takvim
	else if (pathname.includes("/takvim/"))
		presenceData.details = "Takvime bakıyor.";
	//Anime EkipBaşvuru
	else if (pathname.includes("/basvuru/"))
		presenceData.details = "Anime ekip başvurusuna bakıyor.";
	//Manga EkipBaşvuru
	else if (pathname.includes("/manga-cevirmen-editor-basvuru/"))
		presenceData.details = "Manga ekip başvurusuna bakıyor.";
	//Manga okuyor
	else if (
		!pathname.includes("/manga/") &&
		hostname.startsWith("manga.") &&
		!pathname.endsWith("/anasayfa/")
	) {
		try {
			const title = document
					.querySelector("h1.entry-title")
					?.textContent.trim(),
				tsplited = title.split(" ");
			presenceData.details = title.replace(tsplited[tsplited.length - 1], "");
			presenceData.state = `Bölüm ${tsplited[tsplited.length - 1]} Okuyor.`;
			presenceData.buttons = [
				{
					label: "Bölümü Aç",
					url: location.href,
				},
			];
			const imgs = document.querySelectorAll("#readerarea > img");
			for (const element of imgs) {
				if (
					element.getAttribute("src") &&
					element.getAttribute("data-index") === "0"
				) {
					presenceData.largeImageKey = element.getAttribute("src");
					break;
				}
			}
		} catch {
			presenceData.details = "Bilinmeyen Adress.";
		}
	} else presenceData.details = "Bilinmeyen Adress.";

	presence.setActivity(presenceData);
});
