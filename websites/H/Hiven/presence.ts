const presence: Presence = new Presence({
	clientId: "876835643983007754",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/H/Hiven/assets/logo.jpg",
	};

	// Presence for Hiven's static landing page
	if (document.location.hostname === "hiven.io") {
		switch (document.location.pathname) {
			case "/":
				presenceData.details = "Viewing the home page";
				break;
			case "/monetization":
				presenceData.details = "Reading about monetization";
				break;
		}

		// Presence for Hiven itself
	} else if (document.location.hostname === "app.hiven.io") {
		// Get Privacy Settings
		const privacy = await presence.getSetting<boolean>("privacy");

		presenceData.details = "Browsing Hiven...";

		// Check if user is in DMs
		if (document.location.pathname.startsWith("/messages/")) {
			presenceData.details = "Viewing DMs...";
			if (!privacy) {
				presenceData.state = `User: ${
					document.querySelector("span.sc-pbYdQ.elGOsQ").textContent
				}`;
			}
		}

		// Check if the user is on House
		if (document.location.pathname.startsWith("/houses/")) {
			if (privacy) presenceData.details = "Viewing a House...";
			else {
				presenceData.details = `Viewing House: ${
					document.querySelector("span.sc-pQSRh.kUecYO").textContent
				}`;
				presenceData.state = `Room: ${
					document.querySelector("span.sc-pbYdQ.elGOsQ").textContent
				}`;
			}
		}

		// Check if user is viewing their friends page
		if (document.location.pathname.startsWith("/friends"))
			presenceData.details = "Viewing their friends...";

		// Check if the user is viewing a profile
		if (document.location.pathname.startsWith("/@")) {
			if (privacy) presenceData.details = "Viewing a profile...";
			else {
				presenceData.details = `Viewing ${
					document.querySelector("div.sc-pcwJP.eLUntd").textContent
				}'s Profile...`;
				presenceData.state = `User: ${
					document.querySelector("div.sc-pkvSM.fVFrlQ").textContent
				}`;
				presenceData.buttons = [
					{
						label: "View Profile",
						url: document.location.href,
					},
				];
			}
		}

		// Check if user is in settings
		if (
			document.querySelector("div.sc-pjIPr.fZnZKj") &&
			document.querySelector("div.sc-pjIPr.fZnZKj").textContent ===
				"User Settings"
		) {
			presenceData.details = "Viewing their settings";
			if (privacy) delete presenceData.state;
			else {
				presenceData.state = document.querySelector(
					"div.sc-pbWVv.hTvDIL"
				).textContent;
			}
		}

		// Check if user is viewing Settings of a House
		if (document.querySelector("div.sc-psfJB.efwVkl")) {
			presenceData.details = "Viewing a House's settings";
			if (!privacy) {
				presenceData.state = document.querySelector(
					"div.sc-psfJB.efwVkl"
				).children[2].textContent;
			}
		}
	}

	presence.setActivity(presenceData);
});
