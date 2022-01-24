const presence = new Presence({
		clientId: "860298084512038964"
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const data: PresenceData = {
			largeImageKey: "mangaworld_logo_dark"
		},
		/* Query dell'URI - URI query */
		searchParams = new URLSearchParams(
			decodeURIComponent(document.location.search)
				.replace("?", "")
				.replace(/-/g, " ")
		);

	/* Homepage */
	if (document.location.pathname === "/") {
		data.smallImageKey = "home";
		data.smallImageText = "Homepage";
		data.details = "Nella homepage";
	} else if (document.location.href.includes("/bookmarks/")) {
		/* Preferiti - Bookmarks*/
		data.smallImageKey = "bookmark";
		data.smallImageText = "Preferiti";
		data.details = "Sfogliando i preferiti";

		const categories: { [page: string]: string } = {
				"RE-READING": "In rilettura",
				COMPLETED: "Completati",
				ON_HOLD: "In pausa",
				PLAN_TO_READ: "Da leggere",
				DROPPED: "Droppati",
				READING: "In lettura"
			},
			[, , , category] = document.location.pathname.split("/");
		if (category in categories) data.state = categories[category];
	} else if (document.location.href.includes("keyword=")) {
		/* ----- ARCHIVIO - ARCHIVE ----- */
		/* Ricerca per nome - Search by name */
		data.smallImageKey = "search";
		data.smallImageText = "Ricerca per nome";
		data.details = "Cercando:";
		data.state = `"${searchParams.get("keyword")}"`;
	} else if (document.location.href.includes("author=")) {
		/* Ricerca per autore - Search by author */
		data.smallImageKey = "pen";
		data.smallImageText = "Ricerca per autore";
		data.details = "Sfogliando i contenuti dell'autore:";
		data.state = searchParams.get("author");
	} else if (document.location.href.includes("artist=")) {
		/* Ricerca per artista - Search by artist */
		data.smallImageKey = "brush";
		data.smallImageText = "Ricerca per artista";
		data.details = "Sfogliando i contenuti dell'artista:";
		data.state = searchParams.get("artist");
	} else if (document.location.href.includes("genre=")) {
		/* Ricerca per genere - Search by genre */
		const genre = searchParams.get("genre").split(" ");
		for (let i = 0; i < genre.length; i++)
			genre[i] = genre[i][0].toUpperCase() + genre[i].substr(1);
		data.smallImageKey = "tags";
		data.smallImageText = "Ricerca per genere";
		data.details = "Sfogliando i contenuti del genere:";
		data.state = genre.join(" ");
	} else if (document.location.href.includes("year=")) {
		/* Ricerca per anno - Search by year of release */
		data.smallImageKey = "calendar2";
		data.smallImageText = "Ricerca per anno";
		data.details = "Sfogliando i contenuti dell'anno:";
		data.state = searchParams.get("year");
	} else if (document.location.href.includes("status=")) {
		/* Ricerca per stato - Search by status */
		data.smallImageKey = "slash";
		data.smallImageText = "Ricerca per stato";
		data.details = "Sfogliando i contenuti:";

		const statuses: { [value: string]: string } = {
				dropped: "Droppati",
				ongoing: "In corso d'opera",
				completed: "Finiti",
				paused: "In pausa",
				canceled: "Cancellati"
			},
			status = searchParams.get("status");
		if (status in statuses) data.state = statuses[status];
	} else if (document.location.href.includes("type=")) {
		/* Ricerca per formato - Search by format */
		const rawtype = searchParams.get("type");
		data.smallImageKey = "file3";
		data.smallImageText = "Ricerca per formato";
		data.details = "Sfogliando i contenuti in formato:";
		data.state = rawtype[0].toUpperCase() + rawtype.substring(1);
	} else if (document.location.href.includes("sort=")) {
		/* Ricerca per ordinamento - Order by */
		data.smallImageKey = "sort";
		data.smallImageText = "Ricerca per ordinamento";
		data.details = "Sfogliando i contenuti:";

		const sorts: { [page: string]: string } = {
				"a z": "Ordinati dalla A alla Z",
				"z a": "Ordinati dalla Z alla A",
				// eslint-disable-next-line camelcase
				most_read: "Più letti",
				// eslint-disable-next-line camelcase
				less_read: "Meno letti",
				newest: "Più recenti",
				oldest: "Meno recenti"
			},
			sort = searchParams.get("sort");
		if (sort in sorts) data.state = sorts[sort];
	} else if (document.location.href.includes("archive")) {
		/* Pagina principale - Main page */
		data.smallImageKey = "archive";
		data.smallImageText = "Archivio";
		data.details = "Nell'archivio";
		data.state = "Sfogliando...";
	} else if (document.location.href.includes("/manga/")) {
		/* ----- LETTURA - READING ----- */
		/* Nell'e-reader - In the e-reader */
		if (document.location.href.includes("/read/")) {
			const [mangaName] = document.title
					.replace(" Scan ITA - MangaWorld", "")
					.replace(" Oneshot", "")
					.split("Capitolo"),
				[, chapter0n] = document.title
					.replace(" Scan ITA - MangaWorld", "")
					.split("Capitolo");
			let chapter = chapter0n;
			if (parseInt(chapter0n, 10) < 10) chapter = chapter0n.replace("0", "");
			let chapterString = "Capitolo";
			if (typeof chapter0n === "undefined")
				(chapterString = "Oneshot"), (chapter = "");

			data.smallImageKey = "book3";
			data.smallImageText = mangaName;
			data.details = `Leggendo: ${mangaName}`;
			data.state = `${chapterString + chapter} | Pagina ${
				document.location.pathname.split("/")[6]
			}`;
			data.buttons = [
				{
					label: "Leggilo anche tu!",
					url: document.location.href.replace(/.$/, "1")
				},
				{
					label: "Vai alla pagina del manga!",
					url: document.location.href.replace(/read\/.*/g, "")
				}
			];
		} else {
			/* Nella pagina principale del manga - In the manga's main page */
			const pageName = document.title.replace(" Scan ITA - MangaWorld", "");
			data.smallImageKey = "eye";
			data.smallImageText = pageName;
			data.details = "Visualizzando la pagina di:";
			data.state = pageName;
			data.buttons = [
				{
					label: "Vai alla pagina del manga!",
					url: document.location.href
				}
			];
		}
	} else {
		/* In qualunque altra pagina - In any other page */
		const pageName = document.title.replace("MangaWorld - ", "");
		data.smallImageKey = "eye";
		data.smallImageText = `"${pageName}"`;
		data.details = "Visualizzando la pagina:";
		data.state = `"${pageName}"`;
	}
	if (data.details) {
		data.startTimestamp = browsingStamp;
		presence.setActivity(data);
	}
});
