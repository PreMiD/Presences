const presence = new Presence({
		clientId: "711871296346128395",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	userType = [
		"Viewing the ",
		"Viewing their ",
		"Modifying their ",
		"Creating their ",
	];

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let strings,
	clipTitle,
	rewardString,
	titleSiteCreator,
	titleDashboard = "Dashboard";

presence.on("UpdateData", async () => {
	strings = await presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/LvPRxYG.png",
	};

	switch (window.location.hostname) {
		case "howto.streamlabs.com":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `${userType[0]}Forums`;
			break;
		case "support.streamlabs.com":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `${userType[0]}Support Pages`;
			break;
		case "dev.streamlabs.com":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `${userType[0]}API Documentation`;
			break;
		case "ideas.streamlabs.com":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `${userType[0]}Feature Suggestions`;
			break;
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
		}

		if (document.location.pathname.includes("/clips/watch")) {
			const video: HTMLVideoElement =
				document.querySelector(".video-js > video");
			clipTitle = document
				.querySelector(".clip__action-info > div:nth-child(1)")
				.textContent.split(" ");
			switch (!video.paused) {
				case true:
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = strings.play;
					presenceData.endTimestamp = new Date(
						Date.now() + (video.duration - video.currentTime) * 1000
					).getTime();
					break;
				case false:
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = strings.pause;
					presenceData.endTimestamp = null;
					break;
			}
			presenceData.details = `Watching ${clipTitle[0]} to`;
			presenceData.state = clipTitle[2];
		} else if (document.location.pathname.includes("/dashboard")) {
			switch (document.location.hash) {
				case "#/widgets":
					titleDashboard = `${userType[1]}Widgets`;
					break;
				case "#/cloudbot/mod-tools":
					titleDashboard = `${userType[1]}Cloudbot`;
					break;
				case "#/stats":
					titleDashboard = `${userType[1]}Dashboard`;
					break;
				case "#/alertbox":
					titleDashboard = `${userType[1]}Alert Boxes`;
					break;
				case "#/merchadmin":
					titleDashboard = `${userType[2]}Merch Store`;
					break;
				case "#/charity":
					titleDashboard = `${userType[0]}Charity Campaigns`;
					break;
				case "#/university":
					titleDashboard = `${userType[0]}University Lessons`;
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

	if (document.location.pathname.includes("/clips/watch")) {
		const video: HTMLVideoElement = document.querySelector(".video-js > video");
		clipTitle = document
			.querySelector(".clip__action-info > div:nth-child(1)")
			.textContent.split(" ");
		switch (!video.paused) {
			case true:
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = strings.play;
				presenceData.endTimestamp = new Date(
					Date.now() + (video.duration - video.currentTime) * 1000
				).getTime();
				break;
			case false:
				presenceData.smallImageKey = Assets.Pause;
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
			case "#/widgets":
				titleDashboard = `${userType[1]}Widgets`;
				break;
			case "#/cloudbot/mod-tools":
				titleDashboard = `${userType[1]}Cloudbot`;
				break;
			case "#/stats":
				titleDashboard = `${userType[1]}Dashboard`;
				break;
			case "#/alertbox":
				titleDashboard = `${userType[1]}Alert Boxes`;
				break;
			case "#/merchadmin":
				titleDashboard = `${userType[2]}Merch Store`;
				break;
			case "#/charity":
				titleDashboard = `${userType[0]}Charity Campaigns`;
				break;
			case "#/university":
				titleDashboard = `${userType[0]}University Lessons`;
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

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
