const presence = new Presence({
		clientId: "1209550314987061258",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/G/Gemini/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			details: "Browsing website",
		},
		{ pathname } = document.location,
		showTitle = await presence.getSetting<boolean>("showTitle");
	switch (true) {
		case pathname.startsWith("/app"):
			// Check the selected conversation
			if (showTitle) {
				presenceData.details =
					document.querySelector(
						"div.conversation.selected>div.conversation-title"
					).textContent ?? "Thinking of a new Prompt...";

				// Show word count
				const elem = document.querySelectorAll(
					"p.query-text-line,div.response-optimization.markdown"
				);
				presenceData.state = `Asked ${
					elem[0].textContent.split(" ").length
				} words | answered with ${
					elem[1].textContent.split(" ").length
				} words.`;
			} else presenceData.details = "Asking questions";
			break;
		case pathname.startsWith("/extensions"):
			presenceData.details = "Managing extensions";
			break;
		case pathname.startsWith("/updates"):
			presenceData.details = "Reading updates";
			break;
		case pathname.startsWith("/faq"):
			presenceData.details = "Reading FAQ";
			break;
		case pathname.startsWith("/advanced"):
			presenceData.details = "Reading about Gemini Advanced";
			break;
	}

	presence.setActivity(presenceData);
});
