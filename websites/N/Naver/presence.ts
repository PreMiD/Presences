const presence = new Presence({
		clientId: "825307070584586250",
	}),
	data: {
		isChecked: boolean;
		service: [string, string];
		settings?: {
			id: string;
			delete?: boolean;
			data: string[];
		}[];
	} = {
		isChecked: false,
		service: null,
	},
	/* eslint-disable camelcase */
	assets: Record<string, string> = {
		naver:
			"https://cdn.discordapp.com/app-icons/825307070584586250/a68964d8b1379c3440b25fda7b91ddd3.png?size=512",
		naver_webtoon:
			"https://cdn.discordapp.com/app-icons/827171135970869269/0b6d3b9f2cb6581d2fecda2b62bf6de2.png?size=512",
		naver_series:
			"https://cdn.discordapp.com/app-icons/907151903564120135/a7f2fb845d4b281b2c4dc34dd494969c.png?size=512",
		naver_tv:
			"https://cdn.discordapp.com/app-icons/827170810870890517/d23dc00b5edfade991b32fdd8cd6faa6.png?size=512",
		naver_papago:
			"https://cdn.discordapp.com/app-icons/827170714729578546/b3f02012b4ae188f245d9cd4e78be721.png?size=512",
		naver_blog:
			"https://cdn.discordapp.com/app-icons/827171204288872449/92aa96637c18dab3a2a8866d09beff24.png?size=512",
		naver_blog_browse:
			"https://cdn.discordapp.com/app-assets/827171204288872449/827173061572296804.png?size=512",
		naver_cafe:
			"https://cdn.discordapp.com/app-icons/848153448041938952/7d62d53f5fc4bcfcfc76338ad23603ee.png?size=512",
	};
/* eslint-enable camelcase */

const enum MainAssets {
	Browse = "https://cdn.discordapp.com/app-assets/825307070584586250/826435062756278273.png?size=512",
	Book = "https://cdn.discordapp.com/app-assets/825307070584586250/826447462554140704.png?size=512",
	Play = "https://cdn.discordapp.com/app-assets/827170810870890517/827172409979305995.png?size=512",
	Pause = "https://cdn.discordapp.com/app-assets/827170810870890517/827172409936314378.png?size=512",
	Language = "https://cdn.discordapp.com/app-assets/827170714729578546/827172528383590460.png?size=512",
}

function getServiceName(url = document.location.hostname): [string, string] {
	switch (true) {
		case !!url.match(/tv[.]naver[.]([a-z0-9]+)/):
			return ["Naver TV", "NAVER_TV"];
		case !!url.match(/comic[.]naver[.]([a-z0-9]+)/):
			return ["Naver Webtoon", "NAVER_WEBTOON"];
		case !!url.match(/papago[.]naver[.]([a-z0-9]+)/):
			return ["Papago", "NAVER_PAPAGO"];
		case !!url.match(/blog[.]naver[.]([a-z0-9]+)/):
			return ["Naver Blog", "NAVER_BLOG"];
		case !!url.match(/cafe[.]naver[.]([a-z0-9]+)/):
			return ["Naver Cafe", "NAVER_CAFE"];
		case !!url.match(/(novel|series)[.]naver[.]([a-z0-9]+)/):
			return ["Naver Series", "NAVER_SERIES"];
		case !!url.match(/([a-z]+)[.]naver[.]([a-z0-9]+)/):
			return ["Naver", "NAVER"];
		default:
			break;
	}
}

let blog: string, cafeTitle: string;

presence.on("iFrameData", (data: { blog: string }) => {
	({ blog } = data);
});

