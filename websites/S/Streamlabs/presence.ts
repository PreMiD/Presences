const presence = new Presence({
		clientId: "711871296346128395"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let strings,
	showButtons,
	path,
	hash,
	clipTitle,
	rewardString,
	titleSiteCreator,
	titleDashboard = "Dashboard",
	postTitle;

presence.on("UpdateData", async () => {
	strings = await presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});
	showButtons = await presence.getSetting("showButtons");
	path = document.location.pathname.split("/");
	hash = document.location.hash.split("/");

	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	if (window.location.hostname === "dev.streamlabs.com") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the API Documentation";
	} else if (window.location.hostname === "streamlabs.com") {
		switch (path[1]) {
			case "":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Home Page";
				break;

			case "login":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Logging in";
				break;

			case "clips":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing their Clips";
				break;

			case "best-donation-clips":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the Best Clips";
				break;

			case "content-hub":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the Content Hub";

				if (path[2] === "post") {
					postTitle = document
						.querySelector(".content-card__title")
						.firstChild.textContent.trim();
					presenceData.state = `${postTitle}`;

					presenceData.buttons = [
						{
							label: "View Post",
							url: document.location.href
						},
						{
							label: "View Author",
							url: (
								document.querySelector(
									".content-card__author-link"
								) as HTMLAnchorElement
							).href
						}
					];
				}
				break;

			case "dashboard":
				switch (hash[1]) {
					case "":
						titleDashboard = "Viewing their Dashboard";
						break;

					case "stats":
						titleDashboard = "Viewing their Stats";
						break;

					case "advancedstats":
						titleDashboard = "Viewing their Stats";
						break;

					case "recentevents":
						titleDashboard = "Viewing their Recent Events";
						break;

					case "alertbox":
						titleDashboard = "Viewing their Alert Box";
						break;

					case "widgets":
						titleDashboard = "Viewing their Widgets";
						break;

					case "cloudbot":
						titleDashboard = "Viewing their Cloudbot";
						break;

					case "multistream":
						titleDashboard = "Viewing their MultiStream";
						break;

					case "prime":
						switch (hash[2]) {
							case "panels":
								titleDashboard = "Viewing their Panels";
								break;

							case "thumbnails":
								titleDashboard = "Viewing their Thumbnails";
								break;
						}
						break;

					case "logo-maker":
						titleDashboard = "Creating their Logo";
						break;

					case "intro-maker":
						titleDashboard = "Creating their Intro";
						break;

					case "merchadmin":
						titleDashboard = "Creating their Merch";
						break;

					case "social-reminders":
						titleDashboard = "Creating their Social Reminders";
						break;

					case "settings":
						titleDashboard = "Viewing their Settings";
						break;

					case "monthly-tips":
						titleDashboard = "Creating their Monthly Tips";
						break;

					case "donations":
						titleDashboard = "Viewing their Donations";
						break;

					case "subscribers":
						titleDashboard = "Viewing their Subscribers";
						break;
					case "streamlabs-rewards":
						titleDashboard = "Viewing their Rewards";
						rewardString = document.querySelector(
							"#sl__dashboard > div > div.content > div.dashboard-content > div.dashboard-body > div > div > div:nth-child(1) > div:nth-child(1) > span"
						).textContent;
						presenceData.state =
							rewardString.charAt(0).toUpperCase() + rewardString.slice(1);
						//Streamlabs rewards does not captilise first string of the teir.
						break;
				}
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = titleDashboard;
				break;
		}

		if (document.location.pathname.includes("/clips/watch")) {
			const video: HTMLVideoElement =
				document.querySelector(".video-js > video");
			clipTitle = document
				.querySelector(".clip__action-info > div:nth-child(1)")
				.textContent.split(" ");
			switch (!video.paused) {
				case true:
					presenceData.smallImageKey = "play";
					presenceData.smallImageText = strings.play;
					presenceData.endTimestamp = new Date(
						Date.now() + (video.duration - video.currentTime) * 1000
					).getTime();
					break;
				case false:
					presenceData.smallImageKey = "pause";
					presenceData.smallImageText = strings.pause;
					presenceData.endTimestamp = null;
					break;
				default:
					presenceData.smallImageKey = null;
					presenceData.smallImageText = null;
					break;
			}
			presenceData.details = `Watching ${clipTitle[0]} to`;
			presenceData.state = clipTitle[2];
		} else if (document.location.pathname.includes("/editor")) {
			titleSiteCreator = "Creating their Site";
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = titleSiteCreator;
		}
	}

	if (!showButtons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
