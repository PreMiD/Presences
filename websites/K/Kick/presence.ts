const presence = new Presence({ clientId: "1112901248421732462" });
presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kVabJjN.png",
			startTimestamp: Math.floor(Date.now() / 1000),
		},
		pathDetailsMap = {
			"/terms-of-service": {
				details: "Reading",
				state: "Terms of Service",
			},
			"/privacy-policy": {
				details: "Reading",
				state: "Privacy Policy",
			},
			"/dmca-policy": {
				details: "Reading",
				state: "DMCA Policy",
			},
		},
		{ pathname } = document.location,
		pathDetails = Object.entries(pathDetailsMap).find(([pathPrefix]) =>
			pathname.startsWith(pathPrefix)
		);
	if (pathname.match(/^(\/categories(?:\/[^/]+)*)/)) {
		const splittedcategory = pathname
			.match(/^(\/categories(?:\/[^/]+)*)/)[1]
			.split("/");
		presenceData.details = `Viewing Category ${
			splittedcategory[2]
				? splittedcategory[2][0].toUpperCase() +
				  splittedcategory[2].substring(1)
				: ""
		}`;
		presenceData.state = `${
			splittedcategory[3]
				? splittedcategory[3][0].toUpperCase() +
				  splittedcategory[3].substring(1)
				: ""
		}`;
		const matches = document
			.querySelector("img[data-v-36ee32dd]")
			.getAttribute("srcset")
			.match(/(?:https?:\/\/[^\s]+)/g);
		if (matches) presenceData.largeImageKey = matches[matches.length - 1];
	} else if (pathDetails) {
		presenceData.details = pathDetails[1].details;
		presenceData.state = pathDetails[1].state;
	} else {
		const username = pathname.split("/").pop();
		if (username) {
			presenceData.details = "Watching";
			presenceData.state = username;
			presenceData.buttons = [
				{ label: "Watch Stream", url: `https://kick.com/${username}` },
			];
		} else presenceData.details = "Viewing Kick.com";
	}
	presence.setActivity(presenceData);
});
