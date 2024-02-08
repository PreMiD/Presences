const presence = new Presence({
		clientId: "860298084512038964",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

	const enum Assets {
		Logo = "https://cdn.rcd.gg/PreMiD/websites/M/MangaWorld/assets/logo.png",
		LogoDark = "https://cdn.discordapp.com/app-assets/860298084512038964/861284328163508224.png?size=512",
		LogoLight = "https://cdn.discordapp.com/app-assets/860298084512038964/861284640006471690.png?size=512",
		Home = "https://cdn.discordapp.com/app-assets/860298084512038964/861304842060562453.png?size=512",
		Archive = "https://cdn.discordapp.com/app-assets/860298084512038964/861305393685594162.png?size=512",
		Bookmark = "https://cdn.discordapp.com/app-assets/860298084512038964/861305455253651468.png?size=512",
		Brush = "https://cdn.discordapp.com/app-assets/860298084512038964/861305529610797057.png?size=512",
		Calendar = "https://cdn.discordapp.com/app-assets/860298084512038964/861305576683733023.png?size=512",
		Pen = "https://cdn.discordapp.com/app-assets/860298084512038964/861305628625338398.png?size=512",
		Plus = "https://cdn.discordapp.com/app-assets/860298084512038964/861305665421967413.png?size=512",
		Hash = "https://cdn.discordapp.com/app-assets/860298084512038964/861360434220367883.png?size=512",
		Journals = "https://cdn.discordapp.com/app-assets/860298084512038964/861360577409450020.png?size=512",
		File = "https://cdn.discordapp.com/app-assets/860298084512038964/861360657189568513.png?size=512",
		Calendar2 = "https://cdn.discordapp.com/app-assets/860298084512038964/861360719001419776.png?size=512",
		Book2 = "https://cdn.discordapp.com/app-assets/860298084512038964/861639881172320266.png?size=512",
		Slash = "https://cdn.discordapp.com/app-assets/860298084512038964/861712161344978964.png?size=512",
		File2 = "https://cdn.discordapp.com/app-assets/860298084512038964/861712171619319809.png?size=512",
		Tags = "https://cdn.discordapp.com/app-assets/860298084512038964/861712182739599390.png?size=512",
		Journal = "https://cdn.discordapp.com/app-assets/860298084512038964/861713304968101928.png?size=512",
		File3 = "https://cdn.discordapp.com/app-assets/860298084512038964/861716898924593172.png?size=512",
		Book3 = "https://cdn.discordapp.com/app-assets/860298084512038964/861721710603927582.png?size=512",
		Sort = "https://cdn.discordapp.com/app-assets/860298084512038964/861723391660916736.png?size=512",
	}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		/* Query dell'URI - URI query */
		searchParams = new URLSearchParams(
			decodeURIComponent(document.location.search)
				.replace("?", "")
				.replaceAll("-", " ")
		);

	/* Homepage */
	if (document.location.pathname === "/") {
		presenceData.smallImageKey = Assets.Home;
		presenceData.smallImageText = "Homepage";
		presenceData.details = "Nella homepage";
	} else if (document.location.href.includes("/bookmarks/")) {
		/* Preferiti - Bookmarks*/
		presenceData.smallImageKey = Assets.Bookmark;
		presenceData.smallImageText = "Preferiti";
		presenceData.details = "Sfogliando i preferiti";

		const categories: { [page: string]: string } = {
				"RE-READING": "In rilettura",
				COMPLETED: "Completati",
				ON_HOLD: "In pausa",
				PLAN_TO_READ: "Da leggere",
				DROPPED: "Droppati",
				READING: "In lettura",
			},
			category = document.location.pathname.split("/")[3];
		if (category in categories) presenceData.state = categories[category];
	} else if (document.location.href.includes("keyword=")) {
		/* ----- ARCHIVIO - ARCHIVE ----- */
		/* Ricerca per nome - Search by name */
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Ricerca per nome";
		presenceData.details = "Cercando:";
		presenceData.state = `"${searchParams.get("keyword")}"`;
	} else if (document.location.href.includes("author=")) {
		/* Ricerca per autore - Search by author */
		presenceData.smallImageKey = Assets.Pen;
		presenceData.smallImageText = "Ricerca per autore";
		presenceData.details = "Sfogliando i contenuti dell'autore:";
		presenceData.state = searchParams.get("author");
	} else if (document.location.href.includes("artist=")) {
		/* Ricerca per artista - Search by artist */
		presenceData.smallImageKey = Assets.Brush;
		presenceData.smallImageText = "Ricerca per artista";
		presenceData.details = "Sfogliando i contenuti dell'artista:";
		presenceData.state = searchParams.get("artist");
	} else if (document.location.href.includes("genre=")) {
		/* Ricerca per genere - Search by genre */
		const genre = searchParams.get("genre").split(" ");
		for (let i = 0; i < genre.length; i++)
			genre[i] = genre[i][0].toUpperCase() + genre[i].substr(1);
		presenceData.smallImageKey = Assets.Tags;
		presenceData.smallImageText = "Ricerca per genere";
		presenceData.details = "Sfogliando i contenuti del genere:";
		presenceData.state = genre.join(" ");
	} else if (document.location.href.includes("year=")) {
		/* Ricerca per anno - Search by year of release */
		presenceData.smallImageKey = Assets.Calendar2;
		presenceData.smallImageText = "Ricerca per anno";
		presenceData.details = "Sfogliando i contenuti dell'anno:";
		presenceData.state = searchParams.get("year");
	} else if (document.location.href.includes("status=")) {
		/* Ricerca per stato - Search by status */
		presenceData.smallImageKey = Assets.Slash;
		presenceData.smallImageText = "Ricerca per stato";
		presenceData.details = "Sfogliando i contenuti:";

		const statuses: { [value: string]: string } = {
				dropped: "Droppati",
				ongoing: "In corso d'opera",
				completed: "Finiti",
				paused: "In pausa",
				canceled: "Cancellati",
			},
			status = searchParams.get("status");
		if (status in statuses) presenceData.state = statuses[status];
	} else if (document.location.href.includes("type=")) {
		/* Ricerca per formato - Search by format */
		const rawtype = searchParams.get("type");
		presenceData.smallImageKey = Assets.File3;
		presenceData.smallImageText = "Ricerca per formato";
		presenceData.details = "Sfogliando i contenuti in formato:";
		presenceData.state = rawtype[0].toUpperCase() + rawtype.substring(1);
	} else if (document.location.href.includes("sort=")) {
		/* Ricerca per ordinamento - Order by */
		presenceData.smallImageKey = Assets.Sort;
		presenceData.smallImageText = "Ricerca per ordinamento";
		presenceData.details = "Sfogliando i contenuti:";

		const sorts: { [page: string]: string } = {
				"a z": "Ordinati dalla A alla Z",
				"z a": "Ordinati dalla Z alla A",
				// eslint-disable-next-line camelcase
				most_read: "Più letti",
				// eslint-disable-next-line camelcase
				less_read: "Meno letti",
				newest: "Più recenti",
				oldest: "Meno recenti",
			},
			sort = searchParams.get("sort");
		if (sort in sorts) presenceData.state = sorts[sort];
	} else if (document.location.href.includes("archive")) {
		/* Pagina principale - Main page */
		presenceData.smallImageKey = Assets.Archive;
		presenceData.smallImageText = "Archivio";
		presenceData.details = "Nell'archivio";
		presenceData.state = "Sfogliando...";
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

			presenceData.smallImageKey = Assets.Book3;
			presenceData.smallImageText = mangaName;
			presenceData.details = `Leggendo: ${mangaName}`;
			presenceData.state = `${chapterString + chapter} | Pagina ${
				document.location.pathname.split("/")[6]
			}`;
			presenceData.buttons = [
				{
					label: "Leggilo anche tu!",
					url: document.location.href.replace(/.$/, "1"),
				},
				{
					label: "Vai alla pagina del manga!",
					url: document.location.href.replace(/read\/.*/g, ""),
				},
			];
		} else {
			/* Nella pagina principale del manga - In the manga's main page */
			const pageName = document.title.replace(" Scan ITA - MangaWorld", "");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = pageName;
			presenceData.details = "Visualizzando la pagina di:";
			presenceData.state = pageName;
			presenceData.buttons = [
				{
					label: "Vai alla pagina del manga!",
					url: document.location.href,
				},
			];
		}
	} else {
		/* In qualunque altra pagina - In any other page */
		const pageName = document.title.replace("MangaWorld - ", "");
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.smallImageText = `"${pageName}"`;
		presenceData.details = "Visualizzando la pagina:";
		presenceData.state = `"${pageName}"`;
	}
	if (presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presence.setActivity(presenceData);
	}
});
