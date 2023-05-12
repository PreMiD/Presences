const presence = new Presence({
		clientId: "888726220571811914",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const showTimestamp = await presence.getSetting<boolean>("timestamp"),
		showButtons = await presence.getSetting<boolean>("buttons"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ODHNsqP.png",
			smallImageKey: "sharex-white-logo",
			smallImageText: "Navigating on getsharex.com",
			buttons: [
				{
					label: "View Page",
					url: document.location.href,
				},
			],
		};
	// Main Pages
	if (document.location.pathname === "/") {
		presenceData.state = "Browsing Home Page";
		delete presenceData.buttons;
	} else if (document.location.pathname.includes("/downloads")) {
		presenceData.state = "Browsing Downloads Page";
		presenceData.smallImageKey = Assets.Downloading;
	} else if (document.location.pathname.includes("/screenshots")) {
		presenceData.state = "Viewing Screenshots";
		presenceData.smallImageKey = "screenshot";
	} else if (document.location.pathname.includes("/changelog")) {
		presenceData.details = "Reading Changelog";
		presenceData.state = document.querySelector("h2")?.textContent;
		presenceData.smallImageKey = "changelog";
	} else if (document.location.pathname.includes("/donate")) {
		presenceData.state = "Browsing Donations Page";
		presenceData.smallImageKey = "donate";
	} else if (document.location.pathname.includes("/image-effects")) {
		presenceData.state = "Browsing Image Effects";
		presenceData.smallImageKey = "imageeffects";
	} else if (document.location.pathname.includes("/actions")) {
		presenceData.state = "Browsing Actions Page";
		presenceData.smallImageKey = "actionspage";
	} else if (document.location.pathname.includes("/brand-assets"))
		presenceData.state = "Browsing Brand Assets";

	// Docs
	if (document.location.pathname.includes("/faq")) {
		presenceData.state = "Browsing FAQ";
		presenceData.smallImageKey = "faq";
	} else if (document.location.pathname.includes("/dev-builds")) {
		presenceData.state = "Browsing Dev Builds";
		presenceData.smallImageKey = "beta";
	} else if (document.location.pathname.includes("/region-capture")) {
		presenceData.state = "Browsing RC Keybinds";
		presenceData.smallImageKey = "shortcuts";
	} else if (document.location.pathname.includes("/command-line-arguments")) {
		presenceData.state = "Browsing CLI Page";
		presenceData.smallImageKey = "cli";
	} else if (document.location.pathname.includes("/translation")) {
		presenceData.state = "Reading Translation Guide";
		presenceData.smallImageKey = "translate";
	} else if (document.location.pathname.includes("/custom-uploader")) {
		presenceData.state = "Reading Custom Uploaders Guide";
		presenceData.smallImageKey = "customupload";
	} else if (document.location.pathname.includes("amazon-s3")) {
		presenceData.state = "Reading Amazon S3 Guide";
		presenceData.smallImageKey = "amazon";
	} else if (document.location.pathname.includes("/google-cloud-storage")) {
		presenceData.state = "Reading Google Cloud Guide";
		presenceData.smallImageKey = "googlecloud";
	} else if (document.location.pathname.includes("website-capture")) {
		presenceData.state = "Reading Website Capture Guide";
		presenceData.smallImageKey = "websitecapture";
	}

	// Start Browsing Timestamp
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	// If Buttons option is off, delete buttons
	if (!showButtons) delete presenceData.buttons;

	// Activate Presence
	presence.setActivity(presenceData);
});
