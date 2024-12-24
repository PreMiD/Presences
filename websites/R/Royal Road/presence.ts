const presence = new Presence({
		clientId: "1320791530956652544",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://www.royalroad.com/icons/android-chrome-192x192.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			home: "general.viewHome",
			search: "general.searchFor",
			browse: "general.browsing",
			buttonViewPage: "general.buttonViewPage",
			reading: "general.reading",
			chapter: "general.chapter",
			buttonViewProfile: "general.buttonViewProfile",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		details: "Unsupported page.",
	};
	const { href, pathname } = document.location,
		[showTimestamp, showButtons, newLang, privacy] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
		]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}

	const pages: Record<string, PresenceData> = {
		"/home": {
			details: strings.home,
			buttons: [{ label: strings.buttonViewPage, url: href }],
		},
		"/premium": {
			details: "Viewing Premium Plans",
			buttons: [{ label: strings.buttonViewPage, url: href }],
		},
	};

	for (const [path, data] of Object.entries(pages))
		if (pathname.includes(path)) presenceData = { ...presenceData, ...data };

	if (pathname.includes("/chapter")) {
		presenceData.details = `${
			document.querySelector("h2.font-white")?.textContent
		} by ${document.querySelector("h3.font-white")?.textContent}`;
		presenceData.state = document.querySelector("h1.font-white")?.textContent;
		presenceData.largeImageKey = document
			.querySelector("img.img-offset")
			?.getAttribute("src");
		presenceData.smallImageText = `Reading ${
			document
				.querySelector("a.btn.btn-primary.col-xs-12")
				?.getAttribute("disabled")
				? `${strings.chapter} 1`
				: ""
		}`;
		presenceData.smallImageKey = Assets.Reading;
		presenceData.buttons = [
			{
				label: "Read",
				url: href,
			},
		];
	} else if (pathname.includes("/fiction")) {
		presenceData.details = `${
			document.querySelector("h1.font-white")?.textContent
		} ${document.querySelector("h4.font-white")?.textContent}`;
		presenceData.state = document.querySelector(
			"span.label.label-default.pull-right"
		)?.textContent;
		presenceData.largeImageKey = document
			.querySelector("img.thumbnail")
			?.getAttribute("src");
		presenceData.smallImageText = "Viewing on Royal Road";
		presenceData.smallImageKey = Assets.Logo;
		presenceData.buttons = [
			{
				label: "Start reading",
				url: `https://royalroad.com${document
					.querySelector("a.btn.btn-lg.btn-primary")
					?.getAttribute("href")}`,
			},
		];
	} else if (pathname.includes("/profile")) {
		const stats = document.querySelectorAll("span.stat-value");

		presenceData.details = document.querySelector("h1")?.textContent;
		presenceData.state = `${stats[0]?.textContent} Followers · ${stats[2]?.textContent} Fictions`;
		presenceData.largeImageKey = document
			.querySelector("img.img-circle")
			?.getAttribute("src");
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = "Viewing on Royal Road";
		presenceData.buttons = [
			{
				label: "View Profile",
				url: href,
			},
		];
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
