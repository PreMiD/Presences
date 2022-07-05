/* eslint-disable no-case-declarations */
const presence = new Presence({
		clientId: "607587875122446359",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "lg",
	};
	const pages: Record<string, PresenceData> = {
			login: {
				details: "Logging in",
			},
			settings: {
				details: "Viewing settings",
			},
			explore: {
				details: "Browsing repositories",
			},
			discover: {
				details: "Browsing repositories",
			},
			marketplace: {
				details: "Browsing marketplace",
			},
			pulls: { details: "Viewing pull requests" },
			issues: { details: "Viewing issues" },
			notifications: {
				details: "Viewing notifications",
			},
			watching: { details: "Browsing interested repositories" },
			new: { details: "Creating a repository" },
			topics: { details: "Browsing topics" },
			trending: { details: "Browsing trending repositories" },
			collections: { details: "Browsing collections" },
			events: { details: "Browsing events" },
			codespaces: { details: "Browsing codespaces" },
			search: {
				details: "Searching for",
				state: new URLSearchParams(document.location.search).get("q"),
			},
			"trending/developers": {
				details: "Browsing trending developers",
			},
			"new/import": { details: "Importing a repository" },
			"new/project": { details: "Creating a project" },
			"organization/new": { details: "Creating an organization" },
			"notifications/subscriptions": {
				details: "Viewing subscriptions",
			},
		},
		{ pathname, search, href } = document.location,
		[cover, timestamp] = await Promise.all([
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("timestamp"),
		]);

	for (const [path, data] of Object.entries(pages)) {
		if (pathname.includes(`/${path}`))
			presenceData = { ...presenceData, ...data };
	}

	switch (true) {
		// * For Profiles
		case !!document.querySelector<HTMLBodyElement>("body.page-profile"):
			const searchParam = new URLSearchParams(search).get("tab"),
				profileName = document
					.querySelector("span.p-nickname")
					.textContent.trim();
			presenceData.buttons = [{ label: "View Profile", url: href }];
			if (cover) {
				presenceData.largeImageKey = `${
					document.querySelector<HTMLImageElement>("img.avatar").src
				}.png`;
			}
			if (searchParam)
				presenceData.details = `Viewing ${profileName}'s ${searchParam}`;
			else presenceData.details = `Viewing ${profileName}'s profile`;
			break;
		// * For repositories
		case !!document.querySelector<HTMLDivElement>(
			"div#repository-container-header"
		):
			const repository = {
				owner: pathname.split("/")[1],
				name: pathname.split("/")[2],
				target: pathname.split("/")[4],
				id: pathname.split("/")[4],
			};
			presenceData.buttons = [{ label: "View Repository", url: href }];
			if (cover) {
				presenceData.largeImageKey = `https://avatars.githubusercontent.com/u/${
					document.querySelector<HTMLMetaElement>(
						'meta[name~="octolytics-dimension-user_id"]'
					).content
				}`;
			}
			if (pathname.includes("/tree/")) {
				presenceData.details = `Browsing repository ${repository.owner}/${repository.name}`;

				presenceData.state = `In folder ${pathname
					.split("/")
					.slice(4)
					.join("/")}`;
			} else if (pathname.includes("/blob/")) {
				presenceData.details = `Browsing repository ${repository.owner}/${repository.name}`;
				presenceData.state = `Viewing file ${document
					.querySelector("h2#blob-path > strong")
					.textContent.trim()} at ${repository.target}`;
			} else if (pathname.includes("/issues")) {
				if (pathname.includes("/issues/")) {
					presenceData.details = `Looking at issue #${repository.id}`;
					presenceData.state = `${
						document.querySelectorAll<HTMLAnchorElement>("a.author")[0]
							.textContent
					} - ${
						document.querySelector<HTMLHeadingElement>("h1.gh-header-title")
							.textContent
					}`;
					presenceData.buttons = [{ label: "View Issue", url: href }];
				} else {
					presenceData.details = "Browsing issues";
					presenceData.state = `${repository.owner}/${repository.name}`;
				}
			} else if (pathname.includes("/pulls")) {
				presenceData.details = "Browsing pull requests";
				presenceData.state = `${repository.owner}/${repository.name}`;
			} else if (pathname.includes("/pull")) {
				presenceData.details = `Looking at pull request #${repository.id}`;
				presenceData.state = `${
					document.querySelectorAll<HTMLAnchorElement>("a.author")[0]
						.textContent
				} - ${
					document.querySelector<HTMLHeadingElement>("h1.gh-header-title")
						.textContent
				}`;
				presenceData.buttons = [{ label: "View Pull Request", url: href }];
			} else if (pathname.endsWith("/discussions")) {
				presenceData.details = "Browsing discussions in";
				presenceData.state = `${repository.owner}/${repository.name}`;
			} else if (pathname.includes("/discussions/")) {
				presenceData.details = `Looking at discussion #${repository.id}`;
				presenceData.state = `${
					document.querySelectorAll<HTMLAnchorElement>("a.author")[0]
						.textContent
				} - ${
					document.querySelector<HTMLHeadingElement>("h1.gh-header-title")
						.textContent
				}`;
				presenceData.buttons = [{ label: "View Discussion", url: href }];
			} else if (
				pathname.includes("/pulse") ||
				pathname.includes("/graphs/contributors") ||
				pathname.includes("/community") ||
				pathname.includes("/graphs/commit-activity") ||
				pathname.includes("/graphs/code-frequency") ||
				pathname.includes("/network/dependencies") ||
				pathname.includes("/graphs/commit-activity") ||
				pathname.includes("/network") ||
				pathname.includes("/network/members")
			) {
				presenceData.details = `Browsing insights of ${repository.owner} / ${repository.name}`;

				presenceData.state = document.querySelector<HTMLAnchorElement>(
					"nav a.js-selected-navigation-item.selected.menu-item"
				).textContent;
			} else {
				presenceData.details = "Browsing repository";
				presenceData.state = `${repository.owner}/${repository.name}`;
			}
			break;
		case !!document.querySelector<HTMLHeadingElement>(
			"#js-pjax-container > div > header > div.container-xl.pt-4.pt-lg-0.p-responsive.clearfix > div > div.flex-1 > h1"
		):
			presenceData.details = "Viewing an organization";
			presenceData.state =
				document.querySelector<HTMLHeadingElement>("h1").textContent;
			if (cover) {
				presenceData.largeImageKey = `${
					document.querySelector<HTMLImageElement>("div > img").src
				}`;
			}
			break;
		case pathname.includes("/orgs/"):
			presenceData.details = `Viewing ${pathname.split("/")[2]}'s ${
				pathname.split("/")[3]
			}`;
			if (cover) {
				presenceData.largeImageKey = `${
					document.querySelector<HTMLImageElement>("h1 > a > img").src
				}`;
			}
			break;
		case pathname === "/" || !pathname:
			presenceData.details = "Viewing the home page";
			break;
	}
	if (timestamp) presenceData.startTimestamp = browsingTimestamp;
	presence.setActivity(presenceData);
});
