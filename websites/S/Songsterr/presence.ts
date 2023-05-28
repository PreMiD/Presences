const presence = new Presence({
	clientId: "1112463096368353300",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/MXQP0Lq.png",
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Searching";
	} else if (document.location.pathname === "/a/wa/favorites") {
		presenceData.details = "Viewing Favorite Tabs";
	} else if (document.location.pathname === "/a/wa/mytabs") {
		presenceData.details = "Viewing Owned Tabs";
	} else if (document.location.pathname === "/a/wa/submit") {
		presenceData.details = "Submitting Tabs";
	} else if (document.location.pathname === "/a/wa/account") {
		presenceData.details = "Editing Account Settings";
	} else if (document.location.pathname === "/a/wa/plus") {
		presenceData.details = "Viewing Plans";
	} else if (document.location.pathname === "/a/wa/help") {
		presenceData.details = "Viewing Q&A";
	} else if (document.location.pathname === "/a/wa/account") {
		presenceData.details = "Viewing Account Settings";
	} else if (document.location.pathname.startsWith("/a/wsa/")) {
		presenceData.details = document.querySelector(
			'[aria-label="title"]'
		).textContent;

		presenceData.state = document.querySelector(
			'[aria-label="artist"]'
		).textContent;
	}

	presence.setActivity(presenceData);
});
