const presence = new Presence({
		clientId: "967447688687779920",
	}),
	presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/D/Doronime/assets/logo.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

presence.on("UpdateData", async () => {
	const capitalize = (str: string[]) =>
		str.map(x => x[0].toUpperCase() + x.slice(1)).join(" ");

	if (document.location.search.startsWith("?s"))
		presenceData.details = "Searching Anime";

	const [base, ...data] = document.location.pathname.slice(1).split("/");
	switch (base) {
		case "batch":
			presenceData.details = "Viewing Anime Batch List";
			break;
		case "movie":
			presenceData.details = "Viewing Anime Movie List";
			break;
		case "schedule":
			presenceData.details = "Viewing Anime Schedule List";
			break;
		case "anime":
			if (data.length) {
				const title = document
					.querySelector(".Content__title")
					.textContent.replace(/\[Batch\]|Subtitle Indonesia/g, "")
					.split("Episode")[0]
					.trim();
				presenceData.details =
					document.location.pathname.slice(1).split("/").length === 2
						? "Viewing Anime Info"
						: title;
				presenceData.state =
					document.location.pathname.slice(1).split("/").length === 2
						? title
						: capitalize(
								document.location.pathname
									.slice(1)
									.split("/")[2]
									.replace("bd-", "")
									.split("-")
						  );
			} else presenceData.details = "Viewing Anime List";
			break;
		case "ost":
			if (data.length) {
				const [title, artist] = [
					...document.querySelectorAll(
						".Content__description-caption > .form-row > div"
					),
				]
					.map((x, i) => (i % 2 === 1 ? x : null))
					.filter(Boolean)
					.splice(0, 2)
					.map(x =>
						x.textContent.replace(/ +?/g, "").split("\n").join(" ").trim()
					);
				presenceData.details =
					title.split(" ").length > 1 ? title.split(" ")[1] : title;
				presenceData.state = artist;
			} else presenceData.details = "Viewing Anime OST List";
			break;
		case "genre":
			if (data.length) {
				presenceData.details = "Viewing Anime Genre";
				presenceData.state = document.querySelector(
					".Content__tabs > div > span"
				).textContent;
			} else presenceData.details = "Viewing Anime Genre List";
			break;
		case "season":
			if (data.length) {
				presenceData.details = "Viewing Anime Season";
				presenceData.state = document.querySelector(
					".Content__tabs > div > span"
				).textContent;
			} else presenceData.details = "Viewing Anime Season List";
			break;
		case "artist":
			if (data.length) {
				presenceData.details = "Viewing OST Artist";
				presenceData.state = document.querySelector(
					".Content__tabs > div > span"
				).textContent;
			} else presenceData.details = "Viewing Artist List";
			break;
		case "producer":
			if (data.length) {
				presenceData.details = "Viewing Anime Producer";
				presenceData.state = document.querySelector(
					".Content__tabs > div > span"
				).textContent;
			} else presenceData.details = "Viewing Anime Producer List";
			break;
		case "studio":
			if (data.length) {
				presenceData.details = "Viewing Anime Studio";
				presenceData.state = document.querySelector(
					".Content__tabs > div > span"
				).textContent;
			} else presenceData.details = "Viewing Anime Studio List";
			break;
		default:
			presenceData.details = "Viewing Homepage";
	}

	presenceData.buttons = [
		{
			label: data.length
				? base === "anime"
					? "View Anime"
					: base === "ost"
					? "View OST"
					: "Visit Doronime"
				: "Visit Doronime",
			url: document.location.href,
		},
	];
	presence.setActivity(presenceData);
});
