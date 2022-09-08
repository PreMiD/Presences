const presence = new Presence({
		clientId: "1017504807822561290",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

// TODO:
// edit history, open edits, creations, etc.

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Fty4eZ8.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = window.location;

	if (pathname === "/") {
		presenceData.details = "Browsing home page";
	} else if (pathname.startsWith("/user/")) {
		const [, profilePath] = pathname.match(/^\/user\/.*?\/(.*?)\/?$/) || [],
			username = document.querySelector("bdi").textContent;
		presenceData.details = "Viewing user profile";
		switch (profilePath) {
			case "ratings":
			case "subscribers":
			case "collections": {
				presenceData.state = `${username}'s ${profilePath}`;
				break;
			}
			case "tags": {
				presenceData.state = document.querySelector("h2").textContent;
				break;
			}
			default: {
				if (profilePath?.startsWith("subscriptions/")) {
					const [, subscriptionType] = profilePath.match(
						/^subscriptions\/(.*?)\/?$/
					)[1];
					presenceData.state = `${username}'s ${subscriptionType} subscriptions`;
				} else {
					presenceData.state = username;
				}
			}
		}
	} else if (pathname.startsWith("/account/")) {
		presenceData.details = "Managing account preferences";
	} else if (pathname.startsWith("/doc/")) {
		presenceData.details = "Viewing documentation";
		presenceData.state = document.querySelector<HTMLAnchorElement>(
			".hierarchy-links > a"
		).textContent;
	} else if (pathname.startsWith("/artist/")) {
		const artistName = document.querySelector("bdi").textContent,
			[, artistPath] = pathname.match(/^\/user\/.*?\/(.*?)\/?$/) || [];
		presenceData.details = "Viewing artist";
		presenceData.buttons = [
			{
				label: "View Artist",
				url: href,
			},
		];
		switch (artistPath) {
			case "works":
			case "recordings":
			case "events":
			case "relationships":
			case "aliases":
			case "tags":
			case "ratings":
			case "details":
			case "releases": {
				presenceData.state = `${document.querySelector(
					".sel bdi"
				)} for ${artistName}`;
				break;
			}
			case "edit": {
				presenceData.state = "Editing artist";
				presenceData.state = artistName;
				delete presenceData.buttons;
				break;
			}
			default: {
				presenceData.state = artistName;
			}
		}
	} else if (pathname.startsWith("/release/")) {
		const releaseName = document.querySelector("bdi").textContent,
			[, releasePath] = pathname.match(/^\/user\/.*?\/(.*?)(\/.*?)?$/) || [],
			coverArtImage = document.querySelector<HTMLImageElement>(
				".cover-art-image > img"
			);
		presenceData.details = "Viewing release";
		presenceData.buttons = [
			{
				label: "View Release",
				url: href,
			},
		];
		if (coverArtImage) {
			presenceData.largeImageKey = coverArtImage.src;
		}
		switch (releasePath) {
			case "discids": {
				presenceData.state = `Disc IDs for '${releaseName}'`;
				break;
			}
			case "cover-art": {
				presenceData.state = `Cover art for '${releaseName}'`;
				break;
			}
			case "aliases":
			case "tags":
			case "details": {
				presenceData.state = presenceData.state = `${document.querySelector(
					".sel bdi"
				)} for ${releaseName}`;
				break;
			}
			case "add-cover-art":
			case "edit-cover-art": {
				presenceData.state = `Editing cover art for '${releaseName}'`;
				delete presenceData.buttons;
				break;
			}
			case "edit": {
				presenceData.details = "Editing release";
				presenceData.state = releaseName;
				delete presenceData.buttons;
				break;
			}
			case "edit-relationships": {
				presenceData.details = "Editing release relationships";
				presenceData.state = releaseName;
				delete presenceData.buttons;
				break;
			}
			default: {
				presenceData.state = releaseName;
			}
		}
	} else if (pathname.startsWith("/recording/")) {
		const recordingName = document.querySelector("bdi").textContent,
			[, recordingPath] = pathname.match(/^\/user\/.*?\/(.*?)\/?$/) || [];
		presenceData.details = "Viewing recording";
		presenceData.smallImageKey = "https://i.imgur.com/ybpozZ6.png";
		presenceData.smallImageText = `Artist: '${
			document.querySelector(".artist bdi")?.textContent
		}' Length: ${
			document.querySelector<HTMLDivElement>(".length")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Recording",
				url: href,
			},
		];
		switch (recordingPath) {
			case "fingerprints":
			case "aliases":
			case "tags":
			case "reviews":
			case "details": {
				presenceData.state = `${document.querySelector(
					".sel bdi"
				)} for ${recordingName}`;
				break;
			}
			case "edit": {
				presenceData.details = "Editing release";
				presenceData.state = recordingName;
				delete presenceData.buttons;
				break;
			}
			default: {
				presenceData.state = recordingName;
			}
		}
	} else if (pathname.startsWith("/search")) {
		presenceData.details = "Searching";
		presenceData.state = new URLSearchParams(search).get("query");
	} else if (pathname.startsWith("/url/")) {
		if (pathname.endsWith("/edit")) {
			presenceData.details = "Editing URL";
		} else {
			presenceData.details = "Viewing URL";
		}
		presenceData.state = document.querySelector("bdi").textContent;
	} else {
		presenceData.details = "Browsing...";
		presenceData.state = document.title.split(" - MusicBrainz")[0];
	}

	presence.setActivity(presenceData);
});
