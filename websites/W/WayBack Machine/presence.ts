const presence = new Presence({
		clientId: "941298758598164481",
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
			largeImageKey: "https://i.imgur.com/cjnISR9.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		split = pathname.split("/")[2],
		search = document.querySelector<HTMLInputElement>(
			"#react-wayback-search > div.search-toolbar > div.search-text-container > form > div > div > input.rbt-input-main.form-control.rbt-input"
		),
		buttons = await presence.getSetting<boolean>("buttons");

	switch (pathname.split("/")[1]) {
		case "": {
			if (!search?.value) presenceData.details = "Viewing the home page";
			else {
				presenceData.details = "Searching for";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			}
			break;
		}
		case "web": {
			if (
				document.querySelector('[class="search-size"]') ||
				document.querySelector('[class="captures-range-info"]')
			) {
				// if calendar or results
				presenceData.details = "Viewing results for";
				presenceData.state =
					document.querySelector('[class="snippet"]')?.textContent ??
					document
						.querySelector('[title*="Calendar of "]')
						.getAttribute("title")
						.replace("Calendar of ", "")
						.split("/")[2];
			} else {
				// if on site
				presenceData.largeImageKey =
					document.querySelector<HTMLMetaElement>('[property="og:image"]')
						?.content ?? "https://i.imgur.com/cjnISR9.png";
				presenceData.details = document.location.pathname
					.split("/")[5]
					.replace("www.", "");
				presenceData.state = `${split.substring(6, 8)}/${split.substring(
					4,
					6
				)}/${split.substring(0, 4)} ${split.substring(8, 10)}:${split.substring(
					10,
					12
				)}:${split.substring(12, 14)}`;
			}
			presenceData.buttons = [
				{
					label: "View Page",
					url: href,
				},
			];
			break;
		}
		case "details": {
			presenceData.details = "Viewing results for";
			presenceData.state = document
				.querySelector('[class="result-headline text-center"]')
				?.textContent.slice(4);
			presenceData.buttons = [
				{
					label: "View Page",
					url: href,
				},
			];
			break;
		}
	}

	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
