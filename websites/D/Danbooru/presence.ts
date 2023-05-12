const presence = new Presence({
		clientId: "918794311557058590",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/pniknY6.png",
			startTimestamp: browsingTimestamp,
		},
		[shortTitle] = document.title.split(/[|]/, 1),
		path = document.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);

	if (path === "/posts") {
		presenceData.details = "Browsing posts";
		presenceData.smallImageKey = "artwork";
		presenceData.smallImageText = "Viewing artworks";
	} else if (path.startsWith("/posts")) {
		presenceData.details = "Viewing an artwork";
		presenceData.state = shortTitle;
		presenceData.smallImageKey = "artwork";
		presenceData.smallImageText = "Viewing artworks";
		if (buttons) {
			presenceData.buttons = [
				{ label: "View Artwork", url: document.location.href },
			];
		}
	} else if (path.startsWith("/post_versions"))
		presenceData.details = "Searching for post versions";
	else {
		switch (path) {
			case "/comments": {
				presenceData.details = "Reading comments";
				break;
			}
			case "/notes": {
				presenceData.details = "Reading notes";
				break;
			}
			case "/wiki_pages": {
				presenceData.details = "Browsing the wiki";
				break;
			}
			case "/wiki_pages/search": {
				presenceData.details = "Searching the wiki";
				break;
			}
			default:
				if (path.startsWith("/wiki_pages")) {
					presenceData.details = "Reading a wiki page";
					presenceData.state = shortTitle;
				} else if (path === "/artists") {
					presenceData.details = "Browsing artists";
					presenceData.smallImageKey = "user";
					presenceData.smallImageText = "Viewing a profile";
				} else if (path.startsWith("/artists")) {
					presenceData.details = "Viewing an artist";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = "user";
					presenceData.smallImageText = "Viewing a profile";
					if (buttons) {
						presenceData.buttons = [
							{ label: "View Artist", url: document.location.href },
						];
					}
				} else if (path === "/users") {
					presenceData.details = "Looking up users";
					presenceData.smallImageKey = "user";
					presenceData.smallImageText = "Viewing a profile";
				} else if (path.startsWith("/users")) {
					presenceData.details = "Viewing a user";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = "user";
					presenceData.smallImageText = "Viewing a profile";
				} else if (path === "/tags") presenceData.details = "Browsing tags";
				else if (path === "/pools") presenceData.details = "Browsing pools";
				else if (path.includes("pools/gallery"))
					presenceData.details = "Browsing the pool gallery";
				else if (path.startsWith("/pools")) {
					presenceData.details = "Viewing a pool";
					presenceData.state = shortTitle;
				} else if (path === "/forum_topics")
					presenceData.details = "Browsing forum topics";
				else if (path.startsWith("/forum_topic")) {
					presenceData.details = "Viewing a forum topic";
					presenceData.state = shortTitle;
				} else if (path === "/forum_posts")
					presenceData.details = "Browsing forum posts";
				else presenceData.details = "Browsing the site";
		}
	}
	if (privacy) {
		delete presenceData.state;
		delete presenceData.buttons;
	}
	presence.setActivity(presenceData);
});
