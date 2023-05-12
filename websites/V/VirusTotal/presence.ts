const presence = new Presence({
	clientId: "650103083438702613",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/QPKWLTc.png",
	};

	switch (document.location.pathname) {
		case "/gui/home": {
			presenceData.state = "Browsing on mainpage...";
			presence.setActivity(presenceData);

			break;
		}
		case "/gui/home/upload": {
			presenceData.details = "Uploading an file...";
			presence.setActivity(presenceData);

			break;
		}
		case "/gui/home/url": {
			presenceData.details = "Search an URL...";
			presence.setActivity(presenceData);

			break;
		}
		case "/gui/home/search": {
			presenceData.details = "Search an anything...";
			presence.setActivity(presenceData);

			break;
		}
		case "/gui/sign-in": {
			presenceData.details = "Sign In to VirusTotal";
			presence.setActivity(presenceData);

			break;
		}
		case "/gui/join-us": {
			presenceData.details = "Sign Up to VirusTotal";
			presence.setActivity(presenceData);

			break;
		}
		case "/gui/settings": {
			presenceData.details = "Update their profile...";
			presenceData.state = document
				.querySelector("body > vt-virustotal-app")
				.shadowRoot.querySelector("#toolbar")
				.shadowRoot.querySelector("#omnibarWrapper > vt-ui-account-widget")
				.shadowRoot.querySelector(
					"#userDropdown > div.avatar-section > span"
				).textContent;
			presence.setActivity(presenceData);

			break;
		}
		default:
			if (document.location.pathname.includes("/gui/user/")) {
				presenceData.details = "Reading profile of...";
				presenceData.state = document
					.querySelector("body > vt-virustotal-app")
					.shadowRoot.querySelector("#authChecker > user-view")
					.shadowRoot.querySelector(
						"#pageWrapper > div.wrapper > vt-ui-generic-card > div:nth-child(2) > div.avatar-name > div > h3"
					).textContent;
				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/gui/top-users")) {
				presenceData.details = "Looking for top users...";
				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/gui/domain/")) {
				if (document.location.pathname.endsWith("detection")) {
					presenceData.details = "Reading detections of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("details")) {
					presenceData.details = "Reading details of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("relations")) {
					presenceData.details = "Reading relations of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("community")) {
					presenceData.details = "Reading comments of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("summary")) {
					presenceData.details = "Reading summary of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span"
						).textContent;
					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/gui/file/")) {
				if (document.location.pathname.endsWith("detection")) {
					presenceData.details = "Reading detections of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#authChecker > file-view")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-file-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("details")) {
					presenceData.details = "Reading details of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#authChecker > file-view")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-file-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("community")) {
					presenceData.details = "Reading comments of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#authChecker > file-view")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-file-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("summary")) {
					presenceData.details = "Reading summary of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#authChecker > file-view")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-file-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.includes("behavior")) {
					presenceData.details = "Reading behavior of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#authChecker > file-view")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-file-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a"
						).textContent;
					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/gui/url/")) {
				if (document.location.pathname.endsWith("detection")) {
					presenceData.details = "Reading detections of ...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("details")) {
					presenceData.details = "Reading details of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("community")) {
					presenceData.details = "Reading comments of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.endsWith("summary")) {
					presenceData.details = "Reading summary of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
						).textContent;
					presence.setActivity(presenceData);
				} else if (document.location.pathname.includes("behavior")) {
					presenceData.details = "Reading behavior of...";
					presenceData.state = document
						.querySelector("body > vt-virustotal-app")
						.shadowRoot.querySelector("#domainView")
						.shadowRoot.querySelector("#report")
						.shadowRoot.querySelector("div > header > vt-ui-domain-card")
						.shadowRoot.querySelector(
							"vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a"
						).textContent;
					presence.setActivity(presenceData);
				} else presence.setActivity();
			}
	}
});
