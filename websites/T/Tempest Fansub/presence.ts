const presence = new Presence({
		clientId: "1047102386478534727",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const { pathname, hostname, href } = document.location,
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/ppTaAAl.png",
		},
		searchParams = new URLSearchParams(location.search);
	if (hostname === "tempestscans.com") {
		//Manga----------------------------------------------------------------------------------------------------------
		if (searchParams.get("s")) {
			presenceData.details = "Bir manga arıyor.";
			presenceData.state = searchParams.get("s");
			//mangalar
		} else if (pathname.endsWith("/manga/") || pathname === "/")
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
					url: href,
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
		//Takvim
		else if (pathname.includes("/takvim/"))
			presenceData.details = "Takvime bakıyor.";
		//kitaplik
		else if (pathname.includes("/kitaplik/"))
			presenceData.details = "Manga kitaplığına bakıyor.";
		//Manga EkipBaşvuru
		else if (pathname.includes("/manga-cevirmen-editor-basvuru-2/"))
			presenceData.details = "Manga ekip başvurusuna bakıyor.";
		//Manga Destek
		else if (pathname.includes("/destek-ol/"))
			presenceData.details = "Fansuba bağış yapıyor.";
		//Manga okuyor
		else if (document.querySelector("div.chapterbody")) {
			try {
				const title = document
						.querySelector("h1.entry-title")
						?.textContent.trim(),
					tsplited = title.split(" "),
					_manga = document.querySelectorAll("div.allc > a");
				for (const element of _manga) {
					if (element.getAttribute("href")) {
						presenceData.buttons = [
							{
								label: "Bölümü Aç",
								url: href,
							},
							{
								label: "Mangayı Aç",
								url: element.getAttribute("href"),
							},
						];
						break;
					}
				}
				presenceData.details = title.replace(tsplited[tsplited.length - 1], "");
				presenceData.state = `Bölüm ${tsplited[tsplited.length - 1]} Okuyor.`;
			} catch {
				presenceData.details = "Bilinmeyen Adress.";
			}
		} else presenceData.details = "Bilinmeyen Adress.";
	} else if (hostname === "tempestfansub.com") {
		//Anime----------------------------------------------------------------------------------------------------------
		if (searchParams.get("s")) {
			presenceData.details = "Bir anime arıyor.";
			presenceData.state = searchParams.get("s");
			//animeler
		} else if (pathname === "/" || pathname.endsWith("/anime/"))
			presenceData.details = "Animelere göz atıyor.";
		//bir anime
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
			//Anime a-z listesi
		} else if (pathname.includes("/az-listesi/"))
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
			}
		} else if (pathname.includes("/kitaplik/"))
			presenceData.details = "Anime kitaplığına bakıyor.";
		//Anime EkipBaşvuru
		else if (pathname.includes("/basvuru/"))
			presenceData.details = "Anime ekip başvurusuna bakıyor.";
		else presenceData.details = "Bilinmeyen Adress.";
	} else presenceData.details = "Bilinmeyen Adress.";
	presence.setActivity(presenceData);
});
