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

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

const enum Assets {
	EternalradioLogo = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/0.png",
	EternalcraftSmp = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/1.png",
	EternalnetworktmLogo = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/2.png",
	EternalnetworktmStatus = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/3.png",
	EternalnetworktmLogo2 = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/4.png",
	EternalnetworktmLogo3 = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/5.png",
	EternallogisticLogo = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/6.png",
	EternalshortenerLogo = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/7.png",
	EternalnetworktmDev = "https://cdn.rcd.gg/PreMiD/websites/E/EternalNetwork%20TM/assets/8.png",
}

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
		details: strings.viewPage,
		largeImageKey:
			[
				Assets.EternalnetworktmLogo,
				Assets.EternalnetworktmLogo2,
				Assets.EternalnetworktmLogo3,
			][bigicon] || Assets.EternalnetworktmLogo,
		smallImageText: hostname + pathname,
		startTimestamp: browsingTimestamp,
		buttons: [
			{
				label: strings.buttonViewPage,
				url: window.location.href,
			},
		],
	};

	if (!showTimestamps) delete presenceData.startTimestamp;

	switch (hostname) {
		case etrnl:
		case `www.${etrnl}`: {
			presenceData.smallImageKey = Assets.EternalnetworktmLogo;

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
			presenceData.smallImageKey = Assets.EternalnetworktmLogo2;

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
				presenceData.details = `${strings.watchingVid}:`;
				presenceData.state = document.querySelector("h3.first > a").textContent;
				presenceData.buttons = [
					{
						label: strings.buttonViewPage,
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
				presenceData.details = strings.readingPost;
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
			presenceData.smallImageKey = Assets.EternalradioLogo;
			presenceData.details = strings.listeningMusic;

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
			presenceData.smallImageKey = Assets.EternalnetworktmStatus;

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
			presenceData.smallImageKey = Assets.EternallogisticLogo;
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
			presenceData.smallImageKey = Assets.EternalnetworktmDev;

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
			presenceData.smallImageKey = Assets.EternalshortenerLogo;

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
