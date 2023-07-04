const presence = new Presence({
		clientId: "1120627624377589820",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

interface MovieMedia {
	meta: {
		meta: {
			title: string;
			id: string;
			year: string;
			poster: string;
			type: "movie";
		};
		imdbId: string;
		tmdbId: string;
	};
	captions: {
		langIso: string;
		url: string;
		type: string;
	}[];
	episode?: undefined;
}

interface SeriesMedia {
	meta: {
		meta: {
			title: string;
			id: string;
			year: string;
			poster: string;
			type: "series";
			seasons: {
				id: string;
				number: number;
				title: string;
			}[];
			seasonData: {
				id: string;
				number: number;
				title: string;
				episodes: {
					id: string;
					number: number;
					title: string;
				}[];
			};
		};
		imdbId: string;
		tmdbId: string;
	};
	episode: {
		episodeId: string;
		seasonId: string;
	};
	captions: {
		langIso: string;
		url: string;
		type: string;
	}[];
}

interface DevMetaData {
	media: MovieMedia | SeriesMedia;
	state: {
		progress: {
			time: number;
			duration: number;
		};
		mediaPlaying: {
			hasPlayedOnce: boolean;
			isDragSeeking: boolean;
			isFirstLoading: boolean;
			isLoading: boolean;
			isPaused: boolean;
			isPlaying: boolean;
			isSeeking: boolean;
			playbackSpeed: number;
			volume: number;
		};
	};
}

interface ProdMetaData {
	meta:
		| {
				meta: {
					title: string;
					id: string;
					year: string;
					poster: string;
					type: "movie";
				};
				imdbId: string;
				tmdbId: string;
		  }
		| {
				meta: {
					title: string;
					id: string;
					year: string;
					poster: string;
					type: "series";
					seasons: {
						id: string;
						number: number;
						title: string;
					}[];
					seasonData: {
						id: string;
						number: number;
						title: string;
						episodes: {
							id: string;
							number: number;
							title: string;
						}[];
					};
				};
				imdbId: string;
				tmdbId: string;
		  };
	episode?: {
		episodeId: string;
		seasonId: string;
	};
	progress: {
		time: number;
		duration: number;
	};
}

presence.on("UpdateData", async () => {
	const { pathname, href, host } = window.location,
		subdomain = host.split(".")[0],
		[
			showTimestamp,
			showWatchButton,
			showProgressBar,
			barLengthString,
			barTrack,
			barFill,
			showLabel,
		] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("watch"),
			presence.getSetting<boolean>("progress"),
			presence.getSetting<string>("barLength"),
			presence.getSetting<string>("barTrack"),
			presence.getSetting<string>("barFill"),
			presence.getSetting<boolean>("showLabel"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/QLshPfl.png",
		};

	if (subdomain === "dev") {
		if (pathname === "" || pathname.startsWith("/search"))
			presenceData.startTimestamp = browsingTimestamp;
		else if (pathname.startsWith("/media")) {
			const metaObj = await presence.getPageletiable("meta"),
				metaData: DevMetaData | undefined = Object.values(metaObj ?? {})[0];
			if (!metaData) return;

			const { media, state } = metaData;

			presenceData.largeImageKey = media.meta.meta.poster;

			if ((state.progress.time && state.progress.duration) !== 0) {
				presenceData.state = createProgressBar(
					state.progress.time,
					state.progress.duration,
					{
						barLengthString,
						barFill,
						barTrack,
						showLabel,
					}
				);
			}

			const title = `${media.meta.meta.title} (${media.meta.meta.year})`;
			if (media.meta.meta.type === "series") {
				const episodeData = media.episode,
					episode = media.meta.meta.seasonData.episodes.find(
						episode => episode.id === episodeData.episodeId
					);

				presenceData.details = `S${media.meta.meta.seasonData.number}E${episode.number} — ${title}`;
			} else presenceData.details = title;

			if (state.mediaPlaying.isFirstLoading) {
				presenceData.smallImageKey = "https://i.imgur.com/lBCZWIB.gif";
				presenceData.smallImageText = "Loading";
			} else if (state.mediaPlaying.isPlaying) {
				const now = new Date();
				presenceData.endTimestamp = now.setSeconds(
					now.getSeconds() + state.progress.duration - state.progress.time
				);
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Playing";
			} else if (state.mediaPlaying.isPaused) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = "Paused";
			}
		}
	} else if (subdomain) {
		if (pathname === "" || pathname.startsWith("/search"))
			presenceData.startTimestamp = browsingTimestamp;
		else if (pathname.startsWith("/media")) {
			const metaObj = await presence.getPageletiable("meta"),
				metaData: ProdMetaData | undefined = Object.values(metaObj ?? {})[0];
			if (!metaData) return;

			const { progress, meta, episode } = metaData,
				mediaPlaying = {
					isFirstLoading: (progress.time && progress.duration) === 0,
					isLoading: progress.duration === 0,
				};

			presenceData.largeImageKey = meta.meta.poster;

			if (!mediaPlaying.isLoading && progress.time && progress.duration) {
				presenceData.state = createProgressBar(
					progress.time,
					progress.duration,
					{
						barLengthString,
						barFill,
						barTrack,
						showLabel,
					}
				);
			}

			const title = `${meta.meta.title} (${meta.meta.year})`;
			if (meta.meta.type === "series" && episode) {
				presenceData.details = `S${meta.meta.seasonData.number}E${
					meta.meta.seasonData.episodes.find(
						episode => episode.id === episode.id
					).number
				} — ${title}`;
			} else presenceData.details = title;

			if (mediaPlaying.isFirstLoading) {
				presenceData.smallImageKey = "https://i.imgur.com/lBCZWIB.gif";
				presenceData.smallImageText = "Loading";
			} else {
				const now = new Date();
				presenceData.endTimestamp = now.setSeconds(
					now.getSeconds() + progress.duration - progress.time
				);
			}
		}
	}

	if (showWatchButton && !pathname.startsWith("/search")) {
		presenceData.buttons = [
			{
				label: "Watch",
				url: href,
			},
		];
	}

	if (!showTimestamp) delete presenceData.endTimestamp;

	if (!showProgressBar) delete presenceData.state;

	presence.setActivity(presenceData);
});

function createProgressBar(
	time: number,
	duration: number,
	barOptions: {
		barLengthString: string;
		barTrack: string;
		barFill: string;
		showLabel: boolean;
	}
): string {
	const { barLengthString, barTrack, barFill, showLabel } = barOptions,
		progress = Math.floor((time / duration) * 100),
		barLength = isNaN(parseInt(barLengthString, 10))
			? 10
			: parseInt(barLengthString, 10),
		numChars = Math.floor((progress / 100) * barLength);

	return `${barFill.repeat(numChars)}${barTrack.repeat(
		barLength - numChars
	)}  ${showLabel ? `${progress}%` : ""}`.trimEnd();
}
