const presence = new Presence({
		clientId: "1315383978878046411",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Generating = "generating",
}

presence.on("UpdateData", async () => {
	const showButtons = await presence.getSetting("showButtons");
	const btnPrivacy = await presence.getSetting("btnPrivacy");
	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
	};

	const path = window.location.pathname;

	if (path === "/") {
		presenceData.details = "Browsing the homepage.";
	} else if (path == "/fyp") {
		presenceData.details = "Browsing the FYP.";
		if (showButtons) {
			presenceData.buttons = [
				{
					label: "View FYP",
					url: "https://websim.ai/fyp",
				}
			]
		}
	} else if (path.startsWith("/@")) {
		const upath = path.substring(2).split("/");
		const username = upath[0];
		if (upath.length === 2) {
			presenceData.details = `Viewing ${document.title}`;
			presenceData.state = `By ${username}`;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "View Project",
						url: `https://websim.ai/@${username}/${upath[1]}`,
					},
				];
			}
		} else {
			presenceData.details = `Viewing ${username}'s profile.`;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "View Profile",
						url: `https://websim.ai/@${username}`,
					},
				];
			}
		}
	} else if (path.startsWith("/p/")) {
		const projPath = path.substring(3).split("/")
		presenceData.details = `Viewing ${document.title}`;
		presenceData.state = `${(projPath[1]) ? `Revision #${projPath[1]}` : ""}`
		if (showButtons) {
			presenceData.buttons = [
				{
					label: "View Project",
					url: `https://websim.ai/p/${projPath[0]}`,
				},
			];
			if (!btnPrivacy) {
				presenceData.buttons.push({
					label: "View Revision",
					url: `https://websim.ai/p/${projPath[0]}/${projPath[1]}`,
				});
			}
		}
	}

	presence.setActivity(presenceData);
});
