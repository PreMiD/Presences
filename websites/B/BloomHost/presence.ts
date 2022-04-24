const presence = new Presence({
		clientId: "873728851052752896"
	}),
	// Const thing
	browsingStamp = Math.floor(Date.now() / 1000),
	path = document.location;

const cleanPath = /(\/)/g;
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "bloom_logo"
	};
	presenceData.startTimestamp = browsingStamp;
	// Presence
	if (path.hostname === "bloom.host") {
		presenceData.smallImageKey = "globe-solid";
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
		} else {
			presenceData.details = "Viewing the main website";
		}
	} else if (path.hostname === "docs.bloom.host") {
		const title = document.querySelector(
			"div.text--center > header > h1"
		).textContent;
		presenceData.details = "Viewing the docs";
		presenceData.state = `Reading: ${title}`;
		presenceData.smallImageKey = "book-open-solid";
		// console.log('HOGG RIDDAAAAAA')
	} else if (
		path.hostname === "mc.bloom.host" ||
		path.hostname === "demo.bloom.host"
	) {
		if (path.pathname.includes("account")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Editing: Account Details";
			presenceData.smallImageKey = "user-solid";
		} else if (path.pathname.includes("console")) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: The console";
			presenceData.smallImageKey = "terminal-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("logs")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Audit Logs";
			presenceData.smallImageKey = "file-alt-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("import")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Using: The Server Importer ";
			presenceData.smallImageKey = "file-import-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("startup")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Startup";
			presenceData.smallImageKey = "rocket-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("settings")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Settings";
			presenceData.smallImageKey = "cog-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("subdomain")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Subdomains";
			presenceData.smallImageKey = "map-pin-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("network")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Ports & Proxies";
			presenceData.smallImageKey = "network-wired-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("backups")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Creating: Backups";
			presenceData.smallImageKey = "window-restore-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("users")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: SubUsers";
			presenceData.smallImageKey = "users-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("schedules")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Schedules";
			presenceData.smallImageKey = "calender-solid";
		} else if (
			path.pathname.includes("server") &&
			path.pathname.includes("databases")
		) {
			presenceData.details = "Using the Panel";
			presenceData.state = "Viewing: Databases";
			presenceData.smallImageKey = "database-solid";
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
		} else if (path.pathname.includes("console")) {
			presenceData.details = "Using the panel";
			presenceData.state = "Viewing: The Console";
			presenceData.smallImageKey = "terminal-solid";
		} else if (path.pathname.includes("files")) {
			presenceData.details = "Using the panel";
			presenceData.state = "Editing: Files";
			presenceData.smallImageKey = "folder-solid";
		} else {
			presenceData.details = "Using the panel";
			presenceData.state = "Viewing: The Console";
			presenceData.smallImageKey = "terminal-solid";
		}
	} else if (path.hostname === "status.bloom.host") {
		if (path.pathname.includes("report")) {
			const title = document.querySelector(
				" div.portlet-body > div.row > div.col-xs-12 > span"
			).textContent;
			presenceData.details = "Viewing the Status Page";
			presenceData.state = `Viewing the status of: ${title
				.replace(" (Recent History)", "")
				.trim()}`;
			presenceData.smallImageKey = "stream-solid";
			console.log(
				`Viewing the status of: ${title.replace(" (Recent History)", "")}`
			);
		} else {
			presenceData.details = "Viewing the Status page";
			presenceData.smallImageKey = "stream-solid";
			// console.log('HOGG RIDDAAAAAA')
		}
	} else if (path.hostname === "vps.bloom.host") {
		presenceData.details = "Using the VPS panel";
	} else if (path.hostname === "billing.bloom.host") {
		presenceData.details = "Using the Billing Panel";
	}
	if (!presenceData.details) {
		presence.setTrayTitle();
		presence.setActivity();
	} else presence.setActivity(presenceData);
});
