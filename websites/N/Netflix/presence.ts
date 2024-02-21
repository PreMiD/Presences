interface Episode {
	seq: number;
	title: string;
	episodeId: number;
}

interface Season {
	seq: number;
	episodes: Episode[];
}

interface VideoMetadata {
	type: "movie" | "show";
	boxart: string;
	id: number;
	currentEpisode: number;
	seasons: Season[];
	title: string;
}

interface DiscoveryModel {
	type: "movie" | "show";
	title: string;
	imageHighRes: string;
}

async function pushScript() {
	script.id = eventName;

	script.appendChild(
		document.createTextNode(`
    let isRunning = false;

    setInterval(() => {
      if (isRunning) return;
      isRunning = true;

      let videoMetadata = {};
      for (const [k, v] of Object.entries(netflix.appContext.state.playerApp.getState().videoPlayer.videoMetadata)) {
        const i = v._metadata.video;
          videoMetadata[k] = {
            id: i.id,
            type: i.type,
            title: i.title,
            boxart: i.boxart[0].url,
            currentEpisode: i.currentEpisode,
            seasons: i.seasons?.map(s => {
              return {
                seq: s.seq,
                episodes: s.episodes.map(e => {
                  return {
                    seq: e.seq,
                    title: e.title,
                    episodeId: e.episodeId
                  }
                })
              }
            })
          }
      }

    let discoveryModels = {};
    for (const [k, v] of Object.entries(netflix.appContext.state.discoveryApp.getState().discovery.previewModal.previewModalStateById)) {
      const i = v.videoModel;
      if (i) {
        discoveryModels[k] = {
          type: i.summary.type,
          title: i.title,
          imageHighRes: i.imageHighRes
        }
      }
    }

      var pmdEvent = new CustomEvent("${eventName}", {
        detail: {
          videoMetadata,
          discoveryModels
        }
      });
      window.dispatchEvent(pmdEvent);

      isRunning = false;
    }, 10);
  `)
	);
	document.head.appendChild(script);

	window.addEventListener(eventName, (data: CustomEvent) => {
		latestData = data.detail;
	});
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/N/Netflix/assets/1.png",
	Noback = "https://cdn.rcd.gg/PreMiD/websites/N/Netflix/assets/2.png",
	Animated = "https://cdn.rcd.gg/PreMiD/websites/N/Netflix/assets/0.gif",
}

const presence = new Presence({
		clientId: "926541425682829352",
	}),
	getStrings = async () => {
		return presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				browse: "general.browsing",
				viewingMovie: "general.viewMovie",
				viewingSeries: "general.viewSeries",
				account: "general.viewAccount",
				watchingMovie: "general.watchingMovie",
				watchingSeries: "general.watchingSeries",
				searchFor: "general.searchFor",
				searchSomething: "general.searchSomething",
				genre: "general.viewGenre",
				viewSeries: "general.buttonViewSeries",
				viewMovies: "general.buttonViewMovie",
				watchEpisode: "general.buttonViewEpisode",
				watchMovie: "general.buttonWatchMovie",
				viewList: "netflix.viewList",
				profile: "netflix.profile",
				latest: "netflix.latest",
				refer: "netflix.referral",
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	},
	script = document.createElement("script"),
	eventName = "PreMiD_Netflix",
	readyOrNot =
		document.readyState.includes("complete") ||
		!document.querySelector('[class="loading-children-container"]'); // Checks if page is still loading. If loaded readyState = complete - So True; If loading screenelement doesnt exist - True; If still loading url or load screen element exist - False;

let latestData: {
		videoMetadata: Record<string, VideoMetadata>;
		discoveryModels: Record<string, DiscoveryModel>;
	} = null,
	browsingTimestamp = Math.floor(Date.now() / 1000),
	prevUrl = document.location.href,
	strings: Awaited<ReturnType<typeof getStrings>> = null,
	oldLang: string = null,
	scriptPushed = false; //Check if the script has been loaded before. False = NOT loaded & True = loaded

