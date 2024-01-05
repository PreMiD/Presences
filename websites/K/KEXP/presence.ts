const presence = new Presence({ clientId: "1138970637440917504" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	defaultImageUrl = "https://cdn.rcd.gg/PreMiD/websites/K/KEXP/assets/logo.png",
	watchPaths = ["/archive/", "/podcasts/", "/shows/", "/djs/", "/schedule/"];

async function updatePresence() {
	const strings = await presence.getStrings({
			pause: "general.paused",
			play: "general.playing",
			profile: "general.readingAbout",
			reading: "general.readingAnArticle",
			watching: "general.watching",
		}),
		currentPagePath = document.location.pathname,
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: defaultImageUrl,
		};

	function setDetails(detailsKey: keyof typeof strings, imageKey: string) {
		presenceData.details = strings[detailsKey];
		presenceData.smallImageKey = imageKey;
		presenceData.smallImageText = strings[detailsKey];
	}

	switch (true) {
		case watchPaths.includes(currentPagePath):
			setDetails("watching", Assets.Viewing);
			presenceData.state = document.querySelector(".InlineMenu-current");
			break;

		case ["/podcasts/", "/shows/"].some(path =>
			currentPagePath.startsWith(path)
		):
			setDetails("reading", Assets.Reading);
			presenceData.state = document.querySelector("h1")?.textContent;
			break;

		case currentPagePath.startsWith("/djs/"):
			setDetails("profile", Assets.Reading);
			presenceData.state = document.querySelector("h3")?.textContent;
			break;

		default: {
			const coverImage = document
				.querySelector(".Player-coverImage")
				?.getAttribute("src");

			presenceData.details =
				document.querySelector("a.Player-show")?.textContent;
			presenceData.largeImageKey = coverImage?.startsWith("https://")
				? coverImage
				: defaultImageUrl;
			presenceData.state =
				document.querySelector("div.Player-title")?.textContent;

			const playBackStatus = document.querySelector("button.Player-ctaButton");
			if (playBackStatus) {
				presenceData.smallImageKey =
					playBackStatus.ariaLabel === "Play Stream"
						? Assets.Pause
						: Assets.Play;
				presenceData.smallImageText =
					strings[
						playBackStatus.ariaLabel === "Play Stream" ? "pause" : "play"
					];
			}
			break;
		}
	}

	presence.setActivity(presenceData);
}

presence.on("UpdateData", updatePresence);
