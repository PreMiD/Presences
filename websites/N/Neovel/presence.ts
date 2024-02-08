const presence = new Presence({
		clientId: "996453486696878144",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/N/Neovel/assets/logo.jpg",
			startTimestamp: browsingTimestamp,
		},
		presenceDataSlide: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/N/Neovel/assets/logo.jpg",
			startTimestamp: browsingTimestamp,
		},
		pathnameArray = document.location.pathname.split("/"),
		[privacy, time, showCover] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("cover"),
		]),
		bookCoverPath =
			"https://neovel.io/V2/book/image?bookId=%bookId%&oldApp=false&imageExtension=1";

	switch (pathnameArray[1]) {
		case "discover":
			presenceData.details = "Discovering new books";
			break;
		case "tos":
			presenceData.details = "Reading Neovel ToS";
			if (pathnameArray.length > 2) presenceData.state = "Privacy Policy";
			break;
		case "book":
			if (document.location.hostname.includes("neopload")) {
				presenceData.details = "Managing their book";
				if (!privacy) {
					presenceData.state = `Book ${
						document.querySelector(`option[value="${pathnameArray[2]}"]`)
							.textContent
					} [${pathnameArray[3]}]`;
					presenceData.largeImageKey = bookCoverPath.replace(
						"%bookId%",
						pathnameArray[2]
					);
				}
			} else {
				presenceData.details = presenceDataSlide.details =
					"Reading a book page";
				presenceData.buttons = presenceDataSlide.buttons = [
					{ label: "View Book", url: document.documentURI },
				];
				presenceData.largeImageKey = presenceDataSlide.largeImageKey =
					bookCoverPath.replace("%bookId%", pathnameArray[2]);
				presenceData.state = `from ${
					document.querySelector("a.author-element span").textContent
				} [${pathnameArray[3]}]`;
				slideshow.addSlide("slideAuthor", presenceData, 5000);

				presenceDataSlide.state = `${
					document.querySelector("div.title-section h1").textContent
				} [${pathnameArray[3]}]`;
				slideshow.addSlide("slideBook", presenceDataSlide, 5000);
			}
			break;
		case "read":
			presenceData.details = presenceDataSlide.details = privacy
				? "Reading a chapter"
				: `Reading the chapter "${
						document.querySelector("h1.chapter-name").textContent
				  }"`;
			presenceData.buttons = presenceDataSlide.buttons = privacy
				? [
						{
							label: "View Book",
							url: `https://neovel.io/book/${pathnameArray[2]}/${pathnameArray[3]}`,
						},
				  ]
				: [
						{ label: "View Chapter", url: document.documentURI },
						{
							label: "View Book",
							url: `https://neovel.io/book/${pathnameArray[2]}/${pathnameArray[3]}`,
						},
				  ];
			presenceData.largeImageKey = presenceDataSlide.largeImageKey =
				bookCoverPath.replace("%bookId%", pathnameArray[2]);
			presenceData.state = `from ${
				document.querySelector("div.book-info span").textContent
			} [${pathnameArray[3]}]`;
			slideshow.addSlide("slideAuthor", presenceData, 5000);

			presenceDataSlide.state = `from ${
				document.querySelector("div.book-info h2 a").textContent
			} [${pathnameArray[3]}]`;
			slideshow.addSlide("slideBook", presenceDataSlide, 5000);
			break;
		case "user":
			presenceData.details = "Viewing an author";
			presenceData.buttons = [
				{ label: "View Author", url: document.documentURI },
			];
			presenceData.largeImageKey = document
				.querySelector("app-avatar.author-profile-picture img")
				.getAttribute("src");
			presenceData.state = `${
				document.querySelector("div.author-label h1").textContent
			}`;
			break;
		case "explorer":
			presenceData.details = "Exploring stories";
			if (!privacy) {
				presenceData.state = `from "${
					document.querySelector("div.top-bar h1").textContent
				}"`;
			}
			break;
		case "library":
			presenceData.details = "Exploring its library";
			if (!privacy) {
				presenceData.state = {
					0: "In its recents novels",
					1: "In its lists",
					2: "Reading its comments",
				}[pathnameArray[2]];
			}
			break;
		case "write":
			presenceData.details = "Is going to write";
			break;
		case "profile":
			presenceData.details = "Managing their author profile";
			if (!privacy) {
				presenceData.state = `On page "${
					document.querySelector(".mat-tab-label-active").textContent
				}"`;
			}
			break;
		case "validation":
			presenceData.details = "Validating books";
			break;
		case "starter":
			presenceData.details = "Fetching their books";
			break;
		case "chapter":
			presenceData.details = "Editing a chapter";
			if (!privacy) {
				presenceData.state = `from "${
					document.querySelector("div.card-title strong.neovel-font-big")
						.textContent
				}"`;
				presenceData.largeImageKey = bookCoverPath.replace(
					"%bookId%",
					pathnameArray[2]
				);
			}
			break;
		case "dashboard":
			presenceData.details = "Viewing book dashboard";
			if (!privacy) {
				presenceData.state = `from ${
					document.querySelector("div.book-detail-container h2").textContent
				} [${pathnameArray[3]}]`;
				presenceData.largeImageKey = bookCoverPath.replace(
					"%bookId%",
					pathnameArray[2]
				);
			}
			break;
		case "contact_us":
			presenceData.details = "Contacting Neovel staff";
			break;
		default:
			if (pathnameArray[1].includes("profile"))
				presenceData.details = "Managing their reader profile";
			else if (pathnameArray[1].includes("search"))
				presenceData.details = "Looking for a book";
			break;
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceDataSlide.startTimestamp;
	}
	if (!showCover) {
		presenceData.largeImageKey = presenceDataSlide.largeImageKey =
			"https://cdn.rcd.gg/PreMiD/websites/N/Neovel/assets/logo.jpg";
	}

	if (slideshow.getSlides().length > 0) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
