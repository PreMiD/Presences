const presence = new Presence({
		clientId: "914653780014932010"
	}),
	presenceData: PresenceData = {
		largeImageKey: "logo"
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);
// eslint-disable-next-line no-console
console.log("%c[PreMID Satowa Network]", "color:green;", "Presence Started...");
presence.on("UpdateData", async () => {
	//<===================================================>
	//				Startpage
	//<===================================================>
	if (document.location.hostname === "satowa-network.at") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing Page:";
			presenceData.state = document.title;
		} else if (document.location.pathname === "/feedback/" || document.location.pathname === "/feedback/index") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Writing a Feedback...";
		} else if (document.location.pathname === "/user/report" || document.location.pathname === "/user/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Submitting a Report...";
		} else if (document.location.pathname === "/jobs/" || document.location.pathname === "/jobs/index") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing the Jobs...";
		} else if (document.location.pathname === "/licence/" || document.location.pathname === "/licence/index") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing the licences...";
		}
	} else if (document.location.hostname === "support.satowa-network.at") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Support Center";
		presenceData.state = "Viewing the Startpage...";
		if (document.location.pathname === "/support/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Support Center";
			presenceData.state = "Writing a Support Request...";
		}
	} else if (document.location.hostname === "account.satowa-network.at" || "account.satowa-network.at/index") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the Account Dashboard...";
	}
	presenceData.largeImageKey = "satowa-logo";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
