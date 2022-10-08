const presence = new Presence({
	clientId: "1028080411772977212",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "yno-logo",
		},
		titleInfo = document.title.split(" - "),
		location = document.querySelector("#locationText");

	if (titleInfo.length > 1 && titleInfo[1] === "YNOproject" ? true : false) {
		presenceData.details = `Dreaming on ${titleInfo[0]}`;
		presenceData.smallImageKey = `https://${
			document.location.hostname
		}/images/door_${document.location.href.split("/")[3]}.gif`;
		presenceData.smallImageText = titleInfo[0];
	} else presenceData.state = "Choosing a game...";

	if (location?.textContent) presenceData.state = location.textContent;

	presence.setActivity(presenceData);
});
