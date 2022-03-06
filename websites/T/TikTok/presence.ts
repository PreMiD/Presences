const presence = new Presence({
		clientId: "809093093600133165"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let oldLang: string;
async function getStrings() {
	oldLang = await presence.getSetting<string>("lang").catch(() => "en");
	return presence.getStrings(
		{
			browse: "general.browsing",
			forYou: "tiktok.forYou",
			following: "tiktok.following",
			buttonViewProfile: "general.buttonViewProfile",
			viewProfile: "general.viewProfile",
			viewTikTok: "tiktok.viewing",
			buttonViewTikTok: "tiktok.buttonViewTikTok"
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
const newStrings = getStrings();
let strings: Awaited<typeof newStrings>;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "tiktok",
			startTimestamp: browsingTimestamp
		},
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		[, page, pageType] = location.pathname.split("/");
	strings ??= await newStrings;
	if (oldLang !== newLang) {
		oldLang = newLang;
	}

	if (!page || page === "foryou") {
		const [detail, state] = strings.forYou.split("{0}");

		presenceData.details = detail;
		presenceData.state = state;
	} else if (page.startsWith("@")) {
		if (pageType === "video") {
			const video = document.querySelector<HTMLVideoElement>("video");

			delete presenceData.startTimestamp;
			presenceData.details =
				document.querySelector("[data-e2e=video-desc]")?.textContent ??
				document.querySelector("[data-e2e=browse-video-desc]").textContent;
			presenceData.state = `@${
				document.querySelector("[data-e2e=video-author-uniqueid]")
					?.textContent ??
				document.querySelector("[data-e2e=browse-username]")?.textContent
			}
			(${
				document.querySelector("[data-e2e=video-author-nickname]")
					?.childNodes[0]?.textContent ??
				document.querySelector("[data-e2e=browse-nickname]")?.textContent
			})`;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.largeImageKey = document
				.querySelector(
					"#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-yp78ys-DivMainContainer.erck9ax0 > div:nth-child(1) > div:nth-child(1) > a > div > span > img"
				)
				?.getAttribute("src");
			if (!video.paused)
				presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
			presenceData.buttons = [
				{
					label: (await strings).buttonViewTikTok,
					url: `https://www.tiktok.com${document.URL.split("#")[1]}/`
				},
				{
					label: (await strings).buttonViewProfile,
					url: document.URL.split("?")[0]
				}
			];
		} else if (pageType === "live") {
			delete presenceData.startTimestamp;
			presenceData.details = document.querySelector(
				"[data-e2e=user-profile-live-title]"
			)?.textContent;
			presenceData.state = `@${
				document.querySelector("[data-e2e=user-profile-uid]").textContent
			}
			(${
				document.querySelector("[data-e2e=user-profile-nickname]").childNodes[0]
					.textContent
			})`;
			presenceData.smallImageKey = "live";

			presenceData.buttons = [
				{
					label: (await strings).buttonViewTikTok,
					url: `https://www.tiktok.com${document.URL.split("#")[1]}/`
				},
				{
					label: (await strings).buttonViewProfile,
					url: document.URL.split("?")[0]
				}
			];
		} else {
			presenceData.details = await strings.viewProfile;
			presenceData.state = `@${
				document.querySelector("[data-e2e=user-title]").textContent
			} (${document.querySelector("[data-e2e=user-subtitle]").textContent})`;

			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				'meta[property="og:image"]'
			).content;
			presenceData.buttons = [
				{
					label: (await strings).buttonViewProfile,
					url: document.URL.split("?")[0]
				}
			];
		}
	} else if (page === "following") {
		const [detail, state] = (await strings).following.split("{0}");

		presenceData.details = detail;
		presenceData.state = state;
		presenceData.smallImageText = (await strings).browse;
		presenceData.smallImageKey = "reading";
	} else if (page.includes("live")) {
		presenceData.details = document.querySelector(
			"[data-e2e=broadcast-title]"
		).textContent;
		presenceData.state = `@${
			document.querySelector("[data-e2e=anchor-nickname]").textContent
		}`;
	}

	const buttons = await presence.getSetting<boolean>("buttons");
	if (!buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
