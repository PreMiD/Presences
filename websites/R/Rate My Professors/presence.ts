const presence = new Presence({
		clientId: "1047546230525415535",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Info = "https://i.imgur.com/eIFVRHe.png",
	Logo = "https://i.imgur.com/zN7rsOi.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		pathList = pathname.split("/").filter(x => x !== "");

	if (hostname === "www.ratemyprofessors.com") {
		switch (pathList[0]) {
			case "school": {
				presenceData.details = "Viewing a school";
				presenceData.state = document.querySelector<HTMLDivElement>(
					"[class*='StyledTitleName']"
				).textContent;
				presenceData.smallImageKey = Assets.Info;
				presenceData.smallImageText = `Quality: ${
					document.querySelector<HTMLDivElement>(
						"[class*='OverallRating__Number']"
					).textContent
				}`;
				break;
			}
			default: {
				presenceData.details = "Browsing";
			}
		}
	} else if (hostname === "help.ratemyprofessors.com") {
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
