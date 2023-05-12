const presence = new Presence({
		clientId: "809093093600133165",
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

async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			forYou: "tiktok.forYou",
			following: "tiktok.following",
			buttonViewProfile: "general.buttonViewProfile",
			viewProfile: "general.viewProfile",
			viewTikTok: "tiktok.viewing",
			buttonViewTikTok: "tiktok.buttonViewTikTok",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/KBAjCOX.png",
			startTimestamp: browsingTimestamp,
		},
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		[, page, pageType] = location.pathname.split("/");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (!page || page === "foryou") {
		const [detail, state] = (await strings).forYou.split("{0}");

		presenceData.details = detail;
		presenceData.state = state;
	} else if (page.startsWith("@")) {
		//User

		if (pageType === "video") {
			//Video

			const video = document.querySelector<HTMLVideoElement>(".video-player");

			delete presenceData.startTimestamp;
			presenceData.details =
				document.querySelector(".video-meta-title:nth-child(1)")
					?.firstElementChild?.textContent ??
				document.querySelector(".tt-video-meta-caption")?.firstElementChild
					?.textContent;
			presenceData.state = `@${
				document.querySelector(".user-username")?.textContent ??
				document.querySelector(".author-uniqueId")?.textContent
			}`;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			if (!video.paused)
				[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
			presenceData.buttons = [
				{
					label: (await strings).buttonViewTikTok,
					url: `https://www.tiktok.com${document.URL.split("#")[1]}/`,
				},
				{
					label: (await strings).buttonViewProfile,
					url: document.URL.split("?")[0],
				},
			];
		} else if (pageType === "live") {
			//Live
			delete presenceData.startTimestamp;
			presenceData.details = document.querySelector(".live-title")?.textContent;
			presenceData.state = `@${
				document.querySelector(".user-uniqueId")?.textContent
			}`;
			presenceData.smallImageKey = "live";

			presenceData.buttons = [
				{
					label: (await strings).buttonViewTikTok,
					url: `https://www.tiktok.com${document.URL.split("#")[1]}/`,
				},
				{
					label: (await strings).buttonViewProfile,
					url: document.URL.split("?")[0],
				},
			];
		} else {
			presenceData.details = (await strings).viewProfile;
			presenceData.state = `${
				document.querySelector('h2[data-e2e="user-title"]').textContent
			} (@${
				document.querySelector('h1[data-e2e="user-subtitle"]').textContent
			})`;
			presenceData.buttons = [
				{
					label: (await strings).buttonViewProfile,
					url: document.URL.split("?")[0],
				},
			];
		}
	} else if (page === "following") {
		const [detail, state] = (await strings).following.split("{0}");

		presenceData.details = detail;
		presenceData.state = state;
		presenceData.smallImageText = (await strings).browse;
		presenceData.smallImageKey = Assets.Reading;
	}

	const buttons = await presence.getSetting<boolean>("buttons");
	if (!buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
