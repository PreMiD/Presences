const presence = new Presence({
		clientId: "961652082027421746",
	}),
	browsingTimestamp = Math.floor(Date.now()),
	formats = [
		"js",
		"jsx",
		"ts",
		"tsx",
		"json",
		"py",
		"cpp",
		"cs",
		"c",
		"py",
		"swift",
		"java",
		"html",
		"css",
		"php",
		"kt",
		"sql",
		"lua",
		"ru",
		"bash",
		"sh",
		"bat",
		"cr",
		"go",
		"rs",
	];
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/C/CodeSandbox/assets/logo.png",
			smallImageKey: "https://cdn.discordapp.com/app-assets/961652082027421746/961655974333141062.png?size=512",
			smallImageText: "CodeSandbox",
			details: "Loading",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = window.location;
	if (pathname.startsWith("/")) {
		if (document.querySelector<HTMLDivElement>('[class="ReactModalPortal"]')) {
			presenceData.details = "Creating a new sandbox!";
			presenceData.largeImageKey = "create";
		} else if (pathname.includes("/dashboard/home")) {
			presenceData.details = "Looking at their dashboard";
			presenceData.state = "Page: Home";
			presenceData.largeImageKey = "dashboard";
		} else if (pathname.includes("/dashboard/discover")) {
			presenceData.details = "Discovering other sandboxes";
			presenceData.state = "Page: Discover";
			presenceData.largeImageKey = "discover";
		} else if (pathname.includes("/dashboard/drafts")) {
			presenceData.details = "Looking at their drafts";
			presenceData.state = "Page: Drafts";
			presenceData.largeImageKey = "drafts";
		} else if (pathname.includes("/dashboard/all")) {
			presenceData.details = "Looking through their sandboxes";
			presenceData.state = "Page: All Sandboxes";
			presenceData.largeImageKey = "all";
		} else if (pathname.includes("/dashboard/templates")) {
			presenceData.details = "Looking through their templates";
			presenceData.state = "Page: Templates";
			presenceData.largeImageKey = "templates";
		} else if (pathname.includes("/dashboard/repositories")) {
			presenceData.details = "Looking through their repositories";
			presenceData.state = "Page: Repositories";
			presenceData.largeImageKey = "repositories";
		} else if (pathname.includes("/dashboard/recent")) {
			presenceData.details = "Looking through their recent sandboxes";
			presenceData.state = "Page: Recently Modified";
			presenceData.largeImageKey = "recent";
		} else if (pathname.includes("/dashboard/deleted")) {
			presenceData.details = "Looking through their trashed sandboxes";
			presenceData.state = "Page: Recently Deleted";
			presenceData.largeImageKey = "deleted";
		} else if (pathname.includes("/dashboard/shared")) {
			presenceData.details = "Looking at shared sandboxes";
			presenceData.state = "Page: Shared With Me";
			presenceData.largeImageKey = "shared";
		} else if (pathname.includes("/dashboard/liked")) {
			presenceData.details = "Looking at liked sandboxes";
			presenceData.state = "Page: Liked Sandboxes";
			presenceData.largeImageKey = "liked";
		} else if (pathname.includes("/u/")) {
			presenceData.details = "Looking at a user's profile:";
			presenceData.state = `${
				document.querySelector<HTMLSpanElement>(
					'[class="sc-bdnylx sc-gtssRu gDXMLZ hHsTZp"]'
				).textContent
			} (@${
				document.querySelector<HTMLSpanElement>(
					'[class="sc-bdnylx sc-gtssRu gDXMLZ itZLEx"]'
				).textContent
			})`;
			presenceData.largeImageKey = "profile";
			presenceData.buttons = [
				{
					label: "View Profile",
					url: location.href.toString(),
				},
			];
		} else if (pathname.includes("/s/")) {
			if (
				document.querySelector<HTMLButtonElement>('[aria-label="Explorer"]')
			) {
				const cfile = search.split("/").filter(elm => elm !== ""),
					formatImg = search.split(".").filter(elm => elm !== "");
				presenceData.details = `Editing ${
					search
						? ` ${cfile[cfile.length - 1].replace(
								/(:)|[0-9]|(-)/g,
								""
						  )} (${document
								.querySelector<HTMLAnchorElement>('[title="Go to Line"]')
								.textContent.replace(/\(|([0-9]*) selected\)/g, "")})`
						: "a sandbox"
				}`;
				presenceData.state = `Workspace: ${document.title.split("-")[0]}`;
				if (
					formats.includes(
						formatImg[formatImg.length - 1]
							/*.toLowerCase()*/
							.replace(/(:)|[0-9]|(-)/g, "")
					)
				) {
					presenceData.largeImageKey = `${formatImg[formatImg.length - 1]
						.toLowerCase()
						.replace(/(:)|[0-9]|(-)/g, "")}`;
				} else presenceData.largeImageKey = "txt";
			} else {
				presenceData.details = `Looking at ${
					document.querySelector<HTMLSpanElement>(
						'[class="sc-bdnylx sc-gtssRu gDXMLZ kEgnIE"]'
					).textContent
				}'s sandbox`;
				presenceData.state = `Workspace: ${
					document.querySelector<HTMLButtonElement>(
						'[class="sc-bdnylx sc-gtssRu gDXMLZ efjlMo"]'
					).textContent
				}`;
				presenceData.largeImageKey = "usersandbox";
				presenceData.buttons = [
					{
						label: "View Sandbox",
						url: location.href.toString(),
					},
				];
			}
		} else {
			presenceData.details = "Viewing an unsupported CodeSandbox page";
			presenceData.largeImageKey = "unknown";
		}
	}
	presence.setActivity(presenceData);
});
