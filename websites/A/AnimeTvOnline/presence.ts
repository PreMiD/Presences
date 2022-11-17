const presence = new Presence({
	clientId: "1042875166021124229",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/b0PVWvC.png",
		},
		{ pathname, href } = document.location;

	if (pathname.startsWith("/play")) {
		const video = document.querySelector("video");

		presenceData.details = `Watching ${
			document.querySelectorAll(".card-header")[0].innerHTML.split("\n")[0]
		}`;
		presenceData.state = `Episode ${
			document.querySelectorAll(".episodeactive")[0].innerHTML
		}`;
		presenceData.buttons = [
			{
				label: "Watch this episode!",
				url: href,
			},
		];
		if (video && !isNaN(video.duration)) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				video.currentTime,
				video.duration
			);
		}
	} else if (pathname.startsWith("/genre"))
		presenceData.details = "Looking through genres.";
	else if (pathname.startsWith("/news"))
		presenceData.details = "Looking through news.";
	else if (pathname.startsWith("/userslist"))
		presenceData.details = "Looking through users.";
	else presenceData.details = "Looking for anime to watch!";

	presence.setActivity(presenceData);
});
