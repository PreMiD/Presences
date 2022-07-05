const presence = new Presence({
		clientId: "749642170813907004",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		{ hostname } = document.location;

	if (hostname === "epicgames.com" || hostname === "www.epicgames.com") {
		// Epic Games Store

		if (pathname.startsWith("/store")) {
			presenceData.details = "Viewing:";
			presenceData.state = "Store";
		}

		if (pathname.includes("/store/") && pathname.includes("/product")) {
			presenceData.details = "Viewing game:";
			presenceData.state = document.querySelector(
				"#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > nav.css-1v9fujt-PageNav__topNav-PageNav__desktopNav-PageNav__themed > div > nav > div > div.css-eizwrh-NavigationBar__contentPrimary > ul > li:nth-child(2) > a > h2 > span"
			).textContent;
		}

		if (pathname.includes("/store/") && pathname.includes("/bundles")) {
			presenceData.details = "Viewing bundle:";
			presenceData.state = document.querySelector(
				"#dieselReactWrapper > div > div.css-igz6h5-AppPage__bodyContainer > main > div > nav.css-1v9fujt-PageNav__topNav-PageNav__desktopNav-PageNav__themed > div > nav > div > div.css-eizwrh-NavigationBar__contentPrimary > ul > li:nth-child(2) > a > h2 > span"
			).textContent;
		}

		if (pathname.includes("/store/") && pathname.includes("/news")) {
			presenceData.details = "Viewing:";
			presenceData.state = "News";
		}

		if (pathname.startsWith("/store/") && pathname.endsWith("/news/")) {
			presenceData.details = "Reading article:";
			presenceData.state = document.querySelector(
				"#storeNews > div > section > div > article > div > div.blog-header-info > div:nth-child(1) > div > h1"
			).textContent;
		}

		if (pathname.includes("/store/") && pathname.includes("/about")) {
			presenceData.details = "Viewing:";
			presenceData.state = "About Page";
		}

		if (pathname.includes("/store/") && pathname.includes("/redeem"))
			presenceData.details = "Redeeming";

		// Epic Games Site

		if (pathname.includes("/site/") && pathname.includes("/home")) {
			presenceData.details = "Viewing:";
			presenceData.state = "Home Page";
		}

		if (
			pathname.includes("/site/") &&
			pathname.includes("/epic-games-store-faq")
		) {
			presenceData.details = "Viewing:";
			presenceData.state = "FAQ Page";
		}

		// Epic Games account management & more

		if (pathname.startsWith("/account/")) {
			presenceData.details = "Changing account details:";
			presenceData.state = document
				.querySelector(".navigation-section")
				.querySelector(".active").textContent;
		}

		// Epic Games Help page

		if (pathname.startsWith("/help")) {
			presenceData.details = "Viewing:";
			presenceData.state = "Help Page";
		}

		if (pathname.startsWith("/help/")) {
			const helpHeading = document.querySelector(
				"#epicGamesReactWrapper > div > div.eg-content > div > div.sspgrid-container > div.Layout2Cols__wrapper.LayoutCol7Col4__wrapper > div > div.Layout2Cols__body-col--main.sspgrid-col-lg-7 > div.Article__wrapper > h1"
			);
			if (helpHeading === null) presenceData.details = null;
			else {
				presenceData.details = "Viewing help article:";
				presenceData.state = helpHeading.textContent;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
