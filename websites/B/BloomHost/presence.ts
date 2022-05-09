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
	if (hostname === "bloom.host") {
		presenceData.smallImageKey = "globe-solid";
		presenceData.details = "Viewing the main website";
		if (pathname.includes("minecraft")) 
			presenceData.state = "Reading: Minecraft Plans";
		
		if (pathname.includes("vps")) 
			presenceData.state = "Reading: VPS Plans";
		
		if (pathname.includes("duck-panel")) 
			presenceData.state = "Reading: About the Duck Panel";
		
		if (pathname.includes("about-bloom")) 
			presenceData.state = "Reading: About Bloom";
		
	}
	if (hostname === "docs.bloom.host") {
		presenceData.details = "Viewing the docs";
		presenceData.state = `Reading: ${
			document.querySelector("div.text--center > header > h1").textContent
		}`;
		presenceData.smallImageKey = "book-open-solid";
	}
	if (hostname === "mc.bloom.host" || hostname === "demo.bloom.host") {
		presenceData.details = "Using the panel";
		presenceData.smallImageKey = "terminal-solid";
		if (pathname.includes("account")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Editing: Account Details";
		} else if (pathname.includes("console")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: The console";
		} else if (pathname.includes("server") && pathname.includes("logs")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Audit Logs";
		} else if (pathname.includes("server") && pathname.includes("import")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Using: The Server Importer ";
		} else if (pathname.includes("server") && pathname.includes("startup")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Startup";
		} else if (pathname.includes("server") && pathname.includes("settings")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Settings";
		} else if (pathname.includes("server") && pathname.includes("subdomain")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Subdomains";
		} else if (pathname.includes("server") && pathname.includes("network")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Ports & Proxies";
		} else if (pathname.includes("server") && pathname.includes("backups")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Creating: Backups";
		} else if (pathname.includes("server") && pathname.includes("users")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: SubUsers";
		} else if (pathname.includes("server") && pathname.includes("schedules")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Schedules";
		} else if (pathname.includes("server") && pathname.includes("databases")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Databases";
		} else if (pathname.includes("server") && pathname.includes("minecraft")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Managing: Minecraft players";
		} else if (pathname.includes("server") && pathname.includes("plugins")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Installing: Plugins";
		} else if (pathname.includes("server") && pathname.includes("modpacks")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Installing: Modpacks";
		} else if (pathname.includes("files")) {
			presenceData.details = "Using the panel";
			presenceData.state = "Editing: Files";
		}
	}
	if (hostname === "status.bloom.host") {
		presenceData.details = "Viewing the Status page";
		presenceData.smallImageKey = "stream-solid";
		if (pathname.includes("report")) {
			presenceData.details = "Viewing the Status Page";
			presenceData.state = `Viewing the status of: ${document
				.querySelector(" div.portlet-body > div.row > div.col-xs-12 > span")
				.textContent.replace(" (Recent History)", "")
				.trim()}`;
			presenceData.smallImageKey = "stream-solid";
		}
	}
	if (hostname === "vps.bloom.host")
		presenceData.details = "Using the VPS panel";
	presenceData.smallImageKey = "server-solid";

	if (hostname === "billing.bloom.host")
		presenceData.details = "Using the Billing Panel";
	presenceData.smallImageKey = "shopping-cart-solid";

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
