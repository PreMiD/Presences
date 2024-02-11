const presence = new Presence({ clientId: "739908991274057870" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/J/Juniperbot/assets/logo.png",
	Stats = "https://cdn.rcd.gg/PreMiD/websites/J/Juniperbot/assets/0.png",
	Donate = "https://cdn.rcd.gg/PreMiD/websites/J/Juniperbot/assets/1.png",
	List = "https://cdn.rcd.gg/PreMiD/websites/J/Juniperbot/assets/2.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: Assets.Logo },
		newLang = await presence.getSetting<string>("lang").catch(() => "en");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (host === "juniper.bot") {
		presenceData.startTimestamp = browsingTimestamp;

		switch (true) {
			case pathIncludes("/ranking/"):
				presenceData.details = strings.leaderboard;
				presenceData.state = document.querySelector(
					".guild--info h1.font-weight-thin.display-2"
				).textContent;
				presenceData.smallImageKey = Assets.List;
				break;
			case pathIncludes("/dashboard/"):
				presenceData.details = strings.serverdash;
				presenceData.state = strings.serverdashname.replace(
					"{0}",
					document.querySelector(".guild--info h1.font-weight-thin.display-2")
						.textContent
				);
				break;

			case pathIncludes("/donate"):
				presenceData.details = strings.donate;
				presenceData.smallImageKey = Assets.Donate;
				break;

			case pathIncludes("/servers"):
				presenceData.details = strings.servers;
				presenceData.smallImageKey = Assets.List;
				break;

			case pathIncludes("/commands"):
				presenceData.details = strings.commands;
				presenceData.smallImageKey = Assets.List;
				break;

			case pathIncludes("/status"):
				presenceData.details = strings.stats;
				presenceData.smallImageKey = Assets.Stats;
				break;

			case pathIncludes("/user/card"):
				presenceData.details = strings.usercard;
				break;

			case pathIncludes("/terms"):
				presenceData.details = `${strings.reading} ${strings.terms}`;
				presenceData.smallImageKey = Assets.List;
				break;

			case pathIncludes("/cookie"):
				presenceData.details = `${strings.reading} ${strings.cookies}`;
				presenceData.smallImageKey = Assets.List;
				break;

			case pathIncludes("/privacy"):
				presenceData.details = `${strings.reading} ${strings.privacy}`;
				presenceData.smallImageKey = Assets.List;
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
		presenceData.smallImageKey = Assets.List;
	}
	if (host === "feedback.juniper.bot") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.state = "feedback.juniper.bot";
		switch (true) {
			case pathIncludes("/posts/"):
				presenceData.details = `${strings.reading} ${
					document.querySelector(".post-header h1").textContent
				}`;
				break;
			default:
				presenceData.details = strings.viewMainPage;
				break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
