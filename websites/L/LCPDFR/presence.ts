const presence = new Presence({
		clientId: "1133734950055714866",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let profilePictureLink: HTMLAnchorElement,
	urlParams: URLSearchParams,
	searchQuery: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/WDOURvX.png",
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting<boolean>("privacy");

	switch (document.location.hostname) {
		case "www.lcpdfr.com": {
			if (document.location.pathname === "/")
				presenceData.details = "Patrolling the Home Page";
			else if (document.location.pathname.includes("/downloads/")) {
				const path = document.location.pathname.split("/");
				presenceData.smallImageKey = Assets.Viewing;
				if (path.includes("essential-mods"))
					presenceData.details = "Inspecting Essential Mods";
				else if (path.includes("vehiclemodels"))
					presenceData.details = "Analyzing Vehicle Models";
				else if (path.includes("vehiclestextures"))
					presenceData.details = "Examining Vehicle Textures";
				else if (path.includes("scripts"))
					presenceData.details = "Investigating Scripts & Plugins";
				else if (path.includes("character"))
					presenceData.details = "Reviewing Character Mods";
				else if (path.includes("audio"))
					presenceData.details = "Exploring Audio Mods";
				else if (path.includes("datafile"))
					presenceData.details = "Examining Data Files";
				else if (path.includes("misc"))
					presenceData.details = "Keeping an eye out for miscelaneous";
				else presenceData.details = "Inspecting the Download Page";
			} else if (document.location.pathname.includes("/forums/"))
				presenceData.details = "Engaging in Discussions";
			else if (document.location.pathname.includes("/discover/"))
				presenceData.details = "Investigating Recent Activity";
			else if (document.location.pathname.includes("/contact-us/"))
				presenceData.details = "Contacting the staff";
			else if (document.location.pathname.includes("/wiki/"))
				presenceData.details = "Studying the Wiki";
			else if (document.location.pathname.includes("/login/"))
				presenceData.details = "Going on Duty";
			else if (document.location.pathname.includes("/register/"))
				presenceData.details = "Signing Up for Duty";
			else if (document.location.pathname.includes("/search/")) {
				urlParams = new URLSearchParams(window.location.search);
				searchQuery = urlParams.get("q");
				presenceData.details = "Searching for:";
				presenceData.state = searchQuery;
				presenceData.smallImageKey = Assets.Search;
			} else if (document.location.pathname.includes("/profile/")) {
				profilePictureLink = document.querySelector<HTMLAnchorElement>(
					"a.ipsUserPhoto.ipsUserPhoto_xlarge"
				);
				presenceData.details = "Viewing Officer:";
				presenceData.state = document.querySelector(
					"h1[class='ipsType_reset ipsPageHead_barText']"
				).textContent;
				presenceData.largeImageKey =
					profilePictureLink.querySelector<HTMLImageElement>("img").src;
				presenceData.smallImageKey = Assets.Viewing;
			} else if (document.location.pathname.includes("/settings/"))
				presenceData.details = "Viewing Settings";
			else if (document.location.pathname.includes("/guideline-hub/")) {
				presenceData.details = "Reading the guidelines";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/staff/"))
				presenceData.details = "Viewing the Staff";
			else if (document.location.pathname.includes("/gallery/")) {
				presenceData.details = "Looking through the Gallery";
				presenceData.smallImageKey = Assets.Viewing;
			} else presenceData.details = "Just browsing...";
			break;
		}
	}

	if (privacy) {
		presenceData.details = "Browsing under cover";
		delete presenceData.state;
		delete presenceData.smallImageKey;
		if (document.location.pathname.includes("/profile/"))
			presenceData.largeImageKey = "https://i.imgur.com/WDOURvX.png";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
