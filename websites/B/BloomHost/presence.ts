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
	if (path.hostname === "bloom.host") {
		presenceData.smallImageKey = "globe-solid";
		presenceData.details = "Viewing the main website";
		if (path.pathname.includes("minecraft")) {
			presenceData.details = "Viewing the main website";
			presenceData.state = "Reading: Minecraft Plans";
		} else if (path.pathname.includes("vps")) {
			presenceData.details = "Viewing the main website";
			presenceData.state = "Reading: VPS Plans";
		} else if (path.pathname.includes("duck-panel")) {
			presenceData.details = "Viewing the main website";
			presenceData.state = "Reading: About the Duck Panel";
		} else if (path.pathname.includes("about-bloom")) {
			presenceData.details = "Viewing the main website";
			presenceData.state = "Reading: About Bloom";
		}
	}
	if (path.hostname === "docs.bloom.host") {
		presenceData.details = "Viewing the docs";
		presenceData.state = `Reading: ${
			document.querySelector("div.text--center > header > h1").textContent
		}`;
		presenceData.smallImageKey = "book-open-solid";
	}
	if (
		path.hostname === "mc.bloom.host" ||
		path.hostname === "demo.bloom.host"
	) {
		presenceData.details = "Using the panel";
		presenceData.smallImageKey = "terminal-solid";
		if (path.pathname.includes("account")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Editing: Account Details";
		} else if (path.pathname.includes("console")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: The console";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("logs")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Audit Logs";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("import")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Using: The Server Importer ";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("startup")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Startup";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("settings")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Settings";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("subdomain")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Subdomains";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("network")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Ports & Proxies";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("backups")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Creating: Backups";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("users")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: SubUsers";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("schedules")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Schedules";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("databases")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Databases";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("minecraft")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Managing: Minecraft players";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("plugins")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Installing: Plugins";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("modpacks")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Installing: Modpacks";
		} else if (path.pathname.includes("files")) {
			presenceData.details = "Using the panel";
			presenceData.state = "Editing: Files";
		}
	}
	if (path.hostname === "status.bloom.host") {
		presenceData.details = "Viewing the Status page";
		presenceData.smallImageKey = "stream-solid";
		if (path.pathname.includes("report")) {
			presenceData.details = "Viewing the Status Page";
			presenceData.state = `Viewing the status of: ${document
				.querySelector(" div.portlet-body > div.row > div.col-xs-12 > span")
				.textContent.replace(" (Recent History)", "")
				.trim()}`;
			presenceData.smallImageKey = "stream-solid";
		}
	}
	if (path.hostname === "vps.bloom.host")
		presenceData.details = "Using the VPS panel";
	presenceData.smallImageKey = "server-solid";

	if (path.hostname === "billing.bloom.host")
		presenceData.details = "Using the Billing Panel";
	presenceData.smallImageKey = "shopping-cart-solid";

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
