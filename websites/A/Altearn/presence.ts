const presence = new Presence({
		clientId: "805098006625517599",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/FXRVkUd.png",
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting<boolean>("privacy"),
		button = await presence.getSetting<boolean>("button");
	if (privacy) presenceData.details = "Browsing";
	else if (window.location.pathname.startsWith("/articles")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Activities";
	} else if (window.location.pathname.startsWith("/category/")) {
		presenceData.details = "Searching an article:";
		presenceData.state = `in category ${document.title.replace(
			" | Altearn",
			""
		)}`;
		if (window.location.pathname.endsWith("category/ag/")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "General Assembly";
		}
	} else if (window.location.pathname.startsWith("/assemblee-generale-")) {
		presenceData.details = "Viewing an General Assembly";
		presenceData.state = document.title
			.replace(" | Altearn", "")
			.replace("Assemblée Générale - ", "");
		if (button) {
			presenceData.buttons = [
				{
					label: "View General Assembly",
					url: document.URL,
				},
			];
		}
	} else if (window.location.pathname.endsWith("/notre-organisation/")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Our organisation";
	} else if (
		window.location.pathname.startsWith("/") &&
		window.location.pathname.length !== 1
	) {
		presenceData.details = "Reading an article:";
		presenceData.state = document.title.replace(" | Altearn", "");
		if (button) {
			presenceData.buttons = [
				{
					label: "View article",
					url: document.URL,
				},
			];
		}
		if (window.location.pathname.includes("/author/")) {
			presenceData.details = "Looking for an user:";
			presenceData.state = document.title.replace(" | Altearn", "");
			if (button) {
				presenceData.buttons = [
					{
						label: "View user",
						url: document.URL,
					},
				];
			}
		}
		if (document.title.includes("Fiche de poste:")) {
			presenceData.details = "Viewing a place as";
			presenceData.state = document.title
				.replace(" | Altearn", "")
				.replace("Fiche de poste:", "");
			if (button) {
				presenceData.buttons = [
					{
						label: "View place",
						url: document.URL,
					},
				];
			}
		}
	} else if (window.location.pathname.length === 1) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Home";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
