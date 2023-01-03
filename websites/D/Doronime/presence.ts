const presence = new Presence({
		clientId: "967447688687779920",
	}),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/vLys7Ng.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

presence.on("UpdateData", async () => {
	const [base, ...data] = document.location.pathname.slice(1).split("/");
	if (!base.length) presenceData.details = "Viewing Homepage";
	if (base === "anime") {
		if (data.length) {
			const animeInfo = [
					...document.querySelectorAll(".Content__breadcrumb > li").values(),
				]
					.slice(1)
					.map(x => {
						if (x.querySelector("a")) return x.querySelector("a").textContent;
						return x.querySelector("span").textContent;
					}),
				parseDetails = animeInfo[0].includes("List")
					? "Viewing Anime List"
					: animeInfo[1].includes("Batch")
					? "Viewing Anime Batch"
					: animeInfo[0],
				parseState = animeInfo[0].includes("List")
					? animeInfo[1]
					: animeInfo[1].includes("Batch")
					? animeInfo[0]
					: animeInfo[1];
			presenceData.details = parseDetails;
			presenceData.state = parseState;
			presenceData.buttons = [
				{
					label: "View Anime",
					url: document.location.href,
				},
			];
		} else presenceData.details = "Viewing Anime List";
	}
	if (base === "batch") presenceData.details = "Viewing Anime Batch List";
	if (base === "movie") presenceData.details = "Viewing Anime Movie List";
	if (base === "ost") {
		if (data.length) {
			const [title, artist] = [
				...document.querySelectorAll(
					".Content__description-caption > div > div > div"
				),
			].map(x => x.textContent);
			presenceData.details = artist;
			presenceData.state = title;
			presenceData.buttons = [
				{
					label: "View OST",
					url: document.location.href,
				},
			];
		} else presenceData.details = "Viewing Anime OST List";
	}
	if (base === "genre") {
		if (data.length) {
			presenceData.details = `Viewing Anime Genre ${
				document.querySelector(".Content__tabs > div > span").textContent
			}`;
		} else presenceData.details = "Viewing Anime Genre List";
	}
	if (base === "season") {
		if (data.length) {
			presenceData.details = `Viewing Anime Season ${
				document.querySelector(".Content__tabs > div > span").textContent
			}`;
		} else presenceData.details = "Viewing Anime Season List";
	}
	if (base === "schedule") presenceData.details = "Viewing Anime Schedule List";
	if (base === "artist") {
		if (data.length) {
			presenceData.details = `Viewing OST Artist ${document
				.querySelector(".Content__tabs > div > span")
				.textContent.split(" ")
				.slice(2)
				.join(" ")}`;
		} else presenceData.details = "Viewing Artist List";
	}
	if (base === "producer") {
		if (data.length) {
			presenceData.details = `Viewing Anime Producer ${
				document.querySelector(".Content__tabs > div > span").textContent
			}`;
		} else presenceData.details = "Viewing Anime Producer List";
	}
	if (base === "studio") {
		if (data.length) {
			presenceData.details = `Viewing Anime Studio ${
				document.querySelector(".Content__tabs > div > span").textContent
			}`;
		} else presenceData.details = "Viewing Anime Studio List";
	}
	if (document.location.search.startsWith("?s"))
		presenceData.details = "Searching Anime";
	presence.setActivity(presenceData);
});
