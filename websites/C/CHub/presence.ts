const presence = new Presence({
		clientId: "1000715027994640404",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const { host } = document.location,
		title = document.title.split("-");
	let { title: dhname } = document,
		{ pathname: path } = document.location;
	path = path.replaceAll("/nighty", "");
	if (title.length === 2) dhname = title[1].replace(/^[.\s]+|[.\s]+$/g, "");
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Ut1y4n3.png",
		smallImageText: "chub.page",
		details: dhname,
		buttons: [{ label: "View Drivers Hub", url: document.URL }],
	};

	const [buttons, timestamp] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamp"),
		]),
		dhpages: Record<string, PresenceData> = {
			"/": { state: "Viewing Overview" },
			"/overview": { state: "Viewing Drivers Hub Index" },
			"/announcement": { state: "Viewing Announcements" },
			"/downloads": { state: "Viewing Downloads" },
			"/map": { state: "Viewing Map" },
			"/delivery": { state: "Viewing Deliveries" },
			"/challenge": { state: "Viewing Challenges" },
			"/division": { state: "Viewing Divisions" },
			"/event": { state: "Viewing Events" },
			"/member": { state: "Viewing Members" },
			"/leaderboard": { state: "Viewing Leaderboard" },
			"/ranking": { state: "Viewing Rankings" },
			"/application/new": { state: "Creating an Application" },
			"/application/my": { state: "Viewing Applications" },
			"/application/all": { state: "Viewing All Applications" },
			"/manage/user": { state: "Viewing Pending Users" },
			"/audit": { state: "Viewing Audit Log" },
			"/config": { state: "Editing Configuration" },
			"/settings": { state: "Updating Settings" },
			"/notification": { state: "Viewing Notifications" },
		},
		appages: Record<string, PresenceData> = {
			"/": { details: "Viewing CHub" },
			"/features": { details: "Viewing Features" },
			"/subscribe": { details: "Subscribing to CHub" },
			"/setup": { details: "Creating a Drivers Hub" },
		},
		{ title: pstate } = document;
	switch (host) {
		case "drivershub.charlws.com":
			for (const [p, data] of Object.entries(appages))
				if (path.includes(p)) presenceData = { ...presenceData, ...data };
			presenceData.buttons = [
				{ label: "CHub", url: "https://drivershub.charlws.com" },
				{ label: "Features", url: "https://drivershub.charlws.com/features" },
			];
			break;
		case "map.charlws.com":
			presenceData.details = "Viewing Map";
			presenceData.state = pstate;
			presenceData.buttons = [{ label: "View Map", url: document.URL }];
			break;
		case "wiki.charlws.com":
			presenceData.details = "Viewing CHub Wiki";
			presenceData.state = pstate;
			presenceData.buttons = [{ label: "View CHub Wiki", url: document.URL }];
			break;
	}
	if (!host.endsWith(".charlws.com")) {
		for (const [p, data] of Object.entries(dhpages))
			if (path.includes(p)) presenceData = { ...presenceData, ...data };
		switch (true) {
			case path.includes("/delivery/"):
				presenceData.details = `Viewing Delivery #${
					path.split("/")[path.split("/").length - 1]
				}`;
				if (
					document.querySelector("#delivery-detail-source-city").textContent ===
					""
				)
					presenceData.state = "Loading...";
				else {
					presenceData.state = `${
						document.querySelector("#delivery-detail-source-city").textContent
					} -> 
						${document.querySelector("#delivery-detail-destination-city").textContent}`;
				}
				presenceData.buttons = [{ label: "View Delivery", url: document.URL }];
				break;
			case path.includes("/member/"):
				presenceData.details = "Viewing Profile";
				presenceData.state = document.querySelector(
					"#profile-info > h1 > b"
				).innerHTML;
				presenceData.buttons = [{ label: "View Profile", url: document.URL }];
				break;
		}
	}

	const Domain2Abbr: { [key: string]: string } = {
		"drivershub.charlws.com": "https://i.imgur.com/Ut1y4n3.png",
		"hub.atmvtc.com": "https://i.imgur.com/lpMijkw.png",
		"hub.gokboru.net.tr": "https://i.imgur.com/Qdw8368.png",
		"hub.lsavtc.com": "https://i.imgur.com/HMsiMjy.png",
		"hub.globaltrucking.uk": "https://i.imgur.com/36CrJ31.png",
		"hub.mdlogistics.ga": "https://i.imgur.com/1Np33gE.jpg",
		"drivershub.ets2mcg.org": "https://i.imgur.com/sHkVyEL.png",
	};
	if (Object.keys(Domain2Abbr).includes(host))
		presenceData.largeImageKey = Domain2Abbr[host];
	if (!host.endsWith(".charlws.com") && Object.keys(Domain2Abbr).includes(host))
		presenceData.smallImageKey = "https://i.imgur.com/Ut1y4n3.png";

	if (!buttons) delete presenceData.buttons;
	if (timestamp) presenceData.startTimestamp = browsingTimestamp;

	presence.setActivity(presenceData);
});
