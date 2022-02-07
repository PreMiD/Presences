let elapsed = Math.floor(Date.now() / 1000),
	oldLang = "en",
	prevUrl = document.location.href;

const presence = new Presence({
		clientId: "939877915032682576"
	}),
	getElement = (query: string): string | undefined => {
		return document.querySelector(query)?.textContent;
	},
	getStrings = async () => {
		return presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				live: "general.live",
				viewHome: "general.viewHome",
				browse: "general.browsing",
				watchingLive: "general.watchingLive",
				watchingVid: "general.watchingVid",
				viewCategory: "general.viewCategory",
				viewTheir: "twitch.viewTheir",
				channelSettings: "twitch.channelSettings",
				followList: "twitch.followList",
				esport: "twitch.esports",
				searchingFor: "general.searchFor",
				searchingSomething: "general.searchSomething",
				search: "general.search",
				watchStream: "general.buttonWatchStream",
				watchVideo: "general.buttonWatchVideo"
			},
			oldLang
		);
	};

let strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: elapsed
		},
		{ pathname } = document.location,
		[
			showTimestamps,
			newLang,
			privacy,
			vidDetail,
			vidState,
			streamDetail,
			streamState,
			profilePic,
			buttons
		] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<string>("vidDetail"),
			presence.getSetting<string>("vidState"),
			presence.getSetting<string>("streamDetail"),
			presence.getSetting<string>("streamState"),
			presence.getSetting<boolean>("profilePic"),
			presence.getSetting<boolean>("buttons")
		]),
		title = getElement(
			":is(div.nimo-rm_title-text > h3, #meta-info > div.video-info h1)"
		),
		streamer = getElement(
			":is(div.nimo-rm_sub-title > h1, #meta-info div.anchor-name.n-as-text-over > a > h2)"
		),
		game = getElement("div.nimo-anchor-broadcast-game > a > h4"),
		vidTimer = getElement("#nimo-player div.time-label-control.control-item");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (document.location.href !== prevUrl) {
		prevUrl = document.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	if (pathname === "/") presenceData.details = strings.viewHome;
	else if (pathname.startsWith("/game")) {
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = strings.browse;
		presenceData.details = strings.browse;
		if (!privacy) {
			presenceData.details = strings.viewCategory;
			presenceData.state = document.querySelector<HTMLHeadingElement>(
				":is(#root div.n-fx1 div > h1, div.game-ahb-info > h1)"
			).textContent;
		}
	} else if (pathname.startsWith("/esports")) {
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = strings.browse;
		presenceData.details = strings.browse;
		if (!privacy) presenceData.details = strings.esport;
	} else if (pathname.startsWith("/search")) {
		presenceData.details = strings.searchingSomething;
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = strings.search;
		if (!privacy) {
			presenceData.details = strings.searchingFor;
			presenceData.state = document
				.querySelector("div.searchTip > span:nth-child(4)")
				.textContent.replaceAll('"', "");
		}
	} else if (pathname.startsWith("/i")) {
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = strings.browse;
		presenceData.details = strings.browse;
		if (!privacy) {
			presenceData.details = strings.viewTheir;
			presenceData.state = strings.channelSettings;
			if (pathname.includes("/my-subscribe"))
				presenceData.state = strings.followList;
		}
	} else if (title && streamer) {
		if (vidTimer) {
			let paused = !document.querySelector('#nimo-player div[title~="Pause"]');
			const timeElapsed = presence.timestampFromFormat(
					vidTimer.split("/", 2)[0].trim()
				),
				duration = presence.timestampFromFormat(
					vidTimer.split("/", 2)[1].trim()
				);
			if (!privacy) {
				presenceData.details = vidDetail
					.replace("%title%", title)
					.replace("%uploader%", streamer);
				presenceData.state = vidState
					.replace("%title%", title)
					.replace("%uploader%", streamer);

				delete presenceData.startTimestamp;

				if (Date.now() / 1000 >= Date.now() / 1000 + duration - timeElapsed)
					paused = true;
				if (!paused) {
					presenceData.endTimestamp =
						Date.now() / 1000 + duration - timeElapsed;
				}

				presenceData.buttons = [
					{ label: strings.watchVideo, url: document.URL }
				];
			} else presenceData.details = strings.watchingVid;
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused ? strings.pause : strings.play;
		} else {
			if (!privacy) {
				presenceData.details = streamDetail
					.replace("%title%", title)
					.replace("%streamer%", streamer)
					.replace("%game%", game);
				presenceData.state = streamState
					.replace("%title%", title)
					.replace("%streamer%", streamer)
					.replace("%game%", game);
				presenceData.buttons = [
					{ label: strings.watchStream, url: document.URL }
				];
			} else presenceData.details = strings.watchingLive;
			presenceData.smallImageKey = "live";
			presenceData.smallImageText = strings.live;
		}
		if (profilePic) {
			presenceData.largeImageKey = document
				.querySelector<HTMLImageElement>(
					":is(#meta-info a > span > picture > img, #root div.nimo-room__theater-section span > a > span > picture > img)"
				)
				.src.replace("w120", "w300");
		}
	}
	if (!showTimestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
