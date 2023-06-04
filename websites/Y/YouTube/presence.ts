const presence = new Presence({
		clientId: "463097721130188830",
	}),
	// YouTube TV separator pattern
	pattern = "•",
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/logo.png",
	Studio = "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/0.png",
}

function truncateAfter(str: string, pattern: string): string {
	return str.slice(0, str.indexOf(pattern));
}

let cached: { id: string; uploader: string; channelURL: string },
	closest: Element;

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function cacheIt(hostname: string, shortsPath: string) {
	if (!cached?.id || cached.id !== shortsPath) {
		if (!cached) {
			closest =
				document
					.querySelectorAll("video")[1]
					?.closest("#player")
					?.parentElement?.parentElement?.querySelector(
						'[spellcheck="false"]'
					) ??
				document
					.querySelectorAll("video")[0]
					?.closest("#player")
					?.parentElement?.parentElement?.querySelector('[spellcheck="false"]');
		} else {
			await delay(300);
			closest =
				document
					.querySelectorAll("video")[1]
					?.closest("#player")
					?.parentElement?.parentElement?.querySelector(
						'[class="yt-simple-endpoint style-scope yt-formatted-string"]'
					) ??
				document
					.querySelectorAll("video")[0]
					?.closest("#player")
					?.parentElement?.parentElement?.querySelector(
						'[class="yt-simple-endpoint style-scope yt-formatted-string"]'
					);
		}
		const fetched = {
			id: shortsPath,
			uploader:
				closest?.textContent ??
				document
					.querySelectorAll('div[class="style-scope ytd-channel-name"]')[2]
					.querySelector(
						'[class="yt-simple-endpoint style-scope yt-formatted-string"]'
					)?.textContent,
			channelURL: `https://${hostname}${closest?.getAttribute("href")}`,
		};
		cached = fetched;
		return fetched;
	} else return cached;
}

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			live: "general.live",
			ad: "youtube.ad",
			search: "general.searchFor",
			browsingTypeVideos: "youtube.browsingTypeVideos",
			browseShorts: "youtube.browsingShorts",
			browsingVid: "youtube.browsingVideos",
			browsingPlayl: "youtube.browsingPlaylists",
			viewCPost: "youtube.viewingCommunityPost",
			ofChannel: "youtube.ofChannel",
			readChannel: "youtube.readingChannel",
			searchChannel: "youtube.searchChannel",
			trending: "youtube.trending",
			browsingThrough: "youtube.browsingThrough",
			subscriptions: "youtube.subscriptions",
			library: "youtube.library",
			history: "youtube.history",
			purchases: "youtube.purchases",
			reports: "youtube.reportHistory",
			upload: "youtube.upload",
			viewChannel: "general.viewChannel",
			viewAllPlayL: "youtube.viewAllPlaylist",
			viewEvent: "youtube.viewLiveEvents",
			viewLiveDash: "youtube.viewLiveDashboard",
			viewAudio: "youtube.viewAudioLibrary",
			studioVid: "youtube.studio.viewContent",
			studioEdit: "youtube.studio.editVideo",
			studioAnaly: "youtube.studio.videoAnalytics",
			studioComments: "youtube.studio.videoComments",
			studioTranslate: "youtube.studio.videoTranslations",
			studioTheir: "youtube.studio.viewTheir",
			studioCAnaly: "youtube.studio.channelAnalytics",
			studioCComments: "youtube.studio.channelComments",
			studioCTranslate: "youtube.studio.channelTranslations",
			studioArtist: "youtube.studio.artistPage",
			studioDash: "youtube.studio.dashboard",
			viewPlaylist: "general.viewPlaylist",
			readAbout: "general.readingAbout",
			viewAccount: "general.viewAccount",
			viewHome: "general.viewHome",
			watchVid: "general.watchingVid",
			watchLive: "general.watchingLive",
			browsing: "general.browsing",
			searchSomething: "general.searchSomething",
			watchStreamButton: "general.buttonWatchStream",
			watchVideoButton: "general.buttonWatchVideo",
			viewChannelButton: "general.buttonViewChannel",
			videos: "youtube.videos",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	//* Update strings if user selected another language.
	const [
			newLang,
			privacy,
			time,
			vidDetail,
			vidState,
			channelPic,
			logo,
			buttons,
		] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<string>("vidDetail"),
			presence.getSetting<string>("vidState"),
			presence.getSetting<boolean>("channelPic"),
			presence.getSetting<number>("logo"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, hostname, href } = document.location;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	//* If there is a vid playing
	const video = Array.from(
		document.querySelectorAll<HTMLVideoElement>(".video-stream")
	).find(video => video.duration);

	if (video) {
		let oldYouTube: boolean = null,
			YouTubeTV: boolean = null,
			YouTubeEmbed: boolean = null,
			YoutubeShorts: boolean = null,
			title: HTMLElement,
			pfp: string;

		//* Checking if user has old YT layout.
		document.querySelector(".watch-title")
			? (oldYouTube = true)
			: (oldYouTube = false);

		document.querySelector(".player-video-title")
			? (YouTubeTV = true)
			: (YouTubeTV = false);

		pathname.includes("/embed")
			? (YouTubeEmbed = true)
			: (YouTubeEmbed = false);

		pathname.includes("/shorts/")
			? (YoutubeShorts = true)
			: (YoutubeShorts = false);

		let fetcheds: { id: string; uploader: string; channelURL: string };
		if (YoutubeShorts)
			fetcheds = await cacheIt(hostname, pathname.split("/shorts/")[1]);

		//* Due to differences between old and new YouTube, we should add different selectors.
		// Get title
		YouTubeEmbed
			? (title = document
					.querySelector(
						'[class="reel-video-in-sequence style-scope ytd-shorts"]'
					)
					?.querySelector(
						'[class="title style-scope ytd-reel-player-header-renderer"]'
					))
			: YoutubeShorts
			? (title = document.querySelector(
					'[class="ytp-title-link yt-uix-sessionlink"]'
			  ))
			: oldYouTube && pathname.includes("/watch")
			? (title = document.querySelector(".watch-title"))
			: YouTubeTV
			? (title = document.querySelector(".player-video-title"))
			: !pathname.includes("/watch")
			? (title = document.querySelector(".ytd-miniplayer .title"))
			: (title = document.querySelector(
					"h1 yt-formatted-string.ytd-video-primary-info-renderer"
			  ));

		let uploaderTV: Element | string,
			uploaderMiniPlayer: HTMLElement,
			uploader2: HTMLElement,
			uploaderShorts: string,
			edited: boolean,
			uploaderEmbed: HTMLElement;
		(edited = false),
			(uploaderTV =
				document.querySelector(".player-video-details") ||
				document.querySelector(
					"ytd-video-owner-renderer  .ytd-channel-name a"
				)),
			(uploaderShorts = fetcheds?.uploader ?? cached?.uploader),
			(uploaderEmbed = document.querySelector(
				"div.ytp-title-expanded-heading > h2 > a"
			)),
			(uploaderMiniPlayer = document.querySelector(
				"yt-formatted-string#owner-name"
			)),
			(uploader2 = document.querySelector("#owner-name a"));

		if (uploaderMiniPlayer && uploaderMiniPlayer.textContent === "YouTube") {
			edited = true;
			uploaderMiniPlayer.setAttribute(
				"premid-value",
				"Listening to a playlist"
			);
		}

		if (!YoutubeShorts) uploaderShorts = null;
		const uploader =
				uploaderShorts ??
				(uploaderMiniPlayer && uploaderMiniPlayer.textContent.length > 0
					? uploaderMiniPlayer
					: uploader2 && uploader2.textContent.length > 0
					? uploader2
					: document.querySelector(
							"#upload-info yt-formatted-string.ytd-channel-name a"
					  ) ??
					  (uploaderEmbed &&
							YouTubeEmbed &&
							uploaderEmbed.textContent.length > 0)
					? uploaderEmbed
					: (uploaderTV = truncateAfter(
							uploaderTV?.textContent.replace(/\s+/g, "") ?? "Undefined",
							pattern
					  ))),
			live = Boolean(document.querySelector(".ytp-live"));
		let isPlaylistLoop = false;

		if (
			document.querySelector("#playlist-actions .yt-icon-button#button") &&
			document
				.querySelector("#playlist-actions .yt-icon-button#button")
				.getAttribute("aria-pressed")
		) {
			isPlaylistLoop =
				document
					.querySelector("#playlist-actions .yt-icon-button#button")
					.getAttribute("aria-pressed") === "true";
		}

		let finalUploader =
				edited === true
					? uploaderMiniPlayer.getAttribute("premid-value")
					: uploaderShorts ??
					  (uploaderTV
							? typeof uploaderTV === "string"
								? uploaderTV
								: uploaderTV.textContent
							: typeof uploader === "string"
							? uploader
							: uploader.textContent),
			finalTitle =
				!title || title.textContent.replace(/\s+/g, "") === ""
					? document.querySelector("div.ytp-title-text > a").textContent
					: title.textContent;

		//* YouTube Movies
		if (
			!title &&
			document.querySelector(
				".title.style-scope.ytd-video-primary-info-renderer"
			)
		) {
			finalTitle = document.querySelector(
				".title.style-scope.ytd-video-primary-info-renderer"
			).textContent;
		}
		if (
			!uploader &&
			!uploaderTV &&
			document.querySelector(".style-scope.ytd-channel-name > a")
		) {
			finalUploader = document.querySelector(
				".style-scope.ytd-channel-name > a"
			).textContent;
		}
		if (logo === 2) {
			pfp = document
				.querySelector<HTMLImageElement>(
					"#avatar.ytd-video-owner-renderer > img"
				)
				.src.replace(/=s[0-9]+/, "=s512");
		}
		const unlistedPathElement = document.querySelector<SVGPathElement>(
				"g#privacy_unlisted > path"
			),
			unlistedBadgeElement = document.querySelector<SVGPathElement>(
				"h1.title+ytd-badge-supported-renderer path"
			),
			unlistedVideo =
				unlistedPathElement &&
				unlistedBadgeElement &&
				unlistedPathElement.getAttribute("d") ===
					unlistedBadgeElement.getAttribute("d"),
			videoId =
				document
					.querySelector("#page-manager > ytd-watch-flexy")
					?.getAttribute("video-id") ?? href.split("/shorts/")[1],
			presenceData: PresenceData = {
				details: vidDetail
					.replace("%title%", finalTitle.trim())
					.replace("%uploader%", finalUploader.trim()),
				state: vidState
					.replace("%title%", finalTitle.trim())
					.replace("%uploader%", finalUploader.trim()),
				largeImageKey:
					unlistedVideo || logo === 0 || pfp === ""
						? Assets.Logo
						: logo === 1
						? `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`
						: pfp,
				smallImageKey: video.paused
					? Assets.Pause
					: video.loop
					? Assets.RepeatOne
					: isPlaylistLoop
					? Assets.Repeat
					: Assets.Play,
				smallImageText: video.paused
					? strings.pause
					: video.loop
					? "On loop"
					: isPlaylistLoop
					? "Playlist on loop"
					: strings.play,
				endTimestamp: presence.getTimestampsfromMedia(video)[1],
			};

		if (vidState.includes("{0}")) delete presenceData.state;

		//* Remove timestamps if paused or live
		if (video.paused || live) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;

			if (live) {
				presenceData.smallImageKey = Assets.Live;
				presenceData.smallImageText = strings.live;
			}
		}

		//* Update title to indicate when an ad is being played
		if (document.querySelector(".ytp-ad-player-overlay")) {
			presenceData.details = strings.ad;
			delete presenceData.state;
		} else if (privacy) {
			if (live) presenceData.details = strings.watchLive;
			else presenceData.details = strings.watchVid;

			delete presenceData.state;
			presenceData.largeImageKey = Assets.Logo;
			presenceData.startTimestamp = browsingTimestamp;
			delete presenceData.endTimestamp;
		} else if (buttons && !unlistedVideo) {
			presenceData.buttons = [
				{
					label: live ? strings.watchStreamButton : strings.watchVideoButton,
					url: document.URL.includes("/watch?v=")
						? document.URL.split("&")[0]
						: `https://www.youtube.com/watch?v=${videoId}`,
				},
				{
					label: strings.viewChannelButton,
					url:
						fetcheds?.channelURL ??
						cached?.channelURL ??
						(
							document.querySelector(
								"#top-row > ytd-video-owner-renderer > a"
							) as HTMLLinkElement
						)?.href,
				},
			];
		}
		if (!time) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (YoutubeShorts) {
			presenceData.largeImageKey =
				"https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/1.png";
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused ? strings.pause : strings.play;
			delete presenceData.endTimestamp;
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	} else if (hostname === "www.youtube.com" || hostname === "youtube.com") {
		const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		};
		let searching = false;

		if (document.URL === "https://www.youtube.com/") {
			const child =
				document.querySelector(
					'[class="style-scope ytd-feed-filter-chip-bar-renderer iron-selected"]'
				) ?? null; // Select selected child
			if (
				(child &&
					Array.prototype.indexOf.call(child.parentElement?.children, child)) ??
				0 > 0
			) {
				// Get index of child element from parent
				// if the current child index is bigger than 0 continue
				presenceData.details = strings.browsingTypeVideos.replace(
					"{0}",
					child?.textContent?.trim()?.toLowerCase()
				);
			} else presenceData.details = strings.viewHome;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/results")) {
			searching = true;
			let search: HTMLInputElement;
			//When searching something
			search = document.querySelector(
				"#search-input > div > div:nth-child(2) > input"
			);
			if (!search) search = document.querySelector("#search-input > input");

			presenceData.details = strings.search;
			presenceData.state = search.value;
			presenceData.smallImageKey = Assets.Search;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (
			pathname.includes("/@") ||
			pathname.includes("/channel") ||
			pathname.includes("/c") ||
			pathname.includes("/user")
		) {
			const tabSelected = document
				.querySelector(
					'[class="style-scope ytd-feed-filter-chip-bar-renderer iron-selected"]'
				)
				?.textContent?.trim();
			//Sometimes causes problems
			let user: string;
			//get channel name when viewing a community post
			if (
				document.querySelector("#author-text.ytd-backstage-post-renderer") &&
				document.title
					.substr(0, document.title.lastIndexOf(" - YouTube"))
					.includes(
						document
							.querySelector("#author-text.ytd-backstage-post-renderer")
							.textContent.trim()
					)
			) {
				user = document.querySelector(
					"#author-text.ytd-backstage-post-renderer"
				).textContent;
				//get channel name when viewing a channel
			} else if (
				document.querySelector("#text.ytd-channel-name") &&
				document.title
					.substr(0, document.title.lastIndexOf(" - YouTube"))
					.includes(
						document.querySelector("#text.ytd-channel-name").textContent
					)
			)
				user = document.querySelector("#text.ytd-channel-name").textContent;
			//get channel name from website's title
			else if (
				/\(([^)]+)\)/.test(
					document.title.substr(0, document.title.lastIndexOf(" - YouTube"))
				)
			) {
				user = document.title
					.substr(0, document.title.lastIndexOf(" - YouTube"))
					.replace(/\(([^)]+)\)/, "");
			} else {
				user = document.title.substr(
					0,
					document.title.lastIndexOf(" - YouTube")
				);
			}

			// don't remove the second, includes an invisible character
			if (user.replace(/\s+/g, "") === "" || user.replace(/\s+/g, "") === "‌")
				user = "null";

			if (pathname.includes("/videos")) {
				presenceData.details = `${
					strings.browsingThrough
				} ${tabSelected} ${document
					.querySelector(
						'[class="style-scope ytd-c4-tabbed-header-renderer iron-selected"]'
					)
					?.textContent?.trim()
					?.toLowerCase()}`;
				presenceData.state = `${strings.ofChannel} ${user}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/shorts")) {
				presenceData.details = strings.browseShorts;
				presenceData.state = `${strings.ofChannel} ${user}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/playlists")) {
				presenceData.details = strings.browsingPlayl;
				presenceData.state = `${strings.ofChannel} ${user}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/community")) {
				presenceData.details = strings.viewCPost;
				presenceData.state = `${strings.ofChannel} ${user}`;
				presenceData.largeImageKey =
					logo === 1
						? document
								.querySelector('[id="post"]')
								?.querySelectorAll("img")[1]
								?.getAttribute("src")
						: logo === 2
						? document
								.querySelector('[id="post"]')
								?.querySelector("img")
								?.getAttribute("src")
						: Assets.Logo;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/about")) {
				presenceData.details = strings.readChannel;
				presenceData.state = user;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (pathname.includes("/search")) {
				searching = true;

				presenceData.details = strings.searchChannel.replace("{0}", user);
				presenceData.state = document.URL.split("search?query=")[1];
				presenceData.smallImageKey = Assets.Search;
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				presenceData.details = strings.viewChannel;
				presenceData.state = user;
				presenceData.startTimestamp = browsingTimestamp;
			}
			if (channelPic) {
				const channelImg =
					document //self channel
						.querySelector<HTMLImageElement>(
							"yt-img-shadow.ytd-channel-avatar-editor > img"
						)
						?.src.replace(/=s[0-9]+/, "=s512") ??
					document
						.querySelector<HTMLImageElement>(
							"#avatar.ytd-c4-tabbed-header-renderer > img"
						)
						?.src.replace(/=s[0-9]+/, "=s512") ??
					document //when viewing a community post
						.querySelector<HTMLImageElement>(
							"#author-thumbnail > a > yt-img-shadow > img"
						)
						?.src.replace(/=s[0-9]+/, "=s512") ??
					Assets.Logo;
				if (channelImg) presenceData.largeImageKey = channelImg;
			}
		} else if (pathname.includes("/post")) {
			presenceData.details = strings.viewCPost;
			const selector: Node = document.querySelector("#author-text");
			presenceData.state =
				(selector && `${strings.ofChannel} ${selector.textContent}`) || null;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/feed/trending")) {
			presenceData.details = strings.trending;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/feed/subscriptions")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.subscriptions;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/feed/library")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.library;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/feed/history")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.history;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/feed/purchases")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.purchases;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/playlist")) {
			presenceData.details = strings.viewPlaylist;

			let title: HTMLElement | null = document.querySelector("#text-displayed");
			if (!title)
				title = document.querySelector("#title > yt-formatted-string > a");

			presenceData.state = title.textContent;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/premium")) {
			presenceData.details = strings.readAbout;
			presenceData.state = "Youtube Premium";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/gaming")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = "Youtube Gaming";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/account")) {
			presenceData.details = strings.viewAccount;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/reporthistory")) {
			presenceData.details = strings.reports;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/intl")) {
			presenceData.details = strings.readAbout;
			presenceData.state = document.title.substr(
				0,
				document.title.lastIndexOf(" - YouTube")
			);
			presenceData.smallImageKey = Assets.Reading;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/upload")) {
			presenceData.details = strings.upload;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = Assets.Writing;
		} else if (pathname.includes("/view_all_playlists")) {
			presenceData.details = strings.viewAllPlayL;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/my_live_events")) {
			presenceData.details = strings.viewEvent;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/live_dashboard")) {
			presenceData.details = strings.viewLiveDash;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/audiolibrary")) {
			presenceData.details = strings.viewAudio;
			presenceData.startTimestamp = browsingTimestamp;
		}

		if (privacy) {
			if (searching) {
				presenceData.details = strings.searchSomething;
				delete presenceData.state;
			} else {
				presenceData.details = strings.browsing;
				delete presenceData.state;
				delete presenceData.smallImageKey;
			}
		}

		if (!time) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	} else if (hostname === "studio.youtube.com") {
		const presenceData: PresenceData = {
				largeImageKey: Assets.Logo,
				smallImageKey: Assets.Studio,
				smallImageText: "Youtube Studio",
			},
			browsingTimestamp = Math.floor(Date.now() / 1000);

		if (pathname.includes("/videos")) {
			presenceData.details = strings.studioVid;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/video")) {
			const title: HTMLElement = document.querySelector("#entity-name");
			presenceData.startTimestamp = browsingTimestamp;
			if (pathname.includes("/edit")) {
				presenceData.details = strings.studioEdit;
				presenceData.state = title.textContent;
			} else if (pathname.includes("/analytics")) {
				presenceData.details = strings.studioAnaly;
				presenceData.state = title.textContent;
			} else if (pathname.includes("/comments")) {
				presenceData.details = strings.studioComments;
				presenceData.state = title.textContent;
			} else if (pathname.includes("/translations")) {
				presenceData.details = strings.studioTranslate;
				presenceData.state = title.textContent;
			}
		} else if (pathname.includes("/analytics")) {
			presenceData.details = strings.studioTheir;
			presenceData.state = strings.studioCAnaly;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/comments")) {
			presenceData.details = strings.studioTheir;
			presenceData.state = strings.studioCComments;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/translations")) {
			presenceData.details = strings.studioTheir;
			presenceData.state = strings.studioCTranslate;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/channel")) {
			presenceData.details = strings.studioDash;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/artist")) {
			presenceData.details = strings.studioTheir;
			presenceData.state = strings.studioArtist;
			presenceData.startTimestamp = browsingTimestamp;
		}

		if (privacy) {
			presenceData.details = strings.browsing;
			delete presenceData.state;
			delete presenceData.smallImageKey;
		}

		if (!time) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
});
