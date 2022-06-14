const presence = new Presence({
		clientId: "983277228710297600",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let locationcity: string,
	locationstate: string,
	locationcountry: string,
	x: string,
	y: string,
	editedObject: string,
	selectedObject: boolean;
setInterval(() => {
	if (x && y) {
		fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${x}&lon=${y}&format=json`
		)
			.then(res => res.json())
			.then(res => {
				locationcity = res.address.city;
				if (!locationcity) locationcity = res.address.hamlet;
				if (!locationcity) locationcity = res.address.village;
				if (!locationcity) locationcity = res.address.town;

				locationstate = res.address.state;
				locationcountry = res.address.country;
			})
			.catch();
	}
}, 5000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
		details: "Current page:",
	};

	if (document.location.pathname.includes("/traces/new"))
		presenceData.state = "GPS tracks upload";
	else if (document.location.pathname.includes("/traces"))
		presenceData.state = "Public GPS tracks";
	else if (document.location.pathname.includes("/diary/new"))
		presenceData.state = "Write new diary entry";
	else if (document.location.pathname.includes("/diary"))
		presenceData.state = "Users' Diaries";
	else if (document.location.pathname.includes("/help"))
		presenceData.state = "Getting Help";
	else if (document.location.pathname.includes("/welcome"))
		presenceData.state = "OpenStreetMap basics guide";
	else if (document.location.hostname.startsWith("welcome"))
		presenceData.state = "Welcome Mat - Organizations";
	else if (document.location.pathname.includes("/copyright"))
		presenceData.state = "Copyright and License";
	else if (document.location.pathname.includes("/about"))
		presenceData.state = "About OpenStreetMap";
	else if (document.location.pathname.includes("/dashboard"))
		presenceData.state = "User Dashboard";
	else if (document.location.pathname.includes("/preferences"))
		presenceData.state = "User preferences";
	else if (document.location.pathname.includes("/export"))
		presenceData.state = "Map exports";
	else if (document.location.pathname.includes("/account/edit"))
		presenceData.state = "User settings";
	else if (document.location.pathname.includes("/directions"))
		presenceData.state = "Planning a route";
	else if (document.location.pathname.includes("/oauth2"))
		presenceData.state = "User OAuth applications";
	else if (document.location.pathname.includes("/history"))
		presenceData.state = "Changeset history";
	else if (document.location.hostname.startsWith("dmca"))
		presenceData.state = "Claim of Copyright Infringement";
	else if (document.location.hostname.startsWith("dns"))
		presenceData.state = "GeoDNS Zones";
	else if (document.location.hostname.startsWith("git"))
		presenceData.state = "Project Git";
	else if (document.location.hostname.startsWith("lists"))
		presenceData.state = "Project Mailing Lists";
	else if (document.location.hostname.startsWith("blogs"))
		presenceData.state = "Community blogs";
	else if (document.location.hostname.startsWith("help")) {
		presenceData.details = "Reading help:";
		presenceData.state = document.title.split(" -")[0];
	} else if (document.location.hostname.startsWith("blog")) {
		presenceData.details = "Reading a blog post:";
		presenceData.state = document.title.split(" |")[0];
		presenceData.buttons = [
			{ label: "Read this post", url: document.location.href },
		];
	} else if (document.location.hostname.startsWith("forum")) {
		presenceData.details = "Reading a forum post:";
		presenceData.state = document.title.split(" /")[0];
		presenceData.buttons = [
			{ label: "Read this post", url: document.location.href },
		];
	} else if (document.location.hostname.startsWith("community")) {
		presenceData.details = "Reading a community post:";
		presenceData.state = document.title.split(" -")[0];
		presenceData.buttons = [
			{ label: "Read this post", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/search")) {
		presenceData.details = "Search results for:";
		presenceData.state = document.title.split("|")[0];
	} else if (document.location.pathname.includes("/user/")) {
		presenceData.details = `On ${document.title.split("|")[0]} profile :`;
		const userEdits = document.querySelector(
				"#content > div.content-heading > div > div > div.col > nav > ul > li:nth-child(1) > span"
			).textContent,
			mapperSince = document.querySelector(
				"#content > div.content-heading > div > div > div.col > div > small > dl > dd"
			).textContent;
		presenceData.state = `${userEdits} edits since ${mapperSince}`;
		presenceData.buttons = [
			{ label: "Check this profile", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/changeset/")) {
		presenceData.details = `Watching changeset ${
			document.location.href.split("/")[4]
		}`;

		presenceData.state = `"${
			document.querySelector(
				"#sidebar_content > div.browse-section > p.font-italic"
			).textContent
		}"`;
		presenceData.buttons = [
			{ label: "Check the changeset", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/way/")) {
		const wayNumber = document
			.querySelector(
				"#sidebar_content > div.d-flex.w-100 > div.flex-grow-1.text-break > h2"
			)
			.textContent.split(":")[1];
		presenceData.details = `Watching the way ${wayNumber}`;
		presenceData.state = `From the changeset ${
			document.querySelector(
				"#sidebar_content > div.browse-section > p.font-italic"
			).textContent
		}`;
		presenceData.buttons = [
			{ label: "Check the way", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/node/")) {
		const wayNumber = document
			.querySelector(
				"#sidebar_content > div.d-flex.w-100 > div.flex-grow-1.text-break > h2"
			)
			.textContent.split(":")[1];
		presenceData.details = `Watching the node ${wayNumber}`;
		presenceData.state = `From the changeset ${
			document.querySelector(
				"#sidebar_content > div.browse-section > p.font-italic"
			).textContent
		}`;
		presenceData.buttons = [
			{ label: "Check the node", url: document.location.href },
		];
	} else if (document.location.pathname.includes("/edit")) {
		try {
			editedObject = document
				.querySelector<HTMLIFrameElement>("#id-embed")
				.contentDocument.title.split("–")[1]
				.substring(1);
			selectedObject = true;
		} catch (e) {
			selectedObject = false;
		}
		if (!selectedObject) presenceData.details = "On the map editor";
		else presenceData.details = `Editing "${editedObject}"`;
		x = document.location.href.split("/")[4];
		y = document.location.href.split("/")[5];
		if (typeof locationcountry == "undefined")
			presenceData.state = "Somewhere on planet earth";
		else
			presenceData.state = `Near ${locationcity}, ${locationstate}, ${locationcountry}`;
		presenceData.buttons = [
			{ label: "Edit the map", url: document.location.href },
		];
	} else if (document.location.hash.includes("#map=")) {
		presenceData.details = "Looking at the map";
		x = document.location.href.split("/")[4];
		y = document.location.href.split("/")[5];
		if (typeof locationcountry == "undefined")
			presenceData.state = "Somewhere on planet earth";
		else
			presenceData.state = `Near ${locationcity}, ${locationstate}, ${locationcountry}`;
		presenceData.buttons = [
			{ label: "Open the map", url: document.location.href },
		];
	} else if (document.location.pathname.startsWith("/wiki")) {
		presenceData.details = "Reading the wiki";
		presenceData.state = `"${document.title.split(" —")[0]}"`;
		presenceData.buttons = [
			{ label: "Check the page", url: document.location.href },
		];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
