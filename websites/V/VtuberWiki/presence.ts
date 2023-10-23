type StaticPagesType = Record<string, PresenceData>;

const presence = new Presence({
		clientId: "1164189020922843257",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	staticPages: StaticPagesType = {
		"/": {
			details: "Viewing the homepage",
		},
		"/faq": {
			details: "Viewing the FAQ",
			buttons: [{ label: "View The FAQ", url: "https://wiki.hylia.dev/faq" }],
		},
		"/api": {
			details: "Viewing the API",
			buttons: [{ label: "Browse the API", url: "https://wiki.hylia.dev/api" }],
		},
	};

const enum Assets {
	Cog = "https://cdn.rcd.gg/PreMiD/websites/V/VtuberWiki/assets/0.png",
	Book = "https://cdn.rcd.gg/PreMiD/websites/V/VtuberWiki/assets/1.png",
	Logo = "https://cdn.rcd.gg/PreMiD/websites/V/VtuberWiki/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const { pathname, href } = document.location,
		pathSplit = pathname.split("/").slice(1),
		pageTitle = document.title.split(" | ")[0]?.trim();

	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	for (const [path, data] of Object.entries(staticPages))
		if (pathname.startsWith(path)) presenceData = { ...presenceData, ...data };

	switch (pathSplit[0]) {
		case "wiki":
			switch (pathSplit[1]) {
				case "vtubers":
					if (pathSplit[2]) {
						presenceData.largeImageKey = `https://wiki.hylia.dev/vtubers/${pathSplit[2]}/photo.jpg`;
						presenceData.details = "Viewing a Vuber";
						presenceData.state = `${pageTitle} • ${
							document.querySelector("#vtuber-desc")?.textContent
						}`;
						presenceData.buttons = [
							{ label: `View ${pathSplit[2]}`, url: href },
						];
					} else presenceData.details = "Viewing All The Vtubers";

					break;
				case "software":
					if (pathSplit[2]) {
						presenceData.largeImageKey = Assets.Cog;
						presenceData.details = "Viewing Software";
						presenceData.state = `${pageTitle}`;
						presenceData.buttons = [
							{ label: `View ${pathSplit[2]}`, url: href },
						];
					} else presenceData.details = "Viewing All The Software";

					break;
				case "guides":
					if (pathSplit[2]) {
						presenceData.largeImageKey = Assets.Book;
						presenceData.details = "Viewing Guides";
						presenceData.state = `${pageTitle}`;
						presenceData.buttons = [{ label: "View Guide", url: href }];
					} else presenceData.details = "Viewing All The Guides";
					break;
				default:
					presenceData.details = "Viewing The wiki";
					presenceData.state = pageTitle;
					presenceData.buttons = [{ label: "View Wiki", url: href }];
			}
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
