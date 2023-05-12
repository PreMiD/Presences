const presence = new Presence({
		clientId: "809067572061405246",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			names: "namemc.upcomingNames",
			skinsFeatured: "namemc.skinsTrending",
			skinsTop: "namemc.skinsTop",
			skinsNew: "namemc.skinsNew",
			skinsRandom: "namemc.skinsRandom",
			skinsTagged: "namemc.skinsTagged",
			skinsTag: "namemc.skinsTag",
			capes: "namemc.capes",
			viewCape: "namemc.viewCape",
			servers: "namemc.servers",
			viewServer: "namemc.viewServer",
			claim: "namemc.claim",
			profileEdit: "namemc.profileEdit",
			viewFriends: "namemc.viewFriends",
			viewSkins: "namemc.viewSkins",
			viewEmoji: "namemc.viewEmojis",
			viewProfile: "general.viewProfile",
			viewing: "general.viewing",
			privacy: "general.privacy",
			search: "general.searchFor",
			buttonViewServer: "namemc.buttonViewServer",
			buttonViewProfile: "general.buttonViewProfile",
			viewSkin: "namemc.viewSkin",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		buttons = await presence.getSetting<boolean>("buttons");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/9JDmZaF.png",
		startTimestamp: browsingTimestamp,
	};

	const statics: {
		[name: string]: PresenceData;
	} = {
		"/": {
			details: strings.browse,
		},
		"/minecraft-names/": {
			details: strings.names,
		},
		"/minecraft-skins/": {
			details: strings.skinsFeatured,
		},
		"/minecraft-skins/top/": {
			details: strings.skinsTop,
		},
		"/minecraft-skins/new/": {
			details: strings.skinsNew,
		},
		"/minecraft-skins/random/": {
			details: strings.skinsRandom,
		},
		"/minecraft-skins/tag/": {
			details: strings.skinsTagged,
		},
		"/minecraft-skins/tag/(\\w*)/": {
			details: strings.skinsTag.replace(
				"{0}",
				document
					.querySelector("body > main > h1")
					?.textContent.replace(
						document.querySelector("body > main > h1 > small")?.textContent,
						""
					)
					.trim()
			),
		},
		"/capes/": {
			details: strings.capes,
		},
		"/cape/": {
			details: strings.viewCape,
			state: `${
				document
					.querySelector(".default-skin main.container h1")
					?.textContent.split("\n")[1]
			} Cape`,
		},
		"/minecraft-servers/": {
			details: strings.servers,
		},
		"/server/": {
			details: strings.viewServer,
			state: document.querySelector(
				"body > main > div.row.no-gutters.align-items-center > div.col > h1"
			)?.textContent,
			buttons: [
				{
					label: strings.buttonViewServer,
					url: document.URL,
				},
			],
		},
		"/claim-your-profile/": {
			details: strings.claim,
		},
		"/my-profile/": {
			details: strings.profileEdit.split("{0}")[0],
			state: strings.profileEdit.split("{0}")[1],
		},
		"/my-profile/friends/": {
			details: strings.viewFriends,
		},
		"/my-profile/skins/": {
			details: strings.viewSkins,
		},
		"/my-profile/emoji/": {
			details: strings.viewEmoji,
		},
		"/profile/": {
			details: strings.viewProfile,
			state: document.querySelector("body > main > h1")?.textContent,
			buttons: [
				{
					label: strings.buttonViewProfile,
					url: document.URL,
				},
			],
		},
		"/privacy/": {
			details: strings.viewing,
			state: strings.privacy,
		},
		"/search/": {
			details: strings.search,
			state: document.querySelector(
				"#status-bar > div > div > div.col-lg-7 > h1 > samp"
			)?.textContent,
			smallImageKey: "search",
		},
		"/skin/": {
			details: strings.viewSkin,
		},
	};

	for (const [k, v] of Object.entries(statics)) {
		if (
			location.href
				.replace(/\/?$/, "/")
				.replace(`https://${location.hostname}`, "")
				.replace("?", "/")
				.match(k)
		) {
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = strings.browse;
			presenceData = { ...presenceData, ...v };
		}
	}

	if (!buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
