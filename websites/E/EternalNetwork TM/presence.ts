const presence = new Presence({
		clientId: "440182142694064129",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
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
				presenceData.state = "Using administrating power over the website !";
				presenceData.smallImageText = "Admin Panel";
				delete presenceData.buttons;
			}

			break;
		}
		case `forum.${etrnl}`:
		case `www.forum.${etrnl}`: {
			presenceData.smallImageKey = "eternalnetworktm_logo_v2";

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (pathname.includes("/memberlist.php"))
				presenceData.state = "Sneaking into member list !";

			if (search.includes("?mode=team"))
				presenceData.state = "Checking out team list !";

			if (pathname.includes("/partner"))
				presenceData.state = "Cheking our partners !";

			if (pathname.includes("/donation"))
				presenceData.state = "Trying to make donation for the forum !";

			if (pathname.includes("/imageupload"))
				presenceData.state = "Uploading images!";

			if (pathname.includes("/video"))
				presenceData.state = "Checking video gallery";

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
				presenceData.details = "Making a new post";
				presenceData.state = ttl;
			}

			if (pathname.includes("/adm/")) {
				presenceData.state = "Using administrating power over the forum !";
				presenceData.smallImageText = "Admin Panel";
				delete presenceData.buttons;
			}

			break;
		}
		case `radio.${etrnl}`:
		case `www.radio.${etrnl}`: {
			presenceData.smallImageKey = "eternalradio_logo";
			presenceData.details = (await strings).listeningMusic;

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (hash.includes("page_ABOUT")) presenceData.state = "About info page !";

			if (hash.includes("page_PROGRAMS"))
				presenceData.state = "Checking radio program !";

			if (hash.includes("page_REQUEST"))
				presenceData.state = "Requesting a song !";

			if (hash.includes("page_CONTACTS"))
				presenceData.state = "Contact us page !";

			break;
		}
		case `status.${etrnl}`:
		case `www.status.${etrnl}`: {
			presenceData.smallImageKey = "eternalnetworktm_status";

			if (pathname.startsWith("/")) presenceData.state = ttl;

			if (pathname.includes("/admin")) {
				presenceData.state = "Adding new incident 😥 !";
				presenceData.smallImageText = "Admin Panel";
				delete presenceData.buttons;
			}

			if (search.includes("?do=settings"))
				presenceData.state = "Adding new service !";
			delete presenceData.buttons;

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
