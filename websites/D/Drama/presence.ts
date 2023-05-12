const presence = new Presence({
	clientId: "852245069984825394",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/tA4eeXJ.png",
		smallImageKey: "search",
		smallImageText: "Looking for a thread",
		details: "Looking for drama!",
		state: "Browsing",
	};

	switch (true) {
		case document.location.pathname.includes("/d/"):
			presenceData.largeImageKey = "https://i.imgur.com/tA4eeXJ.png";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading a thread";
			presenceData.details = `Viewing Thread: ${
				document.querySelector("h2.DiscussionHero-title").textContent
			}`;
			presenceData.state = `${
				document.querySelector("span.Scrubber-index").textContent
			} / ${document.querySelector("span.Scrubber-count").textContent} Posts`;
			presenceData.buttons = [
				{
					label: "View Post",
					url: `${document.URL}`,
				},
			];
			break;
		case document.location.pathname.includes("/u/"):
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Viewing a profile";
			presenceData.details = `Viewing Profile: ${document.URL.split("/")[4]}`;
			presenceData.state = `Posts: ${
				document.querySelector("span.Button-badge").textContent
			} `;
			break;
		case document.location.pathname.includes("/meta"):
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Looking for a thread";
			presenceData.details = "Looking for drama!";
			presenceData.state = "Looking at meta threads";
			break;
		case document.location.pathname.includes("/resolved"):
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Looking for a thread";
			presenceData.details = "Looking for drama!";
			presenceData.state = "Looking at resolved threads";
			break;
		case document.location.pathname.includes("/confirmed"):
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Looking for a thread";
			presenceData.details = "Looking for drama!";
			presenceData.state = "Looking at confirmed threads";
			break;
		case document.location.pathname.includes("/discussion"):
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Looking for a thread";
			presenceData.details = "Looking for drama!";
			presenceData.state = "Looking at discussions";
			break;
		case document.location.pathname.includes("/users"):
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Looking at all users";
			presenceData.details = "Looking for drama!";
			presenceData.state = "Looking at all users";
			break;
		case document.location.pathname.includes("/trinkets"):
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Looking at trinkets";
			presenceData.details = "Looking for drama!";
			presenceData.state = "Looking at trinkets";
			break;
		case document.querySelector("div.Composer.visible") !== null:
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Writing a thread";
			presenceData.details = "Starting some drama!";
			presenceData.state = "Writing a post";
			break;
		default:
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Looking for a thread";
			presenceData.details = "Looking for drama!";
			presenceData.state = "Browsing";
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
