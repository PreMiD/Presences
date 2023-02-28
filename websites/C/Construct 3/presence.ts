const presence = new Presence({
		clientId: "1080079619367108729",
	}),
	timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const projectName = document.title.replace(" - Construct 3", ""),
		element = document.querySelector("#propid2");
	let version = "";
	if (element instanceof HTMLInputElement) {
		const { value: elementValue } = element;
		version = elementValue;
	}
	if (version !== "") version = ` | v:${version}`;

	const presenceData: PresenceData = {
		largeImageKey: "editor",
		startTimestamp: timestamp,
		details:
			projectName === "Game Making Software"
				? "No Project"
				: "Editing a Project",
		state:
			projectName === "Game Making Software" ? "Idle" : projectName + version,
	};

	presence.setActivity(presenceData);
});
