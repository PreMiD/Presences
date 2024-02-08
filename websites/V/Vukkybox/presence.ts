const presence = new Presence({
		clientId: "918248582459555871",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/V/Vukkybox/assets/logo.png",
		smallImageKey: "https://cdn.rcd.gg/PreMiD/websites/V/Vukkybox/assets/1.png",
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
						'url("https://cdn.rcd.gg/PreMiD/websites/V/Vukkybox/assets/0.png")'
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
