const presence = new Presence({
		clientId: "809093093600133165"
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
			buttonViewTikTok: "tiktok.buttonViewTikTok"
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "tiktok",
			startTimestamp: browsingTimestamp
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
		if (document.querySelector("#BreadcrumbList")) {
			presenceData.state = JSON.parse(
				document.querySelector("#BreadcrumbList").innerHTML
			).itemListElement[1].item.name.replace("| TikTok", "");
		} else {
			const id2 = document
				.querySelector(
					"#app > div.tiktok-ywuvyb-DivBodyContainer.etsvyce0 > div.tiktok-w4ewjk-DivShareLayoutV2.epodnl40 > div > div.tiktok-1g04lal-DivShareLayoutHeader-StyledDivShareLayoutHeaderV2.epodnl42 > div.tiktok-1gk89rh-DivShareInfo.e198b7gd2 > div.tiktok-1hdrv89-DivShareTitleContainer.e198b7gd3 > h2"
				)
				.textContent.trim();
			presenceData.state = `@(${id2}) ${
				JSON.parse(
					document
						.querySelector("#sigi-persisted-data")
						.innerHTML.slice(0, -486)
						.replace("window['SIGI_STATE']=", "")
				).UserModule.users[id2].nickname
			}`;
		}
		if (pageType === "video") {
			//Video
			const time = document
				.querySelector('[class*="-DivSeekBarTimeContainer"]')
				.innerHTML.split("/");

			delete presenceData.startTimestamp;
			presenceData.details =
				document.querySelector(".video-meta-title:nth-child(1)")
					?.firstElementChild?.textContent ??
				document.querySelector(".tt-video-meta-caption")?.firstElementChild
					?.textContent;
			presenceData.smallImageKey = document.querySelector(
				"#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-7t2h2f-DivBrowserModeContainer.e1xqvjno0 > div.tiktok-5uccoo-DivVideoContainer.e1xqvjno27 > svg.tiktok-i8t918-SvgPlayIcon.e1xqvjno10"
			)
				? "pause"
				: "play";
			if (
				!document.querySelector(
					"#app > div.tiktok-19fglm-DivBodyContainer.etsvyce0 > div.tiktok-7t2h2f-DivBrowserModeContainer.e1xqvjno0 > div.tiktok-5uccoo-DivVideoContainer.e1xqvjno27 > svg.tiktok-i8t918-SvgPlayIcon.e1xqvjno10"
				)
			) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					presence.timestampFromFormat(time[0]),
					presence.timestampFromFormat(time[1])
				);
			}
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
			//Live
			delete presenceData.startTimestamp;
			presenceData.details = document.querySelector(".live-title")?.textContent;
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
	}

	const buttons = await presence.getSetting<boolean>("buttons");
	if (!buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
