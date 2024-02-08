const presence = new Presence({ clientId: "818822000176791553" }),
	assets = {
		"word-logo":
			"https://cdn.discordapp.com/app-assets/818822000176791553/818841033026175026.png?size=512",
		"excel-logo":
			"https://cdn.discordapp.com/app-assets/818822000176791553/818841299892699166.png?size=512",
		"powerpoint-logo":
			"https://cdn.discordapp.com/app-assets/818822000176791553/818847184887873616.png?size=512",
		"onedrive-logo":
			"https://cdn.discordapp.com/app-assets/818822000176791553/818868309906423808.png?size=512",
		"office-logo":
			"https://cdn.discordapp.com/app-assets/818822000176791553/818866532083433472.png?size=512",
	};

presence.on("UpdateData", async () => {
	const title = document.title.split("-"),
		[fileName] = title,
		fileType = title[1].replace("Microsoft", "").replace("Online", "").trim(),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/O/OneDrive/assets/logo.png",
			startTimestamp: Math.round(Date.now() / 1000),
		};

	if (fileType === "OneDrive") {
		presenceData.details = "Browsing a directory";
		presenceData.state = fileName;
	} else if (
		fileType === "Word" ||
		fileType === "Excel" ||
		fileType === "PowerPoint"
	) {
		presenceData.largeImageKey =
			assets[`${fileType.toLowerCase()}-logo` as keyof typeof assets];
		presenceData.smallImageKey = assets["office-logo"];
		presenceData.smallImageText = "Microsoft Office Online";
		presenceData.details = `Editing ${
			fileType.charAt(0) === "E" ? "an" : "a"
		} ${fileType} file`;
		presenceData.state = fileName;
	}
	presence.setActivity(presenceData);
});
