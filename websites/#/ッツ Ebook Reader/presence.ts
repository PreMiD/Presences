const presence = new Presence({
		clientId: "1167164781426380931",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
const enum Assets {
	Logo = "https://github.com/ttu-ttu/ebook-reader/raw/main/assets/readme/icon.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;
	switch (pathname.replace("_", "").split("/")[1]) {
		case "manage": {
			presenceData.details = "Managing library";
			break;
		}
		case "settings": {
			presenceData.details = "Setting things up";
			break;
		}
		case "b": {
			const titleElement =
					document.querySelector<HTMLTitleElement>("head title"),
				progressElement = document.querySelector<HTMLDivElement>(
					".writing-horizontal-tb.fixed.bottom-2.right-2"
				);

			let title = " a book",
				progress = "";

			if (titleElement) title = titleElement.text.split("|")[0];
			if (progressElement) progress = progressElement.textContent;

			presenceData.details = `Reading ${title}`;
			presenceData.state = progress;
		}
	}

	presence.setActivity(presenceData);
});
