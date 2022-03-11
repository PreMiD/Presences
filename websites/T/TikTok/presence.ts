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
		[, page, pageType] = location.pathname.split("/"),
		[buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers")
		]);
	strings ??= await newStrings;
	if (oldLang !== newLang) oldLang = newLang;

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
			presenceData.state = `${
				document.querySelector("[data-e2e=video-author-nickname]")
					?.childNodes[0]?.textContent ??
				document.querySelector("[data-e2e=browse-nickname]")?.textContent ??
				document.querySelector("[data-e2e=browser-nickname]")?.firstChild
					?.textContent
			}
		(@${
			document.querySelector("[data-e2e=video-author-uniqueid]")?.textContent ??
			document.querySelector("[data-e2e=browse-username]")?.textContent ??
			document.querySelector("[data-e2e=browser-username]")?.firstChild
				?.textContent
		})`;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			if (covers) {
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(
						"[data-e2e=browse-user-avatar] img[class*=-ImgAvatar]"
					)?.src ?? "tiktok";
			}
			if (!video.paused)
				presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
			presenceData.buttons = [
				{
					label: strings.buttonViewTikTok,
					url: `https://www.tiktok.com${document.URL.split("#")[1]}/`
				},
				{
					label: strings.buttonViewProfile,
					url: document.URL.split("?")[0]
				}
			];
		} else if (pageType === "live") {
			delete presenceData.startTimestamp;
			presenceData.details = document.querySelector(
				"[data-e2e=user-profile-live-title]"
			)?.textContent;
			presenceData.state = `${
				document.querySelector("[data-e2e=user-profile-nickname]").childNodes[0]
					.textContent
			}
		(@${document.querySelector("[data-e2e=user-profile-uid]").textContent})`;
			presenceData.smallImageKey = "live";
			if (covers) {
				presenceData.largeImageKey =
					document
						.querySelector("[data-e2e=user-profile-avatar-link]")
						?.firstElementChild.getAttribute("src") ??
					document
						.querySelector(
							"#tiktok-live-main-container-id > div.tiktok-1fxlgrb-DivBodyContainer.etwpsg30 > div.tiktok-5xcfjj-DivLiveContentContainer.etwpsg32 > div > div.tiktok-1se8o6v-DivLiveContent.e14c6d571 > div.tiktok-lm0twc-DivLiveRoomBanner.e10bhxlw0 > div.tiktok-1s7wqxh-DivUserHoverProfileContainer.e19m376d0 > div.tiktok-h3dty0-DivUserProfile.e1571njr0 > a > img"
						)
						.getAttribute("src") ??
					"tiktok";
			}

			presenceData.buttons = [
				{
					label: strings.buttonViewTikTok,
					url: `https://www.tiktok.com${document.URL.split("#")[1]}/`
				},
				{
					label: strings.buttonViewProfile,
					url: document.URL.split("?")[0]
				}
			];
		} else {
			presenceData.details = strings.viewProfile;
			presenceData.state = `@${
				document.querySelector("[data-e2e=user-title]").textContent
			} (${document.querySelector("[data-e2e=user-subtitle]").textContent})`;
			if (covers) {
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					'meta[property="og:image"]'
				).content;
			}
			presenceData.buttons = [
				{
					label: strings.buttonViewProfile,
					url: document.URL.split("?")[0]
				}
			];
		}
	} else if (page === "following") {
		const [detail, state] = strings.following.split("{0}");

		presenceData.details = detail;
		presenceData.state = state;
		presenceData.smallImageText = strings.browse;
		presenceData.smallImageKey = "reading";
	} else if (page.includes("live")) {
		presenceData.details = document.querySelector(
			"[data-e2e=broadcast-title]"
		).textContent;
		presenceData.state = `@${
			document.querySelector("[data-e2e=anchor-nickname]").textContent
		}`;
		if (covers) {
			presenceData.largeImageKey =
				document
					.querySelector(
						"#tiktok-live-main-container-id > div.tiktok-1fxlgrb-DivBodyContainer.etwpsg30 > div.tiktok-5xcfjj-DivLiveContentContainer.etwpsg32 > div > div.tiktok-1vf24df-DivHotLiveContainer.ekpqugh2 > div > div.tiktok-ua4rq8-DivHotLiveMain.endcr5w3 > div > div > div > div.tiktok-1oa0qzn-DivProfileBanner.ep811by4 > div.tiktok-18wa6pm-DivProfileContainer.ep811by5 > div > img"
					)
					.getAttribute("src") ?? "tiktok";
		}
	}
	if (!buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
