const presence = new Presence({
		clientId: "908758869470216203",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			state: "All shots",
			largeImageKey: "https://i.imgur.com/lZ0G2SL.png",
			startTimestamp: browsingTimestamp,
		},
		shotsTypes = (type: string) => {
			if (document.location.pathname.includes("/animation"))
				presenceData.state = `${type} Shots - Animation`;
			else if (document.location.pathname.includes("/branding"))
				presenceData.state = `${type} Shots - Branding`;
			else if (document.location.pathname.includes("/illustration"))
				presenceData.state = `${type} Shots - Illustration`;
			else if (document.location.pathname.includes("/mobile"))
				presenceData.state = `${type} Shots - Mobile`;
			else if (document.location.pathname.includes("/print"))
				presenceData.state = `${type} Shots - Print`;
			else if (document.location.pathname.includes("/product-design"))
				presenceData.state = `${type} Shots - Product Design`;
			else if (document.location.pathname.includes("/typography"))
				presenceData.state = `${type} Shots - Typography`;
			else if (document.location.pathname.includes("/web-design"))
				presenceData.state = `${type} Shots - Web Design`;
			else presenceData.state = `All ${type} Shots`;
		},
		search = (type: string) => {
			presenceData.details = `Search : "${
				document.querySelector(
					"body > div#wrap > div.search-header > div.search-results-details > h1"
				)?.textContent
			}"`;
			shotsTypes(type);
		};

	if (document.location.pathname.includes("/following")) {
		if (document.location.pathname.includes("/search")) search("following");
		else {
			presenceData.details = "Viewing page :";
			shotsTypes("following");
		}
	} else if (document.location.pathname.includes("/popular")) {
		if (document.location.pathname.includes("/search")) search("popular");
		else {
			presenceData.details = "Viewing page :";
			shotsTypes("popular");
		}
	} else if (document.location.pathname.includes("/recent")) {
		if (document.location.pathname.includes("/search")) search("recent");
		else {
			presenceData.details = "Viewing page :";
			shotsTypes("recent");
		}
	} else if (document.location.pathname.includes("/search")) search("");
	else if (document.body.id === "profile") {
		// view a profile

		presenceData.details = "Viewing profile :";
		presenceData.state = `- ${document.location.pathname.split("/")[1]} -`;
	} else presenceData.details = "Homepage";

	if (document.body.id === "user-profile") {
		// view personal profile

		presenceData.details = "Viewing personal profile :";
		presenceData.state = `- ${document.location.pathname.split("/")[1]} -`;
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
