const presence = new Presence({
		clientId: "1002734097719894067",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/12lTZIs.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location;

	if (pathname === "/") presenceData.details = "Browsing the dictionary";
	else if (document.location.pathname.startsWith("/dictionary/")) {
		presenceData.details = "Viewing definitions";
		presenceData.state = document.querySelector(
			"#left-content > div:nth-child(2) > div:nth-child(1) > h1"
		).textContent;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/word-games/")) {
		presenceData.details = "Playing a word game";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" | Merriam-Webster Games And Quizzes", "")
			.replace(" | Merriam-Webster Games & Quizzes", "")
			.replace(" - Word Game | Merriam-Webster", "")
			.replace(" | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "Play",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/word-of-the-day")) {
		presenceData.details = "Viewing the word of the day";
		presenceData.state = document.querySelector(
			'[class="word-and-pronunciation"]'
		).firstElementChild.textContent;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/words-at-play/")) {
		presenceData.details = "Reading post";
		presenceData.state = `${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")}`;
		presenceData.buttons = [
			{
				label: "View Post",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/reviews/")) {
		presenceData.details = "Reading a review";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" | Reviews by Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "View Review",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/video/")) {
		presenceData.details = "Watching a video";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" (Video) | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "Watch Video",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/thesaurus/")) {
		const word = document
			.querySelector("meta[name='twitter:title']")
			.getAttribute("content")
			.replace("Thesaurus results for ", "");
		presenceData.details = "Viewing synonyms";
		presenceData.state = `${
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/help/")) {
		presenceData.details = "Viewing the help page";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/vocabulary/")) {
		presenceData.details = "Viewing vocabulary learning lists";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/browse/legal/")) {
		presenceData.details = "Browsing the law dictionary";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(": Browse the Dictionary | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/browse/medical/")) {
		presenceData.details = "Browsing the medical dictionary";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(": Browse the Dictionary | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/legal/")) {
		presenceData.details = "Viewing legal definition";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(
				" Definition & Meaning | Merriam-Webster Legal",
				""
			)}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/medical/")) {
		presenceData.details = "Viewing medical definition";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(
				" Definition & Meaning | Merriam-Webster Medical",
				""
			)}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/about-us/")) {
		presenceData.details = "Viewing the about page";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/contact-us/")) {
		presenceData.details = "Viewing the contact page";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" | Merriam-Webster", "")}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else {
		switch (pathname) {
			case "/word-games": {
				presenceData.details = "Browsing games and quizzes";
				break;
			}
			case "/words-at-play": {
				presenceData.details = "Browsing words at play";
				break;
			}
			case "/reviews": {
				presenceData.details = "Browsing reviews";
				break;
			}
			case "/video": {
				presenceData.details = "Browsing videos";
				break;
			}
			case "/thesaurus": {
				presenceData.details = "Browsing the thesaurus";
				break;
			}
			case "/legal": {
				presenceData.details = "Browsing the law dictionary";
				break;
			}
			case "/medical": {
				presenceData.details = "Browsing the medical dictionary";
				break;
			}
			case "/login": {
				presenceData.details = "Logging in";
				break;
			}
			case "/register": {
				presenceData.details = "Signing up";
				break;
			}
			case "/settings": {
				presenceData.details = "Managing their account details";
				break;
			}
			case "/recents": {
				presenceData.details = "Viewing their recent lookups";
				break;
			}
			case "/saved-words": {
				presenceData.details = "Viewing their saved words";
				break;
			}
			case "/help": {
				presenceData.details = "Viewing the help page";
				break;
			}
			case "/advertising": {
				presenceData.details = "Viewing advertisement info";
				break;
			}
			case "/contact-us": {
				presenceData.details = "Viewing the contact us page";
				break;
			}
			case "/about-us": {
				presenceData.details = "Viewing the about page";
				break;
			}
		}
	}
	presence.setActivity(presenceData);
});
