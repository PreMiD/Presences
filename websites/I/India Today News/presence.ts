const presence = new Presence({
		clientId: "1051110545723506718",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

interface iFrameData {
	duration: number;
	currentTime: number;
	paused: boolean;
}

let video: iFrameData = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

enum Assets {
	Logo = "https://i.imgur.com/JJHnTn3.png",
	Reading = "https://i.imgur.com/8vMPNni.png",
	Searching = "https://i.imgur.com/oGQtnIY.png",
	Pause = "https://i.imgur.com/0A75vqT.png",
	Play = "https://i.imgur.com/Dj5dekr.png",
	Live = "https://i.imgur.com/wtweZhK.png",
}

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "Unsupported page",
			smallImageKey: Assets.Logo,
			smallImageText: "India Today News",
		},
		strings: Awaited<ReturnType<typeof getStrings>>,
		oldLang: string = null;

	const { href, pathname } = document.location,
		[showTimestamp, showButtons, showAuthor, newLang] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("author"),
			presence.getSetting<string>("lang").catch(() => "en"),
		]),
		pages: Record<string, PresenceData> = {
			"/elections": {
				details: "Viewing election news",
				buttons: [
					{
						label: "View election news",
						url: href,
					},
				],
			},
			"/india": {
				details: "Viewing Indian news",
				buttons: [
					{
						label: "View Indian news",
						url: href,
					},
				],
			},
			"/world": {
				details: "Viewing world news",
				buttons: [
					{
						label: "View world news",
						url: href,
					},
				],
			},
			"/business": {
				details: "Viewing business news",
				buttons: [
					{
						label: "View business news",
						url: href,
					},
				],
			},
			"/technology": {
				details: "Viewing technology news",
				buttons: [
					{
						label: "View technology news",
						url: href,
					},
				],
			},
			"/showbuzz": {
				details: "Viewing showbuzz news",
				buttons: [
					{
						label: "View showbuzz news",
						url: href,
					},
				],
			},
			"/movies": {
				details: "Viewing movie news",
				buttons: [
					{
						label: "View movie news",
						url: href,
					},
				],
			},
			"/sports": {
				details: "Viewing sports news",
				buttons: [
					{
						label: "View sports news",
						url: href,
					},
				],
			},
			"/health": {
				details: "Viewing health news",
				buttons: [
					{
						label: "View health news",
						url: href,
					},
				],
			},
			"/news-analysis": {
				details: "Viewing news analysis news",
				buttons: [
					{
						label: "View news analysis news",
						url: href,
					},
				],
			},
			"/magazine": {
				details: "Viewing magazine news",
				buttons: [
					{
						label: "View magazine news",
						url: href,
					},
				],
			},
			"/trending-news": {
				details: "Viewing trending news news",
				buttons: [
					{
						label: "View trending news news",
						url: href,
					},
				],
			},
			"/newsmo": {
				details: "Viewing newsmo news",
				buttons: [
					{
						label: "View newsmo news",
						url: href,
					},
				],
			},
			"/lifestyle": {
				details: "Viewing lifestyle news",
				buttons: [
					{
						label: "View lifestyle news",
						url: href,
					},
				],
			},
			"/environment": {
				details: "Viewing environment news",
				buttons: [
					{
						label: "View environment news",
						url: href,
					},
				],
			},
			"/education-today": {
				details: "Viewing education news",
				buttons: [
					{
						label: "View education news",
						url: href,
					},
				],
			},
			"/law-today": {
				details: "Viewing law news",
				buttons: [
					{
						label: "View law news",
						url: href,
					},
				],
			},
			"/auto": {
				details: "Viewing auto news",
				buttons: [
					{
						label: "View auto news",
						url: href,
					},
				],
			},
			"/cities": {
				details: "Viewing cities news",
				buttons: [
					{
						label: "View cities news",
						url: href,
					},
				],
			},
			"/crime": {
				details: "Viewing crime news",
				buttons: [
					{
						label: "View crime news",
						url: href,
					},
				],
			},
			"/podcasts": {
				details: "Viewing podcasts news",
				buttons: [
					{
						label: "View podcasts news",
						url: href,
					},
				],
			},
			"/opinion-columns": {
				details: "Viewing opinion columns news",
				buttons: [
					{
						label: "View opinion columns news",
						url: href,
					},
				],
			},
			"/horoscopes": {
				details: "Viewing horoscopes news",
				buttons: [
					{
						label: "View horoscopes news",
						url: href,
					},
				],
			},
			"/interactive": {
				details: "Viewing interactive news",
				buttons: [
					{
						label: "View interactive news",
						url: href,
					},
				],
			},
			"/visualstories": {
				details: "Viewing visual stories",
				buttons: [
					{
						label: "View visual stories",
						url: href,
					},
				],
			},
			"/cryptocurrency": {
				details: "Viewing cryptocurrency news",
				buttons: [
					{
						label: "View cryptocurrency news",
						url: href,
					},
				],
			},
			"/fact-check": {
				details: "Viewing fact check news",
				buttons: [
					{
						label: "View fact check news",
						url: href,
					},
				],
			},
			"/data-intelligence-unit": {
				details: "Viewing DIU news",
				buttons: [
					{
						label: "View DIU news",
						url: href,
					},
				],
			},
			"/photo": {
				details: "Viewing photo news",
				buttons: [
					{
						label: "View photo news",
						url: href,
					},
				],
			},
			"/news.html": {
				details: "Viewing news",
				buttons: [
					{
						label: "View news",
						url: href,
					},
				],
			},
			"/foryou": {
				details: "Viewing for you page",
				buttons: [
					{
						label: "View for you page",
						url: href,
					},
				],
			},
			"/cover-story": {
				details: "Viewing cover story",
				buttons: [
					{
						label: "View cover story",
						url: href,
					},
				],
			},
			"/programmes": {
				details: "Viewing programmes",
				buttons: [
					{
						label: "View programmes",
						url: href,
					},
				],
			},
		},
		storyDate = document.querySelector("span.strydate")?.textContent,
		authorTitle = document
			.querySelector("div.Story_story__author__cJoes")
			?.querySelector("a.jsx-99cc083358cc2e2d")?.textContent,
		multipleAuthors = document.querySelector("div.Story_authors__OqkJZ");
	/* deepscan-disable-next-line CONSTANT_CONDITION */
	if (oldLang !== newLang || !strings) {
		oldLang = newLang; /* deepscan-disable-line UNUSED_VAR_ASSIGN */
		strings = await getStrings();
	}

	for (const [path, data] of Object.entries(pages))
		if (pathname.includes(path)) presenceData = { ...presenceData, ...data };

	if (pathname === "/") presenceData.details = "Viewing the homepage";
	else if (pathname.includes("/search/")) {
		presenceData.details = "Searching for";
		presenceData.state = pathname.split("/search/")[1];
		presenceData.smallImageKey = Assets.Searching;
		presenceData.smallImageText = "Searching";
		presenceData.buttons = [
			{
				label: "View search results",
				url: href,
			},
		];
	} else if (pathname.includes("/photo")) {
		presenceData.details = document.querySelector(
			"h1.Photo_maintitle__G_cdj"
		)?.textContent;
		presenceData.state = `Total of ${
			document.querySelector("span.typedata")?.textContent.split("/")[1]
		} photos`;
		presenceData.largeImageKey = document
			.querySelector("div.PhotoCard_card__pic__axT6x")
			?.querySelector("img")?.src;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = "India Today News - Photos";
		presenceData.buttons = [
			{
				label: "View article",
				url: href,
			},
		];

		if (pathname.includes("s") && !pathname.includes("/photo/")) {
			presenceData.details = `Viewing ${pathname
				.split("/photos")[0]
				?.replace("/", "")
				?.split("/")[1]
				.toUpperCase()} Photo Gallery`;
			presenceData.largeImageKey = Assets.Logo;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "India Today News - Photo Gallery";
			presenceData.buttons = [
				{
					label: "View Photo Gallery",
					url: href,
				},
			];
			delete presenceData.state;
		}
	} else if (video && !isNaN(video.duration) && pathname.includes("/video")) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(video.currentTime),
			Math.floor(video.duration)
		);
		presenceData.details = document.querySelector(
			"h1.Videoplayer_title__3Vk_I"
		)?.textContent;
		presenceData.state = storyDate;
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? strings.pause : strings.play;
		presenceData.buttons = [
			{
				label: "Watch video",
				url: href,
			},
		];

		if (showTimestamp) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}

		if (video.paused) delete presenceData.endTimestamp;

		if (pathname.includes("s") && !pathname.includes("/video/")) {
			presenceData.details = `Viewing ${pathname
				.split("/videos")[0]
				?.replace("/", "")
				?.split("/")[1]
				.toUpperCase()} Videos`;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "India Today News - Videos";
			presenceData.buttons = [
				{
					label: "View Videos",
					url: href,
				},
			];
		}
	} else if (pathname.includes("/weather/")) {
		presenceData.details = document
			.querySelector("div.wtr_ttl_lhs")
			?.querySelector("h1")
			?.textContent.split("Today")[0];
		presenceData.state = document
			.querySelector("div.wtr_ttl_lhs")
			?.querySelector("h1")
			?.textContent.split("Today")[1];
		presenceData.smallImageKey = document
			.querySelector("span.wkl_li_icn")
			?.querySelector("img")?.src;
		presenceData.smallImageText = `${
			document.querySelector("span.wtr_tmp_txt")?.textContent
		} - ${
			document.querySelector("div.wtr_tmp_rhs")?.querySelector("strong")
				?.textContent
		}°C`;
		presenceData.buttons = [
			{
				label: "View Weather",
				url: href,
			},
		];
	} else if (pathname.includes("/story")) {
		presenceData.details = document.querySelector(
			"h1.Story_strytitle__MYXmR"
		)?.textContent;
		presenceData.state = storyDate;
		presenceData.largeImageKey = document
			.querySelector("div.Story_associate__image__bYOH_")
			?.querySelector("img")?.src;
		presenceData.smallImageKey = document
			.querySelector("a.jsx-99cc083358cc2e2d")
			?.querySelector("img")?.src;
		presenceData.smallImageText = authorTitle;
		presenceData.buttons = [
			{
				label: "Read Article",
				url: href,
			},
		];

		if (pathname.includes("/india/story"))
			presenceData.largeImageKey = Assets.Logo;

		if (multipleAuthors) {
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = "Multiple Authors";
		}
	} else if (video && !isNaN(video.duration) && pathname.includes("livetv")) {
		presenceData.details = "Watching Live TV";
		presenceData.state = document
			.querySelector("h1.Livetv_titlewithicon__Z2jnL")
			?.textContent.toUpperCase()
			?.replace("LIVE TV", "");
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Live;
		presenceData.smallImageText = video.paused ? strings.pause : "Live";
		presenceData.buttons = [
			{
				label: "Watch Live TV",
				url: href,
			},
		];
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;
	if (showAuthor) {
		if (pathname.includes("/story")) {
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading article";
		}
	} else if (pathname.includes("/story") && !multipleAuthors) {
		presenceData.buttons.push({
			label: "View Author",
			url: document
				.querySelector("div.Story_story__author__cJoes")
				?.querySelector("a.jsx-99cc083358cc2e2d")
				?.getAttribute("href"),
		});
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
