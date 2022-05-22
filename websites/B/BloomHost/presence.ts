const presence = new Presence({
		clientId: "873728851052752896"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	{ hostname, pathname } = document.location;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "bloom_logo",
		startTimestamp: browsingTimestamp
	};

	switch (hostname) {
		case "bloom.host":
			presenceData.smallImageKey = "globe-solid";
			presenceData.details = "Viewing the main website";
			if (pathname.includes("minecraft"))
				presenceData.state = "Reading: Minecraft Plans";
			else if (pathname.includes("vps"))
				presenceData.state = "Reading: VPS Plans";
			else if (pathname.includes("duck-panel"))
				presenceData.state = "Reading: About the Duck Panel";
			else if (pathname.includes("about-bloom"))
				presenceData.state = "Reading: About Bloom";
			break;
		case "docs.bloom.host":
			presenceData.details = "Viewing the docs";
			presenceData.state = `Reading ${
				document.querySelector("div.text--center > header > h1").textContent
			}`;
			break;
		case "demo.bloom.host":
		case "mc.bloom.host":
			presenceData.details = "Using the panel";
			presenceData.smallImageKey = "terminal-solid";
			if (pathname.includes("account"))
				presenceData.state = "Editing account details";
			else if (pathname.includes("console"))
				presenceData.state = "Viewing the console";
			else if (pathname.includes("server") && pathname.includes("logs")) {
				presenceData.state = "Viewing Audit Logs";
			} else if (pathname.includes("server") && pathname.includes("import")) {
				presenceData.state = "Using The Server Importer ";
			} else if (pathname.includes("server") && pathname.includes("startup")) {
				presenceData.state = "Viewing Startup";
			} else if (pathname.includes("server") && pathname.includes("settings")) {
				presenceData.state = "Viewing Settings";
			} else if (
				pathname.includes("server") &&
				pathname.includes("subdomain")
			) {
				presenceData.state = "Viewing Subdomains";
			} else if (pathname.includes("server") && pathname.includes("network")) {
				presenceData.state = "Viewing Ports & Proxies";
			} else if (pathname.includes("server") && pathname.includes("backups")) {
				presenceData.state = "Creating Backups";
			} else if (pathname.includes("server") && pathname.includes("users")) {
				presenceData.state = "Viewing SubUsers";
			} else if (
				pathname.includes("server") &&
				pathname.includes("schedules")
			) {
				presenceData.state = "Viewing Schedules";
			} else if (
				pathname.includes("server") &&
				pathname.includes("databases")
			) {
				presenceData.state = "Viewing Databases";
			} else if (
				pathname.includes("server") &&
				pathname.includes("minecraft")
			) {
				presenceData.state = "Managing Minecraft players";
			} else if (pathname.includes("server") && pathname.includes("plugins")) {
				presenceData.state = "Installing Plugins";
			} else if (pathname.includes("server") && pathname.includes("modpacks")) {
				presenceData.state = "Installing Modpacks";
			} else if (pathname.includes("server") && pathname.includes("files")) {
				presenceData.state = "Editing Files";
			}
			break;
		case "status.bloom.host":
			presenceData.details = "Viewing the Status page";
			presenceData.smallImageKey = "stream-solid";
			if (pathname.includes("report")) {
				presenceData.state = `Viewing the status of: ${document
					.querySelector(" div.portlet-body > div.row > div.col-xs-12 > span")
					.textContent.replace(" (Recent History)", "")
					.trim()}`;
			}
			break;
		case "vps.bloom.host":
			presenceData.details = "Using the VPS panel";
			presenceData.smallImageKey = "server-solid";
			break;
		case "billing.bloom.host":
			presenceData.details = "Using the Billing Panel";
			presenceData.smallImageKey = "shopping-cart-solid";
			break;
		default:
			presenceData.details = "On Bloom Host";
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
