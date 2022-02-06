const presence = new Presence({
		clientId: "937645461467197470"
	}),
	presenceData: PresenceData = {
		largeImageKey: "logo"
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);
// eslint-disable-next-line no-console
console.log("%c[PreMID PHP]", "color:green;", "Presence Started...");
presence.on("UpdateData", async () => {
	if (document.location.hostname === "www.php.net" || "php.net") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing Page:";
		presenceData.state = document.title;
		//<===================================================>
		//				Startpage
		//<===================================================>
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing Page:";
			presenceData.state = document.title;
		}
	}
	presenceData.largeImageKey = "php_standalone";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});