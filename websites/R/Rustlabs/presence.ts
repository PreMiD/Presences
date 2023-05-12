const presence = new Presence({
	clientId: "747683982279180359",
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
	const browsingTimestamp = Math.floor(Date.now() / 1000),
		presenceData: PresenceData = {
			details: "Rustlabs",
			largeImageKey: "https://i.imgur.com/Yp2IGUO.png",
			startTimestamp: browsingTimestamp,
		};

	switch (window.location.pathname.split("/").slice(1)[0]) {
		//Weapons
		case "group=weapons":
			presenceData.details = "Browsing Weapons";
			break;
		//Construction
		case "group=build":
			presenceData.details = "Browsing Construction";
			break;
		//Items
		case "group=items":
			presenceData.details = "Browsing Items";
			break;
		//Resources
		case "group=resources":
			presenceData.details = "Browsing Resources";
			break;
		//Attire
		case "group=clothing":
			presenceData.details = "Browsing Attire";
			break;
		//Tools
		case "group=tools":
			presenceData.details = "Browsing Tools";
			break;
		//Medical
		case "group=medical":
			presenceData.details = "Browsing Medical";
			break;
		//Food
		case "group=food":
			presenceData.details = "Browsing Food";
			break;
		//Ammo
		case "group=ammo":
			presenceData.details = "Browsing Ammo";
			break;
		//Traps
		case "group=traps":
			presenceData.details = "Browsing Traps";
			break;
		//Misc
		case "group=misc":
			presenceData.details = "Browsing Misc";
			break;
		//Components
		case "group=components":
			presenceData.details = "Browsing Components";
			break;
		//Electrical
		case "group=electrical":
			presenceData.details = "Browsing Electrical";
			break;
		//Fun
		case "group=fun":
			presenceData.details = "Browsing Fun";
			break;
		//Skins
		case "skins":
			presenceData.details = "Looking at Skins ";
			break;
		//About
		case "about":
			presenceData.details = "Browsing About";
			break;
		//Unknown
		default:
			presence.setActivity();
			return;
	}

	presence.setActivity(presenceData);
});
