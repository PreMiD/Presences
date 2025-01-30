const presence = new Presence({
		clientId: "1333939310441009182",
	}),
	getStrings = async () => {
		return presence.getStrings({
			play: "general.playing",
			pause: "general.paused",
			newPrompt: "deepSeek.startingPrompt",
			talkingWithAi: "deepSeek.talkingWithAi",
			aiTalking: "deepSeek.aiTalking",
			readingResponse: "deepSeek.readingResponse",
			askingQuestion: "deepSeek.askingQuestion",
		});
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

let oldLang: string = null,
	strings: Awaited<ReturnType<typeof getStrings>>;

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/aP2g0Og.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		[showTitle, newLang] = await Promise.all([
			presence.getSetting<boolean>("showTitle"),
			presence.getSetting<string>("lang").catch(() => "en"),
		]);

	let presenceDetail: string, presenceState: string;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (pathname === "/") presenceDetail = strings.newPrompt;
	else if (pathname.includes("/a/chat/s")) {
		presenceDetail = showTitle
			? document.querySelector("div.d8ed659a").textContent
			: strings.talkingWithAi;
	} else presenceDetail = strings.talkingWithAi;

	// Used for checking if the AI is currently responding

	// Checking if the user is currently typing a question
	if (document.querySelector("#chat-input").textContent !== "")
		presenceState = strings.askingQuestion;
	else if (document.querySelector("div[class='f9bf7997 d7dc56a8']"))
		presenceState = strings.aiTalking;
	else if (document.querySelector("div.f9bf7997.d7dc56a8.c05b5566"))
		presenceState = strings.readingResponse;
	else presenceState = null;

	presence.setActivity({
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		details: presenceDetail,
		state: presenceState,
	});
});
