const presence = new Presence({
		clientId: "917417055458852865"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "artstation",
			startTimestamp: browsingTimestamp
		},
		shortTitle = document.title.split(/-(.+)/)[1],
		[image, artwork, button, time] = await Promise.all([
			presence.getSetting<boolean>("image"),
			presence.getSetting<number>("artwork"),
			presence.getSetting<boolean>("button"),
			presence.getSetting<boolean>("time")
		]);

	if (document.location.pathname.startsWith("/messages")) {
		presenceData.details = "Checking inbox";
		presenceData.smallImageKey = "inbox";
		presenceData.smallImageText = "Checking inbox";
	} else if (
		document.querySelector<HTMLDivElement>(
			"body > div.wrapper > div.wrapper-main > div > div > div.user-profile"
		)
	) {
		presenceData.details = "Viewing an artist's profile";
		presenceData.state = shortTitle;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"div.user-profile > user-header > div > div > div.avatar > img"
		).src;
		presenceData.smallImageKey = "user";
		presenceData.smallImageText = "Viewing profile";
		presenceData.buttons = [{ label: "View Artist", url: document.URL }];
	} else if (document.location.pathname.startsWith("/artwork")) {
		presenceData.details = "Viewing an artwork";
		presenceData.state = shortTitle;
		if (artwork === 1) {
			presenceData.largeImageKey = document
				.querySelector<HTMLImageElement>(
					"div.d-none.d-md-flex.align-items-start > a > img"
				)
				.src.replace("medium", "large");
		} else if (artwork === 2) {
			// Meta tags can't be used due to how the page is loaded
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				"div.asset-image > picture > img"
			).src;
		} else {
			presenceData.smallImageKey = "artwork";
			presenceData.smallImageText = "Viewing artwork";
		}
		presenceData.buttons = [
			{ label: "View Artwork", url: document.location.href },
			{
				label: "View Artist",
				url: document.querySelector<HTMLAnchorElement>(
					"div.d-none.d-md-flex.align-items-start > a"
				).href
			}
		];
	} else if (document.location.pathname.startsWith("/marketplace"))
		presenceData.details = "Surfing the marketplace";
	else if (document.location.pathname.startsWith("/studios"))
		presenceData.details = "Visiting studios";
	else if (document.location.href.includes("/jobs")) {
		presenceData.details = "Viewing jobs";
		presenceData.state = document
			.querySelector('meta[property="og:title"]')
			.getAttribute("content");
		presenceData.smallImageKey = "searchjob";
		presenceData.smallImageText = "Viewing jobs";
	} else if (document.location.pathname === "/blogs")
		presenceData.details = "Reading blogs";
	else if (document.location.pathname.startsWith("/blogs")) {
		presenceData.details = "Reading a blog";
		presenceData.state = shortTitle;
	} else if (document.location.pathname === "/contests")
		presenceData.details = "Looking for challenges";
	else if (document.location.pathname.startsWith("/contests")) {
		presenceData.details = "Viewing a challenge";
		presenceData.state = shortTitle;
	} else {
		switch (document.location.pathname) {
			case "/podcast": {
				presenceData.details = "Finding a podcast";
				break;
			}
			case "/guides": {
				presenceData.details = "Looking for guides";
				break;
			}
			case "/learning": {
				presenceData.details = "Learning";
				presenceData.smallImageKey = "learning";
				presenceData.smallImageText = "Learning";

				break;
			}
			default:
				if (document.location.href.includes("courses")) {
					presenceData.details = "Viewing a course";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = "learning";
					presenceData.smallImageText = "Learning";
				} else if (document.location.href.includes("series")) {
					presenceData.details = "Viewing a series";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = "learning";
					presenceData.smallImageText = "Learning";
				} else if (document.location.href.includes("instructors")) {
					presenceData.details = "Viewing an instructor";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = "learning";
					presenceData.smallImageText = "Learning";
				} else if (document.location.href.includes("playlists")) {
					presenceData.details = "Viewing a playlist";
					presenceData.state = shortTitle;
					presenceData.smallImageKey = "learning";
					presenceData.smallImageText = "Learning";
				} else if (document.location.href.includes("settings"))
					presenceData.details = "Changing settings";
				else if (document.location.href.includes("profile/edit")) {
					presenceData.details = "Editing profile";
					presenceData.smallImageKey = "editprofile";
					presenceData.smallImageText = "Editing profile";
				} else if (document.location.href.includes("project/new")) {
					presenceData.details = "Uploading an artwork";
					presenceData.smallImageKey = "upload";
					presenceData.smallImageText = "Uploading artwork";
				} else if (document.location.hostname === "magazine.artstation.com") {
					presenceData.details = "Reading magazines";
					presenceData.state = shortTitle;
				} else if (document.location.hostname === "www.artstation.com") {
					presenceData.details = "Exploring artworks";
					presenceData.smallImageKey = "artwork";
					presenceData.smallImageText = "Exploring artworks";
				} else {
					presenceData.details = "Viewing a portfolio of:";
					presenceData.state = document
						.querySelector('meta[property="og:site_name"]')
						.getAttribute("content");
					presenceData.smallImageKey = "portfolio";
					presenceData.smallImageText = "Viewing portfolio";
				}
		}
	}
	if (!image) presenceData.largeImageKey = "logo";
	if (!button) delete presenceData.buttons;
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	presence.setActivity(presenceData);
});
