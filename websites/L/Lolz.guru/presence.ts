const presence = new Presence({
		clientId: "935242142106914869",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

function pathIncludes(string: string): boolean {
	return document.location.pathname.toLowerCase().includes(string);
}

async function getStrings() {
	return presence.getStrings(
		{
			readingThread: "general.readingThread",
			reading: "general.reading",
			viewProfileButton: "general.buttonViewProfile",
			viewProfile: "general.viewProfile",
			search: "general.searchSomething",
			terms: "general.terms",
			dm: "general.readingDM",
			viewPage: "general.viewPage",
			viewHome: "general.viewHome",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: "logo" },
		newLang = await presence.getSetting<string>("lang").catch(() => "en");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (true) {
		case pathIncludes("/threads"):
			presenceData.details = (await strings).readingThread;
			presenceData.state = document.querySelector(
				"#content > div > div > div.titleBar > h1"
			)?.textContent;
			presenceData.buttons = [
				{
					label: "Open",
					url: document.location.href,
				},
			];
			presenceData.startTimestamp = browsingTimestamp;
			break;

		case pathIncludes("/threads") ||
			pathIncludes("/guarantor") ||
			pathIncludes("/service") ||
			pathIncludes("/antipublic"):
			presenceData.details = (await strings).readingThread;
			presenceData.state = document.querySelector(
				"#content > div > div > div.titleBar > h1"
			)?.textContent;
			presenceData.buttons = [
				{
					label: "Open",
					url: document.location.href,
				},
			];
			presenceData.startTimestamp = browsingTimestamp;
			break;
		case pathIncludes("/search"):
			presenceData.details = (await strings).search;
			break;
		case pathIncludes("/rules") || pathIncludes("/help"):
			presenceData.details = (await strings).reading;
			presenceData.state = (await strings).terms;
			presenceData.startTimestamp = browsingTimestamp;
			break;
		case pathIncludes("/conversations"):
			presenceData.details = `${(await strings).dm} ${
				document.querySelector(
					"#Conversations > div.conversationViewContainer.ImView > div.ImViewContent > div > div.ImDialogHeader > div.membersAndActions > div.fl_l.conversationRecipient > a > span"
				).textContent
			}`;
			presenceData.startTimestamp = browsingTimestamp;
			break;
		default:
			presenceData.details = (await strings).viewHome;
			presenceData.startTimestamp = browsingTimestamp;
			break;
	}
	if (
		document.querySelector("#page_info_wrap > div.page_top > h1")?.textContent
	) {
		presenceData.details = (await strings).viewProfile;
		presenceData.state = document.querySelector(
			"#page_info_wrap > div.page_top > h1"
		).textContent;
		presenceData.buttons = [
			{
				label: (await strings).viewProfileButton,
				url: document.location.href,
			},
		];
		presenceData.startTimestamp = browsingTimestamp;
	}
	if (
		!pathIncludes("/reports") &&
		!pathIncludes("/search") &&
		document.querySelector(
			"#content > div > div > div > div > div.titleBar > h1"
		)?.textContent
	) {
		presenceData.details = `${(await strings).viewPage} ${
			document.querySelector(
				"#content > div > div > div > div > div.titleBar > h1"
			)?.textContent
		}`;
		presenceData.startTimestamp = browsingTimestamp;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
