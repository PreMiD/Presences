const presence = new Presence({ clientId: "818822000176791553" });

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
		presenceData.largeImageKey = `${fileType.toLowerCase()}-logo`;
		presenceData.smallImageKey = "https://cdn.discordapp.com/app-assets/818822000176791553/818866532083433472.png?size=512";
		presenceData.smallImageText = "Microsoft Office Online";
		presenceData.details = `Editing ${
			fileType.charAt(0) === "E" ? "an" : "a"
		} ${fileType} file`;
		presenceData.state = fileName;
	}
	presence.setActivity(presenceData);
});
