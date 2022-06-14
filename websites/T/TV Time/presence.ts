const presence = new Presence({
		clientId: "844109006679179265",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
	};

	if (
		document.location.pathname === "/en" ||
		document.location.pathname === "/fr" ||
		document.location.pathname === "/es" ||
		document.location.pathname === "/it" ||
		document.location.pathname === "/pt_PT" ||
		document.location.pathname === "/pt_BR" ||
		document.location.pathname === "/de"
	)
		presenceData.details = "Viewing Watchlist";
	else if (document.location.pathname.endsWith("/calendar"))
		presenceData.details = "Viewing Calendar";
	else if (document.location.pathname.endsWith("/upcoming"))
		presenceData.details = "Viewing Upcoming Episodes";
	else if (document.location.pathname.endsWith("/profile")) {
		presenceData.details = "Viewing a User Profile";
		[presenceData.state] = document
			.querySelector(".profile-infos h1.name")
			.textContent.split("Follow");
	} else if (document.location.pathname.endsWith("/account"))
		presenceData.details = "Viewing Account Details";
	else if (document.location.pathname.includes("/show")) {
		if (document.location.pathname.includes("/episode/")) {
			presenceData.details = "Viewing an Episode";
			presenceData.state = `${
				document.querySelector("div.info-box h3 a").textContent
			} - ${
				document.querySelector("div.info-box h1 .episode-label").textContent
			}`;
		} else if (document.location.pathname.endsWith("/explore"))
			presenceData.details = "Browsing TV Shows";
		else {
			presenceData.details = "Viewing a TV Show";
			presenceData.state = document.querySelector(
				"div.info-box.heading-info h1"
			).textContent;
		}
	} else if (document.location.pathname.includes("/actor/")) {
		presenceData.details = "Viewing an Actor Profile";
		presenceData.state = document.querySelector(
			"div#actor-details div.infos h1"
		).textContent;
	} else if (document.location.pathname.endsWith("/about"))
		presenceData.details = "Viewing the About Page";
	else if (document.location.pathname.endsWith("/privacy"))
		presenceData.details = "Viewing the Privacy Policy";
	else if (document.location.pathname.endsWith("/terms"))
		presenceData.details = "Viewing the Terms of Service";
	else if (document.location.pathname.endsWith("/special-thanks"))
		presenceData.details = "Viewing the Credits";
	else if (document.location.pathname.endsWith("/podcasts"))
		presenceData.details = "Viewing the Podcasts Page";
	else if (document.location.pathname.includes("/article")) {
		if (document.location.pathname.endsWith("/articles"))
			presenceData.details = "Browsing Articles";
		else {
			presenceData.details = "Viewing an Article";
			presenceData.state = document.querySelector(
				"div.article h1.page-header"
			).textContent;
		}
	}
	presence.setActivity(presenceData);
});
