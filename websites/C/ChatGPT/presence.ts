const presence = new Presence({ clientId: "1102935778570547282" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/qw4f6EN.png",
	Talking = "https://i.imgur.com/hSv055V.png",
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
		'[class*="flex flex-col items-center"] > *'
	)) {
		const text = element.textContent
			.replace(/(, )|(,\n)|(,)|([.] )|([.])/gm, " ")
			.replace(/([0-9]*)|(\/)|(')|(,)|( )/gm, "");
		wordCount += text.split(" ").slice(2, text.split(" ").length).length;
	}

	if (pathname.split("/")[1] === "c") {
		presenceData.details = showTitle
			? document.querySelector("li a button > svg")?.closest("li").textContent
			: "Talking with AI about something";
		presenceData.state = isTalking
			? "AI is responding..."
			: `asked (${
					Number(document.querySelectorAll('[class*="group w-full"]').length) /
					2
			  }) times | (${wordCount}) words`;
		presenceData.smallImageKey = isTalking ? Assets.Talking : null;
	} else {
		presenceData.details = "Start new conversation";
		presenceData.state = "Thinking of a new prompt...";
	}

	presence.setActivity(presenceData);
});
