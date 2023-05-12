const presence = new Presence({
		clientId: "808667100319186964",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			categoryPrimary: "gmail.categoryPrimary",
			categorySocial: "gmail.categorySocial",
			categoryUpdates: "gmail.categoryUpdates",
			categoryPromotions: "gmail.categoryPromotions",
			categoryForum: "gmail.categoryForum",
			inLabel: "gmail.inLabel",
			generalSettings: "gmail.generalSettings",
			labelSettings: "gmail.labelSettings",
			inboxSettings: "gmail.inboxSettings",
			accountSetting: "gmail.accountSetting",
			filterSettings: "gmail.filterSettings",
			fwdAndPOPSettings: "gmail.fwdAndPOPSettings",
			addonsSettings: "gmail.addonsSettings",
			chatSettings: "gmail.chatSettings",
			advancedSettings: "gmail.advancedSettings",
			offlineSettings: "gmail.offlineSettings",
			themesSettings: "gmail.themesSettings",
			lookingForEmail: "gmail.lookingForEmail",
			viewingEmail: "gmail.viewingEmail",
			viewingStarredEmails: "gmail.viewingStarredEmails",
			viewingSentEmails: "gmail.viewingSentEmails",
			viewingSnoozedEmails: "gmail.viewingSnoozedEmails",
			viewingDrafts: "gmail.viewingDrafts",
			viewingImportantEmails: "gmail.viewingImportantEmails",
			viewingTrash: "gmail.viewingTrash",
			viewingChats: "gmail.viewingChats",
			viewingScheduled: "gmail.viewingScheduled",
			viewingSpam: "gmail.viewingSpam",
			viewingAllEmails: "gmail.viewingAllEmails",
			composingEmail: "gmail.composingEmail",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ZvjZHER.png",
			startTimestamp: browsingTimestamp,
		},
		path = window.location.href,
		[newLang, privacy, time] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
		]);

	if (!time) delete presenceData.startTimestamp;
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const pages: Record<string, string> = {
			"category/primary": strings.categoryPrimary,
			"category/social": strings.categorySocial,
			"category/updates": strings.categoryUpdates,
			"category/promotions": strings.categoryPromotions,
			"category/forum": strings.categoryForum,
			"settings/general": strings.generalSettings,
			settings: strings.generalSettings,
			"settings/labels": strings.labelSettings,
			"settings/inbox": strings.inboxSettings,
			"settings/accounts": strings.accountSetting,
			"settings/filters": strings.filterSettings,
			"settings/fwdandpop": strings.fwdAndPOPSettings,
			"settings/addons": strings.addonsSettings,
			"settings/chat": strings.chatSettings,
			"settings/advanced": strings.advancedSettings,
			"settings/offline": strings.offlineSettings,
			"settings/oldthemes": strings.themesSettings,
			inbox: strings.categoryPrimary,
			starred: strings.viewingStarredEmails,
			snoozed: strings.viewingSnoozedEmails,
			sent: strings.viewingSentEmails,
			drafts: strings.viewingDrafts,
			imp: strings.viewingImportantEmails,
			chats: strings.viewingChats,
			scheduled: strings.viewingScheduled,
			all: strings.viewingAllEmails,
			spam: strings.viewingSpam,
			trash: strings.viewingTrash,
		},
		currentPage = path.split("#")[1];

	if (pages[currentPage]) presenceData.details = pages[currentPage];
	else if (path.includes("compose="))
		presenceData.details = strings.composingEmail;
	else if (path.match("#search"))
		presenceData.details = strings.lookingForEmail;
	else if (path.match("#label")) {
		presenceData.details = strings.inLabel;
		if (!privacy) {
			presenceData.state = document
				.querySelector<HTMLDivElement>("div.aim.ain > div")
				.getAttribute("data-tooltip");
		}
	} else presenceData.details = strings.viewingEmail;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
