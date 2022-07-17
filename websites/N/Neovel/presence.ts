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
			presenceData.buttons = presenceDataSlide.buttons = [
				{ label: "Go to book page", url: document.documentURI },
			];
			presenceData.largeImageKey =
				presenceDataSlide.largeImageKey = `https://neovel.io/V2/book/image?bookId=${pathnameArray[2]}&oldApp=false&imageExtension=1`;

			presenceData.state = `from ${
				document.querySelector(
					"a.author-element span" // Get Author name
				).textContent
			} [${pathnameArray[3]}]`;
			slideshow.addSlide("slideAuthor", presenceData, 5000);

			presenceDataSlide.state = `${
				document.querySelector("div.title-section h1").textContent // Get Book name
			} [${pathnameArray[3]}]`;
			slideshow.addSlide("slideBook", presenceDataSlide, 5000);
			break;
		case "read":
			presenceData.details = presenceDataSlide.details = `Read the chapter "${
				document.querySelector("h1.chapter-name").textContent
			}"`;
			presenceData.buttons = presenceDataSlide.buttons = [
				{ label: "Go to the chapter", url: document.documentURI },
				{
					label: "Go to book page",
					url: `https://neovel.io/book/${pathnameArray[2]}/${pathnameArray[3]}`,
				},
			];
			presenceData.largeImageKey =
				presenceDataSlide.largeImageKey = `https://neovel.io/V2/book/image?bookId=${pathnameArray[2]}&oldApp=false&imageExtension=1`;

			presenceData.state = `from ${
				document.querySelector(
					"div.book-info span" // Get Author name
				).textContent
			} [${pathnameArray[3]}]`;
			slideshow.addSlide("slideAuthor", presenceData, 5000);

			presenceDataSlide.state = `from ${
				document.querySelector("div.book-info h2 a").textContent // Get Book name
			} [${pathnameArray[3]}]`;
			slideshow.addSlide("slideBook", presenceDataSlide, 5000);
			break;
		case "user":
			presenceData.details = "Read an user page";
			presenceData.buttons = [
				{ label: "Go to the user page", url: document.documentURI },
			];
			presenceData.largeImageKey = document
				.querySelector("app-avatar.author-profile-picture img")
				.getAttribute("src");

			presenceData.state = `${
				document.querySelector("div.author-label h1").textContent
			}`;
			break;
	}

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
