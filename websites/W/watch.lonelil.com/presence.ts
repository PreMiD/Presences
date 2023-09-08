const presence = new Presence({
		clientId: "1147910465134002276",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		viewAMovie: "general.viewAMovie",
		viewAShow: "general.viewAShow",
		viewAnime: "general.viewAnime",
		watchingMovie: "general.watchingMovie",
		watchingShow: "general.watchingShow",
		watchingLive: "general.watchingLive",
		viewingHomePage: "general.viewHome",
		loading: "kahoot.loadingPage",
		buttonWatchMovie: "general.buttonWatchMovie",
		buttonWatchEpisode: "general.buttonViewEpisode",
		buttonWatchStream: "general.buttonWatchStream",
		buttonViewMovie: "general.buttonViewMovie",
		buttonViewShow: "general.buttonViewShow",
	});

enum logos {
	logo = "https://i.imgur.com/Niuxx4z.png",
	home = "https://i.imgur.com/RPr5zwZ.png",
}

let since = Math.floor(Date.now() / 1000),
	lastType = "";

presence.on("UpdateData", async () => {
	if (document.querySelector("#state")) {
		const state = JSON.parse(
			document.querySelector("#state").getAttribute("data-state")
		) as {
			type: string;
			since: number;
			item: {
				shownType: string;
				type: "anime" | "movie" | "show" | "tv";
				id: string;
				title: string;
				description: string;
				poster: string;
				details?: string;
			};
			duration?: number;
			paused?: boolean;
			title?: string;
			shownType?: string;
		};

		if (state.type !== lastType) {
			lastType = state.type;
			since = Date.now();
		}

		const defaultData: PresenceData = {
			largeImageKey: logos.logo,
			smallImageText: "watch.lonelil.com",
			smallImageKey: logos.logo,
			startTimestamp: since,
		};
		let presenceData: PresenceData = {};

		if (state.type.startsWith("home")) {
			presenceData = {
				...defaultData,
				details: (await strings).viewingHomePage,
				largeImageKey: logos.home,
			};
		}

		if (state.type.startsWith("details")) {
			presenceData = {
				...defaultData,
				details:
					state.item.type === "anime"
						? (await strings).viewAnime.replace(":", "")
						: state.item.type === "movie"
						? (await strings).viewAMovie
						: (await strings).viewAShow,
				state: state.item.title,
				largeImageKey: state.item.poster,
				smallImageText: state.item.shownType,
				buttons: [
					{
						label:
							state.item.type === "movie"
								? (await strings).buttonViewMovie
								: (await strings).buttonViewShow,
						url: `https://watch.lonelil.com/${state.item.type}/${state.item.id}`,
					},
				],
			};
		}

		if (state.type.startsWith("watch")) {
			const props: PresenceData = {
				details:
					state.item.details ||
					(state.item.type === "movie"
						? (await strings).watchingMovie
						: state.item.type === "tv"
						? (await strings).watchingLive
						: (await strings).watchingShow),
				state: state.item.title,
				largeImageKey: state.item.poster,
				smallImageKey: Assets.Play,
				smallImageText: (await strings).play,
				buttons: [
					{
						label:
							state.item.type === "movie"
								? (await strings).buttonWatchMovie
								: state.item.type === "tv"
								? (await strings).buttonWatchStream
								: (await strings).buttonWatchEpisode,
						url: `https://watch.lonelil.com/watch/${state.item.type}/${state.item.id}`,
					},
				],
			};

			if (state.paused) {
				presenceData = {
					...props,
					smallImageKey: Assets.Pause,
					smallImageText: (await strings).pause,
				};
			} else if (state.duration) {
				const endDate = new Date(since);
				endDate.setSeconds(endDate.getSeconds() + state.duration);
				presenceData = {
					...props,
					endTimestamp: Math.floor(endDate.getTime() / 1000),
				};
			} else presenceData = props;
		}

		if (state.type === "loading") {
			delete presenceData.smallImageKey;
			presenceData = {
				...defaultData,
				details: (await strings).loading,
			};
		}

		if (state.type.startsWith("other")) {
			delete presenceData.startTimestamp;
			presenceData = {
				...defaultData,
				details: state.title,
			};
		}

		presence.setActivity(presenceData);
	} else presence.clearActivity();
});
