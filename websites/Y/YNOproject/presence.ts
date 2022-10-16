const presence = new Presence({
	clientId: "1028080411772977212",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/2LD3PQV.png",
		},
		titleInfo = document.title.split(" - "),
		location = document.querySelector("#locationText");

	if (location?.textContent)
		presenceData.state = `Dreaming at ${location.textContent}`;
	else presenceData.state = "Dreaming";

	if (titleInfo.length > 1 && titleInfo[1] === "YNOproject" ? true : false) {
		presenceData.details = `${titleInfo[0]}`;
		switch (
			document.querySelector("#modalContainer .modal:not(.hidden) .modalTitle")
				?.textContent
		) {
			case "Settings":
				presenceData.state = "Changing settings";
				break;
			case "Rankings":
				presenceData.state = "Viewing rankings";
				break;
			case "Badges":
				presenceData.state = "Viewing badges";
				break;
			case "Expeditions":
				presenceData.state = "Viewing expeditions";
				break;
			case "UI Theme":
				presenceData.state = "Changing UI theme";
				break;
			case "Log In":
				presenceData.state = "Logging in";
				break;
		}

		if (
			document.querySelector("#chatInput:focus") &&
			document.querySelector("#playerCountLabel")
		) {
			presenceData.details = `${titleInfo[0]}`;
			const playerCount =
				parseInt(
					document.querySelector("#playerCountLabel").textContent.split(" ")[0]
				) - 1;
			presenceData.state = `Chatting ${
				playerCount <= 0
					? "alone"
					: playerCount === 1
					? "with 1 player"
					: `with ${playerCount} players`
			}`;
		}

		presenceData.smallImageKey = `https://${
			document.location.hostname
		}/images/door_${document.location.href.split("/")[3]}.gif`;
		presenceData.smallImageText = titleInfo[0];
	} else presenceData.state = "Choosing a game...";

	presence.setActivity(presenceData);
});
