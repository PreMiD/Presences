const presence = new Presence({
		clientId: "628019683718856714",
	}),
	getSettings = async (): Promise<{
		showRecipient: boolean;
		showNumbers: boolean;
	}> => ({
		showRecipient: await presence.getSetting<boolean>("showRecipient"),
		showNumbers: await presence.getSetting<boolean>("showNumbers"),
	});

presence.on("UpdateData", async () => {
	const settings = await getSettings(),
		typing = document.querySelector(
			'span[class="selectable-text copyable-text"]'
		);

	let name =
		settings.showRecipient &&
		document.querySelector('[data-testid="conversation-info-header"]')
			.firstChild.firstChild?.textContent;

	if (
		settings.showNumbers === false &&
		typeof name === "string" &&
		!isNaN(Number(name.replace(/[^a-zA-Z0-9 ]/g, "").replaceAll(" ", "")))
	)
		name = null;

	if (!name && !typing) return presence.setActivity();
	else {
		presence.setActivity({
			largeImageKey: "waweb-logo",
			details: `Texting with ${name || "someone"}`,
			state: (typing?.textContent && "Typing...") || "Just reading...",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	}
});
