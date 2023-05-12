const presence = new Presence({
		clientId: "633801594541965334",
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
let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/IW9vsn2.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname.includes("/bot")) {
		presenceData.details = "Reading about the bot";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/account"))
		presenceData.details = "Viewing their account";
	else if (document.location.pathname.includes("/manage/")) {
		presenceData.details = "Managing the settings of";
		title = document.querySelector(
			"#dashboard-mount > div > div.column.nav-sidebar > aside > div.guild-header > h3 > div > div"
		);
		presenceData.state = `server: ${title.textContent}`;
		presenceData.smallImageKey = Assets.Writing;
	} else if (document.location.pathname.includes("/servers")) {
		presenceData.details = "Browsing through the";
		presenceData.state = "server listings";
	} else if (document.location.pathname.includes("/commands"))
		presenceData.details = "Viewing all the commands";
	else if (document.location.pathname.includes("faq")) {
		presenceData.details = "Reading the FAQ";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/status"))
		presenceData.details = "Viewing the status";
	else if (document.location.pathname.includes("/upgrade"))
		presenceData.details = "Viewing Dyno Premium Plans";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
