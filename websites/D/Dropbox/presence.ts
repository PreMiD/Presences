const presence = new Presence({
	clientId: "777578842172162068",
});

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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/oFRDuay.png",
		},
		showFileNames = await presence.getSetting<boolean>("showFileNames");

	if (document.location.pathname === "/")
		presenceData.details = "Viewing homepage";
	else if (document.location.pathname.startsWith("/login"))
		presenceData.details = "Logging-in";
	else if (document.location.pathname.startsWith("/plans"))
		presenceData.details = "Choosing new plan";
	else if (document.location.search.startsWith("?preview")) {
		presenceData.details = "Previewing a file";
		if (showFileNames) {
			presenceData.state =
				document.querySelector(".filename--text").textContent;
		}
	} else if (
		document.location.pathname.startsWith("/h") ||
		document.location.pathname.startsWith("/home")
	) {
		const currentFolder = document.querySelector(".page-header-text > h2");
		if (currentFolder) {
			presenceData.details = "Viewing folder";
			if (showFileNames) presenceData.state = currentFolder.textContent;
		} else {
			presenceData.details = "Browsing files";
			presenceData.state = "All files";
		}
	} else if (document.location.pathname.startsWith("/share")) {
		presenceData.details = "Browsing files";
		presenceData.state = "Shared files";
	} else if (document.location.pathname.startsWith("/request")) {
		presenceData.details = "Browsing files";
		presenceData.state = "File requests";
	} else if (document.location.pathname.startsWith("/deleted_files")) {
		presenceData.details = "Browsing files";
		presenceData.state = "Deleted files";
	} else if (document.location.pathname.startsWith("/account"))
		presenceData.details = "Changing account settings";
	else if (document.location.pathname.startsWith("/transfer"))
		presenceData.details = "Dropbox Transfer";
	else if (document.location.pathname.startsWith("/paper"))
		presenceData.details = "Dropbox Paper";
	else if (document.location.pathname.startsWith("/scl")) {
		presenceData.details = "Working on paper";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		if (showFileNames) presenceData.state = document.title;
	} else if (document.location.pathname.startsWith("/landing/hellosign"))
		presenceData.details = "Dropbox HelloSign";
	else if (document.location.pathname.startsWith("/apps"))
		presenceData.details = "Browsing AppStore";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
