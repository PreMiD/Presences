const presence = new Presence({
		clientId: "918794311557058590",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/D/Danbooru/assets/logo.png",
	Artwork = "https://cdn.rcd.gg/PreMiD/websites/D/Danbooru/assets/0.png",
	User = "https://cdn.rcd.gg/PreMiD/websites/D/Danbooru/assets/1.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
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
		presenceData.smallImageKey = Assets.Artwork;
		presenceData.smallImageText = "Viewing artworks";
	} else if (path.startsWith("/posts")) {
		presenceData.details = "Viewing an artwork";
		presenceData.state = shortTitle;
		presenceData.smallImageKey = Assets.Artwork;
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
					presenceData.smallImageKey = Assets.User;
					presenceData.smallImageText = "Viewing a profile";
				} else if (path.startsWith("/artists")) {
					presenceData.details = "Viewing an artist";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = Assets.User;
					presenceData.smallImageText = "Viewing a profile";
					if (buttons) {
						presenceData.buttons = [
							{ label: "View Artist", url: document.location.href },
						];
					}
				} else if (path === "/users") {
					presenceData.details = "Looking up users";
					presenceData.smallImageKey = Assets.User;
					presenceData.smallImageText = "Viewing a profile";
				} else if (path.startsWith("/users")) {
					presenceData.details = "Viewing a user";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = Assets.User;
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
