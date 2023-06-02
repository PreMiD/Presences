const presence = new Presence({
		clientId: "809093093600133165",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/T/TikTok/assets/logo.png",
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
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
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
