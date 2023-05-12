const presence = new Presence({
		clientId: "904304152048439296",
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
		largeImageKey: "https://i.imgur.com/8FcDsJt.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/") presenceData.details = "In home page";
	else if (document.location.pathname.includes("/view/")) {
		presenceData.details = "Viewing a gif:";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (document.location.pathname.includes("/search/")) {
		presenceData.details = "Searching a GIF:";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (document.location.pathname.includes("/users/")) {
		presenceData.details = "Viewing user profile:";
		presenceData.state = document.querySelector(".partnername").textContent;
		presenceData.buttons = [
			{
				label: "View User",
				url: document.URL,
			},
		];
	} else {
		switch (document.location.pathname) {
			case "/reactions":
				presenceData.details = "Viewing reaction GIFs";
				break;
			case "/gif-maker":
				presenceData.details = "Uploading a GIF";
				break;
			case "/explore":
				presenceData.details = "Exploring GIFs";
				break;
			case "/mac":
				presenceData.details = "Viewing Tenor for MAC";
				break;
			case "/contentpartners":
				presenceData.details = "Viewing partner list";
				break;
			case "/gifapi":
				presenceData.details = "Viewing API";
				break;
			case "/gifapi/documentation":
				presenceData.details = "Reading API docs";
				break;
			case "/developer/keyregistration":
				presenceData.details = "Registering a new api key";
				break;
			case "/developer/dashboard":
				presenceData.details = "Viewing developer dashboard";
				break;
			default:
				presenceData.details = "Browsing on the web";
				break;
		}
	}
	presence.setActivity(presenceData);
});
