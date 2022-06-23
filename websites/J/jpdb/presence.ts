const presence = new Presence({
		clientId: "988699263775154176",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let dueCountElem: Element, deckTitle: string, query: string, meaning: string;
const decklist: string[] = [
	"/novel",
	"/vocabulary-list",
	"/textbook",
	"/anime",
	"/youtube-video",
	"/live-action",
	"/video-game",
	"/web-novel",
	"/visual-novel",
	"/audio",
];
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "jpdb",
		smallImageText: "jpdb.io",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.hostname === "jpdb.io") {
		if (document.location.pathname.includes("/learn")) {
			presenceData.details = "Viewing learn page";
			dueCountElem =
				document.querySelector('a[href="/learn"]').firstElementChild;
			if (dueCountElem.getAttribute("style") === "color: green;")
				presenceData.state = `New : ${dueCountElem.textContent}\n items`;
			else presenceData.state = `Due : ${dueCountElem.textContent}\n items`;
		} else if (document.location.pathname.includes("/review")) {
			presenceData.details = "Reviewing cards";
			dueCountElem =
				document.querySelector('a[href="/learn"]').firstElementChild;
			if (dueCountElem.getAttribute("style") === "color: green;")
				presenceData.state = `New : ${dueCountElem.textContent}\n items`;
			else presenceData.state = `Due : ${dueCountElem.textContent}\n items`;
		} else if (document.location.pathname.includes("/search")) {
			if (document.querySelector("div.results.search")) {
				presenceData.details = "Searching:";
				query = decodeURI(
					new URLSearchParams(document.location.search).get("q")
				);
				presenceData.state = query;
			} else {
				if (document.querySelector("div.result.kanji")) {
					presenceData.details = "Viewing a kanji:";
					query = new URLSearchParams(document.location.search).get("q");
					meaning = decodeURI(
						document.querySelector(
							"div.result.kanji > div.vbox.gap > div.hbox > div.vbox.gap > div > div"
						).textContent
					);
					presenceData.state = `${query} - ${meaning}`;
				}
				if (document.querySelector("div.result.vocabulary")) {
					presenceData.details = "Viewing a word:";
					query = decodeURI(
						new URLSearchParams(document.location.search).get("q")
					);
					presenceData.state = query;
				}
			}
		} else if (document.location.pathname.includes("/vocabulary/")) {
			presenceData.details = "Viewing a word:";
			query = decodeURI(document.location.pathname.split("/")[3]);
			presenceData.state = query;
		} else if (document.location.pathname.includes("/kanji")) {
			presenceData.details = "Viewing a kanji:";
			query = decodeURI(document.location.pathname.split("/")[2]);
			presenceData.state = query;
		} else if (
			decklist.some(deck => document.location.pathname.includes(deck))
		) {
			presenceData.details = "Viewing pre-built deck";
			deckTitle = document.querySelector("h3").textContent;
			presenceData.state = deckTitle;
		} else if (document.location.pathname.includes("/deck")) {
			presenceData.details = "Viewing a deck";
			deckTitle = document.querySelector(
				"div.container.bugfix > div:nth-child(2)"
			).textContent;
			presenceData.state = deckTitle;
		} else if (document.location.pathname.includes("/prebuilt_decks"))
			presenceData.details = "Finding pre-built deck";
		else if (document.location.pathname === "/")
			presenceData.details = "Viewing home page";
		else if (document.location.pathname.includes("/stats"))
			presenceData.details = "Viewing stats";
		else if (document.location.pathname.includes("/quiz"))
			presenceData.details = "Taking quizes";
		else if (document.location.pathname.includes("/leaderboard"))
			presenceData.details = "Viewing leaderboard";
		else if (document.location.pathname.includes("/settings"))
			presenceData.details = "Viewing settings page";
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
