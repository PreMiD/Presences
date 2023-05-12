const presence = new Presence({
		clientId: "918248582459555871",
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
		largeImageKey: "https://i.imgur.com/dIpE7wX.png",
		smallImageKey: "vukky",
		smallImageText: "Playing Vukkybox",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/gallery") {
		presenceData.details = "Browsing their gallery";
		presenceData.state = `Unlocked ${document
			.querySelector("#total_text")
			.childNodes[3].textContent.substring(14, 21)} Vukkies!`;
	} else if (document.location.pathname.includes("guestgallery")) {
		presenceData.details = "Browsing someone's gallery";
		presenceData.state = `Unlocked ${document
			.querySelector("#total_text")
			.childNodes[3].textContent.substring(14, 21)} Vukkies!`;
	} else {
		switch (document.location.pathname) {
			case "/store": {
				presenceData.details = "Browsing the store";
				if (document.querySelector("#balance")) {
					presenceData.state = `${
						document.querySelector("#balance").textContent
					} to spend!`;
				}

				break;
			}
			case "/buyBox/classic": {
				presenceData.details = "Opening a Classic Box";
				presenceData.state = `${
					document.querySelector("#balance").textContent
				} left!`;

				break;
			}
			case "/buyBox/veggie": {
				presenceData.details = "Opening a Veggie Box";
				presenceData.state = `${
					document.querySelector("#balance").textContent
				} left!`;

				break;
			}
			case "/buyBox/fire": {
				presenceData.details = "Opening a Fire Box";
				presenceData.state = `${
					document.querySelector("#balance").textContent
				} left!`;

				break;
			}
			case "/buyBox/warped": {
				presenceData.details = "Opening a Cursed Box";
				presenceData.state = `${
					document.querySelector("#balance").textContent
				} left!`;

				break;
			}
			case "/buyBox/pukky": {
				presenceData.details = "Opening a Pukky Box";
				presenceData.state = `${
					document.querySelector("#balance").textContent
				} left!`;

				break;
			}
			case "/buyBox/shark": {
				presenceData.details = "Opening a Shark Box";
				presenceData.state = `${
					document.querySelector("#balance").textContent
				} left!`;

				break;
			}
			case "/buyBox/beggars": {
				presenceData.details = "Opening a Beggar's Box";
				presenceData.state = `${
					document.querySelector("#balance").textContent
				} left!`;

				break;
			}
			default:
				if (document.location.pathname.includes("/redeem")) {
					presenceData.details = "Redeeming a coupon!";
					if (
						document.body.style.backgroundImage ===
						'url("https://i.imgur.com/NlGok01.png")'
					)
						presenceData.state = "Yay, it's a valid coupon!";
					else presenceData.state = "Uh oh, the coupon is invalid!";
				} else {
					switch (document.location.pathname) {
						case "/": {
							presenceData.details = "Browsing the homepage";
							break;
						}
						case "/login": {
							presenceData.details = "Logging in";
							break;
						}
						case "/profile":
							{
								presenceData.details = "Changing profile settings";
								// No default
							}
							break;
					}
				}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
