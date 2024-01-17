import youtubeOldResolver from "./video_sources/old";
import youtubeShortsResolver, {
	cacheShortData,
	getCache as getShortsCache,
} from "./video_sources/shorts";
import youtubeEmbedResolver from "./video_sources/embed";
import youtubeMoviesResolver from "./video_sources/movies";
import youtubeTVResolver from "./video_sources/tv";
import youtubeResolver from "./video_sources/default";
import {
	Resolver,
	adjustTimeError,
	presence,
	strings,
	getSetting,
	checkStringLanguage,
} from "./util";

const browsingTimestamp = Math.floor(Date.now() / 1000);

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

const nullResolver: Resolver = {
	isActive: () => true,
	getTitle: () => document.title,
	getUploader: () => "",
};

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
		] = [
			getSetting<string>("lang", "en"),
			getSetting<boolean>("privacy", true),
			getSetting<boolean>("time", true),
			getSetting<string>("vidDetail", "%title%"),
			getSetting<string>("vidState", "%uploader%"),
			getSetting<boolean>("channelPic", false),
			getSetting<number>("logo", 0),
			getSetting<boolean>("buttons", true),
		],
		{ pathname, hostname, search, href } = document.location;
	let perVideoPrivacy = false;

	// Update strings if user selected another language.
	if (!checkStringLanguage(newLang)) return;

	// If there is a vid playing
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
			nullResolver,
		].find(resolver => resolver.isActive());
		if (resolver === youtubeShortsResolver)
			await cacheShortData(hostname, pathname.split("/shorts/")[1]);

		let perVideoPrivacyArray: string[] =
				JSON.parse(localStorage.getItem("pmdEnablePrivacy")) ?? [],
			perVideoNonPrivacyArray: string[] =
				JSON.parse(localStorage.getItem("pmdDisablePrivacy")) ?? [];

		if (resolver === youtubeResolver) {
			try {
				perVideoPrivacy = perVideoPrivacyArray.includes(href);

				if (!document.querySelector("#pmdEnablePrivacy")) {
					const button = document.createElement("div"),
						tooltip = document.createElement("div"),
						p1 = document.createElement("p"),
						p2 = document.createElement("p"),
						parent = document.querySelector("#owner");

					button.id = "pmdEnablePrivacy";
					button.style.marginLeft = "8px";
					button.style.minWidth = "min-content";
					button.style.maxWidth = "min-content";

					button.style.backgroundImage =
						"linear-gradient(to right, #b55fd3, #18b7d2)";
					button.className =
						"yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading";
					button.addEventListener("click", () => {
						const { href } = document.location;
						if (localStorage.getItem("pmdPrivacyEnabled") === "true") {
							perVideoNonPrivacyArray.includes(href)
								? (perVideoNonPrivacyArray = perVideoNonPrivacyArray.filter(
										i => i !== href
								  ))
								: perVideoNonPrivacyArray.push(href);
							localStorage.setItem(
								"pmdDisablePrivacy",
								JSON.stringify(perVideoNonPrivacyArray)
							);
						} else {
							perVideoPrivacyArray.includes(href)
								? (perVideoPrivacyArray = perVideoPrivacyArray.filter(
										i => i !== href
								  ))
								: perVideoPrivacyArray.push(href);
							localStorage.setItem(
								"pmdEnablePrivacy",
								JSON.stringify(perVideoPrivacyArray)
							);
						}
					});
					p1.textContent = "Overwrite your privacy mode for this video";
					p2.textContent = "This is part of the PreMiD YouTube presence";
					p2.style.fontStyle = "italic";
					tooltip.appendChild(p1);
					tooltip.appendChild(p2);
					button.innerHTML =
						'<svg id="pmdPrivacyEnabled" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="21" width="23" viewBox="0 0 640 512" style="display: inline-block;"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg><svg id="pmdPrivacyDisabled" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="21" width="23" viewBox="0 0 576 512" style="display: none;"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>';
					parent.appendChild(button);
					parent.appendChild(tooltip);
					tooltip.style.opacity = "0";
					tooltip.style.position = "absolute";
					tooltip.style.padding = "5px";
					tooltip.style.borderRadius = "5px";
					tooltip.style.top = "-5px";
					tooltip.style.zIndex = "1";
					tooltip.style.transition = "opacity 0.3s ease-in-out";
					tooltip.style.color = "#fff";
					tooltip.style.background = "#2c2f33";
					tooltip.style.transitionDelay = "700ms";

					button.addEventListener("mouseover", function () {
						tooltip.style.opacity = "1";
						tooltip.style.top = `${
							button.offsetTop - tooltip.offsetHeight - 5
						}px`;
						tooltip.style.left = `${
							button.offsetLeft +
							button.offsetWidth / 2 -
							tooltip.offsetWidth / 2
						}px`;
						tooltip.style.transitionDelay = "50ms";
					});
					button.addEventListener("mouseleave", function () {
						tooltip.style.opacity = "0";
						setTimeout(() => {
							tooltip.style.transitionDelay = "700ms";
						});
					});
				} else {
					if (privacy) {
						perVideoPrivacy = !perVideoNonPrivacyArray.includes(href);
						localStorage.setItem("pmdPrivacyEnabled", "true");
					} else {
						perVideoPrivacy = perVideoPrivacyArray.includes(href);
						localStorage.setItem("pmdPrivacyEnabled", "false");
					}

					const svgEnabled = document.querySelector(
							"#pmdPrivacyEnabled"
						) as HTMLElement,
						svgDisabled = document.querySelector(
							"#pmdPrivacyDisabled"
						) as HTMLElement;
					if (perVideoPrivacy) {
						svgEnabled.style.display = "inline-block";
						svgDisabled.style.display = "none";
					} else {
						svgEnabled.style.display = "none";
						svgDisabled.style.display = "inline-block";
					}
				}
			} catch (e) {
				presence.error(
					`Something went wrong trying to place the privacy toggle button: ${e}`
				);
			}
		}

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
			playlistQueueElements = document.querySelectorAll<HTMLSpanElement>(
				"#content #publisher-container > div > yt-formatted-string > span"
			);
		let playlistQueue = "";
		if (playlistTitle) {
			if (playlistQueueElements.length > 1)
				playlistQueue = `${playlistQueueElements[0].textContent} / ${playlistQueueElements[2].textContent}`;
			else {
				playlistQueue = document.querySelector<HTMLSpanElement>(
					"#content #publisher-container > div > span"
				).textContent;
			}
		}

		if (logo === LogoMode.Channel) {
			pfp = document
				.querySelector<HTMLImageElement>(
					"#avatar.ytd-video-owner-renderer > img"
				)
				?.src.replace(/=s\d+/, "=s512");
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
				unlistedPathElement?.getAttribute("d") ===
					unlistedBadgeElement?.getAttribute("d"),
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
				endTimestamp: adjustTimeError(
					presence.getTimestampsfromMedia(video)[1],
					0.75
				),
			};

		if (vidState.includes("{0}")) delete presenceData.state;

		// Remove timestamps if paused or live
		if (video.paused || live) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;

			if (live) {
				presenceData.smallImageKey = Assets.Live;
				presenceData.smallImageText = strings.live;
			}
		}

		// Update title to indicate when an ad is being played
		if (document.querySelector(".ytp-ad-player-overlay")) {
			presenceData.details = strings.ad;
			delete presenceData.state;
		} else if (perVideoPrivacy) {
			//defaults to privacy setting, but allows it to be overwritten
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
					url: href.includes("/watch?v=")
						? href.split("&")[0]
						: `https://www.youtube.com/watch?v=${videoId}`,
				},
				{
					label: strings.viewChannelButton,
					url:
						getShortsCache()?.channelURL ??
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

		switch (true) {
			case pathname === "/": {
				const child =
					document.querySelector(
						'[class="style-scope ytd-feed-filter-chip-bar-renderer iron-selected"]'
					) ?? null; // Select selected child
				if (
					(child &&
						Array.prototype.indexOf.call(child.parentElement.children, child)) >
					0
				) {
					// Get index of child element from parent
					// if the current child index is bigger than 0 continue
					presenceData.details = strings.browsingTypeVideos.replace(
						"{0}",
						child?.textContent.trim().toLowerCase()
					);
				} else presenceData.details = strings.viewHome;
				break;
			}
			case pathname.includes("/results"): {
				searching = true;
				const search =
					document.querySelector<HTMLInputElement>(
						"#search-input > div > div:nth-child(2) > input"
					) ??
					document.querySelector<HTMLInputElement>("#search-input > input");

				presenceData.details = strings.search;
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
				break;
			}
			case pathname.includes("/@"):
			case pathname.includes("/channel"):
			case pathname.includes("/c"):
			case pathname.includes("/user"): {
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
									?.querySelectorAll("img")[1]?.src
							: logo === LogoMode.Channel
							? document.querySelector('[id="post"]')?.querySelector("img")?.src
							: YouTubeAssets.Logo;
				} else if (pathname.includes("/about")) {
					presenceData.details = strings.readChannel;
					presenceData.state = user;
					presenceData.smallImageKey = Assets.Reading;
				} else if (pathname.includes("/search")) {
					searching = true;

					presenceData.details = strings.searchChannel.replace("{0}", user);
					presenceData.state = new URLSearchParams(search).get("query");
					presenceData.smallImageKey = Assets.Search;
				} else {
					presenceData.details = strings.viewChannel;
					presenceData.state = user;
				}
				if (channelPic) {
					const channelImg =
						// Self channel
						(
							document.querySelector<HTMLImageElement>(
								"yt-img-shadow.ytd-channel-avatar-editor > img"
							) ??
							document.querySelector<HTMLImageElement>(
								"#avatar.ytd-c4-tabbed-header-renderer > img"
							) ??
							// When viewing a community post
							document.querySelector<HTMLImageElement>(
								"#author-thumbnail > a > yt-img-shadow > img"
							)
						)?.src.replace(/=s[0-9]+/, "=s512") ?? YouTubeAssets.Logo;
					if (channelImg) presenceData.largeImageKey = channelImg;
				}
				break;
			}
			case pathname.includes("/post"): {
				presenceData.details = strings.viewCPost;
				const selector = document.querySelector("#author-text");
				if (selector)
					presenceData.state = `${strings.ofChannel} ${selector.textContent}`;
				break;
			}
			case pathname.includes("/feed/trending"): {
				presenceData.details = strings.trending;
				break;
			}
			case pathname.includes("/feed/subscriptions"): {
				presenceData.details = strings.browsingThrough;
				presenceData.state = strings.subscriptions;
				break;
			}
			case pathname.includes("/feed/library"): {
				presenceData.details = strings.browsingThrough;
				presenceData.state = strings.library;
				break;
			}
			case pathname.includes("/feed/history"): {
				presenceData.details = strings.browsingThrough;
				presenceData.state = strings.history;
				break;
			}
			case pathname.includes("/feed/purchases"): {
				presenceData.details = strings.browsingThrough;
				presenceData.state = strings.purchases;
				break;
			}
			case pathname.includes("/playlist"): {
				presenceData.details = strings.viewPlaylist;
				const title =
					document.querySelector("#text-displayed") ??
					document.querySelector(
						"ytd-playlist-header-renderer yt-dynamic-sizing-formatted-string.ytd-playlist-header-renderer"
					) ??
					document.querySelector("#title > yt-formatted-string > a");
				presenceData.state = title.textContent.trim();
				break;
			}
			case pathname.includes("/premium"): {
				presenceData.details = strings.readAbout;
				presenceData.state = "Youtube Premium";
				presenceData.smallImageKey = Assets.Reading;
				break;
			}
			case pathname.includes("/gaming"): {
				presenceData.details = strings.browsingThrough;
				presenceData.state = "Youtube Gaming";
				presenceData.smallImageKey = Assets.Reading;
				break;
			}
			case pathname.includes("/account"): {
				presenceData.details = strings.viewAccount;
				break;
			}
			case pathname.includes("/reporthistory"): {
				presenceData.details = strings.reports;
				break;
			}
			case pathname.includes("/intl"): {
				presenceData.details = strings.readAbout;
				presenceData.state = document.title.substring(
					0,
					document.title.lastIndexOf(" - YouTube")
				);
				presenceData.smallImageKey = Assets.Reading;
				break;
			}
			case pathname.includes("/upload"): {
				presenceData.details = strings.upload;
				presenceData.smallImageKey = Assets.Writing;
				break;
			}
			case pathname.includes("/view_all_playlists"): {
				presenceData.details = strings.viewAllPlayL;
				break;
			}
			case pathname.includes("/my_live_events"): {
				presenceData.details = strings.viewEvent;
				break;
			}
			case pathname.includes("/live_dashboard"): {
				presenceData.details = strings.viewLiveDash;
				break;
			}
			case pathname.includes("/audiolibrary"): {
				presenceData.details = strings.viewAudio;
				break;
			}
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
		else presence.setActivity(presenceData, true);
	} else if (hostname === "studio.youtube.com") {
		const presenceData: PresenceData = {
			largeImageKey: YouTubeAssets.Logo,
			smallImageKey: YouTubeAssets.Studio,
			smallImageText: "Youtube Studio",
			startTimestamp: browsingTimestamp,
		};

		switch (true) {
			case pathname.includes("/videos"): {
				presenceData.details = strings.studioVid;
				break;
			}
			case pathname.includes("/video"): {
				const title = document.querySelector("#entity-name");
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
				break;
			}
			case pathname.includes("/analytics"): {
				presenceData.details = strings.studioTheir;
				presenceData.state = strings.studioCAnaly;
				break;
			}
			case pathname.includes("/comments"): {
				presenceData.details = strings.studioTheir;
				presenceData.state = strings.studioCComments;
				break;
			}
			case pathname.includes("/translations"): {
				presenceData.details = strings.studioTheir;
				presenceData.state = strings.studioCTranslate;
				break;
			}
			case pathname.includes("/channel"): {
				presenceData.details = strings.studioDash;
				break;
			}
			case pathname.includes("/artist"): {
				presenceData.details = strings.studioTheir;
				presenceData.state = strings.studioArtist;
				break;
			}
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
