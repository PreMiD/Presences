const presence = new Presence({
		clientId: "900717839713959967",
	}),
	elapsed = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", () => {
	const { pathname, origin } = window.location,
		presenceData: PresenceData = {
			startTimestamp: elapsed,
			largeImageKey: "logo",
		};
	let comics: number;

	if (
		document.querySelector(".search-main-menu").classList.contains("active")
	) {
		presenceData.details = "Searching:";
		presenceData.state = (
			document.querySelector(".manga-search-field") as HTMLInputElement
		).textContent;
		presenceData.smallImageKey = "search";
	} else if (/^\/$/.test(pathname)) presenceData.details = "Viewing Home Page";
	else if (/^\/home1\/?$/.test(pathname)) {
		// Counting comics
		comics = document.querySelectorAll(".page-listing-item .row .col-4").length;
		presenceData.details = "Viewing Comic List";
		presenceData.state = `📋 ${comics.toString()} comics found`;
	} else if (/^\/all-series\/novels+\/?$/.test(pathname)) {
		// Counting novels
		comics = document.querySelectorAll(".page-listing-item .row .col-6").length;
		presenceData.details = "Viewing Novel List";
		presenceData.state = `📋 ${comics.toString()} novels found`;
	} else if (/^\/all-series\/comics\/manhwas\/?$/.test(pathname)) {
		// Counting manhwa
		comics = document.querySelectorAll(".page-listing-item .row .col-6").length;
		presenceData.details = "Viewing Manhwa List";
		presenceData.state = `📋 ${comics.toString()} manhwa found`;
	} else if (/^\/all-series\/comics\/manhuas\/?$/.test(pathname)) {
		// Counting manhua
		comics = document.querySelectorAll(".page-listing-item .row .col-4").length;
		presenceData.details = "Viewing Manhua List";
		presenceData.state = `📋 ${comics.toString()} manhua found`;
	} else if (/^\/series\/[0-9a-z-]+\/?$/i.test(pathname)) {
		presenceData.details = "Viewing Comic";
		presenceData.state = document.querySelector(".post-title h1").textContent;
		presenceData.smallImageKey = "view";
		presenceData.buttons = [
			{
				label: "Visit Comic Page",
				url: origin + pathname,
			},
		];
	} else if (
		/^\/series\/[0-9a-z-]+\/+(chapter|ch)-[0-9]+\/?$/i.test(pathname)
	) {
		let progress =
			(document.documentElement.scrollTop /
				(document.querySelector(".read-container").scrollHeight -
					window.innerHeight)) *
			100;
		progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);

		presenceData.details = document.querySelector(
			"ol.breadcrumb li:nth-child(3)"
		).textContent;
		presenceData.state = `📖 ${
			document.querySelector("ol.breadcrumb li:nth-child(4)").textContent
		} 🔸 ${progress}%`;
		presenceData.smallImageKey = "read";
		presenceData.buttons = [
			{
				label: "Visit Comic Page",
				url:
					origin +
					document.querySelector<HTMLAnchorElement>(
						"ol.breadcrumb li:nth-child(3) a"
					).href,
			},
			{
				label: "Visit Chapter",
				url: origin + pathname,
			},
		];
	} else {
		presenceData.details = "Browsing Reaper Scans";
		presenceData.state = document.title;
	}
	if (presenceData.details) presence.setActivity(presenceData);
});
