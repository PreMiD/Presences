const presence = new Presence({
		clientId: "906195926299861003",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/EhKZen3.png",
	};

	presenceData.startTimestamp = browsingTimestamp;
	if (document.location.hostname === "server.pro") {
		if (
			document.querySelector(
				"body > div#app > div#wrap > main > section#section-main > section#section-content > div.container >div > div > h3"
			)
		)
			presenceData.details = "Viewing my servers";
		if (
			document.querySelector(
				"body > div#app > div#wrap > main > section#section-main > section#section-content > div.container > div.row > div.col-md-6 > h3"
			)
		) {
			presenceData.details = "Server Panel";
			presenceData.state = "Server Details";
			presenceData.smallImageKey = "viewing";
		}
		if (
			document.querySelector(
				"body > div#app > div#wrap > main > section#section-main > section#section-content > div.container > div.row > div.col-12 > h3"
			)
		) {
			presenceData.details = "Server Panel";
			presenceData.state = "VPS Details";
			presenceData.smallImageKey = "viewing";
		}
		if (
			document.querySelector(
				"body > div#app > div#wrap > main > section#section-main > section#section-content > div.container > div.row > div.col-12 > h2"
			)
		) {
			presenceData.details = "Server Panel:";
			presenceData.state = "VPS Configuration";
			presenceData.smallImageKey = "viewing";
		}
		if (
			document.querySelector(
				"body > div#app > div#wrap > main > section#section-main > section#section-content > div > div.landing > div > div.landing-centerer > div.container > div.row > div.col-xl-8 > h1"
			)
		) {
			presenceData.details = "Home";
			presenceData.state = "Browsing";
		}
	}
	if (document.location.pathname.includes("/advanced-settings")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Advanced Settings";
		presenceData.smallImageKey = "editing";
	} else if (document.location.pathname.includes("/files")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Server Files";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/console")) {
		presenceData.details = "Server Panel:";
		presenceData.smallImageKey = "viewing";
		presenceData.state = "Server Console";
	} else if (document.location.pathname.includes("/shell")) {
		presenceData.details = "Server Panel Shell";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/players")) {
		presenceData.details = "Server Panel:";
		presenceData.smallImageKey = "viewing";
		presenceData.state = "Server Players";
	} else if (document.location.pathname.includes("/plugins")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Installing Plugins";
	} else if (document.location.pathname.includes("/scheduler")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Scheduled Tasks";
		presenceData.smallImageKey = "editing";
	} else if (document.location.pathname.includes("/worlds")) {
		presenceData.details = "Server Panel";
		presenceData.state = "Viewing worlds";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/server-page")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Editing a server";
		presenceData.smallImageKey = "editing";
	} else if (document.location.pathname.includes("/ftp")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Viewing FTP Details";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/mysql")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Viewing MySQL Details";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/backups")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Viewing Server Backups";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/error-log")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Viewing Error Logs";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/reinstall")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Reinstalling Page";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/create-service")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Creating a Service";
	} else if (document.location.pathname.includes("/firewall")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Editing Firewall";
		presenceData.smallImageKey = "editing";
	} else if (document.location.pathname.includes("/reset")) {
		presenceData.details = "Server Panel:";
		presenceData.state = "Viewing Reset Page";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/account")) {
		presenceData.state = "Editing Account";
		presenceData.smallImageKey = "editing";
	} else if (document.location.pathname.includes("/support")) {
		presenceData.smallImageText = "Viewing Support Page";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/contact"))
		presenceData.details = "Contacting Support";
	else if (document.location.pathname.includes("/about"))
		presenceData.details = "Viewing About Us";
	else if (document.location.pathname.includes("/pricing")) {
		presenceData.state = "Viewing Pricing Plans";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/create"))
		presenceData.details = "Creating a server";
	else if (document.location.pathname.includes("/jobs")) {
		presenceData.state = "Viewing Jobs Page";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/terms")) {
		presenceData.state = "Terms of Service";
		presenceData.smallImageKey = "viewing";
	} else if (document.location.pathname.includes("/hytale")) {
		presenceData.smallImageKey = "viewing";
		presenceData.state = "Hytale Server Hosting";
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
