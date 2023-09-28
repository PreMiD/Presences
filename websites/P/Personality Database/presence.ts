const presence = new Presence({
		clientId: "909403157686288414",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/P/Personality%20Database/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		useOnlyFirstPersonalityType = await presence.getSetting<boolean>(
			"useOnlyFirstPersonalityType"
		),
		showUserNameInUserProfile = await presence.getSetting<boolean>(
			"showUserNameInUserProfile"
		);

	if (document.location.pathname.includes("/profile/")) {
		const profileName: string = (<HTMLElement>(
				document.querySelector(
					"div.profile-description-basic > h1.profile-name"
				)
			))?.textContent,
			profilePersonality: string = (<HTMLElement>(
				document.querySelector(
					"div.profile-description > div.profile-description-info > div.profile-description-basic > div.profile-personality"
				)
			))?.textContent,
			profilePicture: string = (<HTMLElement>(
				document.querySelector(
					"div.profile-description > div.profile-description-info > div.profile-description-avatar img"
				)
			))?.getAttribute("src");

		if (profilePicture) presenceData.largeImageKey = profilePicture;
		presenceData.smallImageKey = "poll";
		presenceData.details = "Viewing:";

		const firstType: string = profilePersonality?.split(" - ")[0];

		if (firstType) {
			if (useOnlyFirstPersonalityType)
				presenceData.state = `${profileName} - ${firstType}`;
			else {
				presenceData.details = `Viewing: ${profileName}`;
				presenceData.state = `${profilePersonality}`;
			}
		} else presenceData.state = profileName;

		presenceData.buttons = [
			{
				label: "Visit profile",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname === "/search") {
		const urlParams = new URLSearchParams(window.location.search);

		presenceData.smallImageKey = Assets.Search;
		presenceData.details = "Searching:";
		presenceData.state = urlParams.get("keyword") || urlParams.get("q");
	} else if (document.location.pathname === "/vote") {
		presenceData.smallImageKey = "home";
		presenceData.details = "Viewing homepage";
	} else if (document.location.pathname.includes("/profile")) {
		presenceData.smallImageKey = "list";
		presenceData.details = "Viewing category:";
		presenceData.state = document.title?.split(" | ")[0];
	} else if (document.location.pathname.includes("/community")) {
		presenceData.smallImageKey = "group";
		presenceData.details = "Viewing community feed";
	} else if (document.location.pathname.includes("/topic")) {
		presenceData.smallImageKey = "star";
		presenceData.details = "Viewing topic:";
		presenceData.state = document.title?.split(" | ")[0];
	} else if (document.location.pathname.includes("/notification")) {
		presenceData.smallImageKey = "notification";
		presenceData.details = "Viewing notification";
	} else if (document.location.pathname.includes("/user/")) {
		if (showUserNameInUserProfile) {
			const userName: string = document.title?.split(" | ")[0];
			presenceData.details = "Viewing user's profile:";
			presenceData.state = userName;

			presenceData.buttons = [
				{
					label: `Visit ${userName}'s profile`,
					url: document.location.href,
				},
			];
		} else presenceData.details = "Viewing user's profile";
		presenceData.smallImageKey = "user";
	} else {
		presenceData.details = "Viewing page:";
		presenceData.state = document.title?.split(" | ")[0];
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
