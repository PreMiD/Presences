const presence = new Presence({
		clientId: "1102935778570547282",
	}),
	getStrings = async () => {
		return presence.getStrings(
			{
				aiResponding: "chatgpt.aiResponding",
				conversationStats: "chatgpt.conversationStats",
				startNewConversation: "chatgpt.startNewConversation",
				talkingWithAI: "chatgpt.talkingWithAI",
				thinkingOfPrompt: "chatgpt.thinkingOfPrompt",
			},
		);
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

let oldLang: string = null,
	strings: Awaited<ReturnType<typeof getStrings>>;

const enum Assets {
	Talking = "https://cdn.rcd.gg/PreMiD/websites/C/ChatGPT/assets/0.png",
	Logo = "https://i.imgur.com/24lgju4.png",
	Dark = "https://i.imgur.com/NuNjxsu.png",
	Old = "https://i.imgur.com/YW25Euf.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		[lang, showTitle, logoType] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("showTitle"),
			presence.getSetting<number>("logo"),
		]);

	if (oldLang !== lang) {
		oldLang = lang;
		strings = await getStrings();
	}

	const presenceData: PresenceData = {
			largeImageKey:
				[Assets.Logo, Assets.Dark, Assets.Old][logoType] || Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		isTalking = document.querySelector(
			".gap-x-1 > div > button[data-testid=stop-button]"
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
		} else
			presenceData.details = showTitle ? document.title : strings.talkingWithAI;

		presenceData.state = isTalking
			? strings.aiResponding
			: strings.conversationStats
					.replace(
						"{0}",
						`${Number(
							document.querySelectorAll('[data-message-author-role="user"]')
								.length
						)}`
					)
					.replace("{1}", `${wordCount}`);
		presenceData.smallImageKey = isTalking ? Assets.Talking : null;
	} else {
		presenceData.details = strings.startNewConversation;
		presenceData.state = strings.thinkingOfPrompt;
	}

	presence.setActivity(presenceData);
});
