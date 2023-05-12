const presence = new Presence({
		clientId: "865564674326003712",
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
			largeImageKey: "https://i.imgur.com/5z37NtP.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = location;

	if (pathname === "/") presenceData.details = "Viewing homepage";
	else if (pathname.includes(`/f/${pathname.split("/")[2]}`)) {
		presenceData.details = "Viewing fundraiser:";
		presenceData.state = document.querySelector(
			"#root > div > main > div.p-campaign > header > h1"
		).textContent;
		presenceData.buttons = [
			{
				label: "View fundraiser",
				url: href,
			},
		];
	} else if (pathname === "/sign-in" || pathname === "/sign-in/")
		presenceData.details = "Logging In";
	else if (pathname === "/sign-up" || pathname === "/sign-up/")
		presenceData.details = "Signing Up for an account";
	else if (pathname.includes("/forgot-password"))
		presenceData.details = "Resetting a password";
	else {
		switch (pathname) {
			case "/c/how-it-works":
			case "/c/how-it-works/": {
				presenceData.details = "Reading How GoFundMe Works";
				break;
			}
			case "/c/why-gofundme":
			case "/c/why-gofundme/": {
				presenceData.details = "Reading Why to choose GoFundMe";
				break;
			}
			case "/campaigns":
			case "/campaigns/": {
				presenceData.details = "Viewing my fundraisers";
				break;
			}
			case "/donations":
			case "/donations/": {
				presenceData.details = "Viewing the donations I've made";
				break;
			}
			default:
				if (pathname.includes("/settings")) presenceData.details = "Settings";
				else if (pathname.includes("/create"))
					presenceData.details = "Creating a fundraiser";
				else if (pathname.includes("/discover"))
					presenceData.details = "Browsing Fundraiser";
				else if (pathname.includes("/start"))
					presenceData.details = "Starting a fundraiser";
				else {
					switch (pathname) {
						case "/c/success":
						case "/c/success/": {
							presenceData.details = "Viewing Success Stories";
							break;
						}
						case "/c/cause":
						case "/c/cause/": {
							presenceData.details = "GoFundMe Causes ";
							break;
						}
						case "/c/cause/justice-and-equality":
						case "/c/cause/justice-and-equality/": {
							presenceData.details = "GoFundMe Causes";
							presenceData.state = "Justice & Equality";

							break;
						}
						default:
							if (pathname.startsWith("/s")) {
								presenceData.details = "Searching for a fundraiser:";
								presenceData.state = new URL(href).searchParams.get("q");
							}
					}
				}
		}
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
