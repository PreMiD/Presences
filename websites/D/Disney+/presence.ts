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
	const [newLang, privacy, time, buttons, groupWatchBtn] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<number>("buttons"),
			presence.getSetting<boolean>("groupWatchBtn"),
		]),
		{ href, pathname } = document.location,
		isHostDP = /(www\.)?disneyplus\.com/.test(location.hostname),
		isHostHS = /(www\.)?hotstar\.com/.test(location.hostname),
		presenceData: PresenceData & {
			partySize?: number;
			partyMax?: number;
		} = { startTimestamp: browsingTimestamp },
		video = document.querySelector<HTMLVideoElement>("video");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (true) {
		case isHostDP: {
			presenceData.largeImageKey =
				"https://cdn.rcd.gg/PreMiD/websites/D/Disney+/assets/logo.png";
			switch (true) {
				case pathname.includes("video"): {
					if (presenceData.startTimestamp) delete presenceData.startTimestamp;
					presenceData.details = document.querySelector(
						"[class='title-field body-copy']"
					)?.textContent;
					presenceData.state = document
						.querySelector('[class="subtitle-field"]')
						?.textContent.split(" ")[0];
					if (video) {
						delete presenceData.startTimestamp;
						presenceData.smallImageKey = video.paused
							? Assets.Pause
							: Assets.Play;
						presenceData.smallImageText = video.paused
							? strings.pause
							: strings.play;
						const stamps = document
							.querySelectorAll('[class="slider-container"]')[1]
							.getAttribute("aria-valuetext")
							.split("of ");
						if (!video.paused && !isNaN(Number(stamps[1]))) {
							presenceData.endTimestamp = presence.getTimestamps(
								video.currentTime,
								presence.timestampFromFormat(stamps[1])
							)[1];
						}
					}
					break;
				}
				case !!document.querySelector('[data-gv2containerkey="contentMeta"]'): {
					if (pathname.includes("series")) {
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
					presenceData.state = document
						.querySelector('[id="details_index"]')
						.querySelector("img")
						.getAttribute("alt");
					break;
				}
				case pathname.includes("search"): {
					const search = document.querySelector<HTMLInputElement>(
						'[id="search-input"]'
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
				case pathname.includes("groupwatch"): {
					presenceData.details = "Kaas";
					if (groupWatchBtn) {
						presenceData.buttons = [
							{
								label: "Join GroupWatch",
								url: href,
							},
						];
					}
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
					presenceData.state = `Sorted by ${document
						.querySelector('[id="react-select-2-input"]')
						?.parentElement?.textContent?.toLowerCase()}`;
					break;
				}
				case pathname.includes("movies"): {
					presenceData.details = privacy ? strings.browsing : "Browsing movies";
					presenceData.state = `Sorted by ${document
						.querySelector('[id="react-select-2-input"]')
						?.parentElement?.textContent?.toLowerCase()}`;
					break;
				}
				case pathname.includes("brand"): {
					presenceData.details = privacy
						? "Browsing videos"
						: `Viewing ${document
								.querySelector("head > title")
								?.textContent.match(
									/(pixar)|(marvel)|(star wars)|(national geographic)|(star)|(disney)/im
								)[0]
								?.toLowerCase()} content`;
					break;
				}
			}
			break;
		}
		case isHostHS: {
			presenceData.largeImageKey = "https://i.imgur.com/717snoF.png";

			if (video && !isNaN(video.duration)) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);

				title = document.querySelector(
					".controls-overlay .primary-title"
				)?.textContent;
				subtitle = document.querySelector(
					".controls-overlay .show-title"
				)?.textContent; // episode or empty if it's a movie

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
