const presence = new Presence({
		clientId: "1147910465134002276",
	}),
	getStrings = async () => {
		return presence.getStrings(
			{
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
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	};

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/W/watch.lonelil.com/assets/logo.png",
	Home = "https://cdn.rcd.gg/PreMiD/websites/W/watch.lonelil.com/assets/0.png",
}

let since = Math.floor(Date.now() / 1000),
	lastType = "",
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

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
			since = Math.floor(Date.now() / 1000);
		}

		const defaultData: PresenceData = {
				largeImageKey: Assets.Logo,
				smallImageText: "watch.lonelil.com",
				smallImageKey: Assets.Logo,
				startTimestamp: since,
			},
			newLang = await presence.getSetting<string>("lang").catch(() => "en");
		let presenceData: PresenceData = {};

		if (oldLang !== newLang || !strings) {
			oldLang = newLang;
			strings = await getStrings();
		}

		if (state.type.startsWith("home")) {
			presenceData = {
				...defaultData,
				details: strings.viewingHomePage,
				largeImageKey: Assets.Home,
			};
		} else if (state.type.startsWith("details")) {
			presenceData = {
				...defaultData,
				details:
					state.item.type === "anime"
						? strings.viewAnime.replace(":", "")
						: state.item.type === "movie"
						? strings.viewAMovie
						: strings.viewAShow,
				state: state.item.title,
				largeImageKey: state.item.poster,
				smallImageText: state.item.shownType,
				buttons: [
					{
						label:
							state.item.type === "movie"
								? strings.buttonViewMovie
								: strings.buttonViewShow,
						url: `https://watch.lonelil.com/${state.item.type}/${state.item.id}`,
					},
				],
			};
		} else if (state.type.startsWith("watch")) {
			const props: PresenceData = {
				details:
					state.item.details ||
					(state.item.type === "movie"
						? strings.watchingMovie
						: state.item.type === "tv"
						? strings.watchingLive
						: strings.watchingShow),
				state: state.item.title,
				largeImageKey: state.item.poster,
				smallImageKey: Assets.Play,
				smallImageText: strings.play,
				buttons: [
					{
						label:
							state.item.type === "movie"
								? strings.buttonWatchMovie
								: state.item.type === "tv"
								? strings.buttonWatchStream
								: strings.buttonWatchEpisode,
						url: `https://watch.lonelil.com/watch/${state.item.type}/${state.item.id}`,
					},
				],
			};

			if (state.paused) {
				presenceData = {
					...props,
					smallImageKey: Assets.Pause,
					smallImageText: strings.pause,
				};
			} else if (state.duration) {
				const endDate = new Date(since);
				endDate.setSeconds(endDate.getSeconds() + state.duration);
				presenceData = {
					...props,
					endTimestamp: Math.floor(endDate.getTime() / 1000),
				};
			} else presenceData = props;
		} else if (state.type === "loading") {
			delete defaultData.smallImageKey;
			presenceData = {
				...defaultData,
				details: strings.loading,
			};
		} else if (state.type.startsWith("other")) {
			delete defaultData.smallImageKey;
			presenceData = {
				...defaultData,
				details: state.title,
			};
		}

		presence.setActivity(presenceData);
	} else presence.clearActivity();
});
