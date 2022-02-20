const presence = new Presence({
		clientId: "612416330003382314"
	}),
	browsingStamp = Math.floor(Date.now() / 1000),
	dfLgImage = "https://i.imgur.com/76AO77L.png";
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
	dfTopicTime: number,
	talentUserData: [string, string] = ["0", "0"];

presence.on("UpdateData", async () => {
	const buttons = await presence.getSetting("buttons"),
		imagesEnabled = await presence.getSetting<boolean>("images"),
		presenceData: PresenceData = {
			details: "Unknown page",
			largeImageKey: "lg"
		},
		{ pathname, hostname } = document.location,
		gameName = <HTMLHeadingElement>(
			document.querySelector(
				"div.game-calls-to-action > div.game-title-container > h2"
			)
		);

	if (hostname === "www.roblox.com" || hostname === "web.roblox.com") {
		const basicPages: {
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
			"/login": { state: "Log In" }
		};

		if (pathname.includes("/users") && pathname.includes("/profile")) {
			profileName = <HTMLHeadingElement>(
				document.querySelector("div.header-names > div.profile-display-name")
			);

			profileTabs = <HTMLAnchorElement>(
				document.querySelector("#horizontal-tabs li.rbx-tab.active a")
			);

			if (profileTabs) {
				if (profileTabs.innerText === "Creations") {
					presenceData.details = `Profile: ${profileName.innerText}`;
					presenceData.state = "Browsing creations...";
					presenceData.startTimestamp = browsingStamp;
				}
			} else {
				presenceData.details = "Looking on a profile: ";
				presenceData.state = profileName.innerText;
				presenceData.startTimestamp = browsingStamp;
			}

			const Id = pathname.split("/")[2];

			if (profileId !== Id) {
				const req = await fetch(
					`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${
						pathname.split("/")[2]
					}&size=420x420&format=Png`,
					{ method: "GET" }
				).then(function (response) {
					return response.json();
				});
				profileImg = req.data[0].imageUrl;
				profileId = Id;
			}

			presenceData.largeImageKey = imagesEnabled ? profileImg : "lg";

			if (buttons) {
				presenceData.buttons = [
					{
						label: "Visit Profile",
						url: document.URL
					}
				];
			}
		} else if (
			pathname.includes("/my/messages") ||
			pathname.includes("/My/Messages")
		) {
			messageTab = <HTMLLIElement>(
				document.querySelector(
					"div.messages-container > div > ul > li.rbx-tab.ng-scope.active"
				)
			);

			presenceData.details = "Messages";
			presenceData.state = `Tab: ${messageTab.innerText}`;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/my/account")) {
			messageTab = <HTMLLIElement>(
				document.querySelector(
					"#settings-container > div > ul > li.menu-option.ng-scope.active"
				)
			);

			presenceData.details = "Settings";
			presenceData.state = `Tab: ${messageTab.innerText}`;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/users/friends")) {
			friendsTab = <HTMLAnchorElement>(
				document.querySelector(".rbx-tab-heading.active")
			);

			presenceData.details = "Friends";
			presenceData.state = `Tab: ${friendsTab.innerText}`;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/users") && pathname.includes("/inventory")) {
			inventoryTab = <HTMLLIElement>(
				document.querySelector(
					"#vertical-menu > li.menu-option.ng-scope.active"
				)
			);

			presenceData.details = "Inventory";
			presenceData.state = inventoryTab.innerText;
			presenceData.startTimestamp = browsingStamp;
		} else if (
			pathname.includes("/groups") &&
			!pathname.includes("/search") &&
			!pathname.includes("/develop")
		) {
			if (pathname.includes("/create"))
				presenceData.details = "Creating New Group";
			else if (pathname.includes("/configure")) {
				groupTab = <HTMLLIElement>(
					document.querySelector(
						"#configure-group .tab-content-group ul .active"
					)
				);

				presenceData.details = "Configuring Group";
				presenceData.state = `Tab: ${groupTab.innerText}`;
			} else {
				groupName = <HTMLHeadingElement>(
					document.querySelector(".group-name.text-overflow")
				);
				groupImage = <HTMLImageElement>(
					document.querySelector("div.group-image img")
				);
				groupTab = <HTMLLIElement>(
					document.querySelector("#horizontal-tabs li.rbx-tab.active")
				);

				presenceData.details = groupName.innerText;
				presenceData.state = `Tab: ${groupTab.innerText}`;
				presenceData.largeImageKey = imagesEnabled ? groupImage.src : "lg";

				if (buttons) {
					presenceData.buttons = [
						{
							label: "Visit Group",
							url: document.URL
						}
					];
				}
			}
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/search/groups")) {
			const searchURL = new URL(document.location.href),
				searchResult = searchURL.searchParams.get("keyword");

			presenceData.details = "Searching for a group:";
			presenceData.state = searchResult;
			presenceData.startTimestamp = browsingStamp;
		} else if (
			(pathname === "/discover/" || pathname === "/discover") &&
			gameName === null
		) {
			presenceData.details = "Browsing games...";
			presenceData.startTimestamp = browsingStamp;
			delete presenceData.state;

			const searchURL = new URL(document.location.href),
				searchResult = searchURL.searchParams.get("Keyword");

			if (searchResult) {
				presenceData.details = "Searching for a game: ";
				presenceData.state = searchResult;
			}
		} else if (
			pathname.includes("/games/") &&
			!pathname.includes("/localization")
		) {
			gameTab = <HTMLLIElement>(
				document.querySelector("#horizontal-tabs li.rbx-tab.active")
			);
			const Id = pathname.split("/")[2];

			if (gameId !== Id) {
				const req = await fetch(
					`https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${
						pathname.split("/")[2]
					}&size=512x512&format=Png`,
					{ method: "GET" }
				).then(function (response) {
					return response.json();
				});
				gameImage = req.data[0].imageUrl;
				gameId = Id;
			}

			presenceData.details = `Game: ${gameName.innerText}`;
			presenceData.state = `Tab: ${gameTab.innerText}`;
			presenceData.largeImageKey = imagesEnabled ? gameImage : "lg";
			presenceData.startTimestamp = browsingStamp;

			if (buttons) {
				presenceData.buttons = [
					{
						label: "Visit Game",
						url: document.URL
					}
				];
			}
		} else if (pathname.includes("/catalog")) {
			const searchURL = new URL(document.location.href),
				searchResult = searchURL.searchParams.get("Keyword");

			presenceData.details = "Current page:";
			presenceData.state = "Catalog";
			presenceData.startTimestamp = browsingStamp;

			const itemName = <HTMLElement>(
					document.querySelector(".item-name-container h2")
				),
				itemImage = <HTMLImageElement>(
					document.querySelector("span.thumbnail-span img")
				);

			if (searchResult) {
				presenceData.details = "Searching for an item: ";
				presenceData.state = searchResult;
			} else if (itemImage) {
				presenceData.details = "Looking at Catalog Item:";
				(presenceData.largeImageKey = imagesEnabled ? itemImage.src : "lg"),
					(presenceData.state = itemName.innerText);

				if (buttons) {
					presenceData.buttons = [
						{
							label: "View Catalog Item",
							url: document.URL
						}
					];
				}
			}
		} else if (pathname.includes("/places/")) {
			const selectedTab = <HTMLDivElement>(
				document.querySelector("#MasterContainer #navbar div.selected a")
			);

			presenceData.details = "Configuring Place";
			presenceData.state = `Tab: ${selectedTab.innerText || "Unknown"}`;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/universes/configure")) {
			const selectedTab = <HTMLDivElement>(
				document.querySelector("#MasterContainer #navbar div.selected a")
			);

			presenceData.details = "Configuring Experience";
			presenceData.state = `Tab: ${selectedTab.innerText || "Unknown"}`;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/bundles/")) {
			const itemName = <HTMLElement>(
					document.querySelector(".item-name-container h2")
				),
				itemImage = <HTMLImageElement>(
					document.querySelector("span.thumbnail-span img")
				);

			presenceData.details = "Looking at Bundle:";
			(presenceData.largeImageKey = imagesEnabled ? itemImage.src : "lg"),
				(presenceData.state = itemName.innerText);
			presenceData.startTimestamp = browsingStamp;

			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Bundle",
						url: document.URL
					}
				];
			}
		} else if (pathname.includes("/search/users")) {
			const searchURL = new URL(document.location.href),
				searchResult = searchURL.searchParams.get("keyword");

			presenceData.details = "Searching for an user:";
			presenceData.state = searchResult;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/develop")) {
			presenceData.details = "Developer Page";
			const developTabs = (<HTMLDivElement>(
				document.querySelector("#DevelopTabs .tab-active")
			)).innerText;
			if (developTabs === "My Creations") {
				presenceData.state = `Tab: ${developTabs} > ${
					(<HTMLAnchorElement>document.querySelector(".tab-item-selected"))
						.innerText
				}`;
			} else if (developTabs === "Group Creations") {
				presenceData.state = `Tab: ${developTabs} > ${
					(<HTMLAnchorElement>(
						document.querySelector(
							'#SelectedGroupId option[selected="selected"]'
						)
					)).innerText
				} > ${
					(<HTMLAnchorElement>document.querySelector(".tab-item-selected"))
						.innerText
				}`;
			} else if (developTabs === "Library") {
				const searchURL = new URL(document.location.href),
					searchResult = searchURL.searchParams.get("Keyword");

				if (searchResult) {
					presenceData.details = `Searching at ${developTabs} for: `;
					presenceData.state = searchResult;
				} else {
					presenceData.state = `Tab: ${developTabs} > ${
						(<HTMLAnchorElement>(
							document.querySelector(".selectedAssetTypeFilter")
						)).innerText
					}`;
				}
			} else presenceData.state = `Tab: ${developTabs}`;

			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/localization")) {
			if (pathname.includes("/configure")) {
				localizationTab = <HTMLSpanElement>(
					document.querySelector(".left-panel ul .active a")
				);

				presenceData.details = "Managing Localizations";
			} else {
				localizationTab = <HTMLSpanElement>(
					document.querySelector(".nav-tabs .active .text-lead")
				);
				localizationGameName = <HTMLElement>(
					document.querySelector("#selenium-game-title-heading")
				);

				if (!localizationGameName) {
					localizationGameName = <HTMLElement>(
						document
							.querySelector("div.component-container")
							.querySelector("h4")
					);
				}

				presenceData.details = `Localizing "${
					localizationGameName
						? localizationGameName.innerText
						: "Untilted Game"
				}"`;
			}

			presenceData.state = `Tab: ${localizationTab.innerHTML}`;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/transactions")) {
			transactionsTab = (<HTMLSpanElement>(
				document
					.querySelector(".transaction-type-dropdown")
					.querySelector(".rbx-selection-label")
			)).innerText;

			presenceData.details = "Transactions Page";
			presenceData.state = `Tab: ${transactionsTab}`;
			presenceData.startTimestamp = browsingStamp;
		} else if (pathname.includes("/badges/")) {
			const itemName = <HTMLElement>(
					document.querySelector(".item-name-container h2")
				),
				itemImage = <HTMLImageElement>(
					document.querySelector("span.thumbnail-span img")
				);

			presenceData.details = "Looking at Badge:";
			(presenceData.largeImageKey = imagesEnabled ? itemImage.src : "lg"),
				(presenceData.state = itemName.innerText);

			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Badge",
						url: document.URL
					}
				];
			}
		} else if (pathname.includes("/library/")) {
			const itemName = <HTMLElement>(
					document.querySelector(".item-name-container h2")
				),
				itemImage = <HTMLImageElement>(
					document.querySelector("span.thumbnail-span img")
				);

			presenceData.details = "Looking at Asset:";
			(presenceData.largeImageKey = imagesEnabled ? itemImage.src : "lg"),
				(presenceData.state = itemName.innerText);

			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Asset",
						url: document.URL
					}
				];
			}
		} else if (pathname.includes("/game-pass/")) {
			const itemName = <HTMLElement>(
					document.querySelector(".item-name-container h2")
				),
				itemImage = <HTMLImageElement>(
					document.querySelector("span.thumbnail-span img")
				);

			presenceData.details = "Looking at Gamepass:";
			(presenceData.largeImageKey = imagesEnabled ? itemImage.src : "lg"),
				(presenceData.state = itemName.innerText);

			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Gamepass",
						url: document.URL
					}
				];
			}
		} else {
			for (const [i, v] of Object.entries(basicPages)) {
				if (pathname.includes(i)) {
					presenceData.details = v.details ? v.details : "Current Page: ";
					if (v.state) presenceData.state = v.state;
					else delete presenceData.state;

					presenceData.startTimestamp = browsingStamp;
				}
			}
		}

		if (document.querySelector(".notification-stream-container") !== null) {
			presenceData.details = "Viewing Notifications";
			delete presenceData.state;
			presenceData.startTimestamp = browsingStamp;
		}
	} else if (hostname === "devforum.roblox.com") {
		const basicPages: {
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
				"/categories": { state: "Browsing Categories" }
			},
			topicId = pathname.split("/")[3];
		if (topicId && dfPrevTopic === topicId)
			presenceData.startTimestamp = dfTopicTime;
		else presenceData.startTimestamp = browsingStamp;

		presenceData.details = "Surfing the DevForum";
		presenceData.largeImageKey = dfLgImage;

		if (pathname.includes("/t/")) {
			presenceData.state = `Reading "${dfTopicName}"`;

			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Topic",
						url: document.URL
					}
				];
			}

			if (dfPrevTopic !== pathname.split("/")[3]) {
				dfPrevTopic = pathname.split("/")[3];
				dfTopicTime = Math.floor(Date.now() / 1000);

				const req = await (
					await fetch(`${document.URL}.json`, { method: "GET" })
				).json();
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
			presenceData.state = `Searching "${new URL(
				document.location.href
			).searchParams.get("q")}"`;
		} else if (pathname.includes("/badges") && !pathname.includes("/u")) {
			presenceData.state = "Browsing Badges";

			if (document.querySelector(".container.show-badge")) {
				presenceData.state = `Browsing ${
					document
						.querySelector(".container.show-badge")
						.getElementsByTagName("h1")[0]
						.innerText.split("/")[1]
				} Badge`;
			}
		} else if (pathname.includes("/g/")) {
			presenceData.state = "Browsing Groups";

			if (document.querySelector(".group-info-name")) {
				presenceData.state = `Browsing ${
					document.querySelector(".group-info-name").innerHTML
				} Group`;
			}
		} else if (pathname.includes("/u/")) {
			const user = document.querySelector(".username").innerHTML;
			const image = <HTMLImageElement>(
				document.querySelector(".user-profile-avatar img")
			)
			presenceData.state = `Browsing ${user}'s Profile`;
			presenceData.largeImageKey = imagesEnabled
				? image.src
				: dfLgImage;

			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Profile",
						url: document.URL
					}
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
				"/notifications": ["Browsing Notifications", true]
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
			for (const [i, v] of Object.entries(basicPages))
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
					.querySelector(".user-link").innerHTML
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
	} else if (hostname === "talent.roblox.com") {
		presenceData.details = "Surfing the Talent Hub";
		presenceData.largeImageKey = dfLgImage;

		if (pathname.includes("/search")) {
			const searchURL = new URL(document.location.href),
				searchResult = searchURL.searchParams.get("query");
			if (pathname.includes("/creators")) {
				if (searchResult)
					presenceData.state = `Searching for Creator: ${searchResult}`;
				else presenceData.state = "Browsing Creators";
			} else if (pathname.includes("/jobs")) {
				if (searchResult)
					presenceData.state = `Searching for Job: ${searchResult}`;
				else presenceData.state = "Browsing Jobs";
			}
			presenceData.startTimestamp = browsingStamp;
		} else if (
			pathname.includes("/creators/") &&
			!pathname.includes("/search/") &&
			!pathname.includes("/settings")
		) {
			const Id = pathname.split("/")[2];
			if (talentUserData[0] !== Id) {
				talentUserData = [
					Id,
					document.head.title.replace("'s Creator Page - Talent Hub", "")
				];
				const req = await fetch(`https://users.roblox.com/v1/users/${Id}`, {
					method: "GET"
				})
					.then(function (response) {
						return response.json();
					})
					.catch(error => console.log(error));
				talentUserData = [Id, req.name ? req.name : talentUserData[1]];
			}
			if (!talentUserData[1]) {
				presenceData.state = "Browsing Profile";
				presenceData.startTimestamp = browsingStamp;
			} else {
				presenceData.state = `Looking at ${talentUserData[1]}'s Profile`;
				presenceData.startTimestamp = browsingStamp;
			}
			presenceData.largeImageKey = imagesEnabled
				? `https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&userid=${Id}`
				: dfLgImage;

			if (buttons) {
				presenceData.buttons = [
					{
						label: "Visit Profile",
						url: document.URL
					}
				];
			}
		} else if (
			pathname.includes("/jobs/") &&
			document.querySelector('[data-testid="job-view-header"]')
		) {
			presenceData.state = `Looking at Job Post: ${
				(<HTMLElement>(
					document.querySelector(
						'[data-testid="job-view-header"] .MuiTypography-root.MuiTypography-body1'
					)
				)).innerText
			}`;

			if (buttons) {
				presenceData.buttons = [
					{
						label: "Visit Job",
						url: document.URL
					}
				];
			}
		} else if (pathname.includes("/inbox"))
			presenceData.state = "Browsing Inbox";
		else if (pathname.includes("/settings"))
			presenceData.state = "Editing Settings";
		else if (pathname.includes("/jobs/create"))
			presenceData.state = "Creating Job Post";
	}

	presence.setActivity(presenceData);
});
