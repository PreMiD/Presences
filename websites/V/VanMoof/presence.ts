const presence = new Presence({
		clientId: "941761536681201676"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
	const urlpath = window.location.pathname.split("/"),
		presenceData: PresenceData = {
			details: "Other",
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
			buttons: [
				{
					label: "View Page",
					url: window.location.href.replace(`${urlpath[1]}/`, "")
				}
			]
		};

	switch (true) {
		case /[a-z]{2}(-)[A-Z]{2}/g.test(urlpath[1]) && !urlpath[2]:
			(presenceData.details = "Home"), delete presenceData.buttons;

			break;

		case urlpath[1] === "shop":
			presenceData.details = "Shop";

			if (urlpath[2].startsWith("outlet")) {
				presenceData.state = "Outlet";

				switch (urlpath[3]) {
					case "bikes":
						if (urlpath[4]) {
							presenceData.details = "Shop - Outlet Bike";
							presenceData.state =
								document.querySelector("h1.page-title span")?.textContent ??
								"Unknown";
						} else presenceData.state = "Outlet Bikes";

						break;

					case "faq":
						presenceData.state = "FAQ";

						break;
				}
			} else {
				switch (urlpath[3]) {
					case "accessories":
						presenceData.state = "Accessories";

						if (urlpath[4]) {
							presenceData.details = "Shop - Accessories";
							presenceData.state =
								document.querySelector("h1.product-title")?.textContent ??
								"Unknown";
						}

						break;
				}
			}

			break;

		case urlpath[1] === "my-vanmoof":
			presenceData.details = "My VanMoof";

			switch (urlpath[3]) {
				case "home":
					presenceData.state = "Home";

					break;

				case "bikes":
					presenceData.state = "Bikes";

					if (document.querySelector("#chakra-modal-register-bike"))
						presenceData.state = "Registering Bike";

					break;

				case "orders":
					presenceData.state = "Orders";

					break;

				case "rewards":
					presenceData.state = "Rewards";

					break;

				case "help":
					presenceData.state = "Help";

					break;

				case "profile":
					presenceData.state = "Profile";

					break;
			}

			break;

		case urlpath[1] === "blog":
			presenceData.details = "Blog";

			if (urlpath[2] && urlpath[3]) {
				presenceData.details = "Blog - Article";
				presenceData.state =
					document.querySelector("h1.heading.heading--article-page")
						?.textContent ?? "Unknown";

				presenceData.buttons = [
					{
						label: "View on VanMoof",
						url: window.location.href
					}
				];

				if (urlpath[3] === "category") {
					presenceData.details = "Blog - Category";
					presenceData.state =
						document.querySelector("h1.heading.heading--hero")?.textContent ??
						"Unknown";
				} else if (urlpath[3] === "search") {
					presenceData.details = "Blog - Search";
					presenceData.state =
						document.querySelector<HTMLInputElement>("input.search-form__input")
							?.value ?? "Unknown";
				}
			}

			break;

		case urlpath[1] === "news":
			presenceData.details = "News";

			if (urlpath[3]) {
				switch (urlpath[3]) {
					case "media_kits":
						presenceData.state = "Media";

						break;

					case "about":
						presenceData.state = "About Us";

						break;

					case "contact":
						presenceData.state = "Contact Us";

						break;

					default:
						presenceData.details = "News - Article";
						presenceData.state =
							document.querySelector("article div.block h1")?.textContent ??
							"Unknown";

						break;
				}

				presenceData.buttons = [
					{
						label: "View on VanMoof",
						url: window.location.href
					}
				];
			}

			break;

		default:
			switch (urlpath[2]) {
				case "electric-bikes":
					presenceData.details = "Viewing E-Bikes";

					if (urlpath[3] === "powerbank")
						presenceData.details = "Viewing PowerBank";

					break;

				case "s3":
					presenceData.details = "Viewing E-Bike";
					presenceData.state = "VanMoof S3";
					presenceData.largeImageKey = "vanmoof_s3";
					presenceData.smallImageKey = "logo";
					presenceData.buttons = [
						{
							label: "View on VanMoof",
							url: "https://www.vanmoof.com/s3/"
						}
					];

					break;

				case "x3":
					presenceData.details = "Viewing E-Bike";
					presenceData.state = "VanMoof X3";
					presenceData.largeImageKey = "vanmoof_x3";
					presenceData.smallImageKey = "logo";
					presenceData.buttons = [
						{
							label: "View on VanMoof",
							url: "https://www.vanmoof.com/x3/"
						}
					];

					break;

				case "vanmoof-v":
					presenceData.details = "Viewing E-Bike";
					presenceData.state = "VanMoof V";
					presenceData.largeImageKey = "vanmoof_v";
					presenceData.smallImageKey = "logo";
					presenceData.buttons = [
						{
							label: "View on VanMoof",
							url: "https://www.vanmoof.com/vanmoof-v/"
						}
					];

					break;

				case "test-rides":
					presenceData.details = "Booking a Test Ride";

					break;

				case "peace-of-mind":
					presenceData.details = "Viewing Peace of Mind Services";

					break;

				case "payment-options":
					presenceData.details = "Viewing Payment Options";

					break;

				case "payment-plans":
					presenceData.details = "Viewing Payment Plans";

					break;

				case "about":
					presenceData.details = "About Us";

					break;

				case "stores":
					presenceData.details = "Searching for Stores";

					break;

				case "company-bikes":
					presenceData.details = "Viewing Company Bikes";

					break;

				case "certified-partner":
					presenceData.details = "About Certified Partnerships";

					break;
			}

			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
