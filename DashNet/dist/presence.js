let presence = new Presence({});

let browsingStamp = Math.floor(Date.now() / 1000);
var latestID;
presence.clearActivity();

presence.on("UpdateData", () => {
	let presenceData = {
		largeImageKey: "dashnet",
	};

	if (document.location.pathname.includes("/cookieclicker/")) {
		presence.clientId = "676126246928777250";
	} else {
		presence.clientId = "676120967159742465";
	}

	if (presence.clientId != latestID) {
		presence.clearActivity();
		latestID = presence.clientId;
	}

	if (document.location.pathname.includes("/cookieclicker/")) {
		var cookies = document
			.querySelector("#cookies")
			.textContent.replace(
				document.querySelector("#cookies div").textContent,
				""
			);
		if (cookies.includes(" cookies")) {
			presenceData.details = cookies;
		} else {
			presenceData.details = cookies.replace("cookies", " cookies");
		}
		presenceData.state = document
			.querySelector("#cookies div")
			.textContent.replace("per second :", "Per second:");
		presenceData.smallImageKey = "legacyy";
		presenceData.smallImageText =
			"Legacy level: " + document.querySelector("#ascendNumber").textContent;
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname == "/") {
		presenceData.details = "Browsing DashNet's";
		presenceData.state = "video games and other fun things";
		presenceData.smallImageKey = "reading";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/legacy/")) {
		presenceData.details = "Playing Legacy";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/igm/")) {
		presenceData.details = "Making an idle game";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/randomgen/")) {
		presenceData.details = "Using randomgen";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/nested/")) {
		presenceData.details = "Playing Nested";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/murdergames/")) {
		presenceData.details = "Playing Murder Games";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/gamegen/")) {
		presenceData.details = "Using gamegen";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/lsystem/")) {
		presenceData.details = "Playing Tutrle Toy";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/taskmaster/")) {
		presenceData.details = "Using TaskMaster";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/cookies2cash/")) {
		presenceData.details = "Using Cookies2Cash";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/musicgen/")) {
		presenceData.details = "Using musicgen";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/dungeongenerator/")) {
		presenceData.details = "Using dungeongenerator";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/dreamlog/")) {
		presenceData.details = "Playing Dreamlog";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/PretendEverything/")) {
		presenceData.details = "Playing PretendEverything";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/teaparty/")) {
		presenceData.details = "Having a tea party";
		presenceData.startTimestamp = browsingStamp;
	} else if (document.location.pathname.includes("/mailtopia/")) {
		presenceData.details = "Playing mailtopia";
		presenceData.startTimestamp = browsingStamp;
	}

	if (presenceData.details == null) {
		presence.setTrayTitle();
		presence.setActivity();
	} else {
		presence.setActivity(presenceData);
	}
});
