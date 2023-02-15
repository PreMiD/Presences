const presence = new Presence({
	clientId: "844107447933075498",
});

async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			buttonWatchVideo: "general.buttonWatchVideo",
			paused: "general.paused",
			play: "general.playing",
			search: "general.search",
			searchFor: "general.searchFor",
			viewCategory: "general.viewCategory",
			viewHome: "general.viewHome",
			viewMovie: "general.viewMovie",
			viewShow: "general.viewShow",
			watchingVid: "general.watchingVid",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
enum Assets {
	Logo = "https://i.imgur.com/NF61OBJ.png",
	Search = "https://i.imgur.com/oGQtnIY.png",
	Read = "https://i.imgur.com/8vMPNni.png",
	Paused = "https://i.imgur.com/4iyMINk.png",
	Play = "https://i.imgur.com/OLaz6JN.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null,
	pathSplit: string[];

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		{ pathname, hostname, href } = document.location,
		[newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		episodeEtc = document
			.querySelector(
				'[class="item playback-metadata__container-episode-metadata-info"]'
			)
			?.textContent?.split(":"),
		video = document.querySelector<HTMLVideoElement>("video");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (hostname.replace("www.", "")) {
		case "skyshowtime.com": {
			const title =
				document.querySelector('[class="playback-header__title"]')
					?.textContent ??
				document.querySelector("title")?.textContent?.split(" - ")[0];
			pathSplit = pathname
				.replace("/watch", "")
				.replace("/kids", "")
				.split("/");

			switch (pathSplit[1]) {
				case "highlights":
				case "home": {
					presenceData.details = strings.viewHome;
					break;
				}
				case "tv": {
					if (pathname.replace("/watch", "") === "/tv" || privacy)
						presenceData.details = "Browsing tv shows";
					else presenceData.details = `Browsing ${title}'s shows`;
					break;
				}
				case "movies": {
					presenceData.details = "Browsing movies";
					break;
				}
				case "entertainment": {
					presenceData.details = "Browsing tv shows";
					break;
				}
				case "my-stuff": {
					presenceData.details = "Viewing their list";
					break;
				}
				case "profiles": {
					if (href.includes("#setting"))
						presenceData.details = "Managing their profiles";
					else presenceData.details = "Viewing their profiles";
					break;
				}
				case "search": {
					const search = document.querySelector<HTMLInputElement>(
						'input[class="search-input"]'
					);
					presenceData.smallImageKey = Assets.Search;
					if (search?.value && !privacy) {
						presenceData.details = strings.searchFor;
						presenceData.state = search.value;
					} else presenceData.details = strings.search;
					break;
				}
				case "asset": {
					presenceData.details = `Viewing ${
						pathname.includes("/tv/") ? "tv show" : "movie"
					}`;
					presenceData.details = pathname.includes("/tv/")
						? privacy
							? strings.viewShow.replace(":", "")
							: strings.viewShow
						: privacy
						? strings.viewMovie.replace(":", "")
						: strings.viewMovie;
					presenceData.largeImageKey =
						document
							.querySelector(
								'[class="program-details__title program-details__title-logo visible"]'
							)
							?.getAttribute("src")
							?.replace("webp", "png") ?? Assets.Logo;
					presenceData.state = title;

					break;
				}
				case "playback": {
					if (video && !isNaN(video.duration)) {
						[, presenceData.endTimestamp] =
							presence.getTimestampsfromMedia(video);
						presenceData.smallImageKey = video.paused
							? Assets.Paused
							: Assets.Play;
						presenceData.smallImageText = video.paused
							? strings.paused
							: strings.play;
						video.paused
							? delete presenceData.endTimestamp
							: delete presenceData.startTimestamp;
						presenceData.buttons = [
							{
								label: strings.buttonWatchVideo,
								url: href,
							},
						];
					}
					presenceData.details = privacy ? strings.watchingVid : title;
					presenceData.state = `${episodeEtc[0].replace(
						" ",
						":"
					)} - ${episodeEtc[1].trim()}`;
					break;
				}
				default: {
					presenceData.details = strings.browse;
				}
			}
			break;
		}
		case "showtime.com":
		case "sho.com": {
			const title = document
					.querySelector('[data-label="title link"]')
					?.textContent?.split(","),
				search = document.querySelector<HTMLInputElement>(
					'input[class="global-nav__search-field"]'
				);
			pathSplit = pathname.split("/");
			switch (true) {
				case document.querySelector("[class*='global-nav--selected']")
					?.textContent === "Series": {
					presenceData.details = "Viewing series";
					break;
				}
				case !!search?.value: {
					presenceData.smallImageKey = Assets.Search;
					if (!privacy) {
						presenceData.details = strings.searchFor;
						presenceData.state = search.value;
					} else presenceData.details = strings.search;
					break;
				}
				case !!document.querySelector('[class="refresh-hero__body"]') &&
					!!pathSplit[1]: {
					presenceData.details = privacy
						? strings.viewShow.replace(":", "")
						: strings.viewShow;
					presenceData.state = document.querySelector(
						'[class="refresh-hero__headline "]'
					)?.textContent;
					break;
				}
				default: {
					switch (pathSplit[1]) {
						case "channel-listings": {
							presenceData.details = "Viewing channel listings";
							break;
						}
						case "sports":
						case "documentaries":
						case "movies": {
							presenceData.details = `Browsing ${document
								.querySelector('[class="global-nav__item"]')
								?.textContent?.toLowerCase()
								?.trim()}`;
							break;
						}
						case "schedule": {
							presenceData.details = "Browsing the schedule";
							break;
						}
						case "video": {
							switch (true) {
								case pathSplit[2] === "full-episodes": {
									presenceData.details = "Browsing all free full episodes";
									break;
								}
								case !!pathSplit[2].match(/[0-9]{5}/gm): {
									if (video && !isNaN(video.duration)) {
										[, presenceData.endTimestamp] =
											presence.getTimestampsfromMedia(video);
										presenceData.smallImageKey = video.paused
											? Assets.Paused
											: Assets.Play;
										presenceData.smallImageText = video.paused
											? strings.paused
											: strings.play;
										video.paused
											? delete presenceData.endTimestamp
											: delete presenceData.startTimestamp;
										presenceData.buttons = [
											{
												label: strings.buttonWatchVideo,
												url: href,
											},
										];
									}
									presenceData.details = privacy
										? strings.watchingVid
										: document
												.querySelector("title")
												?.textContent?.toLowerCase()
												.includes("trailer") // if its a trailer
										? document
												.querySelector(
													'[class="video-metadata__details__title"]'
												)
												?.textContent?.replace(/Season [0-9] /gm, "") //then include trailer info in title
										: title[0]; // else dont

									presenceData.state =
										title.length > 2
											? `${title[1]
													.replace(/ /gm, "")
													.replace("Season", "S")}${title[2]
													.replace(/ /gm, "")
													.replace("Episode", ":E")}`
											: title[1];
									presenceData.largeImageKey =
										JSON.parse(
											document.querySelector(
												'script[type="application/ld+json"]'
											)?.innerHTML
										)?.video?.thumbnailUrl ?? Assets.Logo;
									break;
								}
							}
							break;
						}
						default: {
							presenceData.details = strings.browse;
						}
					}
				}
			}
		}
	}

	if (privacy && presenceData.state) delete presenceData.state;
	if ((!buttons || privacy) && presenceData.buttons)
		delete presenceData.buttons;
	if ((!covers || privacy) && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
