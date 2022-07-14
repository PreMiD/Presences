const presence = new Presence({
		clientId: "996453486696878144",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "neovel_logo",
			startTimestamp: browsingTimestamp,
		},
		presenceDataSlide: PresenceData = {
			largeImageKey: "neovel_logo",
			startTimestamp: browsingTimestamp,
		},
		pathnameArray = document.location.pathname.split("/");

	switch (pathnameArray[1]) {
		case "discover":
			presenceData.details = "Discover new books";
			break;
		case "tos":
			presenceData.details = "Read Neovel T.O.S.";
			if (pathnameArray.length > 2) presenceData.state = "Privacy Policy";
			break;
		case "book":
			presenceData.details = presenceDataSlide.details = "Read a book page";

			presenceData.state = `from ${
				document.querySelector(
					"a.author-element span.highEmphasis.ng-tns-c148-3" // Get Author name
				).textContent
			} [${pathnameArray[3]}]`;
			slideshow.addSlide("slideAuthor", presenceData, 5000);

			presenceDataSlide.state = `${
				document.querySelector("div.title-section h1").textContent // Get Book name
			} [${pathnameArray[3]}]`;
			presenceData.buttons = presenceDataSlide.buttons = [
				{ label: "Go to book page", url: document.documentURI },
			];
			slideshow.addSlide("slideBook", presenceDataSlide, 5000);
			break;
	}

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
