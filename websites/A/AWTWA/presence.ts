const presence = new Presence({
	clientId: "1249362206072635483",
});

const enum Assets {
	Logo = "awtwa_logo",
}

let iFrameData = {
	currentTime: -1,
	duration: -1,
	paused: true,
};

const animeBrowsingTimestamp = Math.floor(Date.now() / 1000),
	presenceStrings = {
		home: "Se balade sur la page d'accueil",
		browsing: "Utilise son haki de l'observation sur le catalogue",
		branding: "Tous vos animes gratuits et en haute qualité sur AWTWA.site",
		websiteName: "AWTWA.site",
		onPage: "En train de regarder ",
		watchOn: "Regarder sur AWTWA.site",
	};

presence.on(
	"iFrameData",
	(data: { currentTime: number; duration: number; paused: boolean }) => {
		iFrameData = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {},
		{ pathname, href } = document.location;

	if (pathname === "/") {
		presenceData.details = presenceStrings.home;
		presenceData.state = presenceStrings.branding;
		presenceData.smallImageText = presenceStrings.websiteName;
		presenceData.largeImageKey = Assets.Logo;
		presenceData.smallImageKey = Assets.Viewing;
	} else if (pathname === "/catalog") {
		presenceData.details = presenceStrings.browsing;
		presenceData.state = presenceStrings.branding;
		presenceData.smallImageText = presenceStrings.websiteName;
		presenceData.largeImageKey = Assets.Logo;
		presenceData.smallImageKey = Assets.Search;
		presenceData.startTimestamp = animeBrowsingTimestamp;
	} else if (pathname.includes("/animes")) {
		const poster = document
				.querySelector("div[role='img']")
				?.getAttribute("style")
				.split("url(")[1]
				.split(")")[0]
				.replace(/['"]/g, ""),
			isPrivacyMode = await presence.getSetting("privacy");

		if (isPrivacyMode) {
			presenceData.details = `${presenceStrings.onPage}un anime`;
			presenceData.state = presenceStrings.branding;
			presenceData.smallImageText = presenceStrings.watchOn;
			presenceData.largeImageKey = Assets.Logo;
			presenceData.smallImageKey = Assets.Play;
		} else {
			presenceData.details =
				presenceStrings.onPage + document.querySelector("h1")?.textContent;
			presenceData.state = `Saison ${
				(document.querySelector("#season") as HTMLSelectElement).value
			} - Épisode ${
				(document.querySelector("#episode") as HTMLSelectElement).value
			}`;
			presenceData.smallImageText = presenceStrings.watchOn;
			presenceData.largeImageKey = poster;
			presenceData.smallImageKey = Assets.Play;

			presenceData.details =
				presenceStrings.onPage + document.querySelector("h1")?.textContent;
			presenceData.state = `Saison ${
				(document.querySelector("#season") as HTMLSelectElement).value
			} - Épisode ${
				(document.querySelector("#episode") as HTMLSelectElement).value
			}`;
			presenceData.smallImageText = presenceStrings.watchOn;
			presenceData.largeImageKey = poster;
			presenceData.smallImageKey = Assets.Play;

			if (!iFrameData?.paused) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					iFrameData.currentTime,
					iFrameData.duration
				);
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "En train de regarder";
			} else {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = "En pause";
				delete presenceData.endTimestamp;
			}

			presenceData.buttons = [
				{
					label: presenceStrings.watchOn,
					url: href,
				},
			];
		}
	}

	presenceData.type = ActivityType.Watching;
	presence.setActivity(presenceData);
});
