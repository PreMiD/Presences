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
		{ pathname } = document.location;
	switch (true) {
		case pathname.startsWith("/app"):
			presenceData.details = "Asking questions";
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
