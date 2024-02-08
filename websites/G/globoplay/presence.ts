const presence = new Presence({
		clientId: "641394369651277834",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, title: HTMLElement | string, search: HTMLInputElement;

const enum Assets {
	Vcall = "https://cdn.discordapp.com/app-assets/641394369651277834/641394528837959727.png?size=512",
	Logo = "https://cdn.rcd.gg/PreMiD/websites/G/globoplay/assets/logo.png",
	Gnt = "https://cdn.discordapp.com/app-assets/641394369651277834/793543099400847361.png?size=512",
	Viva = "https://cdn.discordapp.com/app-assets/641394369651277834/793543711757434892.png?size=512",
	Gloobinho = "https://cdn.discordapp.com/app-assets/641394369651277834/793545427349143574.png?size=512",
	Megapix = "https://cdn.discordapp.com/app-assets/641394369651277834/793545840136159242.png?size=512",
	Universalplus = "https://cdn.discordapp.com/app-assets/641394369651277834/793546120101363733.png?size=512",
	Universaltv = "https://cdn.discordapp.com/app-assets/641394369651277834/793546121505931284.png?size=512",
	Syfy = "https://cdn.discordapp.com/app-assets/641394369651277834/793547388059910186.png?size=512",
	Studiouniversal = "https://cdn.discordapp.com/app-assets/641394369651277834/793547388349710347.png?size=512",
	Bis = "https://cdn.discordapp.com/app-assets/641394369651277834/793553133966983199.png?size=512",
	Canalbrasil = "https://cdn.discordapp.com/app-assets/641394369651277834/793553134432550944.png?size=512",
	Canaloff = "https://cdn.discordapp.com/app-assets/641394369651277834/793553136823959553.png?size=512",
	Maisnatela = "https://cdn.discordapp.com/app-assets/641394369651277834/793555271418118154.png?size=512",
	Combate = "https://cdn.discordapp.com/app-assets/641394369651277834/793561113601507328.png?size=512",
	Cbn = "https://cdn.discordapp.com/app-assets/641394369651277834/803160858138116110.png?size=512",
	Bbb = "https://cdn.discordapp.com/app-assets/641394369651277834/803165029582766090.png?size=512",
	Modoviagem = "https://cdn.discordapp.com/app-assets/641394369651277834/952328269464752128.png?size=512",
	TVGlobo = "https://cdn.discordapp.com/app-assets/641394369651277834/952328273566785636.png?size=512",
	Sportv2 = "https://cdn.discordapp.com/app-assets/641394369651277834/952345725495304212.png?size=512",
	Sportv = "https://cdn.discordapp.com/app-assets/641394369651277834/952345725579198494.png?size=512",
	Sportv3 = "https://cdn.discordapp.com/app-assets/641394369651277834/952345725595955220.png?size=512",
	Telecine = "https://cdn.discordapp.com/app-assets/641394369651277834/952414319893700618.png?size=512",
	Tcpremium = "https://cdn.discordapp.com/app-assets/641394369651277834/952414758655643649.png?size=512",
	Tcaction = "https://cdn.discordapp.com/app-assets/641394369651277834/952414909893840976.png?size=512",
	Tctouch = "https://cdn.discordapp.com/app-assets/641394369651277834/952415042765221968.png?size=512",
	Tcfun = "https://cdn.discordapp.com/app-assets/641394369651277834/952415186306863144.png?size=512",
	Tcpipoca = "https://cdn.discordapp.com/app-assets/641394369651277834/952415278564786179.png?size=512",
	Tccult = "https://cdn.discordapp.com/app-assets/641394369651277834/952415335510851655.png?size=512",
	Starzplay = "https://cdn.discordapp.com/app-assets/641394369651277834/1006442205981966357.png?size=512",
	Gloob = "https://cdn.discordapp.com/app-assets/641394369651277834/1006462003243667536.png?size=512",
	Futura = "https://cdn.discordapp.com/app-assets/641394369651277834/1006462473383182336.png?size=512",
	Multishow = "https://cdn.discordapp.com/app-assets/641394369651277834/1007529565914157186.png?size=512",
	Globonews = "https://cdn.discordapp.com/app-assets/641394369651277834/1008674475111366728.png?size=512",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
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
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.TVGlobo;
			} else if (document.location.pathname.includes("/7339131/")) {
				presenceData.details = `Multishow - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Multishow;
			} else if (document.location.pathname.includes("/7339101/")) {
				presenceData.details = `GloboNews - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Globonews;
			} else if (document.location.pathname.includes("/7339108/")) {
				presenceData.details = `sportv - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Sportv;
			} else if (document.location.pathname.includes("/7339117/")) {
				presenceData.details = `sportv2 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Sportv2;
			} else if (document.location.pathname.includes("/7339123/")) {
				presenceData.details = `sportv3 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Sportv3;
			} else if (document.location.pathname.includes("/7339128/")) {
				presenceData.details = `GNT - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Gnt;
			} else if (document.location.pathname.includes("/7339091/")) {
				presenceData.details = `Viva - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Viva;
			} else if (document.location.pathname.includes("/7339146/")) {
				presenceData.details = `Gloob - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Gloob;
			} else if (document.location.pathname.includes("/7339323/")) {
				presenceData.details = `Gloobinho - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Gloobinho;
			} else if (document.location.pathname.includes("/7339152/")) {
				presenceData.details = `Megapix - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Megapix;
			} else if (document.location.pathname.includes("/7339279/")) {
				presenceData.details = `Universal TV - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Universalplus;
			} else if (document.location.pathname.includes("/7339326/")) {
				presenceData.details = `Studio Universal - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Studiouniversal;
			} else if (document.location.pathname.includes("/7339224/")) {
				presenceData.details = `SYFY - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Syfy;
			} else if (document.location.pathname.includes("/7339060/")) {
				presenceData.details = `Canal Brasil - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Canalbrasil;
			} else if (document.location.pathname.includes("/7339078/")) {
				presenceData.details = `Canal OFF - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Canaloff;
			} else if (document.location.pathname.includes("/7339140/")) {
				presenceData.details = `BIS - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Bis;
			} else if (document.location.pathname.includes("/7339135/")) {
				presenceData.details = `Modo Viagem - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Modoviagem;
			} else if (document.location.pathname.includes("/7420604/")) {
				presenceData.details = `Futura - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Futura;
			} else if (document.location.pathname.includes("/8223631/")) {
				presenceData.details = `Premiere - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Premiere;
			} else if (document.location.pathname.includes("/8221785/")) {
				presenceData.details = `Premiere 2 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Premiere;
			} else if (document.location.pathname.includes("/8221838/")) {
				presenceData.details = "Mosaico Premiere";
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Premiere;
			} else if (document.location.pathname.includes("/8310612/")) {
				presenceData.details = `Combate - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Combate;
			} else if (document.location.pathname.includes("/10221110/")) {
				presenceData.details = `Telecine Premium - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Tcpremium;
			} else if (document.location.pathname.includes("/10221184/")) {
				presenceData.details = `Telecine Action - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Tcaction;
			} else if (document.location.pathname.includes("/10221239/")) {
				presenceData.details = `Telecine Touch - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Tctouch;
			} else if (document.location.pathname.includes("/10223522/")) {
				presenceData.details = `Telecine Fun - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Tcfun;
			} else if (document.location.pathname.includes("/10221225/")) {
				presenceData.details = `Telecine Pipoca - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Tcpipoca;
			} else if (document.location.pathname.includes("/10221109/")) {
				presenceData.details = `Telecine Cult - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Tccult;
			} else if (document.location.pathname.includes("/9182156/")) {
				presenceData.details = "CBN São Paulo";
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Cbn;
			} else if (document.location.pathname.includes("/9182126/")) {
				presenceData.details = "CBN Rio de Janeiro";
				presenceData.smallImageKey = Assets.Live;
				presenceData.largeImageKey = Assets.Cbn;
			}
		} else if (document.location.pathname.includes("/canais/")) {
			if (document.location.pathname.includes("/globo/")) {
				presenceData.details = "TV Globo";
				presenceData.largeImageKey = Assets.TVGlobo;
			} else if (document.location.pathname.includes("/multishow/")) {
				presenceData.details = "Multishow";
				presenceData.largeImageKey = Assets.Multishow;
			} else if (document.location.pathname.includes("/globonews/")) {
				presenceData.details = "GloboNews";
				presenceData.largeImageKey = Assets.Globonews;
			} else if (document.location.pathname.includes("/sportv/")) {
				presenceData.details = "sportv";
				presenceData.largeImageKey = Assets.Sportv;
			} else if (document.location.pathname.includes("/gnt/")) {
				presenceData.details = "GNT";
				presenceData.largeImageKey = Assets.Gnt;
			} else if (document.location.pathname.includes("/viva/")) {
				presenceData.details = "Viva";
				presenceData.largeImageKey = Assets.Viva;
			} else if (document.location.pathname.includes("/gloob/")) {
				presenceData.details = "Gloob";
				presenceData.largeImageKey = Assets.Gloob;
			} else if (document.location.pathname.includes("/gloobinho/")) {
				presenceData.details = "Gloobinho";
				presenceData.largeImageKey = Assets.Gloobinho;
			} else if (document.location.pathname.includes("/megapix/")) {
				presenceData.details = "Megapix";
				presenceData.largeImageKey = Assets.Megapix;
			} else if (document.location.pathname.includes("/universal/")) {
				presenceData.details = "Universal+";
				presenceData.largeImageKey = Assets.Universalplus;
			} else if (document.location.pathname.includes("/canal-brasil/")) {
				presenceData.details = "Canal Brasil";
				presenceData.largeImageKey = Assets.Canalbrasil;
			} else if (document.location.pathname.includes("/canal-off/")) {
				presenceData.details = "Canal OFF";
				presenceData.largeImageKey = Assets.Canaloff;
			} else if (document.location.pathname.includes("/bis/")) {
				presenceData.details = "BIS";
				presenceData.largeImageKey = Assets.Bis;
			} else if (document.location.pathname.includes("/modo-viagem/")) {
				presenceData.details = "Modo Viagem";
				presenceData.largeImageKey = Assets.Modoviagem;
			} else if (document.location.pathname.includes("/futura/")) {
				presenceData.details = "Futura";
				presenceData.largeImageKey = Assets.Futura;
			} else if (document.location.pathname.includes("/premiere/")) {
				presenceData.details = Assets.Premiere;
				presenceData.largeImageKey = Assets.Premiere;
			} else if (document.location.pathname.includes("/combate/")) {
				presenceData.details = "Combate";
				presenceData.largeImageKey = Assets.Combate;
			} else if (document.location.pathname.includes("/telecine/")) {
				presenceData.details = "Telecine";
				presenceData.largeImageKey = Assets.Telecine;
			} else if (document.location.pathname.includes("/starzplay/")) {
				presenceData.details = "STARZPLAY";
				presenceData.largeImageKey = Assets.Starzplay;
			} else presenceData.details = "Canais";
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
