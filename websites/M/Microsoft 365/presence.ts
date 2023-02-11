const presence = new Presence({
		clientId: "937622209260826664",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let microsoft = {
	OneNoteSubtopic: "Selecting a subtopic",
	OneNoteTitle: "Selecting a note",
	WordStatus: "Page ? of ?",
	PptCurrentSlide: "Slide ? of ?",
	ExcelActiveTab: "",
};

enum Assets {
	Excel = "https://i.imgur.com/Vm9mwZG.png",
	Microsoft = "https://i.imgur.com/E2tzaTW.png",
	OneNote = "https://i.imgur.com/LqrhRhD.png",
	PowerPoint = "https://i.imgur.com/GAiZFPR.png",
	Read = "https://i.imgur.com/wPUmqu5.png",
	Search = "https://i.imgur.com/oGQtnIY.png",
	Word = "https://i.imgur.com/Ec78aqz.png",
	Writing = "https://i.imgur.com/RImaCYq.png",
}

presence.on(
	"iFrameData",
	(data: {
		OneNoteSubtopic: string;
		OneNoteTitle: string;
		WordStatus: string;
		PptCurrentSlide: string;
		ExcelActiveTab: string;
	}) => {
		microsoft = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Microsoft,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		privacy = await presence.getSetting<boolean>("privacy"),
		appIcon = document.querySelector('link[rel~="icon"]')?.getAttribute("href");
	if (hostname === "www.office.com") {
		if (
			pathname.startsWith("/launch/") ||
			document.querySelector('[aria-pressed="true"]')
		) {
			presenceData.largeImageKey =
				Assets[
					document.querySelector('[aria-pressed="true"]')
						?.textContent as keyof typeof Assets
				] ?? Assets.Microsoft;
			presenceData.details = `Browsing ${
				document.title.split("|")[0]
			} documents`;
			presenceData.smallImageKey = Assets.Read;
			presenceData.smallImageText = "Browsing";
		} else if (pathname.startsWith("/search")) {
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
			presenceData.details = "Searching...";
			if (!privacy) {
				presenceData.details = "Searching for:";
				presenceData.state = document.querySelector<HTMLInputElement>(
					"#ms-searchux-input-0"
				).value;
			}
		}
	} else if (
		appIcon.match(/(word)|(onenote)|(microsoft365)|(ppt)|(excel)|(word)/gm)
	) {
		const appName = appIcon
			.substring(appIcon.lastIndexOf("/") + 9)
			.replace(".ico", "")
			.toLowerCase()
			.replace("onenote", "OneNote")
			.replace("ppt", "PowerPoint")
			.replace("word", "Word")
			.replace("excel", "Excel");
		presenceData.largeImageKey =
			Assets[appName as keyof typeof Assets] ?? Assets.Microsoft;
		presenceData.smallImageKey = Assets.Writing;
		presenceData.smallImageText = "Editing";
		if (appName === "OneNote") {
			presenceData.details = "Editing a Note";
			if (!privacy) {
				presenceData.details = `Editing ${microsoft.OneNoteTitle}`;
				presenceData.state = `in ${microsoft.OneNoteSubtopic}`;
			}
		} else if (
			appName === "Word" ||
			appName === "Excel" ||
			appName === "PowerPoint"
		) {
			presenceData.details = `Editing ${appName
				.replace("Word", "a Word")
				.replace("Excel", "an Excel")
				.replace("PowerPoint", "a PowerPoint")} document`;
			if (!privacy) {
				presenceData.details = `Editing ${
					document.querySelector('[name="fileName"]')?.getAttribute("value") ??
					document.querySelector("title")?.textContent?.split(".")[0]
				}`;
				if (appName === "Word") presenceData.state = microsoft.WordStatus;
				else if (appName === "PowerPoint")
					presenceData.state = microsoft.PptCurrentSlide;
				else if (appName === "Excel" && !microsoft.ExcelActiveTab)
					presenceData.state = microsoft.ExcelActiveTab;
			}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
});
