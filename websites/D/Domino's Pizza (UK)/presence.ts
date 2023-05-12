const presence = new Presence({
	clientId: "650464804276011009",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/GYkNfcY.png",
			startTimestamp: Date.now(),
		},
		path = document.location.pathname;

	switch (path) {
		case "/": {
			presenceData.details = "Browing Domino's Pizza";
			presenceData.state = "Home Page";

			break;
		}
		case "/menu": {
			presenceData.details = "Browing Domino's Pizza";
			presenceData.state = "Menu";

			break;
		}
		case "/deals/storedeals": {
			presenceData.details = "Browing Domino's Pizza";
			presenceData.state = "Viewing in-store deals";

			break;
		}
		default:
			if (path.startsWith("/menu/pizza/999")) {
				presenceData.details = "Browing Domino's Pizza";
				presenceData.state = "Creating a custom pizza";
			} else if (
				path.startsWith("/deals/deal") &&
				Number(path.split("/")[path.split("/").length - 1])
			) {
				presenceData.details = "Browing Domino's Pizza";
				presenceData.state = "Customising a deal";
			} else {
				switch (path) {
					case "/user/login": {
						presenceData.details = "Browing Domino's Pizza";
						presenceData.state = "Logging in...";

						break;
					}
					case "/user/register": {
						presenceData.details = "Browing Domino's Pizza";
						presenceData.state = "Creating an account";

						break;
					}
					case "/welcome": {
						presenceData.details = "Browing Domino's Pizza";
						presenceData.state = "Home Page";

						break;
					}
					case "/store/moreinfo": {
						presenceData.details = "Browing Domino's Pizza";
						presenceData.state = "Viewing store info";

						break;
					}
					default:
						if (path.startsWith("/storefinder/bystoreid")) {
							presenceData.details = "Browing Domino's Pizza";
							presenceData.state = "Finding stores";
						} else {
							switch (path) {
								case "/mydominos/addressbook": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Viewing my addresses";

									break;
								}
								case "/mydominos": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Viewing my profile";

									break;
								}
								case "/mydominos/favourites": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Viewing my favourited orders";

									break;
								}
								case "/mydominos/offers": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Entering a promo code";

									break;
								}
								case "/mydominos/paymentmethods": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Adding a payment method";

									break;
								}
								case "/mydominos/personaldetails": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Editing personal details";

									break;
								}
								case "/mydominos/savedpizzas": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Viewing saved pizzas";

									break;
								}
								case "/mydominos/security": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Changing password";

									break;
								}
								case "/contact": {
									presenceData.details = "Browing Domino's Pizza";
									presenceData.state = "Contacting support";

									break;
								}
								case "/basketdetails/show": {
									const [price] = document.querySelectorAll(
											".new-basket-total-price.basket-price"
										),
										[saving] = document.querySelectorAll(
											".new-basket-total-price.basket-alt-price"
										);

									let priceText, savingText;

									if (price) priceText = price.textContent;

									if (saving) savingText = saving.textContent;

									presenceData.details = "Viewing cart";
									presenceData.state = `Total: ${priceText} ${
										saving ? `(${savingText} saved)` : ""
									}`;

									break;
								}
								default:
									presenceData.details = "Browing Domino's Pizza";
							}
						}
				}
			}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
