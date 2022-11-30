const presence = new Presence({
		clientId: "1047102386478534727",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const { pathname } = window.location,
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/bhEsT7P.png",
		};
	let url: string;
	if (location.origin.startsWith("https://"))
		url = location.origin.replace("https://", "");
	else url = location.origin;
	//Dino
	if (pathname.endsWith("/dinozor-oyunu/"))
		presenceData.details = "Dino oynuyor.";
	//Animeler
	else if (
		(url === "tempestfansub.com" &&
			pathname === "/" &&
			!url.startsWith("manga.")) ||
		pathname.endsWith("/anime/")
	)
		presenceData.details = "Animelere göz atıyor.";
	//Bir Anime
	else if (!location.href.endsWith("/anime/") && pathname.includes("/anime/")) {
		presenceData.details = "Bir animeye bakıyor.";
		presenceData.state = document
			.querySelector(
				"#content > div > div > article > div:nth-child(2) > div > div.infox > h1.entry-title"
			)
			?.textContent.trim();
		const imgs = document.querySelectorAll(
			"#content > div > div > article > div:nth-child(2) > div > div.thumbook > div > img"
		);
		for (const element of imgs) {
			if (element.getAttribute("src") !== null)
				presenceData.largeImageKey = element.getAttribute("src");
		}
		//Mangalar
	} else if (
		url.startsWith("manga.") &&
		(pathname.endsWith("/manga/") || pathname.endsWith("/anasayfa/"))
	)
		presenceData.details = "Mangalara göz atıyor.";
	//Bir Manga
	else if (pathname.includes("/manga/")) {
		presenceData.details = "Bir mangaya bakıyor.";
		presenceData.state = document
			.querySelector(
				"#content > div > div > article > div:nth-child(2) > div > div.infox > h1.entry-title"
			)
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
			if (element.getAttribute("src") !== null)
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
	//Başvuru
	else if (pathname.includes("/basvuru/"))
		presenceData.details = "Ekip Başvuruya bakıyor.";
	//Manga okuyor
	else if (
		!pathname.includes("/manga/") &&
		!pathname.includes("/anime/") &&
		url.startsWith("manga.") &&
		!pathname.endsWith("/anasayfa/")
	) {
		try {
			const title = document
					.querySelector("#content > div > div > div > article > div > h1")
					?.textContent.trim(),
				tsplited = title.split(" ");
			presenceData.details = title.replace(tsplited[tsplited.length - 1], "");
			presenceData.state = `Bölüm ${tsplited[tsplited.length - 1]} Okuyor.`;
			presenceData.buttons = [
				//{
				//	label: "Mangayı Aç",
				//	url: location.href
				//},
				{
					label: "Bölümü Aç",
					url: location.href,
				},
			];
		} catch {
			presenceData.details = " Bilinmeyen Adress.";
		}
	} else presenceData.details = " Bilinmeyen Adress.";

	presence.setActivity(presenceData);
});
