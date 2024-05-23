const presence = new Presence({ clientId: "1241878965535248527" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Icons {
	Discord = "https://i.postimg.cc/3wgKPWjY/panzoid-discord.webp",
	Legacy = "https://i.postimg.cc/9MV6SF27/panzoid-legacy.png",
	Gen4 = "https://i.postimg.cc/Df5zvW9z/panzoid-gen4.png",
}

export const enum Details {
	Gen4Menu = "In Gen4 menu",
	Gen4Loading = "Loading project...",
	Gen4Editor = "Editing: {0}",
	CM3 = "Editing in Clipmaker 3",
	CM2 = "Editing in Clipmaker 2",
	Website = "Lurking around the website",
}

export const enum States {
	Gen4Menu = "{0} projects",
	Gen4Editor = "{0} tracks | {1} clips",
	CM3 = "{0} tracks | {1} clips",
	CM2 = "{0} objects | {1} effects",
	Rendering = "Rendering {0}%",
}

const enum ImageTexts {
	Gen4 = "Gen4",
	Legacy = "Legacy",
}

let legacyData = {
	details: "",
	state: "",
};

export function format(text: string, ...args: string[] | number[]) {
	return text.replace(/{(\d+)}/g, (match, number) =>
		typeof args[number] !== "undefined" ? String(args[number]) : match
	);
}

// CM3 and CM2 are built inside iframes, unlike Gen4
presence.on("iFrameData", (data: { details: string; state: string }) => {
	legacyData = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Icons.Discord,
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "app.panzoid.com")
		getGen4Data(presenceData);
	else if (
		document.location.pathname.startsWith("/tools/gen3/clipmaker") ||
		document.location.pathname.startsWith("/tools/gen2/clipmaker")
	)
		getLegacyData(presenceData);
	else
		presenceData.details = Details.Website;

	// Finally set the presence
	presence.setActivity(presenceData);
});

function getGen4Data(presenceData: PresenceData): void {
	presenceData.smallImageKey = Icons.Gen4;
	presenceData.smallImageText = ImageTexts.Gen4;

	if (document.location.pathname.startsWith("/edit"))
		getGen4EditorData(presenceData);
	else
		getGen4MenuData(presenceData);
}

function getGen4EditorData(presenceData: PresenceData): void {
	const projectNameInput = document.querySelector<HTMLInputElement>(
		".editortabs-name > input"
	);

	// Project name not found means the editor is still loading
	if (projectNameInput === null) {
		presenceData.details = Details.Gen4Loading;
		return;
	} else {
		presenceData.details = format(
			Details.Gen4Editor,
			projectNameInput.value.trim()
		);
	}

	const renderingState = getRenderingState();

	// Check if rendering is running or not
	if (renderingState !== null)
		presenceData.state = renderingState;
	else {
		presenceData.state = format(
			States.Gen4Editor,
			document.querySelectorAll(".trackTimeline-track").length,
			document.querySelectorAll(".clip:not(.empty)").length
		);
	}
}

function getGen4MenuData(presenceData: PresenceData): void {
	presenceData.details = Details.Gen4Menu;
	presenceData.state = format(
		States.Gen4Menu,
		document.querySelectorAll(".projectSelection-module__projectItem___214gY").length
	);
}

function getLegacyData(presenceData: PresenceData): void {
	// See iframe.ts for CM3 and CM2 specifically
	presenceData.details = legacyData.details;
	presenceData.state = legacyData.state;
	presenceData.smallImageKey = Icons.Legacy;
	presenceData.smallImageText = ImageTexts.Legacy;
}

export function getRenderingState(): string {
	const element = document.querySelector<HTMLSpanElement>(
		"div.pz-progress > span"
	);
	// Get the width percentage and trim the % symbol
	// Or if the element was not found, return null
	if (element) {
		return format(
			States.Rendering,
			Number(element.style.width.slice(0, -1)).toFixed(2)
		);
	}
	return null;
}
