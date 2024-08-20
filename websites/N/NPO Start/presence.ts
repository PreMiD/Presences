const presence = new Presence({
		clientId: "1246364211328581654",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/N/NPO%20Start/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		path = pathname.replace("/start", ""),
		[privacy, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		search = document.querySelector<HTMLInputElement>(
			'[data-testid="txt-input"]'
		),
		video = document.querySelector<HTMLVideoElement>("video");

	switch (true) {
		case !!video && !!video.currentTime: {
			const titel = document
				.querySelector('[data-testid="player-info"]')
				.querySelector("span")
				?.textContent?.replace(/•/gm, " • ");
			delete presenceData.startTimestamp;
			presenceData.details = privacy
				? "Bekijkt een video"
				: document.querySelector('[data-testid="txt-header"]')?.textContent;
			presenceData.state = !document.querySelector('[data-testid="lst-nicam"]') // Extra symbolen, waardoor eindigt met " • "
				? titel
				: titel.slice(0, -3);
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("li.active,img")?.src ??
				Assets.Logo;
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.buttons = [{ label: "Bekijk Video", url: href }];

			if (!video.paused)
				[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);

			break;
		}
		case !!search?.value: {
			presenceData.details = privacy
				? "Is ergens naar aan het zoeken"
				: "Zoekt naar:";
			presenceData.state = search?.value;
			presenceData.smallImageKey = Assets.Search;
			break;
		}
		case path.includes("/categorie/"): {
			switch (true) {
				case path.includes("/programmas"): {
					presenceData.details = "Bekijkt alle programma's";
					presenceData.buttons = [
						{ label: "Bekijk Alle Programm's", url: href },
					];
					break;
				}
				case path.includes("/series"): {
					presenceData.details = "Bekijkt alle series";
					presenceData.buttons = [{ label: "Bekijk Alle Series", url: href }];
					break;
				}
				case path.includes("/documentaires"): {
					presenceData.details = "Bekijkt alle documentaires";
					presenceData.buttons = [
						{ label: "Bekijk Alle Documentaires", url: href },
					];
					break;
				}
				case path.includes("/films"): {
					presenceData.details = "Bekijkt alle films";
					presenceData.buttons = [{ label: "Bekijk Alle Films", url: href }];
					break;
				}
			}
			break;
		}
		case path === "": {
			presenceData.details = "Bekijkt de homepagina";
			break;
		}
		case path.includes("/omroep/"): {
			presenceData.details = privacy
				? "Bekijkt alle content van een omproep"
				: `Bekijkt alle content van ${path.split("/")[2]}`;
			presenceData.buttons = [{ label: "Bekijk Al Hun Content", url: href }];
			break;
		}
		case path.includes("/collectie"): {
			presenceData.details = privacy
				? "Bekijkt alle content in een collectie"
				: "Bekijkt alle content in collectie";
			presenceData.state = document.querySelector(
				'[data-testid="txt-header"]'
			)?.textContent;
			presenceData.buttons = [
				{ label: "Bekijk Content In Collectie", url: href },
			];
			break;
		}
		case path.includes("/ontdek"): {
			presenceData.details = "Is content aan het ontdekken";
			break;
		}
		case path.includes("/video"):
		case path.includes("/serie"): {
			const type =
					document
						.querySelector('[id="__NEXT_DATA__"]')
						?.textContent?.includes("Film") ?? "serie"
						? "film"
						: "serie",
				season = document
					.querySelector('[data-npo-tag-click*="season-actionsheet"]')
					?.querySelector("span")?.textContent,
				titel = document.querySelector(
					'[data-testid="txt-header"]'
				)?.textContent;
			presenceData.details = privacy
				? `Bekijkt een ${type}`
				: `Bekijkt ${type}`;
			presenceData.state = season
				? `${titel} - ${season}` // Serie - Seizoen
				: titel; // Serie
			presenceData.largeImageKey =
				document.querySelector<HTMLMetaElement>('[property="og:image"]')
					?.content ?? Assets.Logo;
			presenceData.buttons = [{ label: "Bekijk Content", url: href }];
		}
	}

	if (privacy && presenceData.state) delete presenceData.state;
	if ((!buttons || privacy) && presenceData.buttons)
		delete presenceData.buttons;
	if ((!covers || privacy) && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (privacy && presenceData.smallImageKey) delete presenceData.smallImageKey;
	presence.setActivity(presenceData);
});
