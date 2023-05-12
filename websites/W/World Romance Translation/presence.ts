const presence = new Presence({
		clientId: "857964031700238356",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/WJFdTQL.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;

	if (pathname === "/") {
		const searchQuery =
			document.querySelector<HTMLHeadingElement>("div.releases > h1");
		if (!searchQuery) presenceData.details = "Melihat Homepage";
		else {
			// eslint-disable-next-line unicorn/prefer-dom-node-text-content
			const { innerText } = searchQuery;
			presenceData.details = `Sedang Mencari ${innerText.substring(
				innerText.indexOf("'") + 1,
				innerText.lastIndexOf("'")
			)}`;
		}
	} else if (pathname.startsWith("/genres/")) {
		presenceData.details = "Filter Berdasarkan Genre...";
		presenceData.state = `Genre: ${
			document.querySelector("div.wrapper > div > div > div.releases > h1")
				.textContent
		}`;
		presenceData.smallImageKey = Assets.Search;
	} else if (document.querySelector("div#readerarea")) {
		const mangaName =
				document.querySelector<HTMLHeadingElement>("h1.entry-title"),
			chapterNumber =
				document.querySelector<HTMLSelectElement>("select#chapter"),
			pageNumber = document.querySelector<HTMLSelectElement>(
				"select#select-paged"
			);
		if (mangaName && chapterNumber && pageNumber) {
			presenceData.details = `Membaca ${mangaName.textContent.substring(
				0,
				mangaName.textContent.indexOf("Chapter")
			)}`;
			presenceData.state = `${chapterNumber.selectedOptions[0].textContent} Slide ${pageNumber.selectedOptions[0].textContent}`;
		}

		presenceData.buttons = [
			{
				label: "Lihat Manga",
				url: href,
			},
		];
	} else if (pathname.startsWith("/manga/")) {
		const mangaName =
			document.querySelector<HTMLHeadingElement>("h1.entry-title");
		presenceData.details =
			pathname === "/manga/" ? "Melihat Daftar Manga" : "Melihat Detail Manga";
		if (mangaName) presenceData.state = mangaName.textContent;
		presenceData.buttons = [
			{
				label:
					pathname === "/manga/" ? "Lihat Daftar Manga" : "Lihat Detail Manga",
				url: href,
			},
		];
	} else if (pathname.startsWith("/bookmark/"))
		presenceData.details = "Membuka Bookmarks";
	else {
		switch (pathname) {
			case "/project-wrt/": {
				presenceData.details = "Melihat Project WRT";
				presenceData.state = "Lihat Daftar Project WRT";

				break;
			}
			case "/recruitment/": {
				presenceData.details = "Membuka Halaman Join Us";
				break;
			}
			case "/contact-us/": {
				presenceData.details = "Membuka Halaman Contact Us";
				break;
			}
			case "/privacy-policy/": {
				presenceData.details = "Melihat Kebijakan Privasi";
				break;
			}
			case "/dmca/":
				{
					presenceData.details = "Melihat DMCA";
					// No default
				}
				break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
