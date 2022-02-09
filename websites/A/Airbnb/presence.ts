const presence = new Presence({
		//The client ID of the Application created at https://discordapp.com/developers/applications
		clientId: "940342152494452806"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Search host",
		largeImageKey: "airbnb-big",
		startTimestamp: browsingTimestamp
	}

	if (document.location.pathname.includes("/s/")) {
		// search
		if (document.querySelector("button._b2fxuo > span.a8jt5op")?.textContent) {
			// split the url to retrieve only the name of the city or region searched
			const destination = location.pathname.split("/")[2].split("-")[0];
			// decodes the url to display the accents correctly
			const decodedDestination = decodeURI(destination);
			presenceData.details = "Search hosting in :";
			presenceData.state = `${decodedDestination}`;
		}
		if (document.location.pathname.includes("/experiences")) {
			presenceData.details = "Search an experience";
		}
	} else if (document.location.pathname.includes("/experiences/")) {
    const experience = document.querySelector("div._b8stb0 > span > h1._fecoyn4")?.textContent;
    presenceData.details = "Viewing experience : ";
    presenceData.state = `${experience}`
  } else {
		presenceData.details = "Viewing homepage"
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
