const presence = new Presence({
		clientId: "968882955474853909",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	{ language } = window.navigator;

/**
 * Get Translation
 * @param stringName Name of string you want to get
 */
function getTranslation(stringName: string): string {
	switch (stringName) {
		case "HomePage":
			switch (language) {
				default:
					return "Viewing home page";
			}
		case "BrowsingCategory":
			switch (language) {
				default:
					return "Browsing category";
			}
		case "ViewingProduction":
			switch (language) {
				default:
					return "Viewing production";
			}
		case "Watching":
			switch (language) {
				default:
					return "Watching";
			}
		default:
			presence.error(
				"Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.premid.app)"
			);
			return "Unknown stringName";
	}
}

let title;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "apple-icon",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "www.canalplus.com") {
		if (
			!document.querySelector("#sidepanel > div > div > div > div > div > div")
		) {
			if (
				document.querySelector(
					"#immersive > div > nav[data-e2e='immersive-nav']"
				)
			) {
				title = document.querySelector(
					"#immersive > div.immersive__container___u0og_ > div > div > section.mediaCardBody___kT01P > section.mediaCardBody__content___UuEc8 > header > h1"
				).textContent;

				presenceData.details = getTranslation("ViewingProduction");
				presenceData.state = title;
			} else if (
				document.querySelector(
					"#skipToMainContent > div:nth-child(2) > section > div > div > div > div > h1 > span"
				)
			) {
				title = document.querySelector(
					"#skipToMainContent > div:nth-child(2) > section > div > div > div > div > h1 > span"
				).textContent;

				presenceData.details = getTranslation("BrowsingCategory");
				presenceData.state = title;
			} else if (
				document.querySelector(
					"#skipToMainContent > div > div > section > section > header > h1"
				)
			) {
				presenceData.details = getTranslation("ViewingProduction");
				presenceData.state = document.querySelector(
					"#skipToMainContent > div > div > section > section > header > h1"
				).textContent;
				if (!presenceData.state) {
					presenceData.state = document.querySelector(
						"#immersive > div > div > div > section > section > header > h1"
					).textContent;
				}
			} else presenceData.details = getTranslation("HomePage");
		} else {
			const ele =
				document.querySelector("meta[name='twitter:title']") ||
				document.querySelector("meta[name='og:title']") ||
				document.querySelector("div > div > div > span");

			title = ((ele as HTMLMetaElement).content || ele.textContent).replace(
				" | CANAL+ Online",
				""
			);

			presenceData.details = getTranslation("Watching");
			presenceData.state = title;

			presenceData.largeImageKey =
				document.querySelector<HTMLMetaElement>("meta[property='og:image']")
					?.content || "apple-icon";

			const paused = document.querySelector(
				"#sidepanel > div > div > div > div > div > div > div > div > div:nth-child(2) > div[data-sp-action='playerPlay']"
			);

			presenceData.smallImageKey = paused ? "play" : "pause";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
});
