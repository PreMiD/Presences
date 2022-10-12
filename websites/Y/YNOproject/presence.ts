const presence = new Presence({
	clientId: "1028080411772977212",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/2LD3PQV.png",
		},
		titleInfo = document.title.split(" - "),
		location = document.querySelector("#locationText");

	if (titleInfo.length > 1 && titleInfo[1] === "YNOproject" ? true : false) {
		switch (
			document.querySelector("#modalContainer .modal:not(.hidden) .modalTitle")
				?.textContent
		) {
			case "Settings":
				presenceData.details = `Changing settings for ${titleInfo[0]}`;
				break;
			case "Rankings":
				presenceData.details = `Viewing rankings for ${titleInfo[0]}`;
				break;
			case "Badges":
				presenceData.details = `Viewing badges for ${titleInfo[0]}`;
				break;
			case "Expeditions":
				presenceData.details = `Viewing expeditions for ${titleInfo[0]}`;
				break;
			case "UI Theme":
				presenceData.details = `Changing UI theme for ${titleInfo[0]}`;
				break;
			case "Log In":
				presenceData.details = `Logging in to ${titleInfo[0]}`;
				break;
			default:
				presenceData.details = `Dreaming on ${titleInfo[0]}`;
				break;
		}

		if (
			document.querySelector("#chatInput:focus") &&
			document.querySelector("#playerCountLabel")
		) {
			const playerCount = Math.max(
				0,
				parseInt(
					document.querySelector("#playerCountLabel").textContent.split(" ")[0]
				) - 1
			);
			presenceData.details = `Chatting ${
				playerCount === 0
					? "alone"
					: playerCount === 1
					? "with 1 player"
					: `with ${playerCount} players`
			} on ${titleInfo[0]}`;
		}

		presenceData.smallImageKey = `https://${
			document.location.hostname
		}/images/door_${document.location.href.split("/")[3]}.gif`;
		presenceData.smallImageText = titleInfo[0];
	} else presenceData.state = "Choosing a game...";

	if (location?.textContent) presenceData.state = location.textContent;

	presence.setActivity(presenceData);
});
