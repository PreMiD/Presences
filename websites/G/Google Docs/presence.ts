const presence = new Presence({
		clientId: "630478614894477337",
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

let title: string;

async function getStrings() {
	return presence.getStrings(
		{
			editingDoc: "google docs.editingDoc",
			viewingDoc: "google docs.viewingDoc",
			browsingDoc: "google docs.browsingDoc",
			editingForm: "google docs.editingForm",
			viewingForm: "google docs.viewingForm",
			browsingForm: "google docs.browsingForm",
			editingSheet: "google docs.editingSheet",
			viewingSheet: "google docs.viewingSheet",
			browsingSheet: "google docs.browsingSheet",
			editingPresentation: "google docs.editingPresentation",
			browsingPresentation: "google docs.browsingPresentation",
			vieiwngPresentation: "google docs.viewingPresentation",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting<boolean>("privacy"),
		newLang = await presence.getSetting<string>("lang").catch(() => "en");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	title = document.title
		.replace("- Google Docs", "")
		.replace("- Google Forms", "")
		.replace("- Google Sheets", "")
		.replace("- Google Slides", "");

	if (document.location.pathname.includes("/document")) {
		presenceData.largeImageKey = "docslogo";
		if (document.location.pathname.includes("/edit"))
			presenceData.details = (await strings).editingDoc;
		else if (document.location.pathname.includes("/document/u/"))
			presenceData.details = (await strings).browsingDoc;
		else presenceData.details = (await strings).viewingDoc;
	} else if (document.location.pathname.includes("/forms/")) {
		presenceData.largeImageKey = "formslogo";
		if (document.location.pathname.includes("/edit"))
			presenceData.details = (await strings).editingForm;
		else if (document.location.pathname.includes("/forms/u/"))
			presenceData.details = (await strings).browsingForm;
		else presenceData.details = (await strings).viewingForm;
	} else if (document.location.pathname.includes("/spreadsheets")) {
		presenceData.largeImageKey = "sheetslogo";
		if (document.location.pathname.includes("/edit"))
			presenceData.details = (await strings).editingSheet;
		else if (document.location.pathname.includes("/spreadsheets/u/"))
			presenceData.details = (await strings).browsingSheet;
		else presenceData.details = (await strings).viewingSheet;
	} else if (document.location.pathname.includes("/presentation/")) {
		presenceData.largeImageKey = "slideslogo";
		if (document.location.pathname.includes("/edit"))
			presenceData.details = (await strings).editingPresentation;
		else if (document.location.pathname.includes("/presentation/u/"))
			presenceData.details = (await strings).browsingPresentation;
		else presenceData.details = (await strings).vieiwngPresentation;
	}

	if (!privacy) presenceData.state = title;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
