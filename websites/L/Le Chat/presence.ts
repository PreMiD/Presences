const presence = new Presence({
		clientId: "1338859356497641503",
	}),
	getStrings = async () => {
		return presence.getStrings({
			play: "presence.playback.playing",
			pause: "presence.playback.paused",
			newPrompt: "leChat.startingPrompt",
			talkingWithAi: "leChat.talkingWithAi",
			readingResponse: "leChat.readingResponse",
			askingQuestion: "leChat.askingQuestion",
		});
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/CzKaHyo.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		showTitle = await presence.getSetting<boolean>("showTitle");

	let presenceDetail: string, presenceState: string;

	const strings = await getStrings();

	if (pathname === "/chat") presenceDetail = strings.newPrompt;
	else if (pathname.includes("/chat/")) {
		presenceDetail = showTitle
			? document.querySelector('a[aria-label="Open chat"]>div').textContent
			: strings.talkingWithAi;
	} else presenceDetail = strings.talkingWithAi;

	// Checking if the user is currently typing a question
	if (document.querySelector("textarea").textContent !== "")
		presenceState = strings.askingQuestion;
	else if (
		document.querySelector(
			"div[class='flex h-fit w-full flex-col'] > div:last-child[style*='transform:none']"
		)
	)
		presenceState = strings.readingResponse;
	else presenceState = null;

	presence.setActivity({
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		details: presenceDetail,
		state: presenceState,
	});
});
