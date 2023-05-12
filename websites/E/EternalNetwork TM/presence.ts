const presence = new Presence({
		clientId: "440182142694064129",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	getStrings = async () => {
		return presence.getStrings(
			{
				buttonViewPage: "general.buttonViewPage",
				listeningMusic: "general.listeningMusic",
				readingPost: "general.readingPost",
				viewPage: "general.viewPage",
				viewUser: "general.viewUser",
				watchingVid: "general.watchingVid",
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	};

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

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const newLang: string = await presence
			.getSetting<string>("lang")
			.catch(() => "en"),
		showTimestamps = await presence.getSetting<boolean>("timestamp"),
		showSubdomain = await presence.getSetting<boolean>("subdomain"),
		bigicon = await presence.getSetting<number>("bigicon"),
		buttons = await presence.getSetting<boolean>("buttons"),
		{ hostname, pathname, search, hash } = document.location,
		etrnl = "eternalnetworktm.com",
		etrnltm = "etrnltm.com",
		ttl = document.title;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const presenceData: PresenceData = {
		details: (await strings).viewPage,
		largeImageKey:
			[
				"eternalnetworktm_logo",
				"eternalnetworktm_logo_2",
				"eternalnetworktm_logo_3",
			][bigicon] || "eternalnetworktm_logo",
		smallImageText: hostname + pathname,
		startTimestamp: browsingTimestamp,
		buttons: [
			{
				label: (await strings).buttonViewPage,
				url: window.location.href,
			},
		],
	};

	if (!showTimestamps) delete presenceData.startTimestamp;

	switch (hostname) {
		case etrnl:
		case `www.${etrnl}`: {
			presenceData.smallImageKey = "eternalnetworktm_logo";

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (pathname.includes("/wp-admin")) {
				presenceData.state = "Viewing the Admin panel";
				delete presenceData.smallImageText;
				delete presenceData.buttons;
			}

			break;
		}
		case `forum.${etrnl}`:
		case `www.forum.${etrnl}`: {
			presenceData.smallImageKey = "eternalnetworktm_logo_v2";

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (pathname.includes("/memberlist.php"))
				presenceData.state = "Viewing Forum Members";

			if (search.includes("?mode=team"))
				presenceData.state = "Viewing Forum Staff";

			if (pathname.includes("/partner"))
				presenceData.state = "Viewing Forum Partners";

			if (pathname.includes("/donation"))
				presenceData.state = "Viewing the donations page";

			if (pathname.includes("/imageupload"))
				presenceData.state = "Uploading images!";

			if (pathname.includes("/video"))
				presenceData.state = "Viewing Forum Videos";

			if (search.includes("?mode=view&id=")) {
				presenceData.details = `${(await strings).watchingVid}:`;
				presenceData.state = document.querySelector("h3.first > a").textContent;
				presenceData.buttons = [
					{
						label: (await strings).buttonViewPage,
						url: window.location.href,
					},
					{
						label: document
							.querySelector("div.postbody > div > a > span")
							.getAttribute("title"),
						url: document.querySelector("#video_title").getAttribute("value"),
					},
				];
			}

			if (pathname.includes("/viewtopic.php")) {
				presenceData.details = (await strings).readingPost;
				presenceData.state = ttl;
			}

			if (pathname.includes("/posting.php")) {
				presenceData.details = "Writing a post";
				presenceData.state = ttl;
			}

			if (pathname.includes("/adm/")) {
				presenceData.state = "Viewing the Admin panel";
				delete presenceData.smallImageText;
				delete presenceData.buttons;
			}

			break;
		}
		case `radio.${etrnl}`:
		case `www.radio.${etrnl}`: {
			presenceData.smallImageKey = "eternalradio_logo";
			presenceData.details = (await strings).listeningMusic;

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (hash.includes("page_ABOUT"))
				presenceData.state = "Viewing About Page";

			if (hash.includes("page_PROGRAMS"))
				presenceData.state = "Viewing radio program";

			if (hash.includes("page_REQUEST"))
				presenceData.state = "Requesting a song";

			if (hash.includes("page_CONTACTS"))
				presenceData.state = "Viewing contact page";

			break;
		}
		case `status.${etrnl}`:
		case `www.status.${etrnl}`: {
			presenceData.smallImageKey = "eternalnetworktm_status";

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (pathname.includes("/admin")) {
				presenceData.state = "Adding new incident";
				presenceData.smallImageText = "Admin Panel";
				delete presenceData.buttons;
			}

			if (search.includes("?do=settings"))
				presenceData.state = "Adding new service";
			delete presenceData.buttons;

			break;
		}
		case `et-log.${etrnl}`:
		case `www.et-log.${etrnl}`: {
			presenceData.smallImageKey = "eternallogistic_logo";

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (pathname.includes("/about.php")) {
				presenceData.details = "Viewing about page";
				presenceData.state = ttl;
			}

			if (pathname.includes("/gallery.php")) {
				presenceData.details = "Viewing gallery";
				presenceData.state = ttl;
			}

			if (pathname.includes("/applications.php")) {
				presenceData.details = "Applying for the VTC";
				presenceData.state = ttl;
			}

			break;
		}
		case `dev.${etrnl}`:
		case `www.dev.${etrnl}`: {
			presenceData.smallImageKey = "eternalnetworktm_dev";

			if (pathname.includes("/etlog")) {
				presenceData.state = "Working on ET-LOG system";
				presenceData.smallImageText = "Updating the website";
				delete presenceData.buttons;
			}

			if (pathname.includes("/radio")) {
				presenceData.state = "Working on radio page";
				presenceData.smallImageText = "Updating the website";
				delete presenceData.buttons;
			}

			break;
		}
		case `shortener.${etrnltm}`:
		case `www.shortener.${etrnltm}`: {
			presenceData.smallImageKey = "eternalshortener_logo";

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (pathname.includes("/home")) {
				presenceData.state = ttl;
				presenceData.smallImageText = "Adding a new shortened url";
				delete presenceData.buttons;
			}

			if (pathname.includes("/profile")) {
				presenceData.state = "Viewing profile";
				presenceData.smallImageText = "User profile";
				delete presenceData.buttons;
			}

			if (pathname.includes("/dashboard")) {
				presenceData.state = "Checking URLs statistics";
				presenceData.smallImageText = "Dashboard";
				delete presenceData.buttons;
			}

			if (pathname.includes("/admin")) {
				presenceData.state = "Viewing the Admin panel";
				delete presenceData.smallImageText;
				delete presenceData.buttons;
			}

			break;
		}
		// No default
	}

	if (!buttons) delete presenceData.buttons;

	if (!showSubdomain) {
		delete presenceData.smallImageKey;
		delete presenceData.smallImageText;
	}
	presence.setActivity(presenceData);
});
