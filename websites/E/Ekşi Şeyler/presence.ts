const presence = new Presence({
	clientId: "643771565951025153",
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
	const page = document.location.pathname,
		postTitle = document.querySelector(
			"#content-body-area > div > div > div.content-heading > h1"
		);

	if (page.includes("/kategori/")) {
		const category =
			document.title[0].toUpperCase() +
			document.title
				.replace(" - Ekşi Şeyler", "")
				.slice(1, document.title.length)
				.toLowerCase();

		presence.setActivity({
			largeImageKey: "https://i.imgur.com/tkEm0ck.png",
			details: "Bir kategoriye göz atıyor:",
			state: category || "Belirsiz",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (page.includes("/kanal/")) {
		const channel =
			document.title[0].toUpperCase() +
			document.title
				.replace(" - Ekşi Şeyler", "")
				.slice(1, document.title.length)
				.toLowerCase();

		presence.setActivity({
			largeImageKey: "https://i.imgur.com/tkEm0ck.png",
			details: "Bir kanala göz atıyor:",
			state: channel || "Belirsiz",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (page.includes("/derleme/arama/")) {
		const searchingFor = document.querySelector(
			"#main-content > div > div > div.search-result-info > span"
		);

		presence.setActivity({
			largeImageKey: "https://i.imgur.com/tkEm0ck.png",
			details: "Bir şey arıyor:",
			state:
				searchingFor && searchingFor.textContent !== ""
					? searchingFor.textContent
					: "Belirsiz",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (postTitle && postTitle.textContent !== "") {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/tkEm0ck.png",
			details: "Bir gönderiyi okuyor:",
			state: postTitle.textContent || "Belirsiz",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/tkEm0ck.png",
			details: "Bir sayfaya göz atıyor:",
			state: "Ana Sayfa",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	}
});
