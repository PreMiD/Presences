const presence = new Presence({ clientId: "739908991274057870" }),
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
const host = document.location.hostname;

async function getStrings() {
	return presence.getStrings(
		{
			reading: "general.readingAbout",
			leaderboard: "juniperbot.leaderboard",
			viewMainPage: "juniperbot.mainpage",
			serverdash: "juniperbot.serverdash",
			serverdashname: "juniperbot.serverdashname",
			donate: "juniperbot.donate",
			servers: "juniperbot.servers",
			commands: "juniperbot.commands",
			stats: "juniperbot.stats",
			usercard: "juniperbot.usercard",
			terms: "general.terms",
			privacy: "general.privacy",
			cookies: "juniperbot.cookies",
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

	if (host === "juniper.bot") {
		presenceData.startTimestamp = browsingTimestamp;

		switch (true) {
			case pathIncludes("/ranking/"):
				presenceData.details = (await strings).leaderboard;
				presenceData.state = document.querySelector(
					".guild--info h1.font-weight-thin.display-2"
				).textContent;
				presenceData.smallImageKey = "list";
				break;
			case pathIncludes("/dashboard/"):
				presenceData.details = (await strings).serverdash;
				presenceData.state = (await strings).serverdashname.replace(
					"{0}",
					document.querySelector(".guild--info h1.font-weight-thin.display-2")
						.textContent
				);
				break;

			case pathIncludes("/donate"):
				presenceData.details = (await strings).donate;
				presenceData.smallImageKey = "donate";
				break;

			case pathIncludes("/servers"):
				presenceData.details = (await strings).servers;
				presenceData.smallImageKey = "list";
				break;

			case pathIncludes("/commands"):
				presenceData.details = (await strings).commands;
				presenceData.smallImageKey = "list";
				break;

			case pathIncludes("/status"):
				presenceData.details = (await strings).stats;
				presenceData.smallImageKey = "stats";
				break;

			case pathIncludes("/user/card"):
				presenceData.details = (await strings).usercard;
				break;

			case pathIncludes("/terms"):
				presenceData.details = `${(await strings).reading} ${
					(await strings).terms
				}`;
				presenceData.smallImageKey = "list";
				break;

			case pathIncludes("/cookie"):
				presenceData.details = `${(await strings).reading} ${
					(await strings).cookies
				}`;
				presenceData.smallImageKey = "list";
				break;

			case pathIncludes("/privacy"):
				presenceData.details = `${(await strings).reading} ${
					(await strings).privacy
				}`;
				presenceData.smallImageKey = "list";
				break;

			default:
				presenceData.details = "Main page";
				break;
		}
	}
	if (host === "docs.juniper.bot") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = document.title;
		presenceData.state = "docs.juniper.bot";
		presenceData.smallImageKey = "list";
	}
	if (host === "feedback.juniper.bot") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.state = "feedback.juniper.bot";
		switch (true) {
			case pathIncludes("/posts/"):
				presenceData.details = `${(await strings).reading} ${
					document.querySelector(".post-header h1").textContent
				}`;
				break;
			default:
				presenceData.details = (await strings).viewMainPage;
				break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
