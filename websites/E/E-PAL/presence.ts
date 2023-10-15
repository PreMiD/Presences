const presence = new Presence({
	clientId: "1160565099883397211",
});

const enum Assets {
	Likes = "https://i.imgur.com/79hLcdj.png",
	Logo = "https://i.imgur.com/1Ugsu4o.png",
	Loading = "https://i.imgur.com/uh6vSQm.gif",
}
const timestampCheck: {
		hash: string;
		timestamp: number;
	} = {
		hash: "",
		timestamp: Math.floor(Date.now() / 1000),
	},
	staticPages: Record<string, PresenceData> = {
		"/": { details: "Viewing the homepage" },
		"/login": { details: "Login page" },
		"/signup": { details: "Sign up page" },
		"/help/report": { details: "Viewing the report page" },
		"/help": { details: "Viewing the help center" },
		"/wallet": { details: "Viewing their wallet" },
		"/pet": { details: "Spending time with their pet" },
		"/becomeepal": {
			details: "Reading about becoming an e-pal",
			smallImageKey: Assets.Reading,
		},
	};

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: timestampCheck.timestamp,
	};
	const { href, pathname } = document.location,
		pathSplit = pathname.split("/"),
		epalName = document.querySelector('[class*="epal-name"]')?.textContent,
		epalAvatar = document
			.querySelector('[class="h-full w-full flex justify-center flex-col"]')
			?.querySelector('[class="epal-avatar-image-loader"]')
			?.querySelector("img")
			?.getAttribute("src")
			.replace(/_256/gm, "_512"),
		extraDrawer = document.querySelector(
			'[class="ant-drawer-content-wrapper"]'
		),
		activeTab =
			document.querySelector('[class*="ant-tabs-tab ant-tabs-tab-active"]')
				?.textContent ??
			document.querySelector('[class*="tab-active"]')?.textContent,
		drawerTitle =
			document.querySelector('[class="ant-drawer-title"]')?.textContent ??
			document
				.querySelectorAll('[class="epal-menu"]')
				[
					Number(
						document.querySelectorAll('[class="epal-menu"]')?.length ?? 1
					) - 1
				]?.querySelector('[class*="on"]')?.textContent,
		hash: string = href;
	if (timestampCheck.hash !== hash) {
		timestampCheck.hash = hash;
		timestampCheck.timestamp = Math.floor(Date.now() / 1000);
	}
	switch (true) {
		case document.readyState !== "complete": {
			presenceData.details = "Loading";
			presenceData.smallImageKey = Assets.Loading;
			break;
		}
		case !!extraDrawer && extraDrawer.innerHTML.includes("Message"): {
			presenceData.details = "Reading messages";
			presenceData.smallImageKey = Assets.Reading;
			break;
		}
		case !!extraDrawer && !!drawerTitle: {
			const antTitle = document
				.querySelector('[class="ant-drawer-content"]')
				.querySelector('[class*="txt-title-l"]')?.textContent;
			presenceData.details =
				activeTab && !antTitle
					? `${drawerTitle} - ${activeTab}`
					: `${drawerTitle}`;
			presenceData.state =
				antTitle && activeTab ? `${antTitle} - ${activeTab}` : "";
			break;
		}

		case pathname.includes("/epal/"): {
			const servicesSelected =
					document
						.querySelector('[class*="bg-surface-element-normal"]')
						?.querySelector('[class="txt-title-s mb-1"]')?.textContent ??
					document.querySelector('[class="PhotoView-PhotoSlider__Counter"]')
						?.textContent ??
					document.querySelectorAll('[class*="ant-tabs-tab-active"]')?.[1]
						?.textContent,
				audio = document
					.querySelector('[class*="servicesInfo"]')
					?.querySelector<HTMLAudioElement>("audio");
			if (!epalName) {
				presenceData.details = "Loading";
				presenceData.smallImageKey = Assets.Loading;
			} else {
				presenceData.details = epalName;

				presenceData.state = servicesSelected
					? `${activeTab} - ${servicesSelected}`
					: activeTab;

				presenceData.largeImageKey = epalAvatar ?? Assets.Logo;

				presenceData.smallImageKey =
					document
						.querySelector('[class*="bg-surface-element-normal"]')
						?.querySelector("img")
						?.getAttribute("src") ?? "";

				if (audio && !audio.paused) {
					[, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(audio);
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = "Listening to audio";
				}
			}
			presenceData.buttons = [{ label: "View E-Pal", url: href }];
			break;
		}
		case pathname.includes("/topic/"): {
			presenceData.details = `Viewing ${epalName}'s post`;
			presenceData.smallImageKey = epalAvatar ?? Assets.Logo;
			presenceData.buttons = [{ label: "View Post", url: href }];
			break;
		}
		case pathname.includes("/foryou"): {
			presenceData.details = "Reading about";
			presenceData.state = document.querySelector(
				'div[class*="text-txt-primary-normal"]'
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
			break;
		}
		case pathname.includes("/trade/"): {
			presenceData.details = "Viewing an order";
			presenceData.state = `From - ${
				document.querySelector('[class*="txt-title-s"]')?.textContent
			}`;
			presenceData.largeImageKey =
				document
					.querySelector('[class="flex items-center flex-1 min-w-0"]')
					?.querySelector("img")
					?.getAttribute("src")
					?.split("?")[0] ?? Assets.Logo;
			presenceData.smallImageKey =
				document
					.querySelector('[class="w-24"]')
					.querySelector("img")
					?.getAttribute("src") ?? "";
			presenceData.buttons = [{ label: "View E-Pal", url: href }];
			break;
		}
		case pathname.includes("/trade"): {
			presenceData.details = `Viewing ${
				document
					.querySelector(
						'[class="epal-menu-item bg-surface-element-normal rounded-m"]'
					)
					?.textContent?.toLowerCase() ?? "all"
			} orders`;

			break;
		}
		case pathname.includes("/epals/"): {
			if (pathSplit[2]) {
				const filters = document.querySelectorAll(
						'[class*="epal-chip-active"]'
					),
					afilters = [];
				for (const [, element] of filters.entries()) {
					if (!element.textContent.includes("filters"))
						afilters.push(element.textContent);
				}
				presenceData.details = `${
					document.querySelector('[class="txt-headline-l"]')?.textContent ??
					pathSplit[2]
				} E-Pals`;
				presenceData.state =
					afilters.length === 1
						? afilters[0]
						: afilters.length > 1
						? afilters.toString().replace(/,/gm, ", ")
						: "";
			}
			break;
		}
		case pathname.includes("/faq"): {
			presenceData.details = "Reading FAQ";
			presenceData.state = document.querySelector(
				'[class*="txt-title-l"]'
			)?.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.buttons = [{ label: "Read FAQ", url: href }];
			break;
		}
		case pathname.includes("/coupon/"): {
			presenceData.details = `Viewing their ${
				document
					.querySelector(
						'[class="epal-menu-item bg-surface-element-normal rounded-m"]'
					)
					?.textContent?.toLowerCase() ?? "all"
			} coupons`;
			break;
		}

		default: {
			if (Object.keys(staticPages).includes(pathname))
				presenceData = { ...presenceData, ...staticPages[pathname] };
			else presenceData.details = "Unknown page.";
		}
	}

	if (presenceData.smallImageKey === "") delete presenceData.smallImageKey;
	presence.setActivity(presenceData);
});
