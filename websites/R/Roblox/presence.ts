const presence = new Presence({
		clientId: "612416330003382314",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	dfLgImage = "https://cdn.rcd.gg/PreMiD/websites/R/Roblox/assets/0.png";
let profileName,
	profileId: string,
	profileImg: string,
	profileTabs,
	messageTab,
	friendsTab,
	inventoryTab,
	groupName,
	groupTab,
	groupImage,
	gameId: string,
	gameImage: string,
	gameTab,
	localizationTab: HTMLSpanElement,
	localizationGameName,
	transactionsTab,
	dfPrevTopic: string,
	dfTopicName = "[Loading...]",
	talentUserData: [string, string] = ["0", "0"];

presence.on("UpdateData", async () => {
	const [buttons, imagesEnabled] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("images"),
		]),
		presenceData: PresenceData = {
			details: "Unknown page",
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/Roblox/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = document.location,
		gameName = document.querySelector<HTMLHeadingElement>(
			"div.game-calls-to-action > div.game-title-container > h1"
		);

	switch (hostname) {
		case "web.roblox.com":
		case "www.roblox.com": {
			const pages: {
				[name: string]: PresenceData;
			} = {
				"/home": { state: "Home" },
				"/my/avatar": { state: "Avatar Editor" },
				"/feeds": { state: "Feed" },
				"/premium": { state: "Premium Membership" },
				"/promocodes": { state: "Promocodes" },
				"/redeem": { state: "Redeem" },
				"/giftcards": { state: "Gift Cards" },
				"/robux": { state: "Robux" },
				"/groups/join": { details: "Browsing groups..." },
				"/trades": { state: "Trades" },
				"/support": { state: "Support" },
				"/translator-portal": { state: "Translator Portal" },
				"/info/roblox-badges": { state: "Badges" },
				"/upgrades": { state: "Buying Product" },
				"/crossdevicelogin": { state: "Quick Log In" },
				"/abusereport/": { state: "Reporting Content Abuse" },
				"/user-ads/create": { state: "Creating Ad" },
				"/login": { state: "Log In" },
			};

			if (pathname.includes("/users") && pathname.includes("/profile")) {
				profileName = document.querySelector<HTMLHeadingElement>(
					"div.header-names > div.profile-display-name"
				);

				profileTabs = document.querySelector<HTMLAnchorElement>(
					"#horizontal-tabs li.rbx-tab.active a"
				);

				if (profileTabs) {
					if (profileTabs.textContent === "Creations") {
						presenceData.details = `Profile: ${profileName.textContent}`;
						presenceData.state = "Browsing creations...";
					}
				} else {
					presenceData.details = "Looking on a profile: ";
					presenceData.state = profileName.textContent;
				}

				const Id = pathname.split("/")[2];

				if (profileId !== Id) {
					const req = await fetch(
						`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${
							pathname.split("/")[2]
						}&size=420x420&format=Png`
					).then(response => response.json());
					profileImg = req.data[0].imageUrl;
					profileId = Id;
				}

				presenceData.largeImageKey = imagesEnabled ? profileImg : "lg";

				if (buttons) {
					presenceData.buttons = [
						{
							label: "Visit Profile",
							url: document.URL,
						},
					];
				}
			} else if (
				pathname.includes("/my/messages") ||
				pathname.includes("/My/Messages")
			) {
				messageTab = document.querySelector<HTMLLIElement>(
					"div.messages-container > div > ul > li.rbx-tab.ng-scope.active"
				);

				presenceData.details = "Messages";
				presenceData.state = `Tab: ${messageTab.textContent}`;
			} else if (pathname.includes("/my/account")) {
				messageTab = document.querySelector<HTMLLIElement>(
					"#settings-container > div > ul > li.menu-option.ng-scope.active"
				);

				presenceData.details = "Settings";
				presenceData.state = `Tab: ${messageTab.textContent}`;
			} else if (pathname.includes("/users/friends")) {
				friendsTab = document.querySelector<HTMLAnchorElement>(
					".rbx-tab-heading.active"
				);

				presenceData.details = "Friends";
				presenceData.state = `Tab: ${friendsTab.textContent}`;
			} else if (
				pathname.includes("/users") &&
				pathname.includes("/inventory")
			) {
				inventoryTab = document.querySelector<HTMLLIElement>(
					"#vertical-menu > li.menu-option.ng-scope.active"
				);

				presenceData.details = "Inventory";
				presenceData.state = inventoryTab.textContent;
			} else if (
				pathname.includes("/groups") &&
				!pathname.includes("/search") &&
				!pathname.includes("/develop")
			) {
				if (pathname.includes("/create"))
					presenceData.details = "Creating New Group";
				else if (pathname.includes("/configure")) {
					groupTab = document.querySelector<HTMLLIElement>(
						"#configure-group .tab-content-group ul .active"
					);

					presenceData.details = "Configuring Group";
					presenceData.state = `Tab: ${groupTab.textContent}`;
				} else {
					groupName = document.querySelector<HTMLHeadingElement>(
						".group-name.text-overflow"
					);
					groupImage = document.querySelector<HTMLImageElement>(
						"div.group-image img"
					);
					groupTab = document.querySelector<HTMLLIElement>(
						"#horizontal-tabs li.rbx-tab.active"
					);

					presenceData.details = groupName.textContent;
					presenceData.state = `Tab: ${groupTab.textContent}`;
					presenceData.largeImageKey = imagesEnabled ? groupImage.src : "lg";

					if (buttons) {
						presenceData.buttons = [
							{
								label: "Visit Group",
								url: document.URL,
							},
						];
					}
				}
			} else if (pathname.includes("/search/groups")) {
				presenceData.details = "Searching for a group:";
				presenceData.state = new URL(href).searchParams.get("keyword");
			} else if (
				(pathname === "/discover/" || pathname === "/discover") &&
				gameName === null
			) {
				presenceData.details = "Browsing games...";
				delete presenceData.state;

				const searchResult = new URL(href).searchParams.get("Keyword");

				if (searchResult) {
					presenceData.details = "Searching for a game: ";
					presenceData.state = searchResult;
				}
			} else if (
				pathname.includes("/games/") &&
				!pathname.includes("/localization")
			) {
				gameTab = document.querySelector<HTMLLIElement>(
					"#horizontal-tabs li.rbx-tab.active"
				);
				const Id = pathname.split("/")[2];

				if (gameId !== Id) {
					const req = await fetch(
						`https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${
							pathname.split("/")[2]
						}&size=512x512&format=Png`
					).then(response => response.json());
					gameImage = req.data[0].imageUrl;
					gameId = Id;
				}

				presenceData.details = `Game: ${gameName.textContent}`;
				presenceData.state = `Tab: ${gameTab.textContent}`;
				presenceData.largeImageKey = imagesEnabled ? gameImage : "lg";
				if (buttons) {
					presenceData.buttons = [
						{
							label: "Visit Game",
							url: document.URL,
						},
					];
				}
			} else if (pathname.includes("/catalog")) {
				const searchResult = new URL(href).searchParams.get("Keyword");

				presenceData.details = "Current page:";
				presenceData.state = "Catalog";

				const itemImage = document.querySelector<HTMLImageElement>(
					"span.thumbnail-span img"
				);

				if (searchResult) {
					presenceData.details = "Searching for an item: ";
					presenceData.state = searchResult;
				} else if (itemImage) {
					presenceData.details = "Looking at Catalog Item:";
					presenceData.largeImageKey = imagesEnabled ? itemImage.src : "lg";
					presenceData.state = document.querySelector<HTMLHeadingElement>(
						".item-name-container h2"
					).textContent;

					if (buttons) {
						presenceData.buttons = [
							{
								label: "View Catalog Item",
								url: document.URL,
							},
						];
					}
				}
			} else if (pathname.includes("/places/")) {
				presenceData.details = "Configuring Place";
				presenceData.state = `Tab: ${
					document.querySelector<HTMLDivElement>(
						"#MasterContainer #navbar div.selected a"
					).textContent || "Unknown"
				}`;
			} else if (pathname.includes("/universes/configure")) {
				presenceData.details = "Configuring Experience";
				presenceData.state = `Tab: ${
					document.querySelector<HTMLDivElement>(
						"#MasterContainer #navbar div.selected a"
					).textContent || "Unknown"
				}`;
			} else if (pathname.includes("/bundles/")) {
				presenceData.details = "Looking at Bundle:";
				presenceData.largeImageKey = imagesEnabled
					? document.querySelector<HTMLImageElement>("span.thumbnail-span img")
							.src
					: "lg";
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".item-name-container h2"
				).textContent;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Bundle",
							url: document.URL,
						},
					];
				}
			} else if (pathname.includes("/search/users")) {
				presenceData.details = "Searching for an user:";
				presenceData.state = new URL(href).searchParams.get("keyword");
			} else if (pathname.includes("/develop")) {
				presenceData.details = "Developer Page";
				const developTabs = document.querySelector<HTMLDivElement>(
					"#DevelopTabs .tab-active"
				).textContent;

				switch (developTabs) {
					case "My Creations": {
						presenceData.state = `Tab: ${developTabs} > ${
							document.querySelector<HTMLAnchorElement>(".tab-item-selected")
								.textContent
						}`;
						break;
					}

					case "Group Creations": {
						presenceData.state = `Tab: ${developTabs} > ${
							document.querySelector<HTMLAnchorElement>(
								'#SelectedGroupId option[selected="selected"]'
							).textContent
						} > ${
							document.querySelector<HTMLAnchorElement>(".tab-item-selected")
								.textContent
						}`;
						break;
					}

					case "Library": {
						const searchResult = new URL(href).searchParams.get("Keyword");

						if (searchResult) {
							presenceData.details = `Searching at ${developTabs} for: `;
							presenceData.state = searchResult;
						} else {
							presenceData.state = `Tab: ${developTabs} > ${
								document.querySelector<HTMLAnchorElement>(
									".selectedAssetTypeFilter"
								).textContent
							}`;
						}
						break;
					}

					default: {
						presenceData.state = `Tab: ${developTabs}`;
						break;
					}
				}
			} else if (pathname.includes("/localization")) {
				if (pathname.includes("/configure")) {
					localizationTab = document.querySelector<HTMLSpanElement>(
						".left-panel ul .active a"
					);

					presenceData.details = "Managing Localizations";
				} else {
					localizationTab = document.querySelector<HTMLSpanElement>(
						".nav-tabs .active .text-lead"
					);
					localizationGameName = document.querySelector<HTMLHeadingElement>(
						"#selenium-game-title-heading"
					);

					if (!localizationGameName) {
						localizationGameName = document.querySelector<HTMLHeadingElement>(
							"div.component-container h4"
						);
					}

					presenceData.details = `Localizing "${
						localizationGameName
							? localizationGameName.textContent
							: "Untilted Game"
					}"`;
				}

				presenceData.state = `Tab: ${localizationTab.textContent}`;
			} else if (pathname.includes("/transactions")) {
				transactionsTab = document.querySelector<HTMLSpanElement>(
					".transaction-type-dropdown .rbx-selection-label"
				).textContent;

				presenceData.details = "Transactions Page";
				presenceData.state = `Tab: ${transactionsTab}`;
			} else if (pathname.includes("/badges/")) {
				presenceData.details = "Looking at Badge:";
				presenceData.largeImageKey = imagesEnabled
					? document.querySelector<HTMLImageElement>("span.thumbnail-span img")
							.src
					: "lg";
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".item-name-container h2"
				).textContent;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Badge",
							url: document.URL,
						},
					];
				}
			} else if (pathname.includes("/library/")) {
				presenceData.details = "Looking at Asset:";
				presenceData.largeImageKey = imagesEnabled
					? document.querySelector<HTMLImageElement>("span.thumbnail-span img")
							.src
					: "lg";
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".item-name-container h2"
				).textContent;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Asset",
							url: document.URL,
						},
					];
				}
			} else if (pathname.includes("/game-pass/")) {
				presenceData.details = "Looking at Gamepass:";
				presenceData.largeImageKey = imagesEnabled
					? document.querySelector<HTMLImageElement>("span.thumbnail-span img")
							.src
					: "lg";
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".item-name-container h2"
				).textContent;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Gamepass",
							url: document.URL,
						},
					];
				}
			} else {
				for (const [i, v] of Object.entries(pages)) {
					if (pathname.includes(i)) {
						presenceData.details = v.details ?? "Current Page: ";
						if (v.state) presenceData.state = v.state;
						else delete presenceData.state;
					}
				}
			}

			if (document.querySelector(".notification-stream-container") !== null) {
				presenceData.details = "Viewing Notifications";
				delete presenceData.state;
			}
			break;
		}

		case "devforum.roblox.com": {
			const pages: {
				[name: string]: PresenceData;
			} = {
				"/": { state: "Browsing Homepage" },
				"/following": { state: "Browsing Following Topics" },
				"/top": { state: "Browsing Top Topics" },
				"/unread": { state: "Browsing Unread Topics" },
				"/latest": { state: "Browsing Latest Topics" },
				"/new": { state: "Browsing New Topics" },
				"/about": { state: "Browsing About" },
				"/faq": { state: "Browsing FAQ" },
				"/categories": { state: "Browsing Categories" },
			};

			presenceData.details = "Surfing the DevForum";
			presenceData.largeImageKey = dfLgImage;

			if (pathname.includes("/t/")) {
				presenceData.state = `Reading "${dfTopicName}"`;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Topic",
							url: document.URL,
						},
					];
				}

				if (dfPrevTopic !== pathname.split("/")[3]) {
					dfPrevTopic = pathname.split("/")[3];

					const req = await (await fetch(`${document.URL}.json`)).json();
					dfTopicName = req.title;

					presenceData.state = `Reading ${dfTopicName}`;
				}
			} else if (
				pathname.includes("/tag/") ||
				(pathname.includes("/c/") && !pathname.includes("/categories/"))
			) {
				presenceData.state = `Browsing ${
					document.title.split("- DevForum | Roblox")[0]
				}`;
			} else if (pathname.includes("/search")) {
				presenceData.state = `Searching "${new URL(href).searchParams.get(
					"q"
				)}"`;
			} else if (pathname.includes("/badges") && !pathname.includes("/u")) {
				presenceData.state = "Browsing Badges";

				if (document.querySelector(".container.show-badge")) {
					presenceData.state = `Browsing ${
						document
							.querySelector(".container.show-badge h1")
							.textContent.split("/")[1]
					} Badge`;
				}
			} else if (pathname.includes("/g/")) {
				presenceData.state = "Browsing Groups";

				if (document.querySelector(".group-info-name")) {
					presenceData.state = `Browsing ${
						document.querySelector(".group-info-name").textContent
					} Group`;
				}
			} else if (pathname.includes("/u/")) {
				const user = document.querySelector(".username").textContent;
				presenceData.state = `Browsing ${user}'s Profile`;
				presenceData.largeImageKey = imagesEnabled
					? document.querySelector<HTMLImageElement>(".user-profile-avatar img")
							.src
					: dfLgImage;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Profile",
							url: document.URL,
						},
					];
				}

				const sections: {
					[name: string]: [string, boolean];
				} = {
					"/summary": [`Browsing ${user}'s Summary`, false],
					"/activity": [`Browsing ${user}'s Activity`, false],
					"/badges": [`Browsing ${user}'s Badges`, false],
					"/preferences": ["Editing Account Preferences", true],
					"/messages": ["Browsing Messages", true],
					"/notifications": ["Browsing Notifications", true],
				};

				if (pathname.includes("/follow")) {
					presenceData.state = "Browsing Network";
					delete presenceData.buttons;

					if (pathname.includes("/followers"))
						presenceData.state = "Looking at Followers";
					else if (pathname.includes("/following"))
						presenceData.state = "Looking at Following";
				} else {
					for (const [i, v] of Object.entries(sections)) {
						if (pathname.includes(i)) {
							presenceData.state = v[0];
							if (v[1] === true) delete presenceData.buttons;
						}
					}
				}
			} else {
				for (const [i, v] of Object.entries(pages))
					if (pathname === i) presenceData.state = v.state;
			}

			if (document.querySelector(".composer-action-createTopic"))
				presenceData.state = "Creating a New Topic";
			else if (document.querySelector(".composer-action-privateMessage"))
				presenceData.state = "Writing a Private Message";
			else if (document.querySelector(".composer-action-reply")) {
				presenceData.state = `Replying To ${
					document
						.querySelector(".composer-action-reply")
						.querySelector(".user-link").textContent
				}`;
			} else if (document.querySelector(".keyboard-shortcuts-modal"))
				presenceData.state = "Browsing Keyboard Shortcuts";
			else if (document.querySelector(".flag-modal.in")) {
				presenceData.state = "Flagging a Post";
				delete presenceData.buttons;
			} else if (document.querySelector(".composer-action-edit")) {
				presenceData.state = "Editing a Post";
				delete presenceData.buttons;
			}
			break;
		}

		case "talent.roblox.com": {
			presenceData.details = "Surfing the Talent Hub";
			presenceData.largeImageKey = dfLgImage;

			if (pathname.includes("/search")) {
				const searchResult = new URL(href).searchParams.get("query");
				if (pathname.includes("/creators")) {
					if (searchResult)
						presenceData.state = `Searching for Creator: ${searchResult}`;
					else presenceData.state = "Browsing Creators";
				} else if (pathname.includes("/jobs")) {
					if (searchResult)
						presenceData.state = `Searching for Job: ${searchResult}`;
					else presenceData.state = "Browsing Jobs";
				}
			} else if (
				pathname.includes("/creators/") &&
				!pathname.includes("/search/") &&
				!pathname.includes("/settings")
			) {
				const Id = pathname.split("/")[2];
				if (talentUserData[0] !== Id) {
					talentUserData = [
						Id,
						document.head.title.replace("'s Creator Page - Talent Hub", ""),
					];
					const req = await fetch(
						`https://users.roblox.com/v1/users/${Id}`
					).then(response => response.json());
					talentUserData = [Id, req.name ?? talentUserData[1]];
				}
				if (!talentUserData[1]) presenceData.state = "Browsing Profile";
				else presenceData.state = `Looking at ${talentUserData[1]}'s Profile`;
				presenceData.largeImageKey = imagesEnabled
					? `https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&userid=${Id}`
					: dfLgImage;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "Visit Profile",
							url: document.URL,
						},
					];
				}
			} else if (
				pathname.includes("/jobs/") &&
				document.querySelector('[data-testid="job-view-header"]')
			) {
				presenceData.state = `Looking at Job Post: ${
					document.querySelector<HTMLParagraphElement>(
						'[data-testid="job-view-header"] .MuiTypography-root.MuiTypography-body1'
					).textContent
				}`;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "Visit Job",
							url: document.URL,
						},
					];
				}
			} else if (pathname.includes("/inbox"))
				presenceData.state = "Browsing Inbox";
			else if (pathname.includes("/settings"))
				presenceData.state = "Editing Settings";
			else if (pathname.includes("/jobs/create"))
				presenceData.state = "Creating Job Post";
			break;
		}
	}

	presence.setActivity(presenceData);
});
