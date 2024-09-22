const presence: Presence = new Presence({
		clientId: "630236276829716483",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			browsing: "general.browsing",
			watchingMovie: "general.watchingMovie",
			watchingSeries: "general.watchingSeries",
			watchEpisode: "general.buttonViewEpisode",
			watchVideo: "general.buttonWatchVideo",
			searchFor: "general.searchFor",
			searchSomething: "general.searchSomething",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null,
	title: string,
	subtitle: string;

presence.on("UpdateData", async () => {
	const [newLang, privacy, time, buttons] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<number>("buttons"),
		]),
		{ hostname, href, pathname } = document.location,
		presenceData: PresenceData & {
			partySize?: number;
			partyMax?: number;
		} = { startTimestamp: browsingTimestamp, type: ActivityType.Watching };

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (true) {
		case /(www\.)?disneyplus\.com/.test(hostname): {
			presenceData.largeImageKey =
				"https://cdn.rcd.gg/PreMiD/websites/D/Disney+/assets/logo.png";
			switch (true) {
				case pathname.includes("play"): {
					if (!privacy) {
						if (presenceData.startTimestamp) delete presenceData.startTimestamp;
						presenceData.details = document.querySelector(
							".title-field.body-copy"
						)?.textContent;
						presenceData.state =
							document.querySelector(".subtitle-field")?.textContent;

						const paused = !!document.querySelector("[aria-label='Play']"),
							timeRemaining = document.querySelector(
								".time-remaining-label"
							)?.textContent;

						presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
						presenceData.smallImageText = paused ? strings.pause : strings.play;

						if (!paused && timeRemaining) {
							presenceData.endTimestamp =
								Date.now() / 1000 + presence.timestampFromFormat(timeRemaining);
						}
					} else presenceData.details = "Watching content";

					presenceData.buttons = [
						{
							label: "Watch Content",
							url: href,
						},
					];
					break;
				}
				case pathname.includes("entity"): {
					if (document.querySelector("#episodes_control") !== null) {
						presenceData.details = privacy
							? "Viewing a series"
							: "Viewing series";
						presenceData.buttons = [
							{
								label: "View Series",
								url: href,
							},
						];
					} else {
						presenceData.details = privacy
							? "Viewing a movie"
							: "Viewing movie";
						presenceData.buttons = [
							{
								label: "View Movie",
								url: href,
							},
						];
					}
					const titleImg = document.querySelector(
						'[data-testid="details-title-treatment"] img, .explore-ui-main-content-container img'
					);
					if (titleImg) presenceData.state = titleImg.getAttribute("alt");
					else if (document.title.includes("|"))
						presenceData.state = document.title.split("|")[0].trim();
					else presenceData.state = document.title;
					break;
				}
				case pathname.includes("search"): {
					const search = document.querySelector<HTMLInputElement>(
						'input[type="search"]'
					);
					if (search?.value) {
						presenceData.details = privacy
							? strings.searchSomething
							: strings.searchFor;
						presenceData.state = search.value;
						presenceData.smallImageKey = Assets.Search;
					} else presenceData.details = strings.browsing;
					break;
				}
				case pathname.includes("home"): {
					presenceData.details = strings.browsing;
					break;
				}
				case pathname.includes("watchlist"): {
					presenceData.details = privacy
						? strings.browsing
						: "Browsing their watchlist";

					break;
				}
				case pathname.includes("series"): {
					presenceData.details = privacy ? strings.browsing : "Browsing series";
					const sortingChoice = document
						.querySelector(
							'[id="explore-ui-main-content-container"] div div [aria-selected="true"]'
						)
						?.textContent?.toLowerCase();
					if (sortingChoice !== null)
						presenceData.state = `Sorted by ${sortingChoice}`;
					break;
				}
				case pathname.includes("movies"): {
					presenceData.details = privacy ? strings.browsing : "Browsing movies";
					const sortingChoice = document
						.querySelector(
							'[id="explore-ui-main-content-container"] div div [aria-selected="true"]'
						)
						?.textContent?.toLowerCase();
					if (sortingChoice !== null)
						presenceData.state = `Sorted by ${sortingChoice}`;
					break;
				}
				case pathname.includes("page"): {
					presenceData.details = privacy
						? "Browsing videos"
						: `Viewing ${document.title
								?.match(
									/(pixar)|(marvel)|(star wars)|(national geographic)|(star)|(disney)/im
								)[0]
								?.toLowerCase()} content`;
					break;
				}
				default: {
					if (!privacy) {
						if (document.title.includes("|")) {
							presenceData.details = `Page: ${document.title
								.split("|")[0]
								.trim()}`;
						} else presenceData.details = `Page: ${document.title}`;
					} else presenceData.details = "No information";
					break;
				}
			}
			break;
		}
		case /(www\.)?hotstar\.com/.test(hostname): {
			const video = document.querySelector<HTMLVideoElement>("video");
			presenceData.largeImageKey =
				"https://cdn.rcd.gg/PreMiD/websites/D/Disney+/assets/0.png";

			if (video && !isNaN(video.duration)) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);

				title = document.querySelector(
					"h1.ON_IMAGE.BUTTON1_MEDIUM"
				)?.textContent;
				subtitle = document.querySelector(
					"p.ON_IMAGE_ALT2.BUTTON3_MEDIUM"
				)?.textContent;

				if (!title) presence.error("Unable to get the title");

				if (privacy) {
					presenceData.state = subtitle
						? strings.watchingSeries
						: strings.watchingMovie;
				} else {
					presenceData.details = title;
					presenceData.state = subtitle || "Movie";
				}
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused
					? strings.pause
					: strings.play;

				if (video.paused || !time) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}

				if (!privacy && buttons) {
					presenceData.buttons = [
						{
							label: strings.watchVideo,
							url: href,
						},
					];
				}

				if (title) presence.setActivity(presenceData, !video.paused);
			}
			break;
		}
	}
	if ((presenceData.startTimestamp || presenceData.endTimestamp) && !time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (privacy && presenceData.state) delete presenceData.state;
	if ((!buttons || privacy) && presenceData.buttons)
		delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
