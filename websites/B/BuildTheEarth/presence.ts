const presence = new Presence({
	clientId: "805070274847440916",
});

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
			largeImageKey: "https://i.imgur.com/XvapvDX.png",
		},
		browsingTimestamp = Math.floor(Date.now() / 1000),
		[privacy, button, pmap] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("button"),
			presence.getSetting<boolean>("pmap"),
		]);

	presenceData.startTimestamp = browsingTimestamp;
	if (privacy) presenceData.details = "Browsing";
	else if (window.location.pathname.endsWith("me")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Profil";
	} else if (window.location.pathname.endsWith("faq")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "FAQ";
	} else if (window.location.pathname.endsWith("map")) {
		presenceData.smallImageKey = "map";
		presenceData.details = "Viewing a page:";
		if (pmap) presenceData.state = "Map";
		else {
			presenceData.state = `Map : ${
				Math.floor(
					Number(
						document
							.querySelector("#map_tpll_command")
							.textContent.replace("/tpll ", "")
							.split(" ")[0]
					) * 10
				) / 10
			} | ${
				Math.floor(
					Number(
						document
							.querySelector("#map_tpll_command")
							.textContent.replace("/tpll ", "")
							.split(" ")[1]
					) * 10
				) / 10
			}`;
		}
	} else if (window.location.pathname.endsWith("buildteams")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "BuildTeams";
	} else if (window.location.pathname.endsWith("contact")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Contact";
	} else if (window.location.pathname.endsWith("upload")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Upload your world";
	} else {
		presenceData.details = "Viewing a page:";
		presenceData.state = document.title.replace(" - BuildTheEarth", "");
		if (window.location.pathname.length !== 1) {
			presenceData.details = "Viewing a BuildTeam:";
			if (button) {
				presenceData.buttons = [
					{
						label: "View the team",
						url: document.URL,
					},
				];
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
