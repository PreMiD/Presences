const presence = new Presence({
		clientId: "1335957909200441345",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	regex = /^\/(show|movie)\/([^/]+)$/i;

const enum Assets {
	Logo = "https://i.imgur.com/jwP2Lsc.png",
}

function convertToTitleCase(str: string): string {
	if (!str) return "";

	return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

function parseHelpUrl(pathname: string) {
	if (window.location.hostname !== "help.hbomax.com") return null;

	const segments = pathname.split("/").filter(Boolean);

	return {
		language: segments[0] || "en",
		helpType: segments[1] || null,	
		detailKeyword: segments[2] || null,
		item: segments[3] || null,
	};
}

presence.on("UpdateData", async () => {
	const { pathname, href, search } = window.location,
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			type: ActivityType.Watching,
		},
		video: HTMLVideoElement = document.querySelector("video"),
		[privacy, time, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<number>("buttons"),
		]);

	if (pathname.includes("/video/watch/")) {
		const title = convertToTitleCase(
				document.querySelector('[data-testid="player-ux-asset-title"]')
					?.textContent
			),
			seasonAndEpisode = document.querySelector(
				'[data-testid="player-ux-season-episode"]'
			)?.textContent;
		if (seasonAndEpisode) {
			const match = seasonAndEpisode.match(/S(?<season>\d+)\sE(?<episode>\d+)/);

			presenceData.name = title;
			presenceData.details = `Season ${match.groups.season}, Episode ${match.groups.episode}`;
			presenceData.state = document.querySelector(
				'[data-testid="player-ux-asset-subtitle"]'
			)?.textContent;
		} else {
			presenceData.name = "HBO Max";
			presenceData.details = title;
		}

		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		presenceData.buttons = [
			{
				label: "Watch Now!",
				url: href,
			},
		];

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	switch (pathname) {
		case "/":
			presenceData.details = "Browsing...";
			presenceData.state = "On the home page";
			break;
		case "/series":
			presenceData.details = "Browsing...";
			presenceData.state = "Through the series";
			break;
		case "/movies":
			presenceData.details = "Browsing...";
			presenceData.state = "Through the movies";
			break;
		case "/sports":
			presenceData.details = "Browsing...";
			presenceData.state = "Through the sport events";
			break;
		case "/my-stuff":
			presenceData.details = "Browsing...";
			presenceData.state = "Through their list";
			break;
		case "/search":
			presenceData.details = "Searching...";
			presenceData.state = "For something";
			break;
		case "/account":
			presenceData.details = "Viewing their account";
			presenceData.state = "Settings and information";
			break;
		case "/account/devices":
			presenceData.details = "Viewing their account";
			presenceData.state = "Connected devices";
			break;
		case "/privacy":
			presenceData.details = "Viewing the privacy policy";
			presenceData.state = "Information about privacy";
			break;
	}

	if (regex.test(pathname)) {
		const match = pathname.match(regex),
			type = match[1],
			documentTitle = document.title.split("•")[0].trim(),
			description = document.querySelector(
				".StyledDescription-Beam-Web-Ent__sc-1d8dfnx-11"
			)?.textContent;
		if (type === "show") {
			presenceData.name = convertToTitleCase(documentTitle);
			presenceData.details = "Watching information about a show";
			presenceData.state = description;
			presenceData.buttons = [
				{
					label: "View Show",
					url: href,
				},
			];
		} else {
			presenceData.name = convertToTitleCase(documentTitle);
			presenceData.details = "Watching movie information";
			presenceData.state = description;
			presenceData.buttons = [
				{
					label: "View Movie",
					url: href,
				},
			];
		}
	}

	if (pathname.includes("/edit-profile")) {
		presenceData.details = "Editing their profile";
		presenceData.state = "Changing settings";
	} else if (pathname.includes("/profile-picker")) {
		presenceData.details = "Choosing a profile";
		presenceData.state = "To edit";
	} else if (pathname.includes("/search/result")) {
		const searchQuery = (new URLSearchParams(search).get("q") || "").replace(
			/\+/g,
			" "
		);

		presenceData.details = "Searching...";
		presenceData.state = searchQuery
			? `Searched for: "${searchQuery}"`
			: "For something";
	}

	if (pathname.includes("/settings")) {
		const settings = pathname.split("/").pop();

		presenceData.details = "Viewing their settings";
		presenceData.state =
			settings === "settings"
				? "Customizing their account"
				: `Customizing ${settings} settings`;
	}

	if (parseHelpUrl(pathname)) {
		const { language, helpType, item } = parseHelpUrl(pathname);
		presenceData.name = "HBO Max Help";
		switch (helpType) {
			case "Category": {
			  presenceData.details = "Looking at category:";
			  presenceData.state = item ? item.replace(/_/g, " ") : "Unknown Category";
		
			  presenceData.buttons = [
				{
				  label: "View Category",
				  url: `https://help.hbomax.com/${language}/Category/Detail/${item}`,
				},
			  ];
			  break;
			}
		
			case "Answer": {
			  presenceData.details = "Reading answer";
			  presenceData.state = "To a question";
		
			  presenceData.buttons = [
				{
				  label: "View Answer",
				  url: `https://help.hbomax.com/${language}/Answer/Detail/${item}`,
				},
			  ];
			  break;
			}
		
			default: {
			  presenceData.details = "Browsing HBO Max Help";
			  presenceData.state = "For information";
		
			  presenceData.buttons = [
				{
				  label: "Open HBO Max Help",
				  url: `https://help.hbomax.com/${language}/`,
				},
			  ];
			  break;
			}
		  }
	}

	if (
		((presenceData.startTimestamp || presenceData.endTimestamp) && !time) ||
		privacy
	) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (privacy) {
		delete presenceData.name;
		delete presenceData.details;
		delete presenceData.state;
		delete presenceData.smallImageKey;
		presenceData.details = "Watching something!";
	}
	if ((!buttons || privacy) && presenceData.buttons)
		delete presenceData.buttons;

	presence.setActivity(presenceData);
});
