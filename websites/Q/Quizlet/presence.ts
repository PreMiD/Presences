const presence = new Presence({
	clientId: "719784356725653504",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

interface QuizletData {
	layer?: {
		path?: string;
		event: string;

		studyableTitle?: string;
		studyableType?: string;
	};
	searchLayer?: {
		search_term: string;
	};
}
/* eslint-enable camelcase */

let qzData: QuizletData = null,
	actionTimestamp: number = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/5K8iXcX.png",
		},
		buttons = await presence.getSetting<boolean>("buttons");

	if (qzData?.layer) {
		const pathSplits = qzData.layer.path.split("/");
		switch (pathSplits[0]) {
			case "StudyFeed":
				presenceData.details = "Dashboard";
				actionTimestamp = null;
				break;
			case "Settings":
				presenceData.details = "Settings";
				actionTimestamp = null;
				break;
			case "Profile":
				presenceData.details = "Viewing profile";
				presenceData.state = document.querySelector(
					".ProfileHeader-username"
				).textContent;
				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Profile",
							url: document.URL,
						},
					];
				}
				actionTimestamp = null;
				break;
			case "Topic":
				presenceData.details = "Browsing sets on";
				presenceData.state = document.querySelector("h1").textContent;
				actionTimestamp = null;
				break;
			case "Search":
				presenceData.smallImageKey = Assets.Search;
				presenceData.smallImageText = "Searching";
				presenceData.details = "Searching";
				presenceData.state = qzData.searchLayer.search_term;
				actionTimestamp = null;
				break;
			case "Sets":
				switch (pathSplits[1]) {
					case "show":
						actionTimestamp ??= Date.now();
						presenceData.details = "Viewing a set";
						presenceData.state = qzData.layer.studyableTitle;
						if (buttons) {
							presenceData.buttons = [
								{
									label: "View Set",
									url: document.URL,
								},
							];
						}
						break;
					case "new":
						presenceData.details = "Creating a set";
						actionTimestamp = null;
						break;
				}
				break;
			case "Gravity": // Set > Gravity
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = "gravity";
				presenceData.smallImageText = "Gravity";
				presenceData.details = "Playing Gravity";
				presenceData.state = `with "${qzData.layer.studyableTitle}" set`;
				break;
			case "Match": // Set > Match
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = "match";
				presenceData.smallImageText = "Match";
				presenceData.details = "Playing Match";
				presenceData.state = `with "${qzData.layer.studyableTitle}" set`;
				break;
			case "LiveGame": // Set > Live
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = "live";
				presenceData.smallImageText = "Quizlet Live";
				presenceData.details = "Hosting a live game";
				presenceData.state = `with "${qzData.layer.studyableTitle}" set`;
				break;
			case "Assistant": // Set > Learn
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = "learn";
				presenceData.smallImageText = "Learn";
				presenceData.details = "Learning set";
				presenceData.state = qzData.layer.studyableTitle;
				break;
			case "Cards": // Set > Flashcards
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = "flashcards";
				presenceData.smallImageText = "Flashcards";
				presenceData.details = "Reviewing flashcards";
				presenceData.state = `on ${qzData.layer.studyableTitle}`;
				break;
			case "Test": // Set > Test
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = "test";
				presenceData.smallImageText = "Test";
				presenceData.details = "Testing";
				presenceData.state = `on ${qzData.layer.studyableTitle}`;
				break;
			case "Learn": // Set > Write
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = Assets.Writing;
				presenceData.smallImageText = "Writing";
				presenceData.details = "Writing";
				presenceData.state = `on ${qzData.layer.studyableTitle}`;
				break;
			case "Spell": // Set > Spell
				actionTimestamp ??= Date.now();
				presenceData.smallImageKey = "spell";
				presenceData.smallImageText = "Spell";
				presenceData.details = "Spelling";
				presenceData.state = `on ${qzData.layer.studyableTitle}`;
				break;
		}
		presenceData.startTimestamp = actionTimestamp;
	}

	// If data doesn't exist clear else set activity to the presence data
	if (!presenceData.details) {
		// Clear tray
		presence.setActivity(); // Clear activity
	} else presence.setActivity(presenceData);
});

presence.on("iFrameData", (data: QuizletData) => {
	qzData = data;
});
