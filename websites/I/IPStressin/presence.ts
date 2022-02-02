const presence = new Presence({
	clientId: "938491711355752558"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

	if (document.location.pathname.startsWith("/attack.php")) {

		let attacks = document.querySelector("#attacks > div > div > div > div.card-body > div > table > tbody > tr:nth-child(2)");
		let attackIp = attacks.children[0].textContent;
		let expiration = parseInt(attacks.children[2].textContent); // expiration in seconds

		if (attackIp == "None" || attackIp == null) {
			presenceData.details = "Deciding who to attack...";
		} else {
			presenceData.details = "Attacking " + attackIp;
			presenceData.endTimestamp = Date.now() + (expiration * 1000);
			presenceData.smallImageKey = "face";	
		}

	} else {
		presenceData.details = "Browsing...";
	}

	  //Update the presence with all the values from the presenceData object
	  if (presenceData.details) presence.setActivity(presenceData);
	  //Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	  else presence.setActivity();
});
