const presence = new Presence({
		clientId: "630478614894477337",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

const enum Assets {
	DocsLogo = "https://cdn.rcd.gg/PreMiD/websites/G/Google%20Docs/assets/0.png",
	FormsLogo = "https://cdn.rcd.gg/PreMiD/websites/G/Google%20Docs/assets/1.png",
	SheetsLogo = "https://cdn.rcd.gg/PreMiD/websites/G/Google%20Docs/assets/2.png",
	SlidesLogo = "https://cdn.rcd.gg/PreMiD/websites/G/Google%20Docs/assets/3.png",
}

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
		presenceData.largeImageKey = Assets.DocsLogo;
		if (document.location.pathname.includes("/edit"))
			presenceData.details = strings.editingDoc;
		else if (document.location.pathname.includes("/document/u/"))
			presenceData.details = strings.browsingDoc;
		else presenceData.details = strings.viewingDoc;
	} else if (document.location.pathname.includes("/forms/")) {
		presenceData.largeImageKey = Assets.FormsLogo;
		if (document.location.pathname.includes("/edit"))
			presenceData.details = strings.editingForm;
		else if (document.location.pathname.includes("/forms/u/"))
			presenceData.details = strings.browsingForm;
		else presenceData.details = strings.viewingForm;
	} else if (document.location.pathname.includes("/spreadsheets")) {
		presenceData.largeImageKey = Assets.SheetsLogo;
		if (document.location.pathname.includes("/edit"))
			presenceData.details = strings.editingSheet;
		else if (document.location.pathname.includes("/spreadsheets/u/"))
			presenceData.details = strings.browsingSheet;
		else presenceData.details = strings.viewingSheet;
	} else if (document.location.pathname.includes("/presentation/")) {
		presenceData.largeImageKey = Assets.SlidesLogo;
		if (document.location.pathname.includes("/edit"))
			presenceData.details = strings.editingPresentation;
		else if (document.location.pathname.includes("/presentation/u/"))
			presenceData.details = strings.browsingPresentation;
		else presenceData.details = strings.vieiwngPresentation;
	}

	if (!privacy) presenceData.state = title;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
