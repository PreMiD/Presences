const presence = new Presence({
		clientId: "1034382710589898882",
	}),
	browingTimestamp = Math.floor(Date.now() / 1000);
async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			paused: "general.paused",
			browse: "general.browsing",
			buttonWatchVideo: "general.buttonWatchVideo",
			viewCategory: "general.viewCategory",
			search: "general.searchFor",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
enum Assets {
	Logo = "https://i.imgur.com/BQ1MBwk.png",
	Play = "https://i.imgur.com/OLaz6JN.png",
	Paused = "https://i.imgur.com/4iyMINk.png",
	Search = "https://i.imgur.com/oGQtnIY.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browingTimestamp,
		},
		video = document.querySelector<HTMLVideoElement>("video"),
		search = document.querySelector<HTMLInputElement>('input[type="text"]'),
		{ pathname, href } = document.location,
		[newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		titleSplit = document
			.querySelector('[property="og:title"]')
			?.getAttribute("content")
			?.split("|");
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	if (search?.value) {
		presenceData.details = strings.search;
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.SearchImage;
	} else if (video && !isNaN(video.duration)) {
		presenceData.details = titleSplit[1];
		presenceData.state = titleSplit[0];
		delete presenceData.startTimestamp;
		presenceData.smallImageKey = video.paused ? Assets.Paused : Assets.Play;
		presenceData.smallImageText = video.paused ? strings.paused : strings.play;
		[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
		presenceData.buttons = [
			{
				label: strings.buttonWatchVideo,
				url: href,
			},
		];
		if (video.paused) delete presenceData.endTimestamp;
	} else if (
		pathname === "" ||
		pathname ===
			`/${document
				.querySelector("[data-language]")
				.getAttribute("data-language")}` ||
		pathname ===
			`/${document
				.querySelector("[data-language]")
				.getAttribute("data-language")}/`
	) {
		presenceData.details = `Homepage - ${
			document.querySelector('[aria-current="true"]')?.textContent
		}`;
	} else {
		switch (pathname.split("/")[2]) {
			case "show": {
				presenceData.details = "Viewing show";
				presenceData.state = titleSplit[0];
				presenceData.largeImageKey =
					document
						.querySelector('[id="show-page-title"]')
						?.firstElementChild?.getAttribute("src") ?? Assets.Logo;
				presenceData.buttons = [
					{
						label: "View Show",
						url: href,
					},
				];
				break;
			}
			case "browse": {
				const category = document.querySelectorAll('[aria-checked="true"]');
				presenceData.details = strings.browse;
				presenceData.state = `${
					category[1]?.textContent === ""
						? href.split("?network=")[1].toUpperCase()
						: category[1]?.textContent
				} Shows - Sorted by ${category[2]?.textContent}`;
				break;
			}
			case "sports": {
				presenceData.details = strings.browse;
				presenceData.state = `Sports - ${
					document.querySelector('[aria-current="true"]')?.textContent
				}`;
				break;
			}
			case "epg": {
				presenceData.details = `Viewing schedule for ${
					document.querySelector('[data-testid="epgDayButtonActive visible"]')
						?.textContent
				}`;
				presenceData.buttons = [
					{
						label: "View Schedule",
						url: href,
					},
				];
				break;
			}
			case "my-list": {
				presenceData.details = "Viewing my list";
				break;
			}
			default: {
				presenceData.details = strings.browse;
				break;
			}
		}
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (!covers && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
