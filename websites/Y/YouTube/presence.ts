import youtubeOldResolver from "./video_sources/old";
import youtubeShortsResolver, {
	cacheShortData,
	getCache,
} from "./video_sources/shorts";
import youtubeEmbedResolver from "./video_sources/embed";
import youtubeMoviesResolver from "./video_sources/movies";
import youtubeTVResolver from "./video_sources/tv";
import youtubeResolver from "./video_sources/default";

const presence = new Presence({
		clientId: "463097721130188830",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum YouTubeAssets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/logo.png",
	Studio = "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/0.png",
	Shorts = "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/1.png",
}

enum LogoMode {
	YouTubeLogo = 0,
	Thumbnail = 1,
	Channel = 2,
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
		{ pathname, hostname } = document.location;

	// Update strings if user selected another language.
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	//* If there is a vid playing
	const video = Array.from(
		document.querySelectorAll<HTMLVideoElement>(".video-stream")
	).find(video => video.duration);

	if (video) {
		const resolver = [
			youtubeEmbedResolver,
			youtubeShortsResolver,
			youtubeOldResolver,
			youtubeTVResolver,
			youtubeResolver,
			youtubeMoviesResolver,
		].find(resolver => resolver.isActive());

		if (resolver === youtubeShortsResolver)
			await cacheShortData(hostname, pathname.split("/shorts/")[1]);

		const title = resolver.getTitle(),
			uploaderName = resolver.getUploader();

		let pfp: string;

		const live = !!document.querySelector(".ytp-live"),
			isPlaylistLoop =
				document
					.querySelector("#playlist-actions .yt-icon-button#button")
					?.getAttribute("aria-pressed") === "true",
			playlistTitle =
				document
					.querySelector(
						"#content #header-description > h3:nth-child(1) > yt-formatted-string > a"
					)
					?.textContent.trim() ?? "",
			playlistQueue = playlistTitle
				? `${
						document.querySelector(
							"#content #publisher-container > div > yt-formatted-string > span:nth-child(1)"
						).textContent
				  } / ${
						document.querySelector(
							"#content #publisher-container > div > yt-formatted-string > span:nth-child(3)"
						).textContent
				  }`
				: "";

		if (logo === LogoMode.Channel) {
			pfp = document
				.querySelector<HTMLImageElement>(
					"#avatar.ytd-video-owner-renderer > img"
				)
				?.src.replace(/=s\d+/, "=s512");
		}
		const unlistedVideo =
				document
					.querySelector<SVGPathElement>("g#privacy_unlisted > path")
					?.getAttribute("d") ===
				document
					.querySelector<SVGPathElement>(
						"h1.title+ytd-badge-supported-renderer path"
					)
					?.getAttribute("d"),
			videoId =
				document
					.querySelector("#page-manager > ytd-watch-flexy")
					?.getAttribute("video-id") ?? pathname.split("/shorts/")[1],
			presenceData: PresenceData = {
				details: vidDetail
					.replace("%title%", title.trim())
					.replace("%uploader%", uploaderName.trim())
					.replace("%playlistTitle%", playlistTitle.trim())
					.replace("%playlistQueue%", playlistQueue.trim()),
				state: vidState
					.replace("%title%", title.trim())
					.replace("%uploader%", uploaderName.trim())
					.replace("%playlistTitle%", playlistTitle.trim())
					.replace("%playlistQueue%", playlistQueue.trim()),
				largeImageKey:
					unlistedVideo || logo === LogoMode.YouTubeLogo || pfp === ""
						? YouTubeAssets.Logo
						: logo === LogoMode.Thumbnail
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
			presenceData.largeImageKey = YouTubeAssets.Logo;
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
						getCache()?.channelURL ??
						document.querySelector<HTMLLinkElement>(
							"#top-row ytd-video-owner-renderer > a"
						)?.href,
				},
			];
		}
		if (!time) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (resolver === youtubeShortsResolver) {
			presenceData.largeImageKey = YouTubeAssets.Shorts;
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused ? strings.pause : strings.play;
			delete presenceData.endTimestamp;
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	} else if (hostname === "www.youtube.com" || hostname === "youtube.com") {
		const presenceData: PresenceData = {
			largeImageKey: YouTubeAssets.Logo,
			startTimestamp: browsingTimestamp,
		};
		let searching = false;

		if (pathname === "/") {
			const child =
				document.querySelector(
					'[class="style-scope ytd-feed-filter-chip-bar-renderer iron-selected"]'
				) ?? null; // Select selected child
			if (
				(child &&
					Array.prototype.indexOf.call(child.parentElement.children, child)) > 0
			) {
				// Get index of child element from parent
				// if the current child index is bigger than 0 continue
				presenceData.details = strings.browsingTypeVideos.replace(
					"{0}",
					child?.textContent.trim().toLowerCase()
				);
			} else presenceData.details = strings.viewHome;
		} else if (pathname.includes("/results")) {
			searching = true;
			const search = document.querySelector<HTMLInputElement>(
				"#search-input > div > div:nth-child(2) > input"
			) ?? document.querySelector<HTMLInputElement>(
					"#search-input > input"
				);

			presenceData.details = strings.search;
			presenceData.state = search.value;
			presenceData.smallImageKey = Assets.Search;
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
					?.textContent.trim(),
				documentTitle = document.title.substring(
					0,
					document.title.lastIndexOf(" - YouTube")
				);

			let user: string;
			// Get channel name when viewing a community post
			if (
				documentTitle.includes(
					document
						.querySelector("#author-text.ytd-backstage-post-renderer")
						?.textContent.trim()
				)
			) {
				user = document.querySelector(
					"#author-text.ytd-backstage-post-renderer"
				).textContent;
				// Get channel name when viewing a channel
			} else if (
				documentTitle.includes(
					document.querySelector("#text.ytd-channel-name")?.textContent
				)
			)
				user = document.querySelector("#text.ytd-channel-name").textContent;
			// Get channel name from website's title
			else if (/\(([^)]+)\)/.test(documentTitle))
				user = documentTitle.replace(/\(([^)]+)\)/, "");
			else user = documentTitle;

			// don't remove the second, includes an invisible character
			if (
				user.replace(/\s+/g, "") === "" ||
				user.replace(/\s+/g, "") === "\u200c"
			)
				user = "null";

			if (pathname.includes("/videos")) {
				presenceData.details = `${
					strings.browsingThrough
				} ${tabSelected} ${document
					.querySelector(
						'[class="style-scope ytd-c4-tabbed-header-renderer iron-selected"]'
					)
					?.textContent.trim()
					.toLowerCase()}`;
				presenceData.state = `${strings.ofChannel} ${user}`;
			} else if (pathname.includes("/shorts")) {
				presenceData.details = strings.browseShorts;
				presenceData.state = `${strings.ofChannel} ${user}`;
			} else if (pathname.includes("/playlists")) {
				presenceData.details = strings.browsingPlayl;
				presenceData.state = `${strings.ofChannel} ${user}`;
			} else if (pathname.includes("/community")) {
				presenceData.details = strings.viewCPost;
				presenceData.state = `${strings.ofChannel} ${user}`;
				presenceData.largeImageKey =
					logo === LogoMode.Thumbnail
						? document
								.querySelector('[id="post"]')
								?.querySelectorAll("img")[1]
								?.getAttribute("src")
						: logo === LogoMode.Channel
						? document
								.querySelector('[id="post"]')
								?.querySelector("img")
								?.getAttribute("src")
						: YouTubeAssets.Logo;
			} else if (pathname.includes("/about")) {
				presenceData.details = strings.readChannel;
				presenceData.state = user;
				presenceData.smallImageKey = Assets.Reading;
			} else if (pathname.includes("/search")) {
				searching = true;

				presenceData.details = strings.searchChannel.replace("{0}", user);
				presenceData.state = document.URL.split("search?query=")[1];
				presenceData.smallImageKey = Assets.Search;
			} else {
				presenceData.details = strings.viewChannel;
				presenceData.state = user;
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
					YouTubeAssets.Logo;
				if (channelImg) presenceData.largeImageKey = channelImg;
			}
		} else if (pathname.includes("/post")) {
			presenceData.details = strings.viewCPost;
			const selector = document.querySelector("#author-text");
			if (selector)
				presenceData.state = `${strings.ofChannel} ${selector.textContent}`;
		} else if (pathname.includes("/feed/trending"))
			presenceData.details = strings.trending;
		else if (pathname.includes("/feed/subscriptions")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.subscriptions;
		} else if (pathname.includes("/feed/library")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.library;
		} else if (pathname.includes("/feed/history")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.history;
		} else if (pathname.includes("/feed/purchases")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = strings.purchases;
		} else if (pathname.includes("/playlist")) {
			presenceData.details = strings.viewPlaylist;
			const title =
				document.querySelector("#text-displayed") ??
				document.querySelector("#title > yt-formatted-string > a");
			presenceData.state = title.textContent;
		} else if (pathname.includes("/premium")) {
			presenceData.details = strings.readAbout;
			presenceData.state = "Youtube Premium";
			presenceData.smallImageKey = Assets.Reading;
		} else if (pathname.includes("/gaming")) {
			presenceData.details = strings.browsingThrough;
			presenceData.state = "Youtube Gaming";
			presenceData.smallImageKey = Assets.Reading;
		} else if (pathname.includes("/account"))
			presenceData.details = strings.viewAccount;
		else if (pathname.includes("/reporthistory"))
			presenceData.details = strings.reports;
		else if (pathname.includes("/intl")) {
			presenceData.details = strings.readAbout;
			presenceData.state = document.title.substring(
				0,
				document.title.lastIndexOf(" - YouTube")
			);
			presenceData.smallImageKey = Assets.Reading;
		} else if (pathname.includes("/upload")) {
			presenceData.details = strings.upload;
			presenceData.smallImageKey = Assets.Writing;
		} else if (pathname.includes("/view_all_playlists"))
			presenceData.details = strings.viewAllPlayL;
		else if (pathname.includes("/my_live_events"))
			presenceData.details = strings.viewEvent;
		else if (pathname.includes("/live_dashboard"))
			presenceData.details = strings.viewLiveDash;
		else if (pathname.includes("/audiolibrary"))
			presenceData.details = strings.viewAudio;

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
				largeImageKey: YouTubeAssets.Logo,
				smallImageKey: YouTubeAssets.Studio,
				smallImageText: "Youtube Studio",
			},
			browsingTimestamp = Math.floor(Date.now() / 1000);

		if (pathname.includes("/videos")) {
			presenceData.details = strings.studioVid;
			presenceData.startTimestamp = browsingTimestamp;
		} else if (pathname.includes("/video")) {
			const title = document.querySelector("#entity-name");
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
