const presence = new Presence({
		clientId: "641394369651277834",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, title: HTMLElement | string, search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/G/globoplay/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "globoplay.globo.com") {
		if (document.location.pathname === "/")
			presenceData.details = "Página inicial";
		else if (document.location.pathname.includes("/categorias/")) {
			const categoryName = document.title.match(
					new RegExp("Assistir (.+) online no Globoplay")
				)[1],
				categoryNamealt = document.querySelector(
					"div.application-controller__view > span > div > div > div > h1"
				);
			if (categoryName) {
				presenceData.details = "Vendo a categoria:";
				presenceData.state = categoryName;
				presenceData.smallImageKey = Assets.Reading;
			} else if (categoryNamealt) {
				presenceData.details = "Vendo a categoria:";
				presenceData.state = categoryNamealt.textContent;
				presenceData.smallImageKey = Assets.Reading;
			} else presenceData.details = "Categorias";
		} else if (document.location.pathname.includes("/busca/")) {
			presenceData.details = "Se preparando para";
			presenceData.state = "pesquisar algo...";
			search = document.querySelector("#search-bar-input");
			if (search.value.length > 2) {
				presenceData.details = "Pesquisando por:";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			}
		} else if (document.location.pathname.includes("/programacao"))
			presenceData.details = "Programação";
		else if (document.location.pathname.includes("/programas-locais"))
			presenceData.details = "Programas Locais";
		else if (document.location.pathname.includes("/regiao/")) {
			user = document.querySelector("h1.view-title");
			presenceData.details = `Vendo programas locais de ${user.textContent}`;
		} else if (document.location.pathname.includes("/configuracoes"))
			presenceData.details = "Configurações";
		else if (document.location.pathname.includes("/minha-lista"))
			presenceData.details = "Minha Lista";
		else if (document.location.pathname.includes("/t/")) {
			user = document.querySelector(".media-cover__header-text");
			presenceData.details = "Vendo o programa/filme:";
			presenceData.state = user.textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/v/")) {
			const video = document.querySelector<HTMLVideoElement>(
					".id-playback > video"
				),
				episodeTitle = document.querySelector(
					":is(.video-info__data-program, .playkit-video-info__link-text)"
				)?.textContent;
			if (
				episodeTitle &&
				episodeTitle !==
					document.querySelector(".video-info__data-title")?.textContent
			) {
				title = episodeTitle;
				presenceData.state = document.querySelector(
					".video-info__data-title"
				).textContent;
			} else if (episodeTitle) title = episodeTitle;

			if (!isNaN(video.duration)) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;

				presenceData.details = title as string;

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (isNaN(video.duration)) {
				presenceData.details = "Olhando para:";
				presenceData.state = title as string;
			}
		} else if (document.location.pathname.includes("/podcasts/")) {
			const podcastTitle = document.querySelector(
					"div > div.podcast-view__header-info > h1"
				)?.textContent,
				podcastTitlealt = document.querySelector(
					"div.podcast-episode-view__header-info > div:nth-child(1) > a"
				)?.textContent,
				podcastCover = (<HTMLImageElement>(
					document.querySelector("div.podcast-view__podcast-thumb > div > img")
				))?.srcset.match(new RegExp("(https.+[.](png|jpg)) 360w"))[1],
				podcastCoveralt = (<HTMLImageElement>(
					document.querySelector("div.podcast-episode-view__thumb > div > img")
				))?.src,
				playingPodcast = Array.from(
					document.querySelectorAll(".episode-card")
				).find(element => element.querySelector("button[aria-label=Pausar]"));
			if (document.location.pathname.includes("/episode/")) {
				const playingPodcastalt = Array.from(
					document.querySelectorAll(".podcast-episode-view__header")
				).find(element => element.querySelector("button[aria-label=Pausar]"));
				presenceData.details = `Vendo o episódio do podcast ${podcastTitlealt}`;
				presenceData.state = document.querySelector(
					"div.podcast-episode-view__header-info > h1"
				).textContent;
				presenceData.largeImageKey = podcastCoveralt;
				if (playingPodcastalt instanceof HTMLElement) {
					presenceData.largeImageKey = playingPodcastalt
						.querySelector<HTMLImageElement>("img")
						?.srcset.match(new RegExp("(https.+[.](png|jpg)) 360w"))[1];

					presenceData.details = podcastTitlealt;

					// Podcast name
					presenceData.state = document.querySelector(
						"div.podcast-episode-view__header-info > h1"
					).textContent;

					// Boolean if podcast is playing or paused
					const playing =
						playingPodcastalt.querySelector<HTMLButtonElement>(
							"button[aria-label=Pausar]"
						)?.style.display !== "none";

					delete presenceData.startTimestamp;

					if (playing) {
						const currentTime =
								playingPodcastalt.querySelector<HTMLSpanElement>(
									"[data-testid='current-time'"
								)?.textContent,
							totalTime = playingPodcastalt.querySelector<HTMLSpanElement>(
								"[data-testid='total-time'"
							)?.textContent;

						if (currentTime && totalTime) {
							presenceData.endTimestamp =
								Date.now() / 1000 -
								presence.timestampFromFormat(currentTime) +
								presence.timestampFromFormat(totalTime);
						}
					}

					presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause;
					presenceData.smallImageText = playing ? "Playing" : "Paused";
				}
			} else if (playingPodcast instanceof HTMLElement) {
				// Podcast image
				presenceData.largeImageKey = playingPodcast
					.querySelector<HTMLImageElement>("img")
					?.srcset.match(new RegExp("(https.+[.](png|jpg)) 360w"))[1];

				presenceData.details = podcastTitle;

				// Podcast name
				presenceData.state = playingPodcast.querySelector<HTMLHeadingElement>(
					".episode-card__headline"
				)?.textContent;

				// Boolean if podcast is playing or paused
				const playing =
					playingPodcast.querySelector<HTMLButtonElement>(
						"button[aria-label=Pausar]"
					)?.style.display !== "none";

				delete presenceData.startTimestamp;

				if (playing) {
					const currentTime = playingPodcast.querySelector<HTMLSpanElement>(
							"[data-testid='current-time'"
						)?.textContent,
						totalTime = playingPodcast.querySelector<HTMLSpanElement>(
							"[data-testid='total-time'"
						)?.textContent;

					if (currentTime && totalTime) {
						presenceData.endTimestamp =
							Date.now() / 1000 -
							presence.timestampFromFormat(currentTime) +
							presence.timestampFromFormat(totalTime);
					}
				}

				presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause;
				presenceData.smallImageText = playing ? "Playing" : "Paused";
			} else if (podcastTitle) {
				presenceData.details = "Vendo o podcast:";
				presenceData.state = podcastTitle;
				presenceData.largeImageKey = podcastCover;
			} else presenceData.details = "Podcasts";
		} else if (document.location.pathname.includes("/ao-vivo/")) {
			const programTitle = document.querySelector(
					"span.playkit-channels-navigation__program-name"
				),
				programMetadata = document.querySelector(
					"div.playkit-channels-navigation__program-metadata__text"
				);

			if (document.location.pathname.includes("/6120663/")) {
				presenceData.details = `TV Globo - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "tvglobo";
			} else if (document.location.pathname.includes("/7339131/")) {
				presenceData.details = `Multishow - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "multishow";
			} else if (document.location.pathname.includes("/7339101/")) {
				presenceData.details = `GloboNews - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "globonews";
			} else if (document.location.pathname.includes("/7339108/")) {
				presenceData.details = `sportv - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "sportv";
			} else if (document.location.pathname.includes("/7339117/")) {
				presenceData.details = `sportv2 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "sportv2";
			} else if (document.location.pathname.includes("/7339123/")) {
				presenceData.details = `sportv3 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "sportv3";
			} else if (document.location.pathname.includes("/7339128/")) {
				presenceData.details = `GNT - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "gnt";
			} else if (document.location.pathname.includes("/7339091/")) {
				presenceData.details = `Viva - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "viva";
			} else if (document.location.pathname.includes("/7339146/")) {
				presenceData.details = `Gloob - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "gloob";
			} else if (document.location.pathname.includes("/7339323/")) {
				presenceData.details = `Gloobinho - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "gloobinho";
			} else if (document.location.pathname.includes("/7339152/")) {
				presenceData.details = `Megapix - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "megapix";
			} else if (document.location.pathname.includes("/7339279/")) {
				presenceData.details = `Universal TV - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "universaltv";
			} else if (document.location.pathname.includes("/7339326/")) {
				presenceData.details = `Studio Universal - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "studiouniversal";
			} else if (document.location.pathname.includes("/7339224/")) {
				presenceData.details = `SYFY - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "syfy";
			} else if (document.location.pathname.includes("/7339060/")) {
				presenceData.details = `Canal Brasil - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "canalbrasil";
			} else if (document.location.pathname.includes("/7339078/")) {
				presenceData.details = `Canal OFF - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "canaloff";
			} else if (document.location.pathname.includes("/7339140/")) {
				presenceData.details = `BIS - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bis";
			} else if (document.location.pathname.includes("/7339135/")) {
				presenceData.details = `Modo Viagem - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "modoviagem";
			} else if (document.location.pathname.includes("/7420604/")) {
				presenceData.details = `Futura - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "futura";
			} else if (document.location.pathname.includes("/8223631/")) {
				presenceData.details = `Premiere - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "premiere";
			} else if (document.location.pathname.includes("/8221785/")) {
				presenceData.details = `Premiere 2 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "premiere";
			} else if (document.location.pathname.includes("/8221838/")) {
				presenceData.details = "Mosaico Premiere";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "premiere";
			} else if (document.location.pathname.includes("/8310612/")) {
				presenceData.details = `Combate - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "combate";
			} else if (document.location.pathname.includes("/10221110/")) {
				presenceData.details = `Telecine Premium - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "tcpremium";
			} else if (document.location.pathname.includes("/10221184/")) {
				presenceData.details = `Telecine Action - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "tcaction";
			} else if (document.location.pathname.includes("/10221239/")) {
				presenceData.details = `Telecine Touch - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "tctouch";
			} else if (document.location.pathname.includes("/10223522/")) {
				presenceData.details = `Telecine Fun - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "tcfun";
			} else if (document.location.pathname.includes("/10221225/")) {
				presenceData.details = `Telecine Pipoca - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "tcpipoca";
			} else if (document.location.pathname.includes("/10221109/")) {
				presenceData.details = `Telecine Cult - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "tccult";
			} else if (document.location.pathname.includes("/9182156/")) {
				presenceData.details = "CBN São Paulo";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "cbn";
			} else if (document.location.pathname.includes("/9182126/")) {
				presenceData.details = "CBN Rio de Janeiro";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "cbn";
			}
		} else if (document.location.pathname.includes("/canais/")) {
			if (document.location.pathname.includes("/globo/")) {
				presenceData.details = "TV Globo";
				presenceData.largeImageKey = "tvglobo";
			} else if (document.location.pathname.includes("/multishow/")) {
				presenceData.details = "Multishow";
				presenceData.largeImageKey = "multishow";
			} else if (document.location.pathname.includes("/globonews/")) {
				presenceData.details = "GloboNews";
				presenceData.largeImageKey = "globonews";
			} else if (document.location.pathname.includes("/sportv/")) {
				presenceData.details = "sportv";
				presenceData.largeImageKey = "sportv";
			} else if (document.location.pathname.includes("/gnt/")) {
				presenceData.details = "GNT";
				presenceData.largeImageKey = "gnt";
			} else if (document.location.pathname.includes("/viva/")) {
				presenceData.details = "Viva";
				presenceData.largeImageKey = "viva";
			} else if (document.location.pathname.includes("/gloob/")) {
				presenceData.details = "Gloob";
				presenceData.largeImageKey = "gloob";
			} else if (document.location.pathname.includes("/gloobinho/")) {
				presenceData.details = "Gloobinho";
				presenceData.largeImageKey = "gloobinho";
			} else if (document.location.pathname.includes("/megapix/")) {
				presenceData.details = "Megapix";
				presenceData.largeImageKey = "megapix";
			} else if (document.location.pathname.includes("/universal/")) {
				presenceData.details = "Universal+";
				presenceData.largeImageKey = "universalplus";
			} else if (document.location.pathname.includes("/canal-brasil/")) {
				presenceData.details = "Canal Brasil";
				presenceData.largeImageKey = "canalbrasil";
			} else if (document.location.pathname.includes("/canal-off/")) {
				presenceData.details = "Canal OFF";
				presenceData.largeImageKey = "canaloff";
			} else if (document.location.pathname.includes("/bis/")) {
				presenceData.details = "BIS";
				presenceData.largeImageKey = "bis";
			} else if (document.location.pathname.includes("/modo-viagem/")) {
				presenceData.details = "Modo Viagem";
				presenceData.largeImageKey = "modoviagem";
			} else if (document.location.pathname.includes("/futura/")) {
				presenceData.details = "Futura";
				presenceData.largeImageKey = "futura";
			} else if (document.location.pathname.includes("/premiere/")) {
				presenceData.details = "Premiere";
				presenceData.largeImageKey = "premiere";
			} else if (document.location.pathname.includes("/combate/")) {
				presenceData.details = "Combate";
				presenceData.largeImageKey = "combate";
			} else if (document.location.pathname.includes("/telecine/")) {
				presenceData.details = "Telecine";
				presenceData.largeImageKey = "telecine";
			} else if (document.location.pathname.includes("/starzplay/")) {
				presenceData.details = "STARZPLAY";
				presenceData.largeImageKey = "starzplay";
			} else presenceData.details = "Canais";
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
