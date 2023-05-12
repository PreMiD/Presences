const presence = new Presence({
		clientId: "812413011502825504",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/LSOqk1G.png",
			startTimestamp: browsingTimestamp,
		},
		search = document.querySelector<HTMLInputElement>(
			'[data-testid="searchInput"]'
		),
		{ href, pathname } = window.location,
		[privacy, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		check = document.querySelector(
			'[class="NavItemstyle__ItemStyle-sc-1v7l1xb-1 hEDlux"]'
		),
		title =
			document.querySelector('[data-testid="videoMetaDataTitle"]')
				?.textContent ??
			document.querySelector<HTMLMetaElement>('[name="og:title"]')?.content,
		video = document.querySelector("video");
	if (privacy) presenceData.details = "Browsing...";
	else if (search?.value) {
		presenceData.details = "Zoekt naar";
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
	} else {
		switch (pathname.split("/")[1]) {
			case "": {
				presenceData.details = "Bekijkt de home pagina";
				break;
			}
			case "films": {
				if (check?.textContent === "Films") {
					presenceData.details = "Bekijkt alle films";
					presenceData.buttons = [
						{
							label: "Bekijk Alle Films",
							url: href,
						},
					];
				} else {
					delete presenceData.startTimestamp;

					presenceData.buttons = [
						{
							label: "Bekijk Film",
							url: href,
						},
					];
					if (!video) {
						presenceData.largeImageKey = document
							.querySelector('[data-testid="imageMediaComponent"]')
							?.getAttribute("src");
						presenceData.details = "Bekijkt";
						presenceData.state = title;
					} else {
						presenceData.largeImageKey =
							document.querySelector<HTMLMetaElement>(
								'[name="og:image"]'
							).content;
						if (!video.paused) {
							[, presenceData.endTimestamp] =
								presence.getTimestampsfromMedia(video);
							presenceData.smallImageKey = Assets.Play;
						} else presenceData.smallImageKey = Assets.Pause;
						if (
							!document
								.querySelector('[class="jw-text jw-reset-text jw-text-alt"]')
								?.textContent.includes("Adv.")
						)
							presenceData.details = title;
						else presenceData.details = "Advertenties";
					}
				}
				break;
			}
			case "programmas": {
				if (
					check?.textContent === "Programma's" ||
					check?.textContent === "Gemist"
				) {
					if (check?.textContent.includes("Gemist"))
						presenceData.details = "Bekijkt alle gemiste programma's";
					else presenceData.details = `Bekijkt alle ${check?.textContent}`;
					presenceData.buttons = [
						{
							label: "Bekijk Programma's",
							url: href,
						},
					];
				} else {
					delete presenceData.startTimestamp;

					presenceData.buttons = [
						{
							label: "Bekijk Programma",
							url: href,
						},
					];
					if (!video) {
						presenceData.largeImageKey = document
							.querySelector('[data-testid="imageMediaComponent"]')
							?.getAttribute("src");
						presenceData.details = "Bekijkt";
						presenceData.state = title;
					} else {
						presenceData.largeImageKey =
							document.querySelector<HTMLMetaElement>(
								'[name="og:image"]'
							).content;
						if (!video.paused) {
							[, presenceData.endTimestamp] =
								presence.getTimestampsfromMedia(video);
							presenceData.smallImageKey = Assets.Play;
						} else presenceData.smallImageKey = Assets.Pause;
						if (
							!document
								.querySelector('[class="jw-text jw-reset-text jw-text-alt"]')
								?.textContent.includes("Adv.")
						)
							presenceData.details = title;
						else presenceData.details = "Advertenties";
					}
				}
				break;
			}
			case "fragmenten": {
				presenceData.details = "Bekijkt alle fragmenten";
				presenceData.buttons = [
					{
						label: "Bekijk Alle Fragmenten",
						url: href,
					},
				];
				break;
			}
			default: {
				presenceData.details = `Bekijkt ${pathname.split("/")[1]}`;
				break;
			}
		}
	}

	if (!covers) presenceData.largeImageKey = "https://i.imgur.com/LSOqk1G.png";
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
