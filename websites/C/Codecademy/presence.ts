const presence = new Presence({
		clientId: "736516965748834336",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	start = Date.now();

let videoTitle: string,
	videoCurrentTime: number,
	videoDuration: number,
	videoPaused: boolean;

interface DataInterface {
	title: string;
	currentTime: number;
	duration: number;
	paused: boolean;
}

const assets: Record<string, string> = {
  "git": "https://cdn.discordapp.com/app-assets/736516965748834336/737966303356256286.png?size=512",
  "html": "https://cdn.discordapp.com/app-assets/736516965748834336/737966303746195467.png?size=512",
  "css": "https://cdn.discordapp.com/app-assets/736516965748834336/737966304186597417.png?size=512",
  "the_command_line": "https://cdn.discordapp.com/app-assets/736516965748834336/737966305407139951.png?size=512",
  "node_with_sqlite": "https://cdn.discordapp.com/app-assets/736516965748834336/737966305625374730.png?size=512",
  "ruby_on_rails": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306065776673.png?size=512",
  "python_2": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306300526663.png?size=512",
  "javascript": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306627682357.png?size=512",
  "go": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306632138752.png?size=512",
  "authentication_with_ruby_on_rails": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306669625374.png?size=512",
  "java": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306749579404.png?size=512",
  "python_3": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306837528617.png?size=512",
  "swift": "https://cdn.discordapp.com/app-assets/736516965748834336/737966306850111529.png?size=512",
  "r": "https://cdn.discordapp.com/app-assets/736516965748834336/737966307089186886.png?size=512",
  "kotlin": "https://cdn.discordapp.com/app-assets/736516965748834336/737966308125311028.png?size=512",
  "ruby": "https://cdn.discordapp.com/app-assets/736516965748834336/737966308184031243.png?size=512",
  "sql": "https://cdn.discordapp.com/app-assets/736516965748834336/737966308821434468.png?size=512",
  "php": "https://cdn.discordapp.com/app-assets/736516965748834336/737966308985143389.png?size=512",
  "csharp": "https://cdn.discordapp.com/app-assets/736516965748834336/737966391935893515.png?size=512",
  "cplusplus": "https://cdn.discordapp.com/app-assets/736516965748834336/737966392044945510.png?size=512",
}

presence.on("iFrameData", (data: DataInterface) => {
	videoTitle = data.title;
	videoCurrentTime = data.currentTime;
	videoDuration = data.duration;
	videoPaused = data.paused;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/C/Codecademy/assets/logo.png",
		},
		pathArray: string[] = window.location.pathname
			.replace(/^\/|\/$/g, "")
			.split("/");
	let heading: Element | string =
			document.querySelector("[class^=headerTitle__]") ||
			document.querySelector("[class^=trackTitle__]"),
		premiumPath: boolean;

	switch (pathArray[0]) {
		case "learn":
			switch (pathArray.length) {
				case 1:
					presenceData.details = "At the dashboard";
					break;
				case 2:
					presenceData.details = "Looking at a course";
					presenceData.state = `"${
						document.querySelector("main h1").textContent
					}"`;
					presenceData.smallImageKey = assets[document
						.querySelector("main h1")
						.textContent.split(" ")
						.slice(1)
						.join(" ")
						.toLowerCase()
						.replace(" ", "_")
						.replace("+", "plus")
						.replace("#", "sharp")];
					presenceData.smallImageText = document
						.querySelector("main h1")
						.textContent.split(" ")
						.slice(1)
						.join(" ");
					break;
				case 3:
					presenceData.details = "Looking at a path";
					presenceData.state = `"${
						document.querySelector("[class^=goalHeader__]")
							? document
									.querySelector("main h1")
									.textContent.slice(
										document.querySelector("[class^=goalHeader__]").textContent
											.length
									)
							: document.querySelector("main h1").textContent
					}"`;
					break;
				case 4:
					presenceData.details = "Looking at a course module";
					presenceData.state = `"${
						document.querySelector("main h1").textContent
					}"`;
			}
			break;
		case "courses":
		case "paths":
			premiumPath = false;
			if (heading.className.startsWith("trackTitle__")) premiumPath = true;
			heading = heading.textContent;
			if (pathArray[0] === "courses" && heading.startsWith("Learn ")) {
				presenceData.smallImageKey = assets[heading
					.split(" ")
					.slice(1)
					.join(" ")
					.toLowerCase()
					.replace(" ", "_")
					.replace("+", "plus")
					.replace("#", "sharp")];
				presenceData.smallImageText = heading.split(" ").slice(1).join(" ");
			}
			presenceData.details = heading.startsWith("Learn ")
				? `Learning ${heading.split(" ").slice(1).join(" ")}`
				: premiumPath
				? "Looking at a path"
				: heading;
			if (videoTitle) {
				presenceData.details = "Watching a video";
				presenceData.state = videoTitle;
				presenceData.smallImageKey = videoPaused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = videoPaused
					? (await strings).pause
					: (await strings).play;
				if (videoDuration && !videoPaused) {
					presenceData.endTimestamp =
						Date.now() + (videoDuration - videoCurrentTime) * 1000;
				}
			} else {
				presenceData.startTimestamp = start;
				const bodyHeading = document.querySelector(
						"[class^=contentItemTitle__]"
					),
					articleTitle = document.querySelector("[class^=articleTitle_]");
				if (bodyHeading) presenceData.state = bodyHeading.textContent;
				if (articleTitle) {
					presenceData.details = "Reading an article";
					presenceData.state = articleTitle.textContent;
				}
				if (premiumPath) {
					presenceData.state = heading;
					delete presenceData.startTimestamp;
				}
			}
			presenceData.state = `"${presenceData.state}"`;
			break;
		case "login":
			presenceData.details = "Logging in";
			break;
		case "register":
			presenceData.details = "Registering";
			break;
		case "catalog":
			if (pathArray[1] === "language") {
				presenceData.details = `Looking at ${
					document.querySelector("#catalog-heading").textContent
				}`;
				presenceData.state = "in the catalog";
				presenceData.smallImageKey = assets[document
					.querySelector("#catalog-heading")
					.textContent.toLowerCase()
					.replace(" ", "_")
					.replace("+", "plus")
					.replace("#", "sharp")];
				presenceData.smallImageText =
					document.querySelector("#catalog-heading").textContent;
			} else if (pathArray[1] === "subject") {
				presenceData.details = "Looking at a subject";
				presenceData.state = `"${
					document.querySelector("#catalog-heading").textContent
				}"`;
			} else {
				presenceData.details = "Browsing the catalog";
				presenceData.state = "of available languages";
			}
			break;
		case "subscriptions":
			presenceData.details = "Considering the PRO";
			presenceData.state = "subscription";
			break;
		case "explore":
			presenceData.details = "Exploring...";
			break;
		case "":
			if (window.location.hostname === "news.codecademy.com")
				presenceData.details = "Browsing articles";
			else presenceData.details = "At the homepage";

			break;
		case "pricing":
			presenceData.details = "Checking out the";
			presenceData.state = "paid plans";
			break;
		case "business":
			presenceData.details = "Checking out the";
			presenceData.state = "bussiness plans";
			break;
		case "articles":
			if (pathArray[1]) {
				presenceData.details = "Reading an article";
				presenceData.state = `"${
					document.querySelector("[class^=articleHeader__]").textContent
				}"`;
			} else presenceData.details = "Browsing articles";

			break;
		default:
			if (window.location.hostname === "news.codecademy.com") {
				presenceData.details = "Reading an article";
				presenceData.state = `"${
					document.querySelector(".post-full-title").textContent
				}"`;
			} else presenceData.details = "Idle";
			break;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
