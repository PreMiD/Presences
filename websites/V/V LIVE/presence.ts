const presence = new Presence({
	clientId: "614386371532161054",
	injectOnComplete: true,
});
async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			live: "general.live",
			browse: "general.browsing",
			watchingLive: "general.watchingLive",
			watchingVid: "general.watchingVid",
			waitingVid: "general.waitingVid",
			waitingVidThe: "general.waitingVidThe",
			waitingLive: "general.waitingLive",
			waitingLiveThe: "general.waitingLiveThe",
			readingPost: "general.readingPost",
			readingAbout: "general.readingAbout",
			searchFor: "general.searchFor",
			searchSomething: "general.searchSomething",
			browseThrough: "v live.browseThrough",
			newVid: "v live.newVid",
			charts: "v live.charts",
			upcoming: "v live.upcoming",
			channelList: "v live.channelList",
			events: "v live.events",
			store: "v live.store",
			recentUploads: "v live.recentUploads",
			ofChannel: "v live.ofChannel",
			channelHome: "v live.channelHome",
			channelSchedule: "v live.channelSchedule",
			channelMy: "v live.channelMy",
			channelStore: "v live.channelStore",
			channelBoard: "v live.channelBoard",
			product: "v live.product",
			profileEdit: "v live.profileEdit",
			viewTheir: "v live.viewTheir",
			profile: "v live.profile",
			watched: "v live.watched",
			purchases: "v live.purchases",
			coins: "v live.coins",
			devices: "v live.devices",
			followed: "v live.followed",
			policies: "v live.policies",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let elapsed = Math.floor(Date.now() / 1000),
	prevUrl = document.location.href,
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	if (document.location.href !== prevUrl) {
		prevUrl = document.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}
	const [
		privacy,
		showBrowsing,
		showLive,
		showVideo,
		showTimestamps,
		newLang,
		vidDetail,
		vidState,
		streamDetail,
		streamState,
	] = await Promise.all([
		presence.getSetting<boolean>("privacy"),
		presence.getSetting<boolean>("browse"),
		presence.getSetting<boolean>("live"),
		presence.getSetting<boolean>("video"),
		presence.getSetting<boolean>("timestamp"),
		presence.getSetting<string>("lang"),
		presence.getSetting<string>("vidDetail"),
		presence.getSetting<string>("vidState"),
		presence.getSetting<string>("streamDetail"),
		presence.getSetting<string>("streamState"),
	]);

	let presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/K6z2UeE.png",
			startTimestamp: elapsed,
		},
		searchPageValue: string;

	if (!privacy) {
		searchPageValue =
			document.querySelector<HTMLInputElement>("#searchForm > input")?.value ??
			"ERROR: NOT FOUND!";
	}

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const path = location.pathname.replace(/\/?$/, "/"),
		channelPageChannelName = document.querySelector(
			"#root > div > div > div > nav > div > a > strong"
		)
			? document.querySelector(
					"#root > div > div > div > nav > div > a > strong"
			  ).textContent
			: "ERROR: NOT FOUND!",
		statics: {
			[name: string]: PresenceData;
		} = {
			"/home/new/": {
				details: strings.browseThrough,
				state: strings.newVid,
				smallImageKey: "reading",
			},
			"/home/chart/": {
				details: strings.browseThrough,
				state: strings.charts,
				smallImageKey: "reading",
			},
			"/home/my/": {
				details: strings.recentUploads.includes("{0}")
					? strings.recentUploads.split("{0}")[0]
					: strings.recentUploads,
				state: strings.recentUploads.split("{0}")[1],
				smallImageKey: "reading",
			},
			"/my/": {
				details: strings.viewTheir,
				state: strings.profile,
				smallImageKey: "reading",
			},
			"/my/profile/": {
				details: strings.profileEdit.includes("{0}")
					? strings.profileEdit.split("{0}")[0]
					: strings.profileEdit,
				state: strings.profileEdit.split("{0}")[1],
				smallImageKey: "search",
			},
			"/my/watched/": {
				details: strings.viewTheir,
				state: strings.watched,
				smallImageKey: "reading",
			},
			"/my/purchased/": {
				details: strings.viewTheir,
				state: strings.purchases,
				smallImageKey: "reading",
			},
			"/my/coin/": {
				details: strings.viewTheir,
				state: strings.coins,
				smallImageKey: "reading",
			},
			"/my/devices/": {
				details: strings.viewTheir,
				state: strings.devices,
				smallImageKey: "reading",
			},
			"/my/channels/": {
				details: strings.viewTheir,
				state: strings.followed,
				smallImageKey: "reading",
			},
			"/upcoming/": {
				details: strings.browseThrough,
				state: strings.upcoming,
				smallImageKey: "reading",
			},
			"/channels/": {
				details: strings.browseThrough,
				state: strings.channelList,
				smallImageKey: "reading",
			},
			"/channel/(\\w*\\d*)/": {
				details: strings.channelHome,
				state: strings.ofChannel.replace("{0}", channelPageChannelName),
				smallImageKey: "reading",
			},
			"/channel/(\\w*\\d*)/schedule/": {
				details: strings.channelSchedule,
				state: strings.ofChannel.replace("{0}", channelPageChannelName),
				smallImageKey: "reading",
			},
			"/channel/(\\w*\\d*)/my/": {
				details: strings.channelMy,
				state: strings.ofChannel.replace("{0}", channelPageChannelName),
				smallImageKey: "reading",
			},
			"/channel/(\\w*\\d*)/store/": {
				details: strings.channelStore,
				state: strings.ofChannel.replace("{0}", channelPageChannelName),
				smallImageKey: "reading",
			},
			"/channel/(\\w*\\d*)/board/": {
				details: strings.channelBoard.replace(
					"{0}",
					document.querySelector("#root > div > div > div > div > div > h2")
						?.textContent ?? "ERROR: NOT FOUND!"
				),
				state: strings.ofChannel.replace("{0}", channelPageChannelName),
				smallImageKey: "reading",
			},
			"/events/": {
				details: strings.browseThrough,
				state: strings.events,
				smallImageKey: "reading",
			},
			"/vstore/": {
				details: strings.browseThrough,
				state: strings.store,
				smallImageKey: "reading",
			},
			"/product/(\\w*\\d*)/": {
				details: strings.product.replace(
					"{0}",
					document.querySelector("a.name")?.textContent ?? "ERROR: NOT FOUND!"
				),
				state:
					document.querySelector("h3.tit")?.textContent ?? "ERROR: NOT FOUND!",
				smallImageKey: "reading",
			},
			"/search/": {
				details: privacy ? strings.searchSomething : strings.searchFor,
				state: searchPageValue,
				smallImageKey: "search",
			},
			"/policies/": {
				details: strings.policies,
				smallImageKey: "reading",
			},
			"/about/": {
				details: `${strings.readingAbout} V LIVE`,
				smallImageKey: "reading",
			},
		};

	if (showBrowsing) {
		for (const [k, v] of Object.entries(statics))
			if (path.match(k)) presenceData = { ...presenceData, ...v };

		if (privacy) {
			presenceData.details = strings.browse;
			presenceData.smallImageKey = "reading";
			delete presenceData.state;
		}
	}

	//* Video page
	if (path.match("/video/(\\d*)/")) {
		const video = document.querySelector("video"),
			badge = document.querySelector(
				"#root > div > div > div > div > div > div > div > div > div > span > em"
			),
			title = document.querySelector(
				"#root > div > div > div > div > div > div > div > div > div > span > strong"
			)
				? document.querySelector(
						"#root > div > div > div > div > div > div > div > div > div > span > strong"
				  ).textContent
				: "ERROR: NOT FOUND!";

		if (video) {
			if (badge && badge.className.includes("-liveon--")) {
				//* Is a livestream
				if (showLive) {
					if (document.querySelector(".timeBox")) {
						presenceData.startTimestamp = Math.floor(
							Date.now() / 1000 -
								presence.timestampFromFormat(
									document.querySelector(".timeBox").textContent
								)
						);
					}
					presenceData.smallImageKey = video.paused ? "pause" : "live";
					presenceData.smallImageText = video.paused
						? strings.pause
						: strings.live;
					presenceData.details = streamDetail
						.replace("%title%", title)
						.replace("%streamer%", channelPageChannelName);
					presenceData.state = streamState
						.replace("%title%", title)
						.replace("%streamer%", channelPageChannelName);

					if (video.paused) delete presenceData.startTimestamp;
				}

				//* Privacy mode enabled.
				if (privacy && showLive) {
					presenceData.details = strings.watchingLive;
					delete presenceData.state;
				} else if (showBrowsing && !showLive) {
					presenceData.details = strings.browse;
					presenceData.smallImageKey = "reading";
					delete presenceData.state;
				}
			} else {
				//* Is a a normal video
				if (showVideo) {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);
					presenceData.smallImageKey = video.paused ? "pause" : "play";
					presenceData.smallImageText = video.paused
						? strings.pause
						: strings.play;
					presenceData.details = vidDetail
						.replace("%title%", title)
						.replace("%uploader%", channelPageChannelName);
					presenceData.state = vidState
						.replace("%title%", title)
						.replace("%uploader%", channelPageChannelName);

					if (video.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				}

				//* Privacy mode enabled.
				if (privacy && showVideo) {
					presenceData.details = strings.watchingVid;
					delete presenceData.state;
				} else if (showBrowsing && !showVideo) {
					presenceData.details = strings.browse;
					presenceData.smallImageKey = "reading";
					delete presenceData.state;
				}
			}
		} else if (
			document.querySelector(
				"#root > div > div > div > div > div > div > div > div > div> div > div > div > strong"
			)
		) {
			//* Video not out yet...
			if (badge && badge.className.includes("-live--")) {
				//* Will be a livestream
				if (showLive) {
					presenceData.details = streamDetail
						.replace("%title%", title)
						.replace("%streamer%", channelPageChannelName);
					presenceData.state = streamState
						.replace("%title%", title)
						.replace("%streamer%", channelPageChannelName);
					presenceData.smallImageKey = "premiere-live";
					presenceData.smallImageText = strings.waitingLiveThe;
				}

				//* Privacy mode enabled.
				if (privacy && showLive) {
					presenceData.details = strings.waitingLive;
					delete presenceData.state;
					delete presenceData.smallImageText;
				} else if (showBrowsing && !showLive) {
					presenceData.details = strings.browse;
					presenceData.smallImageKey = "reading";
					delete presenceData.state;
					delete presenceData.smallImageText;
				}
			} else {
				//* Will be a normal video
				if (showVideo) {
					presenceData.details = vidDetail
						.replace("%title%", title)
						.replace("%uploader%", channelPageChannelName);
					presenceData.state = vidState
						.replace("%title%", title)
						.replace("%uploader%", channelPageChannelName);
					presenceData.smallImageKey = "premiere";
					presenceData.smallImageText = strings.waitingVidThe;
				}

				//* Privacy mode enabled.
				if (privacy && showVideo) {
					presenceData.details = strings.waitingVid;
					delete presenceData.state;
					delete presenceData.smallImageText;
				} else if (showBrowsing && !showVideo) {
					presenceData.details = strings.browse;
					presenceData.smallImageKey = "reading";
					delete presenceData.state;
					delete presenceData.smallImageText;
				}
			}
		}
	}

	//* Post page
	if (path.match("/post/(\\d*-\\d*)/")) {
		const video = document.querySelector("video"),
			videoTitle = document.querySelector(
				"#root > div > div > div > div > div > div > div > div > div > span > strong"
			),
			videoPoster = document.querySelector(
				"#root > div > div > div > div > div > div > div > div > div > div > div > a > span"
			),
			postTitle = document.querySelector(
				"#root > div > div > div > div > div > div > div > strong"
			),
			postPoster = document.querySelector(
				"#root > div > div > div > div > div > div > div > div > div > a > span"
			);

		if (video && videoTitle && videoPoster) {
			//* Has video
			if (showVideo) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? strings.pause
					: strings.play;
				presenceData.details = vidDetail
					.replace("%title%", videoTitle.textContent)
					.replace("%uploader%", videoPoster.textContent);
				presenceData.state = vidState
					.replace("%title%", videoTitle.textContent)
					.replace("%uploader%", videoPoster.textContent);

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}

			//* Privacy mode enabled.
			if (privacy && showVideo) {
				presenceData.details = strings.watchingVid;
				delete presenceData.state;
			} else if (showBrowsing && !showVideo) {
				presenceData.details = strings.browse;
				delete presenceData.state;
			}
		} else if (postTitle && postPoster) {
			//* Normal text post
			presenceData.details = `${strings.readingPost} (${postPoster.textContent})`;
			presenceData.state = postTitle.textContent;
			presenceData.smallImageKey = "reading";
		}
	}

	if (presenceData.details) {
		if (!showTimestamps) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData);

		if (
			presenceData.details.includes("ERROR: NOT FOUND!") ||
			(presenceData.state && presenceData.state.includes("ERROR: NOT FOUND!"))
		) {
			presence.error(
				`Unable to find an element...\nPlease contact Bas950#0950 in Discord (https://discord.premid.app/).\nPath: ${path}`
			);
		}
	} else {
		presence.setActivity();

		presence.info(
			`Looks like your current page is unsupported!\nPlease contact Bas950#0950 in Discord (https://discord.premid.app/).\nPath: ${path}`
		);
	}
});
