const presence = new Presence({
	clientId: "630494559956107285",
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
			largeImageKey: "https://i.imgur.com/WdNIJe8.png",
			details: "Viewing page:",
		},
		path = document.location.pathname
			.toLowerCase()
			.replace(/(\/u\/([0-9])+)/g, ""),
		privacy = await presence.getSetting<boolean>("privacy");

	if (path.startsWith("/drive/folders")) {
		presenceData.details = "Viewing a folder";
		if (!privacy)
			presenceData.state = document.title.replace("- Google Drive", "");
	} else if (path.startsWith("/drive/computer"))
		presenceData.state = "Linked computers";
	else if (path.startsWith("/drive/shared-with-me"))
		presenceData.state = "Shared files";
	else if (path.startsWith("/drive/recent"))
		presenceData.state = "Recently updated files";
	else if (path.startsWith("/drive/starred"))
		presenceData.state = "Starred files";
	else if (path.startsWith("/drive/trash"))
		presenceData.state = "Deleted files";
	else if (path.startsWith("/drive/backups")) presenceData.state = "Backups";
	else if (path.startsWith("/drive/quota"))
		presenceData.state = "Storage quota";
	else if (path.startsWith("/file/")) {
		const main = document.title.split(".");
		presenceData.details = "Viewing a file";
		if (!privacy) {
			presenceData.state = `${
				main.length === 2 ? main[0] : main.slice(0, -1).join("").toString()
			}.${main
				.slice(-1)
				.toString()
				.replace("- Google Drive", "")
				.toUpperCase()}`;
		}
	} else presenceData.details = "Browsing...";

	presence.setActivity(presenceData);
});
