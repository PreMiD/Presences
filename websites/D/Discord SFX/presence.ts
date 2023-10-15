const presence = new Presence({
	clientId: "1119009771538882740",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: "logo",
		},
		{ pathname } = document.location;

	switch (pathname) {
		case "/":
			presenceData.details = "Browsing";
			break;

		case "/search": {
			presenceData.details = "Browsing the search page";

			const sorting = document.querySelector(
				"[aria-haspopup='menu']"
			) as HTMLSelectElement;
			let sortingValue = null as string | null;

			if (sorting) sortingValue = sorting.textContent;
			if (sortingValue)
				presenceData.state = `Looking for ${sortingValue} sounds`;
			else presenceData.state = "Looking for sounds";

			const searchingElement = document.querySelector("#searching-for-text");
			if (searchingElement) {
				const searchQuery = searchingElement.textContent?.split(
					"Currently searching for "
				)[1];
				if (searchQuery) {
					const resultCount = searchingElement
						.querySelector("#results-text")
						?.textContent?.split(" results)")[0]
						.split("(")[1];
					if (resultCount) presenceData.state = `${resultCount} results`;

					presenceData.details = `Looking for ${searchQuery.replace(
						`(${resultCount} results)`,
						""
					)}`;
				}
			}

			if (document.querySelector("#result-state-not-found"))
				presenceData.state = "No results found";

			if (document.querySelector("#result-state-loading"))
				presenceData.state = "Loading results";
			break;
		}
	}

	if (pathname.startsWith("/sounds/")) {
		presenceData.details = "Viewing Sound";
		presenceData.state = document.title.split(" | Sound ")[1];

		presenceData.buttons = [
			{
				label: "View on Discord SFX",
				url: `https://discordsfx.com/sounds/${pathname.split("/")[2]}`,
			},
		];
	}

	const isPlayingSound = document.querySelector(
		"button[data-state='playing']"
	) as HTMLButtonElement;
	if (isPlayingSound) {
		const { name, id } = isPlayingSound.dataset;
		let newState = "";

		if (name) {
			newState = `Listening to ${name}.mp3`;
			if (id) {
				presenceData.buttons = [
					{
						label: "View on Discord SFX",
						url: `https://discordsfx.com/sounds/${id}`,
					},
				];
			}
		}

		presenceData.state = newState;
	}

	presence.setActivity(presenceData);
});