presence.on("UpdateData", async () => {
	if (!data.isChecked) {
		data.service = getServiceName();
		data.isChecked = true;
	}

	const presenceData: PresenceData = {
		name: data.service[0],
		details: "Browsing...",
		largeImageKey: assets[data.service[1].toLowerCase()],
		smallImageKey:
			assets[`${data.service[1].toLowerCase()}_browse`] ?? MainAssets.Browse,
	};

	data.settings = [
		{
			id: "buttons",
			delete: true,
			data: ["buttons"],
		},
	];

	switch (data.service[1]) {
		case "NAVER_TV": {
			if (document.location.pathname.match("/v/([0-9]+)")) {
				if (
					document.querySelector<HTMLElement>("div.ad_info_area")?.offsetParent
				) {
					const video = document.querySelector<HTMLVideoElement>(
						'[data-role="videoEl"]'
					);
					presenceData.details = "Currently watching an ad";
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);
					presenceData.smallImageKey = MainAssets.Play;
					presenceData.smallImageText = "Playing";

					if (video.paused) {
						presenceData.smallImageKey = MainAssets.Pause;
						presenceData.smallImageText = "Paused";
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				} else {
					const video = document.querySelector("video");

					presenceData.details = document.querySelector(
						"h2[class^=ArticleSection_article_title_]"
					)?.textContent;
					presenceData.state = document
						.querySelector("strong[class^=ArticleSection_channel_title_]")
						?.textContent.trim();

					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);
					presenceData.smallImageKey = MainAssets.Play;
					presenceData.smallImageText = "Playing";

					if (video.paused) {
						presenceData.smallImageKey = MainAssets.Pause;
						presenceData.smallImageText = "Paused";
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}

					presenceData.buttons = [
						{
							url: location.href,
							label: "Watch Video",
						},
						{
							url: document.querySelector<HTMLAnchorElement>(
								"a[class^=ArticleSection_link_channel_]"
							).href,
							label: "View Channel",
						},
					];
				}
			} else if (document.querySelector("div[class^=showId_container]")) {
				presenceData.details = "Viewing channel:";
				presenceData.state = document.querySelector("h2").textContent;
				presenceData.buttons = [
					{
						url: location.href,
						label: "View Channel",
					},
				];
			}
			break;
		}
		case "NAVER_BLOG": {
			if (location.pathname.match("/([a-z])")) {
				presenceData.details = "Reading a blog post:";
				presenceData.state = blog;

				presenceData.buttons = [
					{
						url: location.href,
						label: "Read Blog",
					},
				];
			}
			break;
		}
		case "NAVER_CAFE": {
			if (location.pathname.match("/([a-z])")) {
				cafeTitle ??= document.querySelector("h1.d-none")?.textContent;
				if (cafeTitle) {
					presenceData.details = "Viewing cafe:";
					presenceData.state = cafeTitle;

					presenceData.buttons = [
						{
							label: "View Cafe",
							url: location.href,
						},
					];
				} else if (document.location.pathname.includes("/search/"))
					presenceData.details = "Searching for something";
			}
			break;
		}
		case "NAVER_SERIES": {
			if (location.pathname.startsWith("/novel")) {
				if (location.pathname.includes("detail.series")) {
					presenceData.details = "Viewing novel:";
					presenceData.state = document.querySelector("#content h2");
					presenceData.buttons = [{ url: location.href, label: "View Novel" }];
				}
			} else if (location.pathname.startsWith("/webnovel")) {
				if (location.pathname.includes("/list")) {
					presenceData.details = "Viewing web novel:";
					presenceData.state = document.querySelector("h2.title");
					presenceData.buttons = [{ url: location.href, label: "View Novel" }];
				} else if (location.pathname.includes("/detail")) {
					presenceData.details = document.querySelector(
						"#menuFloatingLayer > a"
					).textContent;
					presenceData.state =
						document.querySelector("#topVolumeList").textContent;
					presenceData.buttons = [
						{ url: location.href, label: "Read Epiosde" },
					];
					presenceData.smallImageKey = MainAssets.Book;
				}
			}
			break;
		}
		case "NAVER_WEBTOON": {
			if (location.pathname.startsWith("/webtoon/list")) {
				presenceData.details = "Viewing webtoon:";
				presenceData.state = document.querySelector(
					"h2[class^=EpisodeListInfo__title]"
				);
				presenceData.buttons = [{ url: location.href, label: "View Webtoon" }];
			} else if (location.pathname.startsWith("/webtoon/detail")) {
				const [title, ep] = document
					.querySelector<HTMLMetaElement>('[property="og:title"]')
					.content.split(" - ");
				presenceData.details = ep;
				presenceData.state = title;
				presenceData.buttons = [{ url: location.href, label: "Read Episode" }];
				presenceData.smallImageKey = MainAssets.Book;
			}
			break;
		}
		case "NAVER_PAPAGO": {
			if (location.pathname.startsWith("/website")) {
				presenceData.details = "Translating a website";
				presenceData.smallImageKey = MainAssets.Language;
			} else if (location.pathname.startsWith("/docs")) {
				presenceData.details = "Translating a document";
				presenceData.smallImageKey = MainAssets.Language;
			} else if (location.pathname === "/") {
				presenceData.details = "Translating something...";
				presenceData.smallImageKey = MainAssets.Language;
			}
			break;
		}
		case "NAVER": {
			if (location.pathname === "/search.naver")
				presenceData.details = "Searching for something";

			break;
		}
	}

	if (data.settings) {
		for (const setting of data.settings) {
			if (!(await presence.getSetting<boolean>(setting.id)) && setting.delete)
				for (const x of setting.data) delete presenceData[<"state">x];
		}
	}

	presence.setActivity(presenceData);
});
