const presence = new Presence({
		clientId: "1122404044829380739",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/KQvYGoh.png",
			startTimestamp: browsingTimestamp,
		},
		{ host, pathname } = document.location,
		path = pathname.slice(1).split("/"),
		[showTimestamp, showButtons] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("buttons"),
		]),
		makeURL = (p: string) => `https://${host}${p}`;

	switch (path[0]) {
		case "": {
			presenceData.details = "viewing the front page";
			break;
		}
		// Game pages
		case "play": {
			const gameId = path[1];
			if (gameId) {
				const gameName =
						document.querySelector<HTMLHeadingElement>(
							"#game-title"
						)?.textContent,
					currentLevel = document.querySelector<HTMLSpanElement>(
						"#progress > .level > span"
					)?.textContent,
					// "N / D"
					xpRatio = document.querySelector<HTMLSpanElement>(
						"#progress > .xp > span"
					)?.textContent;

				presenceData.details = gameName
					? `playing ${gameName}`
					: "playing a game";
				if (currentLevel && xpRatio) {
					const [currentXP, neededXP] = xpRatio.split("/").map(n => n.trim());

					presenceData.state = `level ${currentLevel} | ${currentXP}/${neededXP} xp`;
				}
				presenceData.buttons = [
					{
						label: "play game",
						url: makeURL(`/play/${gameId}`),
					},
				];
			}
			break;
		}
		case "edit": {
			const gameId = path[1];
			if (gameId) {
				const gameName = document.querySelector<HTMLAnchorElement>(
					"#container > h1 > a"
				)?.textContent;

				presenceData.details = gameName
					? `editing ${gameName}`
					: "editing a game";
				presenceData.buttons = [
					{
						label: "play game",
						url: makeURL(`/play/${gameId}`),
					},
				];
			}
			break;
		}
		case "publish": {
			const gameName = document.querySelector<HTMLInputElement>(
				'div[data-label="game name"] > input'
			)?.value;

			presenceData.details = "publishing a new game";
			if (gameName) presenceData.state = `"${gameName}"`;
			break;
		}
		case "manage": {
			presenceData.details = "managing their games";
			break;
		}
		case "comments": {
			const gameId = path[1];
			if (gameId) {
				presenceData.details = "reading game comments";
				presenceData.buttons = [
					{
						label: "read comments",
						url: makeURL(`/comments/${gameId}`),
					},
				];
			}
			break;
		}
		case "updates": {
			const gameId = path[1];
			if (gameId) {
				presenceData.details = "reading game updates";
				presenceData.buttons = [
					{
						label: "read updates",
						url: makeURL(`/updates/${gameId}`),
					},
				];
			}
			break;
		}
		// User pages
		case "user": {
			const userId = path[1];
			if (userId) {
				const username =
					document.querySelector<HTMLParagraphElement>(
						"#big-username"
					)?.textContent;

				presenceData.details = username
					? `viewing ${username}'s profile`
					: "viewing a profile";
				presenceData.buttons = [
					{
						label: "view profile",
						url: makeURL(`/user/${userId}`),
					},
				];
			}
			break;
		}
		case "you": {
			presenceData.details = "editing their profile";
			break;
		}
		case "themes": {
			const lightTheme = document.querySelector<HTMLDivElement>(
					'#t-light > button[disabled=""]'
				)?.textContent,
				darkTheme = document.querySelector<HTMLDivElement>(
					'#t-dark > button[disabled=""]'
				)?.textContent;

			presenceData.details = "choosing themes";
			if (lightTheme && darkTheme)
				presenceData.state = `☀️ ${lightTheme} 🌙 ${darkTheme}`;
			break;
		}
		case "theme-preview": {
			presenceData.details = "previewing a theme";
			break;
		}
		case "filters": {
			presenceData.details = "choosing site-wide filters";
			break;
		}
		case "level": {
			// NOTE: The level and XP counters are animated to rise to their actual values once the page is opened.
			//       which doesn't look good when shown in the presence.

			presenceData.details = "viewing their level progression";
			break;
		}
		case "playtime": {
			presenceData.details = "viewing their total playtime";
			break;
		}
		case "favorites": {
			presenceData.details = "viewing their favorite games";
			break;
		}
		case "inbox": {
			const unreadMessageCount =
				document.querySelectorAll<HTMLDivElement>("#sidebar > .unread").length;

			presenceData.details = "checking their inbox";
			presenceData.state = `${unreadMessageCount} unread message${
				unreadMessageCount === 1 ? "" : "s"
			}`;
			break;
		}
		// Chat & forums
		case "chat": {
			const channel = path[1];

			if (channel) {
				const onlineAnonsElem =
					document.querySelector<HTMLButtonElement>("#anon-count");

				presenceData.details = `chatting in #${channel}`;
				presenceData.state = `${
					// Online user count
					document.querySelectorAll<HTMLDivElement>("#rightbar > div > a")
						.length +
					// Online anon count
					(onlineAnonsElem
						? parseInt(onlineAnonsElem.textContent.split(" ")[0].trim())
						: 0)
				} online`;
				presenceData.buttons = [
					{
						label: "join chat",
						url: makeURL(`/chat/${channel}`),
					},
				];
			} else presenceData.details = "finding a channel to chat in";
			break;
		}
		case "forum": {
			presenceData.details = "browsing the forums";

			switch (path[1]) {
				case "category": {
					const categorySlug = path[2];
					if (categorySlug) {
						presenceData.details = `browsing #${categorySlug}`;
						presenceData.buttons = [
							{
								label: "view category",
								url: makeURL(`/forum/category/${categorySlug}`),
							},
						];
					}
					break;
				}
				case "thread": {
					const threadId = path[2];
					if (threadId) {
						const threadName =
								document.querySelector<HTMLHeadingElement>(
									".thread-title"
								)?.textContent,
							currentlyReplying =
								document.querySelector<HTMLTextAreaElement>(
									".add-post textarea"
								)?.textLength > 0,
							currentlyEditing =
								document.querySelectorAll<HTMLDivElement>(
									".post-info > .post-composer"
								).length > 0;

						presenceData.details = threadName
							? `reading a thread: "${threadName}"`
							: "reading a thread";
						if (currentlyReplying) presenceData.state = "writing a reply";
						else if (currentlyEditing)
							presenceData.state = "editing their post";
						presenceData.buttons = [
							{
								label: "read thread",
								url: makeURL(`/forum/thread/${threadId}`),
							},
						];
					}
					break;
				}
				case "compose": {
					const categorySlug = path[2];
					if (categorySlug) {
						const threadName =
							document.querySelector<HTMLInputElement>("#input-title")?.value;

						presenceData.details = `making a thread in #${categorySlug}`;
						if (threadName) presenceData.state = `"${threadName}"`;
						presenceData.buttons = [
							{
								label: "view category",
								url: makeURL(`/forum/category/${categorySlug}`),
							},
						];
					}
					break;
				}
			}
			break;
		}
		// Search & explore
		case "search": {
			const query = document.querySelector<HTMLInputElement>(
				'#container input[type="search"]'
			)?.value;

			presenceData.details = "searching for games";
			if (query) presenceData.state = `"${query}"`;
			presenceData.buttons = [
				{
					label: "search games",
					url: makeURL("/search"),
				},
			];
			break;
		}
		case "explore": {
			const categories: Record<string, string> = {
					top: "browsing the top-rated games",
					faves: "browsing the most favorited games",
					recent: "browsing the most recently updated games",
					playtime: "browsing the most grinded games",
					new: "browsing the newest games",
					random: "browsing random games",
				},
				category = path[1];

			presenceData.details = categories[category] || "browsing for games";
			presenceData.buttons = [
				{
					label: "explore games",
					url: makeURL(`/explore/${category}`),
				},
			];
			break;
		}
		// Other pages
		case "signup": {
			presenceData.details = "signing up";
			break;
		}
		case "request": {
			const gameName = document.querySelector<HTMLInputElement>(
				'div[data-label="game name"] > input'
			)?.value;

			presenceData.details = "requesting a game";
			if (gameName) presenceData.state = `"${gameName}"`;
			presenceData.buttons = [
				{
					label: "request game",
					url: makeURL("/request"),
				},
			];
			break;
		}
		case "stats": {
			presenceData.details = "viewing site statistics";
			presenceData.buttons = [
				{
					label: "view stats",
					url: makeURL("/stats"),
				},
			];
			break;
		}
		case "cluster": {
			presenceData.details = "trying out galaxy cluster";
			presenceData.buttons = [
				{
					label: "galaxy cluster",
					url: makeURL("/cluster"),
				},
			];
			break;
		}
		case "dev": {
			presenceData.details = "becoming a developer";
			presenceData.buttons = [
				{
					label: "view page",
					url: makeURL("/dev"),
				},
			];
			break;
		}
		case "docs": {
			presenceData.details = "reading the documentation";
			presenceData.buttons = [
				{
					label: "read the docs",
					url: makeURL(`${path.map(p => `/${p}`).join("")}`),
				},
			];
			break;
		}
		case "about": {
			presenceData.details = "reading about galaxy";
			presenceData.buttons = [
				{
					label: "view page",
					url: makeURL("/about"),
				},
			];
			break;
		}
		case "rules": {
			presenceData.details = "reviewing the site rules";
			presenceData.buttons = [
				{
					label: "view page",
					url: makeURL("/rules"),
				},
			];
			break;
		}
		case "terms": {
			presenceData.details = "reading the terms of service";
			presenceData.buttons = [
				{
					label: "view page",
					url: makeURL("/terms"),
				},
			];
			break;
		}
		case "privacy": {
			presenceData.details = "reading the privacy policy";
			presenceData.buttons = [
				{
					label: "view page",
					url: makeURL("/privacy"),
				},
			];
			break;
		}
		case "cookies": {
			presenceData.details = "reading the cookie policy";
			presenceData.buttons = [
				{
					label: "view page",
					url: makeURL("/cookies"),
				},
			];
			break;
		}
		case "banned": {
			presenceData.details = "banned";
			break;
		}
		case "pogger": {
			// https://galaxy.click/pogger
			presenceData.buttons = [
				{
					label: "pogger button",
					url: "https://save418.com",
				},
			];
			break;
		}
	}

	if (!showTimestamp) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	if (!showButtons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
