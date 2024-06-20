const presence = new Presence({
	clientId: "1071365131616915517",
});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/Anime%20Genzai/assets/logo.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			viewHome: "general.viewHome",
			viewing: "general.viewing",
			search: "general.search",
			searchFor: "general.searchFor",
			play: "general.watchingVid",
			pause: "general.paused",
			searchSomething: "general.searchSomething",
			watchingSeries: "general.watchingSeries",
			watchingMovie: "general.watchingMovie",
			viewPage: "general.viewPage",
			viewProfile: "general.viewProfile",
		},
		await presence.getSetting<string>("lang").catch(() => "es")
	);
}

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent?.trim();
}

function getImage(tags: string) {
	return document.querySelector<HTMLImageElement>(tags)?.src;
}

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		[newLang, privacy, logo, time, buttons] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "es"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname } = document.location;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (pathname.split("/")[1]) {
		case "":
			presenceData.details = strings.viewHome;
			break;

		case "search":
		case "tag":
			presenceData.details = privacy
				? strings.searchSomething
				: strings.searchFor;
			presenceData.state = textContent("h1.layout-title").split('"')[1];
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = strings.search;
			break;

		case "explorar":
		case "movies":
		case "series":
		case "top-imdb":
		case "platforms":
		case "platform":
			presenceData.details = strings.viewing;
			presenceData.state = textContent("li.breadcrumb-item.active");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "comunidad":
			presenceData.details = strings.viewing;
			presenceData.state = `${textContent(
				"li.breadcrumb-item.active"
			)} / ${textContent("a.fs-sm.text-white")}`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "collection":
			presenceData.details = `${strings.viewing} ${textContent(
				".breadcrumb-item a"
			)}`;
			presenceData.state = textContent(
				".layout-section > div > div:nth-child(2) > h1"
			);
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "usuario":
			presenceData.details = strings.viewProfile;
			presenceData.state = textContent("li.breadcrumb-item.active");
			presenceData.largeImageKey =
				document
					.querySelector<HTMLImageElement>(".layout-section .avatar")
					?.style?.backgroundImage?.slice(4, -1)
					?.replace(/"/g, "") || Assets.Logo;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "serie":
			presenceData.details = strings.viewPage;
			presenceData.state =
				textContent(
					".container > div > div > div > div:nth-child(2) > div > div:nth-child(2) > h1"
				) ||
				textContent(
					".container > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div > div:nth-child(2) > div > div > h1 > a"
				);
			presenceData.largeImageKey = getImage("picture > img");
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = strings.viewing;

			if (!privacy && video.currentTime > 0) {
				presenceData.details = presenceData.state;
				presenceData.state = textContent(
					".container > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div > div:nth-child(2) > div > div > h1 > span"
				);
			} else if (privacy && video.currentTime > 0)
				presenceData.details = strings.watchingSeries;
			break;

		case "movie":
			presenceData.details = strings.viewPage;
			presenceData.state = textContent(
				".container > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div > div:nth-child(2) > div > div > h1"
			);
			presenceData.largeImageKey = getImage("picture > img");
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = strings.viewing;

			if (video.currentTime > 0) {
				if (privacy) presenceData.details = strings.watchingMovie;
				else presenceData.details = presenceData.state;
				delete presenceData.state;
			}
			break;
	}

	if (!privacy && video.currentTime > 0) {
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? strings.pause : strings.play;

		if (video.paused || !time) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		} else {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
		}
	}

	if (!logo || privacy) presenceData.largeImageKey = Assets.Logo;
	if (!buttons || privacy) delete presenceData.buttons;
	if (!time) delete presenceData.startTimestamp;
	if (privacy) delete presenceData.state;
	presence.setActivity(presenceData);
});
