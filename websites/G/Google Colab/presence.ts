const presence = new Presence({
		clientId: "959487033963843594"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		notebookTitle = document.querySelector<HTMLInputElement>("#doc-name").value,
		selected = document.querySelector(".cell.focused");

	if (
		document
			.querySelector("colab-last-saved-indicator")
			.getAttribute("command") === "save"
	)
		presenceData.details = `Viewing ${notebookTitle}`;
	else presenceData.details = `Editing ${notebookTitle}`;

	if (selected?.classList.contains("code"))
		presenceData.state = "Editing code block";
	else if (selected?.classList.contains("text")) {
		if (selected.classList.contains("edit"))
			presenceData.state = "Editing text block";
		else presenceData.state = "Viewing text block";
	}

	presence.setActivity(presenceData);
});
