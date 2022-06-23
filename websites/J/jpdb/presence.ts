const presence = new Presence({
		clientId: "988699263775154176",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "jpdb",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname.includes("/learn")) {
		presenceData.details = "Viewing learn page";
		const dueCountElem =
			document.querySelector('a[href="/learn"]').firstElementChild;
		if (dueCountElem.getAttribute("style") === "color: green;")
			presenceData.state = `New: ${dueCountElem.textContent} items`;
		else presenceData.state = `Due: ${dueCountElem.textContent} items`;
	} else if (document.location.pathname.includes("/review")) {
		presenceData.details = "Reviewing cards";
		const dueCountElem =
			document.querySelector('a[href="/learn"]').firstElementChild;
		if (dueCountElem.getAttribute("style") === "color: green;")
			presenceData.state = `New: ${dueCountElem.textContent}\n items`;
		else presenceData.state = `Due : ${dueCountElem.textContent}\n items`;
	} else if (document.location.pathname.includes("/search")) {
		if (document.querySelector("div.results.search")) {
			presenceData.details = "Searching:";
			presenceData.state = encodeURI(
				new URLSearchParams(document.location.search).get("q")
			);
		} else if (document.querySelector("div.result.kanji")) {
			presenceData.details = "Viewing a kanji:";
			presenceData.state = `${new URLSearchParams(document.location.search).get(
				"q"
			)} - ${decodeURI(
				document.querySelector(
					"div.result.kanji > div.vbox.gap > div.hbox > div.vbox.gap > div > div"
				).textContent
			)}`;
		} else if (document.querySelector("div.result.vocabulary")) {
			presenceData.details = "Viewing a word:";
			presenceData.state = decodeURI(
				new URLSearchParams(document.location.search).get("q")
			);
		}
	} else if (document.location.pathname.includes("/vocabulary/")) {
		presenceData.details = "Viewing a word:";
		presenceData.state = decodeURI(document.location.pathname.split("/")[3]);
	} else if (document.location.pathname.includes("/kanji/")) {
		presenceData.details = "Viewing a kanji:";
		presenceData.state = decodeURI(document.location.pathname.split("/")[2]);
	} else if (
		[
			"/novel/",
			"/vocabulary-list/",
			"/textbook/",
			"/anime/",
			"/youtube-video/",
			"/live-action/",
			"/video-game/",
			"/web-novel/",
			"/visual-novel/",
			"/audio/",
		].some(deck => document.location.pathname.includes(deck))
	) {
		presenceData.details = "Viewing pre-built deck";
		presenceData.state = document.querySelector("h3").textContent;
	} else if (document.location.pathname.includes("/deck")) {
		presenceData.details = "Viewing a deck";
		presenceData.state = document.querySelector(
			"div.container.bugfix > div:nth-child(2)"
		).textContent;
	} else if (document.location.pathname.includes("/prebuilt_decks"))
		presenceData.details = "Finding pre-built deck";
	else if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/stats"))
		presenceData.details = "Viewing stats";
	else if (document.location.pathname.includes("/quiz"))
		presenceData.details = "Taking quizzes";
	else if (document.location.pathname.includes("/leaderboard"))
		presenceData.details = "Viewing leaderboard";
	else if (document.location.pathname.includes("/settings"))
		presenceData.details = "Viewing settings page";
	else if (document.location.pathname.includes("/contact-us"))
		presenceData.details = "Viewing contact page";
	else if (document.location.pathname.includes("/anime-difficulty-list"))
		presenceData.details = "Viewing anime difficulty list";
	else if (document.location.pathname.includes("/live-action-difficulty-list"))
		presenceData.details = "Viewing live action difficulty list";
	else if (document.location.pathname.includes("/visual-novel-difficulty-list"))
		presenceData.details = "Viewing visual novel difficulty list";
	else if (document.location.pathname.includes("/novel-difficulty-list"))
		presenceData.details = "Viewing novel difficulty list";
	else if (document.location.pathname.includes("/web-novel-difficulty-list"))
		presenceData.details = "Viewing web novel difficulty list";
	else if (document.location.pathname.includes("/about"))
		presenceData.details = "Reading the about page";
	else if (document.location.pathname.includes("/faq"))
		presenceData.details = "Reading FAQ";
	else if (document.location.pathname.includes("/privacy-policy"))
		presenceData.details = "Reading privacy policy";
	else if (document.location.pathname.includes("/terms-of-use"))
		presenceData.details = "Reading terms of use";
	else if (document.location.pathname.includes("/changelog"))
		presenceData.details = "Reading changelog";
	else if (document.location.pathname.includes("/login"))
		presenceData.details = "Logging in";

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
