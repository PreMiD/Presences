const presence = new Presence({
		clientId: "878203434468245545",
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

let data: {
	writing: boolean;
	details: string;
	smallImageKey: string;
} = null;

presence.on(
	"iFrameData",
	async (recievedData: {
		writing: boolean;
		details: string;
		smallImageKey: string;
	}) => {
		data = recievedData;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kKn9z4w.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search, hostname } = document.location,
		buttons = await presence.getSetting<boolean>("buttons");

	if (document.querySelector("ul.search-main-menu.active")) {
		const searchBar = document.querySelector<HTMLInputElement>(
			"input.manga-search-field.ui-autocomplete-input"
		);
		presenceData.details = "Searching";
		if (searchBar && searchBar.value) presenceData.state = searchBar.value;
		presenceData.smallImageText = presenceData.smallImageKey = Assets.Search;
	} else if (pathname === "/") {
		if (search) {
			const results = document.querySelector<HTMLHeadingElement>("h1.h4");
			presenceData.details = "Looking at";
			if (results) presenceData.state = results.textContent;
			presenceData.smallImageText = presenceData.smallImageKey = Assets.Search;
		} else presenceData.details = "At homepage";
	} else if (
		pathname === "/manga/" ||
		pathname.startsWith("/manga-genre/") ||
		pathname === "/webtoons" ||
		pathname.startsWith("/webtoon-genre/") ||
		pathname.startsWith("/webtoon-tag")
	) {
		const order = document.querySelector<HTMLLIElement>(
				"div.c-nav-tabs > ul > li.active"
			),
			category = document.querySelector<HTMLHeadingElement>("h1.item-title.h4");
		presenceData.details = `Looking for ${
			(pathname.startsWith("/manga-genre") ||
				pathname.startsWith("/webtoon-genre") ||
				pathname.startsWith("/webtoon-tag")) &&
			category
				? category.textContent
				: ""
		} ${hostname.endsWith(".com") ? "Manhwas" : "Mangas"}`;
		if (order) presenceData.state = `Ordered By ${order.textContent}`;
		presenceData.smallImageText = presenceData.smallImageKey = "looking";
	} else if (
		pathname.startsWith("/manga/") ||
		pathname.startsWith("/webtoon/")
	) {
		const title = document.querySelector<HTMLHeadingElement>(
				"div.post-title > h1"
			),
			chapterHeading =
				document.querySelector<HTMLHeadingElement>("h1#chapter-heading");
		if (chapterHeading) {
			const [title, chapter] = chapterHeading.textContent.split("-");
			presenceData.details = `Reading ${title}`;
			if (data && data.writing) {
				presenceData.state = data.details;
				presenceData.smallImageText = presenceData.smallImageKey =
					data.smallImageKey;
			} else {
				presenceData.state = chapter;
				presenceData.smallImageText = presenceData.smallImageKey =
					Assets.Reading;
			}
			if (buttons) {
				presenceData.buttons = [
					{ label: "Read Manga", url: href },
					{
						label: "Read Summary",
						url: href.substring(0, href.lastIndexOf("chapter")),
					},
				];
			}
		} else if (location.hash) {
			presenceData.details = title.textContent;
			if (data && data.writing) {
				presenceData.state = data.details;
				presenceData.smallImageText = presenceData.smallImageKey =
					data.smallImageKey;
			} else {
				presenceData.state = "Reading Commments";
				presenceData.smallImageText = presenceData.smallImageKey =
					Assets.Reading;
			}
			if (buttons)
				presenceData.buttons = [{ label: "See Comments", url: href }];
		} else {
			presenceData.details = "Reading Summary";
			if (title) presenceData.state = title.textContent;
			if (buttons)
				presenceData.buttons = [{ label: "Read Summary", url: href }];
		}
	} else if (pathname.startsWith("/user-settings")) {
		const tab = document.querySelector<HTMLLIElement>("li.active");
		presenceData.details = "Viewing User Settings";
		if (tab) presenceData.state = tab.textContent;
	} else if (pathname === "/legal-disclaimer/")
		presenceData.details = "Legal Disclaimer";
	else if (pathname.startsWith("/privacy-policy"))
		presenceData.details = "Privacy Policy";
	else if (pathname === "/about-us/") presenceData.details = "About Us";
	else if (pathname.startsWith("/contact")) presenceData.details = "Contact Us";
	else if (pathname === "/terms") presenceData.details = "Terms of Service";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
