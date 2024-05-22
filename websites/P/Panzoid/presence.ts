/*eslint prefer-template: "off"*/

const presence = new Presence({clientId: "1241878965535248527"}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	DiscordIcon = "https://i.postimg.cc/3wgKPWjY/panzoid-discord.webp",
	LegacyIcon = "https://i.postimg.cc/9MV6SF27/panzoid-legacy.png",
	Gen4Icon = "https://i.postimg.cc/Df5zvW9z/panzoid-gen4.png"
}

let legacyData = {
	details: "",
	state: ""
};

function getRenderingProgress() : number {
	const element = document.querySelector<HTMLSpanElement>("div.pz-progress > span");
	// Get the width percentage and trim the % symbol
	return element ? Number(element.style.width.slice(0, -1)) : null;
}

// CM3 and CM2 are built inside iframes, unlike Gen4
presence.on("iFrameData", (data: {details: string, state: string}) => {
	legacyData = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
		largeImageKey: Assets.DiscordIcon
	};

	if (document.location.hostname === "app.panzoid.com") {
		presenceData.smallImageKey = Assets.Gen4Icon;
		presenceData.smallImageText = "Gen4";
		presenceData.name = "Panzoid Gen4";

		// - - - - - - - - - - - - - - - - - - - - - Gen4 Editor - - - - - - - - - - - - - - - - - - - - - -
		if (document.location.pathname.startsWith("/edit")) {
			const projectNameInput = document.querySelector(".editortabs-name > input") as HTMLInputElement;
			if (projectNameInput === null) return;

			presenceData.details = `Project: ${projectNameInput.value.trim()}`;

			const renderingProgress = getRenderingProgress();

			// Normal state
			if (renderingProgress === null) {
				presenceData.details = `Project: ${projectNameInput.value.trim()}`;
				presenceData.state = (document.querySelectorAll(".trackTimeline-track").length
					+ " tracks | "
					+ document.querySelectorAll(".clip:not(.empty)").length
					+ " clips");

			// Rendering state
			} else
				presenceData.state = `Rendering ${renderingProgress.toFixed(2)}%`;

		// - - - - - - - - - - - - - - - - - - - - - - Gen4 Menu - - - - - - - - - - - - - - - - - - - - - -
		} else if (document.location.pathname === "/") {
			presenceData.details = "In Gen4 menu";
			presenceData.state = `${document.querySelectorAll(".projectSelection-module__projectItem___214gY").length} projects`;
		}

	// - - - - - - - - - - - - - - - - - - - - - - - Legacy Apps - - - - - - - - - - - - - - - - - - - - - -
	} else if (document.location.pathname.startsWith("/tools/gen3/clipmaker")
		|| document.location.pathname.startsWith("/tools/gen2/clipmaker")
	) {
		presenceData.details = legacyData.details;
		presenceData.state = legacyData.state;
		presenceData.smallImageKey = Assets.LegacyIcon;
		presenceData.smallImageText = "Legacy";

	// - - - - - - - - - - - - - - - - - - - - - - - - Website - - - - - - - - - - - - - - - - - - - - - - -
	} else
		presenceData.details = "Lurking around the website";


	// Finally set the presence
	presence.setActivity(presenceData);
});