presence.on("UpdateData", async () => {
	const [
			showMovie,
			movieDetail,
			movieState,
			showSeries,
			seriesDetail,
			seriesState,
			showBrowsing,
			showTimestamp,
			showButtons,
			privacy,
			newLang,
			logo,
			cover,
		] = await Promise.all([
			presence.getSetting<string>("movie"),
			presence.getSetting<string>("movieDetails"),
			presence.getSetting<string>("movieStates"),
			presence.getSetting<boolean>("series"),
			presence.getSetting<string>("seriesDetails"),
			presence.getSetting<string>("seriesStates"),
			presence.getSetting<boolean>("browse"),
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<number>("logo"),
			presence.getSetting<boolean>("cover"),
		]),
		largeImage =
			[Assets.Animated, Assets.Logo, Assets.Noback][logo] || Assets.Logo;

	let presenceData: PresenceData = {
			largeImageKey: largeImage,
			type: ActivityType.Watching,
		},
		[videoMetadata] = Object.values(latestData?.videoMetadata || {});
	//* Reset browsingTimestamp if href has changed.

	if (document.location.href !== prevUrl) {
		prevUrl = document.location.href;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}
	if (
		!scriptPushed &&
		!readyOrNot &&
		document.location.pathname.includes("/watch/")
	)
		// If it hasnt been pushed, is still loading & includes /watch/ return, otherwise continue showing other things in presence.ts
		return;
	else if (!scriptPushed && readyOrNot) {
		scriptPushed = true;
		pushScript(); // Load the script.
	}

	//* Language changed, reload strings
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (!videoMetadata && window.location.pathname.includes("/watch/")) {
		const episodeId = parseInt(
				(
					document.querySelector("[class$='title'] .ellipsize-text span") ??
					document.querySelector("[data-uia$='video-title'] span")
				)?.textContent
					.split(":")[1]
					.trim()
					.replace(/\D+/g, ""),
				0
			),
			seasonId = parseInt(
				(
					document.querySelector("[class$='title'] .ellipsize-text span") ??
					document.querySelector("[data-uia$='video-title'] span")
				)?.textContent
					.split(":")[0]
					.trim()
					.replace(/\D+/g, ""),
				0
			),
			watchId = parseInt(document.URL.split("?")[0].replace(/\D+/g, ""), 0),
			type =
				document.querySelector("[class$='title'] .ellipsize-text span") ||
				document.querySelector("[data-uia$='video-title'] span")
					? "show"
					: "movie";

		if (!episodeId || !seasonId || !watchId) return;

		videoMetadata = {
			type,
			currentEpisode: watchId,
			id: watchId,
			boxart: null,
			seasons: [
				{
					seq: seasonId,
					episodes: [
						{
							episodeId: watchId,
							seq: episodeId,
							title: (
								document.querySelector(
									"[class$='title'] .ellipsize-text span:nth-child(3)"
								) ??
								document.querySelector(
									"[data-uia$='video-title'] span:nth-child(3)"
								)
							)?.textContent,
						},
					],
				},
			],
			title:
				type === "movie"
					? (
							document.querySelector("[class$='title'] h4.ellipsize-text") ??
							document.querySelector("[data-uia$='video-title']")
					  )?.textContent
					: (
							document.querySelector("[class$='title'] .ellipsize-text h4") ??
							document.querySelector("[data-uia$='video-title'] h4")
					  )?.textContent,
		};
	}

	if (videoMetadata) {
		const videoElement = document.querySelector("video"),
			{ currentEpisode, id, seasons, title, boxart } = videoMetadata;

		if (!videoElement) return;

		//* User is currently playing a video
		const { paused } = videoElement;

		if (cover) {
			presenceData.largeImageKey = boxart
				? await getShortURL(boxart)
				: largeImage;
		}

		[, presenceData.endTimestamp] =
			presence.getTimestampsfromMedia(videoElement);
		if (paused) delete presenceData.endTimestamp;

		presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = paused ? strings.pause : strings.play;

		switch (videoMetadata.type) {
			case "movie": {
				presenceData.details = movieDetail.replace("%title%", title);
				presenceData.state = movieState.replace("%title%", title);

				if (movieDetail === "{0}") delete presenceData.details;
				if (movieState === "{0}") delete presenceData.state;

				presenceData.buttons = [
					{
						label: strings.watchMovie,
						url: `https://www.netflix.com/watch/${id}`,
					},
					{
						label: strings.viewMovies,
						url: `https://www.netflix.com/title/${id}`,
					},
				];

				if (privacy) {
					presenceData.details = strings.watchingMovie;
					delete presenceData.state;
				}

				if (!showButtons || privacy) delete presenceData.buttons;

				if (!showTimestamp) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}

				if ((presenceData.details as string).length < 3)
					presenceData.details = ` ${presenceData.details}`;

				if ((presenceData.state as string)?.length < 3)
					presenceData.state = ` ${presenceData.state}`;

				if (showMovie) return presence.setActivity(presenceData);
				else return presence.setActivity();
			}
			case "show": {
				const episodeId = currentEpisode,
					season = seasons.find(s =>
						s.episodes.map(e => e.episodeId).includes(episodeId)
					),
					episode = season.episodes.find(e => e.episodeId === episodeId);

				presenceData.details = seriesDetail
					.replace("%title%", title)
					.replace("%season%", season.seq.toString())
					.replace("%episode%", episode.seq.toString())
					.replace("%episodeTitle%", episode.title);
				presenceData.state = seriesState
					.replace("%title%", title)
					.replace("%season%", season.seq.toString())
					.replace("%episode%", episode.seq.toString())
					.replace("%episodeTitle%", episode.title);

				if (seriesState === "{0}") delete presenceData.state;

				presenceData.buttons = [
					{
						label: strings.watchEpisode,
						url: `https://www.netflix.com/watch/${currentEpisode}`,
					},
					{
						label: strings.viewSeries,
						url: `https://www.netflix.com/title/${id}`,
					},
				];

				if (privacy) {
					presenceData.details = strings.watchingSeries;
					delete presenceData.state;
				}

				if (!showButtons || privacy) delete presenceData.buttons;

				if (!showTimestamp) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}

				if (presenceData.details.length < 3)
					presenceData.details = ` ${presenceData.details}`;

				if ((presenceData.state as string).length < 3)
					presenceData.state = ` ${presenceData.state}`;

				if (showSeries) return presence.setActivity(presenceData);
				else return presence.setActivity();
			}
		}
	}

	//* User is browsing the website
	const statics: {
		[name: string]: PresenceData;
	} = {
		"/browse": {
			details: strings.browse,
		},
		"/browse/genre/(\\d*)/": {
			...(() => {
				const genre =
					document.querySelector(".genreTitle")?.textContent ||
					document.querySelector(".nm-collections-header-name")?.textContent;

				if (!genre) return {};
				return {
					details: strings.genre,
					state:
						document.querySelector(".genreTitle")?.textContent ||
						document.querySelector(".nm-collections-header-name")?.textContent,
				};
			})(),
		},
		"/browse/my-list/": {
			details: strings.viewList,
		},
		"/title/(\\d*)/": {
			...(await (async () => {
				const model = latestData?.discoveryModels[document.URL.split("/")[4]],
					isSeries = model?.type === "show";
				if (!model) return {};
				return {
					details: isSeries ? strings.viewingSeries : strings.viewingMovie,
					state: model.title,
					largeImageKey: cover
						? model.imageHighRes
							? await getShortURL(model.imageHighRes)
							: largeImage
						: largeImage,
					buttons: [
						{
							label: isSeries ? strings.viewSeries : strings.viewMovies,
							url: document.URL.split("&")[0],
						},
					],
				};
			})()),
		},
		"/latest/": {
			details: strings.latest.includes("{0}")
				? strings.latest.split("{0}")[0]
				: strings.latest,
			state: strings.latest.split("{0}")[1],
		},
		"/search/": {
			details: strings.searchFor,
			state: document.querySelector<HTMLInputElement>(".searchInput > input")
				?.value,
			smallImageKey: Assets.Search,
		},
		"jbv/(\\d*)/": {
			...(await (async () => {
				const model =
						latestData?.discoveryModels[
							document.URL.split("&")[0].split("jbv=")[1]
						],
					isSeries = model?.type === "show";

				if (!model) return {};

				return {
					details: isSeries ? strings.viewingSeries : strings.viewingMovie,
					state: model.title,
					largeImageKey: cover
						? model.imageHighRes
							? await getShortURL(model.imageHighRes)
							: largeImage
						: largeImage,
					buttons: [
						{
							label: isSeries ? strings.viewSeries : strings.viewMovies,
							url: document.URL.split("&")[0],
						},
					],
				};
			})()),
		},
		"/referfriends/": {
			details: strings.refer.includes("{0}")
				? strings.refer.split("{0}")[0]
				: strings.refer,
			state: strings.refer.split("{0}")[1],
		},
		"/profiles/manage/": {
			details: strings.profile,
		},
		"/YourAccount/": {
			details: strings.account,
		},
	};

	if (showBrowsing) {
		for (const [k, v] of Object.entries(statics)) {
			if (
				location.href
					.replace(/\/?$/, "/")
					.replace(`https://${document.location.hostname}`, "")
					.replace("?", "/")
					.replace("=", "/")
					.match(k)
			) {
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = strings.browse;
				presenceData = { ...presenceData, ...v };
			}
		}
	}

	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (privacy && presenceData.smallImageKey === Assets.Search) {
		presenceData.details = strings.searchSomething;
		delete presenceData.state;
	} else if (privacy) {
		presenceData.details = strings.browse;
		delete presenceData.state;
	}

	if (!showButtons || privacy) delete presenceData.buttons;

	if (!presenceData.details) return;
	else if (!showBrowsing) presence.setActivity();
	else presence.setActivity(presenceData);
});

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}
