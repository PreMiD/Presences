const presence = new Presence({
		clientId: "701914032541794386",
	}),
	time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/G/Google%20Meet/assets/logo.png",
		startTimestamp: time,
	};

	if (document.location.pathname.toLowerCase() === "/") {
		presenceData.details = "Initial page";
		presenceData.state = "Just waiting";
	} else {
		presenceData.smallImageKey = Assets.VideoCall;
		presenceData.details = "In a meeting";
		presenceData.state = `${
			(document.querySelector(".wnPUne") ?? document.querySelector(".uGOf1d"))
				.textContent
		} users in the room`;
	}

	presence.setActivity(presenceData);
});
