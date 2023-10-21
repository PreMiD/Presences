const presence = new Presence({
		clientId: "684174415415476240",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/N/Niantic%20Wayfarer/assets/logo.png",
	Pin = "https://cdn.discordapp.com/app-assets/684174415415476240/684175146973790208.png?size=512",
}

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		shortenedURLs[url] = Assets.Logo;
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	if (pathname.includes("/review")) {
		const title = document.querySelector(
				"app-title-and-description .wf-review-card__body a"
			),
			description = document.querySelector(
				"app-title-and-description .wf-review-card__body a+div"
			),
			location = document.querySelector(
				"app-should-be-wayspot .wf-review-card__body > div > div:last-child"
			);
		if (title && description && location) {
			presenceData.largeImageKey = await getShortURL(
				document
					.querySelector<HTMLDivElement>(
						"app-should-be-wayspot .wf-image-modal"
					)
					.style.backgroundImage.match(/url\("(.+)"\)/)[1]
			);
			presenceData.smallImageKey = Assets.Pin;
			presenceData.details = `Reviewing: ${title.textContent.trim()}`;
			presenceData.state = `Description: ${description.textContent.trim()}`;
			presenceData.smallImageText = `Address: ${location.textContent
				.split(":")[1]
				.trim()}`;
		} else {
			presenceData.details = "Getting ready to";
			presenceData.state = "review a location";
		}
	} else if (pathname.includes("/settings"))
		presenceData.details = "Managing settings";
	else if (pathname.includes("/help")) {
		const article = document
			.querySelector("wf-page-header h2 a + span")
			?.textContent.split(">")[1]
			.trim();
		presenceData.smallImageKey = Assets.Reading;
		if (article) {
			presenceData.details = "Reading article:";
			presenceData.state = article;
		} else presenceData.details = "Browsing the Help Center";
	} else if (pathname.includes("/criteria")) {
		presenceData.details = "Reading criteria";
		presenceData.state = document
			.querySelector("wf-subnavigation li li[class*=selected]")
			.textContent.trim();
	} else if (pathname.includes("/login")) presenceData.details = "Logging in";
	else if (pathname.includes("/profile")) {
		presenceData.details = "Viewing their profile";
		presenceData.state = `Rating: ${document
			.querySelector("wf-rating-bar section[class*=active]")
			.textContent.trim()}`;
		presenceData.smallImageKey = await getShortURL(
			document.querySelector<SVGImageElement>("wf-upgrade-visualization image")
				.href.baseVal
		);
		const agreements = [
				...document.querySelectorAll(
					"wf-profile-stats > div > div:not([class]):not(:last-child) .wf-profile-stats__stat"
				),
			].reduce((value, element) => {
				return value + +element.children[1].textContent.trim();
			}, 0),
			total = +document
				.querySelector(
					"wf-profile-stats > div > .wf-profile-stats__stat > div:last-child"
				)
				.textContent.trim();
		presenceData.smallImageText = `Total: ${total}, Agreements: ${agreements} (${(
			(agreements / total) *
			100
		).toFixed(1)}%)`;
	} else if (pathname.includes("/nominations"))
		presenceData.details = "Viewing their nominations";
	else if (pathname.includes("/showcase"))
		presenceData.details = "Viewing the showcased wayspots";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
