const presence = new Presence({
	clientId: "1031628776209141892",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/T/This%20Website%20Will%20Self%20Destruct/assets/logo.png",
		},
		{ pathname } = window.location;

	if (pathname === "/") {
		const remainingSeconds = +document
				.querySelector("h3")
				?.textContent.match(/\d+,\d+/)[0]
				.replace(/,/, ""),
			privacyMode = await presence.getSetting<boolean>("privacyMode"),
			letterInput =
				document.querySelector<HTMLTextAreaElement>("#letter-textarea"),
			messageContainer = document.querySelector<HTMLDivElement>("#message");

		if (!isNaN(remainingSeconds)) {
			presenceData.endTimestamp =
				Math.floor(Date.now() / 1000) + remainingSeconds;
		}

		if (document.querySelector<HTMLDivElement>("#report"))
			presenceData.details = "Reporting a letter";
		else if (letterInput === document.activeElement) {
			presenceData.details = "Writing a letter";
			if (!privacyMode) presenceData.state = letterInput.value;
		} else if (
			document
				.querySelector<HTMLAnchorElement>("#message > div > p:last-child > a")
				?.href.startsWith("mailto:F")
		) {
			presenceData.details = "Reading main letter";
			if (!privacyMode) presenceData.state = messageContainer.textContent;
		} else {
			presenceData.details = "Reading a letter";
			if (!privacyMode) presenceData.state = messageContainer.textContent;
		}
	} else if (pathname.startsWith("/privacy"))
		presenceData.details = "Reading the privacy policy";
	else if (pathname.startsWith("/tos"))
		presenceData.details = "Reading the terms of service";

	presence.setActivity(presenceData);
});
