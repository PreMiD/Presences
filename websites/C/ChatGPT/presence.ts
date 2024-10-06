const presence = new Presence({ clientId: "1102935778570547282" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/ChatGPT/assets/logo.png",
	Talking = "https://cdn.rcd.gg/PreMiD/websites/C/ChatGPT/assets/0.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		showTitle = await presence.getSetting<boolean>("showTitle"),
		isTalking = document.querySelector(
			'[class*="text-2xl"] > span:nth-child(3)'
		);

	let wordCount = 0;
	for (const element of document.querySelectorAll(
		'[data-message-author-role="user"],[data-message-author-role="assistant"]'
	)) {
		const text = element.textContent
			.replace(/(, )|(,\n)|(,)|([.] )|([.])/gm, " ")
			.replace(/([0-9]*)|(\/)|(')|(,)|( )/gm, "");
		wordCount += text.split(" ").slice(2, text.split(" ").length).length;
	}

	if (pathname.split("/")[1] === "c") {
		// check if the document title is the default title. If so, get the chat title from the UI. Otherwise, get it from the document title
		if (document.title === "ChatGPT" && showTitle) {
			presenceData.details = document.querySelector(
				`[href="/c/${pathname.split("/")[2]}"]`
			)?.textContent;
		} else {
			presenceData.details = showTitle
				? document.title
				: "Talking with AI about something";
		}
		presenceData.state = isTalking
			? "AI is responding..."
			: `asked (${Number(
					document.querySelectorAll('[data-message-author-role="user"]').length
			  )}) times | (${wordCount}) words`;
		presenceData.smallImageKey = isTalking ? Assets.Talking : null;
	} else {
		presenceData.details = "Start new conversation";
		presenceData.state = "Thinking of a new prompt...";
	}

	presence.setActivity(presenceData);
});
