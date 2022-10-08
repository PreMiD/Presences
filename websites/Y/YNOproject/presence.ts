const presence = new Presence({
		clientId: "1028080411772977212",
	}),
	gamesWithIcons = [
		"Uneven Dream",
		"Amillusion",
		"Deep Dreams",
		"Yume Nikki",
		"Yume 2kki",
		".flow",
		"Someday",
		"Answered Prayers",
		"Braingirl",
	];

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "yno-logo",
		},
		titleInfo = document.title.split(" - "),
		location = document.querySelector("#locationText");

	if (titleInfo.length > 1 && titleInfo[1] === "YNOproject" ? true : false) {
		presenceData.details = `Dreaming on ${titleInfo[0]}`;
		if (gamesWithIcons.includes(titleInfo[0])) {
			presenceData.smallImageKey = `${titleInfo[0]
				.toLowerCase()
				.replace(" ", "")
				.replace(".", "")}-icon`;
			presenceData.smallImageText = titleInfo[0];
		}
	} else presenceData.state = "Choosing a game...";

	if (location?.textContent) presenceData.state = location.textContent;

	presence.setActivity(presenceData);
});
