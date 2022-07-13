const presence = new Presence({
		clientId: "937622209260826664",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let office = {
	OneNoteSubtopic: "Selecting a subtopic",
	OneNoteTitle: "Selecting a note",
	WordStatus: "Page ? of ?",
	PptCurrentSlide: "Slide ? of ?",
	ExcelActiveTab: "",
};

presence.on(
	"iFrameData",
	(data: {
		OneNoteSubtopic: string;
		OneNoteTitle: string;
		WordStatus: string;
		PptCurrentSlide: string;
		ExcelActiveTab: string;
	}) => {
		office = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "office",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		privacy = await presence.getSetting<boolean>("privacy");
	if (hostname === "www.office.com") {
		presenceData.details = "Home page";
		if (pathname.startsWith("/launch/")) {
			presenceData.details = `Browsing ${document.title} documents`;
			presenceData.smallImageKey = "reading";
			presenceData.smallImageText = "Browsing";
		} else if (pathname.startsWith("/search")) {
			presenceData.smallImageKey = "search";
			presenceData.smallImageText = "Searching";
			presenceData.details = "Searching...";
			if (!privacy) {
				presenceData.details = "Searching for:";
				presenceData.state = document.querySelector<HTMLInputElement>(
					"#ms-searchux-input-0"
				).value;
			}
		}
	} else {
		const appIcon = document
				.querySelector('link[rel~="icon"]')
				.getAttribute("href"),
			appName = appIcon
				.substring(appIcon.lastIndexOf("/") + 9)
				.replace(".ico", "")
				.toLowerCase();
		if (appName === "onenote") {
			presenceData.largeImageKey = appName;
			presenceData.details = "Editing a Note";
			if (!privacy) {
				presenceData.details = `Editing ${office.OneNoteTitle}`;
				presenceData.state = `in ${office.OneNoteSubtopic}`;
			}
			presenceData.smallImageKey = "writing";
			presenceData.smallImageText = "Editing";
		} else if (appName === "word" || appName === "excel" || appName === "ppt") {
			presenceData.largeImageKey = appName;
			presenceData.smallImageKey = "writing";
			presenceData.smallImageText = "Editing";
			presenceData.details = `Editing ${appName
				.replace("word", "a Word")
				.replace("excel", "an Excel")
				.replace("ppt", "a PowerPoint")} document`;
			if (!privacy) {
				presenceData.details = `Editing ${document
					.querySelector('meta[name="title"]')
					.getAttribute("content")}`;
				if (appName === "word") presenceData.state = office.WordStatus;
				else if (appName === "ppt") presenceData.state = office.PptCurrentSlide;
				else if (appName === "excel" && office.ExcelActiveTab !== "")
					presenceData.state = office.ExcelActiveTab;
			}
		}
	}
	presence.setActivity(presenceData);
});
