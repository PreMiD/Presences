const presence = new Presence({ clientId: "952854435711819796" }),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const { title } = document,
		{ href, pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: "logo",
			details: "Browsing...",
			startTimestamp: browsingStamp
		};

	if (pathname.startsWith("/novel/")) {
		presenceData.largeImageKey = document
			.querySelector('meta[property="og:image"]')
			.getAttribute("content");
		presenceData.smallImageKey = "logo";
		presenceData.startTimestamp = browsingStamp;
		presenceData.buttons = [
			{
				label: "",
				url: `${document.location}`
			}
		];

		switch (true) {
			case pathname.endsWith("-12032016"):
				presenceData.details = "Viewing a Novel";
				presenceData.state = title.split(" | Light")[0];
				presenceData.buttons[0].label =
					title.split(" | Light")[0].length >= 30
						? "View Novel"
						: title.split(" | Light")[0];
				break;
			case pathname.endsWith("/reviews"):
				presenceData.details = "Viewing the Reviews";
				presenceData.state = title.split(" | Light")[0].split("Novel User")[0];
				presenceData.buttons[0].label =
					presenceData.state.length >= 30 ? "View Novel" : presenceData.state;
				break;
			case pathname.endsWith("/chapters"):
				presenceData.details = "Viewing the Chapters";
				presenceData.state = title
					.split(" | Light")[0]
					.split("Novel Chapters")[0];
				presenceData.buttons[0].label =
					presenceData.state.length >= 30 ? "View Novel" : presenceData.state;
				break;
			default:
				presenceData.details = title
					.split(" | Light")[0]
					.split("- Chapter ")[0];
				presenceData.state = `Chapter ${
					title.split(" | Light")[0].split("- Chapter ")[1].split(" | ")[0]
				}`;
				presenceData.buttons = [
					{
						label:
							presenceData.details.length >= 30
								? "View Novel"
								: presenceData.details,
						url: `${href.split("12032016/")[0]}12032016`
					},
					{
						label:
							presenceData.state.length >= 30
								? "View Chapter"
								: presenceData.state,
						url: href
					}
				];
				break;
		}
	}

	presence.setActivity(presenceData);
});
