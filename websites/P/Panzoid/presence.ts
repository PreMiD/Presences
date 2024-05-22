const presence = new Presence({ clientId: "1241878965535248527" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Icons {
	Discord = "https://i.postimg.cc/3wgKPWjY/panzoid-discord.webp",
	Legacy = "https://i.postimg.cc/9MV6SF27/panzoid-legacy.png",
	Gen4 = "https://i.postimg.cc/Df5zvW9z/panzoid-gen4.png",
}

const enum Details {
	Gen4Menu = "In Gen4 menu",
	Gen4Editor = "Editing: {0}",
	CM3 = "Editing in Clipmaker 3",
	CM2 = "Editing in Clipmaker 2",
	Website = "Lurking around the website"
}

const enum States {
	Gen4Menu = "{0} projects",
	Gen4Editor = "{0} tracks | {1} clips",
	CM3 = "{0} tracks | {1} clips",
	CM2 = "{0} objects | {1} effects",
	Rendering = "Rendering {0}%"
}

let legacyData = {
	details: "",
	state: "",
};


function format(text: string, ...args: string[] | number[]) {
	return text.replace(/{(\d+)}/g, (match, number) => (
		typeof args[number] !== "undefined"
			? String(args[number])
			: match
	));
}

function getRenderingProgress(): number {
	const element = document.querySelector<HTMLSpanElement>(
		"div.pz-progress > span"
	);
	// Get the width percentage and trim the % symbol
	return element ? Number(element.style.width.slice(0, -1)) : null;
}


// CM3 and CM2 are built inside iframes, unlike Gen4
presence.on("iFrameData", (data: { details: string; state: string }) => {
	legacyData = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
		largeImageKey: Icons.Discord,
	};

	if (document.location.hostname === "app.panzoid.com") {
		presenceData.smallImageKey = Icons.Gen4;
		presenceData.smallImageText = "Gen4";

		// - - - - - - - - - - - - - - - - - - - - - Gen4 Editor - - - - - - - - - - - - - - - - - - - - - -
		if (document.location.pathname.startsWith("/edit")) {
			const projectNameInput = document.querySelector<HTMLInputElement>(
				".editortabs-name > input"
			);
			if (projectNameInput === null) return;

			presenceData.details = format(Details.Gen4Editor, projectNameInput.value.trim());

			const renderingProgress = getRenderingProgress();
			if (renderingProgress === null) {
				// Editor state
				presenceData.state = format(States.Gen4Editor,
					document.querySelectorAll(".trackTimeline-track").length,
					document.querySelectorAll(".clip:not(.empty)").length
				);
			} else
				// Rendering state
				presenceData.state = format(States.Rendering, renderingProgress.toFixed(2));

		// - - - - - - - - - - - - - - - - - - - - - - Gen4 Menu - - - - - - - - - - - - - - - - - - - - - -
		} else if (document.location.pathname === "/") {
			presenceData.details = Details.Gen4Menu;
			presenceData.state = format(States.Gen4Menu,
				document.querySelectorAll(".projectSelection-module__projectItem___214gY").length
			);
		}

	// - - - - - - - - - - - - - - - - - - - - - - - Legacy Apps - - - - - - - - - - - - - - - - - - - - - -
	} else if (
		document.location.pathname.startsWith("/tools/gen3/clipmaker") ||
		document.location.pathname.startsWith("/tools/gen2/clipmaker")
	) {
		presenceData.details = legacyData.details;
		presenceData.state = legacyData.state;
		presenceData.smallImageKey = Icons.Legacy;
		presenceData.smallImageText = "Legacy";

	// - - - - - - - - - - - - - - - - - - - - - - - - Website - - - - - - - - - - - - - - - - - - - - - - -
	} else presenceData.details = Details.Website;

	// Finally set the presence
	presence.setActivity(presenceData);
});
