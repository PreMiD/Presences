const presence = new Presence({
		clientId: "393887855274885121",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/EOjQZQe.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "lexx.app": {
			if (document.location.pathname === "/")
				presenceData.details = "Viewing the homepage";
			else if (document.location.pathname.includes("/legal")) {
				presenceData.details = "Viewing the legal notice";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/privacy")) {
				presenceData.details = "Viewing the privacy policy";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/premium")) {
				presenceData.details = "Reading about premium";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/login")) {
				presenceData.details = "Logging in";
				presenceData.smallImageKey = Assets.Writing;
			} else if (document.location.pathname.endsWith("/events")) {
				presenceData.details = "Editing some events";
				presenceData.smallImageKey = Assets.Writing;
			} else if (
				!document.location.pathname.endsWith("/events") &&
				document.location.pathname.includes("/")
			) {
				presenceData.details = "Viewing the dashboard";
				presenceData.smallImageKey = Assets.Writing;
			} else if (document.location.pathname !== "/")
				presenceData.details = "Viewing the homepage";

			break;
		}
		case "beta.lexx.app": {
			presenceData.details = "Viewing the beta page";
			break;
		}
		case "alpha.lexx.app": {
			presenceData.details = "Viewing the alpha page";
			break;
		}
		case "dev.lexx.app": {
			presenceData.details = "Viewing the development page";
			break;
		}
		case "status.lexx.app":
			{
				presenceData.details = "Viewing the status page";
				// No default
			}
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
