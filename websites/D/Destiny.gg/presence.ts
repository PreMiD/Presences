const browsingTimestamp = Math.floor(Date.now() / 1000),
	presence = new Presence({
		clientId: "759921592926339072",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/pSEZ2Cm.png",
		smallImageKey: "really_bad_d_gg_logo_upscale",
		startTimestamp: browsingTimestamp,
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/home/"
	)
		presenceData.details = "Viewing the homepage.";
	else if (document.location.pathname.includes("/bigscreen")) {
		presenceData.details = "Watching Destiny.";
		presenceData.smallImageKey = "play_icon";
	} else if (document.location.pathname.includes("/donate")) {
		presenceData.details = "Donating to Destiny.";
		presenceData.smallImageKey = "money_icon";
	} else if (document.location.pathname.includes("/subscribe")) {
		presenceData.details = "Subscribing to Destiny.";
		presenceData.smallImageKey = "money_icon";
	} else if (document.location.pathname.includes("/profile")) {
		presenceData.details = "Editing D.gg profile.";
		presenceData.smallImageKey = "profile_icon";
	} else if (document.location.pathname.includes("/embed/chat")) {
		presenceData.details = "Chatting";
		presenceData.smallImageKey = "chat_icon";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
