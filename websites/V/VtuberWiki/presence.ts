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
			buttons: [{ label: "View The FAQ", url: "https://www.vtubers.wiki/faq" }],
		},
		"/api": {
			details: "Viewing the API",
			buttons: [{ label: "View the API", url: "https://www.vtubers.wiki/api" }],
		},
		"/changelog": {
			details: "Viewing the Changelog",
			largeImageKey: Assets.Log,
			buttons: [
				{
					label: "View the Changelog",
					url: "https://www.vtubers.wiki/changelog",
				},
			],
		},
	};

const enum Assets {
	Cog = "https://cdn.rcd.gg/PreMiD/websites/V/VtuberWiki/assets/0.png",
	Book = "https://cdn.rcd.gg/PreMiD/websites/V/VtuberWiki/assets/1.png",
	Logo = "https://cdn.rcd.gg/PreMiD/websites/V/VtuberWiki/assets/logo.png",
	Log = "https://cdn.rcd.gg/PreMiD/websites/V/VtuberWiki/assets/2.png",
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
						presenceData.largeImageKey = `https://www.vtubers.wiki/vtubers/${pathSplit[2]}/photo.jpg`;
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
						presenceData.buttons = [{ label: `View ${pageTitle}`, url: href }];
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
