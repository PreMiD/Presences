const presence = new Presence({
	clientId: "1042851981867360376",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/6MdrOuM.png",
		},
		{ href } = document.location;
	if (document.querySelectorAll("#my-video")[0]) {
		const timeRemainingElement = document
				.querySelectorAll(".vjs-remaining-time-display")[0]
				.innerHTML.split("-"),
			timeRemaining =
				timeRemainingElement[timeRemainingElement.length - 1].split(":");
		if (
			/Pokémon Movie/.test(
				document.querySelectorAll(".page-header")[0].children[0].innerHTML
			)
		)
			presenceData.details = "Watching a movie!";
		else {
			presenceData.details = `Watching ${
				document
					.querySelectorAll(".page-header")[0]
					.children[0].innerHTML.trim()
					.split("<")[0]
			}`;
		}

		if (timeRemaining.length === 3) {
			presenceData.endTimestamp =
				Date.now() +
				Number(timeRemaining[0]) * 3600000 +
				Number(timeRemaining[1]) * 60000 +
				Number(timeRemaining[2]) * 1000;
		} else {
			presenceData.endTimestamp =
				Date.now() +
				Number(timeRemaining[0]) * 60000 +
				Number(timeRemaining[1]) * 1000;
		}

		presenceData.state = document.querySelectorAll("small")[0].innerHTML;
		presenceData.buttons = [
			{
				label: "Open the video",
				url: href,
			},
		];
	} else presenceData.details = "Finding a video!";

	presence.setActivity(presenceData);
});
