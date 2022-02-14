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
	};

	if (document.location.pathname.includes("/s/")) {
		let destination = "";

		if (document.querySelector("button._b2fxuo > span.a8jt5op")?.textContent) {
			// split the url to retrieve only the name of the city or region searched
			destination = decodeURI(location.pathname.split("/")[2].split("-")[0]);

			presenceData.details = "Search hosting in :";
			presenceData.state = `${destination}`;
		}
		if (document.location.pathname.includes("/experiences"))
			presenceData.details = "Search an experience";
	} else if (document.location.pathname.includes("/experiences/")) {
		presenceData.details = "Viewing experience : ";
		presenceData.state = `${
			document.querySelector("div._b8stb0 > span > h1._fecoyn4")?.textContent
		}`;
	} else presenceData.details = "Viewing homepage";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
