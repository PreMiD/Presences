const presence = new Presence({
		clientId: "656574682916585473",
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

function decodeReq(entity: Element): string {
	const txt = document.createElement("textarea");
	txt.textContent = entity.textContent;
	return txt.textContent;
}

let title;

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/ba5AI1b.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname.startsWith("/search/")) {
		presenceData.details = "Searching for:";
		[, presenceData.state] = document.location.href.split("?q=");
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("/archive/")) {
		presenceData.details = "Viewing an archive for:";
		title = document.querySelector(
			"body > div.container.px-3.px-md-0 > nav > ol > li.breadcrumb-item.active > a"
		);
		presenceData.state = decodeReq(title);
	} else if (document.location.pathname.includes("/news/")) {
		presenceData.details = "Viewing a status overview for:";
		title = document.querySelector(
			"body > div.container.px-3.px-md-0 > nav > ol > li:nth-child(2) > a"
		);
		presenceData.state = decodeReq(title);
	} else if (document.location.pathname.includes("/map/")) {
		presenceData.details = "Viewing outage map for:";
		[title] = document.title.split("outage");
		presenceData.state = title;
	} else if (document.location.pathname.includes("/status/")) {
		presenceData.details = "Viewing a status for:";
		title = document.querySelector(
			"body > div.container.px-3.px-md-0 > div.mx-auto > nav > ol > li.breadcrumb-item.active"
		);
		presenceData.state = decodeReq(title);
	} else if (document.location.pathname.includes("/companies/")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Companies";
	} else if (document.location.pathname.includes("/privacy")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Privacy Policy";
	} else if (document.location.pathname.includes("/terms-of-use")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Terms of Use";
	} else if (document.location.pathname.includes("/accessibility")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Accessibility Statement";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
