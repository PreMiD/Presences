const presence = new Presence({
		clientId: "808758769424138252",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/AnimationDigitalNetwork/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video.vjs-tech"),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		{ pathname, href } = document.location,
		buttons = await presence.getSetting<boolean>("buttons"),
		episode = JSON.parse(
			document.querySelector('[type="application/ld+json"]')?.textContent
		);

	if (pathname?.includes("video") && video) {
		presenceData.largeImageKey =
			document
				.querySelector<HTMLMetaElement>('meta[property="og:image"]')
				?.content?.replace(/\/web\/.*/, "/web/affiche_370x0.jpg") ?? "logo";

		if (!isNaN(video.duration)) {
			presenceData.details = episode.partOfSeries.name;
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(video);

			presenceData.buttons = [
				{
					label: "Watch Episode",
					url: href,
				},
			];

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			presenceData.details = "Looking at";
			presenceData.state = episode?.partOfSeries?.name ?? "An episode";

			presenceData.buttons = [
				{
					label: "View Page",
					url: href,
				},
			];
		}
	} else if (pathname?.includes("video") && !video) {
		presenceData.largeImageKey =
			document.querySelector<HTMLMetaElement>('meta[property="og:image"]')
				?.content ?? Assets.Logo;
		if (
			document
				.querySelector("div.sc-AxjAm.khAjwj.sc-psDXd.iazofB")
				?.querySelector("span")
		)
			presenceData.details = "Browsing...";
		else {
			const title = document
				.querySelector<HTMLMetaElement>('[property="og:title"]')
				?.content?.split("-");
			presenceData.state = `Looking at ${
				episode?.partOfSeries?.name ?? pathname?.includes("episode-")
					? pathname
							?.match(/episode-[0-9]*/gm)?.[0]
							?.replace("episode-", "episode ")
					: "An episode"
			}`;
			presenceData.details =
				title?.length > 5 ? `${title?.[0]} - ${title?.[1]}` : title?.[0];

			presenceData.buttons = [
				{
					label: "View Page",
					url: href,
				},
			];
		}
	} else presenceData.details = "Browsing...";

	if (presenceData.buttons && !buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
