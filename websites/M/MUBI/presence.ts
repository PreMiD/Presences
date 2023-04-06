const presence = new Presence({
		clientId: "1044942179958804552",
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			paused: "general.paused",
			browse: "general.browsing",
			buttonWatchVideo: "general.buttonWatchVideo",
			viewCategory: "general.viewCategory",
			search: "general.searchFor",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

enum Assets {
	Logo = "https://i.imgur.com/3gMd88s.png",
	Play = "https://i.imgur.com/OLaz6JN.png",
	Paused = "https://i.imgur.com/4iyMINk.png",
	Search = "https://i.imgur.com/oGQtnIY.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingStamp,
			largeImageKey: Assets.Logo,
		},
		{ href, pathname } = document.location,
		[newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		search = document.querySelectorAll(
			'input[name="query"]'
		)[1] as HTMLInputElement;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}
	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	if (search?.value || pathname.includes("/search/")) {
		presenceData.details = `${strings.search} ${
			search.value !== "" ? search.value : href.split("=")[1]
		}`;
		presenceData.state = `In ${
			document
				.querySelector('[class="css-1ws58ev e175rd72"]')
				?.textContent.replace(/[0-9]*,*[.]*/gm, "")
				?.toLowerCase() ?? "All categories"
		}`;
		presenceData.smallImageKey = Assets.Search;
		presence.setActivity(presenceData);
		return;
	}
	switch (pathname.split("/")[1]) {
		case "showing":
		case "": {
			presenceData.details = "Viewing the home page";
			break;
		}
		case "film": {
			presenceData.buttons = [
				{
					label: "Browse",
					url: href,
				},
			];
			presenceData.details = "Browsing movies";
			break;
		}
		case "specials": {
			presenceData.buttons = [
				{
					label: "Browse",
					url: href,
				},
			];
			presenceData.details = `Browsing ${
				document.querySelector('[class="css-9ziruj e1cgaodc1"]')?.textContent ??
				"specials"
			}`;

			break;
		}
		case "notebook": {
			if (document.querySelector('[class="css-dve9fb earvnqh7"]')) {
				presenceData.details = "Reading notebook interview about:";
				presenceData.state = document.querySelector(
					'[class="css-dve9fb earvnqh7"]'
				)?.textContent;
			} else presenceData.details = "Reading all notebook interviews";
			presenceData.buttons = [
				{
					label: "Read Notebook Interview",
					url: href,
				},
			];
			break;
		}
		case "users": {
			presenceData.details = `Viewing ${
				document.querySelector('[data-cy="profile-name"]')?.textContent
			}'s Profile`;
			presenceData.state = document
				.querySelector('[class="esexmu12 css-118gkxg ed2vlb1"]')
				?.textContent.replace(/[0-9]*,*[.]*/gm, "");
			presenceData.largeImageKey = document
				.querySelector('[class="css-1ifv4gr egle0sa2"]')
				?.getAttribute("src");
			break;
		}
		case "films":
		case "shows": {
			const video = document.querySelector<HTMLVideoElement>("video"),
				title = document.querySelector('[itemprop="name"]')?.textContent;
			if (!video) {
				presenceData.details = `${title.charAt(0)}${title
					.slice(1)
					.toLowerCase()}`;
				presenceData.largeImageKey = document
					.querySelector('[property="og:image"]')
					?.getAttribute("content");
				presenceData.state = document.querySelector(
					'[class="css-1tt0la4 e302dtw11"]'
				)?.textContent;
				presenceData.buttons = [
					{
						label: "Browse",
						url: href,
					},
				];
			} else {
				delete presenceData.startTimestamp;
				presenceData.details =
					document
						.querySelector("__next-route-announcer__")
						?.textContent?.split("|")[0] ??
					document.querySelector("title")?.textContent?.split("|")[0];
				if (video.duration && !video.paused)
					presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
				presenceData.largeImageKey =
					document
						.querySelector("#__NEXT_DATA__")
						?.innerHTML?.match(
							/https:\/\/images[.]mubicdn[.]net\/images\/(film|show)\/[0-9]*\/cache-[0-9]*-[0-9]*\/image-w1280[.]jpg/
						)
						?.at(0) ?? Assets.Logo;
				presenceData.smallImageKey = video.paused ? Assets.Paused : Assets.Play;
				presenceData.smallImageText = video.paused
					? strings.paused
					: strings.play;
				presenceData.buttons = [
					{
						label: strings.buttonWatchVideo,
						url: href,
					},
				];
			}
			break;
		}
		case "cast": {
			presenceData.details = "Viewing cast member";
			presenceData.state = document.querySelector(
				'[class="css-qbkodn era7u186"]'
			)?.textContent;
			presenceData.largeImageKey = document
				.querySelector('[class="css-r9klzk egle0sa2"]')
				?.getAttribute("src");
			break;
		}
		default: {
			const active = document.querySelector('[class="css-1dccbe3 ej6uv270"]');
			if (active?.textContent)
				presenceData.details = `Browsing ${active.textContent}`;
			else if (
				document.querySelector('[class="css-1ljf7si eugzkiw0"]')?.textContent
			) {
				presenceData.details = `Viewing ${
					document.querySelector('[class="css-1ljf7si eugzkiw0"]')?.textContent
				} settings`;
			} else presenceData.details = "Browsing...";
			break;
		}
	}

	if (!covers && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
