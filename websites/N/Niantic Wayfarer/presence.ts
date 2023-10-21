const presence = new Presence({
		clientId: "684174415415476240",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/N/Niantic%20Wayfarer/assets/logo.png",
	Pin = "https://cdn.discordapp.com/app-assets/684174415415476240/684175146973790208.png?size=512"
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	},
	{ pathname } = document.location;

	if (pathname.includes("/review")) {
		const title = document.querySelector(
				"app-title-and-description .wf-review-card__body a"
			),
			description = document.querySelector(
				"app-title-and-description .wf-review-card__body a+div"
			),
			location = document.querySelector("app-should-be-wayspot .wf-review-card__body > div > div:last-child");
		if (title && description && location) {
			presenceData.smallImageKey = Assets.Pin;
			presenceData.details = `Reviewing: ${title.textContent.trim()}`;
			presenceData.state = `Description: ${description.textContent.trim()}`;
			presenceData.smallImageText = `Address: ${location.textContent
				.split(":")[1]
				.trim()}`;
		} else {
			presenceData.details = "Getting ready to";
			presenceData.state = "review a location";
		}
	} else if (pathname.includes("/settings"))
		presenceData.details = "Managing settings";
	else if (pathname.includes("/help")) {
		const article = document.querySelector(
			"#help-section-breadcrumbs > span.ng-binding"
		).textContent;
		presenceData.smallImageKey = Assets.Reading;
		if (article !== "") {
			presenceData.details = "Reading article:";
			presenceData.state = article;
		} else presenceData.details = "Browsing the Help Center";
	} else if (pathname.includes("/login"))
		presenceData.details = "Logging in";
	else if (pathname.includes("/profile"))
		presenceData.details = "Viewing their profile";
	else if (pathname.includes("/nominations"))
		presenceData.details = "Viewing their nominations";
	else if (pathname.includes("/showcase"))
		presenceData.details = "Viewing the showcased wayspots";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
