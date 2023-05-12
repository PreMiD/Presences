const presence = new Presence({ clientId: "658192386899312651" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/QK47Q4Y.png",
		startTimestamp: browsingTimestamp,
	};

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

function makeRPC(title: string, category: string): void {
	switch (category) {
		case "kategori": {
			presenceData.details = "Bir kategoriye göz atıyor:";
			presenceData.state = title;

			break;
		}
		case "etiket": {
			presenceData.details = "Bir etikete göz atıyor:";
			presenceData.state = title;

			break;
		}
		case "author": {
			presenceData.details = "Bir yazara göz atıyor:";
			presenceData.state = title;

			break;
		}
		// No default
	}
}

presence.on("UpdateData", () => {
	const page = document.location.pathname;

	// Homepage
	if (page.length <= 1 || page.startsWith("/page")) {
		presenceData.details = "Ana Sayfa";
		presenceData.state = "Haberlere göz atıyor...";
	}

	// Reading an article
	if (
		document.querySelector("#content > div:nth-child(2) > article > div > h1")
			?.textContent
	) {
		presenceData.details = "Bir haber okuyor...";
		presenceData.state = document.querySelector(
			"#content > div:nth-child(2) > article > div > h1"
		).textContent;
	}

	if (page.startsWith("/kategori") && page !== "/kategori") {
		const category =
			document.querySelector(
				"#content > div.page-title.hu-pad.group > h1 > span"
			)?.textContent ?? "Bilinmeyen";
		makeRPC(category, "kategori");
	}

	if (page.startsWith("/etiket") && page !== "/etiket") {
		let category = document.querySelector("#blog-entries > header > h1")
			? document
					.querySelector("#blog-entries > header > h1")
					.textContent.substring(8)
			: "Bilinmeyen";
		category = category.charAt(0).toUpperCase() + category.substring(1);
		makeRPC(category, "etiket");
	}

	if (page.startsWith("/yazar")) {
		makeRPC(
			document.querySelector(
				"#content > div.page-title.hu-pad.group > h1 > span"
			)?.textContent ?? "Bilinmeyen",
			"author"
		);
	}

	if (new URLSearchParams(window.location.search).get("s")) {
		presenceData.details = "Arama sonuçları:";
		presenceData.state = new URLSearchParams(window.location.search).get("s");
	}

	if (page.startsWith("/ara")) presenceData.details = "Arama bölümünde...";

	if (
		["/kunye", "/iletisim", "/gizlilik-politikasi"].some(pac =>
			page.startsWith(pac)
		)
	) {
		if (
			!document.querySelector("#content > div.page-title.hu-pad.group > h1")
				?.textContent
		)
			return;
		presenceData.details = "Bir sayfaya göz atıyor...";
		presenceData.state = document.querySelector(
			"#content > div.page-title.hu-pad.group > h1"
		)?.textContent;
	}

	if (!presenceData.details) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/QK47Q4Y.png",
			details: "Bilinmeyen bir sayfada...",
		});
	} else presence.setActivity(presenceData);
});
