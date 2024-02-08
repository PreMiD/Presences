const presence = new Presence({ clientId: "858292108195921920" }),
	startedAt = Date.now(),
	supportedLanguages: string[] = [
		"js",
		"md",
		"json",
		"gitignore",
		"txt",
		"html",
		"css",
	];

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/Autocode/assets/logo.jpg",
	Snippet = "https://cdn.discordapp.com/app-assets/858292108195921920/868478789498335242.png?size=512",
	Apps = "https://cdn.discordapp.com/app-assets/858292108195921920/868482859281825832.png?size=512",
	Lib = "https://cdn.discordapp.com/app-assets/858292108195921920/868484101370433536.png?size=512",
	Autocode = "https://cdn.discordapp.com/app-assets/858292108195921920/868458144307752990.png?size=512",
}

const assets = {
  "lang-html": "https://cdn.discordapp.com/app-assets/858292108195921920/868489344447569990.png?size=512",
  "lang-css": "https://cdn.discordapp.com/app-assets/858292108195921920/868502199699906640.png?size=512",
  "lang-js": "https://cdn.discordapp.com/app-assets/858292108195921920/868502501207470080.png?size=512",
  "lang-json": "https://cdn.discordapp.com/app-assets/858292108195921920/868502619084161056.png?size=512",
  "lang-txt": "https://cdn.discordapp.com/app-assets/858292108195921920/868502804367540224.png?size=512",
  "lang-md": "https://cdn.discordapp.com/app-assets/858292108195921920/868503178247823401.png?size=512",
  "lang-gitignore": "https://cdn.discordapp.com/app-assets/858292108195921920/868503747905597480.png?size=512",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:Assets.Logo,
			startTimestamp: startedAt,
		},
		{ pathname, hostname } = window.location,
		path = pathname.split("/").slice(1),
		[details, state, timestamp] = await Promise.all([
			presence.getSetting<string>("editingDetails"),
			presence.getSetting<string>("editingState"),
			presence.getSetting<boolean>("timestamp"),
		]);

	if (pathname.includes("/snippet")) {
		if (path.length >= 3) {
			presenceData.details = document
				.querySelector("h1.snippet-title.h3")
				.textContent.trim();
		} else presenceData.details = "Looking for Snippets";
		presenceData.state = `${hostname}/${path[0]}`;
		presenceData.smallImageKey = Assets.Snippet;
	} else if (pathname.includes("/app")) {
		if (path.length >= 3) {
			presenceData.details = document
				.querySelector("h1.jumbo")
				.textContent.trim();
		} else presenceData.details = "Looking for Apps";
		presenceData.state = `${hostname}/${path[0]}`;
		presenceData.smallImageKey = Assets.Apps;
	} else if (pathname.includes("/lib")) {
		if (path.length >= 3) presenceData.details = `Reading ${path[1]} docs`;
		else presenceData.details = "Looking for Docs";
		presenceData.state = `${hostname}/${path[0]}`;
		presenceData.smallImageKey = Assets.Lib;
	} else if (pathname.includes("/mp/")) {
		const filename = document
			.querySelector("div.filename > [data-filename]")
			?.textContent?.split("/")
			?.pop();

		if (filename) {
			const extension = filename.match(/\.\w+/g)?.[0]?.replace(".", ""),
				[line, column] = document
					.querySelector("div.filename > [data-cursor]")
					.textContent.split(":"),
				replaceTemplate = (str: string) => {
					if (str === "{0}") return;
					else {
						return str
							.replace("%project%", path[2])
							.replace("%file%", filename)
							.replace("%line%", line)
							.replace("%column%", column);
					}
				};

			presenceData.details = replaceTemplate(details);
			presenceData.state = replaceTemplate(state);
			presenceData.smallImageKey = Assets.Autocode;

			if (extension && supportedLanguages.includes(extension))
				presenceData.largeImageKey = assets[`lang-${extension}` as keyof typeof assets];
			else presenceData.largeImageKey =Assets.Autocode;
		}
	}

	if (!timestamp) delete presenceData.startTimestamp;

	if (presenceData.details || presenceData.state)
		presence.setActivity(presenceData);
	else presence.setActivity();
});
