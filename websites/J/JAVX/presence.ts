const presence = new Presence({
		clientId: "830476272978362408",
	}),
	strings = presence.getStrings({
		viewHome: "general.viewHome",
		viewPage: "general.viewPage",
		viewList: "general.viewList",
		viewSeries: "general.viewSeries",
		viewGenre: "general.viewGenre",
		viewAccount: "general.viewAccount",
		watchingVid: "general.watchingVid",
		playing: "general.playing",
		paused: "general.paused",
		searchFor: "general.searchFor",
		searchSomething: "general.searchSomething",
		search: "general.search",
	}),
	getSearchKeyword = (): string =>
		new URLSearchParams(location.search).get("s"),
	upperFirstLetter = (text: string): string =>
		text.charAt(0).toUpperCase() + text.slice(1),
	getPage = (): string => {
		const elPagination = document.querySelector("ul.pagination");
		if (!elPagination) return "p.1/1";

		return `p.${elPagination
			.querySelector("li.page-item.active > a")
			.textContent.trim()}/${parseInt(
			elPagination
				.querySelector("li.page-item:last-child > a")
				.getAttribute("href")
				.split("page/")
				.pop()
		)}`;
	},
	getEpisode = (): string => {
		const elEpisodes = document.querySelector("#episodes");
		if (!elEpisodes) return "ep.1/1";

		return `ep.${elEpisodes
			.querySelector("button.active")
			.textContent.replace("Tập", "")
			.trim()}/${elEpisodes.childNodes.length}`;
	};

let video = { playback: false, currentTime: 0, duration: 0, paused: false };

presence.on(
	"iFrameData",
	(data: {
		playback: boolean;
		currentTime: number;
		duration: number;
		paused: boolean;
	}) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/0Jwz0Ct.png",
			startTimestamp: Math.floor(Date.now() / 1000),
		},
		{ pathname, search } = location,
		pagesWithoutTermName = [
			"/censored",
			"/uncensored",
			"/porn",
			"/favorite",
			"/actresses",
			"/studios",
			"/years",
		];
	if (pathname === "/" && !search) {
		presenceData.details = (await strings).viewHome;
		presenceData.state = (await strings).searchSomething;
	} else if (search.startsWith("?s")) {
		const keyword = getSearchKeyword(),
			page = getPage();

		presenceData.details = keyword
			? (await strings).searchFor
			: (await strings).search;
		presenceData.state = keyword ? `"${encodeURI(keyword)}" ${page}` : page;
	} else if (pathname.startsWith("/sign-")) {
		presenceData.details = (await strings).viewPage;
		presenceData.state = document
			.querySelector(".navbar .border-left")
			.textContent.trim();
	} else if (pathname.startsWith("/profile")) {
		presenceData.details = (await strings).viewAccount;
		presenceData.state = `${upperFirstLetter(
			document.querySelector("p > small").textContent.trim().toLowerCase()
		)}: ${document.querySelector("h2").textContent.trim()}`;
	} else if (pathname.startsWith("/category")) {
		presenceData.details = (await strings).viewGenre;
		presenceData.state = `${document
			.querySelector("h2")
			.textContent.replace(/\(.*\)$/, "")
			.trim()} ${getPage()}`;
	} else if (pathname.startsWith("/tag")) {
		presenceData.details = (await strings).viewSeries;
		presenceData.state = `${document
			.querySelector("h2")
			.textContent.replace(/\(.*\)$/, "")
			.trim()} ${getPage()}`;
	} else if (~pagesWithoutTermName.findIndex(x => pathname.startsWith(x))) {
		presenceData.details = (await strings).viewList;
		presenceData.state = `${document
			.querySelector("h2")
			.textContent.replace(/\(.*\)$/, "")
			.trim()} ${getPage()}`;
	} else if (
		~["/actress", "/studio", "/release_year"].findIndex(x =>
			pathname.startsWith(x)
		)
	) {
		presenceData.details = (await strings).viewList;
		presenceData.state = `${document
			.querySelector(".navbar .border-left")
			.textContent.trim()} ${document
			.querySelector("h2")
			.textContent.replace(/\(.*\)$/, "")
			.trim()} ${getPage()}`;
	} else if (Object.keys(video).length > 0) {
		const actresses: string[] = [],
			studios: string[] = [];

		for (const actress of document.querySelectorAll(
			"#actresses .stretched-link"
		))
			actresses.push(actress.textContent.trim());
		for (const studio of document.querySelectorAll("#studios .stretched-link"))
			studios.push(studio.textContent.trim());

		presenceData.details = `${(await strings).watchingVid}: ${`${
			document.querySelector("#censorship > a").textContent.trim() === "Porn"
				? document.querySelector("#title").textContent.trim()
				: document.querySelector("#id .list-inline-item").textContent.trim()
		} ${getEpisode()}`}`;
		presenceData.state = `${actresses.join(", ")} - ${studios.join(", ")}`;

		if (video.playback) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).paused
				: (await strings).playing;

			if (video.paused) delete presenceData.endTimestamp;
		}
	} else presenceData.details = (await strings).searchSomething;

	presence.setActivity(presenceData);
});
