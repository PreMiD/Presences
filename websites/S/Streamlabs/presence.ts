const presence = new Presence({
		clientId: "711871296346128395"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	userType = [
		"Viewing the ",
		"Viewing their ",
		"Modifying their ",
		"Creating their "
	];

let strings,
	clipTitle,
	rewardString,
	titleSiteCreator,
	titleDashboard = "Dashboard",
	postTitle;

function getLocationHash(str: string) {
	if (window.location.hash.includes(str)) return window.location.hash;
	else return "";
}

function getLocationPath(str: string) {
	if (window.location.pathname.includes(str)) return window.location.pathname;
	else return "";
}

presence.on("UpdateData", async () => {
	strings = await presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	if ("dev.streamlabs.com") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = `${userType[0]}API Documentation`;
	}

	if (window.location.hostname === "streamlabs.com") {
		switch (document.location.pathname) {
			case "/":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Home Page";
				break;
			case "/login":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Logging in";
				break;
			case "/clips":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = `${userType[1]}Clips`;
				break;
			case "/best-donation-clips":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = `${userType[0]}Best Clips`;
				break;

			case getLocationPath("content-hub"):
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = `${userType[0]}Content Hub`;
				if (document.location.pathname.split("/")[2] === "post") {
					postTitle = document
						.querySelector(".content-card__title")
						.firstChild.textContent.trim();
					presenceData.state = `${postTitle}`;
					// Button
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
					presenceData.endTimestamp = new Date(
						Date.now() + (video.duration - video.currentTime) * 1000
					).getTime();
					break;
				default:
					presenceData.smallImageKey = null;
					presenceData.smallImageText = null;
					break;
			}
			presenceData.details = `Watching ${clipTitle[0]} to`;
			presenceData.state = clipTitle[2];
		} else if (document.location.pathname.includes("/dashboard")) {
			switch (document.location.hash) {
				case "#/":
					titleDashboard = `${userType[1]}Dashboard`;
					break;
				case "#/stats":
					titleDashboard = `${userType[1]}Stats`;
					break;
				case "#/advancedstats":
					titleDashboard = `${userType[1]}Stats`;
					break;
				case "#/recentevents":
					titleDashboard = `${userType[1]}Recent Events`;
					break;
				case "#/alertbox":
					titleDashboard = `${userType[1]}Alert Box`;
					break;
				case "#/widgets":
					titleDashboard = `${userType[1]}Widgets`;
					break;
				case getLocationHash("/cloudbot"):
					titleDashboard = `${userType[1]}Cloudbot`;
					break;
				case getLocationHash("/multistream"):
					titleDashboard = `${userType[1]}MultiStream`;
					break;
				case getLocationHash("/prime"):
					switch (document.location.hash.split("/")[2]) {
						case "panels":
							titleDashboard = `${userType[1]}Panels`;
							break;
						case "thumbnails":
							titleDashboard = `${userType[1]}Thumbnails`;
							break;
					}
					break;
				//Logo Maker
				case getLocationHash("/logo-maker"):
					titleDashboard = `${userType[3]}Logo`;
					break;
				// Intro Maker
				case getLocationHash("/intro-maker"):
					titleDashboard = `${userType[3]}Intro`;
					break;
				// Merch Admin
				case getLocationHash("/merchadmin"):
					titleDashboard = `${userType[3]}Merch`;
					break;
				// Social Reminders
				case getLocationHash("/social-reminders"):
					titleDashboard = `${userType[3]}Social Reminders`;
					break;
				// Settings
				case getLocationHash("/settings"):
					titleDashboard = `${userType[1]}Settings`;
					break;
				// Monthly tips
				case getLocationHash("/monthly-tips"):
					titleDashboard = `${userType[3]}Monthly Tips`;
					break;
				// Donations
				case getLocationHash("/donations"):
					titleDashboard = `${userType[1]}Donations`;
					break;
				// Subscrivbers
				case getLocationHash("/subscribers"):
					titleDashboard = `${userType[1]}Subscribers`;
					break;
				case "#/streamlabs-rewards":
					titleDashboard = `${userType[1]}Rewards`;
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
		} else if (document.location.pathname.includes("/editor")) {
			titleSiteCreator = `${userType[3]}Site`;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = titleSiteCreator;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
