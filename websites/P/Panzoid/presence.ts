import { Icons, Details, States, ImageTexts, format, getRenderingState } from "./shared";

const presence = new Presence({ clientId: "1241878965535248527" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let legacyData: PresenceData = {
	details: "",
	state: "",
};

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
