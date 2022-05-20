const presence = new Presence({
		clientId: "969064871310282813",
		injectOnComplete: true
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo_1024",
			startTimestamp: browsingTimestamp
		},
		{ pathname } = window.location;
	switch (true) {
		case pathname === "/": {
			presenceData.details = "Browsing the homepage...";
			break;
		}
		case pathname === "/radio": {
			presenceData.details = "Looking through radio stations...";
			break;
		}
		case pathname.includes("/reciters"): {
			if (pathname.includes("/reciters/")) {
				presenceData.details = `Viewing a reciter: ${
					document.querySelector<HTMLDivElement>(
						"#__next > div > div.index_pageContainer__Pxtn3 > div.reciterPage_reciterInfoContainer__mYOjC > div > div > div:nth-child(2) > div.ReciterInfo_reciterName__SiK59"
					).textContent
				}`;
			} else presenceData.details = "Looking for a reciter";
			break;
		}
		case pathname === "/about-us": {
			presenceData.details = "Looking for info about Quran.com";
			break;
		}
		case pathname === "/apps": {
			presenceData.details = "Looking at Quran apps";
			break;
		}
		case pathname === "/developers": {
			presenceData.details = "Looking at the developers page";
			break;
		}
		case pathname === "/privacy": {
			presenceData.details = "Looking at Quran apps";
			break;
		}
		case pathname.includes("/product-updates"): {
			presenceData.details = "Looking at product updates";
			break;
		}
		case pathname === "/support": {
			presenceData.details = "Looking at the support page";
			break;
		}
		case pathname === "/search": {
			if (document.title.includes("Search for")) {
				presenceData.details = `Making a ${document.title
					.split("-")[0]
					.toLowerCase()}`;
			} else presenceData.details = "Searching for something...";
			break;
		}
		case pathname.includes("/juz/" || "/page/"): {
			presenceData.details = "Reading the Holy Quran";
			presenceData.state = `Surah: Surat ${
				document.querySelector<HTMLParagraphElement>(
					"#__next > div > div.ContextMenu_container__M7_N3.ContextMenu_visibleContainer__KnWDa.ContextMenu_expandedContainer__W_YZP > div > div:nth-child(1) > div > p"
				).textContent
			} (${
				document.querySelector<HTMLSpanElement>(
					"#__next > div > div.ContextMenu_container__M7_N3 > div > div:nth-child(2) > div > p:nth-child(2) > span"
				)
					? document.querySelector<HTMLSpanElement>(
							"#__next > div > div.ContextMenu_container__M7_N3 > div > div:nth-child(2) > div > p:nth-child(2) > span"
					  ).textContent
					: document.querySelector<HTMLSpanElement>(
							"#__next > div > div.ContextMenu_container__M7_N3 > div > div:nth-child(2) > div > p:nth-child(2) > span"
					  ).textContent
			})`;
			break;
		}
		default: {
			presenceData.details = "Reading the Holy Quran";
			presenceData.state = `Surah: Surat ${
				document.querySelector<HTMLParagraphElement>(
					"#__next > div > div.ContextMenu_container__M7_N3.ContextMenu_visibleContainer__KnWDa.ContextMenu_expandedContainer__W_YZP > div > div:nth-child(1) > div > p"
				).textContent
			} (${
				document.querySelector<HTMLSpanElement>(
					"#__next > div > div.ContextMenu_container__M7_N3 > div > div:nth-child(2) > div > p:nth-child(2) > span"
				)
					? document.querySelector<HTMLSpanElement>(
							"#__next > div > div.ContextMenu_container__M7_N3 > div > div:nth-child(2) > div > p:nth-child(2) > span"
					  ).textContent
					: document.querySelector<HTMLSpanElement>(
							"#__next > div > div.ContextMenu_container__M7_N3 > div > div:nth-child(2) > div > p:nth-child(2) > span"
					  ).textContent
			})`;
		}
	}
	presence.setActivity(presenceData);
});
